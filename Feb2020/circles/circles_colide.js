//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 30;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas
      

   
    //ANIMATION CYCLE

    context.translate(width*2/3, height - 400)

    context.save()
    
    animate()
    function animate() {

        time+=.5

        context.rotate(Math.PI/2.001);
        if (time > 700) {

            time = 50;
            setTimeout(100, clear())
            context.restore();

        }

        let curClr = time;
            

        for (let i = -26; i < 26; i++) {


            if (i == 26) {
                
                
            }

            // context.translate(time/400,i*1.000000001);
            context.translate(.1,9)

            curClr-=i/3

            make_circle(time/100000, time/100000, curClr, time/2);
            
        }


        setTimeout(window.requestAnimationFrame, 10, (animate));
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