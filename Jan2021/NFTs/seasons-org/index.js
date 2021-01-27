//event listeners for user input

let paused = false;

document.addEventListener('keydown', userInputEvent, false);

function userInputEvent(input) {

    switch (input.code) {
        case "Space":

            paused = paused ? false : true;

            if (!paused) {
              animate()
            }

            console.log(paused);
            
            break;
    
        default:
            break;
    }
    
}



//INITIAL VARIABLE DECLERATIONS
let canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    time = 0;

canvas.style = 

document.body.appendChild(canvas)
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 30;                                    //determins durration of time(ms) between each frame

  let speed = 67;                                   //sets the speed at which stars travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where stars will spawn (will change this later so the origin can be set with a var) 


      let Stars = []; //this array will store the values of the current stars on the screen

      create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE

    let imageAoR = 0, //angle of rotation for image

    endTime = 942; //how many cycles before it all ends
    

    window.onload = () => {
      while (time < 200 ) {
        animate(true) 

      }
      animate()
    }

    function animate(initalizing) {

        time++ //a counter that counts the elapsed number of frames

        if (!paused) {

              imageAoR += Math.PI / 360 ;

              renderStars()

              renderYY( 93, imageAoR + 1.2)

          // create_border() //creates a checkerboard border

          moveStars(speed) //moves the position of each start slightly

          if (!initalizing) {
            setTimeout( () => {
  
                //  console.log(speed);
                
                if (time < endTime) {
  
                    animate()
                    
                } else {
  
                    return
                  
                }
  
            }, delay);
          }
        }
        
       
    }

    // FUNCTIONS

    function create_star_streak(x, y, hue, lightness) {

        // context.save()

        let 
        x1 = x,
        y1 = y,
        x2 = x*(1.15),
        y2 = y*(1.15);
        
        context.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        context.lineWidth = 1.5;
        
        //gradient line stroke 
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
       
        context.stroke();

        // context.restore()

    }


    function create_star_field() {

        for (let i = 0; i < 1000; i++) {

            let     
                x = (Math.random() * width) - width /2,
                y = (Math.random() * height) - height /2,
                hue = Math.random() * 360,
                lightness = 7;
             
            Stars.push({
                x: x, y: y, hue: hue, lightness: lightness
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
            
            create_star_streak(Stars[i].x, Stars[i].y, Stars[i].hue, Stars[i].lightness);
            
        }

    }

    function renderYY(size,angle) {

        context.save()

        context.rotate(angle)

        yinyang(size > 0 ? size : 0)

        context.restore()
    }

    function moveStars(speed) {

        for (let i = 0; i < Stars.length; i++) {

            let NewX = Stars[i].x * (1 + .08),
                NewY = Stars[i].y * (1 + .08);


                if (NewX > width/1.5 || NewX < -width/1.5 || NewY > width/1.5 || NewY < -width/1.5) {

                    Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered

                    addStar() // then add a new one to replace it

                    i--

                } else {

                    Stars[i].x = NewX;
                    Stars[i].y = NewY;

                    Stars[i].lightness -= (time/470 ) + 1.1
                    
                    Stars[i].hue += 10
                }
           
        }
        
    }


    function addStar() { //when one star dies another is born

        
        let  
        ranNum = Math.random() * 100   
        radius = (time/150) + 5;
        randomX1 = (Math.cos(ranNum) * radius),
        randomY1 = (Math.sin(ranNum) * radius),

        ranNum = Math.random() * 10,

        x =  (randomX1 * ranNum),
        y =  (randomY1 * ranNum);
        hue = (Math.random() * 130) + 80,
        lightness = 100;

        Stars.push({
            x: x, y: y, hue: hue, lightness: lightness
        });
        
    }

    function yinyang(radius) {
      context.strokeStyle = `hsl(${time}, 100%, 70%)`;

      //create half white circle        
      context.fillStyle = 'white'; 
      context.beginPath()
      context.arc(0,0,radius,0,Math.PI);
      context.fill()
      //create black outline for white half
      context.strokeStyle = 'black'
      context.beginPath()
      context.arc(0,0,radius,0,Math.PI);
      context.stroke()

      //create black half circle
      context.fillStyle = 'black';
      context.beginPath()
      context.arc(0,0,radius,Math.PI,Math.PI*2);
      context.fill()
      //create white outline for white half
      context.strokeStyle = 'white'
      context.beginPath()
      context.arc(0,0,radius,Math.PI,Math.PI*2);
      context.stroke()

      //create white full circle with 1/2 radius
      context.fillStyle = 'white'; 
      context.beginPath()
      context.arc(-radius/2,0,radius/2,0,Math.PI*2)
      context.fill()
      //create white full circle with 1/2 radius and inner circle for white 1/2 circle
      context.fillStyle = 'black';
      context.beginPath()
      context.arc(-radius/2,0,radius/7,0,Math.PI*2)
      context.arc(radius/2,0,radius/2,0,Math.PI*2)
      context.fill()
      //create inner circle for black 1/2 circle
      context.fillStyle = 'white';
      context.beginPath()
      context.arc(radius/2,0,radius/7,0,Math.PI*2)
      context.fill()

  }
