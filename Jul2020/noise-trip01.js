const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = 333 //Math.random()*100,
    time = 0,
    pauseAnimation = false;

document.body.style = `margin: 0`;
canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin: auto;
                background-color: black`;

document.body.appendChild(canvas);

context.translate(width/2, height/2);
context.strokeStyle = 'white';

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

    const 
    base = seed + time,
    cInt1 = 347,
    cInt2 = 373,
    cInt3 = 35,
    cInt4 = 300,
    cInt5 = 130;

    let noise1 = Noise((base+111)/cInt4,(base+111)/cInt4)*cInt5,
        noise2 = Noise((base+777)/cInt4,(base+777)/cInt4)*cInt5,
        noise3 = Noise((base+333)/cInt4,(base+333)/cInt4)*cInt5,
        noise4 = Noise((base+444)/cInt4,(base+444)/cInt4)*cInt5,

        xTransN = Noise(base/100+412,base/100+1412),
        xTransN1 = Noise(base/100+123,base/100+5412),
        yTransN = Noise(base/100+142,base/100+412),
        yTransN1 = Noise(base/100+124,base/100+142),

        xT = (xTransN-xTransN1), 
        yT = (yTransN-yTransN1);

    context.translate(xT/20, yT/1.2);

    
    for (let i = 0; i < 100; i++) {
        const p = i/100,
              fc = Math.PI*2;

        const startA = mapNumber(i, 0, 100, 0, fc );
        const endA = mapNumber(i+1, 0, 100, 0, fc );
        
        context.strokeStyle = `hsl(${p*360+(time*7)}, 90%, 70%)`;
        context.beginPath()
        context.arc(xT, yT,time, startA, endA)
        context.stroke()

        context.rotate(Math.PI* (1+i))

        
    }

}

const render = () => {
    time++

    // clearFullScreen()
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