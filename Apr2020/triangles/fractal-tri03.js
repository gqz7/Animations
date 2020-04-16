
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      endSize = 50,

      time = 0;

      context.translate(width/2, height/2)

        render()

      function render() {

          clearFullScreen()

          frames = width + frames < width*2 ? frames + 20: 1; 

          time++

          size = width + frames > width*2? width : width + frames;
          
            createHexagon(size/2)
 
        setTimeout(window.requestAnimationFrame, 30, render)

      }


    function createTri(size, oX, oY) {

        context.save()

        context.translate(oX, oY)

        // context.beginPath()

        // context.arc(0,0, size, 0, Math.PI*2)
        
        // context.stroke()

         context.beginPath()

        context.moveTo(0,0)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.stroke()

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createHexagon(size) {

        for (let i = 0; i < 6; i++) {
           sirpinskiZoom(size)
           context.rotate(Math.PI/3)
        }
        
    }


    function sirpinskiZoom(startSize) {
                context.strokeStyle = 'white';

        if (startSize > endSize) {
            
            if (startSize/2 <= endSize) {

                createTri(startSize,0,0)

            } else {
                context.save()                
                sirpinskiZoom(startSize/2)
                context.translate(startSize/2,0)
                sirpinskiZoom(startSize/2)
                context.translate(-startSize/4, -Math.sqrt(3) * startSize * .25)
                sirpinskiZoom(startSize/2)
                context.restore();
            }
            
        }
    }