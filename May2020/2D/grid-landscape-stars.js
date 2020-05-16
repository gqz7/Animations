const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    time = 0,

    renderPaused = false, //user can toggle animation

    mosPos = {
        x: 1000,
        y: 1000,
    },

    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    landscapePoints = []; // array to contain sphere points before they are rendered

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: none; margin:auto`

    //event listener for user input
    document.addEventListener('keydown', (evn) => {

        switch (evn.code) {
            case 'Space':
                renderPaused = !renderPaused;
            
                if (!renderPaused) { 
                    render()
                }

                break;
        
        }

    }, false)


    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.strokeStyle = 'hotpink';

    context.fillStyle = 'indigo'


    context.lineWidth = .8;
   
   //ANIMATION CYCLE

   let Stars = [];

   create_star_field()

     render()

      function render() {

        // console.log(frames);

        //counts how many frames have occured
        frames = frames < 2000 ? frames+1 : 0;

        time++

        clearFullScreen()

        renderStars()

        context.beginPath()
        context.rect(0,(height/2)+2,width,height)
        context.fill()

        moveStars((frames/1000)+10)

        createGrid()

        if (time < 200) {
            addStar()
        }

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

    function createGrid() {
        

        for (let i = 2; i < height/2; i*=(1+ height/8000) + frames/3300) {
            
            context.beginPath()
            context.moveTo(0,height/2 + i)
            context.lineTo(width,height/2 + i)
            context.stroke()

        }

        for (let i = (10+(frames/100))/2; i < width/2; i+=10+(frames/100)) {
            
            context.beginPath()
            context.moveTo(width/2 - i,height/2+2)
            context.lineTo(width/2 - i*(2*(1+frames/100)),height)
            context.stroke()

            context.beginPath()
            context.moveTo(width/2 + i,height/2+2)
            context.lineTo(width/2 + i*(2*(1+frames/100)),height)
            context.stroke()
        }

    }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function create_star_streak(x, y, lightness, index) {

        // context.save()

        x = x< 0 ? (x  - width/(time*2) - time/1000) : (x  + width/(time*2) + time/1000);
            
        let 
        x1 = x,
        y1 = y,
        x2 = x*(1 + lightness/1300),
        y2 = y*(1 + lightness/1300);
        
        let
        grad = context.createLinearGradient(x1, y1, x2, y2);

        //set up gradient
        grad.addColorStop(1, `hsl(0, 100%, ${lightness}%)`);
        grad.addColorStop(6/7, `hsl(45, 100%, ${lightness}%)`);
        grad.addColorStop(5/7, `hsl(90, 100%, ${lightness}%)`);
        grad.addColorStop(4/7, `hsl(135, 100%, ${lightness}%)`);
        grad.addColorStop(3/7, `hsl(180, 100%, ${lightness}%)`);
        grad.addColorStop(2/7, `hsl(245, 100%, ${lightness}%)`);
        grad.addColorStop(1/7, `hsl(305, 100%, ${lightness}%)`);
        
        context.strokeStyle = grad;
        
        //gradient line stroke 
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);

        context.lineWidth = (lightness/100) + .5;
       
        context.stroke();

        // context.restore()

    }

    function create_star_field() {

        for (let i = 0; i < 100; i++) {

            let x = (width * Math.random())-width/2,
                y = (height/2 * Math.random())-height/4,

                lightness = 10;
             
            Stars.push({
                x: x, y: y, lightness: lightness
            });
            
        }
        
    }

    function renderStars() {

        context.save()

        context.translate(width/2, height/1-frames/1)

        for (let i = 0; i < Stars.length; i++) {
            
            create_star_streak(Stars[i].x, Stars[i].y, Stars[i].lightness, i);
            
        }

        context.restore()

    }

    function moveStars(speed) {

        for (let i = 0; i < Stars.length; i++) {

            let NewX = Stars[i].x * (.979 + speed/4700 + Stars[i].lightness/1700),
                NewY = Stars[i].y * (.979 + speed/4700 + Stars[i].lightness/1700);


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

        let x = (width*1.2 * Math.random())-width/1.42 ,
            y = (height/1.5 * Math.random())-height/4,

        lightness = 10;

        // console.log(radius);
        Stars.push({
            x: x, y: y, lightness: lightness
        });
        
    }