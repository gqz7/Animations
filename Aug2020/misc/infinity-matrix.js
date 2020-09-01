//INITIAL VARIABLE DECLERATIONS

let canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    gT = 0, //global time
    zT = 0, //local time
    
    width = canvas.width = window.innerWidth,       //width of the canvas
    height = canvas.height = window.innerHeight,   //height of the canvas
    size = 8.37,

    

    // rowLimit = ((height/size) + 2),    //how many rows in the grid
    columnCycles = 0,                 //handles if too many columns of squares have been made on a row
    rowsCycles = 0,                  //handles if too many rows of squares have been made on the grid
    startWithWhite = false,         //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board
    originx = 0, originy = 0,
    p1 = {x: originx, y: originy}, 
    squares = [],
    angle = .1903, 
    angleSwitch = false, 
    angleLim = .1903, 
    color = true,
    columnLimit = 33, // (Math.ceil(width/size) % 2 == 0) ? Math.ceil(width/size) + 1: Math.ceil(width/size),     //how many columns in the grid // logic is included to make sure columnLimit is an odd number, this will make sure each row starts will the opposite of how to previous row started
    rowLimit = 8,
    sizeInc = .021;
let angleInc = size/17700;
    
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
    gT++
    matrix()
    setTimeout(window.requestAnimationFrame, 0, (animate));
}

// FUNCTIONS

function matrix() {
    
    context.save()
    while ( size > 0 ) {

        size -= sizeInc;
        context.scale(-1.0016,-1.0022)
        
        zT++
        
        create_grid()
        
        angle -= angleInc/2;
    }
    context.restore()

    zT = 0
    angle = .1903
    angleSwitch = false
    angleLim = .1903
    color = true
    size = 8.37
    columnLimit = 33
    rowLimit = 8
    sizeInc = .021
}

function clear() { 
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function create_square(p1, c) {
    context.rotate(angle);

    context.beginPath();
    context.rect(p1.x, p1.y, size, size)

    if (startWithWhite) {
        if (color) {
            context.fillStyle = 'hsl(' + (zT*1.5-c*7-230+gT*5) + ', 100%, 67%)';
        } else {
            context.fillStyle = 'white';
        }
    } else {        
        context.fillStyle = 'black';        
    }
    startWithWhite = !startWithWhite;
    context.fill();
}

function create_row(){
    

    while (columnCycles < columnLimit) {
        create_square(p1, columnCycles);
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