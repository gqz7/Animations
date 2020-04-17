let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 0;

    document.body.style.backgroundColor = 'deeppink';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

     render()

      function render() {
        time = time < 444 ? time + 1 : 444;

        // clearFullScreen()

        yinyang(time)

        let radian = (537 - time)/17000

        context.rotate(radian)

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function yinyang(radius) {

        let innerTriH = Math.sqrt(Math.pow(radius,2)-Math.pow(radius/2,2)),
            xTran = Math.sqrt(Math.pow(radius,2) - Math.pow(innerTriH/3, 2))

        let x1 = 0, y1 = -innerTriH/1.651,
            x2 = -xTran/2.1, y2 = (innerTriH)/3.2,
            x3 = xTran/2.1, y3 = ((innerTriH)/3.2),

            radiusBig = Math.sqrt(3)*.26*radius,
            radiusSml = radius/7;

        context.fillStyle = 'lightgrey';
        context.beginPath()
        context.arc(x1,y1,radiusBig,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'darkgrey'; 
        context.beginPath()
        context.arc(x1,y1,radiusSml,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(x2,y2,radiusBig,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'black';
        context.beginPath()
        context.arc(x2,y2,radiusSml,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'black';
        context.beginPath()
        context.arc(x3,y3,radiusBig,0,Math.PI*2)
        context.fill()

        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(x3,y3,radiusSml,0,Math.PI*2)
        context.fill()

     
  
    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }