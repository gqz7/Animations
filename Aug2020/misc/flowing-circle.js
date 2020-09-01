//this file uses the simplex noise algorithm from a library

const Noise = toxi.math.noise.simplexNoise.noise,
      pi = Math.PI,
      sqrt = Math.sqrt,
      pow = Math.pow;
let seed = Math.random()*100;
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      time = 0,
      timeMax = Infinity,
      timeForward = true,
      speed = .37,
      clearScreen = true,
      pauseAnimation = false;

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = 1;

canvas.style = `display: block;
                position: static;
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

    context.save();

        for (let x = 0; x < width/20+1; x+=.7) {
            
            for (let y = 0; y < height/20+1; y+=.7) {

                const
                noiseX = x/30 + s/50, 
                noiseY = y/30,
                distance = sqrt( pow((x*20)-(width/2), 2) +  pow((y*20)-(height/2), 2) ),
                N1 = Noise(noiseX, noiseY),
                N2 = Noise(noiseY,noiseX),
                radius = 4-distance/300,
                X = x*20+ N1*(2+time/10)+N2*(2+time/10),
                Y = y*20+ N1*(2+time/10)-N2*(2+time/10);

                context.fillStyle = `hsl(0, 0%, ${100-distance/5}%)`;
                context.beginPath()
                context.arc(X, Y, Math.abs(radius), 0, pi*2)
                context.fill()
                        
            }
            
        }

    context.restore();

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