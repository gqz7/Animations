//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      size = 48.1;                                  //determins size of each square

   
    //ANIMATION CYCLE
    
    animate()
    function animate() {

        time++

        

        for (let i = 0; i < 10; i++) {

            context.translate(time/3,i/2);
            
            make_circle(time, time, time*4, time);
            
        }

        setTimeout(window.requestAnimationFrame, 0, (animate));
    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 50%)'
        context.stroke()

        
    }