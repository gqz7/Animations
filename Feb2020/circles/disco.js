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

        context.rotate(Math.PI/2);

        if (time % 50 == 0) clear()


        for (let i = -10; i < 10; i++) {

            context.translate(time/10,i*4);

            let curClr = time *10;
            
            make_circle(time/10, time/100, curClr, time);
            
        }

        setTimeout(window.requestAnimationFrame, 6, (animate));
    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 60%, 50%)'
        context.stroke()

        
    }

    function clear() { 
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }