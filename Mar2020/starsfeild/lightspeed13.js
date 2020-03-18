//event listeners for user input

let clearScreenBool = true;

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
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      delay = 30;                                    //determins durration of time(ms) between each frame

  let speed = 67;                                   //sets the speed at which stars travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where stars will spawn (will change this later so the origin can be set with a var) 


      let Stars = []; //this array will store the values of the current stars on the screen

      create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE

    let imageAoR = 0, //angle of rotation for image

    endTime = 1000; //how many cycles before it all ends
    
    animate() 
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        if (clearScreenBool) {
            clear()
        }
        
        if (time < 100) {

            renderStars() 

            renderImage(200,200)
            
        } else if (time < 383) {

            imageAoR += Math.PI / 360;

            renderStars()

            renderImage(-time + 300, -time + 300, imageAoR)


        } else if (time < endTime) {

            imageAoR += Math.PI / 360;

            renderStars()

            renderImage(83, 83, imageAoR)

        }


        // create_border() //creates a checkerboard border

        moveStars(speed) //moves the position of each start slightly

        setTimeout( () => {

            //  console.log(speed);
            
            if (time < endTime) {

                animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function create_star_streak(x, y, hue, lightness) {

        // context.save()

        let 
        x1 = x,
        y1 = y,
        x2 = x*(1.15),
        y2 = y*(1.15);
        
        context.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;;
        
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

    function renderImage(h,w,angle) {
        let imageObj = new Image(),
            imageW = h,
            imageH = w,
            imageX = 0 - imageW,
            imageY = 0 - imageH;


        imageObj.src = 'yin-yang.png';

        context.save()

        context.rotate(angle)

        context.drawImage(imageObj, imageX, imageY, imageW*2, imageH*2 )

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

    function create_border() {

        let squareD = 35;

        context.save()

        context.translate(-width/2,-height/2)

        let value = true

        for (let j = 0; j < 3; j++) {

                for (let i = 0; i < width; i+=squareD) {

                    context.fillStyle = value == true ? 'black' : 'white';

                    value = value == true ? false : true

                    context.beginPath()
                    context.rect(i, 0, squareD, squareD)
                    context.fill()

                    // console.log(context.fillStyle);
                    

                    context.fillStyle = context.fillStyle == '#000000' ?'white' : 'black';

                    context.beginPath()
                    context.rect(i, height - (squareD * j * 2) - squareD +11 , squareD, squareD)
                    context.fill()

                    // context.fillStyle = context.fillStyle == 'black' ? 'black' : 'white';
                
            }

            value = value == true ? false : true

            context.translate(0, squareD)
            
            
        }

        for (let i = 0; i < height; i+=squareD) {
            
            for (let j = 0; j < 3; j++) {

                context.fillStyle = value == true ? 'black' : 'white';

                context.beginPath()
                context.rect(j*squareD, i, squareD, squareD)
                context.fill() 

                context.beginPath()
                context.rect(width - j*squareD, i, squareD, squareD)
                context.fill() 

                value = value == true ? false : true
                
            }
            
        }

        context.restore()
        
    }