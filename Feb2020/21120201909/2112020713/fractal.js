//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

console.log(slider);

console.log(slider.value);



let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas


      
context.translate(width/2, height/2);

for (let i = 0; i < 400; i++) {


    for (let shape = 0; shape === 4 ;shape++) {


        spin()
        context.rotate(shapes/i)


    }
    



    context.strokeStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    

    //make turn

    context.rotate((2 * Math.random()) + 1)

    //movment
    let forwardMove = Math.random() * 333;

    context.beginPath()
    context.moveTo(0,0);
    context.lineTo(0, forwardMove);
    context.stroke()

    context.translate(0, forwardMove);


    
}
// single line commentflskafolsdk

window.onload = function() {
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
       

   context.translate((width / 2), height /2);


    let p0 = {
                x: 0, y: -321
            },
        p1 = {
                x: 278, y: 160
            },
        p2 = {
                x: -278, y: 160
            };
let x = 0,
    m = .1;
    distortion = 6;

//(2 + Math.random() / 6); 

window.requestAnimationFrame(function spin() {
    x++
    m = m + .06;
    distortion = distortion / 1.9;

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
    context.rotate(Math.PI / 0 );

        context.save();
        fractal(p0, p1, p2, 5 );
        context.rotate(1);
        fractal(p0, p1, p2, 5 );
        context.restore();

        context.save();

        context.translate(2777,0);

        fractal(p0, p1, p2, 4 );
        context.rotate(1);
        fractal(p0, p1, p2, 4 );
        context.restore();

        context.save();

        context.translate(-2777,0);

        fractal(p0, p1, p2, 4 );
        context.rotate(1);
        fractal(p0, p1, p2, 4 );
        context.restore();

        context.save();

        context.translate(0,2777);

        fractal(p0, p1, p2, 4 );
        context.rotate(1);
        fractal(p0, p1, p2, 4 );
        context.restore();

        context.save();

        context.translate(0,-2777);

        fractal(p0, p1, p2, 4 );
        context.rotate(1);
        fractal(p0, p1, p2, 4 );
        context.restore();

        context.rotate(.5);


    if(x > 100){
        x = 1
        m = 0
        distortion = 3
    }
    

    function fractal(p0, p1, p2, lim){
        if(lim > 0){
            const s0 = distortion ;
            const s1 = distortion ;
            const s2 = distortion ;
            const s4 = distortion ;
            // (1 + (Math.random() * 1));
            var pA = {
                    x: (p0.x + p1.x) / s0,
                    y: (p0.y + p1.y) / s0
                },
                pB = {
                    x: (p1.x + p2.x) / s0,
                    y: (p1.y + p2.y) / s0
                }, 
                pC = {
                    x: (p2.x + p0.x) / s0,
                    y: (p2.y + p0.y) / s4
                };
                fractal(p0, pA, pC, lim - 1);
                fractal(pA, p1, pB, lim - 1);
                fractal(pC, pB, p2, lim - 1);
    
            } 
            else {
               (drawTri(p0, p1, p2));
            }
    }


    
 
    function drawTri(p0, p1, p2) {
 
        context.beginPath(); 
        context.moveTo(p0.x * m, p0.y * m);
        context.lineTo(p1.x * m, p1.y * m);
        context.lineTo(p2.x * m, p2.y * m);
        context.fillStyle = 'hsl(' + 360 * 77 + ', 100%, 80%)';
        context.fill();
           
    } 
     
     
setTimeout(requestAnimationFrame,0, (spin));  
})      
}

