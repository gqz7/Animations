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

        clearFullScreen()

        time = time < height ? time + 1: 0;

        createFlower(time)

        // context.rotate(.01)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 30, render)
        }

      }

function createFlower(d) {

        context.strokeStyle = `white`;

    let r = d/2;

    //render circle to contain FoL
    context.beginPath()
    context.arc(0,0,r,0,Math.PI*2)
    context.stroke()

    //one inner seed is needed to create the FoL

    createSeed(r/3, 0)

    for (let y = 0; y < 6; y++) {

    context.strokeStyle = `hsl(${y*60 + (time*7*(1+time/1000))}, 100%, 50%)`;

    //create 6 outter seeds of life
       createSeed(r/3, r)
    
       renderPetal({
           x: r/Math.sqrt(3)/1.15,
           y: r/3/1.15,
           size: r/3,
           angle: Math.PI*7/6
       })

       context.rotate(Math.PI/3)
        
    }
}

function createSeed(arc, origin) {

    //create outter 6 petals of seed

    for (let i = 0; i < 6; i++) {

        renderPetal({
            x: origin/3*2,
            y: 0,
            size: arc,
            angle: ((Math.PI/3)*i) + Math.PI/6
        })
               
    }

    //create inner 6 petals of seed
    context.save();

    context.translate(origin/3*2,0)

        for (let i = 0; i < 6; i++) {
           
           context.save()

           context.rotate(Math.PI/3*i)

           context.translate(-arc,0)

            renderPetal({
                x: 0,
                y: 0,
                size: arc,
                angle: Math.PI*7/6
            })
            
            context.restore();
        }

    context.restore();
}


function renderPetal(p) { //p {x, y, size, angle}

    let a1 = Math.PI - Math.PI/6, a2 = Math.PI + Math.PI/6;

    context.save();

    context.translate(p.x,p.y)

    context.rotate(p.angle)

    context.beginPath()
    context.arc(0,0,p.size,a1,a2)
    context.stroke()

    context.translate(-p.size*Math.sqrt(3),0)
    context.rotate(Math.PI)
    context.beginPath()
    context.arc(0,0,p.size,a1,a2)
    context.stroke()

    context.restore();
}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}