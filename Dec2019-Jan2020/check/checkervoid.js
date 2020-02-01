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
        colorswitch = true,             //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board

        lightness = 0, //used in hsl ('hue', 'saturation', 'lightness');

        originx = 0, originy = 0,

        p1 = {x: originx, y: originy}, p2 = {x: size + originx, y: originy}, p3 = {x: size + originx, y: size + originy}, p4 = {x: originx, y: size + originy},
        squares = [];

        context.translate(width/2, height/2)

        //ANIMATION CYCLE
    
        // works for 100%
        columnLimit = 23;
        rowLimit = 23;
        
        animate()
        function animate() {

            //stops the animation once the size reaches 0
            if (size < 0) {
                console.log('animation complete');
                return
            }

            time++
            size+=.3;
            lightness++
   
            context.save()
            for (let i = 0; i < 2; i++) {
                create_grid()

                context.rotate(Math.PI/2)
                
            }

            context.translate(0,300)

            for (let i = 0; i < 2; i++) {
                create_grid()

                context.rotate(Math.PI/2)
                
            }
            context.restore()
            
            
            if (time < 257) {
                context.scale(1.01,.999);
            } else {
                size-=.8
                columnLimit = 3;
                rowLimit = 3;
                context.scale(.990,-1.01);
            }
       
            setTimeout(window.requestAnimationFrame, 0, (animate));
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

            if (colorswitch) {

                context.fillStyle = 'hsl(' + (100) + ', 100%,' + (-1*(lightness-122)) + '%)'; //grn
                // context.fillStyle = 'black';

                context.fill();
                colorswitch = false;
            } else {

                context.fillStyle = 'hsl(' + (0) + ', 50%,' + (lightness * .5)+ '%)'; //pnk

                // context.fillStyle = 'white';

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
