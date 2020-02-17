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

            time+=.3

            if (time > 200) {
                return
            }

                let curClr = time * 7;
                
                console.log('before');

                setTimeout( () => {

                    context.translate(time/3, (Math.sin(time) * 10) + time/7);

                    make_circle(time, time, curClr, time);

                    animate()

                }, 30 )

                console.log('after');
                
                
                // make_circle(time, time, curClr, time);
                
    
            

            

            console.log(time);
    }

    // FUNCTIONS

    async function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 50%)'
        context.stroke()
        
    }