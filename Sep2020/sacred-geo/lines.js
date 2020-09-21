// alert('\nControls:\n\nSpace To Pause\n\nA to toggle auto-rotation\n\nW to toggle visibility of lines that pass through center point\n\nQ to toggle mouse based object rotation\n\nE to toggle visibility of points')

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
const canvas = document.createElement('canvas');
     context = canvas.getContext('2d'),
     width = canvas.width = window.innerWidth,
     height = canvas.height = window.innerHeight,
     pi = Math.PI; //shortcut because is gets used alot

let frames = 1,//0, //keep count of how many render cycles have occured

    renderPaused = false,     //user can toggle animation
    autoRotate = false,     //roates z axis, can be toggle by user
    mouseRotate = true,    //determines if the user can rotate the shape my moving the mouse on the canvas
    hideMidLines = false, //determines if lines through center are shown in render
    showPoints = true,   //determines if the points of the shape will show
    showLines = false,  //determines if the line edges of the shape will show
    fillShape = true,  //determines if the line edges of the shape will show

    shapePoints = [],

    mosPos = {
        x: width/2,
        y: height/2,
    },
    
    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    };

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
    canvas.onmousemove = utils.findObjectCoords;

    document.addEventListener('keydown', (evn) => {

        switch (evn.code) {
            case 'Space':
                    renderPaused = !renderPaused;
            
                    if (!renderPaused) { 
                        render()
                    }
                break;
            case 'KeyA':
                    autoRotate = !autoRotate;
                    mouseRotate = false;
                break;
            case 'KeyQ':
                    mouseRotate = !mouseRotate;
                    autoRotate = false;
                break;
            // case 'KeyW':
            //         hideMidLines = !hideMidLines;
            //     break;
            // case 'KeyE':
            //         showPoints = !showPoints;
            //     break;
            // case 'KeyR':
            //         showLines = !showLines;
            //     break;
            // case 'KeyT':
            //         fillShape = !fillShape;
            //     break;
        }

    }, false)

    //append canvas element to body
    document.body.appendChild(canvas);

    //translate origin to center of screen (default is top left corner)
    context.translate(width/2, height/2)
    
   //ANIMATION CYCLE START
    render()

    //ANIMATION FUNCTIONS
    function render() {
        utils.clearFullScreen() //clear the canvas of previous animation cycle
        //counts how many frames have occured

        renderImage()

        frames++
        // return
        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }
    }
   
function renderImage() {

    context.save()
    context.strokeStyle = `hsl(${time}, 77%, 77%)`

    for (let i = 0; i < 12; i++) {
        context.beginPath()
        context.arc(100, 0, 100 , 0, pi*2)
        context.stroke()

    }

    context.restore()
  
}