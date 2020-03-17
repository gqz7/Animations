//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 24,                                    //determins durration of time(ms) between each frame

      lightSpeedStart = 176,

      lightSpeedEnd = 617;

  let speed = 7;                                   //sets the speed at which stars travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where stars will spawn (will change this later so the origin can be set with a var) 


      let Stars = []; //this array will store the values of the current stars on the screen

      let tdlSmd = 0 //Total Stars Made

      create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE
    
    animate() 
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        // console.log(speed);
        

        if (time >= lightSpeedStart && time <= lightSpeedEnd) {
            const rotateby = ( 1000) / Math.pow(time, 2) ;
            console.log(rotateby);
            
            context.rotate(rotateby)

            speed = 100 - time/50

        } else if (time >= lightSpeedEnd + 300 && time < 304) {
            speed = 100

        } else if (time > lightSpeedEnd + 301 && speed > 40) {
            
            speed -= .171
        } else if (time < lightSpeedStart) {

            speed +=.4
        } else {

        }

        clear()
        

        renderStars() //displays each star from its position in the Stars array 

        // context.rotate(speed/10000)

        moveStars(speed) //moves the position of each start slightly

        setTimeout( () => {

            if (time < 4444) {

                animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function create_star_streak(x, y, lightness, id) {

        // context.save()

        x = x < 0 ? x - 5 : x + 5;

        y = y < 0 ? y - 10 : y + 10;

        let 
        x1 = x,
        y1 = y,
        x2 = lightness/100 < 0.20 ? x*(1 + lightness/100) : x*1.17,
        y2 = lightness/100 < 0.20 ? y*(1 + lightness/100) : y*1.17;
        
        create_rainbow_gradient(x1, y1, x2, y2, lightness);

        if (time >= lightSpeedStart &&  time <= lightSpeedEnd) {

            lightness = lightness*2;

            // let probibility = (lightSpeedEnd - lightSpeedStart) / (lightSpeedEnd - lightSpeedStart + time);

            if (id % 2 == 0) {

                x1 = time - lightSpeedStart < 200 ? (x1/100) * (time - lightSpeedStart) : (x1*2)
                y1 = time - lightSpeedStart < 200 ? (y1/100) * (time - lightSpeedStart) : (y1*2)
                x2 = x2 * ((time - lightSpeedStart -100) / 100)
                y2 = y2 * ((time - lightSpeedStart -100) / 100)

                let lightspeedStroke = context.createLinearGradient(x1, y1, x2, y2),

                ranColor = Math.random() * 360;

                   lightspeedStroke.addColorStop(1, `hsl(0, 100%, ${lightness +25}%)`);
                    lightspeedStroke.addColorStop(6/7, `hsl(30, 100%, ${lightness+22}%)`);
                    lightspeedStroke.addColorStop(5/7, `hsl(90, 100%, ${lightness+21}%)`);
                    lightspeedStroke.addColorStop(4/7, `hsl(135, 100%, ${lightness+20}%)`);
                    lightspeedStroke.addColorStop(3/7, `hsl(180, 100%, ${lightness+19}%)`);
                    lightspeedStroke.addColorStop(2/7, `hsl(245, 100%, ${lightness+18}%)`);
                    lightspeedStroke.addColorStop(1/7, `hsl(305, 100%, ${lightness +15}%)`);

                context.strokeStyle = lightspeedStroke;

                context.lineWidth = 2.7 - (time/180);

            }
               
        }
        
        //gradient line stroke 
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);       
        context.stroke();

        // context.restore()

    }


    function create_star_field() {

        for (let i = 0; i < 500; i++) {

            let     
                x = (Math.random() * width) - width /2,
                y = (Math.random() * height) - height /2,
                size = 1,
                lightness = 10,
                id = ++tdlSmd;
             
            Stars.push({
                x: x, y: y, size: size, lightness: lightness, id: id
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
            
            create_star_streak(Stars[i].x, Stars[i].y, Stars[i].lightness, Stars[i].id);
            
        }

    }

    function moveStars(speed) {

        for (let i = 0; i < Stars.length; i++) {

            let NewX = Stars[i].x * (1 + speed/1000),
                NewY = Stars[i].y * (1 + speed/1000);


                if (NewX > width*5 || NewX < -width*5 || NewY > width*5 || NewY < -width*5) {

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
        ranNum = Math.random() * 100  
        radius = (time/15) + 5;
        randomX1 = (Math.cos(ranNum) * radius),
        randomY1 = (Math.sin(ranNum) * radius),
    
        ranNum = Math.random(),

        x =  (randomX1 / ranNum) * Math.random(),
        y =  (randomY1 / ranNum) * Math.random(),

        lightness = -speed/4,
        id = ++tdlSmd;

        Stars.push({
            x: x, y: y, lightness: lightness, id: id
        });
        
    } 

    function create_rainbow_gradient(x1, y1, x2, y2, lightness) {

        grad = context.createLinearGradient(x1, y1, x2, y2);

        grad.addColorStop(1, `hsl(0, 100%, ${lightness +5}%)`);
        grad.addColorStop(6/7, `hsl(45, 100%, ${lightness+2}%)`);
        grad.addColorStop(5/7, `hsl(90, 100%, ${lightness+1}%)`);
        grad.addColorStop(4/7, `hsl(135, 100%, ${lightness}%)`);
        grad.addColorStop(3/7, `hsl(180, 100%, ${lightness-1}%)`);
        grad.addColorStop(2/7, `hsl(245, 100%, ${lightness-2}%)`);
        grad.addColorStop(1/7, `hsl(305, 100%, ${lightness -5}%)`);
        
        context.strokeStyle = grad;

        context.lineWidth = (lightness/34) + 1;

        
    }