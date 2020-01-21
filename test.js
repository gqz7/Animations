
// single line commentflskafolsdk

window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
       

   context.translate(width / 2, height /2);
    context.rotate(3.14)

    var p0 = {
                x: 0, y: -321
            },
        p1 = {
                x: 278, y: 160
            },
        p2 = {
                x: -278, y: 160
            };
let time = 0,
    distortion = .51;
    x = 0,
    scale = 1,
    timeSwitch = true,
    lightness = 50,
    limit = 444;

//rendering function loop
window.requestAnimationFrame(function spin() {


    x++;
    // distortion -= .000095 - Math.random() / 770;
    // context.rotate(Math.PI / 1.2);

    context.scale(1.0005,1.0005)
    

    context.save()

    for (let i = 0; i < 2; i++) {

        fractal(p0, p1, p2, 1);
        context.scale(1.2,1.7);
        context.rotate(Math.PI/3)

        
    }

    time++
     
    context.restore();

    if (time < limit && timeSwitch == true) {
        console.log('going up');
        
        time++
        scale-= .1;

    } else if (time > limit && timeSwitch == true) {
        
        
        time = limit - 3;

        timeSwitch = false;

    } else if (time < limit && timeSwitch == false) {

        console.log('going down');

        time--
        scale-= .01;


    } else if (time < 0 && timeSwitch == false) {
        time = 3;
        timeSwitch = true;
    }

    console.log(time);
    
     
setTimeout(window.requestAnimationFrame,60, (spin));  
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
    context.moveTo(p0.x / scale, p0.y / scale);
    context.lineTo(p1.x / scale, p1.y / scale);
    context.lineTo(p2.x / scale, p2.y / scale);
    context.fillStyle = 'hsl(' + (time * 7.3) + ', 100%,' + lightness + '%)';
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




