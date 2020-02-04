//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 30;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas


      context.translate(width/2, height/2);
      

for (let i = 0; i < 100; i++) {

    context.strokeStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    

    //make turn

    context.rotate((2 * Math.random()) + 1)

    //movment
    let forwardMove = Math.random() * 50;

    context.beginPath()
    context.moveTo(0,0);
    context.lineTo(0, forwardMove);
    context.stroke()

    context.translate(0, forwardMove)
    
}