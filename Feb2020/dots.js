//INITIAL VARIABLE DECLERATIONS

const slider = document.getElementById('slider');

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    time = 0;
    
const width = canvas.width = window.innerWidth,       //width of the canvas
      height = canvas.height = window.innerHeight,   //height of the canvas
      size = 48.1;                                  //determins size of each square

   
    //ANIMATION CYCLE
    
    animate()
    function animate() {


        setTimeout(window.requestAnimationFrame, 0, (animate));
    }

    // FUNCTIONS
