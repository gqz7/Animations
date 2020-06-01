//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = width/2,

      timeForward = true,

      strokeW = 10,
      
      pauseAnimation = false,

      colorIndex = 0,

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

    pauseAnimation = !pauseAnimation;

    if (!pauseAnimation) {
        render()
    }
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/2)

//ANIMAITON CYCLE

        render()

        function render() {

        if (timeForward && time < timeMax) {
            time+=10
            // console.log('time++', time);
        } else if (timeForward && time >= timeMax) {
            timeForward = false;

        } if (!timeForward && time > 0) {
            time-=10
        } else if ( time == 0){

            timeForward = true;
            
        }

        clearFullScreen()

        createImg(300)


        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 10, render)
        }

      }

function createImg(size) { 

const angle_1 = mapNumber(time, 0, timeMax, Math.PI/4, Math.PI/5);

const angle_2 = mapNumber(time, 0, timeMax, 0, Math.PI/2);

const saturation = mapNumber(time, 0, timeMax, 0, 100);

const vertHeight = mapNumber(time, 0, timeMax, 0, -size);

    context.lineWidth = 17;

    context.strokeStyle = `hsl(0, ${saturation}%, 50%)`;

    context.beginPath()

    context.arc(0,0,size,0,Math.PI*2)
 
    context.stroke()

    context.lineWidth = 4;

 context.save()

    context.rotate(angle_2)

    context.beginPath()

    context.moveTo(0,-size)
    context.lineTo(0,size)
    
    context.stroke()

 context.restore()

 context.save()
 
    context.rotate(Math.PI/2)
    context.beginPath()

    context.moveTo(vertHeight,0)
    context.lineTo(size*Math.cos(angle_1),size*Math.sin(angle_1))
    context.moveTo(vertHeight,0)
    context.lineTo(size*Math.cos(-angle_1),size*Math.sin(-angle_1))

    context.stroke()
 
 context.restore()

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