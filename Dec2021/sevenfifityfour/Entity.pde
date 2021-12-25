class Entity {

    float higherDims;//higherdims
    float dims;      //dim
    float lines;   //lines
    float sides;  //side
    float rndrScl;//size
    float hdAgl; //hdAgle
    float idAgl; //hdAgle

    Entity (
        float higherDims,//higherdims
        float dims,      //dim
        float lines,   //lines
        float sides,   //side
        float rndrScl,//size
        float hdAgl,
        float idAgl

    ) {
        this.higherDims = higherDims;//higherdims
        this.dims = dims;//dim
        this.lines = lines;   //lines
        this.sides = sides;   //side
        this.rndrScl = rndrScl;//size
        this.hdAgl = hdAgl;
        this.idAgl = idAgl;
    }



    void renderHigherDimensionalEntity () {

        push();
        rotate(hdAgl); 
        
        for (float i = 0; i < higherDims; ++i) {

            push();
                float x1 = (cos(map(i, 0, higherDims, 0, TWO_PI)) * rndrScl);
                float y1 = (sin(map(i, 0, higherDims, 0, TWO_PI)) * rndrScl);

                translate(x1, y1);
                // println(this.sides);
                this.renderInterdimensionalEntity();

            pop();
        }
        pop();

    }

    void renderInterdimensionalEntity () {
        
        
        push();
        rotate(idAgl);    
        
        for (float i = 0; i < dims; ++i) {
            
            push();
                float x1 = (cos(map(i, 0, dims, 0, TWO_PI)) * rndrScl);
                float y1 = (sin(map(i, 0, dims, 0, TWO_PI)) * rndrScl);

                translate(x1, y1);
                this.renderEntity();

            pop();
        }
        pop();

    }


    void renderEntity () {
        for (int i = 0; i < sides; ++i) {

            stroke( i%2==0 ? 0 : 120, 50, 100);
            push();
                rotate(map(i, 0, sides, 0, TWO_PI));
                this.renderLeaf();
            pop();
        }
    }

    void renderLeaf () {
        for (float i = 0; i < lines; ++i) {

            float angleMaxLf = halfLeaf ? PI : TWO_PI;

            float x1 = (cos(map(i, 0, lines, 0, angleMaxLf)) * rndrScl);
            float y1 = (sin(map(i, 0, lines, 0, angleMaxLf)) * rndrScl);

            line(x1, y1, 0, -rndrScl);
        }
    }
}
