//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 77,

      timeForward = true,

      strokeW = 1,
      
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
            time+=.37
            // console.log('time++', time);
        } else if (timeForward && time >= timeMax) {

            setTimeout(()=>{timeForward = false;}, 500)

        } else if (!timeForward && time > 1) {
            time-=.3
        } else if ( time <= 1){

            timeForward = true;
            time = 1.1
        }

        clearFullScreen()

        createImg(time)


        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 10, render)
        }

      }

function createImg(s) { 

    let m = 6.93;

    // s = 100

    // time = 50

    context.save()

    context.translate(-s*m, 0)
    createMetatron(s)
    context.translate(s*m, 0)
    createMetatron(s)
    context.translate(s*m, 0)
    createMetatron(s)

    context.restore()

    context.save()

    context.translate(-s*m/2, -s*m*Math.sqrt(3)/2)
    createMetatron(s)
    context.translate(0, s*12)
    createMetatron(s)

    context.restore()

    context.save()

    context.translate(s*m/2, -s*m*Math.sqrt(3)/2)
    createMetatron(s)
    context.translate(0, s*12)
    createMetatron(s)

    context.restore()

}

function createMetatron(size) {
    
    const light = mapNumber(time, 0, timeMax, 0, 120);

    context.save()

    context.rotate(Math.PI)

    context.strokeStyle = `hsl(0, 0%, ${light}%)`
    context.beginPath()
    context.arc(0,0,size,0,Math.PI*2)
    context.stroke()
    

    for (let i = 0; i < 6; i++) {

        context.save()

            context.strokeStyle = `hsl(0, 0%, ${light-10}%)`

            //vertical poles
            context.beginPath()
            context.moveTo(0,0)
            context.lineTo(0,size*4)
            context.stroke()

            context.strokeStyle = `hsl(0, 0%, ${light-15}%)`

            //first innercircle one d (2r) away from origin (center screen)
            context.translate(0,size*2)
            context.beginPath()
            
            context.arc(0,0,size,0,Math.PI*2)
            
            //line out to other inner circles on second and third level
            context.moveTo(0,0)
            context.lineTo(size*1.73,-Math.sqrt(3)*size*1.73)
            
            context.moveTo(0,0)
            context.lineTo(size*Math.sqrt(3),-size)

            context.strokeStyle = `hsl(0, 0%, ${light-20}%)`
            context.stroke()

            //second innercircle
            context.translate(0,size*2)
            context.beginPath()
            context.arc(0,0,size,0,Math.PI*2)
            context.strokeStyle = `hsl(0, 0%, ${light-30}%)`
            context.stroke()

            context.rotate(Math.PI*2/3)

            //creates lines for outter hexagon
            context.beginPath()
            context.moveTo(0,0)
            context.lineTo(0,size*4)

            context.strokeStyle = `hsl(0, 0%, ${light-40}%)`
            context.stroke()

            //line from level 3 inner-circles to level 2 inner-circles
            context.rotate(Math.PI/6)

            context.beginPath()
            context.moveTo(0,0)
            context.lineTo(0,size*6.93)

            context.strokeStyle = `hsl(0, 0%, ${light-50}%)`
            context.stroke()

            context.rotate(Math.PI/16.5)

            context.beginPath()
            context.moveTo(0,0)
            context.lineTo(0,size*5.3)

            context.strokeStyle = `hsl(0, 0%, ${light-60}%)`
            context.stroke()

            context.rotate(Math.PI/4.7)

            context.beginPath()
            context.moveTo(0,0)
            context.lineTo(0,size*5.3)

            context.strokeStyle = `hsl(0, 0%, ${light-70}%)`
            context.stroke()

        context.restore()

        context.rotate(Math.PI/3)
    }

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