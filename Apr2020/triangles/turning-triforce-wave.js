
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      time = 0;

      context.translate(100, height/1.5)

        render()

      function render() {

          frames = frames < 11111 ? frames + 1 : 0;

        //   clearFullScreen()

          time++

          let changeSize = frames;

          createFractal(changeSize/7)


        setTimeout(window.requestAnimationFrame, 0, render)

      }


    function createTri(size, oX, oY) {

        let centerX = oX+size/2,
            centerY = oY-(.25  * Math.sqrt(3) * size);

        context.save()

        context.translate((frames*size)/70,0)

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

        context.strokeStyle = 'white';
        context.strokeStyle = `hsl(${time/2}, 100%, 60%)`

        context.stroke()

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createFractal(size) {
        
        let count = 0;

        while (count < 3) {

            count++

            context.save()

            context.translate(-size*2,size)

            if (count == 2) {
                context.translate(size*2,0)
            } else if (count == 3) {
                context.translate( size, -(Math.sqrt(3) * size))
                
            } 

            createTri(size, 0,0)
            // context.translate(100,0)
            createTri(size, size,0)
            // context.translate(-50,-100)
            createTri(size, size/2, -(.5 * Math.sqrt(3) * size))

            context.restore()
            
        }

              
    }

