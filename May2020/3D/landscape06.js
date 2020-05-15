const pi = Math.PI; //shortcut because is gets used alot

//simplex noise alg import
let Noise = toxi.math.noise.simplexNoise.noise;

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    renderPaused = true, //user can toggle animation

    framesUp = true,

    noiseSeed = Math.random()*3, //generates a random number to make each viewing of this animation unique

    mosPos = {
        x: width/2,
        y: height/2,
    },

    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    landscapePoints = []; // array to contain sphere points before they are rendered

    //set styling 

    console.log(noiseSeed);
    

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

    context.translate(width/2,height-300)

   //ANIMATION CYCLE

     createLandscape()
     render()

      function render() {

        clearFullScreen() //clear the canvas of previous animation cycle

        createLandscape() //create all the positions in an array

        renderLandscape() //render lines and shapes based on positions

        if (framesUp && frames < 597) {
            frames+=2
        } else if (framesUp && frames >= 597) {
            framesUp = false;
        } if (!framesUp && frames > -444) {
            frames-=5
        } else {
            framesUp = true;
        }

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 3, render)
        }

      }

    function createLandscape() {

        let wlim = (width/44),
            maxH = (height) *.8,

            inc = frames/3000;

            xCount = 0;

            landscapePoints = [];

        for (let x = 0; x < wlim; x++) {

            landscapePoints.push([]);

            let yCount = 0;
            
            for (let y = 1; y < maxH; y*= 1.2*(1+inc/20)) {

                let xVar = xCount < 3 ? 0 : xCount/13,

                    xNoise = (xCount/20) + noiseSeed,
                    yNoise =  (yCount/23-inc*17) + noiseSeed,

                    z = Noise(xNoise,yNoise);
                
                point = {
                    x: (x)*(1 +y*14/(frames+111)),
                    y: y/(1+z/1),
                    z: z * (xCount*xVar/2.7) + xCount*3.9,
                    yC: yCount
                };

                rotateY(pi/3)
                // rotateX(pi/7)
                // rotateZ(pi/4-frames/17000)

                landscapePoints[xCount][yCount] = point;

                yCount++

            }

            xCount++
            
        }

    }

    function renderLandscape() {

        for (let i = landscapePoints.length-2; i >= 0; i--) {
            
            for (let j = landscapePoints[i].length-2; j >= 0; j--) {

                let p = landscapePoints[i][j];

                    n1 = landscapePoints[i][j+1],
                    
                    n2 = landscapePoints[i+1][j],

                    n3 = landscapePoints[i+1][j+1],

                    light = Math.pow(p.yC+3,1.4) < 60 ? Math.pow(p.yC+3,1.4) : 60;
                    color = ((p.z)-p.y)*.77;

                    context.strokeStyle = `hsl(${color+frames/2},50%,${light}%)`;

                    context.lineWidth = light < 60 ? light/100 : 1;
                    context.save()
                    context.translate(0,-frames/2)

                    createSquare(p,n1,n3,n2)
                    // createTri(p,n1,n3,p)
                    // createTri(p,n2,n3,p)


                    context.rotate(pi)
                    context.translate(0,342-frames)
                    // createTri(p,n1,n3,p)
                    // createTri(p,n2,n3,p)
                    createSquare(p,n1,n3,n2)
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

    function createSquare(p1,p2,p3,p4) {

        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.lineTo(p4.x, p4.y)
        context.lineTo(p1.x, p1.y)
        context.stroke()
        // context.fill()

        context.beginPath()
        context.moveTo(-p1.x, p1.y)
        context.lineTo(-p2.x, p2.y)
        context.lineTo(-p3.x, p3.y)
        context.lineTo(-p4.x, p4.y)
        context.lineTo(-p1.x, p1.y)
        context.stroke()
        // context.fill()
        
    }

       function createTri(p1,p2,p3,p4) {

        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.lineTo(p4.x, p4.y)
        context.stroke()
        // context.fill()

        context.beginPath()
        context.moveTo(-p1.x, p1.y)
        context.lineTo(-p2.x, p2.y)
        context.lineTo(-p3.x, p3.y)
        context.lineTo(-p4.x, p4.y)
        context.stroke()
        // context.fill()

    }

