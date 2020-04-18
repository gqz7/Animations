document.addEventListener('keydown', changeBGColor, false);

function changeBGColor() {
    document.body.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
}


let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 37,
    rotateTime = 0;

    document.body.style.backgroundColor = 'aqua';

    document.body.appendChild(canvas);

    // context.translate(width/2, height/2)

     render()

      function render() {
        time = time < height/12.3 ? time + .1 : 44;
        rotateTime+=Math.PI/111
        clearFullScreen()

        createGrid()

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function yinyang(radius, radians) {
        context.save()

        context.rotate(radians)
 
        //create half white circle        
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius,0,Math.PI);
        context.fill()
        //create black outline for white half
        context.strokeStyle = 'black'
        context.beginPath()
        context.arc(0,0,radius,0,Math.PI);
        context.stroke()

        //create black half circle
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius,Math.PI,Math.PI*2);
        context.fill()
        //create white outline for white half
        context.strokeStyle = 'white'
        context.beginPath()
        context.arc(0,0,radius,Math.PI,Math.PI*2);
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

        context.restore();

  
    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    function createGrid()  {
        
        context.save()
        
        let radius = time;
            
        context.translate(radius,radius)

        for (let j = 0; j < height; j+=radius*2) {

            // let indexNum = j < 200 ? j : .1;

            rotateTime = .0001 + (j/7);

            context.save()
            
            for (let i = 0; i < width; i+=radius*2) {

                // context.rotate(radians)
           
                yinyang(radius, rotateTime)
                context.translate(radius*2,0)
        
            }

            context.restore()

            context.translate(0,radius*2)
            
        }

        context.restore()
        

    }