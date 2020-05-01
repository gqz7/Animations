console.log(`Press Space to Start/Stop Animation,\n\n < and > (Comma and Period): cycle through diffrent 3D structures\n\nLeft/Right Arrow Keys: control how much of the object stays in view\n\nPress 'I' to display current settings\n\nPress 'M' to cycle through 4 color modes\n\nPress 'G' to toggle view in grayscale\n\nPress 'O' to decrease speed that complexity is being added to the object 'P' to increase speed\n\nPress 'L' to toggle camera locking on mouse position/auto-rotate\n\nPress 'F' to toggle flipping of structure's latitude and logitude coordinates`);

alert('Look At Dev Console For Instructions\nFull Screen Recommended When You Click  \'OK\'')

const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    radius = height/3,

    renderPaused = false,    //user can toggle animation paused/unpaused

    grayScale = false,     //user can toggle grayscale

    lockPos = false,     //user can toggle if the object roates on its own or is locked to the mouse position

    flipPos = false,   //user can see what will happen to a given structure if the logitude and latitude get flipped

    viewLimit = 30,  //user can change how much of the object is in view

    cmplxSpd = 77,//user can control how quickly more points will be added to object, range(0-333)

    SSindex = 0, //controls what structure is being displayed on the canvas

    colorMode = 0, //controls what variable determins the color of a given point
    
    coordinates = {   //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    mosPos = { //track mouse position 
        x: 0,
        y: 0,
    },

    superSpos = [ //longitude is represented by true, latitude by false, a ternary oporater will change how the object is structured to showcased diffrent super structures with less code
        {   //donut horizontal
            x1: true,
            x2: true,
            y1: false,
            y2: true,
            z:  false 
        },
        {   //donut vertical
            x1: false,
            x2: false,
            y1: false,
            y2: true,
            z:  true 
        },
        {   //infinity 8 destructured
            x1: false,
            x2: false,
            y1: false,
            y2: true,
            z:  false 
        },
        {   //infinity 8 structured
            x1: false,
            x2: false,
            y1: true,
            y2: true,
            z:  false 
        },
        {   //one bend
            x1: false,
            x2: false,
            y1: true,
            y2: true,
            z:  true 
        },
        {   //s-curve
            x1: true,
            x2: true,
            y1: false,
            y2: false,
            z:  true 
        },
        {   //plane twist
            x1: true,
            x2: false,
            y1: true,
            y2: true,
            z:  false 
        },
        {   //full twist
            x1: false,
            x2: true,
            y1: false,
            y2: true,
            z:  true 
        },
        {   //unnamed
            x1: true,
            x2: false,
            y1: true,
            y2: false,
            z:  false 
        },
        {   //cylinder 1
            x1: true,
            x2: true,
            y1: true,
            y2: true,
            z:  false 
        },
        {   //cylinder 2
            x1: false,
            x2: false,
            y1: false,
            y2: false,
            z:  true 
        },
        {   //infinity band
            x1: false,
            x2: false,
            y1: false,
            y2: false,
            z:  false 
        },
        {   //boat structure 1
            x1: false,
            x2: true,
            y1: true,
            y2: true,
            z:  false 
        },
        {   //boat structure 2
            x1: true,
            x2: false,
            y1: false,
            y2: false,
            z:  true 
        },
        {   //hor sphere
            x1: false,
            x2: true,
            y1: false,
            y2: true,
            z:  false 
        },
        {   //(better) vert sphere
            x1: true,
            x2: false,
            y1: true,
            y2: false,
            z:  true 
        }
    ];

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: none; margin:auto`
    //event listener for mouse tracking 
    canvas.onmousemove = findObjectCoords;
    
    //event listener for mouser wheel
    canvas.onwheel = mouseWheelMoved;

    //event listener for user input
    document.addEventListener('keydown', takeUserInput, false)

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.fillStyle = 'white';
   
   //ANIMATION CYCLE
     render()

      function render() {

        // console.log(frames);

        clearFullScreen() //clear the canvas of previous animation cycle

        createSphere() //render the sphere

        //counts how many frames have occured
        frames++


        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

    //function used to map numbers from int into a radian range
    function mapNumber (number, min1, max1, min2, max2) {
        return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
    };

    function createSphere() {

        let reso = frames/cmplxSpd + 1,//resolution of sphere coord detail

            r = radius; //radius of sphere

        if (reso > 88) {
            frames = 1;
        }

    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso; i++) {
            
            let lon = mapNumber(i , 0, reso, 0, pi);

            for (let j = 0; j < reso; j++) {

            let lat = mapNumber(j , 0, reso, 0, pi*2),
                structureObj = {...(superSpos[SSindex])};

            if (flipPos) {   
                for (const key in structureObj) {
                    structureObj[key] = !structureObj[key];
                }
            }

            let x1 = structureObj.x1 ? lon : lat, x2 = structureObj.x2 ? lon : lat,
                y1 = structureObj.y1 ? lon : lat, y2 = structureObj.y2 ? lon : lat,
                z1 = structureObj.z  ? lon : lat;

            //formula for finding  xyz position based on polar angle in a xy system
            const x = (r * Math.sin(x1) * Math.cos(x2)),
                  y = (r * Math.sin(y1) * Math.sin(y2)),
                  z =  r * Math.cos(z1);

            //store the points calculated into a object
            coordinates = {
                x: x,
                y: y,
                z: z
            };

            let xRotation, yRotation;

            if (lockPos) {
                
                xRotation = mosPos.x/177 - Math.PI,
                yRotation = -mosPos.y/177 - Math.PI*3/5;

            } else {
                xRotation = frames/170,
                yRotation = frames/170;
                rotateZ(frames/200)

            }

            //rotate the points about the origin to give the illusion of 3d
            rotateX(xRotation)
            rotateY(yRotation)
            
            renderPoint(coordinates, j, i)

            }
            
        }

    }

    //render an object's point's position onto the canvas
    function renderPoint(origin, j, i) {

        let light = (origin.z/radius) * 100 > viewLimit + 20 ? (origin.z/radius) * 100 : viewLimit + 20;

        if (light > 5) {
            
            let color = grayScale ? 0 : 100,
                size  = origin.z/107>.88 ? origin.z/107 : .88;

            switch (colorMode) {
                case 0:
                context.fillStyle = `hsl(${origin.x}, ${color}%, ${light}%)`
                    break;
                case 1:
                context.fillStyle = `hsl(${origin.y}, ${color}%, ${light}%)`
                    break;
                case 2:
                context.fillStyle = `hsl(${i*10}, ${color}%, ${light}%)`
                    break;
                case 3:
                context.fillStyle = `hsl(${j*10}, ${color}%, ${light}%)`
                    break;
            }
            
            context.beginPath()
            context.arc(origin.x,origin.y,size,0, pi*2)
            context.fill()
            
        }
        
    }

    //functions to roate object's positions about the 0,0,0 origin

    function rotateY(radians) {

        let y = coordinates.y;
        coordinates.y = (y * Math.cos(radians)) + (coordinates.z * Math.sin(radians) * -1.0);
        coordinates.z = (y * Math.sin(radians)) + (coordinates.z * Math.cos(radians));
    }

    function rotateX(radians) {

        let x = coordinates.x;
        coordinates.x = (x * Math.cos(radians)) + (coordinates.z * Math.sin(radians) * -1.0);
        coordinates.z = (x * Math.sin(radians)) + (coordinates.z * Math.cos(radians));
    }

    function rotateZ(radians) {

        let x = coordinates.x;
        coordinates.x = (x * Math.cos(radians)) + (coordinates.y * Math.sin(radians) * -1.0);
        coordinates.y = (x * Math.sin(radians)) + (coordinates.y * Math.cos(radians));
    }

    //function clears entire canvas
    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    //functions for event listeners

    //user input 
    function takeUserInput (evn) {
        switch (evn.code) {
            case 'Space':

            renderPaused = !renderPaused;
        
            if (!renderPaused) { 
                render()
            }
            break;
            case 'KeyG':
            
            grayScale = !grayScale;

            break;
            case 'KeyF':
  
            flipPos = !flipPos;

            break
            case 'KeyL':
  
            lockPos = !lockPos;

            break
            case 'ArrowLeft':
            
                viewLimit = viewLimit > -20 ? viewLimit -1: -20;
            break;
            case 'Comma':

                SSindex = SSindex > 0 ? SSindex - 1: superSpos.length-1;
            break;
            case 'ArrowRight':

                viewLimit = viewLimit < 100 ? viewLimit + 1: 100;
            break;
            case 'Period':

                SSindex = SSindex < superSpos.length-1 ? SSindex + 1: 0;
            break;
            case 'KeyP':

                cmplxSpd = cmplxSpd > 3 ? cmplxSpd-1 : 3;

            break
            case 'KeyO':

                cmplxSpd = cmplxSpd < 333 ? cmplxSpd+1 : 333;

            break

            case 'KeyM':

                colorMode = colorMode < 3 ? colorMode + 1: 0;

            case 'KeyI':

            console.log(`Brightness Setting: ${viewLimit + 20}\nCurrently viewing super structure #${SSindex+1}\nCoordinates Flipped: ${flipPos}\nColor Mode: ${colorMode+1}\nGrayscale Mode: ${grayScale}\nCamera Locked To Mouse: ${lockPos}\nMax number of points being rendered: ${Math.pow(Math.ceil(frames/100 + 1), 2)}\nObject Complexity Increase Speed: ${333-cmplxSpd}`);
            
            break;

        }

    }
    //mouse position
    function findObjectCoords(mousEnv) {

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
        if (mousEnv)
        {
            xpos = mousEnv.pageX;
            ypos = mousEnv.pageY;
        }
        
        xpos -= obj_left;
        ypos -= obj_top;
        
        mosPos.x = xpos
        mosPos.y = ypos

    }
    //mouse wheel
    function mouseWheelMoved(evn) {

        console.log(radius);
        
        
        let move = evn.deltaY * -7;

        radius = radius + move > 50 && radius + move < height/2 ? radius + move : radius;
        
    }