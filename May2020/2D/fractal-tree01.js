//fractal tree animation

  const canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height =window.innerHeight,

        Noise = toxi.math.noise.simplexNoise.noise,
        seed = Math.random();

canvas.style = `display: block;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto;
                background-color: hsl(0,0%,27%)`;

document.body.style = `margin: 0`;


document.body.appendChild(canvas)

context.translate(width/2, height);

context.strokeStyle = "white";

context.beginPath();
context.moveTo(0,100);
context.lineTo(0,0);
context.stroke();

let startLength = 100,
    time = 0,
    pauseAnimation = true,
    timeForward = true,
    branchAngle = Math.PI / 17,
    divisor = .72,
    bLim = 20;

  render()

      function render() {

        clearFullScreen()

        if (timeForward && time < 444) {
            time++
        } else if (timeForward && time >= 444) {
            timeForward = false;
        } if (!timeForward && time > 0) {
            time--
        } else {
            timeForward = true;
        }

        let tempNoise = Noise(time/100,time/100+seed),
            tempSize = time/3 + bLim,
            tempAngle = branchAngle+time/500-tempNoise/30;

            // blim = 20 + tempNoise;

        create_tree(tempAngle, tempSize, tempNoise);
        //user can toggle pausing of animation via 'spacebar'
        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }


function create_tree(angle, length, noise) { //recersive fractal tree function
    //first a line is created to be the trunk. each branch will be a new 'trunk'
    context.save()

        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(0, -length)
        context.stroke()

        context.translate(0, -length);
        length *= divisor;

        if(length > bLim) { //if the branch length is still large enough two more branches will be appended to the trunk
        //saving position before right branch is made
        context.save()
        context.rotate(angle)
        create_tree(angle, length); //the right branch is created all the way down before the left side will continue
        
        context.restore()
        ///////////////
        
        //////////////
        context.save()

        context.rotate(-angle)
        create_tree(-angle, length);
        context.restore()

        -angle
        } else {

            let g = mapNumber(length/bLim, divisor, 1, 0, 1);
            
            context.rotate(-angle*g)
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(0, -length*g)
            context.stroke()

            context.rotate(angle*2*g)
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(0, -length*g)
            context.stroke()

        }

    context.restore()
}

function clearFullScreen() { 
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    if (input.code == 'Space') {
        pauseAnimation = !pauseAnimation;

        if (!pauseAnimation) {
            render()
        }
    
    }
    
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};
