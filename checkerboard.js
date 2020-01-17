//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas
        size = 100,                                    //determins size of each square

        //logic is included to make sure columnLimit is an odd number, this will make sure each row starts will the opposite of how to previous row started
        columnLimit =  (Math.ceil(width/size) % 2 == 0) ? Math.ceil(width/size) + 1: Math.ceil(width/size),     //how many columns in the grid

        rowLimit = ((height/size) + 2),    //how many rows in the grid
        columnCycles = 0,                 //handles if too many columns of squares have been made on a row
        rowsCycles = 0,                  //handles if too many rows of squares have been made on the grid
        startWithWhite = true,          //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board
        originx = 333, originy = 333,  //if these vars' values are modified the grid starting position will also be modified 

        p1 = {x: originx, y: originy}, p2 = {x: size + originx, y: originy}, p3 = {x: size + originx, y: size + originy}, p4 = {x: originx, y: size + originy},
        squares = [];

        //Animation Modifiers 

        // ---Sets the size of the grid, else the whole screen wil be used
        columnLimit += 42;
        rowLimit += 70;

        // ---Translates the top left corner of the grid,
        // any orign point that is set above 0 will allow a window into the other quadrents
        originx = originx;
        originy = originy;
        //  the area of your window into the second quadrent is (originx * originy) as long as they are both positive values
        //example: 333 * 333 = 110,889 pixeles available in the second quadrent
        //         width * 333 = pixeles available in third quadrent
        //          height * 333 = pixeles avaiable in the first quadrent

        //The height and width are currently set to 'inner.Width/Height(respectively)' 
        // context.translate(500,200);

        //ANIMATION CYCLE
        animate()
        function animate() {
            time++

            // clear() only uncomment if you want to see the current state the created grid, on each frame. 
            //each frame will stay painted onto the canvas until a clear function is called
            
            create_grid()

            console.log(p1,p2,p3,p4);
            

            // return if you uncomment this only the first grid will be made
            size-=.314;
            setTimeout(window.requestAnimationFrame, 30, (animate)); //number of milliseconds wiat period between each frame
        }

        // FUNCTIONS

        function clear() { 

            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }

        //CREATING GRID FUNCTIONS 3 parts - create square, row, grid
        //draw square onto canvas then fill
        function create_square() { //this function creates the square line by line. and will then fill the shape with either white or black
        
            context.beginPath();

            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.lineTo(p3.x, p3.y);
            context.lineTo(p4.x, p4.y);
            context.lineTo(p1.x,p1.y);

            //this function uses a boolean switch between white and black every time

            //YOU CAN CHANGE THE COLORS BY PUTTING A COLOR NAME INTO THE SINGLE QUOTES :)
            // ie. 'Aquamarine', 'LightGoldenRodYellow', 'Fuchsia'
            if (startWithWhite) {
                context.fillStyle = 'white'; // find all the colors @ w3schools.com/colors/colors_names.asp 
                context.fill();
                startWithWhite = false;

            } else {
                context.fillStyle = 'black';
                context.fill();
                startWithWhite = true;
            }
            
        }

        function create_row(){

            while (columnCycles < columnLimit) { //it will contiue to make new square in a perfect line until it has reached the column limit
                //columnLimit must always be odd inorder for the checkerboard pattern to exist

                create_square();
                context.translate(size, 0);
                columnCycles++

            }

            columnCycles = 0
            
        }

        function create_grid() { //loops until the given number of rows have been created

            startWithWhite = true

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