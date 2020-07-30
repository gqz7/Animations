const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = 2410//+Math.random()*100,
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
context.fillStyle = 'white'//`hsl(310, 80%, 50%)`;
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

//frame render
const renderImage = () => {

    // const mainNoise = Noise(time/150+142,time/150+412)/100;

    const maxj = 100;

    context.save()
    for (let j = 1; j < maxj; j+= .5  ) {
    
        const 
            base = seed + j*2,
            cng = 60-j/100-time/500,
            move = cng > 40 ? cng : 40,
            yTransN = (Noise(0,base/(move)+412)*(1.2+j/40)*(1+time/1000)) ;

        context.translate(0,yTransN*1.2);

        // console.log(cng);

        
        for (let i = 0; i < 51; i++) {

            if (i !== 0 && i%2==1) {

                const p = i/51,
                      fc = Math.PI*2,
                      endI = (i+(j/30)),
                      startA = mapNumber(i, 0, 100, 0, fc ),
                      endA = mapNumber(endI, 0, 100, 0, fc ),
                      hue = (-p*360)+Math.abs(yTransN*88)+j*10,
                      light = 85-(j*1.1/maxj)*100,
                
                      radius = (j-1)*10;

                context.lineWidth = 1.5+j/12;
                context.strokeStyle = `hsl(${hue}, 80%, ${light}%)`;
                context.beginPath()
                context.arc(0 , 0, radius, startA, endA)
                context.stroke()

                context.rotate(Math.PI*(1+i))
            } else{

                context.rotate(Math.PI* (1+i))
            }
        }

    }

    context.restore()

    context.beginPath()
    context.arc(0,-2, 1.5*(1+time/1000), 0, Math.PI*2)
    context.fill()



}
//ANIMAITON CYCLE
const render = () => {
    seed-=2
    time++

    clearFullScreen()
    renderImage();

    // context.rotate(-.002)

    if (!pauseAnimation) {
        setTimeout(window.requestAnimationFrame, 20, render)
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