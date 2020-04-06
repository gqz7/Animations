
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      time = 0;

        render()

      function render() {

          frames = frames < 3000 ? frames+1 : 0;

          clearFullScreen()

          time++

          let changeSize = frames;

          
         context.save()

        createFractal(changeSize)

          context.restore() 

          

        // return
          setTimeout(window.requestAnimationFrame, 0, render)

      }


    function createTri(size, oX, oY) {

        let centerX = oX+size/2,
            centerY = oY-(.25  * Math.sqrt(3) * size);

        context.beginPath()
        // context.arc(0,0, size/10, 0, Math.PI*2)
        context.stroke()

        context.beginPath()

        context.save()

        context.translate(oX, oY)

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(Math.PI/ 3)
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

    function createFractal(size) {

        context.strokeStyle = `hsl(${time}, 0%, 80%)`;
        context.lineWidth = 2;

        context.save();

        console.log(size);
        context.translate(width/2, height/2);
        context.rotate(Math.PI/6)

        for (let i = 0; i < 6; i++) {

            let triSize = size;

            while (triSize > 1) {

                createTri(triSize,0,0);

                triSize/=2
                
            }
            
            context.rotate(Math.PI/3)
            
        }


        
        context.restore();
    }

