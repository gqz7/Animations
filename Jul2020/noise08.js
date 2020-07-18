const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random(),
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

    let noise1 = (Noise(time/300,time/300)*130),
        noise2 = Noise((time+777)/300,(time+777)/300)*130,
        noise3 = Noise((time+333)/300,(time+333)/300)*130,
        noise4 = Noise((time+444)/300,(time+444)/300)*130;
        noise5 = Noise((time+999)/900,(time+999)/900)*360;

    const mult = .1+time/1000-Math.abs(noise1/1000);
          div = 70+time/10 < 1000 ? 70+time/10 : 1000;
        
    for (let i = 0; i < Math.PI*2; i+=Math.PI/div) {

        const 
            x1 =  sin(i) * (width/(7*(1+noise1/373))) ,
            x2 =  0,
            y1 =  0,
            y2 =  cos(i) * (height/(7*(1+noise4/373))),
            color = time*4 + noise5 + Math.abs(x1*y2)/10,
            light = 50;

        context.strokeStyle = `hsl(${color}, 100%, ${light}%)`;

        context.beginPath()
        context.moveTo(x1*mult, y1*mult)
        context.lineTo(x2*mult, y2*mult)
        context.stroke()

    }
}

const render = () => {
    time++

    // clearFullScreen()
    renderImage();

    context.rotate(.004)

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

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};

render()