
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      colorSelect = [323, 180, 64],

      colorIndex = 0;

      const size = 1;

      context.translate(width/2, height/2)

        render()

      function render() {

          frames++

          clearFullScreen()

          // console.log(frames);
          let sizeChange = (frames * frames/100) + 1 < 3333 ? (frames * frames/100) + 1: false;

          if (!sizeChange) {
            frames = 0;
          }

          context.rotate(-Math.PI/777)

          let count = 0, ranColor = Math.floor( Math.random() * colorSelect.length );

          colorIndex = 0;

          for (let i = sizeChange; i > 0; i-=(i/12)+3) {

            if (count%3==0) {

              colorIndex = colorIndex < colorSelect.length-1 ? colorIndex + 1 : 0;

            }
            
            context.save()

            context.translate(-i/2,  i/4)
            createTri(size + i, 0, 0, colorSelect[colorIndex], sizeChange, ranColor)

            context.restore()

            count++
            
          }

          // console.log(sizeChange);
     
        setTimeout(window.requestAnimationFrame, 0, render)

      }


    function createTri(size, oX, oY, color, sc, rc) {

  
        let light = 77-size/7 - (sc - 100)/50;

        if (color == 323) {
          light *= 1.3
        }

        // console.log(size, oX, oY);

         context.beginPath()

        context.moveTo(oX,oY)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,oY)
        context.rotate(Math.PI/3)
        context.lineTo(size,oY)
        context.lineTo(oX, oY)

        context.strokeStyle = `hsl(${color}, 100%, ${light}%)`;
        // context.strokeStyle = 'white';

        context.stroke()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

  