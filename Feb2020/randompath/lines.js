//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 1;                                //determins durration of time(ms) between each frame

   
    //ANIMATION CYCLE

    let Objects = [];
    
    animate()
    function animate() {

        clear()

        create_objects()

        setTimeout( () => {
            
            if (time < 1000) {

                 // console.log(time);

                 animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function render_circle(x, y, hue, size, lightness){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        let saturation = 100;

        context.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        context.stroke()

        
    }


    function create_objects() {

        for (let i = 0; i < 200; i++) {

            let    
            
            hue = Math.random() * 360,

            lightness = 50,

            x = Math.random() * width,
            y = Math.random() * height,
            size = 100;
             
            render_circle(x, y, hue, size, lightness);
            
        }
        
    }

    function clear() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }