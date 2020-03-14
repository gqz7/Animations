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
    
    animate() 
    function animate() {

        time++ //a counter that counts the elapsed number of frames
 
        renderStars() //displays each star from its position in the Stars array 

        renderImage()

        // context.rotate(speed/100)

        moveStars(speed) //moves the position of each start slightly

        setTimeout( () => {

            //  console.log(speed);
            
            if (time < 400) {

                animate()
                
            } else {

                return
               
            }

        }, delay);
    }

    // FUNCTIONS

    function create_star_streak(x, y, size, lightness) {

        // context.save()

        let 
        x1 = x,
        y1 = y,
        x2 = x*(1.15),
        y2 = y*(1.15);
        
        context.strokeStyle = `hsl(${Math.random() * 360}, 100%, ${lightness}%)`;;
        
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
                size = 1,
                lightness = 10;
             
            Stars.push({
                x: x, y: y, size: size, lightness: lightness
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
            
            create_star_streak(Stars[i].x, Stars[i].y, Stars[i].size, Stars[i].lightness);
            
        }

    }

    function renderImage() {
        let imageObj = new Image(),
            imageW = 100,
            imageH = 100,
            imageX = 0 - imageW,
            imageY = 0 - imageH;


        imageObj.src = 'yin-yang.png';

        context.drawImage(imageObj, imageX, imageY, imageW*2, imageH*2 )
    }

    function moveStars(speed) {

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

                    Stars[i].lightness += (time/170 ) + 1
                    
                    Stars[i].size += 7/10000

                }
           
        }
        
    }


    function addStar() { //when one star dies another is born

        
        let  
        ranNum = Math.random() * 100   
        radius = (time/15) + 5;
        randomX1 = (Math.cos(ranNum) * radius),
        randomY1 = (Math.sin(ranNum) * radius),
        randomX2 = (Math.cos(ranNum) * radius * 2),
        randomY2 = (Math.sin(ranNum) * radius * 2),

        ranNum = Math.random(),

        x =  (randomX1 / ranNum) + (randomX2 * ranNum) ,
        y =  (randomY1 / ranNum) + (randomY2 * ranNum) ;
        size = 3,
        lightness = 0;

        Stars.push({
            x: x, y: y, size: size, lightness: lightness
        });
        
    }