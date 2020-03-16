
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0;


      render()
      function render() {

        frames++

        // clearFullScreen()

        create_squares(frames, 0, height/2)

        create_squares(frames, width/2, height/2)

        create_squares(frames, width, height/2)

        create_squares(frames, 0, 0)

        create_squares(frames, width, 0)

        create_squares(frames, width/2, 0)

        create_squares(frames, 0, height)

        create_squares(frames, width/2, height)

        create_squares(frames, width, +height)

        //   rotate_about_the_center()

          setTimeout(window.requestAnimationFrame, 0, render)
      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function create_squares(size, originX, originY) {

        context.save()

        context.translate(originX, originY)

        for (let i = size/1.5; i > 0; i-=15) {

            let lightness = i/3 < 80 ? i/3 : 70;

            context.beginPath()

            context.rect(-i, -i, i*2, i*2)

            context.strokeStyle = `hsl(${i/1.5}, 100%, ${lightness}%)`;

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