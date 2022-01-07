class Space  {

    void renderScene () {

        clear();
        background(0);
        if (isShowingVars) displayVars();
        
        // stroke(360);
        // stroke(159, 67, 100);  //green
        // stroke(177, 87, 100); //teal
        // stroke(309, 34, 95); //pink
        stroke(360, 100, 100);

        // strokeWeight(globalLineWidth > 0 ? globalLineWidth : .001);
        
        translate( (W/2) + offsetX, (H/2) + offsetY);
        // translate( (W/2), (H/2) );

        Entity renderingEntity = new Entity(
            globalHigherDimensions,//higherdims
            globalDimensions,//dim
            globalLines,//lines
            globalSides,//side
            zoomedIn ? globalRndrScl*10 : globalRndrScl,
            0, //higher dim angle
            0 //inner dim angle
        );

        rotate(globalAngle*PI/180);

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
            //ENTITY GRID
            translate(-W/2, -H/2);
            this.renderEntityGrid(renderingEntity);
        break;
        case 5:
            this.deityRender(renderingEntity);
        }    
    
    }

    void deityRender(Entity rndEnt) {
        rndEnt.renderInterdimensionalEntity();
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

                rndEnt.renderEntity();

                pop();
            }
        }
    }
}
