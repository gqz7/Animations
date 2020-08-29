//INITIAL VARIABLE DECLERATIONS

let canvas = document.createElement("canvas"),
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
    startWithWhite = false,         //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board
    originx = 0, originy = 0,
    p1 = {x: originx, y: originy}, 
    p2 = {x: size + originx, y: originy}, 
    p3 = {x: size + originx, y: size + originy}, 
    p4 = {x: originx, y: size + originy},
    squares = [],
    angle = .1903, 
    angleSwitch = false, 
    angleLim = .1903, 
    color = true,
    size = 8.37,
    columnLimit = 33,
    rowLimit = 8,
    sizeInc = .021;

window.onload = function() {

        canvas.style = 
        `display: block;
        position: static;
        top: 0px;
        left: 0px;
        cursor: none;
        margin:auto;
        background-color: black`;
        document.body.style = `margin: 0`;
        document.body.appendChild(canvas);

        //BEFORE ANIMATION CYCLE
        context.rotate(-Math.PI/2)
        context.translate(-height/2, width/2);
        context.rotate(Math.PI + .4)

        for (let i = 0; i < 821; i++) {
            
            context.scale(-1.0016,-1.0022)
            
        }

        //ANIMATION CYCLE START

        animate()
}

function animate() {

    size -= sizeInc;
    context.scale(-1.0016,-1.0022)
    context.restore()

    time++

    set_origins()
    create_grid()
    
    let angleInc = size/17700;
    
   if (size > 0) {
        
        angle -= angleInc/2;

   } else {
       return
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

function set_origins() {
    p1 = {x: originx, y: originy};
    p2 = {x: size + originx, y: originy};
    p3 = {x: size + originx, y: size + originy};
    p4 = {x: originx, y: size + originy}
}


function create_square(p1,p2,p3,p4, c) {
    
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
            context.fillStyle = 'hsl(' + (time*1.5-c*7-230) + ', 100%, 67%)';
        } else {
            context.fillStyle = 'white';
        }

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
        create_square(p1,p2,p3,p4, columnCycles);
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