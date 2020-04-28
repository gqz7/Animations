//*based on a physical tapestry, hence the naming

let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 0,

    timeInc = true;

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

     render()

      function render() {
        time = timeInc ? time+1 : time-1;

        if (time > 333) {
            timeInc = false;
        } else if (time < 0) {
            timeInc = true;
        }
        clearFullScreen()

        createTapestry(width/15)

        context.rotate(.001)

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function createTapestry(size) {


        context.save()
        context.rotate(time/72)
            yinyang(size/ (1 +(time/400)))
        context.restore()

        for (let i = 0; i < 4; i++) {
            context.save()
            // context.translate(0,size*2);
            // context.rotate(Math.PI/2)
            for (let j = 2; j < 27; j++) {
                context.translate((size/(j-1))*2 ,0);
                
                context.save()
                context.rotate(time/72 *(27-j)/10)
                    yinyang(size/(j))
                context.restore()
            }
            context.restore()

            context.rotate(Math.PI/2)
        }

        context.save()

        context.rotate(Math.PI/4)

        for (let i = 0; i < 4; i++) {
            context.save()
            context.translate(0,size*1.1);
            context.rotate(Math.PI/ 2)
            for (let j = 2; j < 17; j++) {
                context.translate(size/(17-(j-1))*2 ,0);
                
                context.save()
                context.rotate(time/72 *(17-j)/3)
                yinyang(size/(17-(j-1)))
                context.restore()
            }
            context.restore()

            context.rotate(Math.PI/2)
        }

        context.restore()


    }

    function yinyang(radius) {
        context.strokeStyle = `hsl(${time}, 100%, 70%)`;
 
        //create half white circle        
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius,0,Math.PI);
        context.fill()

        //create black half circle
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius,Math.PI,Math.PI*2);
        context.fill()
        //create white outline for white half
        context.strokeStyle = 'white'
        context.beginPath()
        context.arc(0,0,radius,0,Math.PI*2);
        context.stroke()

        //create white full circle with 1/2 radius
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(-radius/2,0,radius/2,0,Math.PI*2)
        context.fill()
        //create white full circle with 1/2 radius and inner circle for white 1/2 circle
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(-radius/2,0,radius/7,0,Math.PI*2)
        context.arc(radius/2,0,radius/2,0,Math.PI*2)
        context.fill()
        //create inner circle for black 1/2 circle
        context.fillStyle = 'white';
        context.beginPath()
        context.arc(radius/2,0,radius/7,0,Math.PI*2)
        context.fill()
  
    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

