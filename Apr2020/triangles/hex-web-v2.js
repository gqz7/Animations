let clearScreenBool = true,
    colorBool = true,

    spaceSize = 7,

    animateCicles = false;

document.addEventListener('keydown', userInputEvent, false);

function userInputEvent(input) {

    switch (input.code) {
        case "Space":

            clearScreenBool = !clearScreenBool;

            break;

        case "KeyC":

            colorBool = !colorBool;

            break;
        case "KeyF":

            animateCicles = !animateCicles;

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

          frames = frames < 777 ? frames + 2 : 0;

          if (clearScreenBool) {
            
            clearFullScreen()
          }

          time++

          let changeSize = frames/1.4;
          
         context.save()

            context.translate(-100 ,0)


            createHex(changeSize)

            context.translate(200 ,0)

            createHex(changeSize)


          context.restore() 


        // return
          setTimeout(window.requestAnimationFrame, 7, render)

      }


    function createTri(size, oX, oY) {

        let saturation = colorBool ? 100 : 0;

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

        context.strokeStyle = `hsl(${size*3 + time}, ${saturation}%, ${100-size/5 - frames/9}%)`

        context.stroke()

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createHex(size) {

        let saturation = colorBool ? 100 : 0;

        context.save();

        console.log(size);

        for (let i = 0; i < 14; i++) {

            if (i == 0) {

                context.translate(width/2, height/2);
                context.rotate(frames/150)
                
            } else if (i == 6) {

                context.rotate(-frames*2/150)

            } else {

                 let triSize = size;

                while (triSize > 0) {

                    if (triSize/5 + frames/9 < 100) {

                        createTri(triSize,0,0);

                        if (animateCicles) {

                            context.strokeStyle = `hsl(${triSize*3 + frames}, ${saturation}%, ${100-triSize/5 - frames/9}%)`
                            context.beginPath()
                            context.arc(0,0, triSize, 0, Math.PI*2)
                            context.stroke()
                            
                        }
                        
                    }

                    triSize-=size/23 + 3
                    
                }
                
                context.rotate(Math.PI/3)

            }
            
        }

        context.restore();
    }

