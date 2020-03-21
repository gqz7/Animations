
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      color = 1;


// context.translate(0, height/2)

      render()
      function render() {

          console.log(color);
          

        frames++

        clearFullScreen()
        triangluar_grid(15)

        return

        setTimeout(window.requestAnimationFrame, 10, render)

      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    function triangluar_grid(size) {

        color = 100

        context.save()

        context.translate(-size, 0)

        let count = 0;

        for (let i = height + size*10; i > 0; i -= size) {

            count++

            color+=10;

            tri_row(size) 
            
            context.translate(-size/2, size-size/10)

            if (count%2==0) {
                context.translate(size,0)
            }
            
        }

        context.restore()
        
    }

    function tri_row(size) {

        context.save()

        let light = 0


        for (let i = width + size; i > 0; i -= size) {

            light = light < 50 ? light + 2 : light;

            context.strokeStyle = `hsl(${color}, 100%, ${light}%)`;

            context.translate(size, 0)

            context.save()

            context.beginPath()

            context.moveTo(0,0)
            context.rotate(-Math.PI/3)
            context.lineTo(size,0)
            context.rotate(Math.PI/3)
            context.lineTo(size,0)
            context.rotate(Math.PI)
            context.lineTo(size,0)

            context.stroke()

            context.restore()
            
        }

        context.restore()
        
    }