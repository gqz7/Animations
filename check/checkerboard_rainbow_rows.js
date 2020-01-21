//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        
		width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        size = 10,                      //determins size of each square
        columnLimit = ((width/size)/2), //how wide the grid is
        cycles = 0,                     //handles if too many columns of squares have been made on a row
        startWithWhite = true,          //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board
        color = 0;

        // console.log(lim);

        //ANIMATION CYCLE

        context.fillStyle = "white";

        // context.save() //saves the context at 0,0 (upper left corner) to go back to for each new line

        animate()
        function animate() {
            
            create_board()
           
            return
            // setTimeout(window.requestAnimationFrame, 10, (clear))
            // setTimeout(window.requestAnimationFrame, 0, (animate))
        }

        // FUNCTIONS

        function clear() { 
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }

        function newline() {

            context.restore()

                if (startWithWhite) {
                    
                    context.translate(-size,size);
                    
                    startWithWhite = false;
                } else {
                    context.translate(size, size);

                    startWithWhite = true;
                }

                context.save()
                cycles = 0;
                color = 10;  //this will be reset for each row that is created
            
        }

        function create_square(params) {

            context.fillStyle = 'hsl(' + (color) + ', 100%, 60%)';

            context.beginPath()
            context.rect(0,0,size,size);
            context.fill()
            context.translate(size * 2, 0);

            color += 3;
        }

        function create_board() { 

            context.save()

            let rowLimit = ((height/size));

            while (rowLimit > 0) {

                cycles++

                console.log(cycles);

                if (cycles > columnLimit) {
                    rowLimit--
                    
                    newline()
        
                } else {

                    create_square()

                }
                
                
            }

            // context.restore()

        }


}