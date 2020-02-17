//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 10000;                                //determins durration of time(ms) between each frame


      let Stars = []; //this array will store the values of the current stars on the screen

      create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE
    
    animate()
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        clear() //clears the screen

        

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
             
            Stars.push({
                x: x, y: y, hue: hue, radius: size
            });
            
        }
        
    }

    function clear() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    function renderStars() {

        for (let i = 0; i < Stars.length; i++) {
            
            make_circle(Star[i].x, Star[i].y, Star[i].hue, Star[i].radius);
            
        }

    }