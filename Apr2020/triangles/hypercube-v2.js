let fillBool = false,
    colorBool = true,

    spaceSize = 7,

    animateCicles = false;

document.addEventListener('keydown', userInputEvent, false);

function userInputEvent(input) {

    switch (input.code) {
        case "Space":

            fillBool = !fillBool;

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

      time = 0;

        render()

      function render() {

          frames = frames < 2000 ? frames + 3 : 0;

          clearFullScreen()

          time++

          let changeSize = frames;

          
         context.save()

        createFractal(changeSize)

          context.restore() 

          

        // return
          setTimeout(window.requestAnimationFrame, 3, render)

      }


    function createTri(size, oX, oY) {

        context.fillStyle = colorBool ? `hsl(${time/3+size/2}, 100%, 65%)`: 'black';


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

        if (fillBool) {
            context.fill()
        }

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createFractal(size) {

        context.strokeStyle = colorBool && fillBool ? `black` : `white`;

        context.lineWidth = 1;

        context.save();

        console.log(size);
        context.translate(width/2, height/2);
        context.rotate(Math.PI/6)

        for (let i = 0; i < 6; i++) {

            let triSize = size;

            context.save()

            while ( triSize > spaceSize) {

                createTri(triSize,0,0);

                triSize/=1.1

                context.rotate(Math.PI)

                context.translate(0, -triSize)

                createTri(triSize,0,0);

                
            }

            context.restore()
            
            context.rotate(Math.PI/3)
            
        }


        
        context.restore();
    }

