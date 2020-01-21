window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas

        gridPositions = [], startWithWhite = true;


        // context.translate(width/2, height/2);

        

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        class Square {

            constructor(p1, p2, p3, p4){

                this.p1 = {x:p1.x, y:p1.y},
                this.p2 = {x:p2.x, y:p2.y},
                this.p3 = {x:p3.x, y:p3.y},
                this.p4 = {x:p4.x, y:p4.y};

                // gridPositions.push({p1});

                // console.log(gridPosition);
                
            }

            show(){

                // console.log(this.p1, this.p3, this.p2, this.p4 );
                
                if (startWithWhite) {

                    context.fillStyle = 'white';
                    startWithWhite = false;
                } else {

                    context.fillStyle = 'black';
                
                    startWithWhite = true;
                }

                this.create_square()

                
            }

            create_square(){

                context.beginPath();
                context.moveTo(this.p1.x, this.p1.y);
                context.lineTo(this.p2.x, this.p2.y);
                context.lineTo(this.p3.x, this.p3.y);
                context.lineTo(this.p4.x, this.p4.y);
                context.lineTo(this.p1.x, this.p1.y);
                
                context.fill();

            }
        }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let size = 100, mod = 0;

            originp1 = {x:mod + 0, y:mod + 0},

            originp2 = {x: mod + size, y:mod + 0},

            originp3 = {x: mod + size, y: mod + size},

            originp4 = {x:mod + 0, y: mod + size};
            
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        let Square1 = new Square(originp1,originp2,originp3,originp4);

        // console.log(Square1);

        Square1.show()

        gridPositions.push(Square1)

        console.log(gridPositions);

        for (let i = 0; i < 5; i++) {
            console.log(originp1,originp2,originp3,originp4);
            originp1.x++
            originp1.y++
            
        }


        // while (originp1.y < height) {


        //     while (originp1.x < width) {
        //         let newSquare = new Square(originp1,originp2,originp3,originp4);

        //         newSquare.show()

        //         or
        //     }
            
        // }
        
      

}


  // animate()
        // function animate() {
        //     time++
        //     // clear()
        //     // console.log(time);
            
       
        //     setTimeout(window.requestAnimationFrame, 60, (animate));
        // }


        // function clear() { 
        //     context.save();
        //     context.setTransform(1, 0, 0, 1, 0, 0);
        //     context.clearRect(0, 0, canvas.width, canvas.height);
        //     context.restore();
             
        // }



        //TEST
        // context.strokeStyle  = 'white';
        // context.beginPath()
        // context.moveTo(0,0)
        // context.lineTo(width,height)
        // context.stroke()