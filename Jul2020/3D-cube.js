//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 333,

      timeForward = true,

      strokeW = 1,
      
      pauseAnimation = false;

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


    const saturation = 100;
    context.strokeStyle = `hsl(144, ${saturation}%, 100%)`;

 context.save()

    context.beginPath()

    context.moveTo(0,-size/2)
    context.lineTo(0,size/2)
    context.lineTo(-size,size/2)
    context.lineTo(-size,-size/2)
    context.lineTo(0,-size/2)
    
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