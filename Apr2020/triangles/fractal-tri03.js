
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 1200,

      time = 0;

      context.translate(width/2, height/2)
      context.rotate(Math.PI/3)

        render()

      function render() {

          clearFullScreen()

          frames = frames < width*10 ? frames*1.1 : 1200

          time++

        //   console.log(frames);
          
            context.save()
          sirpinskiZoom(frames)
             context.restore()

            //  context.rotate(-.001)

             
        setTimeout(window.requestAnimationFrame, 100, render)

      }


    function createTri(size, oX, oY) {
        context.strokeStyle = 'white';

        context.save()

        context.translate(oX, oY)

        context.beginPath()

        context.arc(0,0, size*7, 0, Math.PI*2)
        
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


    function sirpinskiZoom(size) {

        
        let count =  0;

        context.save()
        
        while (count < 7) {

            count++
            

        context.save()

            // context.translate(-size, 0)

            createTri(size, 0 , 0 )

        context.restore()
            size/=2
            
        }

        context.restore()
    }