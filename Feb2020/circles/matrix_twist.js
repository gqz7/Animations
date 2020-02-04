//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      size = 48.1;                                  //determins size of each square

   
    //ANIMATION CYCLE

    context.translate(width/2, height/2)
    
    animate()
    function animate() {

        

        time++

        context.rotate(Math.PI/1.0077);

        // if (time % 50 == 0) clear()
            


        for (let i = -time; i < time; i++) {


            context.translate(time/10, -i);

            let curClr = time * 4;
            
            make_circle(0, 0, curClr, time/7);
            
        }

        setTimeout(window.requestAnimationFrame, 0, (animate));
    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y, size* 2, 0, 2 * Math.PI)
        context.fillStyle = 'hsl('+color+', 100%, 80%)'
        context.fill()
       
        context.beginPath()
        context.rect(-time,-time,time,time);
        context.strokeStyle = 'hsl('+color+', 100%, 50%)'
        context.stroke()

        
    }

    function clear() { 
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }