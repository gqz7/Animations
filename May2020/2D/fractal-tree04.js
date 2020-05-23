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

        if (timeForward && time < 400) {
            time++
        } else if (timeForward && time >= 400) {
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
        fractal_tree(bAngl)
        
        //user can toggle pausing of animation via 'spacebar'
        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

function fractal_tree () {

    branchObjs = [];

    let root = {x:0, y:0},

    size = time/1.7 - tempNoise*10;

    create_branch_objs(bAngl, size, root); //fills the array will all updated branch objects

    render_tree()

}

function create_branch_objs(agl, len, b, end) {

    let X = b.x + len * Math.cos(agl), Y = (b.y + len * Math.sin(agl));

    let 
        leftB = {
            x1: b.x, y1: -b.y,
            x2:X, y2:-Y,
            l: len
        },
        rightB = {
            x1: -b.x, y1: -b.y,
            x:-X, y:-Y,
            l: len
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
        
    }
}

function render_tree() {
    context.save()
    context.translate(width/2, height);
    context.rotate(bAngl-Math.PI/2)
        for (let i = 0; i < branchObjs.length ; i++) {
            
            const b = branchObjs[i],
                  length = b.l/2,
                  light = 100-length < 50 ? 50 : 100-length,

                  curvePoint1 = {
                      x: b.x1*1.1 + 20* Math.cos(45),
                      y: b.y1*1.1 + 20* Math.cos(45),
                  },
                  curvePoint2 = {
                        x: b.x1*1.1 - 20* Math.cos(45),
                        y: b.y1*1.1 - 20* Math.cos(45),
                  };
            
                context.strokeStyle = `hsl(${70 + (time/2)}, 100%, ${light}%)`;
                context.lineWidth = length/10;
            
                context.beginPath()

                context.moveTo(b.x1, b.y1)

                context.bezierCurveTo(curvePoint1.x, curvePoint1.y,curvePoint2.x, curvePoint2.y, b.x2, b.y2);

                // context.lineTo( b.x2, b.y2)

                context.stroke()   

                // context.beginPath()
                // context.arc(curvePoint1.x, curvePoint1.y, 2, 0, Math.PI*2)
                // context.stroke()

                // context.beginPath()
                // context.arc(curvePoint2.x, curvePoint2.y, 2, 0, Math.PI*2)
                // context.stroke()
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
