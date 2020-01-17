window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas

        gridPositions = [];


        animate()
        function animate() {
            time++
            // clear()
            // console.log(time);
            
       
            setTimeout(window.requestAnimationFrame, 60, (animate));
        }


        function clear() { 
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
             
        }

        let size = 100,

            p1 = {x: 0, y: 0},

            p2 = {x: size, y: 0},

            p3 = {x: size, y: size},

            p4 = {x: size, y: 0};


        let Square1 = new Square;

        Square1.create_new();


        class Square {

            create_new(p1, p2, p3, p4){

                this.p1 = {x:p1.x, y:p1.y},
                this.p2 = {x:p2.x, y:p2.y},
                this.p3 = {x:p3.x, y:p3.y},
                this.p4 = {x:p4.x, y:p4.y};

                gridPositions.push(Square);

                console.log(gridPosition);
                
            }

            show(){

                context.beginPath();
                context.moveTo(p1.x, p1.y);
                context.lineTo(p2.x, p2.y);
                context.lineTo(p3.x, p3.y);
                context.lineTo(p4.x, p4.y);
                context.lineTo(p1.x,p1.y);

                if (startWithWhite) {

                    context.fillStyle = 'white';
                    context.fill();
                    startWithWhite = false;
                } else {

                    context.fillStyle = 'black';
                    context.fill();
                    startWithWhite = true;
                }
            }
        }


}