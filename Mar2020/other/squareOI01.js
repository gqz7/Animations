
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0;


      render()
      function render() {

        frames++

        clearFullScreen()

        create_squares(frames)

          rotate_about_the_center()

          setTimeout(window.requestAnimationFrame, 10, render)
      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function create_squares(size) {

        context.save()

        context.translate(width/2, height/2)

        for (let i = size/2; i > 0; i-=10) {

            context.beginPath()

            context.rect(-i, -i, i*2, i*2)

            context.strokeStyle = 'white'

            context.stroke()

        }

        context.restore()

    }
    

    function rotate_about_the_center() {

        // context.save()

        context.translate(width/2, height/2)

        context.rotate(.001)

        context.translate(-width/2, -height/2)

        // context.restore()
    }