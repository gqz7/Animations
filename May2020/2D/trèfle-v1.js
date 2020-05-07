//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,
      
      pauseAnimation = false;

context.strokeStyle = 'white';

context.lineWidth = 1;

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


        time = time < height ? time*(1+time/7777) + 1: 0;

        clearFullScreen()

        createClover(time*20)

        // context.rotate(.01d)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 30, render)
        }

      }

function createClover(d) {

    let r = d/2,
        count = 0;

    context.save()

    while (r > 1) {

        let color = count * 7 +time+144;

        context.fillStyle = count%2==0? 'white' : 'black';
        // context.strokeStyle = `hsl(${color}, 100%, 70%)`;

        context.beginPath()
        context.arc(0,-Math.sqrt(3)*r,r,Math.PI*2/3,Math.PI*7/3)
        // context.stroke()
        // context.fill()

        // context.beginPath()
        context.arc(r,0,r,Math.PI*4/3,Math.PI)
        // context.stroke()
        // context.fill()

        // context.beginPath()
        context.arc(-r,0,r,Math.PI*6/3,Math.PI*5/3)
        // context.stroke()
        context.fill()

        context.beginPath()
        context.arc(-r*2,0,r*2,Math.PI*2,Math.PI/3)
        context.arc(r*2,0,r*2,Math.PI*2/3,Math.PI)
        // context.stroke()
        context.fill()

        r /= 2;
        count++
        
    }

    


    context.restore()


}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}