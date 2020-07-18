const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random()*100,
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

    const base = seed + time;

    let noise1 = Noise((base+111)/300,(base+111)/300)*130,
        noise2 = Noise((base+777)/300,(base+777)/300)*130,
        noise3 = Noise((base+333)/300,(base+333)/300)*130,
        noise4 = Noise((base+444)/300,(base+444)/300)*130;

    // context.translate((noise3-noise1)/10, (noise2-noise4)/10)

    const mult = 1//.1+time/1000;
        
    for (let i = 0; i < Math.PI*2; i+=Math.PI/35) {

        const 
            x1 =  sin(i) * (width/(7*(1+noise1/373))) ,
            x2 =  noise2,
            y1 =  noise3,
            y2 =  cos(i) * (width/(7*(1+noise4/373)));

        let 
            color = (noise1/289)+(time*3)+(Math.abs(x1, y2)*1);

        context.strokeStyle = `hsl(${color}, 100%, 50%)`;

        context.beginPath()
        context.moveTo(x1*mult, y1*mult)
        context.lineTo(x2*mult, y2*mult)
        context.stroke()

    }
}

const render = () => {
    time++

    clearFullScreen()
    renderImage();

    context.rotate(.005)

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

render()