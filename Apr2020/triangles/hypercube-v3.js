
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 100,

      time = 0,

      light = 0;


    document.addEventListener('keydown', anotherFrame, false);

        function anotherFrame() {
            
            frames*=1.1

             createFractal(frames) 
           
        } 

        createFractal(frames) 

    function createTri(size, oX, oY) {

        let centerX = oX+size/2,
            centerY = oY-(.25  * Math.sqrt(3) * size);

        context.beginPath()
        // console.log(size);
        
        context.arc(0,0, size, 0, Math.PI*2)
        context.stroke()

        context.beginPath()

        context.save()

        context.translate(oX, oY)

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.stroke()

        // context.fill()

        context.restore()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createFractal(size) {

        if (100-time/3 > 0) {
            light = 100-time/3
        } else {
        
            light = light < 80 ? (time/10) - 30 : 80;
        }

        console.log(light, width );

        let saturation = 100-time/3 > 0 ? 0  : -100 + time/3;

        context.strokeStyle = `hsl(${time*2}, ${saturation}%, ${light}%)`;

        context.lineWidth = 1;

        context.save();

        // console.log(size);
        context.translate(width/2, height/2);
        context.rotate(Math.PI/6)

        for (let i = 0; i < 6; i++) {

            let count = 0;

       
            let triSize = width;

            context.save()

            while ( triSize > 200) {


                createTri(triSize,0,0);

                triSize/=2

                context.rotate(Math.PI)

                context.translate(-triSize/(frames/130), 0)



                
            }

            context.restore()
            
            context.rotate(Math.PI/3)
            
        }


        
        context.restore();
    }

