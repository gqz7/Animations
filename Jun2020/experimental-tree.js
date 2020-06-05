//VARS FOR CANVAS AND TIMING EVENTS
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random();

let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 777,

      timeForward = true,

      strokeW = 1,
      
      pauseAnimation = true,

      colorIndex = 0,

      limit = 33,

      angle = Math.PI/4.5,

      colorPairs = [['hotpink', 'lime'], ['lightsalmon', 'skyblue'], ['darkslategrey', 'lightgoldenrodyellow'], ['plum', 'yellow']];

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = strokeW;

canvas.style = ` display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto`;

canvas.style = `display: block;
                // position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto;
                background-color: black`;

document.body.style = `margin: 0`;

document.body.appendChild(canvas)

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

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/1.2)

//ANIMAITON CYCLE

let count=0;

        render()

        function render() {

        if (timeForward && time < timeMax) {

            time+=.3
            angle += .0007;

        } else if (timeForward && time >= timeMax) {
            timeForward = false;

        } if (!timeForward && time > 0) {
            angle -= .0007;
            time-=.3
        } else if ( time == 0){

            timeForward = true;
            
        }

        clearFullScreen()

        count = 0

        createImg(300)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

function createImg(size) { 

    
    // context.strokeStyle = `hsl(${count}, 100%, 50%)`


    count++

    context.lineWidth = size/42;

    context.beginPath()

    context.moveTo(0,0)
    context.lineTo(0,-size*.7)
    
    context.stroke()
    
    context.save();

    context.translate(0,-size*.7)

        if (size > limit) {

            if((Math.random()*size/4)>7){
            context.save();
            createImg(size*.7)
            context.restore();
            }

            if((Math.random()*size)>7){
            context.save();
            context.rotate(angle)
            createImg(size*.7)
            context.restore();
            }

            if((Math.random()*size)>7){
            context.save();
            context.rotate(-angle)
            createImg(size*.7)
            context.restore();
            }


        } else {

            let g = mapNumber(size/limit, .7, 1, 0, 1);

            size *= g/2;

            context.lineWidth = (size/42*g)+.1
            
            console.log(size);

            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(0, -size)
            context.stroke()            

            context.rotate(-angle*g)
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(0, -size)
            context.stroke()

            context.rotate(angle*2*g)
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(0, -size)
            context.stroke()

        }    

    context.restore();
}


function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};