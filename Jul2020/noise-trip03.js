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
context.lineWidth = 12;

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


    const m = 3 + (time/7000000),
          fc = Math.PI*2,
          jm = 30,
          im = 100;

    context.save()

    for (let j = jm; j > .1; j/=1.1) {

        const q = j/jm;
        
        for (let i = 2; i < im; i+=1.5) {

            const p = (i/im*2)*360;
    
            const startA = mapNumber(i, 0, im, 0, fc );
            const endA = mapNumber(i+(.07+.002*j), 0, im, 0, fc );
            
            context.lineWidth = j*2;
            context.strokeStyle = `hsl(${p+time*3}, 100%, ${80-q*85}%)`;
            context.beginPath()
            context.arc(0,0,j*jm/2, startA, endA)
            context.stroke()
    
            context.rotate(m*18)
            
        }
            
    }

    context.restore()

    context.rotate(-.002)

 
}

const render = () => {
    time++

    clearFullScreen()
    renderImage();


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