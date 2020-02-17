//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 1;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas
     
   
      context.translate(0,30)
    //ANIMATION CYCLE
    
    animate()
    function animate() {

            time+=.3

            if (time > 200) {
                return
            }

                let curClr = time * 7;

                setTimeout( () => {

                    context.translate(time/3, (Math.sin(time) * 7) + time/7);

                    make_circle(time, time, curClr, time);

                    animate()

                }, 44 )

    }

    // FUNCTIONS

    async function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 64%)'
        context.stroke()
        
    }