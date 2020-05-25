//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      strokeW = 1,
      
      pauseAnimation = false,

      colorIndex = 0,

      colorPairs = [['hotpink', 'lime'], ['lightsalmon', 'skyblue'], ['darkslategrey', 'lightgoldenrodyellow'], ['plum', 'yellow']];

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = strokeW;

canvas.style = ` display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto`;

canvas.style = `display: block;
                // position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto;
                background-color: black`;

document.body.style = `margin: 0`;

document.body.appendChild(canvas)

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    pauseAnimation = !pauseAnimation;

    if (!pauseAnimation) {
        render()
    }
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/2)

//ANIMAITON CYCLE

        render()

        function render() {


        time = time < 3.14 ? time+.01: 0;

        if (time == 0 ) {
            colorIndex = colorIndex < 3 ? colorIndex+1 : 0;
        }

        clearFullScreen()

        createWall(time*100 + 37)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

function createImg(size) { 

    let nsw = strokeW+size/5;

    context.lineWidth = nsw;

    context.save()

    for (let i = 0; i < 6; i++) {

        if (i%2==0) {
            context.strokeStyle = colorPairs[colorIndex][0]
            context.fillStyle = colorPairs[colorIndex][0]

        } else {
            context.strokeStyle = colorPairs[colorIndex][1]
            context.fillStyle = colorPairs[colorIndex][1]
        }

        context.beginPath()

        context.moveTo(size,-Math.sqrt(3)*size/3)
        context.lineTo(-size,-Math.sqrt(3)*size/3)
        
        context.stroke()

        context.beginPath()

        // context.arc(size+(Math.sqrt(3)*nsw/4) , -Math.sqrt(3)*size/3+nsw/4, 1, 0,Math.PI*2)
        context.moveTo( size+(Math.sqrt(3)*nsw/2) , -Math.sqrt(3)*size/3 -nsw/2 );
        context.lineTo(size,-Math.sqrt(3)*size/3-nsw/2)
        context.lineTo(size-5,-Math.sqrt(3)*size/3)
        context.lineTo(size+(Math.sqrt(3)*nsw/4) , -Math.sqrt(3)*size/3+nsw/4)
        context.lineTo(size+(Math.sqrt(3)*nsw/2) , -Math.sqrt(3)*size/3 -nsw/2)

        context.fill()

        context.rotate(Math.PI/3)
    }
    
    context.strokeStyle = colorPairs[colorIndex][0]
    
    context.beginPath()

        context.moveTo(-size,-Math.sqrt(3)*size/3)
        context.lineTo(0,-Math.sqrt(3)*size/3)
        
    context.stroke()

    context.restore()
    
}

function createWall(size) {

    for (let r = 0; r < 2; r++) {

        context.save()
        context.translate(size*1.176,0)
        
        for (let i = 0; i < width+size; i+=size*2) {
            
            for (let j = 0; j < height+size*3; j+=size*2+size/30) {
        
                context.save()
                context.translate(i,j)
                createImg(size)
                context.translate(0,-j*2)
                createImg(size)

                context.restore() 

            }
            
        }

        context.restore() 

        context.rotate(Math.PI)
    }

    

    
}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}