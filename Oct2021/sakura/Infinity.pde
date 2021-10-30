class Infinity {

    int columnCycles = 0;
    int rowsCycles = 0;    
    int columnLimit = 33;
    int rowLimit = 8;
    float originX = 0;
    float originY = 0;
    float size = 5;
    boolean isWhite = false;
    int gridNum = 0;

    float angle = 0;//.1903;
    float angleLim = .1903; 
    float sizeInc = .015;
    float angleInc = size/17700;

    void render () {
        noStroke();
        
        createInfinity();
        rotateX(PI);
        createInfinity();

    }

    void createInfinity() {
        push();
        while ( size > 0 ) {
            size -= sizeInc;
            scale(-1.0016,-1.0022);
            gridNum++;
            createGrid();
            angle -= angleInc/2;
        }
        pop();
        gridNum = 0;
        angle = .1903+frames/5555;
        size = 8.37+frames/1000;
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
            float hue = abs( (float)gridNum*52-(float)columnCycles * 100  + frames*10) % 10000;
            // println(columnCycles, hue);
            fill(hue, 77, 77);
        }
        square(0,0, size);
        // box(size);
        
        isWhite = !isWhite;
        
    }


}
