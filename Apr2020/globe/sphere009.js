// alert('--Controls--\nSpace To Pause Animation\nA to toggle auto-rotate/mouse lock\nMouse Wheel to zoom in/out')
const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    radius = height/2.3,

    renderPaused = false, //user can toggle animation

    autoRotate = true, //user can toggle if the sphere locks to mouse position or auto rotates

    mosPos = {
        x: 1000,
        y: 1000,
    },

    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    spherePoints = []; // array to contain sphere points before they are rendered

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: none; margin:auto`

    //event listener for user input
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
                break;  
        
        }

    }, false)

    canvas.onmousemove = findObjectCoords;
    canvas.onwheel = mouseWheelMoved;


    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.strokeStyle = 'white';
   
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

    function createSphere() {

        spherePoints = [];

        let reso = 53+frames/277 < 72 ? 53+frames/277 : 72,//resolution of sphere coord detail

            r = radius; //radius of sphere

    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso; i++) {

            spherePoints.push([]);
            
            let lon = mapNumber(i , 0, reso, 0, pi)

            for (let j = 0; j < reso; j++) {
               
                let lat = mapNumber(j , 0, reso, 0, pi*2),

                //formula for finding  xyz position based on polar angle in a xy system
                x = (r * Math.sin(lon) * Math.cos(lat)),
                y = (r * Math.sin(lon) * Math.sin(lat)),
                z = r * Math.cos(lon)/(1+frames/1000);

                //store the points calculated
                point = {
                    x: x,
                    y: y,
                    z: z
                }

                if (autoRotate) {
                    rotateZ(frames/(555))
                    rotateX(frames/333)
                    rotateY(frames/777)
                } else {
                    let xRotation = mosPos.x/243 - Math.PI,
                        yRotation = -mosPos.y/243 - Math.PI*3/5;
                    rotateX(xRotation)
                    rotateY(yRotation)

                }

                spherePoints[i].push(point)

            }
            
        }
        // console.log(spherePoints);
        
        renderSphere()        
    }

    function renderSphere() {
        
        for (let i = 0; i < spherePoints.length; i++) {

            for (let j = 0; j < spherePoints[i].length; j++) {

                let p = spherePoints[i][j], 

                    modRad = radius /(1+frames/1000)
                    light = (p.z/modRad) * 100 > 0 ? (p.z/modRad) * 100 : 0;

                    // p.x = p.x/(1+frames/1000)
                    // p.y = p.y/(1+frames/1000)

                if (light > 0) {

                    let 
                        n1 = spherePoints[i][j+1] ? spherePoints[i][j+1] : spherePoints[i][0],
                        
                        n2 = spherePoints[i+1] ? spherePoints[i+1][j] : spherePoints[i][j],

                        n3 = spherePoints[i+1] && spherePoints[i+1][j+1] ? spherePoints[i+1][j+1] : spherePoints[i][0];

                    if (n3 == spherePoints[i][0] && spherePoints[i+1]) {
                        n3 = spherePoints[i+1][0]
                    }

                    let color = ((i)*3)+frames/1;

                    context.fillStyle = `hsl(${color}, ${120-light}%, ${light/1.5}%)`;
                    context.strokeStyle = `hsl(${color}, ${120-light}%, ${light/1.5}%)`;

                    context.beginPath()
                    context.moveTo(p.x, p.y)
                    context.lineTo(n1.x, n1.y)
                    context.lineTo(n3.x,n3.y)
                    context.lineTo(n2.x, n2.y)
                    context.lineTo(p.x, p.y)
                    context.fill()
                    context.stroke()

                    // context.strokeStyle ='black';
                    // renderPoint(p)
                }
            }
        }
    }

    //renders a dot on the canvas a given origin 
    function renderPoint(origin) {

        let size = origin.z/100 > 1 ? origin.z/100 : 1;
        
        context.beginPath()
        context.arc(origin.x,origin.y,1,0, pi*2)
        context.stroke()
    }

    //FUNCTIONS ROTATE A GIVEN POINT ABOUT THE 0,0,0 AXIS
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
    
    //function used to map numbers from int into a radian range
    function mapNumber (number, min1, max1, min2, max2) {
        return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
    };

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    //event listener call back functions

    function mouseWheelMoved(evn) {
        
        let move = evn.deltaY * -7;

        radius = radius + move > 50 && radius + move < height/2 ? radius + move : radius;
        
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

