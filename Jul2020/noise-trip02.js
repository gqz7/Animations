const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const slider = document.createElement("input");
      slider.type="range";
      slider.min=.5;
      slider.max=3;
      slider.step=.1
      slider.value=2;

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random()*100,
    time = 0,
    pauseAnimation = false,
    sliderValue = 2;

document.body.style = `margin: 0`;
canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin: auto;
                background-color: black`;

document.body.appendChild(canvas);
// document.body.appendChild(slider);

context.translate(width/2, height/2);
context.strokeStyle = 'white';
context.lineWidth = 3;

const sin = Math.sin;
const cos = Math.cos;

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
    }
    
}

//ANIMAITON CYCLE

const renderImage = () => {


    const m = 2 + (time/1000000),
          fc = Math.PI*2;

    context.save()

    for (let j = 0; j < 100; j++) {
        
        for (let i = 0; i < 100; i++) {

            const 
            base = m/i*j;
  
      let 
          xTransN = Noise(base/100+412,base/100+1412),
          xTransN1 = Noise(base/100+123,base/100+5412),
          yTransN = Noise(base/100+142,base/100+412),
          yTransN1 = Noise(base/100+124,base/100+142),
  
          xT = (xTransN-xTransN1), 
          yT = (yTransN-yTransN1);

            const p = i/100;
    
            const startA = mapNumber(i, 0, 100, 0, fc );
            const endA = mapNumber(i+1, 0, 100, 0, fc );
            
            context.strokeStyle = `hsl(${p*360}, 100%, 50%)`;
            context.beginPath()
            context.arc(xT,yT,j*3, startA, endA)
            context.stroke()
    
            context.rotate(m*19 )
            
        }
            
    }

    context.restore()
 
}

const render = () => {
    time++

    clearFullScreen()
    renderImage();

    context.rotate(-.004)

    if (!pauseAnimation) {
        setTimeout(window.requestAnimationFrame, 0, render)
    }

}


const clearFullScreen = () => {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

const distance = (x1,x2,y1,y2) => {

    const subX = x1 - x2,
          subY = y1 - y2;

    return Math.sqrt( Math.pow(subX, 2) + Math.pow(subY, 2));
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};


render()