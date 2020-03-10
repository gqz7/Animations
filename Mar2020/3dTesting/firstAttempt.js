
//trying to figure out myself how to create random points that exclude a circle in the center of the screen with a given radius

let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      x = canvas.x = window.innerx,
      y = canvas.y = window.innery;

let threeDimensionalObjs = [];


for (let i = 0; i < 10; i++) {
    
    create_a_square(i*100, i*100, i*100);
    
}

console.log(threeDimensionalObjs);


    //   render()
    //   function render() {

    //       scale_from_center()
    //     //   clearFullScreen()

    //     //   rotate_about_the_center()

    //       ranCircle()


    //       setTimeout(window.requestAnimationFrame, 30, render)
    //   }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.x, canvas.y);
        context.restore();
        
    }


    function create_a_square(x,y,z) {

        let tempX = x,
            tempY = y,
            tempZ = z,
            name = 'square';

        const obj = {
            xPos: tempX,
            yPos: tempY,
            zPos: tempZ,
            name: name
        };

        threeDimensionalObjs.push(obj)

    }


   