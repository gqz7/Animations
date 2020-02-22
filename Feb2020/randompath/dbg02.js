
//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 1;                                //determins durration of time(ms) between each frame

      context.translate(width/2, height/2)
   
    //ANIMATION CYCLE

    let Objects = [];

    create_objects(100)
    animate()

    function animate() {

        time++

        // clear()

        context.rotate(.001)

        render_objects()
        

        // console.log(Objects.length);
        

        change_properties()

        setTimeout( () => {
            
            if (time < 3000) {

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

    function render_square(x, y, hue, size, lightness){

        context.beginPath()
        context.rect(x, y, size, size)

        let saturation = 100;

        context.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        context.fill()
        
    }

    function render_triangle(x, y, hue, size, lightness){

    
        context.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;

        context.translate(x,y)

        context.beginPath()
        context.moveTo(0,0)


            context.rotate(Math.PI/3)
            
            context.lineTo(size,size);

            context.rotate(Math.PI/3)
            
            context.lineTo(size,size);

        context.fill()
 
    }



    function create_objects(num_of_objs) {

        for (let i = 0; i < num_of_objs; i++) {

            hue = Math.random() * 360,

            lightness = 0,

            x = Math.random() * width/32 + 30,
            y = Math.random() * width/32 + 130,
            size = (Math.random() * 30),

            
            ranAngle = Math.round((Math.random() * (Math.PI * 2)) * 10) / 10,
            
            shapes = ['circle', 'square', 'triangle']
            shape = shapes[Math.floor(Math.random()*shapes.length)];
   
            Objects.unshift({x: x, y: y, hue: hue, size: size, lightness: lightness, growing: true, fading: false, angle: ranAngle, shape: shape})
            
        }
        
    }

    function render_objects() {
        for (let i = 0; i < Objects.length; i++) {

            
            let angle = Objects[i].angle;

            context.save()

            context.translate(0,0)

            context.rotate(angle)

            Objects[i].x += (Objects[i].x / 100)
               
            Objects[i].y += (Objects[i].y / 100)


            if (Objects[i].x > width/2 || Objects[i].x < -width/2 || Objects[i].y > width/2 || Objects[i].y <  -width/2)  {
                Objects.splice(i, 1)
                i--

                create_objects(1)
            } else if (Objects[i].shape === 'triangle') {

                render_triangle(Objects[i].x, Objects[i].y, Objects[i].hue, Objects[i].size, Objects[i].lightness);
            
            } else if (Objects[i].shape === 'square') {
                
                render_square(Objects[i].x, Objects[i].y, Objects[i].hue, Objects[i].size, Objects[i].lightness);
            
            } else if (Objects[i].shape === 'circle') {
                
                render_circle(Objects[i].x, Objects[i].y, Objects[i].hue, Objects[i].size, Objects[i].lightness);
            
            }

            

            context.restore()

            
        }
    }

    function change_properties() {

        for (let i = 0; i < Objects.length; i++) {
    
               if (Objects[i].growing && Objects[i].size < 500) {

                   Objects[i].size += Math.random()
                   
               } else if (Objects[i].growing === true) {

                   Objects[i].growing = false 

               } else if (!Objects[i].growing && Objects[i].size > 1) {
                   Objects[i].size -= Math.random() 
               } else {
                   Objects[i].growing = true
               }

               if (!Objects[i].fading && Objects[i].lightness < 70) {

                    Objects[i].lightness+=.2
                   
               } else if (!Objects[i].fading) {

                    Objects[i].fading = true;

               } else if (Objects[i].fading && Objects[i].lightness > 1) {

                    Objects[i].lightness-=.1
                   
               } else {
                    Objects[i].fading = false
               }
            
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