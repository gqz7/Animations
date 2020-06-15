
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random();

// alert('CONTROLS\nPress R to toggle object rotation\nPress O to ( Hide / Show ) circles\nPress P to ( Hide / Show ) lines\nPress Space to ( Pause / Play ) animation\nPress T to show ( 1 / 7 ) Metatron Cubes')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 177,

      timeForward = true,

      strokeW = 1,
      
      showArcs = false,

      autoRotate = false,

      showLines = true,

      clearScreen = true,
      
      pauseAnimation = false,

      Meta = 0,
      
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

    switch (input.code) {
        case 'KeyO':

            showArcs = !showArcs;
            
            break;
        case 'KeyP':

            showLines = !showLines;

            break;

        case 'KeyT':

            Meta = Meta < 2 ? Meta+1 : 0;

            break;
    
        case 'KeyR':

            autoRotate = !autoRotate;

            break;
        case 'KeyS':

            clearScreen = !clearScreen;
    
            break;
        case 'Space':

            pauseAnimation = !pauseAnimation;

            if (!pauseAnimation) {
                render()
            }
            
            break;
    
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

            setTimeout(()=>{timeForward = false;}, 100)

        } else if (!timeForward && time > 1) {
            time-=.3
        } else if ( time <= 1){

            timeForward = true;
            time = 1.1
            seed = Math.random()
        }

        if(clearScreen) clearFullScreen()

        createImg(time)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

function createImg(s) { 

    const mNoise = Noise(s/300+seed,s/300+seed)*10;

    // s = 100

    // time = 50

    // createRombi(s) 

    if (Meta == 0) {
        context.save()
            context.rotate(-mNoise/3)
            createRombi(s)
        context.restore()
        context.save()
            context.rotate(mNoise/3)
            createRombi(s)
        context.restore()
    } else if (Meta == 1) {
        context.save()
            context.translate(Math.cos(mNoise)*40,Math.sin(mNoise)*40)
            createRombi(s)
        context.restore()
        context.save()
            context.translate(-Math.cos(mNoise)*40,-Math.sin(mNoise)*40)
            createRombi(s)
        context.restore()
    } else if (Meta == 2) {

        seven_meta_cubes(s)
    } 

    if (autoRotate) {
        
        context.rotate(.01)
        
    }

}

function seven_meta_cubes(s) {

    let m = 6.93;

    context.save()

        context.translate(-s*m, 0)
        createRombi(s)
        context.translate(s*m, 0)
        createRombi(s)
        context.translate(s*m, 0)
        createRombi(s)

    context.restore()

    context.save()

        context.translate(-s*m/2, -s*m*Math.sqrt(3)/2)
        createRombi(s)
        context.translate(0, s*12)
        createRombi(s)

    context.restore()

    context.save()

        context.translate(s*m/2, -s*m*Math.sqrt(3)/2)
        createRombi(s)
        context.translate(0, s*12)
        createRombi(s)

    context.restore()

}

function createRombi(size) {
    
    const light = mapNumber(time*2, 0, timeMax, 0, 100);

    context.save()

    // context.rotate(Math.PI)

    // context.strokeStyle = `hsl(0, 0%, ${light-10}%)`
    context.beginPath()
    context.arc(0,0,size,0,Math.PI*2)
    if (showArcs) {
        context.stroke()
    }


        context.save()

            context.beginPath()

            context.moveTo(size/2,0);

            context.lineTo(0,-size)

            context.lineTo(-size/2,0)

            context.lineTo(0,size)

            context.lineTo(size/2,0)

            if (showLines) {
                context.stroke()
            }

        context.restore()
    

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