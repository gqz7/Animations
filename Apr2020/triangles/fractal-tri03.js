//event listener to add interactivity and alter look of animation
document.addEventListener('keydown', () => {

    context.rotate(Math.PI/6)

}, false);

//set canvas vars and declare animaiton cycle vars
let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = width,

      time = 0,

      endSize = height/3;

    //SET CONTEXT SETTINGS BEFORE ANIMATION CYCLE STARTS
      context.fillStyle = 'black';
      context.translate(width/2, height/2)
      context.rotate(Math.PI/6)

        render()

      function render() {

        time++

        endSize = endSize > 33 ? endSize - .3: 33;

        frames*=1.007; 

        if (frames > width*2) {
            frames = width*1.007
        }
        createHexagon(frames/2)
 
        setTimeout(window.requestAnimationFrame, 3, render)

      }


    function createTri(size) {
        
      context.strokeStyle = `hsl(${time*10}, 100%, 90%)`;

        context.beginPath()

        context.moveTo(0,0)
        context.rotate(-Math.PI/ 3)
        context.lineTo(size,0)
        context.rotate(Math.PI/3)
        context.lineTo(size,0)
        context.lineTo(0, 0)

        context.stroke()
        context.fill()

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function createHexagon(size) {

        for (let i = 0; i < 6; i++) {
           sirpinskiZoom(size)
           context.rotate(Math.PI/3)
        }
        
    }


    function sirpinskiZoom(startSize) {
                
        if (startSize > endSize) {
            
            if (startSize/2 <= endSize) {
                
                createTri(startSize)

            } else {
                context.save()                
                sirpinskiZoom(startSize/2)
                context.translate(startSize/2,0)
                sirpinskiZoom(startSize/2)
                context.translate(-startSize/4, -Math.sqrt(3) * startSize * .25)
                sirpinskiZoom(startSize/2)
                context.restore();
            }
            
        }
    }