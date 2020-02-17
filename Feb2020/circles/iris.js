//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 2;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas

    //ANIMATION CYCLE


    context.translate(width/2, height/2)
    context.rotate(.5)
    
    animate()
    function animate() {

            time+=.15

            if (time > 200) {
                return
            }

                
                
                console.log('before');

                setTimeout( () => {

                    create_pattern()

                    animate()

                }, 20 )

                console.log('after');
                
                
                // make_circle(time, time, curClr, time);
                
    
            

            

            console.log(time);
    }

    // FUNCTIONS

    function make_circle(x, y, color, size){

        context.beginPath()
        context.arc(x, y,  size, 4.3, 2 * Math.PI)

        context.strokeStyle = 'hsl('+color+', 100%, 50%)'
        context.stroke()
        
    }

    function create_pattern() {

        context.rotate(time/10000)

        let curClr = (time * 5.7) + 250;

        for ( let i = -6; i <= 6; i+=.5) {

            context.save()

            context.rotate(i/2)

            let 
                translatex = (Math.cos(time) * time) + time * 13,
                translatey = (Math.sin(time) * time) + Math.pow(1.13, time);

            context.translate(translatex, translatey);

             make_circle(time, time, curClr, time);

             context.restore()
        }
        
    }


