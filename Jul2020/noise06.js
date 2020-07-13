
const Noise = toxi.math.noise.simplexNoise.noise;
let seed1 = Math.random()*100;
let seed2 = Math.random()*100;

// alert('CONTROLS\nPress E to adjust object orientation\nPress S to toggle frame screen clear\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = height/6.7,

      timeForward = true,

      strokeW = 1,

      speed = .27,

      clearScreen = true,
      
      pauseAnimation = false,

      viewWidth = 15,
      viewHeight = height ;

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

document.body.style = `margin: 0; backgroundColor: black`;

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
      context.translate(width/2, height/2)   
    context.rotate(Math.PI/2)

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
            seed1 = Math.random()*100
            seed2 = Math.random()*100
            
        }

        // if(clearScreen) clearFullScreen()
        const tX1 = -time*3.5+20, tX2 = (time*4-20)*3.5/2, tY = 0;

        context.save()
            context.translate(tX1,tY)
            createImg(time, 1)
            context.translate(tX2,0)
            createImg(time, 2)
        context.restore()

        context.save()
            context.scale(1,-1)
            context.translate(tX1,tY)
            createImg(time, 1)
            context.translate(tX2,0)
            createImg(time, 2)
        context.restore()

        // return

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame,  30, render)
        }

      }

function createImg(s, num) { 

    
    // context.save()

    s = -s;


    // context.translate(width/2-viewWidth/2,height/2-viewHeight/2)

    const pixSize = 2,
          nRes = time*1.7,
          transX = nRes == 77 ? s/30 : 0,
          seed = num === 1 ? seed1 : seed2,
          mNoise = Noise(seed1,seed2+.1)*1;


    let xCount = 0;

    for (let x = 0; x < viewWidth; x+=pixSize) {
        // console.log(x);
        let yCount = 0;

        for (let y = 0; y < viewHeight; y+=pixSize) {

          const offX = (mapNumber(nRes, 3, timeMax, 0, width*4)/nRes)+transX,
                offY = (mapNumber(nRes, 2.5, timeMax, 0, height*4)/nRes),
                noiseX = ((xCount)/nRes)+offX+seed,
                noiseY = ((yCount)/nRes)+offY+seed,
                divid = time < 40 ? time : 40,
                light = (Math.abs((Noise(noiseX, noiseY)*divid )) % divid)+nRes/3.3+y/12,
                color = (Math.abs((Noise(noiseX, noiseY)*nRes/5 )*nRes/3));

            context.strokeStyle = `hsl(${((-color*1.5)%270)-50}, 100%, ${100-light}%)`; //Math.random()*100

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

    // context.restore()


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