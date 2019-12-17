
window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0, startLength, arr = [1];

        
    let prvNum = 1, curNum = 1;

    create_fib_arr()
    function create_fib_arr() {
        
        let fibNum = prvNum + curNum;

        if (prvNum < height) {
            
            prvNum = curNum;
            curNum = fibNum;

            arr.push(fibNum);

            create_fib_arr()
        } else {
            startLength = curNum;
        }

        
        
    }

    context.strokeStyle = "white";

    // context.translate(width/2,height/2); //to start at center
    context.translate(0,height); //start at diffrent point

    context.rotate(-.5 * Math.PI);

    function create_fib_dia() {

        for (let i = arr.length - 3; i > -1; i--) {
        context.beginPath();
        context.rect(0,0,arr[i],arr[i]);
        context.stroke()

        context.beginPath();
        context.arc(0,arr[i], arr[i], -.5 *Math.PI, 0);
        context.stroke();

        context.translate(arr[i],0);
        context.rotate(.5 * Math.PI);
        context.translate(arr[i],0);
        
        }
        
    }

    

}