document.addEventListener('keydown', changeBGColor, false);

function changeBGColor() {
    document.body.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
}


let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 30,
    rotateTime = 0,
    
    colors = ['hotpink', 'skyblue', 'yellow'];
    index = 0;

    context.lineWidth = 1.5;

    document.body.style.backgroundColor = 'limegreen';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

     render()

      function render() {
        time = time < 1000 ? time + .5 : 42;
        // clearFullScreen()

        createGrid()

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function yinyang(radius, radians, colorIn) {
        context.save()

        context.rotate(radians)

        //create half white circle        
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius,0,Math.PI);
        context.fill()
        //create black outline for white half
        context.strokeStyle = colors[colorIn];
        context.beginPath()
        context.arc(0,0,radius,0,Math.PI);
        context.stroke()

        //create black half circle
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius,Math.PI,Math.PI*2);
        context.fill()
        //create white outline for white half
        context.strokeStyle =  colors[colorIn];
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
        context.arc(-radius/2,0,radius/8,0,Math.PI*2)
        context.arc(radius/2,0,radius/2,0,Math.PI*2)
        context.fill()
        //create inner circle for black 1/2 circle
        context.fillStyle = 'white';
        context.beginPath()
        context.arc(radius/2,0,radius/8,0,Math.PI*2)
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

        for (let i = 0; i < 4; i++) {
            createQuad()
            context.rotate(Math.PI/2)
        }

        

    }

    function createQuad() {

        context.save()
        
        let radius = time;

        if (radius/10 % Math.PI*2 < .1) {

            index = index < 2 ? index + 1: 0; 
            
        }
            
        context.translate(radius,radius)

        for (let j = 0; j < height; j+=radius*2) {

            // let indexNum = j < 200 ? j : .1;

            rotateTime =  radius/10

            context.save()
            
            for (let i = 0; i < width; i+=radius*4) {

                yinyang(radius, rotateTime, index)
                context.translate(radius*2,0)
        
            }

            context.restore()

            context.translate(0,radius*2)
            
        }

        context.restore()
        

    }