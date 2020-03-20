
//trying to figure out myself how to create random points that exclude a circle in the center of the screen with a given radius

let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frameNum = 0; //how many times the animation refreshed

      render()
      function render() {

          frameNum++

          clearFullScreen()
          
          create_pacman()

          setTimeout(window.requestAnimationFrame, 30, render)
      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

function create_pacman() {

    context.save()

    context.translate(width/2, height/2)


    context.beginPath();
    context.fillStyle='yellow';
    context.moveTo(0,0); //We have to add this, otherwise, it will fill the minimum area needed to fill the arc

    context.arc(0,0,300, Math.cos(frameNum/3) * 2, Math.PI*2,false); 
    // context.closePath();
    context.fill();

    // context.

    context.restore()

}

