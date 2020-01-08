//background color must be white

window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;


        context.beginPath()
        context.moveTo(0,0);
        context.lineTo(width, height);
        context.stroke()


}