//fractal tree animation

const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = 1700,
    height = canvas.height = 900,

    slider = document.getElementById('slider'),
    txtbox = document.getElementById('userangle');

ctx.translate(width/2, height);

canvas.style.background = "darkgrey";
ctx.strokeStyle = "white";

ctx.beginPath();
ctx.moveTo(0,100);
ctx.lineTo(0,0);
ctx.stroke();

let startLength = 300,
branchAngle = Math.PI / 7;

document.getElementById('submit').addEventListener('click', create_uTree);


function create_tree(angle, length) { //recersive fractal tree function
    //first a line is created to be the trunk. each branch will be a new 'trunk'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -length)
    ctx.stroke()

    ctx.translate(0, -length);
    length *= .67;

    if(length > 3) { //if the branch length is still large enough two more branches will be appended to the trunk
    //saving position before right branch is made
    ctx.save()
    ctx.rotate(angle)
    create_tree(angle, length); //the right branch is created all the way down before the left side will continue
    
    ctx.restore()
    ///////////////
    
    //////////////
    ctx.save()

    ctx.rotate(-angle)
    create_tree(-angle, length);
    ctx.restore()

    
    }

}

function create_uTree() {
    //user input is by division of pi to get an angle of rotation for each branch
    let userAngle = parseInt(txtbox.value);

    radAngle = (Math.PI * userAngle) / 180;

    clear()
    ctx.save()
    // ctx.translate(0,startLength) //uncomment if using line 76
    create_tree(radAngle, startLength);
    ctx.restore()
    console.log("user angle: " + userAngle);

}

slider.oninput = () => {

    let userAngle = slider.value;
    
    txtbox.value = "";
    txtbox.placeholder = userAngle;

    radAngle = (Math.PI * userAngle) / 180;

    clear()
    ctx.save()
    // ctx.translate(0,startLength) //uncomment if using line 76
    create_tree(radAngle, startLength);
    ctx.restore()
    console.log("user angle: " + userAngle);

}

function clear() { 
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}




// create_tree(branchAngle, startLength); //creates a tree before user input is given
