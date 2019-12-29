
// single line commentflskafolsdk

window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
       

   context.translate(width / 2, height /2);
    context.rotate(1.55)

    var p0 = {
                x: 0, y: -321
            },
        p1 = {
                x: 278, y: 160
            },
        p2 = {
                x: -278, y: 160
            };
var time = 0,
    distortion = .51;
    x = 0,
    scale = 0; 

//rendering function loop
window.requestAnimationFrame(function spin() {
    context.rotate(Math.PI / 2);
    context.save()
    x++;
    // distortion -= .00095 + Math.random() / 100;
    // context.rotate(Math.PI / 1.00);

        fractal(p0, p1, p2, 3);
    
    if(time < 0 ){
        x = 0;
        time++;
        clear();
    } else if ( x > 900 ){
        setInterval(clear, 100000);
        return ////STOPS ANIMATION!!
        time--;
        scale = ((time/900));
    }
    else if ( x < 900 ){
        time++;
         //(2 + Math.random() / 6);
         scale = (time/900);
         (x/200) + (Math.random() / 25); 
    }   
    context.restore();
     
setTimeout(window.requestAnimationFrame,0, (spin));  
})   

//clear screen function
function clear() { 
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}


//create simple triangle
function drawTri(p0, p1, p2) {

    context.beginPath(); 
    context.moveTo(p0.x * scale, p0.y * scale);
    context.lineTo(p1.x / scale, p1.y / scale);
    context.lineTo(p2.x / scale, p2.y / scale);
    context.fillStyle = 'hsl(' + (time * 7.3) + ', 100%, 60%)';
    context.fill(); 
       
} 


//recursive fractal function that can make triangluar fractal
function fractal(p0, p1, p2, lim){
    if(lim > 0){
        
        // (1 + (Math.random() * 1));
        var pA = {
                x: (p0.x + p1.x) / distortion,
                y: (p0.y + p1.y) / distortion
            },
            pB = {
                x: (p1.x + p2.x) / distortion,
                y: (p1.y + p2.y) / distortion
            }, 
            pC = {
                x: (p2.x + p0.x) / distortion,
                y: (p2.y + p0.y) / distortion
            };
            fractal(p0, pA, pC, lim - 1);
            fractal(pA, p1, pB, lim - 1);
            fractal(pC, pB, p2, lim - 1);

        } 
        else {
           (drawTri(p0, p1, p2));
        }
}




}




