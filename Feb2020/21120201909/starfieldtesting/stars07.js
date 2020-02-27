//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 7;                                    //determins durration of time(ms) between each frame

let  speed = 4;                                   //sets the speed at which stars travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where stars will spawn (will change this later so the origin can be set with a var) 


      let Stars = []; //this array will store the values of the current stars on the screen

      create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE
    
    animate()
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        if (time > 1222 || time < 122) {
            clear() //clears the screen
        }
        

        renderStars() //displays each star from its position in the Stars array 
        lightspeed()
        modifyStars(speed) //moves the position of each start slightly

        setTimeout( () => {

             console.log(time, speed);

             if (time < 10000) {
             
                animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function make_circle(x, y, hue, size, lightness){

        context.beginPath()
        context.arc(x, y,  size, 0, 2 * Math.PI)

        let saturation = 30;

        context.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        context.fill()

        
    }


    function create_star_field() {

        for (let i = 0; i < 200; i++) {

            let hue = Math.random() * 360,
                    x = (Math.random() * width) - width /2,
                    y = (Math.random() * height) - height /2,
                    size = 1,
                    lightness = -10;
             
            Stars.push({
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


    function renderStars() {

        for (let i = 0; i < Stars.length; i++) {
            
            make_circle(Stars[i].x, Stars[i].y, Stars[i].hue, Stars[i].radius, Stars[i].lightness);
            
        }

    }

    function modifyStars(speed) {

        for (let i = 0; i < Stars.length; i++) {

            let NewX = Stars[i].x * (1 + speed/1000),
                NewY = Stars[i].y * (1 + speed/1000);


                if (NewX > width/1.5 || NewX < -width/1.5 || NewY > width/1.5 || NewY < -width/1.5) {

                    Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered

                    addStar() // then add a new one to replace it

                    i--

                } else {

                    Stars[i].x = NewX;
                    Stars[i].y = NewY;

                    Stars[i].lightness += .48
                    
                    Stars[i].radius += 7/1000

                }
           
        }
        
    }


    function addStar() { //when one star dies another is born

        let hue = Math.random() * 360,
        x = (Math.random() * width/4) - width /8,
        y = (Math.random() * height/2) - height /4,
        size = 1,
        lightness = 0;
 
        Stars.push({
            x: x, y: y, hue: hue, radius: size, lightness: lightness
        });
        
    }


    function lightspeed() {

        if (time > 200 && time < 603) {
            
            context.scale(.999,.999)

            context.rotate(-.03)
            speed -=.093
        
        } else if (time == 200) {

            clear()

            Stars.forEach(star => {
                star.radius = .1
            });
            
        } else if (time === 603) {
            
            clear()
            speed = 2;

            Stars.forEach(star => {
                star.radius = 2
            });
            
        } else if (time > 603 && time < 977) {

            context.rotate(.01)
            speed+=.4

           

        } else if (time == 977) {

            speed = 3
            
        } else if (speed < 12) {

            speed +=.03

        }

        

    }