const pi = Math.PI; //shortcut because is gets used alot

//simplex noise alg import
let Noise = toxi.math.noise.simplexNoise.noise;

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 48, //keep count of how many render cycles have occured

    renderPaused = true, //user can toggle animation

    framesUp = true,

    noiseSeed = Math.random()*10,

    mosPos = {
        x: width/2,
        y: height/2,
    },

    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    landscapePoints = [], // array to contain sphere points before they are rendered

    Stars = []; //array to contain star positions
    //set styling 

    document.body.style = 'margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: default; margin:auto`

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

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2,height/2)

    context.strokeStyle = 'deeppink';
    context.fillStyle = `indigo`;

    context.lineWidth = .5;
   
   //ANIMATION CYCLE
     createStars()
     render()

      function render() {

        clearFullScreen() //clear the canvas of previous animation cycle

        createLandscape() //create all the positions in an array

        renderStars()

        renderLandscape() //render lines and shapes based on positions

        if (framesUp && frames < 20077) {
            frames+=27
        } else if (framesUp && frames >= 20077) {
            framesUp = false;
        } if (!framesUp && frames > 47) {
            frames-=23
        } else {
            framesUp = true;
        }

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

    function createLandscape() {


        let wlim = (width)/14,
            hlim = (height)/14,

            inc = frames/1000;

            xCount = 0;

            landscapePoints = [];

        for (let x = 1; x < wlim; x++) {

            landscapePoints.push([]);

            let yCount = 0;
            
            for (let y = 1; y < hlim; y++) {

                let z = Noise(xCount/10+inc, yCount/10+noiseSeed)*(360/(y+4));
                
                point = {
                    x: x*23-50,
                    y: y*26,
                    z: z
                };

                rotateY((Math.PI/2.5))
                rotateX(.5)

                landscapePoints[xCount][yCount] = point;

                yCount++

            }
            xCount++
        }
    }

    function renderLandscape() { 

        context.save()

        context.translate(-width/2,0)

        for (let i = landscapePoints.length-2; i >= 0; i--) {
            
            for (let j = 0; j <= landscapePoints[i].length-2; j++) {

                let p = landscapePoints[i][j];

                    n1 = landscapePoints[i][j+1],
                    
                    n2 = landscapePoints[i+1][j],

                    n3 = landscapePoints[i+1][j+1];

                    context.strokeStyle = 'hotpink';

                    context.beginPath()
                    context.moveTo(p.x, p.y)
                    context.lineTo(n1.x, n1.y)
                    context.lineTo(n3.x,n3.y)
                    context.lineTo(p.x, p.y)
                    context.stroke()
                    context.fill()

                    context.beginPath()
                    context.moveTo(p.x, p.y)
                    context.lineTo(n2.x, n2.y)
                    context.lineTo(n3.x,n3.y)
                    context.lineTo(p.x, p.y)
                    context.stroke()
                    context.fill()

                    // context.strokeStyle = 'aqua';

                    // context.beginPath()
                    // context.moveTo(-p.x, p.y)
                    // context.lineTo(-n1.x, n1.y)
                    // context.lineTo(-n3.x,n3.y)
                    // context.lineTo(-p.x, p.y)
                    // context.stroke()
                    // context.fill()

                    // context.beginPath()
                    // context.moveTo(-p.x, p.y)
                    // context.lineTo(-n2.x, n2.y)
                    // context.lineTo(-n3.x,n3.y)
                    // context.lineTo(-p.x, p.y)
                    // context.stroke()
                    // context.fill()
            }   
        }

        context.restore()
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

    function createStars() {
        for (let i = 0; i < 1000; i++) {
            
            Stars.push({x: Math.random()*width*2, y: Math.random()*height})
            
        }
    }

    function renderStars() {
        context.strokeStyle = 'white';
        for (let i = 0; i < Stars.length; i++) {

            let s = Stars[i],

            x = s.x-width/2 - frames/12,
            y = s.y-height/1.2;
            
            context.beginPath()
            context.arc(x,y,.3,0,Math.PI*2);
            context.stroke()
            
        }
    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

