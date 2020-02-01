//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas
        size = 10,                                    //determins size of each square

        //logic is included to make sure columnLimit is an odd number, this will make sure each row starts will the opposite of how to previous row started
        columnLimit =  (Math.ceil(width/size) % 2 == 0) ? Math.ceil(width/size) + 1: Math.ceil(width/size),     //how many columns in the grid

        rowLimit = ((height/size) + 2),    //how many rows in the grid
        columnCycles = 0,                 //handles if too many columns of squares have been made on a row
        rowsCycles = 0,                  //handles if too many rows of squares have been made on the grid
        startWithWhite = true,          //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board

        lightness = 0, //used in hsl ('hue', 'saturation', 'lightness');
        

        originx = 0, originy = 0,

        p1 = {x: originx, y: originy}, p2 = {x: size + originx, y: originy}, p3 = {x: size + originx, y: size + originy}, p4 = {x: originx, y: size + originy},
        squares = [];

        context.translate(width/2, height/2)

        //ANIMATION CYCLE
        
        //work for 30%
        // columnLimit -= 290;
        // rowLimit -= 140;

        // works for 100%
        columnLimit -= 82;
        rowLimit -= 34;
        
        animate()
        function animate() {
            time++
            // clear()
            // 


            create_grid()

            context.rotate(Math.PI/2)

            create_grid()

            context.rotate(Math.PI/2)

            lightness++
            
            
            context.scale(1.01,1.037);

            size += .4;
            context.translate(size*2,size)


            if (time > 100) {
                context.rotate(.01)
            } else {
                console.log(time);
                
            }
       
            setTimeout(window.requestAnimationFrame, .20, (animate));
        }

        // FUNCTIONS

        function clear() { 
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }


        function create_square(p1,p2,p3,p4) {

            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.lineTo(p3.x, p3.y);
            context.lineTo(p4.x, p4.y);
            context.lineTo(p1.x,p1.y);

            if (startWithWhite) {

                context.fillStyle = 'hsl(' + (200) + ', 100%,' + (-1*(lightness-122)) + '%)';
                

                context.fill();
                startWithWhite = false;
            } else {

                context.fillStyle = 'hsl(' + (30) + ', 100%,' + lightness+ '%)';

                context.fill();
                startWithWhite = true;
            }

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
