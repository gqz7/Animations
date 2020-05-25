let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 0;

    document.body.style.backgroundColor = `hsl(0,0%,17%)`;

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

     render()

      function render() {
        time = time < Math.PI*2 ? time + .01 : 0;

        clearFullScreen()

        metaYY(200)
        
        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function metaYY(size) {

        
        context.save()

            context.rotate(-time)

            context.fillStyle = 'white'
            context.beginPath()
            context.arc(0,0,size*2,0,Math.PI);
            context.fill()

            context.fillStyle = 'black'
            context.beginPath()
            context.arc(0,0,size*2,Math.PI,Math.PI*2);
            context.fill()


            context.translate(-size,0)

            context.save()
            context.rotate(time*2)
            yinyang(size)
            context.restore();

            context.translate(size*2,0)

            context.save()
            context.rotate(time*2)
            yinyang(size)
            context.restore();

        context.restore();

    }

    function yinyang(radius) {

        //create half white circle        
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius,0,Math.PI);
        context.fill()
        //create black outline for white half
        // context.strokeStyle = 'black'
        // context.beginPath()
        // context.arc(0,0,radius,0,Math.PI);
        // context.stroke()

        //create black half circle
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius,Math.PI,Math.PI*2);
        context.fill()
        //create white outline for white half
        // context.strokeStyle = 'white'
        // context.beginPath()
        // context.arc(0,0,radius,Math.PI,Math.PI*2);
        // context.stroke()

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