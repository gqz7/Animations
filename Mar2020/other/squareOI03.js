
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0;
 

      render()
      function render() {

        frames++

        clearFullScreen()

        create_squares(frames, 0, height/2)

        create_squares(frames, width/2, height/2)

        create_squares(frames, width, height/2)

        // create_squares(frames, 0, 0)

        // create_squares(frames, width, 0)

        // create_squares(frames, width/2, 0)

        // create_squares(frames, 0, height)

        // create_squares(frames, width/2, height)

        // create_squares(frames, width, +height)

          rotate_about_the_center()

          setTimeout(window.requestAnimationFrame, 10, render)
      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(width/2, height/2, width/4, height/4);
        context.restore();
        
    }

    function create_squares(size, originX, originY) {

        context.save()

        context.translate(originX, originY)

        for (let i = size/.5; i > 0; i-=size/10) {

            let lightness = i/3 < 50 ? i/3 : 50;

            context.beginPath()

            context.rect(-i, -i, i*2, i*2)

            context.strokeStyle = `hsl(${i/5}, 100%, ${lightness}%)`;
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