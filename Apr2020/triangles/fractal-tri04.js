//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = width,

      time = 0,
      
      pauseAnimation = false;

//VARS FOR USER INPUT
let showCircles = true,

    showTriangles = true,

    colorSwitch = 0,

    endSize = 170;

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    switch (input.code) {

        case "ShiftLeft":
        case "ShiftRight":

            context.rotate(Math.PI/6)

            break;
        case "Space":

            showCircles = !showCircles;

            break;

         case "KeyT":

            showTriangles = !showTriangles;

            break;

        case "KeyC":

            console.log(colorSwitch);
            

            colorSwitch = colorSwitch < 1 ? colorSwitch+1 : 0;

            break;

        case "Comma":
        case "ArrowLeft":

            endSize = endSize > 30 ? endSize - 1 : 30;

            break;

        case "Period":
        case "ArrowRight":

            endSize++

            break;

        case "Escape":

            pauseAnimation = !pauseAnimation;

            if (!pauseAnimation) {
                render()
            }
    
        default:
            break;
    }
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/2)


//ANIMAITON CYCLE

        render()

      function render() {

        clearFullScreen()

        time++

        endSize = endSize > 40 ? endSize - .3: 40;

        frames*=1.03; 

        if (frames > width*2) {
            frames = width
        }
        createHexagon(frames/2)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 30, render)
        }

      }


//CREATES A TRIANGLE AT THE CANVAS ORIGIN WITH A GIVEN SIDE LENGTH 'size'
    function createTri(size) {

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.stroke()

    }

//CREATES A TRIANGLE AT THE CANVAS ORIGIN WITH A GIVEN RADIUS 'size'

    function createCir(size) {

        context.beginPath()

        context.arc(0,0,size,0,Math.PI*2)

        context.stroke()

    }

//CLEARS THE CANVAS
    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

//CREATE A HEX STRUCTURE OF SIRPINSKI TRIANGLES
    function createHexagon(size) {
        for (let i = 0; i < 6; i++) {
           sirpinskiZoom(size)
           context.rotate(Math.PI/3)
        }
    }

//A FUNCTION THAT USES RECURSTION TO CREATE A SIRPINSKI TRIANGLE
    function sirpinskiZoom(startSize) {
        if (startSize > endSize) {
            setStroke(startSize)
            if (startSize/2 <= endSize) {

                if (showTriangles) {
                    context.lineWidth = (1-(endSize/startSize))*2;
                    createTri(startSize)
                }

            } else if (startSize/2 > endSize && startSize/2 < endSize*2) {
                
                if (showTriangles) {
                    context.lineWidth = 1 
                    createTri(startSize)
                }

                if (showCircles) {
                    context.lineWidth = (1-(endSize/startSize*2))/2;
                    createCir(startSize)
                }
                triRecursion(startSize)
            } else {
                if (showCircles) {
                    context.lineWidth = ((endSize/startSize)*2)-.2;
                    createCir(startSize)
                }
                triRecursion(startSize)
            } 
        }
    }

//HELP SHORTEN REPEATED CODE USED IN FUNCTION ABOVE
    function triRecursion (startSize) {
        context.save()                
        sirpinskiZoom(startSize/2)
        context.translate(startSize/2,0)
        sirpinskiZoom(startSize/2)
        context.translate(-startSize/4, -Math.sqrt(3) * startSize * .25)
        sirpinskiZoom(startSize/2)
        context.restore();
    }

//SETS THE CONTEXT STROKE STYLE USING colorSwitch var 
    function setStroke(size) {
        switch (colorSwitch) {
            case 0:
            context.strokeStyle = 'white';
            break;
            case 1:
            context.strokeStyle = `hsl( ${time*2}, 100%, 50%)`;
            break;
        }

    }