alert('\nControls:\n\nSpace To Pause\n\nA to toggle auto-rotation\n\nQ to toggle mouse based object rotation\n\nLeft/Right Arrow Keys to increase/decrease number of points rendered')

const pi = Math.PI; //shortcut because is gets used alot

let objectPoints = [

    {
        x: 0, 
        y:0, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: 10, 
        y: 10, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: -10, 
        y: -10, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: 42, 
        y: 70, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: -23, 
        y: 69, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: 42, 
        y: -30, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: 100, 
        y: 10, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: -10, 
        y: -100, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: 0, 
        y: 100, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },
    {
        x: 100, 
        y: 100, 
        z: 0,
        a: pi*2*Math.random(),
        c: 123
    },


];
//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    renderPaused = false,   //user can toggle animation
    autoRotate = false,    //roates z axis, can be toggle by user
    mouseRotate = false,  //determines if the object should roate based on mouse position on canvas
    hideMidLines = true, //determines if lines through center are shown in render
    pointsShowing = 1,

    mosPos = {
        x: width/2,
        y: height/2,
    },
    
    point = {}, //global declaration of var, gets used in the renderObject method

    velocity = 5;

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; margin:auto`

    canvas.onmousemove = findObjectCoords;
    
    //event listener for user input
    document.addEventListener('keydown', (evn) => {

        if (evn.code == 'Space') {

            renderPaused = !renderPaused;
        
            if (!renderPaused) { 
                render()
            }
            
        } else if (evn.code == 'KeyA') {

            autoRotate = !autoRotate;
            
        } else if (evn.code == 'KeyW') {

            hideMidLines = !hideMidLines;
        } else if (evn.code == 'KeyQ') {

            mouseRotate = !mouseRotate;
        } else if (evn.code == 'ArrowLeft') {

            pointsShowing = pointsShowing > 1 ? pointsShowing-1 : 1;
        } else if (evn.code == 'ArrowRight') {

            pointsShowing = pointsShowing < 7 ? pointsShowing+1 : 7;

        }

        

    }, false)

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.fillStyle = 'white';
    context.strokeStyle = 'white';
   
   //ANIMATION CYCLE
     render()

      function render() {

        // console.log(frames);

        clearFullScreen() //clear the canvas of previous animation cycle
        calcPoints()
        createObject() 

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

    function createObject() {

        const points = [];

        // let count = 0;

        for (let i = 0; i < pointsShowing; i++) {
    
            let p = objectPoints[i];
            // count++
            point = {
                x: p.x,
                y: p.y,
                z: p.z,
                c: p.c 
            }
            
            if (mouseRotate) {
                
                let xRotation = mosPos.x/111,
                yRotation = mosPos.y/111;
            
                //rotate the points to give the illusion of 3d
                rotateX(xRotation)
                rotateY(yRotation)
                rotateZ(pi/12)
            }

            if (autoRotate) {
                rotateZ(frames/222)
                rotateX(frames/222)
                rotateY(frames/222)
            }

            points.push(point)

        };
        
        renderObject(points)
        
    }
    
    function renderObject (array) {

        for (let i = 0; i < array.length; i++) {
            const p = array[i];

            array.forEach(e => {

                    context.beginPath()
                    context.moveTo(p.x, p.y)
                    context.lineTo(e.x, e .y)
                    context.stroke()
             
            });

            renderPoint(p)
            
        }
    }

    function calcPoints() {
 

        objectPoints = objectPoints.map( p => {
            let 
            x = p.x+(velocity*Math.sin(p.a)),
            y = p.y+(velocity*Math.cos(p.a)),
            z = p.z,//p.z+velocity,
            a = p.a;

            if (x > width/4.5 || x < -width/4.5 || y > height/4 || y < -height/4) {
                a-= pi*Math.random()*.037

            }

            return {x: x, y: y, z: z, a: a}
            
        })

    }

    function renderPoint(o) {

        let light = 50//(origin.z/frames) * 100 > 20 ? (origin.z/frames) * 100 : 20;

        context.fillStyle = `hsl(${o.c}, 100%, ${light }%)`

        let size = 2//frames/100 < 6 ? frames/100 : 6;

        // context.lineWidth = size/5

        context.beginPath()
        context.arc(o.x,o.y,size,0, pi*2)
        context.fill()
    
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

 