//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = width,

      time = 0,
      endSize = 40;

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/2)

      context.strokeStyle = 'white';

//ANIMAITON CYCLE

        render()

      function render() {

        clearFullScreen()

        time++

        endSize = endSize > 40 ? endSize - .3: 40;

        context.save()
        createHexagon(500, time/100 +1)
        context.restore()

        setTimeout(window.requestAnimationFrame, 30, render)

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
    function createHexagon(size,edges) {
        for (let i = 1; i < edges; i++) {
           flowerOfLife(size)
           context.rotate(Math.PI/(Math.floor(edges)/2))
        }
    }

//A FUNCTION THAT USES RECURSTION TO CREATE A SIRPINSKI TRIANGLE
    function flowerOfLife(startSize) {
        if (startSize > endSize) {

            if (startSize/2 <= endSize) {

                createCir(startSize)


            } else if (startSize/2 > endSize && startSize/2 < endSize*2) {
                
                context.lineWidth = ((endSize/startSize*2))/2;
                // createCir(startSize)
                triRecursion(startSize)

            } else {

                context.lineWidth = ((endSize/startSize)*4)-.2;
                // createCir(startSize)
                triRecursion(startSize)
            
            } 

        }
    }

//HELP SHORTEN REPEATED CODE USED IN FUNCTION ABOVE
    function triRecursion (startSize) {
        context.save()                
        flowerOfLife(startSize/2)
        context.translate(startSize/2,0)
        flowerOfLife(startSize/2)
        context.translate(-startSize/4, -Math.sqrt(3) * startSize * .25)
        flowerOfLife(startSize/2)
        context.restore();
    }
