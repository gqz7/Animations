//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 10000;                                //determins durration of time(ms) between each frame

   
    //ANIMATION CYCLE
    
    animate()
    function animate() {

        clear()

        create_star_field()

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

    function make_circle(x, y, hue, size){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        let saturation = 100,
            lightnes = 77;

        context.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightnes}%)`;
        context.stroke()

        
    }


    function create_star_field() {

        for (let i = 0; i < 700; i++) {

            let hue = Math.random() * 360,
                    x = Math.random() * width,
                    y = Math.random() * height,
                    size = 2;
             
            make_circle(x, y, hue, size);
            
        }
        
    }

    function clear() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }