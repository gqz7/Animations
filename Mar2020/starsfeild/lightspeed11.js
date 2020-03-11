//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 30,                                    //determins durration of time(ms) between each frame

      lightSpeedStart = 260 + 200,

      lightSpeedEnd = 573 + 200;

  let speed = 80;                                   //sets the speed at which stars travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where stars will spawn (will change this later so the origin can be set with a var) 


      let Stars = []; //this array will store the values of the current stars on the screen

      create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE
    
    animate() 
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        if (time >= lightSpeedStart && time <= lightSpeedEnd ) {
            context.rotate(.01)
        } else {
            clear() //clears the screen
            
        }

        // clear()
        

        renderStars() //displays each star from its position in the Stars array 

        // context.rotate(speed/10000)

        moveStars(speed) //moves the position of each start slightly

        setTimeout( () => {

            //  console.log(speed);

            
            if (time < 400) {

                speed += .001
                
                 animate()
                
            } else if (time < 10000) {

                if (speed < 80) {

                    speed += .1
                    
                }

                animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function create_star_streak(x, y, lightness, index) {

        // context.save()

        if (x < 0 ) {

            x = (x - width/2)/7
            
        } else if (x > 0) {

            x = (x + width/2)/7 

        }

        if (y < 0 ) {

            y = (y) / 4
            
        } else if (y > 0) {

            y = (y) / 4

        }

        let 
        x1 = x,
        y1 = y,
        x2 = x*(1 + lightness/750),
        y2 = y*(1 + lightness/750);

        if (time < 150 ) {
            x2 *= time/100
            y2 *= time/100
            x1 += time/100*x1
            y1 += time/100*y1

        } else if (time < 250) {

            x2 *= time/100
            y2 *= time/100
            x1 += time/100*x1
            y1 += time/100*y1

            lightness -= time-150

        } else if (time < 350) {

            lightness -= 350 - time

        }
        
        let
        grad = context.createLinearGradient(x1, y1, x2, y2);

        //set up gradient
        grad.addColorStop(1, `hsl(0, 100%, ${lightness +5}%)`);
        grad.addColorStop(6/7, `hsl(45, 100%, ${lightness+2}%)`);
        grad.addColorStop(5/7, `hsl(90, 100%, ${lightness+1}%)`);
        grad.addColorStop(4/7, `hsl(135, 100%, ${lightness}%)`);
        grad.addColorStop(3/7, `hsl(180, 100%, ${lightness-1}%)`);
        grad.addColorStop(2/7, `hsl(245, 100%, ${lightness-2}%)`);
        grad.addColorStop(1/7, `hsl(305, 100%, ${lightness -5}%)`);
        
        context.strokeStyle = grad;

        if (time >= lightSpeedStart &&  time <= lightSpeedEnd) {

            lightness /= 2

            if (index % 2 == 0 ) {

                context.strokeStyle = `hsl(${(time)}, 100%, ${lightness}%)`

            }
               
        }
        
        //gradient line stroke 
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);

        context.lineWidth = (lightness/100) + 1;
       
        context.stroke();

        // context.restore()

    }


    function create_star_field() {

        for (let i = 0; i < 1000; i++) {

            let  
                ranNum = Math.random() * 100
                radius = Math.random() * 7;
                randomX1 = (Math.cos(ranNum) * radius),
                randomY1 = (Math.sin(ranNum) * radius),

                x =  (randomX1 * ranNum),
                y =  (randomY1 * ranNum),

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

            let NewX = Stars[i].x * (1 + speed/1000),
                NewY = Stars[i].y * (1 + speed/1000);


            if (NewX > width*5 || NewX < -width*5 || NewY > width/.5 || NewY < -width/.5) {

                Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered

                addStar() // then add a new one to replace it

                i--

            } else {

                Stars[i].x = NewX;
                Stars[i].y = NewY;

                Stars[i].lightness += 1

            }
           
        }
        
    }

    function addStar() { //when one star dies another is born

        let  
        ranNum = (Math.random() * 10) - 5
        radius =  (Math.random() * 100) - 50;
        randomX1 = (Math.cos(ranNum) * radius),
        randomY1 = (Math.sin(ranNum) * radius),

        x =  (randomX1 * ranNum),
        y =  (randomY1 * ranNum),

        lightness = 0;

        // console.log(radius);
        

        Stars.push({
            x: x, y: y, lightness: lightness
        });
        
    }