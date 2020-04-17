let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 0;

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

     render()

      function render() {
        time = time < 200 ? time + 1 : 200;

        // clearFullScreen()

        yinyang(time)

        let radian = (213 - time)/1000

        context.rotate(radian)

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function yinyang(radius) {
        context.strokeStyle = `hsl(${time}, 100%, 70%)`;

        context.beginPath()
        context.arc(0,0,radius,0,Math.PI*2);
        context.stroke()

        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(-radius/2,0,radius/2,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'black';
        context.beginPath()
        context.arc(-radius/2,0,radius/7,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'black';
        context.beginPath()
        context.arc(radius/2,0,radius/2,0,Math.PI*2)
        context.fill()

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