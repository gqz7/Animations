
class SpaceFlower {
    
  float spaceFlowerScale = .1;
  float spaceFlowerNoiseSeed = 3.167;
  float spaceFlowerScaleRate = .004;

  int sFscalingLimit = 234;

  public void drawFlower(int lim) {

    calcspaceFlowerScale();
    noFill();
    strokeWeight(1);
    spaceFlowerNoiseSeed+=.0077*1.23;
    
    float limit = (float) lim; 
    float resolution = 1.1;
    int petalsLim = 6;
    float noiseLineVal;
    double noiseX, noiseY;
    int[] colorData;
    float translation, rotation, translateRotation, centerRotation, layerSz, layerScale;
    
    float rotateFlwr = (float) (
        .005 * noise.noise2((double)spaceFlowerNoiseSeed/3+7777,(double)spaceFlowerNoiseSeed/3+7777)
    );
    
    float[] colorInput = new float[3];
    
      for (float i = limit; i > 0 ; i-= resolution-(i/limit)) {
      
          noiseX = (double) (spaceFlowerNoiseSeed + i/limit*1.5);
          noiseY = (double) (spaceFlowerNoiseSeed + i/limit*1.5);
          noiseLineVal = (float) noise.noise2(noiseX, noiseY);

          colorInput[0] = (float) frames;
          colorInput[1] = i;
          colorInput[2] = limit;
          
          colorData = calcColor( colorInput );
          
          stroke(colorData[0], colorData[1], colorData[2]);  
          
          translation = i*2*spaceFlowerScale;
          
          rotation = map(noiseLineVal, -1, 1, 0, PI*1.5); 
          translateRotation = map( i, 1, limit, rotation, rotation/10 );
          
          for (int j = 0; j < petalsLim; ++j) {

            layerSz = (limit*1.5)-(i*1.5)-2;
            layerScale = i*spaceFlowerScale*(1+i/100);
            centerRotation = PI/petalsLim*2*j;      
            
            push();
              translate(0,0, layerSz);
              
              drawRombus(
                translation,
                layerScale, 
                translateRotation,
                centerRotation
              );
              translate(0,0, layerSz*-2);
              
              drawRombus(
                translation,
                layerScale, 
                translateRotation,
                centerRotation
              );
            pop();
          
      
          }
          rotate(rotateFlwr);
      } 
  }

  public void drawRombus(float translation, float size, float rotation, float rotationAboutCenter) {
      pushMatrix();
    
        rotate(rotationAboutCenter);
        translate(translation, 0);
        rotate(rotation);

        quad(size/2, 0, 0, -size, -size/2, 0, 0, size);
        rotate(PI/2);
        quad(size/2, 0, 0, -size, -size/2, 0, 0, size);
        rotate(-rotation*2-PI/2);
        quad(size/2, 0, 0, -size, -size/2, 0, 0, size);
        rotate(PI/2);
        quad(size/2, 0, 0, -size, -size/2, 0, 0, size);

      popMatrix();
  }

  public int[] calcColor( float[] factors ) {
    //pixel saturation
    int saturation = 100;
    int timePassed = (int) factors[0];
    int index = (int) factors[1];
    int maxIdex = (int) factors[2];
    //float noiseFactor = factors[3]; 
    //lightness calculation
    int lightness = int ( map(index, 0, maxIdex, 100, 0) );
    
    //pixel hue calculation
    int hue = (int) Math.abs(index*.5 - timePassed*.75 -300) % 360;
    
    int convertedSaturation;
    int convertedBrightness;
    
    try {
      if (lightness < 50) {
        convertedSaturation = 2 * (saturation * lightness) / (lightness + saturation);
      } else {
        convertedSaturation = 2 * (saturation * (100-lightness)) / (lightness + saturation);
      }
    } catch ( ArithmeticException e ) {
        convertedSaturation = 0;
    }
    
    convertedBrightness = convertedSaturation + lightness;
    
    return new int[] { hue, convertedSaturation, convertedBrightness };
  } 
  
  public void calcspaceFlowerScale() {
    //if (frames % sFscalingLimit < sFscalingLimit/2)
    //  spaceFlowerScale+=spaceFlowerScaleRate;
    //else spaceFlowerScale-=spaceFlowerScaleRate;
    if (time < sFscalingLimit) {
      spaceFlowerScale += spaceFlowerScaleRate;
    }
  }

}
