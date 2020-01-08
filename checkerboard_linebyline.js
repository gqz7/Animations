//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        size = 10, lim = (width/size) / 2, cycles = 0, trans = true;

        // console.log(lim);
    
       


        //ANIMATION CYCLE

        context.fillStyle = "white";

        context.save() //saves the context at 0,0 (upper left corner) to go back to for each new line

        animate()
        function animate() {
            
            cycles++

            // console.log(cycles);

            if (cycles > lim) {

                newline()
    
            } else {

                create_square()

            }
            
            // setTimeout(window.requestAnimationFrame, 10, (clear))
            setTimeout(window.requestAnimationFrame, 0, (animate))
        }

        // FUNCTIONS

        function clear() { 
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }

        function newline() {

            context.restore()

                if (trans) {
                    
                    context.translate(-size,size);
                    
                    trans = false;
                } else {
                    context.translate(size, size);

                    trans = true;
                }

                context.save()
                cycles = 0;
            
        }

        function create_square(params) {
            context.beginPath()
            context.rect(0,0,size,size);
            context.fill()
            context.translate(size * 2, 0);
        }


}