//this file uses the simplex noise algorithm from a library

const Noise = toxi.math.noise.simplexNoise.noise,
      pi = Math.PI,
      sqrt = Math.sqrt,
      pow = Math.pow;

let seed = Math.random()*1000,
    mosPos = {
        x: 1000,
        y: 1000,
    };
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      time = 0,
      timeMax = Infinity,
      timeForward = true,
      speed = .4,
      clearScreen = true,
      pauseAnimation = false,
      showLines = true,
      showDots = true;

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = .5;

canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto;
                background-color: black`;

document.body.style = `margin: 0`;

document.body.appendChild(canvas)

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);
canvas.onmousemove = findObjectCoords;

//USER INPUT LOGIC
function userInputEvent(input) {
    switch (input.code) {
        case 'Space':
            pauseAnimation = !pauseAnimation;
            if (!pauseAnimation) {
                render()
            }
        break;
        case 'ArrowUp':
            speed = speed < 4 ? speed+.1 : 4;
        break;
        case "ArrowDown":
            speed = speed > .1 ? speed-.1 : .1;
        break;
        case "KeyL":
            showLines = !showLines;
            if (!showDots && !showLines) showDots = true
        break;
        case "KeyO":
            showDots = !showDots;
            if (!showDots && !showLines) showLines = true
        break;
        case "KeyS":
            clearScreen = !clearScreen;
        break;
        }
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
    //   context.translate(width/2, height/2)   

//ANIMAITON CYCLE

        render()

        function render() {

        if (timeForward && time < timeMax) {
            time+=speed
        } else if (timeForward && time >= timeMax) {
            setTimeout(()=>{timeForward = false;}, 100)
        } else if (!timeForward && time > 1) {
            time-=speed
        } else if ( time <= 1){
            timeForward = true;
            time = 1.1
            seed = Math.random()  
        }

        if(clearScreen) clearFullScreen()

        renderMouse()
            
        createImg(time)
        
        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 10, render)
        }
      }

function createImg(s) { 

    const limits = {
        sX: 0,
        eX: width/20,
        sY: 0,
        eY: height/20,
    },
    
    points = [];

        for (let x = limits.sX; x < limits.eX; x++) {

            points.push([]);
            
            for (let y = limits.sY; y < limits.eY; y++) {

                const
                distance = sqrt( pow((x*20)-(width/2), 2) + pow((y*20)-(height/2), 2) ),
                noiseX = (x/20 + seed ) + s/100 + (distance/113377), 
                noiseY = (y/20 + seed ) + s/100 + (distance/113377),
                N1 = Noise(noiseX, noiseY),
                N2 = Noise(noiseY, noiseX),
                radius = 2+N1+N2 > 1 ? 2+N1+N2 : 1,
                X = x*20 + (N1*20-N2*20),
                Y = y*20 + (N1*20+N2*20)*distance*1.5,

                point = {x: X, y: Y, r: radius, dis: distance };

                points[x-limits.sX].push(point)
                        
            }
            
        }

        renderPoints(points)

}

function renderMouse() {
    context.fillStyle = 'white';                  
    context.beginPath()
    context.arc(mosPos.x, mosPos.y, 2, 0, pi*2)
    context.fill()
}

function renderPoints(arr) {

    // const t = Math.ceil(time/20)

    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr[i].length; j++) {
            
            const p = arr[i][j];

            const pColor = `hsl(${(p.dis/3)*p.r+144}, 100%, 77%)`;

            if (showLines) {
                const px = 
                    arr[i+1] != undefined 
                    ? arr[i+1][j]   
                    : false;
                const py = 
                    arr[i][j+1] != undefined 
                    ? arr[i][j+1]   
                    : false;
                const pxy = 
                    arr[i+1] != undefined 
                    && arr[i+1][j+1] != undefined 
                    ? arr[i+1][j+1] 
                    : false;

                context.strokeStyle = pColor;                  
                
                if (px||py||pxy) {
                    context.beginPath()
                    context.moveTo(p.x,p.y)
                    if (px) context.lineTo(px.x, px.y)
                    if (py) context.lineTo(py.x, py.y)
                    context.lineTo(p.x,p.y)
                    if (pxy) context.lineTo(pxy.x, pxy.y)
                    context.stroke()
                }
            }

            if (showDots) {
                context.fillStyle = pColor;                  
                context.beginPath()
                context.arc(p.x, p.y, p.r, 0, pi*2)
                context.fill()
                
            }

        }
    }

}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};


function findObjectCoords(mouseEvent) {

    let obj = canvas,
        obj_left = 0,
        obj_top = 0,
        xpos,
        ypos;

while (obj.offsetParent)
{
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
}
if (mouseEvent)
{
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
}

xpos -= obj_left;
ypos -= obj_top;

mosPos.x = xpos
mosPos.y = ypos

}