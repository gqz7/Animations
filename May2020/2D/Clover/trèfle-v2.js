console.log('Controls:\nSpace - Pause/Play animation\nLeft Arrow - decrease size between clovers\nRight Arrow - increase size between clovers\nUp Arrow - increase min. size of clover\nDown Arrow - decrease min. size of clover\n\'D\' - Show/Hide center "focus" dot' );
alert('Look in dev console for animation controls')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      minRadius = 7,

      radiusDivisor = 1.23,
      
      pauseAnimation = false,

      showDot = false;

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

    switch (input.code) {
        case 'Space':

            pauseAnimation = !pauseAnimation;

            if (!pauseAnimation) {
                render()
            }
            
            break;

            case 'ArrowLeft':

                radiusDivisor = radiusDivisor > 1.06 ? radiusDivisor-.01 : 1.06;

            break;

            case 'ArrowRight':

                radiusDivisor = radiusDivisor < 2 ? radiusDivisor+.01 : 2;

            break;

            case 'ArrowDown':

                minRadius = minRadius > 1 ? minRadius-1 : 1;

            break;

            case 'ArrowUp':

                minRadius = minRadius < 177 ? minRadius+1 : 177;

            break;

            case 'KeyD':

            showDot = !showDot;

            break;
    
    }

    
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/2)

//ANIMAITON CYCLE

        render()

        function render() {


        time = time < height/2? time*(1+time/7777) + .1: minRadius;

        clearFullScreen()

        createClover(time*20)

        // context.rotate(.01d)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 10, render)
        }

      }

function createClover(d) {

    let r = d/2,
        color
        count = 0;

    context.save()

    while (r > minRadius) {

        color = count * 7 +time+144;

        context.fillStyle = count%2==0? 'white' : 'black';
 
        context.beginPath()
        context.arc(0,-Math.sqrt(3)*r,r,Math.PI*2/3,Math.PI*7/3)

        context.arc(r,0,r,Math.PI*4/3,Math.PI)

        context.arc(-r,0,r,Math.PI*6/3,Math.PI*5/3)

        context.arc(-r*2,0,r*2,Math.PI*2,Math.PI/3)
        context.arc(r*2,0,r*2,Math.PI*2/3,Math.PI)
        context.fill()

        r /= radiusDivisor;
        count++
        
    }

    if (showDot) {
        context.fillStyle = 'hotpink';
        context.beginPath()
        context.arc(0,-r/2,r/2,0,Math.PI*2)
        context.fill()
    }

    context.restore()


}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}