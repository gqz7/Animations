//background color must be white

window.onload = function() {
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

        context.fillStyle = "white";

        let size = 10, lim = (width/size) / 2, cycles = 0, trans = true;

        console.log(lim);
        

        context.save()

        animate()
        function animate() {
            
            cycles++
            

            console.log(cycles);

            if (cycles > lim) {

                newline()
    
            } else {

                context.beginPath()
                context.rect(0,0,size,size);
                context.fill()
                context.translate(size * 2, 0);

            }
            
            
            

        //    clear()
            // setTimeout(window.requestAnimationFrame, 10, (clear))
            setTimeout(window.requestAnimationFrame, 0, (animate))
        }

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


}