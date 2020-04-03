
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      time = 0,

      light = 100;

      context.translate(width/2, height - height/3)

        render()

      function render() {

          frames++

          clearFullScreen()

          time++

          let changeSize = frames;

          createFractal(changeSize)

          if (light < 0) {
                light = 100
                frames = 0
            }


          setTimeout(window.requestAnimationFrame, 20, render)

      }


    function createTri(size, oX, oY) {

        let centerX = oX+size/2,
            centerY = oY-(.25  * Math.sqrt(3) * size),
            rotateBy = -frames/100;

            if (rotateBy < -2.1) {
                light-=.01
            }


        context.save()

        context.translate(centerX, centerY)



        context.rotate(-frames/100)
        context.translate(-centerX, -centerY)


        context.translate(oX, oY)

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.strokeStyle = `hsl( 0, 0%, ${light}%)`;

        context.stroke()

        context.fillStyle = 'black';

        context.fill()

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createFractal(size) {
        
        let count = 0,
            start = size;

        while (count < 3) {

            count++

           

            for (let i = start; i > 0; i-=7) {

                size = i

                 context.save()

                context.translate(-size*2,size)

                if (count == 2) {
                    context.translate(size*2,0)
                } else if (count == 3) {
                    context.translate( size, -(Math.sqrt(3) * size))
                    
                } 

                createTri(i, 0,0)
                // context.translate(100,0)
                createTri(size, size,0)
                // context.translate(-50,-100)
                createTri(size, size/2, -(.5 * Math.sqrt(3) * size))
                context.restore()
            }
            

            
        }

              
    }

