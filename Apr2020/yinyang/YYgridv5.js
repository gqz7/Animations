

let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    time = 77,
    rotateTime = 0;

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.strokeStyle = 'white';
    context.lineWidth = 1.5;

     render()

      function render() {
        time = time < 444 ? time + .5 : 77;
        clearFullScreen()

        createGrid()

        context.rotate(-.003)

        let delay = time/10 - 5 < 20? time/10- 5 : 20;

        console.log(delay);
        

        setTimeout(window.requestAnimationFrame,delay, render)

      }

function yinyang(radius, rads) {

        context.save()

        context.rotate(-rads)

        context.beginPath()
        context.arc(0,0,radius/1.39,0,Math.PI*2)
        context.stroke()

        context.fillStyle = 'white';
        context.beginPath()
        context.arc(0,0,radius/1.39,Math.PI*2/3,Math.PI*4/3)
        context.arc(radius/3,0,radius/1.39,Math.PI*2/3,Math.PI*4/3)
        context.fill()

        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius/1.39,Math.PI*4/3,Math.PI*6/3)
        context.arc(-radius/7,radius/4,radius/1.39,Math.PI*4/3,Math.PI*6/3)
        context.fill()

        context.fillStyle = 'lightgrey';
        context.beginPath()
        context.arc(0,0,radius/1.39,Math.PI*6/3,Math.PI*2/3)
        context.arc(-radius/7,-radius/4,radius/1.39,Math.PI*6/3,Math.PI*2/3)
        context.fill()
        //first circle origin in the middle of all three circles
        context.translate(Math.sqrt(3)*.22222*radius, 0);


        // circle 1
        context.fillStyle = 'lightgrey';
        context.beginPath()
        context.arc(0,0,radius/3,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'darkgrey'; 
        context.beginPath()
        context.arc(0,0,radius/7,0,Math.PI*2)
        context.fill()

        //translate to next circle origin
        context.rotate(Math.PI/3)
        context.translate(0, radius/3*2);

        //circle 2
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius/3,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius/7,0,Math.PI*2)
        context.fill()

        context.rotate(Math.PI/1.5)
        context.translate(0, radius/3*2);


        //circle 3
        context.fillStyle = 'black';
        context.beginPath()
        context.arc(0,0,radius/3,0,Math.PI*2)
        context.fill()
        context.fillStyle = 'white'; 
        context.beginPath()
        context.arc(0,0,radius/7,0,Math.PI*2)
        context.fill()

     
        context.restore()
}

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    function createGrid()  {

        for (let i = 0; i < 4; i++) {
            createQuad(i)
            context.rotate(Math.PI/2)
        }

        

    }

    function createQuad(index) {

        context.save()
        
        let radius = time;
            
        context.translate(radius/1.39,radius/1.39)

        for (let j = 0; j < height; j+=radius*1.5) {

            // let indexNum = j < 200 ? j : .1;
            let speed = (j/1000) + radius/7,
            rotateTime = index % 2 != 0 ? -speed : speed;

            context.save()
            
            for (let i = 0; i < width; i+=radius*1.5) {

                yinyang(radius, rotateTime)
                context.translate(radius*2/1.39,0)
        
            }

            context.restore()

            context.translate(0,radius*2/1.39)
            
        }

        context.restore()
        

    }