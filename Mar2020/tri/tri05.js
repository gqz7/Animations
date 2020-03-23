//create triangle grid from origin, fractal zoom

let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0;

      const size = 1;

      

        render()

      function render() {

          frames++

          console.log(frames);

          context.save()

          
          context.translate(width/2, height/2);
          createHex(frames*10)
        //   createTri(size + frames*20, frames*10, frames*10)

          context.restore()


        //   context.save()
          
        //   context.translate(width, 0);

        //   context.rotate(Math.PI/1000)

        //   createTri(-size + frames*20)

        //   context.restore()

     
        setTimeout(window.requestAnimationFrame, 0, render)

      }


    function createTri(size, oX, oY) {

        console.log(size, oX, oY);
        

         context.beginPath()

        context.moveTo(oX,oY)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,oY)
        context.rotate(Math.PI/3)
        context.lineTo(size,oY)
        context.lineTo(oX, oY)

        context.strokeStyle = `white`;

        context.stroke()

    }

    function createHex(size) {

        createTri(size,0,0)
        context.translate(-size,-size)
        createTri(size,0,0)
        context.translate(size,size)
        createTri(size,0,0)
    }