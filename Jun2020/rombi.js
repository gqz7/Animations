
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random();

// alert('CONTROLS\nPress R to toggle object rotation\nPress O to ( Hide / Show ) circles\nPress P to ( Hide / Show ) lines\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 200,

      timeForward = true,

      strokeW = 1,
      
      showArcs = false,

      autoRotate = false,

      showLines = true,

      clearScreen = true,
      
      pauseAnimation = false,

      Meta = 8,
      
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

            Meta = Meta > 0 ? Meta-1 : 7;
            console.log(Meta);         
            break;
        case 'KeyY':

            Meta = Meta < 11 ? Meta+1 : 0;
            console.log(Meta);         
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

    let mNoise = Noise(s/300+seed,s/300+seed)*10;

    // s = 130
    // time = 150

    switch (Meta) {
        case 0:
            createRombi({size: s, angle: mNoise/3})
            createRombi({size: s, angle: -mNoise/3})

            break;
        case 1:
            createRombi({size: s, angle: -mNoise/2})
            createRombi({size: s, angle: mNoise/2})
            createRombi({size: s, angle: mNoise/2+Math.PI/2})
            createRombi({size: s, angle: -mNoise/2+Math.PI/2})        
            
            break;
        case 2:
            mNoise/=2;
            seven_meta_cubes(s, mNoise)
            seven_meta_cubes(s, mNoise+Math.PI)
            seven_meta_cubes(s, -mNoise)
            seven_meta_cubes(s, -mNoise+Math.PI)
            
            break;
        case 3:
            mNoise/=2;
            seven_meta_cubes(s, mNoise)
            seven_meta_cubes(s, mNoise+Math.PI/3)
            seven_meta_cubes(s, mNoise-Math.PI/3)
            seven_meta_cubes(s, -mNoise)
            seven_meta_cubes(s, -mNoise+Math.PI/3)
            seven_meta_cubes(s, -mNoise-Math.PI/3)
            break;
        case 4:
            for (let i = 2; i <50; i++) {
                createRombi({size: (s/(1+i/7)+3)*3*1.07})
            }
            break;
        case 5:
            for (let i = 200; i > 1; i/=1.5/(.7+time/300)) {
                let light = i*3.07; 
                createRombi({size: (s/(1+i/7)+3)*8, light: light})
            }
            break;
        case 6:
            for (let i = 1+s/1000; i < width; i*=1.27*(1+time/500)) {
                let light = 50-i/200; 
                context.save()
                context.rotate(Math.PI/2)
                createRombi({size: i, light: light})
                context.restore()
            }
            break;
        case 7:
            for (let i = 1; i < 777; i*=1+(.7+time/300)) {
                context.save()
                context.rotate(Math.PI*(i/777))
                createRombi({size: (s/(1+i/7)+3)*3*1.07})
                context.restore()
            }
            break;
        case 8:

            context.rotate(time/1111)
            for (let i = 1; i < 1000+time/1; i*=1+(.2+time/2222)) {
                context.save()
                context.rotate(Math.PI*(i/12222)*(1+time/100))
                createRombi({size: (s/(1+i/70)+3)*3*1.07})
                context.restore()
            }
            
            break;
        case 9:

            for (let i = 1; i < 1000+time/1; i*=1+(.7+time/2222)) {
                context.save()
                context.rotate(Math.PI*(i/12222)*(1+time/100))
                createRombi({size: (s/(1+i/70)+3)*3*1.07})
                context.restore()
            }
            
            break;
    
        default:
            break;
    }

    if (autoRotate) {
        
        context.rotate(.01)
        
    }

}

function seven_meta_cubes(s, a) {

    let m = 6.93;

    a/=2;

    context.save()

        context.translate(-s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        context.translate(s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        context.translate(s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(-s*m/8*1.0714, -s*m*Math.sqrt(3)/8*1.2)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.2)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(s*m/8*1.0714, -s*m*Math.sqrt(3)/8*1.2)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.2)
        createRombi({size: s, angle: a})
        
    context.restore()

}

function createRombi(rombiObj) {

    const {size, angle} = rombiObj,
    
    light = rombiObj.light ? rombiObj.light : mapNumber(time, 0, timeMax, 0, 100);
    
    context.save()

    if (angle) context.rotate(angle);
    // context.rotate(Math.PI)
    context.strokeStyle = `hsl(0, 0%, ${light}%)`
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