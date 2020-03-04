//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 10;                                    //determins durration of time(ms) between each frame

let  speed = 4;                                   //sets the speed at which Objects travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where Objects will spawn (will change this later so the origin can be set with a var) 


      let Objects = []; //this array will store the values of the current Objects on the screen

      createObjects() //adds Objects to Objects array
   
    //ANIMATION CYCLE
    
    animate()
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        clear() //clears the screen

        renderObjects() //displays each star from its position in the Objects array 

        // context.rotate(speed/100)

        moveObjects(speed) //moves the position of each start slightly

        setTimeout( () => {

             console.log(speed);

            
            if (time < 400) {

                speed += .01
                
                 animate()
                
            } else if (time < 10000) {

                if (speed < 17) {

                    speed += .1
                    
                }

                animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function create_star_streak(x, y, hue, size, lightness) {

        context.save()


        let saturation = 30;

        context.beginPath();
        context.moveTo(x,height);
        context.rotate(Math.PI)
        context.lineTo(x/(time/7),y/time + time);

        context.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        context.stroke()


        context.restore()
        
    }


    function createObjects() {

        for (let i = 0; i < 400; i++) {

            let hue = Math.random() * 360,
                    x = (Math.random() * width) - width /2,
                    y = (Math.random() * height) - height /2,
                    size = 1,
                    lightness = -10;
             
            Objects.push({
                x: x, y: y, hue: hue, radius: size, lightness: lightness
            });
            
        }
        
    }

    function clear() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    function renderObjects() {

        for (let i = 0; i < Objects.length; i++) {
            
            create_star_streak(Objects[i].x, Objects[i].y, Objects[i].hue, Objects[i].radius, Objects[i].lightness);
            
        }

    }

    function moveObjects(speed) {

        for (let i = 0; i < Objects.length; i++) {

            let NewX = Objects[i].x * (1 + speed/1000),
                NewY = Objects[i].y * (1 + speed/1000);


                if (NewX > width/1.5 || NewX < -width/1.5 || NewY > width/1.5 || NewY < -width/1.5) {

                    Objects.splice(i, 1); //if it goes off screen, delete it from the Objects to be rendered

                    addStar() // then add a new one to replace it

                    i--

                } else {

                    Objects[i].x = NewX;
                    Objects[i].y = NewY;

                    Objects[i].lightness += .88
                    
                    Objects[i].radius += 7/1000

                }
           
        }
        
    }


    function addStar() { //when one star dies another is born

        let hue = Math.random() * 360,
        x = (Math.random() * width/4) - width /8,
        y = (Math.random() * height/2) - height /4,
        size = 1,
        lightness = 0;
 
        Objects.push({
            x: x, y: y, hue: hue, radius: size, lightness: lightness
        });
        
    }