
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerHeight,
      height = canvas.height = window.innerHeight - 120,

      frames = width,

      endSize = 15;

      context.translate(0, height)

      context.strokeStyle = 'white';


        render()

      function render() {

        clearFullScreen()

        endSize = endSize > 15 ? endSize - .5: 15;

        frames*=1.01; 

        if (frames > width*2) {
            frames = width
        }
        createHexagon(frames)
 
        setTimeout(window.requestAnimationFrame, 20, render)

      }


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

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createHexagon(size) {

          sirpinskiZoom(size)
 
        
    }


    function sirpinskiZoom(startSize) {
    
        if (startSize > endSize) {
            
            if (startSize/2 <= endSize) {

                let lWidth = (1-(endSize/startSize))*2;

                context.lineWidth = lWidth;

                createTri(startSize)

            } else if (startSize/2 > endSize && startSize/2 < endSize*2) {
                
                context.lineWidth = 1 

                createTri(startSize)
      
                triRecursion(startSize)

            } else {

                triRecursion(startSize)
            }
            
        }
    }

    function triRecursion (startSize) {
        context.save()                
        sirpinskiZoom(startSize/2)
        context.translate(startSize/2,0)
        sirpinskiZoom(startSize/2)
        context.translate(-startSize/4, -Math.sqrt(3) * startSize * .25)
        sirpinskiZoom(startSize/2)
        context.restore();
    }