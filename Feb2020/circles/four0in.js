//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas


   
    //ANIMATION CYCLE

    context.translate(width/2, height/2)

    context.save()
    
    animate()
    function animate() {

        

        if (time > 800) {
            time = 0;
            clear()

        }

        let dividend = 4;
        //Math.floor(time / 100);

        time++

        context.rotate(Math.PI/2); 

        context.save()
        for (let i = -10; i < 10; i+=.25) {

            context.translate(time/-i*2,-i*7);

            let curClr = time * 13,
                    x = time/100,
                    y = time/100,
                size = time/2;
            
            make_circle(x, y, curClr, size);
            
        }
        context.restore()

        if (time % 200 == 0) {
            // clear()
        }

        setTimeout(window.requestAnimationFrame, 0, (animate));
    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 70%)'
        context.stroke()

        
    }

    function clear() { 
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }