//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

    const slider = document.getElementById('slider');

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas
        size = .1,                                    //determins size of each square

        //logic is included to make sure columnLimit is an odd number, this will make sure each row starts will the opposite of how to previous row started
        columnLimit =  (Math.ceil(width/size) % 2 == 0) ? Math.ceil(width/size) + 1: Math.ceil(width/size),     //how many columns in the grid

        rowLimit = ((height/size) + 2),    //how many rows in the grid
        columnCycles = 0,                 //handles if too many columns of squares have been made on a row
        rowsCycles = 0,                  //handles if too many rows of squares have been made on the grid
        startWithWhite = true,          //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board

        originx = 0, originy = 0,

        p1 = {x: originx, y: originy}, p2 = {x: size + originx, y: originy}, p3 = {x: size + originx, y: size + originy}, p4 = {x: originx, y: size + originy},
        squares = [];

        //ANIMATION CYCLE
        
        //work for 30%
        // columnLimit -= 290;
        // rowLimit -= 140;

        // works for 100%
        // columnLimit -= 82;
        // rowLimit -= 33;

        columnLimit = 33;
        rowLimit = 8;
        

        let angle = 0, angleSwitch = true, angleLim = .2, next = false;

        context.rotate(-Math.PI/2)

        context.translate(-height, width -10)

        // context.translate(-width/2, height);

        let sizeInc = .01;
        
        animate()
        function animate() {

            // angle = slider.value;

            // console.log(angle);
            


            time++
            // clear()
            // 
            context.translate(.3,-size/7);
            create_grid()
            
            // context.scale(1.01,1.01);

            size += sizeInc;
            set_origins()
            // context.translate(-size/6,-size)

            let angleInc = size/16000;
            
            if (angle < angleLim && angleSwitch == true) {

                // console.log('up', angle);
                

                angle += angleInc;
                
            } else if (size < 0) {

                console.log('last');

                context.rotate(Math.PI)

                next = true

                sizeInc*=-1.02;
                rowLimit += 22;
                columnLimit -= 10;

            } else if (angle > -angleLim && angleSwitch == false && next == true) {
                
                // console.log('final',angleLim);
                context.rotate(-.3)

                // context.translate(1,2)
                
                angle -= angleInc*2;

            } else if (angle >= angleLim) {
                console.log('toplim');

                sizeInc*=-2;
                angleLim = 5
                
                angleSwitch = false;
                angle = angle - angleInc;
            } else if (angle > -angleLim && angleSwitch == false) {
                console.log('dwn');
                
                angle -= angleInc/2;

            } else if (angle <= -angleLim && angleSwitch == false) {

                return 
                console.log('btmlim');
                angle = angle + angleInc;
                angleSwitch = true;
                
            }


            // if (time > 400) {
            //     return
            // } else {
            //     console.log(time);
                
            // }
       
            setTimeout(window.requestAnimationFrame, 0, (animate));
        }

        // FUNCTIONS

        function clear() { 
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }

        function set_origins() {
            p1 = {x: originx, y: originy};
            p2 = {x: size + originx, y: originy};
            p3 = {x: size + originx, y: size + originy};
            p4 = {x: originx, y: size + originy}
        }


        function create_square(p1,p2,p3,p4) {
            
            // context.save()

            // context.translate((p1.x + p3.x)/2,(p1.y + p3.y)/2);
            // context.translate(p3.x,p3.y);
            context.rotate(angle)
            

            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.lineTo(p3.x, p3.y);
            context.lineTo(p4.x, p4.y);
            context.lineTo(p1.x,p1.y);

            

            if (startWithWhite) {

                // context.fillStyle = 'white';
                context.fillStyle = 'hsl(' + (time/3) + ', 100%, 70%)';

                context.fill();
                startWithWhite = false;
            } else {

                context.fillStyle = 'black';

                context.fill();
                startWithWhite = true;
            }

            // context.restore()

        }

        function create_row(){
            

            while (columnCycles < columnLimit) {
                create_square(p1,p2,p3,p4);
                context.translate(size, 0);
                columnCycles++
            }

            columnCycles = 0
            
        }

        function create_grid() {

            context.save()

            while (rowsCycles < rowLimit) {
                context.save()
                create_row()
                context.restore()
                context.translate(0,size);
                rowsCycles++
            }
            rowsCycles = 0;


            context.restore()

        }

       


}

//a test to see if the context is in the right postion
// context.strokeStyle = 'white';
//             context.beginPath()
//             context.moveTo(0,0);
//             context.lineTo(width,height);
            
//             context.stroke()