
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random()*100;

// alert('CONTROLS\nPress E to adjust object orientation\nPress S to toggle frame screen clear\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 350,

      timeForward = true,

      strokeW = 1,

      speed = .37,

      clearScreen = true,
      
      pauseAnimation = false,

      viewWidth = 25,
      viewHeight = 750;

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = strokeW;

canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                // cursor: none;
                margin:auto;
                background-color: black`;

document.body.style = `margin: 0`;

document.body.appendChild(canvas)

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    switch (input.code) {

        case 'KeyT':
            rombiPick = rombiPick > 0 ? rombiPick-1 : 14;
            // console.log(rombiPick);         
        break;
        case 'KeyY':
            rombiPick = rombiPick < 14 ? rombiPick+1 : 0;
            // console.log(rombiPick);         
        break;
        case 'KeyS':
            clearScreen = !clearScreen;
        break;
        case 'KeyE':
            tiltWindow = !tiltWindow;
            // console.log(tiltWindow);    
        break;
        case 'Space':
            pauseAnimation = !pauseAnimation;
            if (!pauseAnimation) {
                render()
            }
        break;
        case 'ArrowUp':
            speed = speed < 1 ? speed+.1 : 1;
        break;
        case "ArrowDown":
            speed = speed > .2 ? speed-.1 : .2;
    }

    
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
    //   context.translate(width/2, height/2)   

//ANIMAITON CYCLE

        render()

        function render() {

        if (timeForward && time < timeMax) {
            time+=speed
            // console.log('time++', time);
        } else if (timeForward && time >= timeMax) {

            setTimeout(()=>{timeForward = false;}, 100)

        } else if (!timeForward && time > 1) {
            time-=speed
        } else if ( time <= 1){

            timeForward = true;
            time = 1.1
            seed = Math.random()*100
            
        }

        // if(clearScreen) clearFullScreen()

        createImg(time)

        // return

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame,  0, render)
        }

      }

function createImg(s) { 

    // let mNoise = Noise(seed,seed+.1)*1;
    
    context.save()

    s = -s;

    // context.translate(width/2-viewWidth/2,height/2-viewHeight/2)

    let pixSize = 2;
    let xCount = 0;
    let nRes = time/3;
    let transX = nRes == 77 ? s/30 : 0;

    console.log(nRes);

    context.translate(s*5.4+width,height/2-viewHeight/2)


    for (let x = 0; x < viewWidth; x+=pixSize) {
        // console.log(x);
        let yCount = 0;

        for (let y = 0; y < viewHeight; y+=pixSize) {

          const offX = (mapNumber(nRes, 3, timeMax, 0, width*4)/nRes)+transX,
                offY = (mapNumber(nRes, 2.5, timeMax, 0, height*4)/nRes),
                noiseX = ((xCount)/nRes)+offX+seed,
                noiseY = ((yCount)/nRes)+offY+seed,
                divid = time < 40 ? time : 40,
                light = (Math.abs((Noise(noiseX, noiseY)*divid )) % divid)+nRes/1.5,
                color = Math.abs((Noise(noiseX, noiseY)*divid ) % 10)*divid;

            context.strokeStyle = `hsl(${color}, 50%, ${light}%)`; //Math.random()*100

            context.lineWidth = pixSize;
           
            // console.log(x, y);
            context.beginPath()
            context.moveTo(x,y)
            context.lineTo(x+pixSize,y)
            context.stroke()

            yCount++
            
        }

        xCount++
        
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