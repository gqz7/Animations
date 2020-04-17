let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.strokeStyle = 'white';

     render()

      function render() {

        yinyang()

        context.rotate(.007)

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function yinyang() {

        context.beginPath()
        context.arc(0,0,300,0,Math.PI*2);
        context.stroke()

        context.fillStyle = 'white'; 
        
        context.beginPath()
        context.arc(-150,0,150,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'black';

        context.beginPath()
        context.arc(150,0,150,0,Math.PI*2)
        context.fill()
  
    }
