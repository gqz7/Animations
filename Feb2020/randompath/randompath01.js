//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 30;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight;   //height of the canvas


      context.translate(width/2, height/2);

setInterval(() => {

    console.log('anotherone');
    clear()

    context.save()
    create_random_mess()
    context.restore()

    
    
}, 3000)
      

function clear() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}


function create_random_mess() {

    for (let i = 0; i < 10000; i++) {

        context.strokeStyle = 'hsl(' + i/3 + ', 100%, 70%)';
        context.fillStyle = 'hsl(' + i/3 + ', 100%, 50%)';
    
        let circleSize = 3+ i/1000
        
        context.beginPath()
        context.arc(0,0, circleSize, 0, Math.PI * 2);   
        context.fill()
    
        //make turn
    
        context.rotate(2 * Math.random())
    
        //movment
        let forwardMove = Math.random() * 100;
    
        context.beginPath()
        context.moveTo(0,0);
        context.lineTo(0, forwardMove);
        context.stroke()
    
        context.translate(0, forwardMove)
    
        
    }
    
    
}