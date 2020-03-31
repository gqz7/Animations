//fractal triangle


let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      frames = 0,

      color = 1,

      waveNum = 0,

      waveNumInc = false,

      pointLocations = [

            p0 = {
                    x: 0, y: 0
                },
            p1 = {
                    x: 278, y: 481
                },
            p2 = {
                    x: -278, y: 481
                }
      ],

      mosPos = {
          x: width/2,
          y: height/2,

      };

    canvas.style="cursor: none";


    //   context.translate(width/2, height/2)


      render()
      function render() {


        clearFullScreen()
        frames++

        let sizelimit = 400;

        if (waveNum < 10 && waveNumInc) {
            waveNum+=.1
        } else if (waveNumInc) {
            waveNumInc = false
        } else if (!waveNumInc && waveNum > -23) {
            waveNum-=.02
        } else {
            waveNumInc = true
        }
        
        context.save()
        context.translate(mosPos.x, mosPos.y)
        fractal(p0,p1,p2, sizelimit)
        context.restore();

        setTimeout(window.requestAnimationFrame, 0, render)

      }

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

        
       function fractal(p0, p1, p2, lim) {

           color++

             Distance = Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));

        if (Distance > lim) {
            
            let pA = {
                    x: (p0.x + p1.x) / 2,
                    y: (p0.y + p1.y) / 2
                },
                pB = {
                    x: (p1.x + p2.x) / 2,
                    y: (p1.y + p2.y) / 2
                }, 
                pC = {
                    x: (p2.x + p0.x) / 2,
                    y: (p2.y + p0.y) / 2
                };

                fractal(p0, pA, pC, lim);
                fractal(pA, p1, pB, lim);
                fractal(pC, pB, p2, lim);
    
        } 

            else {

               (drawTri(p0, p1, p2));

            }

    }


    
 
    function drawTri(p0, p1, p2) {

         context.fillStyle = 'hsl(' + frames + ', 50%, 50%)';
        
        context.save()

         for (let i = frames*.1; i > 0; i-=i/100+.1) {

             light = 50-i/50;

             context.strokeStyle = `hsl( ${i*frames/100}, 50%, ${light}%)`;

            // context.translate(0, waveNum*2)

             context.beginPath(); 
            context.moveTo(p0.x *(i-1), p0.y*(i/frames));
            context.lineTo(p1.x *(i-1), p1.y/(i+(waveNum/2)));
            context.lineTo(p2.x *(i-1), p2.y/(i+(waveNum/2)));
            context.lineTo(p0.x *(i-1), p0.y*(i/frames))

            if (light > 10) {
                context.stroke()
                // context.fill();
            }
  
        }

         context.restore()   
    } 
     

    function findObjectCoords(mouseEvent) {

            let obj = document.getElementById("canvas"),
                obj_left = 0,
                obj_top = 0,
                xpos,
                ypos;

        while (obj.offsetParent)
        {
            obj_left += obj.offsetLeft;
            obj_top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        if (mouseEvent)
        {
            xpos = mouseEvent.pageX;
            ypos = mouseEvent.pageY;
        }
        
        xpos -= obj_left;
        ypos -= obj_top;
        
        mosPos.x = xpos
        mosPos.y = ypos

        console.log(xpos, ypos);
        

    }

document.getElementById("canvas").onmousemove = findObjectCoords;