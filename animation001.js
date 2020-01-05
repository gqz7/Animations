
window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0;

    //create the fibonacci spiral recursivly
    function createFib(curFib, prevFib) {

        console.log(`prevL: ${prevFib}, curFib: ${curFib}`);

        fibLength = prevFib + curFib;

        //creates fionacci sizes square
        context.beginPath();
        context.rect(0,0,fibLength,fibLength);
        // context.stroke()

        //creates one arc section of the Fib spiral
        context.beginPath();
        context.arc(0,fibLength, fibLength, -.5 *Math.PI, 0);
        context.stroke();

        context.translate(fibLength,0);
        context.rotate(.5 * Math.PI);
        context.translate(fibLength,0);
        
        prevFib = curFib;
        curFib = fibLength;
        
        if (prevFib < 3000) {
            createFib(curFib, prevFib);
        }

    }
    
    //create a nice background for the animation
    function createBack() {

        context.save();
        context.translate(width/2,height/2);
        context.strokeStyle = "white";

        for (let index = 0; index < 630; index++) {

            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(width - 1000, height-400);
            context.stroke();
            context.rotate(.01);
            
        }
        context.restore();

    }

    
    context.strokeStyle = "white";

    context.translate(width/2,height/2); //to start at center
    // context.translate(width,0); //start at diffrent point

    let size = 1, color = 0;
    render();
    function render() {

        time++;

         if (time < 100) {
            time++

        } else {
            time = 1;
        };

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        context.save();
        createBack();
        context.restore();
        context.rotate(.03);

        //call background creation for each frame
        
        
        let currentsize = size;

        for (let i = 0; i < time/5; i++) {
            context.save();
            createFib(size, size);
            context.restore();

            context.strokeStyle = 'hsl(' + (color) + ', 100%, 70%)';
            size+=.1; color+= 15;
            
        }

        size = currentsize;


        // context.save();
        // createFib(size, size);
        // context.restore();

        

        

        setTimeout(window.requestAnimationFrame, 30, (render));
        
    }


   

}