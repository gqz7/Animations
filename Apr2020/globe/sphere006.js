
alert('--Controls--\nSpace To Pause Animation\nA to toggle auto-rotate/mouse lock\nMouse Wheel to zoom in/out')
const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    radius = height/3,

    renderPaused = false, //user can toggle animation

    autoRotate = false, //roates z axis, can be toggle by user

    mosPos = {
        x: width/2,
        y: height/2,
    },
    
    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    };

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; margin:auto`


    canvas.onmousemove = findObjectCoords;
    canvas.onwheel = mouseWheelMoved;
    
    //event listener for user input
    document.addEventListener('keydown', (evn) => {

        if (evn.code == 'Space') {

            renderPaused = !renderPaused;
        
            if (!renderPaused) { 
                render()
            }
            
        } else if (evn.code == 'KeyA') {

            autoRotate = !autoRotate;
        }

    }, false)

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.fillStyle = 'black'
   
    context.lineWidth = 2;
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

        let reso = 77//frames/33 +13< 72 ? frames/33+13: 72,//resolution of sphere coord detail

            r = radius; //radius of sphere

            // console.log(Math.PI * (width/mosPos.x));

    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso; i++) {
            
            let lon = mapNumber(i , 0, reso, 0, pi)

            for (let j = 0; j < reso; j++) {
               
            let lat = mapNumber(j , 0, reso, 0, pi*2),

            //formula for finding  xyz position based on polar angle in a xy system
            x = (r * Math.sin(lon) * Math.cos(lat)),
            y = (r * Math.sin(lon) * Math.sin(lat)),
            z =  r * Math.cos(lon);

            //store the points calculated
            point = {
                x: x,
                y: y,
                z: z,
                lo: lon,
                la: lat
            }


           
            //rotate the points to give the illusion of 3d
            

            if (autoRotate) {
                rotateZ(frames/(55))
                rotateX(frames/93)
                rotateY(frames/77)
            } else {
                 let xRotation = mosPos.x/343 - Math.PI,
                yRotation = -mosPos.y/343 - Math.PI*3/5;
            
                rotateX(xRotation)
                rotateY(yRotation)
            }

            renderPoint(point, reso)

            }
            
        }
    }

    function renderPoint(origin, resolution) {

        let light = (origin.z/radius/2) * 50 > 40 ? (origin.z/radius/2) * 50 : 40;

        context.strokeStyle =`hsl(${((origin.lo*origin.la)*resolution/2)+(origin.x/10)-frames}, 100%, ${light}%)` //`hsl(${origin.z*2+(frames*2)}, 100%, ${light}%)`

        let size = (origin.z/radius/2) * 300/resolution > 0 ? (origin.z/radius/2) * 300/resolution : 0;
        
        if (size > 0) {

            context.beginPath()
            context.arc(origin.x,origin.y,size*(frames/50),0, pi*2)
            context.stroke()

        }
        
    
    }

    function rotateY(radians) {

        let y = point.y;
        point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
        point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
    }

    function rotateX(radians) {

        let x = point.x;
        point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
        point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
    }

    function rotateZ(radians) {

        let x = point.x;
        point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
        point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
    }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

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

    function mouseWheelMoved(evn) {
        
        let move = evn.deltaY * -10;

        radius = radius + move > 10 && radius + move < height ? radius + move : radius;
        
    }

