const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Array.from(Array(2), (_, i) => Math.random()*3333),
    time = 0,
    pauseAnimation = false;

    console.log(seed);

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
context.rotate(Math.PI/2);

context.strokeStyle = 'white';
context.lineWidth = 1;

//constants for spacing calculation 
const sin = Math.sin;
const cos = Math.cos;

const 
cInt1 = 347,
cInt2 = 373,
cInt3 = 20,
cInt4 = 300,
cInt5 = 37;

let
mult,
base, 
noise1,
noise2,
noise3,
noise4;



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
    

    for (let i = 0; i < seed.length; i++) {
        
        setGlobalVars(i)

        renderTrigShape()
    }

}
 
const renderTrigShape = () => {
    const
        xTransN = Noise(base/1321+412,base/1321+1412),
        xTransN1 = Noise(base/1321+123,base/1321+5412),
        yTransN = Noise(base/1321+142,base/1321+412),
        yTransN1 = Noise(base/1321+124,base/1321+142);

    context.save()

    context.rotate(noise3/1000)

    context.translate((xTransN-xTransN1)*173, (yTransN-yTransN1)*173)

    for (let i = 0; i < Math.PI*2; i+=Math.PI/cInt3) {

        const 
            x1 =  sin(i) * (cInt1*(1+(noise1/cInt2))),
            x2 =  noise2,
            y1 =  noise3,
            y2 =  cos(i) * (cInt1*(1+(noise4/cInt2))),

            maxDis = distance(cInt1*(1+cInt5/cInt2), 0, 0, cInt1*(1+cInt5/cInt2));

        let 
            color = (noise1/289)+(time*3.7)+(Math.abs(x1, y2)/2),
            light = mapNumber(distance(x1, x2, y1, y2), 30, maxDis, 0, 100);

        context.strokeStyle = `hsl(${color}, 100%, ${light}%)`;

        context.beginPath()
        context.moveTo(x1*mult, y1*mult)
        context.lineTo(x2*mult, y2*mult)
        context.stroke()

    }

    context.restore()

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

const mapNumber = (number, min1, max1, min2, max2) => {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};

const setGlobalVars = (sNum) => {
    mult = time/7000+.1 < .3 ? time/7000+.1 : .3;
    base = seed[sNum] + time;
    noise1 = Noise((base+111)/cInt4,(base+111)/cInt4)*cInt5;
    noise2 = Noise((base+777)/cInt4,(base+777)/cInt4)*cInt5;
    noise3 = Noise((base+333)/cInt4,(base+333)/cInt4)*cInt5;
    noise4 = Noise((base+444)/cInt4,(base+444)/cInt4)*cInt5;
}


render()