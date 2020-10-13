// alert('\nControls:\n\nSpace To Pause\n\nA to toggle auto-rotation\n\nW to toggle visibility of lines that pass through center point\n\nQ to toggle mouse based object rotation\n\nE to toggle visibility of points')

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
const canvas = document.createElement('canvas');
     context = canvas.getContext('2d'),
     width = canvas.width = window.innerWidth,
     height = canvas.height = window.innerHeight,
     pi = Math.PI; //shortcut because is gets used alot

let tX = 1,//0, //keep count of how many render cycles have occured
    gscale = .444,
    renderPaused = false,     //user can toggle animation
    timeForward = true;
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

    render()

    //ANIMATION FUNCTIONS
    function render() {
        utils.clearFullScreen() //clear the canvas of previous animation cycle
        //counts how many frames have occured
        // const tXMax = 100
        // const tXMin = -100

        // if (timeForward && tX <= tXMax) {
          
        //   tX+=.7
        // } else if (timeForward && tX > tXMax) {
        //   timeForward = false
        // } else if (!timeForward && tX >= tXMin) {
        //   tX-=.7
        // } else if (!timeForward && tX < tXMin) {
        //   timeForward = true
        // }
        tX++

        renderImage()
        // return
        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }
    }

function renderImage() {
    context.save()
        // for (let i = 1000; i > 0; i-=10) {

        size = tX;

        for (let i = 0; i < width/10; i+=7) {

        //   context.scale(1.004, 1.02)
          context.lineWidth = 14;
          context.strokeStyle = i%14==0 ? 'white' : '#111'
          context.beginPath()
          context.arc(i, 0, 1/gscale*i, 0, pi*2)
          context.stroke()
          context.beginPath()
          context.arc(-i, 0, 1/gscale*i, 0, pi*2)
          context.stroke() 
        }
    context.restore()
}