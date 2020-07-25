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
let seed = 1000//Math.random()*1000,
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
context.lineWidth = 4;

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


    const m = 3 + (time/2000000),
          fc = Math.PI*2,
          jm = 32,
          im = 80;
    let t = time;

    context.save()

    for (let j = jm; j > 0; j--) {

        const q = j/jm;
        
        for (let i = 2 ; i < im; i*=1.3) {

            t++

            const p = (i/im*2)*360;
            const color = ((p+time*2))-100
            const startA = mapNumber(i, 0, im, 0, fc );
            const endA = mapNumber(i+.07, 0, im, 0, fc );
            context.lineWidth = 77*Math.abs(Noise(t/333,time/777+seed));
            context.strokeStyle = `hsl(${color}, 77%, ${80-q*85}%)`;
            context.beginPath()
            context.arc(0,0,j*jm/3, startA, endA)
            context.stroke()
    
            context.rotate(m*38)
            
        }
            
    }

    context.restore()
 
}

const render = () => {
    time++

    clearFullScreen()
    renderImage();

    context.rotate(-.003)

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