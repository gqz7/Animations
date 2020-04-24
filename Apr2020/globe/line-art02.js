//Press space to start animation

const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    renderPaused = true, //user can toggle animation
    colorBool = false,  //user can toggle colored lines
    
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
        
        if (evn.code == 'Space') {

            renderPaused = !renderPaused;
        
            if (!renderPaused) { 
                render()
            }
            
        } else if (evn.code == 'KeyC') {
            colorBool = !colorBool;
        }

    }, false)

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.rotate(Math.PI)

    context.fillStyle = 'white';
   
   //ANIMATION CYCLE

   let pointsNum = 1;
     
     render()

      function render() {

        createSphere() //render the sphere

        createCircle() //circle will smoothly transition animation

        //counts how many frames have occured
        if (frames < 600) {
            frames++
        } else {
            frames = 0;
            pointsNum+=2
        }

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

        context.fillStyle = 'white';

        let reso = pointsNum,//resolution of sphere coord detail

        r = height/2.7; //radius of sphere

    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso; i++) {
            
            let lon = mapNumber(i , 0, reso, 0, pi)

            for (let j = 0; j < reso; j++) {
               
            let lat = mapNumber(j , 0, reso, 0, pi*2),

            //formula for finding  xyz position based on polar angle in a xy system
            x = (r * Math.sin(lat) * Math.cos(lon)),
            y = (r * Math.sin(lat) * Math.sin(lon)),
            z = r * Math.cos(lat);

            //store the points calculated
            point = {
                x: x,
                y: y,
                z: z
            }

            //rotate the points to give the illusion of 3d

            rotateX(frames/100)
            rotateZ(frames/100)

            renderPoint(point)

            }
            
        }
    }

    function createCircle() {

        context.fillStyle = `hsla(0, 100%, 0%, ${(frames-500)/100})`;

        context.beginPath()
        context.arc(0,0,height/2.7 + 2,0,Math.PI*2)
        context.fill()
        
    }


    function renderPoint(origin) {

        context.fillStyle = colorBool ? `hsl(${frames}, 100%, 50%)`: 'white';

        let size = 2-pointsNum/10 > .7 ? 2-pointsNum/10 : .7;
        
        context.beginPath()
        context.arc(origin.x,origin.y,size,0, pi*2)
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
