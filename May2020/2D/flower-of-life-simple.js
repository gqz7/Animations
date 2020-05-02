//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = width,

      time = 0,
      
      pauseAnimation = false;

context.strokeStyle = 'white';

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

        clearFullScreen()

        time = time < height ? time + 1: 0;

        createFlower(time)

        context.rotate(.01)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 30, render)
        }

      }

function createFlower(d) {

    let r = d/2;

    context.beginPath()
    context.arc(0,0,r/3,0,Math.PI*2)
    context.stroke()

   for (let y = 0; y < 6; y++) {

        context.beginPath()
        context.arc(r/3,0,r/3,0,Math.PI*2)
        context.stroke()
        context.beginPath()
        context.arc(r/3*2,0,r/3,0,Math.PI*2)
        context.stroke()
        context.beginPath()
        context.arc(0, (r*19/33),r/3,Math.PI*4/6,Math.PI*7/3)
        context.stroke()
        context.beginPath()
        context.arc(0, 2*(r*19/33),r/3,Math.PI*4/3,Math.PI*5/3)
        context.stroke()
        context.beginPath()
        context.arc(r,0,r/3,Math.PI/3*2,Math.PI/3*4)
        context.stroke()

        context.rotate(Math.PI/3)
       
   }     
}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}