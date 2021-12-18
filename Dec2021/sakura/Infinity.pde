float infinityVar = 1;
float globalAngl = .33;
class Infinity {

    int columnCycles = 0;
    int rowsCycles = 0;    
    int columnLimit = 18;
    int rowLimit = 8;
    float originX = 0;
    float originY = 0;
    float oSize = 7.77;
    float size = oSize;
    boolean isWhite = false;
    int gridNum = 0;
    int gnMax = 100;
    float angle = 0;//.1903;
    float angleLim = .1903; 
    float sizeInc = .01;
    float angleInc = size/17700;

    void render () {
        noStroke();
        
        createInfinity3DFlower();

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

    void createInfinity3DFlower() {
        push();
            rotateX(PI/2);
            // rotateY(frames/10000);
            // rotateX(-frames/1000);
            // rotateZ(frames/444);
            float petalLim = 6;
            for (int i = 0; i < petalLim; ++i) {
                push();
                    // rotateZ(PI/2);
                    rotateX(PI/2);
                    // rotateY(PI/60);
                    createInfinity3D();    
                pop();
                rotateY(PI*2/petalLim);
            }
        pop();
    }

    void createInfinity3D() {
        push();

        // for (int i = 0; i < 888; i++) {
        //     scale(.999,.9991);
        // }
        scale(.0025,.0025);

        while ( size > 0 ) {
            float sclX = gridNum < gnMax *.75 ? map(gridNum, 0, gnMax*.75, -1.015, -1.0023) : map(gridNum, gnMax*.75, gnMax, -1.0023, -1.0033);
            float sclY = gridNum < gnMax *.75 ? map(gridNum, 0, gnMax*.75, -1.0099, -1.0027) : map(gridNum, gnMax*.75, gnMax, -1.0027, -1.0037);
            scale(sclX, sclY); //-1.0050
                
            push();
                // rotateZ( map(gridNum, 0, gnMax, 0, PI/2 ) );
                // float zTrans =  gridNum < gnMax / 2 ? map(gridNum, 0, gnMax/2, sizeInc*gridNum, 0) : map(gridNum, gnMax/2, gnMax, 0, sizeInc*gridNum);
                translate(0, 0, sizeInc * gridNum * .88);
                size -= sizeInc;
                gridNum++;
                createGrid();
            pop();
        }
        pop();
        gnMax = gridNum;
        gridNum = 0;
        
        angle = map(radius, 90, 5, .22, .33);//.1903;// + frames/10 - angleInc/1;
        size = oSize;// + frames / 1000;

    }


    void createGrid() {
        
        push();

        translate(0,size);
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

            rotate(angle);
            translate(size, 0);
            columnCycles++;
            createSquare();
        }
        columnCycles = 0;
    }

    void createSquare () {
        
        // rotateY(angle);
        // rotateX(angle);
        // rotateZ(angle);
        // println(rowsCycles);

        if (!isWhite) {
            fill(0);
        } else {
            float hue = abs( (float)gridNum*11-(float)columnCycles * 22  + frames*7) % 10000;
            // println(columnCycles, hue);
            fill(hue, 77, 77);
        }
        square(0,0, map(gridNum, 0, gnMax, 0, size*.9));
        // box(map(gridNum, 0, gnMax, 0, size*.9));
        
        isWhite = !isWhite;
        
    }


}
