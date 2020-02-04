
//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      size = 48.1;                                  //determins size of each square

   //SETUP

   context.translate(width/2, height/2)

    //ANIMATION CYCLE
    
    animate()
    function animate() {
        clear()

        time++

        create(time) 

        

        setTimeout(window.requestAnimationFrame, 0, (animate));
    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 50%)'
        context.stroke()

        
    }

    function create(variable) {

        console.log(variable);

        
        context.save()

        for (let j = 0; j < time; j++) {

            context.translate(0,0);
            let curClr = j * 7,
            size = (j) + 0;

            for (let i = -23; i < 23; i++) {
                
                make_circle(i, i, curClr, size);
                
            }
        }

        context.restore()
    }

    function clear() { 
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }