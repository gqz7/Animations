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
                background-color: hsl(177,77%,17%)`;

document.body.style = `margin: 0`;


document.body.appendChild(canvas)

context.translate(width/2, height-70);

context.rotate(-Math.PI)


context.strokeStyle = "white";

context.lineWidth = 2;

context.beginPath();
context.moveTo(0,100);
context.lineTo(0,0);
context.stroke();

let startLength = 100,
    time = 0,
    pauseAnimation = true,
    timeForward = true,
    branchAngle = Math.PI/2,
    divisor = .82,
    tempNoise1,
    tempNoise2,
    bLim = 40,

    branchPos; //array of objects, all positions of the individual branches 

  render()

      function render() {

        clearFullScreen()

        if (timeForward && time < 1000) {
            time+=2
        } else if (timeForward && time >= 1000) {
            timeForward = false;
        } if (!timeForward && time > 0) {
            time--
        } else {
            timeForward = true;
        }

        createBackground();

        startTree();

        // return

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render);
        }

      }

function startTree() {

    tempNoise1 = Noise(time/300,time/300+seed);
    tempNoise2 = Noise(time/300,time/300-seed);

    let 
    tempSize = time/8 + bLim-tempNoise1*3,
    tempAngle = branchAngle-time/1000-tempNoise1/70;

    blim = 20 + tempNoise1*1000;

    branchPos = [];
    
    create_tree(tempAngle, tempSize, {s: {x:0, y:0} , e: {x:0, y:0} });
    //user can toggle pausing of animation via 'spacebar'

    context.save()

    
    branchPos.push({s: {x:0, y:-200} , e: {x:0, y:0}, l:200})
    context.translate(0,200)
    render_tree()

    context.restore();

    // console.log(branchPos);

}


function create_tree(angle, length, last) { 
    
    let endX = (last.e.x + length * Math.sin(angle)),//*(.5+time/400), 
        endY = (last.e.y + length * Math.cos(angle)),//*(.5+time/400),
        startX = last.e.x, 
        startY = last.e.y,

        branchObj = {
        s: {x: startX, y: startY},
        e: {x: endX, y: endY},
        l: length
    }

    branchPos.push(branchObj)

        length *= divisor;

        if(length > bLim) { //if the branch length is still large enough two more branches will be appended to the trunk
    
            create_tree(angle*(tempNoise1/2+.8), length, branchObj ); //the right branch is created all the way down before the left side will continue

            create_tree(-angle*(tempNoise2/2+.8), length, branchObj);

        } 

}

function render_tree() {
    for (let i = 0; i < branchPos.length; i++) {

        let b = branchPos[i];

        let light = 100-b.l < 50 ? 50 : 100-b.l,
        color = time/2+b.l/2;

        context.strokeStyle = `hsl(${color}, 100%, ${light}%)`;
        context.lineWidth = b.l/10;
       
        context.beginPath()
        context.moveTo(-b.s.x, b.s.y)
        context.lineTo(-b.e.x, b.e.y)
        context.stroke()

        context.beginPath()
        context.moveTo(b.s.x, b.s.y)
        context.lineTo(b.e.x, b.e.y)
        context.stroke()

        
    }
}

function createBackground() {

    context.fillStyle = `hsl(133, 60%, 40%)`;

    context.beginPath()
    context.rect(-width/2,80,width,-150)
    context.fill()

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
