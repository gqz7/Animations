//background color must be white

window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

        let subW = width, subH = height;

        animate()
        function animate() {
            

            subH -= 5;
            subW -= 10;

            context.beginPath()
            context.moveTo(width - subW - 20, height - subH - 10);
            context.lineTo(width - subW, height - subH);

            context.stroke()
            

        //    clear()
            setTimeout(window.requestAnimationFrame, 200, (clear))
            setTimeout(window.requestAnimationFrame, 60, (animate))
        }


        // context.beginPath()
        // context.moveTo(0,0);
        // context.lineTo(width, height);

        // context.stroke()

        function clear() { 
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }


}