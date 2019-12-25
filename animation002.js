
window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0;

    //create the fibonacci spiral recursivly
    function createFibSqr(curFib, prevFib) {

        console.log(`prevL: ${prevFib}, curFib: ${curFib}`);

        fibLength = prevFib + curFib;

        //creates fionacci sizes square
        context.beginPath();
        context.rect(0,0,fibLength,fibLength);
        context.stroke()

        context.translate(fibLength,0);
        context.rotate(.5 * Math.PI);
        context.translate(fibLength,0);
        
        prevFib = curFib;
        curFib = fibLength;
        
        if (prevFib < 3000) {
            createFibSqr(curFib, prevFib);
        }

    }


    function createFibSpi(curFib, prevFib) {

        console.log(`prevL: ${prevFib}, curFib: ${curFib}`);

        fibLength = prevFib + curFib;

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
            createFibSpi(curFib, prevFib);
        }

    }
    
    

    
    context.strokeStyle = "white";

    context.translate(width/2,height/2); //to start at center
    // context.translate(width,0); //start at diffrent point

    let size = 1, color = 0;
    render();
    function render() {

        time++

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        // context.save();
        //  context.translate(width/2,height/2);
        // createBack();
        // context.restore();
        // context.rotate(.02);

        //call background creation for each frame
        
        
        let currentsize = size;

        for (let i = 0; i < 200; i++) {
            context.save();

            if (time < 100 && time > 50) {

                createFibSpi(size / i, size * i);

            } else if (time <= 50 && time > 0) {

                createFibSqr(size / i, size * i)

            } else {
                time = 1;
            };
            context.restore();

            context.strokeStyle = 'hsl(' + (color) + ', 100%, 75%)';
            size+=.0006; color+= 7;
            
        }

        size = currentsize;

        

        

        setTimeout(window.requestAnimationFrame, 30, (render));
        
    }


   

}