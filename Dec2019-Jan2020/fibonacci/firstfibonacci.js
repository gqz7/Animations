
window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0;

    context.strokeStyle = "white";

    context.translate(width/2,height/2); //to start at center
    // context.translate(width,0); //start at diffrent point

    let fibLength = 2, previousfibLength = 2;

    let start = 2;

    createFib(start, start);

    function createFib(curFib, prevFib) {

        console.log(`FibL: ${fibLength}, prevL: ${prevFib}, curFib: ${curFib}`);

        fibLength = prevFib + curFib;

        context.beginPath();
        context.rect(0,0,fibLength,fibLength);
        context.stroke()

        context.beginPath();
        context.arc(fibLength,0, fibLength, .5 * Math.PI, Math.PI);
        // context.stroke();

        context.translate(fibLength,0);
        context.rotate(-.5 * Math.PI);
        context.translate(0,fibLength);
        
        prevFib = curFib;
        curFib = fibLength;
        
        if (prevFib < 1000) {
            createFib(curFib, prevFib);
        }

        
    }


}