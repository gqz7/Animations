let clearScreenBool = true,
    colorBool = true,

    spaceSize = 7,

    colorSelect = [323, 180, 64];

document.addEventListener('keydown', userInputEvent, false);

function userInputEvent(input) {

    switch (input.code) {
        case "Space":

            clearScreenBool = !clearScreenBool;

            break;

        case "KeyC":

            colorBool = !colorBool;

            break;

        case "Comma":

            spaceSize = spaceSize > 2 ? spaceSize - 1 : 2;

            break;

        case "Period":

            spaceSize++

            break;
    
        default:
            break;
    }
    
}


let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      time = 0,

      light = 100;

      context.translate(width/2, height/2+height/10)

        render()

      function render() {

          frames++

          if (clearScreenBool) {
              clearFullScreen()
          }
          

          time++

          let changeSize = frames;

          createFractal(changeSize)

          if (light < 0) {
                light = 100
                frames = 0
            }


          setTimeout(window.requestAnimationFrame, 20, render)

      }


    function createTri(size, oX, oY, count) {

        let centerX = oX+size/2,
            centerY = oY-(.15  * Math.sqrt(3) * size),
            rotateBy = -frames/50;

            if (rotateBy < -4.1) {
                light-=.01
            }


        context.save()

        context.translate(centerX, centerY)

        context.rotate(rotateBy)

        context.translate(oX-centerX, oY-centerY)

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.strokeStyle = colorBool ? 'black' : `hsl( 0, 0%, ${light}%)`;

        context.stroke()

        context.fillStyle = colorBool ?  `hsl( ${colorSelect[Math.round(count)%3]}, 100%, ${light-50}%)` : 'black';



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

           let loopCount = 0;

            for (let i = start; i >= 0; i-=spaceSize) {

                size = i

                loopCount++

                 context.save()

                context.translate(-size*2,size)

                if (count == 2) {
                    context.translate(size*2,0)
                } else if (count == 3) {
                    context.translate( size, -(Math.sqrt(3) * size))
                    
                } 

                createTri(size, 0,0, loopCount)
                // context.translate(100,0)
                createTri(size, size,0, loopCount)
                // context.translate(-50,-100)
                createTri(size, size/2, -(.5 * Math.sqrt(3) * size), loopCount)
                context.restore()
            }
            

            
        }

              
    }

