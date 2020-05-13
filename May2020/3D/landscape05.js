alert('Press Space to Pause, Press S Key to Switch Between viewing options')

const pi = Math.PI; //shortcut because is gets used alot

//simplex noise alg import
let Noise = toxi.math.noise.simplexNoise.noise;

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 2, //keep count of how many render cycles have occured

    switchDis = 2, //changes how the display looks, user can press S to cycle through options

    renderPaused = false, //user can toggle animation

    framesUp = false;

    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    landscapePoints = []; // array to contain sphere points before they are rendered

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
            case 'KeyS': 
                switchDis = switchDis < 2 ?  switchDis+1 : 0;
                break;
        
        }

    }, false)

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2,height-300)

   //ANIMATION CYCLE

     createLandscape()
     render()

      function render() {

        clearFullScreen() //clear the canvas of previous animation cycle

        createLandscape() //create all the positions in an array

        renderLandscape() //render lines and shapes based on positions

        if (framesUp && frames < 2077) {
            frames+=17
        } else if (framesUp && frames >= 2077) {
            framesUp = false;
        } if (!framesUp && frames > -333) {
            frames-=11
        } else {
            framesUp = true;
        }

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 3, render)
        }

      }

    function createLandscape() {

        let wlim = (width/2)/13,
            maxH = (height) *1.71,

            inc = frames/1000;

            xCount = 0;

            landscapePoints = [];

        for (let x = 0; x < wlim; x++) {

            landscapePoints.push([]);

            let yCount = 0;
            
            for (let y = 1; y < maxH; y*= 1.2 * (1 + inc/10)) {

                let z = Noise(Math.abs(xCount-100)/(22+frames/100)-inc, yCount/10)*70  + x*(5+frames/170)
                
                point = {
                    x: (x*13)*(1 +((y*4)/734)),
                    y: y,
                    z: z
                };

                rotateY(Math.PI/3)

                landscapePoints[x][yCount] = point;

                yCount++

            }

            xCount++
            
        }

    }

    function renderLandscape() {

        for (let i = landscapePoints.length-2; i >= 0; i--) {
            
            for (let j = 0; j <= landscapePoints[i].length-2; j++) {

                let p = landscapePoints[i][j];

                    n1 = landscapePoints[i][j+1],
                    
                    n2 = landscapePoints[i+1][j],

                    n3 = landscapePoints[i+1][j+1],

                    light = p.y/70+45<60 ? p.y/70+ 45 : 60,
                    color = (p.z/(2+p.y/200))*(p.x/3)*(p.y/2)/12000+frames/10,
                    strokeLight = i+20<light ? i+20 : light;

                    context.fillStyle = `hsl(${color},50%,${light}%)`;
                    context.strokeStyle = `hsl(${color},50%,${strokeLight}%)`;


                    if (switchDis == 0) {
                        createSquare(p,n1,n3,n2)

                    } else if (switchDis == 1) {
                        createTri(p,n1,n3,p)
                        createTri(p,n2,n3,p)

                    } else {
                        
                        context.strokeStyle = `hsl(${color},50%,${light}%)`;
                        createOutline(p,n1,n3,n2)
                    }
                    

                    context.save()

                    context.rotate(Math.PI)
                    context.translate(0,height/4)

                     if (switchDis == 0) {
                        createSquare(p,n1,n3,n2)

                    } else if (switchDis == 1) {
                        createTri(p,n1,n3,p)
                        createTri(p,n2,n3,p)

                    } else {
                        createOutline(p,n1,n3,n2)
                    }

                    context.restore()
            }   
        }
    }

    //FUNCTIONS ROTATE A GIVEN POINT ABOUT THE 0,0,0 AXIS
    function rotateY(radians) {

        let y = point.y;
        point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
        point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
    }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createTri(p1,p2,p3,p4) {

        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.lineTo(p4.x, p4.y)
        context.stroke()
        context.fill()

        context.beginPath()
        context.moveTo(-p1.x, p1.y)
        context.lineTo(-p2.x, p2.y)
        context.lineTo(-p3.x, p3.y)
        context.lineTo(-p4.x, p4.y)
        context.stroke()
        context.fill()

    }

    function createSquare(p1,p2,p3,p4) {

        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.lineTo(p4.x, p4.y)
        context.lineTo(p1.x, p1.y)
        context.stroke()
        context.fill()

        context.beginPath()
        context.moveTo(-p1.x, p1.y)
        context.lineTo(-p2.x, p2.y)
        context.lineTo(-p3.x, p3.y)
        context.lineTo(-p4.x, p4.y)
        context.lineTo(-p1.x, p1.y)
        context.stroke()
        context.fill()
        
    }

    function createOutline(p1,p2,p3,p4) {

        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.lineTo(p4.x, p4.y)
        context.lineTo(p1.x, p1.y)
        context.stroke()

        context.beginPath()
        context.moveTo(-p1.x, p1.y)
        context.lineTo(-p2.x, p2.y)
        context.lineTo(-p3.x, p3.y)
        context.lineTo(-p4.x, p4.y)
        context.lineTo(-p1.x, p1.y)
        context.stroke()

    }

