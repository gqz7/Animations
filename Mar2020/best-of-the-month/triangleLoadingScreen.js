
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      colorSelect = 144;

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
            colorSelect += 20
          }

          context.rotate(-Math.PI/777)

          for (let i = sizeChange; i > 0; i-=(i/12)+3) {
            
            context.save()

            context.translate(-i/2,  i/4)
            createTri(size + i, 0, 0, (i/7 + colorSelect), sizeChange)

            context.restore()
            
          }

          // console.log(sizeChange);
     
        setTimeout(window.requestAnimationFrame, 0, render)

      }


    function createTri(size, oX, oY, color, sc) {

        let light = 77-size/7 - (sc - 100)/50

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

    function createHex(size) {

        createTri(size,0,0)
        context.translate(-size,-size)
        createTri(size,0,0)
        context.translate(size,size)
        createTri(size,0,0)
    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    
    function rotate_about_the_center() {

        // context.save()

        context.translate(width/2, height/2)

        context.rotate(.001)

        context.translate(-width/2, -height/2)

        // context.restore()
    }