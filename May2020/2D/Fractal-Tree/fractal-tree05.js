//fractal tree animation

const canvas = document.createElement('canvas'),
context = canvas.getContext('2d'),
width = canvas.width = window.innerWidth,
height = canvas.height =window.innerHeight,

Noise = toxi.math.noise.simplexNoise.noise;

let seed = Math.random();

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
time = 11,
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

    if (timeForward && time < 444) {
        time++
    } else if (timeForward && time >= 444) {
        timeForward = false;
    } if (!timeForward && time > 3) {
        time--
    } else if ( time <= 3 ) {

        seed = Math.random();
        timeForward = true;
        time = 5
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

    size = time/1.7 - tempNoise + 17;

    counter = 0


    create_branch_objs(bAngl, size, root, false, 1); //fills the array will all updated branch objects

    render_tree()

}

function create_branch_objs(agl, len, b, end, lvl) {

    counter+=10

    let 
        X = b.x + len * Math.cos(agl), 
        Y = (b.y + len * Math.sin(agl)),
        sideNoise1 = Noise(counter+seed, counter+seed*1.7)*(1),
        sideNoise2 = Noise(counter+seed+3, counter+seed*1.7+3)*(1);

    // console.log(sideNoise1, sideNoise2);
    let side1 = sideNoise1 > 0 ? 'l' : 'r',
          side2 = sideNoise2 > 0 ? 'r' : 'l'; 


    if (side1 == side2) {
        
        // console.log(true);

        // side2 = side2 == 'r' ? 'l' : 'r';
        
    } else {
        // console.log(false);
        
    }
    let 
        leftB = {
            x1: b.x, y1: -b.y,
            x2:X, y2:-Y,
            l: len,
            side: side1,
            num: lvl
        },
        rightB = {
            x1: -b.x, y1: -b.y,
            x:-X, y:-Y,
            l: len,
            side: side2,
            num: lvl
        };

    branchObjs.push(leftB)
    branchObjs.push(rightB)

    let newB = {
        x: X,
        y: Y
    }

    if (len > bLim) {

        create_branch_objs(agl-bAngl, len*divisor, newB, false, lvl+1)
        create_branch_objs(agl+bAngl, len*divisor, newB, false, lvl+1)

    } else if (!end) {

        let g = mapNumber(len/bLim, divisor, 1, 0, 1);

        create_branch_objs((agl-bAngl*g), (len*divisor)*g, newB, true, lvl+1)
        create_branch_objs((agl+bAngl*g), (len*divisor)*g, newB, true, lvl+1)

    } else {
        counter = 0
    }
}

function render_tree() {
    
    context.save()
    context.translate(width/2, height);
    context.rotate(bAngl-Math.PI/2);

for (let i = 0; i < branchObjs.length ; i++) {

    
    const b = branchObjs[i],
          length = b.l/2,
          light = 100-length < 50 ? 50 : 100-length;

    let curvePoint1 = {}, curvePoint2 = {};

        if (b.side == 'l') {

            curvePoint1.x = b.x1 - (length * Math.cos(90))/(4-b.num/50)
            curvePoint1.y = b.y1 + (length * Math.sin(90))/(4-b.num/50)

            curvePoint2.x = b.x2 + (length * Math.cos(90))/(4-b.num/50)
            curvePoint2.y = b.y2 - (length * Math.sin(90))/(4-b.num/50)

        } else {

            curvePoint1.x = b.x1 + (length * Math.cos(90))/(4-b.num/50)
            curvePoint1.y = b.y1 - (length * Math.sin(90))/(4-b.num/50)

            curvePoint2.x = b.x2 - (length * Math.cos(90))/(4-b.num/50)
            curvePoint2.y = b.y2 + (length * Math.sin(90))/(4-b.num/50)
            
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
        context.lineWidth = length/17;
    
        context.beginPath()

        context.moveTo(b.x1, b.y1)

        context.bezierCurveTo(curvePoint1.x, curvePoint1.y,curvePoint2.x, curvePoint2.y, b.x2, b.y2);

        // context.lineTo( b.x2, b.y2)

        // context.arc(curvePoint1.x, curvePoint1.y,Math.abs(length/10), 0, Math.PI*2)
        // context.stroke()   
        
        // context.beginPath()

        // context.arc(curvePoint2.x, curvePoint2.y,Math.abs(length/10), 0, Math.PI*2)

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
