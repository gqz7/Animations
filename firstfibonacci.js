
window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0;

    context.strokeStyle = "white";


    let boxOrigin = width/20;
    let boxWidth = width - width/10;
    let boxHeight = height - height/5;
    context.beginPath();
    context.rect(boxOrigin, boxOrigin, boxWidth, boxHeight);
    context.stroke();



    // let prevOrigin = fibOrigin;
    // let prevLength = fibLength * 1.681;

    


    // for (let i = 0; i < 1; i++) {

    //     let currentOrigin = fibOrigin,
    //     currentLength = fibLength;

        
    //         context.beginPath();
    //         context.rect(currentOrigin,currentOrigin,currentLength,currentLength);
    //         context.arc(fibOrigin, fibOrigin, 50, 0, 2 * Math.PI);
    //         context.stroke();


        
        
    // }
}