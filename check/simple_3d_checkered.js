//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas
        size = 4,                                    //determins size of each square

        //logic is included to make sure columnLimit is an odd number, this will make sure each row starts will the opposite of how to previous row started
        columnLimit =  (Math.ceil(width/size) % 2 == 0) ? Math.ceil(width/size) + 1: Math.ceil(width/size),     //how many columns in the grid

        rowLimit = ((height/size) + 2),    //how many rows in the grid
        columnCycles = 0,                 //handles if too many columns of squares have been made on a row
        rowsCycles = 0,                  //handles if too many rows of squares have been made on the grid
        colorswitch = true,             //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board

        lightness = 0, //used in hsl ('hue', 'saturation', 'lightness');
        

        originx = 0, originy = 0,

        p1 = {x: originx, y: originy}, p2 = {x: size + originx, y: originy}, p3 = {x: size + originx, y: size + originy}, p4 = {x: originx, y: size + originy},
        squares = [];

        context.translate(width/3, height/2)

        //ANIMATION CYCLE
        
        //work for 30%
        columnLimit = 51;
        rowLimit = 51;

        // works for 100%
        // columnLimit = 13;
        // rowLimit = 13;
        
        animate()
        function animate() {

            //changes each new grid to start with the opposite corner
            // colorswitch = colorswitch == true ? colorswitch = false : colorswitch = true;

            time++

            size = time /70;

            set_origins()
            // clear()

            // a more cube light shape if there are 4 grids aligned corner to corner
            context.save()
            for (let i = 0; i < 4; i++) {
                create_grid()

                context.rotate(Math.PI/2)
                
            }
            context.restore()

            lightness++
            
            
            

            let xTran = size /3 ,
                yTran = size /2;
            context.translate(xTran,yTran)

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

            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.lineTo(p3.x, p3.y);
            context.lineTo(p4.x, p4.y);
            context.lineTo(p1.x,p1.y);

            if (colorswitch) {

                context.fillStyle = 'hsl(' + (200) + ', 100%,' + (-1*(lightness-122)) + '%)'; //blue
                context.fillStyle = 'black';

                context.fill();
                colorswitch = false;
            } else {

                context.fillStyle = 'hsl(' + (222) + ', 100%,' + ((lightness) - 199)+ '%)'; //orange

                context.fillStyle = 'white';

                context.fill();
                colorswitch = true;
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
