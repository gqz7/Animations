class Matrix {

    int columnCycles = 0;
    int rowsCycles = 0;    
    int columnLimit = 11;
    int rowLimit = 7;
    float originX = 0;
    float originY = 0;
    float orgSize = .1;
    float size = orgSize;
    boolean isWhite = false;
    int gridNum = 0;

    float angle = 0;//.1903;
    float angleLim = .1903; 
    float sizeInc = orgSize/1111;
    float angleInc = size/17700;

    void render () {
        noStroke();    
        // for (int i = 0; i < 821; i++) {
        //     scale(-1.0016,-1.0022);
        // }
        // blendMode(ADD);  
        // translate(size, size);
        // createMatrix();
        // rotateX(PI);
        // rotateY(PI);
        // translate(size, size);
        // createMatrix(); 


        // test();
        temp();

        isWhite = false;
        // sizeInc = size/2000 - frames/1000000 ;
        // println(sizeInc);
    }

    void test (){
        
        while ( size > 0) {

            rotate(angle);
            createGrid(); 

            size-=sizeInc;
            angle -= angleInc/2;
        }
    }

    void createMatrix() {
        int c = 0;
        push();
        while ( c < 1000 ) {
            c++;
            // size -= sizeInc;
            // scale(1.0001, 1.0001);
            gridNum++;
            createGrid();
            angle -= angleInc/2;
        }
        pop();
        gridNum = 0;
        angle = .1903;//+frames/5555;
        size = orgSize;//+frames/1000;
        // println(c);
    }

    void temp() {
        int c = 0;
        push();
        while ( c < 1000 ) {
            c++;
            // size -= sizeInc;
            // scale(1.0001, 1.0001);
            gridNum++;
            createGrid();
            angle -= angleInc/2;
        }
        pop();
        gridNum = 0;
        angle = .1903;//+frames/5555;
        size = orgSize;//+frames/1000;
        // println(c);
    }


    void createGrid() {
        
        push();
        // rotate(angle)
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
            float hue = abs( (float)gridNum*52-(float)columnCycles * 100  + frames*10) % 10000;
            // println(columnCycles, hue);
            fill(hue, 77, 77);
        }
        
        // square(0,0, size);
        box(size);
        
        isWhite = !isWhite;
        
    }


}
