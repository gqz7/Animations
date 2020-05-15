//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      strokeW = 13,
      
      pauseAnimation = false;

context.strokeStyle = 'white';

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


        time = time < 3 ? time+.03: 0;

        clearFullScreen()

        // context.rotate(.01d)
        createImg(100)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 30, render)
        }

      }

function createImg(size) { 

    context.save()

    for (let i = 0; i < 6; i++) {

        if (i%2==0) {
            context.strokeStyle = 'hotpink'
        } else {
            context.strokeStyle = 'limegreen'
        }

        context.beginPath()

        context.moveTo(size,-Math.sqrt(3)*size/3)
        context.lineTo(-size,-Math.sqrt(3)*size/3)
        
        context.stroke()

        context.rotate(Math.PI/3)
    }
    
    context.strokeStyle = 'hotpink'
    
    context.beginPath()

        context.moveTo(-size,-Math.sqrt(3)*size/3)
        context.lineTo(0,-Math.sqrt(3)*size/3)
        
    context.stroke()



    context.restore()
    
}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}