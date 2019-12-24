
window.onload = function () {
     var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = this.innerWidth, //this refers to window
        height = canvas.height = this.innerHeight,
        time = 0, startLength, arr = [1];

    //function that creates a fibonacci sequence that just exceeds the height of the canvas 
    let prvNum = 1, curNum = 1;
    create_fib_arr()
    function create_fib_arr() {
        
        let fibNum = prvNum + curNum;

        if (prvNum < height) {
            
            prvNum = curNum;
            curNum = fibNum;

            arr.push(fibNum);

            create_fib_arr()
        }
        
    }
    //function that creates fibonacci diagram (squares + arcs)
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

    context.strokeStyle = "red";
    
    context.save()
    context.translate(300,height - 50); //start at bottom left

    context.rotate(-.5 * Math.PI);

    create_fib_dia()
    context.restore()

    context.save()
    context.translate(arr[arr.length - 3] + arr[arr.length - 4] + 300, height - arr[arr.length - 3] - 50); //start at bottom left

    context.rotate(.5 * Math.PI);

    create_fib_dia()
    context.restore()

}