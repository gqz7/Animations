
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      time = 0;

      context.translate(width/2, height/2)

        render()

      function render() {

          frames++

          // console.log(frames);

          time++

          createFractal()

          // console.log(sizeChange);
     
        setTimeout(window.requestAnimationFrame, 0, render)

      }


    function createTri(size, oX, oY) {

        context.save()

        context.translate(oX, oY)

         context.beginPath()

        context.moveTo(0,0)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.strokeStyle = 'white';

        context.stroke()

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createFractal() {

         let size = (frames * frames/2) + (time/2) + .1 < time*20 + 10000 ? (frames * frames/2) + (time/2) + .1: false;

          if (!size) {
            frames = 0;
            
          clearFullScreen()

          }

        context.save()

        context.translate(-size,size/2)

        createTri(size, 0,0)
        // context.translate(100,0)
        createTri(size, size,0)
        // context.translate(-50,-100)
        createTri(size, size/2, -(.5 * Math.sqrt(3) * size))


        context.restore()
    }

  
        // let sizeChange = (frames * frames/100) + 1 < 3333 ? (frames * frames/100) + 1: false;

        //   if (!sizeChange) {
        //     frames = 0;
        //   }

        //   let count = 0, ranColor = Math.floor( Math.random() * colorSelect.length );

        //   colorIndex = 0;


        //  for (let i = sizeChange; i > 0; i-=(i/12)+3) {

        //     if (count%3==0) {

        //       colorIndex = colorIndex < colorSelect.length-1 ? colorIndex + 1 : 0;

        //     }
            
        //     context.save()

        //     context.translate(-i/2,  i/4)
        //     createTri(size + i, 0, 0, colorSelect[colorIndex], sizeChange, ranColor)

        //     context.restore()

        //     count++
            
        //   }