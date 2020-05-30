//fractal tree animation

const canvas = document.createElement('canvas'),
context = canvas.getContext('2d'),
width = canvas.width = window.innerWidth,
height = canvas.height =window.innerHeight,

Noise = toxi.math.noise.simplexNoise.noise,
seed = Math.random();

canvas.style = `display: block;
        top: 0px;
        left: 0px;
        cursor: none;
        margin:auto;
        background-color: hsl(177,77%,7%)`;

document.body.style = `margin: 0`;


document.body.appendChild(canvas)

context.strokeStyle = "white";

context.lineWidth = 2;


let startLength = 100,
time = 0,
counter = 0,
pauseAnimation = true,
timeForward = true,

ogAgl = Math.PI / 17,
divisor = .72,
bLim = 20,

bAngl,
tempNoise,

branchObjs = [];

render()

function render() {

clearFullScreen()

    if (timeForward && time < 500) {
        time++
    } else if (timeForward && time >= 500) {
        timeForward = false;
    } if (!timeForward && time > 0) {
        time--
    } else {
        timeForward = true;
    }

    tempNoise = Noise(time/100,time/100+seed);
    bAngl = ogAgl+time/700-tempNoise/700;

    blim = 20 + tempNoise*1000;

// createBackground()
fractal_tree()

//user can toggle pausing of animation via 'spacebar'
if (!pauseAnimation) {

        setTimeout(window.requestAnimationFrame, 0, render)
    }

}

function fractal_tree () {

    branchObjs = [];

    let root = {x:0, y:0},

    size = time/1.7 - tempNoise*10 + 77;

    counter = 0

    create_branch_objs(bAngl, size, root); //fills the array will all updated branch objects

    render_tree()

}

function create_branch_objs(agl, len, b, end) {

    counter+=10

    let 
        X = b.x + len * Math.cos(agl), 
        Y = (b.y + len * Math.sin(agl)),
        sideNoise1 = Noise(counter+seed, counter+seed*1.7)*(1),
        sideNoise2 = Noise(counter+seed/2, counter+seed*1.5+.3)*(1),
        sideNoise3 = Noise(counter+seed+.2, counter+seed*1.4+2)*(1),
        sideNoise4 = Noise(counter+seed*1.2, counter+seed*2)*(1);

    // console.log(counter, b);
    const side1 = sideNoise1 + sideNoise3 > 0 ? 'l' : 'r',
          side2 = sideNoise2 + sideNoise4 > 0 ? 'l' : 'r'; 

    let 
        leftB = {
            x1: b.x, y1: -b.y,
            x2:X, y2:-Y,
            l: len,
            side: side1
        },
        rightB = {
            x1: -b.x, y1: -b.y,
            x:-X, y:-Y,
            l: len,
            side: side2
        };

    branchObjs.push(leftB)
    branchObjs.push(rightB)

    let newB = {
        x: X,
        y: Y
    }

    if (len > bLim) {

        create_branch_objs(agl-bAngl, len*divisor, newB)
        create_branch_objs(agl+bAngl, len*divisor, newB)

    } else if (!end) {

        let g = mapNumber(len/bLim, divisor, 1, 0, 1);

        create_branch_objs((agl-bAngl*g), (len*divisor)*g, newB, true)
        create_branch_objs((agl+bAngl*g), (len*divisor)*g, newB, true)

    } else {
        counter = 0
    }
}

function render_tree() {
    
    context.save()
    context.translate(width/2, height);
    context.rotate(bAngl-Math.PI/2);

for (let i = 0; i < branchObjs.length ; i++) {

    // console.log(i);
    
    
    const b = branchObjs[i],
          length = b.l/2,
          light = 100-length < 50 ? 50 : 100-length;
    
    let curvePoint1 = {}, curvePoint2 = {};

        if (b.side == 'l') {

            curvePoint1.x = b.x1
            curvePoint1.y = b.y1

            curvePoint2.x = b.x2
            curvePoint2.y = b.y2

        } else {

            curvePoint1.x = b.x1 
            curvePoint1.y = b.y1 
            
            curvePoint2.x = b.x2 
            curvePoint2.y = b.y2 
            
            // curvePoint1.x = (b.x1 + b.x2/100) -(Math.pow(b.x1 - b.x2, 2)/(4.2*b.l))
            // curvePoint1.y = b.y1 -(Math.pow(b.y1 - b.y2, 2)/(4.2*b.l))

            // curvePoint2.x = b.x2 - (Math.pow(b.x2 - b.x1, 2)/(4.2*b.l))
            // curvePoint2.y = (b.y1 + b.y2/100) -(Math.pow(b.y2 - b.y1, 2)/(5.2*b.l))


            // curvePoint1.x = b.x1//(b.x1 + b.l/3)/(1-(b.l/1000));
            // curvePoint1.y = b.y1//(b.y1 - b.l/3)/(1-(b.l/1000));

            // curvePoint2.x = b.x2//(b.x2 - b.l/3)/(1-(b.l/1000));
            // curvePoint2.y = b.y2//(b.y2 + b.l/3)/(1-(b.l/1000));

        }

        context.strokeStyle = `hsl(${70 + (time/2)}, 100%, ${light}%)`;
        context.lineWidth = length/80;
    
        context.beginPath()

        context.moveTo(b.x1, b.y1)

        context.bezierCurveTo(curvePoint1.x, curvePoint1.y,curvePoint2.x, curvePoint2.y, b.x2, b.y2);

        context.lineTo( b.x2, b.y2)

        context.stroke()   

}
    context.restore()
}

function clearFullScreen() { 
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    if (input.code == 'Space') {
        
        pauseAnimation = !pauseAnimation;

        if (!pauseAnimation) {
            render()
        }

    }

}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};
