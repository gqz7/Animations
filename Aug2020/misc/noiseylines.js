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
      speed = 1,
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
            speed = speed < 3 ? speed+.1 : 3;
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

        time+=speed

        // if(clearScreen) clearFullScreen()
            
        lines(time)
        
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


function lines(t) {

    
    const colors = ['limegreen','yellow', 'aqua', 'magenta', 'coral']
    


    for (let i = 0; i < 500; i++) {

                
        for (let j = 0; j < colors.length; j++) {

            const originX = (Noise(seed/777+i/1000, seed+5321/777+i/1000))*width;
            const originY = (Noise(seed+1100/777+i/1000, seed+300+t/777+i/1000))*height;
    
            
            const noiseConst = seed+t/1000
            const noiseX = Noise(noiseConst+((j+1)*100), noiseConst+((j+1)*200));
            const noiseY = Noise(noiseConst+((j+1)*200), noiseConst+((j+1)*400));
    
            
            context.fillStyle = colors[j];                  
            context.beginPath()
            context.arc(originX+(noiseX)*33.5, originY+(noiseY)*33.5, 1.5, 0, pi*2)
            context.fill()
            
                
        }
        
    }
    


}