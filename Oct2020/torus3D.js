console.log(`Press Space to Start/Stop Animation\n\nPress 'I' to display current settings\n\nPress 'L' to toggle camera locking on mouse position/auto-rotate\n\nLeft/Right Arrow Keys: control how much of the object stays in view\n\nUp/Down Arrow Keys: control how fast the objects resolution increases\n\n</> to cycle through diffrent torus options\n\nO/P to cycle through diffrent auto rotation options\n\nPress 'V' to toggle if resolution will change over time\n\nPress 'N' to cycle through 3 color modes`);

alert('Look At Dev Console For Instructions\nFull Screen Recommended When You Click  \'OK\'')

const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    timeCount = 0, //keep count of how many render cycles have occured
    
    radius = height/3,

    distanceStyle = 0,
    viewOption = 0,
    autoRotateMode = 0,
    staticRes = true,
    renderPointsBool = true,
    renderLinesBool = true,
    renderPaused = false,        //user can toggle animation paused/unpaused

    lockPos = false,           //user can toggle if the object roates on its own or is locked to the mouse position

    viewLimit = -82,        //user can change how much of the object is in view

    cmplxSpd = 77,        //user can control how quickly more points will be added to object, range(0-333)

    colorMode = 0,      //controls what variable determins the color of a given point
    
    coordinates = {   //obj to keep track of points when roating shape
        x: 0,
        y: 0,
        z: 0
    },

    mosPos = { //track mouse position 
        x: 0,
        y: 0,
    };

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
    context.strokeStyle = 'white';
    context.lineWidth = 2;

   
   //ANIMATION CYCLE
    render()

    function render() {

    clearFullScreen() //clear the canvas of previous animation cycle

    calculateShape() //calculate points and render the shape

    //counts how many timeCount have occured
    timeCount++

    //user can toggle pausing of animation via 'spacebar'
    if (!renderPaused) {
        setTimeout(window.requestAnimationFrame, 0, render)
    }

    }

    function calculateShape() {

        const allPoints = [];

        let reso = staticRes ? 42 : 12+timeCount/cmplxSpd,//resolution of shape coord detail

            r = radius; //radius of shape

        if (reso > 88) {
            timeCount = 1;
        }

        const
        minZ = radius * -1.5,
        maxZ = radius * 1.5,
        subLight = viewLimit < 0 ? viewLimit : 0;

    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso; i++) {
            
            let lon = mapNumber(i , 0, reso, 0, pi);

            allPoints.push([])

            for (let j = 0; j < reso; j++) {

            let lat = mapNumber(j , 0, reso, 0, pi*2),
                structureObj = {
                    x1: true,
                    x2: true,
                    y1: false,
                    y2: true,
                    z:  false         
                };

            let x1 = structureObj.x1 ? lon : lat, x2 = structureObj.x2 ? lon : lat,
                y1 = structureObj.y1 ? lon : lat, y2 = structureObj.y2 ? lon : lat,
                z1 = structureObj.z  ? lon : lat;

            //formula for finding  xyz position based on polar angle in a xy system
            const x = (r * Math.sin(x1) * Math.cos(x2)),
                  y = (r * Math.cos(y1) * Math.sin(y2)),
                  z =  r * Math.sin(z1);

            //store the points calculated into a object
            coordinates = {
                x: x,
                y: y,
                z: z
            };

            rotatePoint()

            const
            light = mapNumber(coordinates.z, minZ, maxZ, viewLimit, 100-subLight),
            size  = mapNumber(coordinates.z, minZ, maxZ, 0, radius/100);

            allPoints[i].push({
                coords: coordinates, 
                size: size, 
                light: light, 
                j: j, 
                i: i
            })

            }
            
        }

        renderTorus(allPoints)

    }

    function renderTorus( points ) {

        const zSorted = points.flat().sort( (a,b) => {return a.coords.z - b.coords.z });
        
        zSorted.forEach( point1 => {
            const {j, i} = point1

            if (renderPointsBool) {
                renderPoint(point1)
            }
            
            if (renderLinesBool) {
                const point2 = points[i][j-1] != undefined ? points[i][j-1].coords : points[i][points[i].length-1].coords;
                const point3 = points[i-1] != undefined ? points[i-1][j].coords : points[points.length-1][j].coords;        
                
                renderLine(point1, point2)
                renderLine(point1, point3)
            }
        })
        
    }

    function renderLine( {coords: origin, light, i, j}, origin2) {

        const 
        dis1 = calcDis(origin),
        dis2 = calcDis(origin2);
        
        if (light > 5) {
            
            let color = 100;

            switch (colorMode) {
                case 0:
                context.strokeStyle = `hsl(${i*7+timeCount*3}, ${color}%, ${light}%)`
                    break;
                case 1:
                context.strokeStyle = `hsl(${j*7+timeCount*3}, ${color}%, ${light}%)`
                    break;
                case 2:
                context.strokeStyle = `hsl(${dis1*111+timeCount*3}, ${color}%, ${light}%)`
                    break;
            }

            const renderX1 = viewOption === 1 ? (origin.x/(dis1/.2))*(radius/23) : mapNumber(origin.x, 0, height/3, 0, dis1)*130
            const renderY1 = viewOption === 1 ? (origin.y/(dis1/.2))*(radius/23) : mapNumber(origin.y, 0, height/3, 0, dis1)*130

            const renderX2 = viewOption === 1 ? (origin2.x/(dis2/.2))*(radius/23) : mapNumber(origin2.x, 0, height/3, 0, dis2)*130
            const renderY2 = viewOption === 1 ? (origin2.y/(dis2/.2))*(radius/23) : mapNumber(origin2.y, 0, height/3, 0, dis2)*130
            
            context.beginPath()
            context.moveTo(renderX1, renderY1)
            context.lineTo(renderX2, renderY2)
            context.stroke()            
        }
    }

    function calcDis(org) {
        switch (distanceStyle) {
            case 0:
                return Math.sqrt((Math.pow(org.x,2))+(Math.pow(org.y,2))+(Math.pow(org.z,2)))/100; //Math.sqrt((Math.pow(org.x,2))+(Math.pow(org.y,2))+(Math.pow(org.z,2)))/100;
            case 1:
                return Math.sqrt((Math.pow(org.x,2))-(Math.pow(org.y,2))-(Math.pow(org.z,2)))/100;
            case 2:
                return Math.sqrt(-(Math.pow(org.x,2))+(Math.pow(org.y,2))+(Math.pow(org.z,2)))/100;
            case 3:
                return Math.sqrt((Math.pow(org.x,2))-(Math.pow(org.y,2))+(Math.pow(org.z,2)))/100;
            case 4:
                return Math.sqrt((Math.pow(org.x,2))+(Math.pow(org.y,2))-(Math.pow(org.z,2)))/100;
            case 5:
                return Math.sqrt((Math.pow(org.x,2)/2.5)+(Math.pow(org.y,2)/1.7)-(Math.pow(org.z,2)*1))/100;
            default:
                return 3          
        
        }
    }

    //render an object's point's position onto the canvas
    function renderPoint({coords:origin, size, light, j, i}) {
        
        const 
        dis = calcDis(origin);
        
        if (light > 5) {
            
            let color = 100;

            switch (colorMode) {
                case 0:
                context.fillStyle = `hsl(${i*7+timeCount*3}, ${color}%, ${light}%)`
                    break;
                case 1:
                context.fillStyle = `hsl(${j*7+timeCount*3}, ${color}%, ${light}%)`
                    break;
                case 2:
                context.fillStyle = `hsl(${dis*111+timeCount*3}, ${color}%, ${light}%)`
                    break;
            }

            const renderX = viewOption === 1 ? (origin.x/(dis/.2))*(radius/23) : mapNumber(origin.x, 0, height/3, 0, dis)*130
            const renderY = viewOption === 1 ? (origin.y/(dis/.2))*(radius/23) : mapNumber(origin.y, 0, height/3, 0, dis)*130
            
            context.beginPath()
            context.arc(renderX,renderY,size,0, pi*2)
            context.fill()
            
        }
        
    }

    //functions to roate object's positions about the 0,0,0 origin
    function rotatePoint() {
        let xRotation, yRotation, zRotation;

        if (lockPos) {
            
            xRotation = mosPos.x/177 - Math.PI,
            yRotation = -mosPos.y/177 - Math.PI*3/5;

        } else {
            switch (autoRotateMode) {
                
                case 0:
                    xRotation = timeCount/444;
                    yRotation = timeCount/444;
                    zRotation = timeCount/777;
                break;
                case 1:
                    xRotation = timeCount/444;
                    yRotation = timeCount/444;
                break;
                case 2:
                    yRotation = timeCount/444;
                    zRotation = timeCount/444;
                break;
                case 3:
                    xRotation = timeCount/444;
                    zRotation = timeCount/444;
                break;
                case 4:
                    xRotation = timeCount/111;
                break;
                case 5:
                    yRotation = timeCount/111;
                break;
                case 6:
                    zRotation = timeCount/111;
                break;

            }

        }

        //rotate the points about the origin to give the illusion of 3d
        if ( xRotation ) rotateX(xRotation)
        if ( yRotation ) rotateY(yRotation)
        if ( zRotation ) rotateZ(zRotation)
    }

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
            case 'KeyV':
                staticRes = !staticRes;
            break
            case 'KeyC':
                renderPointsBool = !renderPointsBool;
            break
            case 'KeyX':
                renderLinesBool = !renderLinesBool;
            break
            case 'KeyL':
                lockPos = !lockPos;
            break
            case 'ArrowLeft':
                viewLimit = viewLimit > -100 ? viewLimit -3: -100;
            break;
            case 'ArrowRight':
                viewLimit = viewLimit < 100 ? viewLimit + 3: 100;
            break;
            case 'ArrowUp':
                cmplxSpd = cmplxSpd > 3 ? cmplxSpd-3 : 3;
            break
            case 'ArrowDown':
                cmplxSpd = cmplxSpd < 333 ? cmplxSpd+3 : 333;
            break
            case 'Period':
                distanceStyle = distanceStyle < 5 ? distanceStyle + 1: 0;
            break;
            case 'Comma':
                distanceStyle = distanceStyle > 0 ? distanceStyle - 1: 5;
            break;
            case 'KeyN':
                colorMode = colorMode < 2 ? colorMode + 1: 0;
            break;
            case 'KeyB':
                viewOption = viewOption < 1 ? viewOption + 1: 0;
            break
            case 'KeyO':
                autoRotateMode = autoRotateMode > 0 ? autoRotateMode - 1: 6;
            break;
            case 'KeyP':
                autoRotateMode = autoRotateMode < 6 ? autoRotateMode + 1: 0;
            break
            case 'KeyI':

            console.log(`Contrast Setting: ${(viewLimit+100)/2}\nnColor Mode: ${colorMode+1}\nSpeed: ${333-cmplxSpd}\nRadius: ${Math.round(radius)}\nTorus Option: ${viewOption+1}\nAuto Rotation Option: ${autoRotateMode+1}\nCamera Locked: ${lockPos}\nStatic Resolution: ${staticRes}`);
            
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

        // console.log(radius)
        
        let move = evn.deltaY * -7;

        radius = radius + move > 50 && radius + move < height/2 ? radius + move : radius;
        
    }

    function mapNumber (number, min1, max1, min2, max2) {
        return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
    };