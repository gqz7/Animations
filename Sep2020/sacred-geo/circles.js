// alert('\nControls:\n\nSpace To Pause\n\nA to toggle auto-rotation\n\nW to toggle visibility of lines that pass through center point\n\nQ to toggle mouse based object rotation\n\nE to toggle visibility of points')

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
const canvas = document.createElement('canvas');
     context = canvas.getContext('2d'),
     width = canvas.width = window.innerWidth,
     height = canvas.height = window.innerHeight,
     pi = Math.PI; //shortcut because is gets used alot

let frames = 1,//0, //keep count of how many render cycles have occured
    gscale = 1,
    renderPaused = false;     //user can toggle animation

const utils = {
        mapNumber: (number, min1, max1, min2, max2) => {
            return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
        },
        findObjectCoords: (mouseEvent) => {
            let 
            obj = canvas,
            obj_left = 0,
            obj_top = 0,
            xpos,
            ypos;
            while (obj.offsetParent) {
                obj_left += obj.offsetLeft;
                obj_top += obj.offsetTop;
                obj = obj.offsetParent;
            }
            if (mouseEvent) {
                xpos = mouseEvent.pageX;
                ypos = mouseEvent.pageY;
            }
            xpos -= obj_left;
            ypos -= obj_top;
            mosPos.x = xpos;
            mosPos.y = ypos;
        },
        clearFullScreen: () => {
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();   
        },
        rotateY: (radians) => {
            let y = point.y;
            point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
            point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
        },
        rotateX: (radians) => {
            let x = point.x;
            point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
            point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
        },
        rotateZ: (radians) => {
            let x = point.x;
            point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
            point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
        },
    };

    //set styling 
    document.body.style = 'cursor: none; margin: 0px; background-color: black;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; margin:auto`

    
    //event listener for user input

    document.addEventListener('keydown', (evn) => {

        switch (evn.code) {
            case 'Space':
                    renderPaused = !renderPaused;
            
                    if (!renderPaused) { 
                        render()
                    }
                break;
        }

    }, false)

    //append canvas element to body
    document.body.appendChild(canvas);

    //translate origin to center of screen (default is top left corner)
    context.translate(width/2, height/2)
    context.scale(.887,.887)
   //ANIMATION CYCLE START
    render()

    //ANIMATION FUNCTIONS
    function render() {
        utils.clearFullScreen() //clear the canvas of previous animation cycle
        //counts how many frames have occured
        frames++

        renderAll()
        // return
        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }
    }
   
function renderAll() {

    const trans = frames/gscale < 400 ? frames/gscale : 400;

    renderImage()

    context.save()
        context.translate(-trans, 0)
        renderImage()
    context.restore()
    context.save()
        context.translate(trans, 0)
        renderImage()
    context.restore()
    context.save()
        context.translate(trans/2, Math.sqrt(3)*trans/2)
        renderImage()
    context.restore()
    context.save()
        context.translate(-trans/2, Math.sqrt(3)*trans/2)
        renderImage()
    context.restore()
    context.save()
        context.translate(-trans/2, -Math.sqrt(3)*trans/2)
        renderImage()
    context.restore()
    context.save()
        context.translate(trans/2, -Math.sqrt(3)*trans/2)
        renderImage()
    context.restore()
    
    
}

function renderImage() {

    context.save()

const angleC = frames/100,
      limit = angleC < 23 ? angleC : 23,
      alphaLim = limit*(1+limit/7);
      context.rotate(-frames/777)

for (let i = 0; i < limit; i++) {
    context.save()
        context.rotate((i*(pi*2/limit)))
        context.strokeStyle = `hsla(${i*13-44}, 77%, 77%, ${mapNumber(i, alphaLim, 0, 0, 1)})`
        context.beginPath()
        context.arc(100/gscale, 0, 100/gscale, 0, pi*2)
        context.stroke()

    context.restore()
}
context.restore()
  
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};