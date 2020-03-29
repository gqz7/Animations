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
    
const width = canvas.width = window.innerWidth,        //width of the canvas
      height = canvas.height = window.innerHeight,    //height of the canvas
      delay = 15;                                    //determins durration of time(ms) between each frame

  let speed = 52;                                  //sets the speed at which stars travel away from the center

      context.translate(width/2, height/2) //setting the origin (0,0) to the center of the screen makes it easier to calculate where stars will spawn (will change this later so the origin can be set with a var) 
    
    //   context.rotate(Math.PI/2)

      let Stars = [], //this array will store the values of the current stars on the screen

          spaceImgsLinks = [ //array of online images of nebulas

            './space-images/nebula (1).png',
            './space-images/nebula (3).png',  
            './space-images/nebula (2).png', 
            './space-images/nebula (4).png',
            './space-images/nebula (5).png' 
          ],

          spaceImgs = [],

          transitionTimer = 0, //this will be used to time the transition between space pictues 
          starZoom = 0,
          pictuesIndex = 0,
          imageSizeLimit = 999;

      createImgElements(spaceImgsLinks, spaceImgs);

      create_star_field() //adds stars to Stars array
   
    //ANIMATION CYCLE
    
    animate() 
    function animate() {

        time++ //a counter that counts the elapsed number of frames

        if (clearScreenBool) {
             clear()
        }

        if (time % imageSizeLimit == 0 && time != 0) {
            transitionTimer = 100;

            
        }


        if (transitionTimer > 0) {
            
            transitionTimer--
            
        }

        if (transitionTimer == 0) {

            createBGimg(starZoom)

            starZoom++

        } else if (transitionTimer > 70) {

            createBGimg(starZoom)

            starZoom = starZoom > 0 ? starZoom - 40 : 0;

        } else if (transitionTimer == 70) {

            starZoom = 0

            let newIndex = Math.floor(spaceImgsLinks.length * Math.random());

            while (newIndex == pictuesIndex) {
                newIndex = Math.floor(spaceImgsLinks.length * Math.random());
            }
            pictuesIndex = newIndex

        }

        console.log(transitionTimer );
        
        
        renderStars() //displays each star from its position in the Stars array 
        

        moveStars(speed) //moves the position of each start slightly

        setTimeout( () => {

            if (time < 100) {

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

        y = y < 0 ? (y  - width/(time/7) - time/1000) : (y  + width/(time/7) + time/1000);
            
        let 
        x1 = x,
        y1 = y,
        x2 = x*(1 + Math.sqrt(lightness)/100),
        y2 = y*(1 + Math.sqrt(lightness)/100);

        //conditional for lightspeed transistion 

        if (transitionTimer > 0) {

            x1 = x / (1 + ((100-transitionTimer)/3));
            y1 = y / (1 + ((100-transitionTimer)/3));
            
        }
        
        let
        grad = context.createLinearGradient(x1, y1, x2, y2),

        light = lightness/1.3;

        //set up gradient
        grad.addColorStop(1, `hsl(0, 100%, ${light}%)`);
        grad.addColorStop(6/7, `hsl(45, 100%, ${light}%)`);
        grad.addColorStop(5/7, `hsl(90, 100%, ${light}%)`);
        grad.addColorStop(4/7, `hsl(135, 100%, ${light}%)`);
        grad.addColorStop(3/7, `hsl(180, 100%, ${light}%)`);
        grad.addColorStop(2/7, `hsl(245, 100%, ${light}%)`);
        grad.addColorStop(1/7, `hsl(305, 100%, ${light}%)`);
        
        context.strokeStyle = grad;

        
        //gradient line stroke 
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);

        context.lineWidth = (lightness/100) + 1;
       
        context.stroke();

        // context.restore()

    }


    function create_star_field() {

        for (let i = 0; i < 200; i++) {

            let  
                x =  (width * Math.random()/2) - width/4,
                y =  (height * Math.random()/2) - height/4,

                lightness = 20;
             
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

            let NewX = Stars[i].x * (.98 + speed/5000 + Stars[i].lightness/1300),
                NewY = Stars[i].y * (.98 + speed/5000 + Stars[i].lightness/1300);


            if (NewX > width || NewX < -width || NewY > width/.5 || NewY < -width/.5) {

                Stars.splice(i, 1); //if it goes off screen, delete it from the stars to be rendered

                addStar() // then add a new one to replace it

                i--

            } else {

                Stars[i].x = NewX;
                Stars[i].y = NewY;

                Stars[i].lightness = Stars[i].lightness <= 77 ? Stars[i].lightness * 1.02 : 77;

            }
           
        }
        
    }

    function addStar() { //when one star dies another is born

        let  
        ranAngle = Math.random() * 100   
        radius = 10;
        randomX1 = (Math.cos(ranAngle) * radius),
        randomY1 = (Math.sin(ranAngle) * radius),
        randomX2 = (Math.cos(ranAngle) * radius * 4),
        randomY2 = (Math.sin(ranAngle) * radius * 4),

        ranNum = (Math.random() * 17) + 1,

        x =  (randomX2 * ranNum) + (randomX1 * ranNum) * Math.random(),
        y =  (randomY2 * ranNum) + (randomY1 * ranNum) * Math.random() * 5,

        lightness = 10;

        // console.log(radius);
        

        Stars.push({
            x: x, y: y, lightness: lightness
        });
        
    }

    function createImgElements(arrayOfLinks, storage) {

        for (let i = 0; i < arrayOfLinks.length; i++) {
            
            let image = new Image();

            image.src = arrayOfLinks[i];

            storage.push(image)
        }

    }

    function createBGimg(size) {

        // spaceImgs[2].style.borderRadius = 50%;

        let x = width/2-size/2,
            y = (height/2-size/2),
            w = size,
            h = size;

        context.save();

        context.translate(-width/2, -height/2)
        
        context.drawImage(spaceImgs[pictuesIndex], x, y, w, h);

        context.translate(width/2, height/2)

        context.restore()

    }