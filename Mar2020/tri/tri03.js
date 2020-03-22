
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      color = 100;


// context.translate(0, height/2)

      render()
      function render() {

          console.log(color);
          

        frames++

        color += .7;

        clearFullScreen()
        triangluar_grid(140-frames/50)

        // context.scale(1,1.001)

        // return

        setTimeout(window.requestAnimationFrame, 0, render)

      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    function triangluar_grid(size) {


        

        // context.strokeStyle = 'grey';
        context.save()

        context.translate(-size, (size*frames/size)/1.1)

        let count = 0,
            rowColor = color,
            light = 90;

        for (let i = height + size*44; i > 0; i -= size) {

            count++
            tri_row(size, light, rowColor) 

            light-=2
            rowColor +=17
            
            context.translate(-size/2, size-(size*frames/1000))

            if (count%2==0) {
                context.translate(size,0)
            }
            
            
        }

        context.restore()
        
    }

    function tri_row(size, light, rowColor) {

        context.strokeStyle = `hsl(${rowColor}, 100%, ${light}%)`;

        context.save()

        for (let i = width + size; i > 0; i -= size) {

            context.translate(size, 0)

            context.save()

            context.beginPath()

            context.moveTo(0,0)
            context.rotate(-Math.PI/3)
            context.lineTo(size + 0,0)
            context.rotate(Math.PI/3)
            context.lineTo(size + 0,0)
            context.rotate(Math.PI)
            context.lineTo(size+0,0)

            context.stroke()

            context.restore()
            
        }

        context.restore()
        
    } 