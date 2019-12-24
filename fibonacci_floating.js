
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

        for (let i = arr.length - 4; i > -1; i--) {
        context.beginPath();
        context.rect(0,0,arr[i],arr[i]);
        // context.stroke()

        context.beginPath();
        context.arc(0,arr[i], arr[i], -.5 *Math.PI, 0);
        context.stroke();

        context.translate(arr[i],0);
        context.rotate(.5 * Math.PI);
        context.translate(arr[i],0);
        
        }
        
    }
    
    // context.translate(width/2, height/2);
    context.scale(.5,.5)
    
    render();
    function render() {
        time++

        // context.save();
        // context.setTransform(1, 0, 0, 1, 0, 0);
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.restore();
        

         

         context.scale(1.0009, -1.01);

         context.rotate(.7);

         
        context.save()
        for (let i = 0; i < 1; i++) {

            context.strokeStyle = 'hsl(' + (time*2) + ', 100%, 70%)';
            
            context.save()
            context.translate(width / 4, height/2  ); //start at bottom left

            context.rotate(-.5 * Math.PI);

            create_fib_dia()
            context.restore()

            context.save()
            context.translate((width /4) + arr[arr.length - 4] + arr[arr.length - 5] , (height/2)  - arr[arr.length - 4]); //start at bottom left

            context.rotate(.5 * Math.PI);

            create_fib_dia()
            context.restore()
            ////////////////

            context.translate((width /4) + arr[arr.length - 5] , (height/2.7) - arr[arr.length - 4]); 

            context.save()
            context.translate((width /4), (height/2)  - arr[arr.length - 4]); //start at bottom left

            context.rotate(-.5 * Math.PI);

            create_fib_dia()
            context.restore()

            

        }
        context.restore()

        

        
        setTimeout(window.requestAnimationFrame, 0, (render));
        
    }
    

}