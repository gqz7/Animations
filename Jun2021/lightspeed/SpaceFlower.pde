   
class SpaceFlower {
    
  float spaceFlowerScale = .1;
  float spaceFlowerAge = 0;
  float spaceFlowerNoiseSeed = 3472.37;
  float spaceFlowerScaleNoiseSeed = 1273.3939;
  float spaceFlowerScaleNoiseVal;
  float spaceFlowerColorNoiseSeed = 3143.42;
  float spaceFlowerColorNoiseVal;
  int sFscalingLimit = 100;
  float resolution = .1;
 

  public void drawFlower(int lim, boolean autoRotate) {
    
    
    
    if (autoRotate) {
      float rotate = PI*2 * (float)noise.noise2( (float)frames/722*spaceSpeed + 333, (float)frames/1777*spaceSpeed + 1000 );
      rotateX( rotate/4 );
      rotateY( rotate/2 );
      rotateZ( rotate/4 );
      
    }

    spaceFlowerScale = 1;//calcspaceFlowerScale(); 
    noFill();
    strokeWeight(1);
    //println(spaceFlowerNoiseSeed, frames);
    spaceFlowerNoiseSeed += 0.0003 * spaceSpeed;
    spaceFlowerColorNoiseSeed += 0.00074 * spaceSpeed;
    spaceFlowerScaleNoiseSeed += 0.005 * spaceSpeed;
    spaceFlowerAge += spaceSpeed;
    
    spaceFlowerColorNoiseVal = (float) noise.noise2( spaceFlowerColorNoiseSeed, spaceFlowerColorNoiseSeed);
    
    float limit = calcspaceFlowerLim(lim);//(float) lim;//
    int petalsLim = 6;
    float noiseLineVal;
    double roationNoiseX, roationNoiseY;
    float[] colorData;
    float translation, rotationAlpha, rotationBeta, centerRotation, layerSz, layerScale;
    
    //float rotateFlwr = (float) (
    //    .005 * noise.noise2((double)spaceFlowerNoiseSeed/3+7777,(double)spaceFlowerNoiseSeed/3+7777)
    //);
    
    //rotateX(PI/2);
    
    float[] colorInput = new float[3];
    
    
    
      for (float i = limit; i > 0 ; i-= resolution) {
      
          roationNoiseX = (double) (spaceFlowerNoiseSeed + i/limit*.715);
          roationNoiseY = (double) (spaceFlowerNoiseSeed + i/limit*.715);
          noiseLineVal = (float) noise.noise2(roationNoiseX, roationNoiseY);
          spaceFlowerScaleNoiseVal = (float) noise.noise2(spaceFlowerScaleNoiseSeed + i/33, spaceFlowerScaleNoiseSeed + i/33);
          colorInput[0] = (float) spaceFlowerAge;
          colorInput[1] = i;
          colorInput[2] = limit;
          
          
          colorData = calcColor( colorInput );
          
          stroke(colorData[0], colorData[1], colorData[2]);  
          
          translation = spaceFlowerScale * i * map( spaceFlowerScaleNoiseVal, -1, 1, 1.5, 3.5); //(1.3+((float)noise.noise2((float)frames/200+i/77, (float)frames/200+i/77)));
          
          rotationAlpha = map(noiseLineVal, -1, 1, 0, PI*2); 
          rotationBeta = i >= limit/2 ? map( i, limit/2, limit, rotationAlpha, 0) : map( i, limit/2, 0, rotationAlpha, 0);
          
          for (int j = 0; j < petalsLim; ++j) {

            layerSz = (limit*1.5)-(i*1.5)-2;
            layerScale = i*spaceFlowerScale*(1+i/100);
            centerRotation = PI/petalsLim*2*j;      
            stroke(colorData[0], colorData[1], colorData[2]);  
            fill(map(i, limit, 0, 0, 12000));//map(i, limit, 0, 0, 12000));
            push();
              translate(0,0, layerSz);
              
              drawRombus(
                translation,
                layerScale, 
                rotationBeta,
                centerRotation
              );
              translate(0,0, layerSz*-2);
              
              drawRombus(
                translation,
                layerScale, 
                rotationBeta,
                centerRotation
              );
            pop();  
              
            //push();
              
            //  noStroke();
            //  fill(map(i, limit, 0, 0, 12000));
              
            //  rotate(centerRotation);
            //    translate(translation, 0);
                
            //    rotate(rotation);
            //    box(.1);
                
         
            //popMatrix();
              
               
            
          
      
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

  public float[] calcColor( float[] factors ) {
    //pixel saturation
    int saturation = 100;
    float timePassed = factors[0];
    float index = factors[1];
    int maxIdex = (int) factors[2];
    //float noiseFactor = factors[3]; 
    //lightness calculation
    int lightness = int ( map(index, 0, maxIdex, 86, 44) );
    
    
    //pixel hue calculation
    //BASIC: cycle through the rainbow
    //int hue = (int) Math.abs(index*3.7 - timePassed*.75 -300) % 360;
    //NOISE BASED
    float hue = ( map(spaceFlowerColorNoiseVal, -1, 1, 3000, 8000) + map(index, 0, maxIdex, 6000, 0)) % 10000;

    
    if (printCount < printLim ) {
      printCount++;
      
      //println(hue, index);
    
    }
    
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
    
        
    //if (index + resolution >= maxIdex) {
    //  convertedSaturation = 0;
    //  convertedBrightness = 0;
    //  hue = 0;
      
    //}
    
    convertedBrightness = convertedSaturation + lightness;
    
    return new float[] { hue, convertedSaturation, convertedBrightness };
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
    //float sFNoiseX = (frames*.3 * sFscalingLimit) / 444 + 100;
    //float sFNoiseY = (frames*.3 * sFscalingLimit) / 444 + 123;
    //spaceFlowerScale = (float) noise.noise2( sFNoiseX, sFNoiseY ) + 1;
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
