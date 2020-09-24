// alert('\nControls:\n\nSpace To Pause\n\nA to toggle auto-rotation\n\nW to toggle visibility of lines that pass through center point\n\nQ to toggle mouse based object rotation\n\nE to toggle visibility of points')

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
const canvas = document.createElement('canvas');
     context = canvas.getContext('2d'),
     width = canvas.width = window.innerWidth,
     height = canvas.height = window.innerHeight,
     pi = Math.PI; //shortcut because is gets used alot

let frames = 1000,//0, //keep count of how many render cycles have occured

    renderPaused = true,     //user can toggle animation
    autoRotate = false,     //roates z axis, can be toggle by user
    mouseRotate = true,    //determines if the user can rotate the merkabah my moving the mouse on the canvas
    hideMidLines = false, //determines if lines through center are shown in render
    showPoints = false,   //determines if the points of the merkabah will show
    showLines = true,  //determines if the line edges of the merkabah will show
    fillShape = false,  //determines if the line edges of the merkabah will show

    merkabahPoints = [],

    mosPos = {
        x: width/2,
        y: height/2,
    },
    
    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    };

const utils = {
        mapNumber: (number, min1, max1, min2, max2) => {
            return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
        },
        findObjectCoords: (mouseEvent) => {
            let 
            obj = canvas,
            obj_left = 0,
            obj_top = 0,
            xpos,
            ypos;
            while (obj.offsetParent) {
                obj_left += obj.offsetLeft;
                obj_top += obj.offsetTop;
                obj = obj.offsetParent;
            }
            if (mouseEvent) {
                xpos = mouseEvent.pageX;
                ypos = mouseEvent.pageY;
            }
            xpos -= obj_left;
            ypos -= obj_top;
            mosPos.x = xpos;
            mosPos.y = ypos;
        },
        clearFullScreen: () => {
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();   
        },
        rotateY: (radians) => {
            let y = point.y;
            point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
            point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
        },
        rotateX: (radians) => {
            let x = point.x;
            point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
            point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
        },
        rotateZ: (radians) => {
            let x = point.x;
            point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
            point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
        },
    };

    //set styling 
    document.body.style = 'cursor: none; margin: 0px; background-color: black;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; margin:auto`

    
    //event listener for user input
    canvas.onmousemove = utils.findObjectCoords;

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
                    mouseRotate = false;
                break;
            case 'KeyQ':
                    mouseRotate = !mouseRotate;
                    autoRotate = false;
                break;
            case 'KeyW':
                    hideMidLines = !hideMidLines;
                break;
            case 'KeyE':
                    showPoints = !showPoints;
                break;
            case 'KeyR':
                    showLines = !showLines;
                break;
            case 'KeyT':
                    fillShape = !fillShape;
                break;
        }

    }, false)

    //append canvas element to body
    document.body.appendChild(canvas);

    //translate origin to center of screen (default is top left corner)
    context.translate(width/2, height/2)
    
   //ANIMATION CYCLE START
    render()

    //ANIMATION FUNCTIONS
    function render() {
        utils.clearFullScreen() //clear the canvas of previous animation cycle
        calcPoints()
        createMerkabah() 
        //counts how many frames have occured
        frames++
        // return
        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }
    }
   
    function createMerkabah() {

        const points = [];
        merkabahPoint.forEach(p => {
            // count++
            point = {
                x: p.x,
                y: p.y,
                z: p.z,
                c: p.c 
            }
            //rotate the points to give the illusion of 3d
            // rotateZ(pi/12)
            
            if (mouseRotate) {
                let 
                xRotation = mosPos.x/111,
                yRotation = mosPos.y/111;
                utils.rotateX(xRotation)
                utils.rotateY(yRotation)
                utils.rotateZ(pi/12)
            } else if (autoRotate) {
                utils.rotateZ(frames/222)
                utils.rotateX(frames/222)
                utils.rotateY(frames/222)
            } else  {
                utils.rotateZ(2.1)
                utils.rotateY(.75)
                utils.rotateX(2.2)
            }
            points.push(point)
        });
        renderMerkabah(points)
    }
    
    function renderMerkabah (array) {
        
        const orgArr = [...array];
        // context.lineWidth = frames;
        array = array.sort( (a,b) => b.z-a.z);
        const maxZ = frames/5 < 120 ? frames/5 : 120,
              size = frames/200 < 3 ? frames/200 : 3;

        context.lineWidth = size/2;

        for (let i = 0; i < array.length; i++) {
            const p = array[i];

            if (showPoints) {
                renderPoint(p, maxZ, size)
            }

            if (showLines) {
                array.forEach(e => {   
                    if (
                        !hideMidLines
                        ||
                        hideMidLines
                        && p.x != -e.x
                        && p.y != -e.y
                        && p.z != -e.z
                    ) {
                        renderLine(p, e, maxZ)
                    } 
                });
            }  
        }

        if (fillShape) {
            fillMerkabah(orgArr, maxZ)
        }
    
    }

    function calcPoints() {
        const size1 = frames/5 < 120 ? frames/5 : 120,
              size2 = frames/10 < 60 ? frames/10 : 60;

        merkabahPoint = [
            {x: size1, y: size1, z: size1,  c: 0},
            {x: size2, y: size1, z: -size1, c: 30},
            {x:-size1, y: size2, z: size1,  c: 60},
            {x: size1, y:-size1, z: size2,  c: 130},
 
            {x: -size1, y: -size1, z: -size1, c: 180},
            {x: -size2, y: -size1, z: size1,  c: 225},
            {x: size1,  y: -size2, z: -size1, c: 270},
            {x: -size1, y: size1,  z: -size2, c: 315},
        
        ]        

    }

    function renderPoint(o, mz, s) {

        const
        light = utils.mapNumber(-o.z, -mz, mz, 10, 70),
        alpha = utils.mapNumber(-o.z, -mz, mz, .1, 1);

        context.fillStyle = `hsla(${o.c}, 100%, ${light }%, ${alpha})`

        context.beginPath()
        context.arc(o.x,o.y,s,0, pi*2)
        context.fill()
    }

    function renderLine(start, end, mz) {

        const sgs = 37;//number of line segments(sgs) that make up one line

        for (let i = 0; i < sgs; i++) {
            
            const
            startX = utils.mapNumber(i/sgs, 0, sgs/i, start.x, end.x),
            startY = utils.mapNumber(i/sgs, 0, sgs/i, start.y, end.y),
            endX = utils.mapNumber((i+1)/sgs, 0, sgs/(i+1), start.x, end.x),
            endY = utils.mapNumber((i+1)/sgs, 0, sgs/(i+1), start.y, end.y),
            Z = utils.mapNumber((i+.5)/sgs, 0, sgs/(i+.5), start.z, end.z),
            alpha = utils.mapNumber(-Z, -mz, mz, .23, 1),
            color = utils.mapNumber(i, 0, sgs, 0, 360)+frames*2;
            
            context.strokeStyle = `hsl(${color}, 100%, 50%, ${alpha})`

            context.beginPath()
            context.moveTo(startX, startY)
            context.lineTo(endX, endY)
            context.stroke()
        }
    }

    function fillMerkabah(arr, m) {

        const
        pyramid1 = [0, 5, 6, 7],
        pyramid2 = [4, 1, 2, 3];

        let coords = [ ...getFaceCoords(pyramid1, 1), ...getFaceCoords(pyramid2, 2)];

        // coords = coords.map( (e, i) => {



        // })

        // console.log(coords);

        coords = coords.sort( (p1, p2) => {
                
            const
            z1 = ( arr[p1[0]].z, arr[p1[1]].z, arr[p1[2]].z  )/3, 
            z2 = ( arr[p2[0]].z, arr[p2[1]].z, arr[p2[2]].z  )/3; 

            // z1 = Math.max(arr[p1[0]].z, arr[p1[1]].z, arr[p1[2]].z ), 
            // z2 = Math.max(arr[p2[0]].z, arr[p2[1]].z, arr[p2[2]].z );

            console.log(z1, z2);

            return z1-z2 
        })
        
        // console.log(coords);

        const maxZ = frames/5 < 120 ? frames/5 : 120;
        
        coords.forEach( (points, i) => {


            const light = utils.mapNumber( ( arr[points[0]].z, arr[points[1]].z, arr[points[2]].z  )/3, -maxZ, maxZ, 0, 100  );

            const color = i*30;

                context.fillStyle = `hsl(${color+frames}, 100%, ${light}%)`

                const 
                one = arr[points[0]],
                two = arr[points[1]],
                three = arr[points[2]];
                
                context.beginPath();
                context.moveTo(one.x, one.y);
                context.lineTo(two.x, two.y);
                context.lineTo(three.x, three.y);
                context.lineTo(one.x, one.y);
                context.fill()
                
        });

    }

    function getFaceCoords(cArr, num) {
        const allCoords = [];
        cArr.forEach(e1 => {
            cArr.forEach(e2 => {
                if (e1 != e2) {
                    cArr.forEach(e3 => {
                        if (e3 != e1 && e3 != e2) {
                            let repeated = false;
                            for (let i = 0; i < allCoords.length && !repeated; i++) {
                                const face = allCoords[i];
                                if (face.includes(e1) && face.includes(e2) && face.includes(e3) ) {
                                    repeated = true
                                }
                            }
                            if (!repeated) {
                                allCoords.push([e1, e2, e3])
                            }
                        }
                    });
                }
            });
        });
        return allCoords;
    }