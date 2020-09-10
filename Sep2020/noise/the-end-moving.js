
const Noise = toxi.math.noise.simplexNoise.noise;
let seed1 = 417.3939// Math.random()*100;
let seed2 = 3141.5826//Math.random()*100;

// 3.7866918545821027
// seed 2: 18.83535817399713
console.log(`seed 1: ${seed1}\nseed 2: ${seed2}\n`);

// alert('CONTROLS\nPress E to adjust object orientation\nPress S to toggle frame screen clear\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
			context = canvas.getContext('2d'),
			
			width = canvas.width = window.innerWidth,
			height = canvas.height = window.innerHeight,

			time = 4.9,

			timeMax = height/6,

			timeForward = true,

			strokeW = 1,

			speed = .05,

			clearScreen = true,
			pixles = [],
			
			pauseAnimation = true,

			viewWidth = 1,
			viewHeight = width/2;

	context.strokeStyle = 'white';
	context.fillStyle = 'white';

	context.lineWidth = strokeW;

	canvas.style = `display: block;
								position: static;
								top: 0px;
								left: 0px;
								// cursor: none;
								margin:auto;
								background-color: black`;

	document.body.style = `margin: 0`;

	document.body.appendChild(canvas)

	//USER INPUT EVENT LISTENER
	document.addEventListener('keydown', userInputEvent, false);

	//USER INPUT LOGIC
	function userInputEvent(input) {

		switch (input.code) {

				case 'Space':
						pauseAnimation = !pauseAnimation;
						if (!pauseAnimation) {
								render()
						}
				break;
				case 'ArrowUp':
						speed = speed < 1 ? speed+.1 : 1;
				break;
				case "ArrowDown":
						speed = speed > .2 ? speed-.1 : .2;
		}

		
		
	}

	//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
		context.translate(width/4, height/2)   
		context.rotate(Math.PI/2)

	//ANIMAITON CYCLE

				render()

				function render() {
				
				while (time < 209) {
						time+=.2
						pixles = [];
						calculate( 1)
						calculate( 2)
						renderPix()
				}
				time = 4.9;
				seed1-=.007
				seed2-=.007

				if (!pauseAnimation) {
						setTimeout(window.requestAnimationFrame, 0, render)
				}

			}

function renderPix() {
    pixles.forEach( p => {
        context.fillStyle = `hsl(${p.color}, 40%, ${p.light}%)`;                
        context.beginPath()
        context.rect(p.xPos,p.yPos-viewHeight,1,1)
        context.rect(p.xPos,-p.yPos,1,1)
        context.fill()   
    });
}

function calculate(num) {
    // transX = nRes == 77 ? s/30 : 0,

    const 
    s = -time,
    nRes = time,
    seed = num === 1 ? seed1 : seed2;
    
    let 
    xCount = 0;

    for (let x = 0; x < viewWidth; x++) {
        let yCount = 0;

        for (let y = 0; y < viewHeight; y++) {
            const
            offWidth = num === 1 ? width*2.7-s*2 : width*2.7+s/5,
            offHeight =  num === 1 ? height*2.7-s*2 : height*2.7+s,
            
            offX = (mapNumber(nRes, 12+(time*Math.abs(x/100))/1.4, timeMax, 0, offWidth)/nRes/4.2),
            offY = (mapNumber(nRes, (1+time/400)*(1+y*x/time*.1), timeMax, 0,offHeight)/nRes/1.2),
            noiseX = ((xCount*10)/(nRes*3))+offX+seed,
            noiseY = ((yCount*10)/(nRes*19.7))+offY+seed,
            divid = time/1.4 < 63 ? time/1.4 : 63,
            light = ((Math.abs((Noise(noiseX, noiseY)*divid )) % divid)+(nRes/5.5)+5)-y/23+15;

            if (light > 5) {
                const 
                color = (Math.abs((Noise(noiseX, noiseY) ))*Math.pow(divid,1.92))+s/3-127+y,
                xPos = num === 1 ? x-time*3.5+20 : (-time*3.5+20)+(time*4-20)*3.5/2,
                yPos = y-viewHeight/2;
                
                pixles.push({xPos: xPos, yPos: -yPos, color: color, light: light})
            }

            yCount++
            
        }

        xCount++
        
    }


}

function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};