int HW = WIDTH/2;//half width 
int HH = HEIGHT/2;//half height 

class Point {
  
  private int x;
  private int noiseX;
  private int y;
  private int noiseY;
  private int pixelNum;
  private double noiseVal;
  private int quad;
  
  private NoiseSeed seedXNum;
  private NoiseSeed seedYNum;
  
  Point(int xInit, int yInit) {
    
    x = xInit;
    y = yInit;
    
    //this logic sperates the points into diffrent quadrents which will mirror the x/y positions accordingly and set the quad property which can later be used to apply diffrent logic based on which quadrent a point is in
    if (x <= HW && y <= HH) {
      quad = 1;
      pixelNum = x + y * width;

    } else if (x <= HW && y > HH) {
      quad = 2;
      pixelNum = x + y * width;
      y = yInit-HH;

    }  else if (x > HW && y >= HH) {
      quad = 3;
      pixelNum = x + y * width;
      y = yInit-HH;
      x = xInit-HW;

    }  else if (x > HW && y < HH) {
      quad = 4;
      pixelNum = x + y * width;
      x = xInit-HW;

    }
    
    calcX();
    calcY();
    
     if (quad == 1 || quad == 4) { 
      seedXNum = nSeedX1;
      seedYNum = nSeedY1;
    } else {
      seedXNum = nSeedX2;
      seedYNum = nSeedY2;
    }
    
  }

//the x an y should be calculated dirrently based on which quadrent the point is in, therefor a switch statment is implemented
  public void calcX() {
    int xValue = 0;
    switch (quad) {
      case 1:
      case 2:
        xValue = -this.x+HW;
        break;
      case 4:
      case 3:
        xValue = this.x;
        break;
    }

     noiseX = xValue;
  }

  public void calcY() {
    int yValue = 0;
    switch (quad) {
      case 2:
      case 3:
        yValue = this.y;
        break;
      case 1:
      case 4:
        yValue = -this.y+HH;
        break;
    }
    noiseY = yValue;
  }
  
  private void calcNoise () { 
    
    // double seedX = seedXNum.value, seedY = seedYNum.value;
    
    // double xNoise = (((noiseX*2)+seedX)/(xStatic+noiseY))+seedX;
    // double yNoise = (((noiseY*1.5)+seedY)/(yStatic+noiseX))+seedY;
    
    // noiseVal = noise.noise2(xNoise, yNoise);


    double seedX = seedXNum.value, seedY = seedYNum.value;
    double waveNoise = noise.noise2((seedX+noiseX+frames)/1111/renderSpeed, (seedY+noiseY+frames)/1211/renderSpeed);
    double waveNoise1 = noise.noise2((seedX+frames)/1511/renderSpeed, (seedY+frames)/1131/renderSpeed);
    double mappedWave = waveNoise*waveNoise1 / 10;

    double xNoise = quad==1 || quad==4
 
      ? 
        (((noiseX*2)+seedX)/(xStatic+noiseY))+seedX//((((double)noiseX*(1 + noiseX*noiseY/777777))+seedX)/(xStatic+(double)noiseY))+seedX
      : 
       (((double)noiseX+seedX)
        /(xStatic+noiseY))+(seedX)
        * (1 + (Math.abs(((double) noiseX)*(1+cos((float)(noiseY*waveNoise1))*mappedWave)))
       /777777);
       
    double yNoise = (((noiseY)+seedY)/(yStatic+noiseX))+seedY;
    
    noiseVal = noise.noise2(xNoise, yNoise);

  }
  
  public float[] calcColor( int frames ) {
    
    calcNoise();
    //pixel saturation
    int saturation = 100;

    //lightness calculation
    int lightCalc = int( 
        Math.abs(
          Math.round( 100*noiseVal ))
        );
    
    float mapH1 = quad == 1 || quad == 4 ? height-Math.abs(y*2) : Math.abs(y);
    float mapW1 = quad == 1 || quad == 2 ? width/2-Math.abs(x) : Math.abs(x);
    
    //pixel hue calculation
    float hueMax = map( mapW1, 0, width/2, 120, 540) + map( mapH1, 0, height/2, 100, 240); 
    // if (mapH1 <= 0) println(mapH1);
    
    float hue = ( 
      Math.round(
        hueMax*noiseVal)+(int)hueMax+(frames*(int)renderSpeed*3)
    )%360;
    
    float lightAddX = quad == 1 || quad == 2 ? Math.abs(width/2-x) : Math.abs(x);
    float lightAddY = quad == 1 || quad == 4 ? Math.abs(height-y*2) : Math.abs(y);
    float lightness = map( mapH1, 0, height/2, 0, lightCalc) * (1+(lightAddY)/(lightAddX/.8));
    // lightness = map(mapH1*mapW1, 0, HW*HH/2, lightness/2, lightness);
    // float lightness = map( mapH1*(mapW1/4), 0, height*width/16, 0, lightCalc);// * (1+(lightAddY)/(lightAddX/.8));
    
    float convertedSaturation;
    float convertedBrightness;
    
    try {
      convertedSaturation = 
      2 * (
        saturation * (
          lightness < 50 
            ? lightness 
            : 100 - lightness 
        )
      ) / (lightness + saturation);


    } catch ( ArithmeticException e ) {
        convertedSaturation = 0;
    }
    
    convertedBrightness = map(convertedSaturation, 0, invertLightness?50:100, 100, lightness);//90-convertedSaturation + 
    if (invertLightness) convertedBrightness = 100 - convertedBrightness;
    return new float[] { hue, convertedSaturation, convertedBrightness };
  } 

    
}
