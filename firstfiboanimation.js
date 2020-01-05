
window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0;

    function createFib(curFib, prevFib) {

        console.log(`prevL: ${prevFib}, curFib: ${curFib}`);

        fibLength = prevFib + curFib;

        context.beginPath();
        context.rect(0,0,fibLength,fibLength);
        // context.stroke()

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

    
    context.strokeStyle = "white";

    context.translate(width/2,height/2); //to start at center
    // context.translate(width,0); //start at diffrent point

    let size = 1, color = 0;
    render();
    function render() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        context.rotate(-.1);

        let currentsize = size;

        for (let i = 0; i < 50; i++) {
            context.save();
            createFib(size, size);
            context.restore();

            context.strokeStyle = 'hsl(' + (color) + ', 100%, 70%)';
            size+=.02; color += 14;
            
        }

        size = currentsize;


        context.save();
        createFib(size, size);
        context.restore();

        

        

        setTimeout(window.requestAnimationFrame, 30, (render));
        
    }


   

}