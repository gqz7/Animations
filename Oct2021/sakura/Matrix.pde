float sizeMod = .5;

class Matrix {

    int columnCycles = 0;
    int rowsCycles = 0;    
    int columnLimit = 11;
    int rowLimit = 7;
    float originX = 0;
    float originY = 0;
    float orgSize = 6.7;
    float size = orgSize;
    boolean isWhite = false;
    int gridNum = 0;
    int maxGridNum = 137;
    float angle = 0;//.1903;
    float angleLim = .1903; 
    float sizeInc = orgSize/1111;
    float angleInc = size/17700;

    float zTransMod = 1;

    void render () {
        push();
            noStroke();    
            // for (int i = 0; i < 888; i++) {
            //     scale(-1.0016,-1.0020);
            // }
            blendMode(SCREEN);  
            // translate(size, size);

            sizeMod =  map( (float) noise.noise2(3333 - frames/1000, 4444 - frames/1000 ), -1, 1, .01, .04);

            zTransMod = 1;
            isWhite = false;
            createMatrix();
            rotateZ(PI);

            isWhite = true;
            createMatrix(); 

            zTransMod = -1;
            isWhite = false;
            rotateX(PI);
            createMatrix();

            isWhite = true;
            rotateZ(PI);
            createMatrix();


            // test();
            // temp();

            isWhite = false;
            // sizeInc = size/2000 - frames/1000000 ;
            // println(sizeInc);
        pop();
    }

    void createMatrix() {
        int c = 0;
        push();
        while ( size > .01 ) {
            // c++;
            // size /= 1.03+frames/10000;
            size = size / (1 + sizeMod);
            gridNum++;
            createGrid();
            angle -= angleInc/2;
        }
        pop();
        maxGridNum = gridNum;
        gridNum = 0;
        angle = .1903;//+frames/5555;
        size = orgSize;
        // println(c);
    }


    void createGrid() {
        
        push();
        // rotate(angle)
        float zTrans = map(size, 0, orgSize, 1, -1);
        translate(0, 0, zTrans *zTransMod);
        
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
        // translate(angle*1000, angle*1000, angle*1000);
        // rotateX(angle);
            
        if (!isWhite) {
            fill(0);
        } else {
            float hue = abs( (float)gridNum*222-(float)columnCycles * 500  + frames*12) % 10000;
            // println(columnCycles, hue);
            float alpha = map(gridNum, 0, maxGridNum+radius*3, .55, 0.11);
            fill(hue, 100, alpha*15, 1);
        }
        
        square(0,0, size);
        
        // box(size);
        
        isWhite = !isWhite;
        
    }


}
