//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas
   
    //ANIMATION CYCLE


    context.translate(width/2, height/2)
    context.rotate(Math.PI/1.08)
    
    animate()
    function animate() {

            time+=.2

            if (time > 200) {
                return
            }


                setTimeout( () => {

                    create_pattern()

                    animate()

                }, 44 )

    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        let startAngle = 0 + color/20;

        context.beginPath()
        context.arc(x, y,  size, startAngle, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 50%)'
        context.stroke()
        
    }

    function create_pattern() {

        // context.rotate(.03)

        let curClr = (time * 3) + 250;

        for ( let i = -2; i <= 2; i+=1) {

            context.save()

            context.rotate(Math.PI/i)

            let 
                translatex = time*time/2,
                translatey = (Math.sin(time) * 30) + time*6;

            context.translate(translatex, translatey);

             make_circle(time, time, curClr, time);

             context.restore()
        }
        
    }


