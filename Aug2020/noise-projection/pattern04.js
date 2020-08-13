const Noise = toxi.math.noise.simplexNoise.noise;
let seed1 = (Math.random()*300);
let seed2 = (Math.random()*400);

// alert('CONTROLS\nPress E to adjust object orientation\nPress S to toggle frame screen clear\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      strokeW = 1,
      speed = .01,
      pauseAnimation = true,
      viewWidth = width/2;

// context.strokeStyle = 'white';
// context.fillStyle = 'white';

// context.lineWidth = strokeW;

canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                // cursor: none;
                margin:auto;
                background-color: white`;

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
            speed = speed > .003 ? speed-.1 : .003;
    }
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
    context.translate(width/3+80, height/2)   
    context.rotate(Math.PI/2)

//ANIMAITON CYCLE
render()

function render() {
    seed1+=speed;
    seed2+=speed;
    // clearFullScreen()
    renderNoise()
    // return
    if (!pauseAnimation) {
        setTimeout(window.requestAnimationFrame,  0, render)
    }
}
function renderNoise() {
    const maxH =141,  vertRes = .2;
    for (let i = 7.6; i < maxH; i+=vertRes) {
        context.save()
        context.translate(-i*3.5+30,-viewWidth/4)
        createImg(-i, maxH, seed1)
        context.translate((i*4-30)*3.5/2,0)
        createImg(-i, maxH, seed2)
        context.restore()
    }
}

function createImg(nRes, max, seed) { 
    for (let y = .5; y < viewWidth; y++) {
          const offX = (mapNumber(nRes, 12+(nRes/900)/3.4, max, 0, width*2)/nRes/4.2),
                offY = (mapNumber(nRes, (1+nRes/5000)*(1+y*1/nRes*.071), max, 0, height*2)/nRes/1.2),
                noiseX = ((1*10)/(nRes*13))-offX/2+seed,
                noiseY = ((y*7)/(nRes*19))-offY/13+seed/3,
                divid = nRes/1.2 < 20 ? nRes/1.2 : 20,
                light = ((Math.abs(( Noise(noiseX, noiseY)*divid/2 )) % divid)+(nRes/1.37)+70)+((y/max*90)/7.7);
                if (light < 98) {
                    const color = (Math.abs((Noise(noiseX, noiseY)*divid ) % 10)*divid/1.2)+nRes*2-60;
                    context.strokeStyle = `hsl(${color}, 50%, ${light}%)`; //Math.random()*100
                    context.beginPath()
                        context.moveTo(1,y)
                        context.lineTo(2,y)
                        context.moveTo(1,-y)
                        context.lineTo(2,-y)
                    context.stroke()
                }
    }
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