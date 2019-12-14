window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0;



    // context.translate(width / 2, height / 2);

    // let fibLength = (width/1.618) - 100,
    //     fibOrigin = 0;

    context.strokeStyle = "white";

    // context.beginPath();
    // context.rect(fibOrigin, fibOrigin, fibLength, fibLength);
    // context.stroke();

    // fibOrigin = fibLength;

    // fibLength = fibLength - fibLength/1.618;

    // context.beginPath();
    // context.rect(fibOrigin, 0, fibLength, fibLength);
    // context.stroke();
    

    let fibOrigin = 100;
    let fibLength = width -200;
    context.beginPath();
        context.rect(fibOrigin, fibOrigin, fibLength, fibLength-1100);
        context.stroke();
    let prevOrigin = fibOrigin;
    let prevLength = fibLength * 1.681;

    let currentOrigin = fibOrigin,
        currentLength = fibLength;


    for (let i = 0; i < 1; i++) {

        
        context.beginPath();
            context.rect(currentOrigin,currentOrigin,currentLength,currentLength);
            context.stroke();

        
        
        
        
    }


    // context.beginPath();

    // context.arc(fibLength, fibLength, fibLength, 1 * Math.PI, 1.5 * Math.PI) ;

    // context.stroke();


    // render();
    // function render() {
    
       

    //     requestAnimationFrame(render);
    // }

}