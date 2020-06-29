
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random();

// alert('CONTROLS\nPress E to adjust object orientation\nPress S to toggle frame screen clear\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 777,

      timeForward = true,

      strokeW = 1,

      speed = .37,

      clearScreen = true,
      
      pauseAnimation = false,

      tiltWindow = false,

      rombiPick = 14;

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
            setTimeout(window.requestAnimationFrame, 0, render)
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
            s/=1.3
            seven_rombi(s, mNoise)
            seven_rombi(s, mNoise+Math.PI)
            seven_rombi(s, -mNoise)
            seven_rombi(s, -mNoise+Math.PI)

            break;
        case 3:
            mNoise/=2;
            s/=1.3
            seven_rombi(s, mNoise)
            seven_rombi(s, mNoise+Math.PI/3)
            seven_rombi(s, mNoise-Math.PI/3)
            seven_rombi(s, -mNoise)
            seven_rombi(s, -mNoise+Math.PI/3)
            seven_rombi(s, -mNoise-Math.PI/3)
            break;
        case 4:
            const maxSize = time/5+10 < height ? time/5+10 : height;
            context.rotate(mNoise/4)
            for (let i = 2; i <maxSize; i*= (1.2)* (1+Math.abs(mNoise/50))) {
                const light = maxSize-i,
                    size = (i*10);
                    
                createRombi({size: size, light: light})
            }
            break;
        case 5:
            const mNoise2 = Noise(s/170+seed,s/170+seed)*17
            let count = 0, intDiv = 1/(time/100) > 1.4 * (1+mNoise2/100)? 1/(time/100) :1.4 * (1+mNoise2/100);
            for (let i = 100; i > 1 && count < 1000 ; i/= intDiv) {
                count++
                let light = i*3;
                context.lineWidth = i/10 < 2 ? i/10 : 2;
                createRombi({size: (s/(1+i/7)+3)*3, light: light})
            }
            break;
        case 6:
            for (let i = 1+s/1000; i < width; i*=1.27*(1+s/500)) {
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
        context.save()
            context.rotate(Math.PI/2)
            context.lineWidth = .8;
            context.strokeStyle = 'white';
            const divd = time/30 + 1;
            for (let z = divd; z > 1; z--) {
                context.rotate(Math.PI/divd)

                for (let i = 1; i < 1000+time/1; i*=1+(.2+time/2222)) {

                    if (z-1<1) context.lineWidth = divd%1;

                    context.save()
                    context.rotate(Math.PI*(i/12222)*(1+time/100))
                    createRombi({size: (s/(1+i/70)+3)*3*1.07})
                    context.restore()
                }
            }    
            context.beginPath()
            context.arc(0,0,1,0,7)
            context.stroke()
            context.restore()
            break;
        case 9:
                mNoise/=10;
                maxIter = 150;
            for (let i = maxIter; i > 0; i--) {
                const noiseNum = i/1000+Math.abs(mNoise);
                const newNoise = Noise(noiseNum,noiseNum)*mapNumber(time, 0, timeMax, 0, 22);
                let light = mapNumber(i, 0, maxIter, 0, 100);
                context.strokeStyle = `hsl(0, 0%, ${light}%)`;
                seven_rombi(i, newNoise)
                seven_rombi(i, newNoise+Math.PI)
                seven_rombi(i, -newNoise)
                seven_rombi(i, -newNoise+Math.PI)
            }
            break;
        case 10:
                mNoise/=5;
                maxIter = 167;
            for (let i = maxIter; i > 1; i = i/1.01-.5) {
                const noiseNum = i/500+Math.abs(mNoise);
                const newNoise = Noise(noiseNum,noiseNum)*mapNumber(time, 0, timeMax, 2, 17);
                let light = mapNumber(i, 0, maxIter, 5, 90);
                context.lineWidth = mapNumber(i, 0, maxIter, .1, 1);
                context.strokeStyle = `hsl(0, 0%, ${light}%)`;
                seven_rombi(i, newNoise/2)
                seven_rombi(i, newNoise+Math.PI/3)
                seven_rombi(i, newNoise-Math.PI/3)
                seven_rombi(i, -newNoise/2)
                seven_rombi(i, -newNoise+Math.PI/3)
                seven_rombi(i, -newNoise-Math.PI/3)
            }
            break;
        case 11:
                mNoise/=10;
                maxIter = 147;

                context.rotate(time/100)
            for (let i = maxIter; i > 0; i-=.7*(1+i/1000)) {
                const noiseNum = i/1000+Math.abs(mNoise);
                const newNoise = Noise(noiseNum,noiseNum)*mapNumber(time, 0, timeMax, 7, 22);
                let light = mapNumber(i, 0, maxIter, 95, 5);
                context.strokeStyle = `hsl(0, 0%, ${light}%)`;
                seven_rombi(i, newNoise)
                seven_rombi(i, newNoise+Math.PI)
                seven_rombi(i, -newNoise)
                seven_rombi(i, -newNoise+Math.PI)

                context.rotate(.001)
            }
            break;
        case 12:
                mNoise/=37;
                maxIter = 167;
                context.rotate(time/100)
            for (let i = maxIter; i > 0; i-=1*(1+i/2000)) {
                const noiseNum = i/1000+(mNoise);
                const newNoise = Noise(noiseNum,noiseNum)*22
                let light = mapNumber(i, 0, maxIter, 90, 0);
                context.strokeStyle = `hsl(${i-time}, 50%, ${light}%)`;
                seven_rombi(i, newNoise)
                seven_rombi(i, newNoise+Math.PI)
                seven_rombi(i, -newNoise)
                seven_rombi(i, -newNoise+Math.PI)

                context.rotate(mNoise/20)
            }
            break;
         case 13:
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
        case 14:
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
                context.strokeStyle = `hsl(${i*1.17+(mNoise*117+134)}, 70%, ${light}%)`;
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
        // createRombi({size: s, angle: a})
        // context.translate(s*m/3.42, 0)
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
    const {size, angle, light} = rombiObj;
    if (light) {
        context.strokeStyle = `hsl(0,0%,${light}%)`;
    }
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