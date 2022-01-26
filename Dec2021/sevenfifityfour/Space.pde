class Space  {

    void renderScene (int sceneNum) {

        clear();
        // background(0);
        
        
        // stroke(360);
          //green
        // stroke(177, 87, 100); //teal
        // stroke(309, 34, 95); //pink
        // stroke(360, 100, 100);
        if (colorMode == 1) {
            background(15, 30, 15, 0); 
            stroke(215, 44, 100, globalLineAlpha);
        } else if (colorMode == 2){
            stroke(globalBgHue, 20, 17); 
            background(globalLineHue, 44, 100);
        } else {
            background(0); 
            stroke(360);
        }

        // strokeWeight(globalLineWidth > 0 ? globalLineWidth : .001);
        

        Entity renderingEntity = new Entity(
            globalDeityNum,
            globalHigherDimensions,//higherdims
            globalDimensions,//dim
            globalLines,//lines
            globalSides,//side
            zoomedIn ? globalRndrScl*10 : globalRndrScl,
            globalHDAngle*PI/180, //higher dim angle
            globalDeityAngle*PI/180 //inner dim angle
        );

        push();

            if (renderOption < 5 ) {
                translate(W/2 + transX, H/2 + transY);
                rotate(globalAngle*PI/180);
            }

            switch (renderOption) {

                case 1: 
                    //STANDARD ENTITY
                    renderingEntity.renderEntity();
                break;
                case 2: 
                    //INTERDIMENSIONAL
                    renderingEntity.renderInterdimensionalEntity();
                break;
                case 3: 
                    //HIGHER DIMENSIONAL
                    renderingEntity.renderHigherDimensionalEntity();
                break;
                case 4: 
                    renderingEntity.deityRender();           
                break;
                case 5:
                    //ENTITY GRID
                    this.renderEntityGrid(renderingEntity);
                break;
            }    
            

        pop();

        if (isShowingVars) displayVars();
        
    }


    void renderEntityGrid (Entity rndEnt) {

        clear();
        background(0);
        
        stroke(360);
        strokeWeight(globalLineWidth);
        
        int minNum = (int) globalLines;
        int maxNum = (int) (globalLines + globalSides);

        int minSpace = H < W ? H : W;

        int enitiySz = (int) (minSpace / ((maxNum-minNum+1) * 2.5));

        for (int lineNum = minNum; lineNum <= maxNum; ++lineNum) {
            for (int sideNum = minNum; sideNum <= maxNum; ++sideNum) {
                push();
                float transX = map(lineNum, minNum, maxNum, 0, W - enitiySz*3) + enitiySz*1.5;
                float transY = map(sideNum, minNum, maxNum, 0, H - enitiySz*3) + enitiySz*1.5;
                translate(transX, transY);

                rndEnt.lines = lineNum;
                rndEnt.sides= sideNum;

                rndEnt.renderEntity();

                pop();
            }
        }
    }
}
