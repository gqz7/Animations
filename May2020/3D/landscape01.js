const pi = Math.PI; //shortcut because is gets used alot

//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    radius = height/2.3,

    renderPaused = false, //user can toggle animation

    mosPos = {
        x: 1000,
        y: 1000,
    },

    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    },

    spherePoints = []; // array to contain sphere points before they are rendered

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; cursor: none; margin:auto`

    //event listener for user input
    document.addEventListener('keydown', (evn) => {

        switch (evn.code) {
            case 'Space':
                renderPaused = !renderPaused;
            
                if (!renderPaused) { 
                    render()
                }

                break;
        
        }

    }, false)

    canvas.onmousemove = findObjectCoords;
    canvas.onwheel = mouseWheelMoved;

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.strokeStyle = 'white';
   
   //ANIMATION CYCLE
     render()

      function render() {

        // console.log(frames);

        clearFullScreen() //clear the canvas of previous animation cycle

        createSphere() //render the sphere

        // context.rotate(.01)

        //counts how many frames have occured
        frames++

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }


    
    //function used to map numbers from int into a radian range
    function mapNumber (number, min1, max1, min2, max2) {
        return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
    };

    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }


    //event listener call back functions

    function mouseWheelMoved(evn) {
        
        let move = evn.deltaY * -7;

        radius = radius + move > 50 && radius + move < height/2 ? radius + move : radius;
        
    }

        function findObjectCoords(mouseEvent) {

            let obj = canvas,
                obj_left = 0,
                obj_top = 0,
                xpos,
                ypos;

        while (obj.offsetParent)
        {
            obj_left += obj.offsetLeft;
            obj_top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        if (mouseEvent)
        {
            xpos = mouseEvent.pageX;
            ypos = mouseEvent.pageY;
        }
        
        xpos -= obj_left;
        ypos -= obj_top;
        
        mosPos.x = xpos
        mosPos.y = ypos

    }

