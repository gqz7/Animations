console.log(`Press Space to Start/Stop Animation`);

// alert('Look At Dev Console For Instructions\nFull Screen Recommended When You Click  \'OK\'')

const pi = Math.PI; //shortcut because is gets used alot
let Stars = []; //this array will store the values of the current stars on the screen
let speed = 1;

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 3773, //keep count of how many render cycles have occured

    radius = 222,

    distanceStyle = 4,

    renderPaused = false,    //user can toggle animation paused/unpaused

    flipPos = false,   //user can see what will happen to a given structure if the logitude and latitude get flipped

    viewLimit = 30,  //user can change how much of the object is in view

    cmplxSpd = 47, //user can control how quickly more points will be added to object, range(0-333)

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
        {   //torus horizontal
            x1: true,
            x2: true,
            y1: false,
            y2: true,
            z:  false 
        },
        {   //torus vertical
            x1: false,
            x2: false,
            y1: false,
            y2: true,
            z:  true 
        },
    ];

    //set styling 

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: none; margin:auto`
    
    document.body.style = 'cursor: none; margin: 0px;';

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Space') {
            renderPaused = !renderPaused;
            if (!renderPaused) {
                render()
            }
        }
    })

    context.translate(width/2, height/2)
   
    create_star_field() //adds stars to Stars array

   //ANIMATION CYCLE
     render()

      function render() {
        
        time+=.5 //a counter that counts the elapsed number of time
        clearFullScreen() //clear the canvas of previous animation cycle
    
        renderStars() //displays each star from its position in the Stars array 
        createSphere() //render the sphere

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 30, render)
        }

      }

    function createSphere() {

        let 
            reso = 50,//resolution of sphere coord detail
            r = radius; //radius of sphere
    //first loop tracks longitude then the nested loop tracks latitude
        for (let i = 0; i < reso && i < 88; i++) {
            
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
                    y = (r * Math.cos(y1) * Math.sin(y2)),
                    z =  r * Math.sin(z1);

                //store the points calculated into a object
                coordinates = {
                    x: x,
                    y: y,
                    z: z
                };

                //rotate the points about the origin to give the illusion of 3d
                rotateZ(time/777-1)
                rotateX(time/777-3)
                rotateY(time/777-5)
            
                renderPoint(coordinates, j, i)
            }
        }
    }

    //render an object's point's position onto the canvas
    function renderPoint(origin, j, i) {

        let light = (origin.z/radius) * 100 > viewLimit + 20 ? (origin.z/radius) * 100 : viewLimit + 20;
        const dis = Math.sqrt((Math.pow(origin.x,2))+(Math.pow(origin.y,2))-(Math.pow(origin.z,2)))/200;
        
        if (light > 5) {
            
            let size  = origin.z/107-.2>.88 ? origin.z/107 : .88;

            context.fillStyle = `hsl(${dis*4444+time}, 100%, ${light}%)`

            const renderX = (origin.x/(dis/.5))//mapNumber(origin.x, 0, height/3, 0, dis)*130
            const renderY = (origin.y/(dis/.5))//mapNumber(origin.y, 0, height/3, 0, dis)*130
            
            context.beginPath()
            context.arc(renderX,renderY,size,0, pi*2)
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


    function mapNumber (number, min1, max1, min2, max2) {
        return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
    };


    function create_star_streak(star) {

        let {x, y, v, lightness} = star;

        lightness = lightness+v*10;
        // context.save()
        x = x< 0 ? (x - width/(time*2) - time/100) : (x  + width/(time*2) + time/100);
            
        let 
        x1 = x,
        y1 = y,
        x2 = x*(1 + lightness/999),
        y2 = y*(1 + lightness/999),

        grad = context.createLinearGradient(x1, y1, x2, y2);

        //set up gradient
        grad.addColorStop(1, `hsl(0, 100%, ${lightness}%)`);
        grad.addColorStop(6/7, `hsl(45, 100%, ${lightness}%)`);
        grad.addColorStop(5/7, `hsl(90, 100%, ${lightness}%)`);
        grad.addColorStop(4/7, `hsl(135, 100%, ${lightness}%)`);
        grad.addColorStop(3/7, `hsl(180, 100%, ${lightness}%)`);
        grad.addColorStop(2/7, `hsl(245, 100%, ${lightness}%)`);
        grad.addColorStop(1/7, `hsl(305, 100%, ${lightness}%)`);
        
        context.strokeStyle = grad;
        context.lineWidth = (lightness/100) + .2;
        //gradient line stroke 
        context.beginPath();
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
        context.stroke();
    }

    function create_star_field() {
        for (let i = 0; i < 1000; i++) {
            let  
                x = (width * Math.random()) - width/2,
                y = (height * Math.random()) - height/2,
                lightness = 10;
             
            Stars.push({
                x: x, y: y, v: Math.random()/10, lightness: lightness
            });   
        }   
    }

    function renderStars() {
        for (let i = 0; i < Stars.length; i++) {
            create_star_streak(Stars[i]);
        }
        moveStars(speed) //moves the position of each start slightly
    }

    function moveStars(speed) {

        for (let i = 0; i < Stars.length; i++) {

            const velocity = Stars[i].v;

            let NewX = Stars[i].x * (.979 + speed/4700 + Stars[i].lightness/1700+velocity),
                NewY = Stars[i].y * (.979 + speed/4700 + Stars[i].lightness/1700+velocity);

            if (NewX > width || NewX < -width || NewY > width/.5 || NewY < -width/.5) {

                Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered
                addStar() // then add a new one to replace it
                i--

            } else {

                Stars[i].x = NewX;
                Stars[i].y = NewY;

                Stars[i].lightness = Stars[i].lightness <= 88 ? Stars[i].lightness * 1.01 : 88;

            }
           
        }
        
    }

    function addStar() { //when one star dies another is born

        let  
        ranAngle = Math.random() * 100   
        radius = 10;
        randomX1 = (Math.cos(ranAngle) * radius),
        randomY1 = (Math.sin(ranAngle) * radius),
        randomX2 = (Math.cos(ranAngle) * radius * 4),
        randomY2 = (Math.sin(ranAngle) * radius * 4),

        ranNum = (Math.random() * 17) + 1,

        x = (randomX2 * ranNum) + (randomX1 * ranNum) * Math.random(),
        y = (randomY2 * ranNum) + (randomY1 * ranNum) * Math.random() * 5,

        lightness = 10;

        const starInCenter = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)) < 200;
        if (starInCenter) {
            addStar()
        } else {
            Stars.push({
                x: x, y: y, lightness: lightness, v: Math.random()/10
            });
        }
    }