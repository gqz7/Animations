

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
let x = 200,
    m = .1;
    distortion = 1,
    fracLim = 5;

//(2 + Math.random() / 6); 

        window.requestAnimationFrame(function spin() {
            x++
            m = m + .06;
            // distortion = distortion / 1.9;

            // clear()
            
            context.rotate(Math.PI / 400);

                context.save();
                fractal(p0, p1, p2, fracLim);
                
        
            if(x > 200){
                clear()
                x = 100
                m = 0
                distortion = 2

                if (fracLim < 9) {
                    fracLim++
                }
                
            }
            
            
        setTimeout(requestAnimationFrame, 100, (spin));  
        })    




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
        context.fillStyle = 'hsl(' + x*2 + ', 100%, 60%)';
        context.fill();
        
    } 

    function clear() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

    }


} //end of window onload callback function