
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random();

// alert('CONTROLS\nPress E to adjust object orientation\nPress S to toggle frame screen clear\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 333,

      timeForward = true,

      strokeW = 1,

      speed = .57,

      clearScreen = true,
      
      pauseAnimation = false,

      tiltWindow = false,

      rombiPick = 1;

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
            seed = Math.random()
            
        }

        if(clearScreen) clearFullScreen()

        createImg(time)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 3, render)
        }

      }

function createImg(s) { 

    let mNoise = Noise(s/300+seed,s/300+seed+.1)*10,
        light = mapNumber(time, 0, timeMax, 0, 100);

        context.lineWidth = 1.5;
        context.strokeStyle = `hsl(0, 0%, ${light}%)`

    context.save()

    if (tiltWindow) context.rotate(Math.PI/2);

    let maxIter;

    switch (rombiPick) {
        
         case 1:
                context.lineWidth = .3;
                mNoise/=7;
                maxIter = 150;
                context.rotate(mNoise)
            for (let i = maxIter; i > 0; i-=.5) { //*(1+mapNumber(i, maxIter, 0, 0, (timeMax/10 - time/10)))
                const noiseNum = i/300+(mNoise);
                const newNoise = Noise(noiseNum,noiseNum)*(9/(1+i/100)); 
                let light = mapNumber(i, 0, maxIter, 95, 0);
                context.strokeStyle = `hsl(${i-time}, 50%, ${light}%)`;
                seven_rombi(i, newNoise)
                seven_rombi(i, newNoise+Math.PI)
                seven_rombi(i, -newNoise)
                seven_rombi(i, -newNoise+Math.PI)

                context.rotate(mapNumber(i, 0, maxIter, 0, -(timeMax/777 - time/777))/i)
            }
            break;
        case 2:
                context.lineWidth = .4;
                mNoise/=7;
                maxIter = height/9;
                context.rotate(-mNoise/2+time/100)
                context.strokeStyle = `hsl(${mNoise*117+134}, 70%%, 70%)`;;
                context.beginPath()
                context.arc(0,0,2,0,Math.PI*2)
                context.fill()
            for (let i = maxIter; i > 1; i-=.77) {
                const noiseNum = i/300+(mNoise);
                const newNoise = Noise(noiseNum,noiseNum)*mapNumber(i, 0, maxIter, 7, 0);
                let light = mapNumber(i, 0, maxIter, 95, 0);
                context.strokeStyle = `hsl(${i*1.37+(mNoise*317+134)}, 100%, ${light}%)`;
                seven_rombi(i, newNoise);
                seven_rombi(i, newNoise+Math.PI);
                seven_rombi(i, -newNoise);
                seven_rombi(i, -newNoise+Math.PI);
                context.rotate(.0004*(mNoise*20))
            }
            break;
    
        default:
            break;
    }

    context.restore()


}

function seven_rombi(s, a) {
    let m = 6.93;
    a/=2;
    context.save()

        context.translate(-s*m/3.42, 0)
        createRombi({size: s, angle: a})
        context.translate(s*m/3.42*2, 0)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(-s*m/6.9, -s*m*Math.sqrt(3)/8*1.17)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.17)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(s*m/6.9, -s*m*Math.sqrt(3)/8*1.17)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.17)
        createRombi({size: s, angle: a})
        
    context.restore()

}

function createRombi(rombiObj) {
    const {size, angle} = rombiObj;

    context.save()

        if (angle) context.rotate(angle)

        context.beginPath()
        context.moveTo(size/2,0);
        context.lineTo(0,-size)
        context.lineTo(-size/2,0)
        context.lineTo(0,size)
        context.lineTo(size/2,0)
        context.stroke()
 
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