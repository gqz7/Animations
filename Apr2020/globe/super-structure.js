//Press space to start animation

console.log('Press Space to Start/Stop Animation,\n\n < and > (comma and period) OR left/right arrow keys;\n control how much of the object stays in view\n\nPress \'I\' to know what the brightness setting is currently');


const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    radius = height/3,

    renderPaused = true, //user can toggle animation

    viewLimit = 30, //user can change how much of the object is in view
    
    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    };

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
            case 'ArrowLeft':
            case 'Comma':

            viewLimit = viewLimit > -20 ? viewLimit -1: -20;

            break;
            case 'ArrowRight':
            case 'Period':

            viewLimit = viewLimit < 100 ? viewLimit + 1: 100;
            break;

            case 'KeyI':

            console.log('Brightness Setting:', viewLimit + 20);
            
            
            break;
        }


        
       

    }, false)

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


        let reso = frames/100 + 1,//resolution of sphere coord detail

            r = radius; //radius of sphere


    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso; i++) {
            
            let lon = mapNumber(i , 0, reso, 0, pi)

            for (let j = 0; j < reso; j++) {
               
            let lat = mapNumber(j , 0, reso, 0, pi*2),

            //formula for finding  xyz position based on polar angle in a xy system
            x = (r * Math.sin(lon) * Math.cos(lon)),
            y = (r * Math.sin(lat) * Math.sin(lon)),
            z = r * Math.cos(lat);
            //store the points calculated
            point = {
                x: x,
                y: y,
                z: z
            }

            //rotate the points to give the illusion of 3d
            rotateX(frames/170)
            rotateY(frames/170)
            rotateZ(frames/200)
            
            renderPoint(point)

            }
            
        }
    }

    function renderPoint(origin) {

        let light = (origin.z/radius) * 100 > viewLimit + 20 ? (origin.z/radius) * 100 : viewLimit + 20;

        if (light > 5) {

            context.fillStyle = `hsl(${origin.x}, 100%, ${light}%)`

        let size = origin.z/100 > 1 ? origin.z/100 : 1;
        
        context.beginPath()
        context.arc(origin.x,origin.y,3,0, pi*2)
        context.fill()
            
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

