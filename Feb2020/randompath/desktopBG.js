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

    create_objects()
    animate()

    function animate() {

        time++

        clear()

        render_objects()

        create_frame()

        change_properties()

        setTimeout( () => {
            
            if (time < 1000) {

                 animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function render_circle(x, y, hue, size, lightness){

        context.beginPath()
        context.arc(x, y, size, 0, 2 * Math.PI)

        let saturation = 100;

        context.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        context.fill()
        
    }


    function create_objects() {

        for (let i = 0; i < 333; i++) {

            let    
            
            hue = Math.random() * 360,

            lightness = 70,

            x = Math.random() * width/2 + width/4,
            y = Math.random() * height/2 + height/4,
            size = Math.random() * 100,

            growthRandomizer = Math.random() > .5 ?  false : true,

            ranAngle = Math.random() * (Math.PI * 2);

            console.log(ranAngle);
            

            Objects.push({x: x, y: y, hue: hue, size: size, lightness: lightness, growing: growthRandomizer, angle: ranAngle})
            
        }
        
    }

    function render_objects() {
        for (let i = 0; i < Objects.length; i++) {

         
            render_circle(Objects[i].x, Objects[i].y, Objects[i].hue, Objects[i].size, Objects[i].lightness);

           

            
        }
    }

    function change_properties() {

        for (let i = 0; i < Objects.length; i++) {
    
               if (Objects[i].growing && Objects[i].size < 100) {

                   Objects[i].size += Math.random() / 10
                   
               } else if (Objects[i].growing === true) {

                   Objects[i].growing = false 

               } else if (!Objects[i].growing && Objects[i].size > 1) {
                   Objects[i].size -= Math.random() / 10
               } else {
                   Objects[i].growing = true
               }
               let angle = Objects[i].angle;

               context.save()
   
               context.rotate(Objects[i].angle)

               Objects[i].x += .1

               Objects[i].y += .1

               context.restore()
            
        }

    }


    function create_frame() {

      context.fillStyle = `hsl( ${time/3}, 100%, 30%)`;
        
      context.fillRect(0,0,width,height/8)

      context.fillRect(0,0,width/8 ,height)

      context.fillRect(width*7/8 ,0,width,height)

      context.fillRect(width/8 , height*7/8,width,height)
    }
    

    function clear() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }