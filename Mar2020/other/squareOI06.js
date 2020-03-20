
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      rotateRight = true,

      degreesOfRotation = 0;


      render()
      function render() {

        frames++

        if (frames > 88) {
            clearFullScreen()
        }
        

        if (degreesOfRotation > frames/100000 && rotateRight) {
            
            rotateRight = false

        } else if ( degreesOfRotation < -frames/100000 && !rotateRight )  {

            rotateRight = true
        }

        // console.log(degreesOfRotation, rotateRight);
        

        degreesOfRotation = rotateRight ? degreesOfRotation + ((Math.sqrt(frames))/700000) : degreesOfRotation - ((Math.sqrt(frames))/700000);
        create_squares(frames, width/2, height/2, degreesOfRotation)



          setTimeout(window.requestAnimationFrame, 0, render)
      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function create_squares(size, originX, originY, deg) {

        context.save()

        context.translate(originX, originY)

        for (let i = (Math.round(size*2000) / 100) + size; i > 5; i-=i/size*100) {

            context.rotate(deg)

            let lightness =  73;

            context.beginPath()

            context.rect(-i, -i, i*2, i*2)

            context.strokeStyle = `hsl(${i+200}, 100%, ${lightness}%)`;

            context.lineWidth = 2;

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