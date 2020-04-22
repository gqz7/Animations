let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 0;

    const coOrds = [(Math.PI*2-Math.PI/4), ( Math.PI/4), (Math.PI - Math.PI/4), (Math.PI + Math.PI/4) ]; 

    document.body.style.backgroundColor = 'hotpink';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2);


     render()

      function render() {
        time = time < 444 ? time + 1 : 444;

        clearFullScreen()

        yinyang(time)

        let radian = (537 - time)/17000

        context.rotate(-radian)

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function yinyang(radius) {

        context.save()

        context.strokeStyle = 'white';
        context.beginPath()
        context.arc(0,0,radius*3/5,coOrds[0],coOrds[1])
        context.stroke()

        context.strokeStyle = 'lightgrey';
        context.beginPath()
        context.arc(0,0,radius*3/5,coOrds[1],coOrds[2])
        context.stroke()

        context.strokeStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius*3/5,coOrds[2],coOrds[3])
        context.stroke()

        context.strokeStyle = 'darkgrey';
        context.beginPath()
        context.arc(0,0,radius*3/5,coOrds[3],coOrds[0])
        context.stroke()

        context.fillStyle = 'white';
        context.beginPath()
        context.arc( 0, 0, radius*3/5, coOrds[0], coOrds[1] )
        context.arc( radius/7, 0, radius/9, coOrds[0], coOrds[1] )
        context.fill()

        context.fillStyle = 'lightgrey';
        context.beginPath()
        context.arc( 0, 0, radius*3/5, coOrds[1], coOrds[2] )
        context.arc( 0, radius/7, radius/9, coOrds[1], coOrds[2] )
        context.fill()

        context.fillStyle = 'black';
        context.beginPath()
        context.arc( 0, 0, radius*3/5, coOrds[2], coOrds[3] )
        context.arc( -radius/7, 0, radius/9, coOrds[2], coOrds[3] )
        context.fill()

        context.fillStyle = 'darkgrey';
        context.beginPath()
        context.arc( 0, 0, radius*3/5, coOrds[3], coOrds[0] )
        context.arc( 0, -radius/7, radius/9, coOrds[3], coOrds[0] )
        context.fill()

        // //first circle origin in the middle of all three circles
        context.translate(radius/4, -radius/4);

        // circle 1
        context.fillStyle = 'white';
        context.beginPath()
        context.arc(0,0,radius/4,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'black'; 
        context.beginPath()
        context.arc(0,0,radius/10,0,Math.PI*2)
        context.fill()

        //translate to next circle origin
        // context.rotate(Math.PI/3)
        context.translate(0, radius/2);

        //circle 2
        context.fillStyle = 'lightgrey'; 
        context.beginPath()
        context.arc(0,0,radius/4,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'darkgrey';
        context.beginPath()
        context.arc(0,0,radius/10,0,Math.PI*2)
        context.fill()

        context.rotate(Math.PI/2)
        context.translate(0, radius/4*2);

        //circle 3
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius/4,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius/10,0,Math.PI*2)
        context.fill()

        context.rotate(Math.PI/2)
        context.translate(0, radius/4*2);

         //circle 4
        context.fillStyle = 'darkgrey';
        context.beginPath()
        context.arc(0,0,radius/4,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'lightgrey'; 
        context.beginPath()
        context.arc(0,0,radius/10,0,Math.PI*2)
        context.fill()

        context.restore()
    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }