
//trying to figure out myself how to create random points that exclude a circle in the center of the screen with a given radius

let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      angle = 0;

      createbbg()
      render()
      function render() {

        //   scale_from_center()
        //   clearFullScreen()

          rotate_about_the_center()

          ranCircle()


          setTimeout(window.requestAnimationFrame, 0, render)
      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function ranCircle() {

        context.save()

        context.translate(width/2, height/2)

        for (let i = 0; i < 1000; i++) {

                let radius = i/100;

                let randomX = (Math.random() * Math.cos(i)) * radius,
                    randomY = (Math.random() * Math.sin(i)) * radius,

                    x =  randomX,
                    y = height / randomY,
                    x1 = x + 1,
                    y1 = y +1;
            
                context.beginPath()

                context.moveTo(x,y)

                context.lineTo(x1,y1)

                context.strokeStyle = `hsl(${radius*65}, 100%, 44%)`;

                context.stroke()
                
        }

        context.restore()

    }


    function rotate_about_the_center() {

        let angleOfRoation = Math.PI / 300;

        angle += angleOfRoation

        if (angle >= Math.PI) {
            clearFullScreen()
            createbbg()
            angle = 0;
            
        } else {

            context.translate(width/2, height/2)

        context.rotate(angleOfRoation)

        context.translate(-width/2, -height/2)

        }
 
    }

    function scale_from_center() {
        // context.save()
        context.translate(width/2, height/2)
        context.scale(1.001,1.001)
        context.translate(-width/2, -height/2)

        // context.restore()
    }

    function createbbg() {
         //creates black background
        context.save()
      context.beginPath()
      context.rect(0,0,width,height)
      context.fillStyle = 'black'
      context.fill()
      context.restore()
        
    }