
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

          time++

          sirpinskiZoom(frames+100)

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


    function sirpinskiZoom(size) {

        size = size < height ? size : height;
        
        
        while (size > 10) {
            
            // console.log(size);
            

            size-=100
        }
    }