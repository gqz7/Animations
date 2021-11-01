//INITIAL VARIABLE DECLERATIONS
const pi = Math.PI;

let canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    gT = 0,                                         //global time
    zT = 0,                                        //local time
    width = canvas.width = window.innerWidth,     //width of the canvas
    height = canvas.height = window.innerHeight, //height of the canvas
    size = 8.37,                                // size of each square to start
    renderPaused = false,                      //user can toggle animation
    columnCycles = 0,                         //handles if too many columns of squares have been made on a row
    rowsCycles = 0,                          //handles if too many rows of squares have been made on the grid
    startWithWhite = false,                 //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board
    originx = 0, originy = 0,              // origin points for squares, so far not minipulated much
    origin = {x: originx, y: originy},    // object that is accessed in create_square function
    squares = [],   
    angle = .1903,
    angleLim = .1903, 
    columnLimit = 33, 
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
    context.rotate(-pi/2)
    context.translate(-height/2, width/2);
    context.rotate(pi + .4)
    for (let i = 0; i < 777; i++) {
        context.scale(-1.0017,-1.0021)   
    }
    //START ANIMATION CYCLE 
    animate()

}

//event listener for user input
document.addEventListener('keydown', (evn) => {
    switch (evn.code) {
        case 'Space':
                renderPaused = !renderPaused;
            if (!renderPaused) { 
                animate()
            }
        break;
    }

}, false)
    
function animate() {
    gT+=.777
    clear()
    matrix()
    if (!renderPaused) {
        setTimeout(window.requestAnimationFrame, 0, animate)
    }
}

// FUNCTIONS

function matrix() {
    context.save()
    while ( size > 0 ) {
        size -= sizeInc;
        context.scale(-1.0016,-1.0022)
        zT+=.777
        create_grid()
        angle -= angleInc/2;
    }
    context.restore()
    zT = 0
    angle = .1973+gT/5555
    size = 8.27+gT/1000
}

function clear() { 
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function create_square(origin, c) {
    context.fillStyle 
    = startWithWhite 
    ? 'hsl(' + (zT*1.5-c*7-230-gT*5) + ', 100%, 72%)' 
    : 'black' 
    startWithWhite = !startWithWhite;
    context.rotate(angle);
    context.beginPath();
    context.rect(origin.x, origin.y, size, size)
    context.fill();
}

function create_row(){

    while (columnCycles < columnLimit) {
        create_square(origin, columnCycles);
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
    // context.translate(0,size/10*(1+time/1000));

}