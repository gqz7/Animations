public class NoiseController  {

    void displayNoise() {
        loadPixels(); // load pixels needs to be ran to modify pixels array and changePixels()
        
        //iterate seed values so animati60on image moves
        advanceTime();
        
        //itterate through all pixels/Points
        for ( int i = 0; i < allPixs.length; i++) {  

        //get pixel number of current pixel    
        int pxNum = allPixs[i].pixelNum;

        float[] pxColorArr = allPixs[i].calcColor( frames );
        
        //modify the individual pixel
        pixels[pxNum] = color(pxColorArr[0], pxColorArr[1], pxColorArr[2]);
        
        } 
        
        //update the pixel info
        updatePixels();
    }

    void advanceTime() {
        xStatic = globalXScale*globalRndrScl/1000;
        yStatic = globalYScale*globalRndrScl/1000;

        nSeedX1.value -= .003*renderSpeed;
        nSeedX2.value += .012*renderSpeed;
        nSeedY1.value += .015*renderSpeed;
        nSeedY2.value += .007*renderSpeed;

        globalRndrScl -= .005*renderSpeed;
        // globalYScale += .001*renderSpeed;
        globalXScale -= .002*renderSpeed;
    }

    void initalizePixels() {
        int count = 0;
        for ( int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++ ) {
            allPixs[count] = new Point(x,y);
            count++;
            }
        }
    }

}
