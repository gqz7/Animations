//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

    const slider = document.getElementById('slider');

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas
        size = 48.1,                                    //determins size of each square

        //logic is included to make sure columnLimit is an odd number, this will make sure each row starts will the opposite of how to previous row started
        columnLimit =  (Math.ceil(width/size) % 2 == 0) ? Math.ceil(width/size) + 1: Math.ceil(width/size),     //how many columns in the grid

        rowLimit = ((height/size) + 2),    //how many rows in the grid
        columnCycles = 0,                 //handles if too many columns of squares have been made on a row
        rowsCycles = 0,                  //handles if too many rows of squares have been made on the grid
        startWithWhite = false,          //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board

        originx = 0, originy = 0,

        p1 = {x: originx, y: originy}, p2 = {x: size + originx, y: originy}, p3 = {x: size + originx, y: size + originy}, p4 = {x: originx, y: size + originy},
        squares = [];

        //BEFORE ANIMATION CYCLE

        let angle = 0, angleSwitch = true, angleLim = .1903, color = false, lightness = 0;

        create_grid()

        color = true;

        size = 0;

        columnLimit = 33;
        rowLimit = 8;

        context.rotate(-Math.PI/2)
        

        context.translate(-height/2, width/2);

        context.rotate(Math.PI + .4)

        // context.translate(-width/2, height);

        let sizeInc = .01;

        //ANIMATION CYCLE
        
        animate()
        function animate() {

            //increment values
            lightness+=size/50

            console.log(lightness);
            

            size += sizeInc;

            time++

            //scale and create the image
            context.scale(-1.0016,-1.0022)

            set_origins()
            create_grid()

            //logic for how the animaiton is going to change
            let angleInc = size/17700;
            
            if (angle < angleLim && angleSwitch == true) {

                // console.log('up');
                

                angle += angleInc;
                
            } else if (size < 0) {

                return

            } else if (angle >= angleLim) {
                // console.log('toplim');

                sizeInc*=-2;
                angleLim = 5
                
                angleSwitch = false;
                angle = angle - angleInc;
            } else if (angle > -angleLim && angleSwitch == false) {
                // console.log('dwn');

                lightness+=.05
                
                angle -= angleInc/2;

            } else if (angle <= -angleLim && angleSwitch == false) {

                // console.log('btmlim');
                angle = angle + angleInc;
                angleSwitch = true;
                
            }

            setTimeout(window.requestAnimationFrame, 0, (animate));
        }

        // FUNCTIONS

        function set_origins() {
            p1 = {x: originx, y: originy};
            p2 = {x: size + originx, y: originy};
            p3 = {x: size + originx, y: size + originy};
            p4 = {x: originx, y: size + originy}
        }


        function create_square(p1,p2,p3,p4) {
            
            // context.save()

            context.rotate(angle);

            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.lineTo(p3.x, p3.y);
            context.lineTo(p4.x, p4.y);
            context.lineTo(p1.x,p1.y);

            if (startWithWhite) {

                if (color) {
                    context.fillStyle = 'hsl(' + (169) + ', 100%,' + (-1*(lightness-122)) + '%)';
                } else {
                    context.fillStyle = 'white';
                }

                context.fill();
                startWithWhite = false;
            } else {

                context.fillStyle = 'hsl(' + (333) + ', 77%,' + (lightness-27) + '%)';

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

            console.log('start');
            

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