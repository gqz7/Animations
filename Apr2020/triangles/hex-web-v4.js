
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 1,

      time = 0;

      context.translate(width/2, height/2)
    //   context.rotate(Math.PI/3)

        render()

      function render() {


          frames = width + frames < width*3.14 ? frames + 30: 1;  

          if (frames == 1) {
          clearFullScreen()
          }

          time++

          size = width + frames > width*3.14? width : width + frames;
          
            context.save()
          sirpinskiZoom(size)
             context.restore()

            //  context.rotate(-.01)

             
        setTimeout(window.requestAnimationFrame, 30, render)

      }


    function createTri(size, oX, oY) {
        context.strokeStyle = 'white';

        context.save()

        context.translate(oX, oY)

        context.beginPath()

        context.arc(0,0, size, 0, Math.PI*2)
        
        if (size > 60) {
            context.stroke()
        }
        context.strokeStyle = 'black';

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


    function sirpinskiZoom(startSize) {


        context.save()

        for (let i = 0; i < 6; i++) {
            
            let tempSize = startSize
            let count =  0;
            while (tempSize > 20) {

                count++

                context.save()
                    context.translate(-tempSize/(frames/2000), 0)

                    createTri(tempSize, 0 , 0 )

                context.restore()
                    tempSize/=2
                
            }

            context.rotate((Math.PI/3))

        
        }

      

        context.restore()
    }