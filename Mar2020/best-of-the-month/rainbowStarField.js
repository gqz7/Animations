//event listeners for user input

let clearScreenBool = false;

document.addEventListener('keydown', userInputEvent, false);

function userInputEvent(input) {

    switch (input.code) {
        case "Space":

            clearScreenBool = clearScreenBool ? false : true;

            console.log(clearScreenBool);
            
            break;
    
        default:
            break;
    }
    
}

//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,        //width of the canvas
      height = canvas.height = window.innerHeight,    //height of the canvas
      delay = 15;                                    //determins durration of time(ms) between each frame

  let speed = 52;                                  //sets the speed at which stars travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where stars will spawn (will change this later so the origin can be set with a var) 
    
      context.rotate(Math.PI/2)

      let Stars = []; //this array will store the values of the current stars on the screen

    //   create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE
    
    animate() 
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        if (clearScreenBool) {
             clear()
        }
        
        renderStars() //displays each star from its position in the Stars array 

        moveStars(speed) //moves the position of each start slightly

        setTimeout( () => {

            if (time < 100) {

                addStar()
                addStar()
                addStar()
                addStar()
                addStar()
                addStar()
                addStar()
                addStar()
                addStar()


                speed += .001
                
                animate()
                
            } else if (time < 10000) {

                speed = speed <= 80 ? speed + .1 : 80;

                animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function create_star_streak(x, y, lightness, index) {

        // context.save()

        // x = x< 0 ? (x  - width/(time/2) - time/100) : (x  + width/(time/2) + time/100);
            

        let 
        x1 = x,
        y1 = y,
        x2 = x*(1 + lightness/177),
        y2 = y*(1 + lightness/177);
        
        // let
        // grad = context.createLinearGradient(x1, y1, x2, y2);

        // //set up gradient
        // grad.addColorStop(1, `hsl(0, 100%, ${lightness}%)`);
        // grad.addColorStop(6/7, `hsl(45, 100%, ${lightness}%)`);
        // grad.addColorStop(5/7, `hsl(90, 100%, ${lightness}%)`);
        // grad.addColorStop(4/7, `hsl(135, 100%, ${lightness}%)`);
        // grad.addColorStop(3/7, `hsl(180, 100%, ${lightness}%)`);
        // grad.addColorStop(2/7, `hsl(245, 100%, ${lightness}%)`);
        // grad.addColorStop(1/7, `hsl(305, 100%, ${lightness}%)`);
        
        // context.strokeStyle = grad;

        context.strokeStyle = `hsl(${(index)}, 100%, ${100 - lightness * 2}%)`
        
        //gradient line stroke 
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);

        context.lineWidth = (lightness/100) + 1;
       
        context.stroke();

        // context.restore()

    }


    function create_star_field() {

        for (let i = 0; i < 300; i++) {

            let  
                x =  (width * Math.random()) - width/2,
                y =  (height * Math.random()) - height/2,

                lightness = 10;
             
            Stars.push({
                x: x, y: y, lightness: lightness
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
            
            create_star_streak(Stars[i].x, Stars[i].y, Stars[i].lightness, i);
            
        }

    }

    function moveStars(speed) {

        for (let i = 0; i < Stars.length; i++) {

            let NewX = Stars[i].x * (.8199 + speed/5000 + Stars[i].lightness/100),
                NewY = Stars[i].y * (.8199 + speed/5000 + Stars[i].lightness/100);


            if (NewX > width*5 || NewX < -width*5 || NewY > width/.5 || NewY < -width/.5) {

                Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered

                addStar() // then add a new one to replace it

                i--

            } else {

                Stars[i].x = NewX;
                Stars[i].y = NewY;

                Stars[i].lightness = Stars[i].lightness <= 70 ? Stars[i].lightness * 1.02 : 70;

            }
           
        }
        
    }

    function addStar() { //when one star dies another is born

        let  
        ranAngle = Math.random() * 100   
        radius = 20;
        randomX1 = (Math.cos(ranAngle) * radius),
        randomY1 = (Math.sin(ranAngle) * radius),
        randomX2 = (Math.cos(ranAngle) * radius * 4),
        randomY2 = (Math.sin(ranAngle) * radius * 4),

        ranNum = (Math.random() * 17) + 1,

        x =  (randomX2 * ranNum) + (randomX1 * ranNum) * Math.random(),
        y =  (randomY2 * ranNum) + (randomY1 * ranNum) * Math.random(),

        lightness = 10;

        // console.log(radius);
        

        Stars.push({
            x: x, y: y, lightness: lightness
        });
        
    }