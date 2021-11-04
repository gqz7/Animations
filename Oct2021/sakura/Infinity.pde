class Infinity {

    int columnCycles = 0;
    int rowsCycles = 0;    
    int columnLimit = 18;
    int rowLimit = 8;
    float originX = 0;
    float originY = 0;
    float oSize = 8.37;
    float size = oSize;
    boolean isWhite = true;
    int gridNum = 0;
    int gnMax = 100;
    float angle = 0;//.1903;
    float angleLim = .1903; 
    float sizeInc = .015;
    float angleInc = size/17700;

    void render () {
        noStroke();
        
        
        // createInfinity();
        // rotateX(PI);
        // createInfinity();


        createInfinity3D();

    }

    // void createInfinity() {
    //     push();
    //     while ( size > 0 ) {
    //         size -= sizeInc;
    //         // scale(-1.0016,-1.0022);
    //         gridNum++;
    //         createGrid();
    //         angle -= angleInc/2;
    //     }
    //     pop();
    //     gridNum = 0;
    //     angle = .1903+frames/5555;
    //     size = oSize + frames/1000;
    // }

    void createInfinity3D() {
        push();

        // for (int i = 0; i < 888; i++) {
        //     scale(.999,.9991);
        // }
        scale(.07,.07);

        while ( size > 0 ) {
            scale(-1.0016,-1.0029);
                
            push();
                rotateZ( map(gridNum, 0, gnMax, 0, PI/2 ) );
                translate(0, 0, sizeInc * gridNum);
                size -= sizeInc;
                gridNum++;
                createGrid();
            pop();
        }
        pop();
        gnMax = gridNum;
        gridNum = 0;
        
        angle = 0;//.1903;// + frames/10 - angleInc/1;
        size = oSize;// + frames / 1000;

    }


    void createGrid() {
        
        push();

        while (rowsCycles < rowLimit) {
            push();
            createRow();
            pop();
            translate(0,size);
            rowsCycles++;
        }
        rowsCycles = 0;

        pop();

    }

    void createRow(){
        // rotateZ(angle);
        while (columnCycles < columnLimit) {
            createSquare();
            translate(size, 0);
            columnCycles++;
        }
        columnCycles = 0;
    }

    void createSquare () {
        
        // rotateY(angle);
        // rotateX(angle);
        // rotateX(angle);
        if (!isWhite) {
            fill(0);
        } else {
            float hue = abs( (float)gridNum*25-(float)columnCycles * 100  + frames*10) % 10000;
            // println(columnCycles, hue);
            fill(hue, 77, 77);
        }
        // square(0,0, size);
        box(size);
        
        isWhite = !isWhite;
        
    }


}
