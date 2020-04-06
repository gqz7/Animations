
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 50,

      time = 0;

        render()

      function render() {

          frames = frames < 777 ? frames + 1 : 0;

          clearFullScreen()

          time++

          let changeSize = frames;
          
         context.save()

            createFractal(changeSize)

          context.restore() 


        // return
          setTimeout(window.requestAnimationFrame, 7, render)

      }


    function createTri(size, oX, oY) {

        let centerX = oX+size/2,
            centerY = oY-(.25  * Math.sqrt(3) * size);

       
        context.beginPath()

        context.save()

        context.translate(oX, oY)

        context.rotate(.01);

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.strokeStyle = `hsl(${size*3 + frames}, 0%, ${100-size/5 - frames/9}%)`

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

        context.save();

        console.log(size);
        context.translate(width/2, height/2);

        context.rotate(frames/100)

        for (let i = 0; i < 6; i++) {

            let triSize = size;

            while (triSize > 0) {

                if (-triSize/5 - frames/9 > -100) {
                    createTri(triSize,0,0);

                }

                triSize-=20
                
            }
            
            context.rotate(Math.PI/3)
            
        }

        context.rotate(-frames*2/100)

        for (let i = 0; i < 6; i++) {

            let triSize = size;

            while (triSize > 0) {

                if (-triSize/5 - frames/9 > -100) {
                createTri(triSize,0,0);
                }

                triSize-=20
                
            }
            
            context.rotate(Math.PI/3)
            
        }

        context.restore();
    }

