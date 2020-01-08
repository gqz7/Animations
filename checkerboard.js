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
            context.moveTo(0,0);
            context.lineTo(width - subW, height - subH);

            context.stroke()

            setTimeout(window.requestAnimationFrame, 0, (animate))
        }


        // context.beginPath()
        // context.moveTo(0,0);
        // context.lineTo(width, height);

        // context.stroke()


}