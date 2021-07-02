
class SpaceFlower {
    
  float spaceFlowerScale = .1;
  float spaceFlowerNoiseSeed = 3234.167;
  float spaceFlowerScaleRate = .004;
  float spaceFlowerColorNoiseSeed = 23.42;
  float spaceFlowerColorNoise;
  int sFscalingLimit = 100;
  

  public void drawFlower(int lim, boolean autoRotate) {
    
    
    
    if (autoRotate) {
      float rotate = PI*2 * (float)noise.noise2( (float)frames/722*spaceSpeed + 333, (float)frames/1777*spaceSpeed + 1000 );
      rotateX( rotate/4 );
      rotateY( rotate/2 );
      rotateZ( rotate/4 );
      
    }

    calcspaceFlowerScale();
    noFill();
    strokeWeight(1);
    spaceFlowerNoiseSeed += 0.00037 * spaceSpeed;
    spaceFlowerColorNoiseSeed += 0.00074 * spaceSpeed;
    
    spaceFlowerColorNoise = (float) noise.noise2( spaceFlowerColorNoiseSeed, spaceFlowerColorNoiseSeed);
    
    float limit = calcspaceFlowerLim(lim);//(float) lim;//
    float resolution = .15;
    int petalsLim = 6;
    float noiseLineVal;
    double roationNoiseX, roationNoiseY;
    int[] colorData;
    float translation, rotation, translateRotation, centerRotation, layerSz, layerScale;
    
    //float rotateFlwr = (float) (
    //    .005 * noise.noise2((double)spaceFlowerNoiseSeed/3+7777,(double)spaceFlowerNoiseSeed/3+7777)
    //);
    
    //rotateX(PI/2);
    
    float[] colorInput = new float[3];
    
    
    
      for (float i = limit; i > 0 ; i-= resolution) {
      
          roationNoiseX = (double) (spaceFlowerNoiseSeed + i/limit*.715);
          roationNoiseY = (double) (spaceFlowerNoiseSeed + i/limit*.715);
          noiseLineVal = (float) noise.noise2(roationNoiseX, roationNoiseY);

          colorInput[0] = (float) frames;
          colorInput[1] = i;
          colorInput[2] = limit;
          
          colorData = calcColor( colorInput );
          
          stroke(colorData[0], colorData[1], colorData[2]);  
          
          translation = i*2*spaceFlowerScale * (1+((float)noise.noise2((float)frames/200+i/77, (float)frames/200+i/77)));
          
          rotation = map(noiseLineVal, -1, 1, 0, PI*1.8); 
          translateRotation = map( i, 1, limit, rotation, 0 );
          
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
          //rotate(rotateFlwr);
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
    int lightness = int ( map(index, 0, maxIdex, 86, 44) );
    
    
    //pixel hue calculation
    //BASIC: cycle through the rainbow
    //int hue = (int) Math.abs(index*3.7 - timePassed*.75 -300) % 360;
    //NOISE BASED
    int hue = int ( map(spaceFlowerColorNoise, -1, 1, 25, 250) + map(index, 0, maxIdex, 250, 75))  % 360;
    
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
    //OPTION 1
    //if (frames % sFscalingLimit < sFscalingLimit/2)
    //  spaceFlowerScale+=spaceFlowerScaleRate;
    //else spaceFlowerScale-=spaceFlowerScaleRate;
    
    //OPTION 2
    //if (time < sFscalingLimit) {
    //  spaceFlowerScale += spaceFlowerScaleRate;
    //}
    
    //OPTION 3
    float sFNoiseX = (frames*spaceFlowerScaleRate * sFscalingLimit) / 444 + 100;
    float sFNoiseY = (frames*spaceFlowerScaleRate * sFscalingLimit) / 444 + 123;
    spaceFlowerScale = (float) noise.noise2( sFNoiseX, sFNoiseY ) + 1;
  }
  
    public float calcspaceFlowerLim(int lim) {
    //OPTION 1
    //float sFNoiseX = (float) frames / 777 + 100;
    //float sFNoiseY = (float) frames / 777 + 123;
    //float calculatedLim = abs((float) noise.noise2( sFNoiseX, sFNoiseY ) * sFscalingLimit) + lim;
    ////println(calculatedLim);
    //return calculatedLim;
    
    //OPTION 2
    return (float) lim*2;
    
  }

}
