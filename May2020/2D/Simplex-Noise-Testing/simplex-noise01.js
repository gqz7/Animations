let Noise = toxi.math.noise.simplexNoise.noise;

//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      strokeW = 1,
      
      pauseAnimation = false,

      colorIndex = 0,

      colorPairs = [['hotpink', 'lime'], ['lightsalmon', 'skyblue'], ['darkslategrey', 'lightgoldenrodyellow'], ['plum', 'yellow']];

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = strokeW;

canvas.style = `display: block;
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
      context.translate(0, height/2)

//ANIMAITON CYCLE

        render()

        function render() {

        time++
        clearFullScreen()

        makeNoise()

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

function makeNoise() {

    context.save()

    let count = 0,

        resolution = 2 +time/1000;

    for (let i = 0; i < width; i+=resolution) {


        let noiseNow = Noise((time+count)/30,(time+72+count)/30)*height/3, 
            noiseNext = Noise((time+1+count)/30,(time+73+count)/30)*height/3,

            dif = noiseNext-noiseNow;

            context.strokeStyle = `hsl(${40-dif}, 100%, 50%)`;
            
            context.beginPath()
            context.moveTo(0,noiseNow)
            context.lineTo(resolution,noiseNext)
            context.stroke()

            context.translate(resolution,0)
        
        count++
    }

    context.restore();
    

}