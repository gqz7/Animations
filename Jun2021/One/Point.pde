int HW = WIDTH/2;//half width 
int HH = HEIGHT/2;//half height 

class Point {
  
  private int x;
  private double noiseX;
  private int y;
  private double noiseY;
  private int pixelNum;
  private double noiseVal;
  private int quad;
  
  private double centerX;
  private double centerY;
  
  private static final boolean isLightMode = lightModeBool;
  
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
      centerY = HH - y;
    } else {
      seedXNum = nSeedX2;
      seedYNum = nSeedY2;
      centerY = y-HH;
    }
  
    if (quad == 1 || quad == 2) {
      centerX = HW-x;
    } else {
      centerX = -x;
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

     noiseX = xValue*scaleX;
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
    noiseY = yValue*scaleY;
  }
  
  private void standardCalcNoise () { 
    
    double seedX = seedXNum.value, seedY = seedYNum.value;
    
    double xNoise = (((noiseX*2)+seedX)/(xStatic+noiseY))+seedX;
    double yNoise = (((noiseY*1.5)+seedY)/(yStatic+noiseX))+seedY;
    
    noiseVal = noise.noise2(xNoise, yNoise);
  }

  private void calcNoise () { 
    
    double seedX = seedXNum.value, seedY = seedYNum.value;
    double waveNoise = noise.noise2((seedX+noiseX)/222, (seedY+noiseY)/222);
    //double waveNoise1 = noise.noise2((seedX+frames/100)/222, (seedY+frames)/222);
    double mappedWave = map((float)waveNoise, 0, 1, .19, .22);

    double xNoise = quad==1 || quad==4
 
      ? 
        ((((double)noiseX*(1 + noiseX*noiseY/777777))+seedX)/(xStatic+(double)noiseY))+seedX
      : 
       (((double)noiseX+seedX)
        /(xStatic+noiseY))+(seedX)
        * (1 + (Math.abs(((double) noiseX)*(1+cos((float)noiseY*.00222)/9)*mappedWave))
       /777777);
       
    double yNoise = (((noiseY*1.5)+seedY)/(yStatic+noiseX))+seedY;
    
    noiseVal = noise.noise2(xNoise, yNoise);
  }
  
  
  public int[] calcColor( int frames ) {
    
    calcNoise();
    //pixel saturation
    int saturation = 30;

    float lightAdd = quad == 1 || quad == 2 ? (float) (Math.abs(x-width/2)) : (float) (Math.abs(x));
    //lightness calculation
    int lightCalc = int( 
        Math.abs(
          Math.round( 27-100*noiseVal )) + (lightAdd/19.3)*scaleX
        );
    
    float mapH1 = quad == 1 || quad == 4 ? Math.abs(height-y*2) : Math.abs(y*1.5);
    
    float lightness = map( mapH1, 0, (height/4.2), 0, lightCalc/1.7); 
    
    if (quad == 1 || quad == 4) lightness -= abs(( abs((float)centerX))*7 / ((float)centerY+10) );
    
    if (lightness < 0) lightness = 0;
    
    //pixel hue calculation
    int hue = ( int(
      Math.round(
        720*noiseVal))+720+frames*5
    )%360;
    
    int convertedSaturation;
    int convertedBrightness;
    
    int intLight = round(lightness);
    
    if (intLight > 50) {
    
      intLight = (int) map(intLight, 51, 322, 50, intLight/100);
      
    } 
    
    
    try {
      convertedSaturation = 
      2 * (
        saturation * (
          lightness < 50 
            ? intLight 
            : 100 - intLight 
        )
      ) / (intLight + saturation);


    } catch ( ArithmeticException e ) {
        convertedSaturation = 0;
    }
    
    convertedBrightness = (isLightMode ? 100 : convertedSaturation ) + intLight;
    
    return new int[] { hue, convertedSaturation, convertedBrightness };
  } 

    
}













//  private void waveNoiseCalc () {
    
//    double seedX = seedXNum.value, seedY = seedYNum.value;
//    double waveNoise = noise.noise2((seedX+x)/222, (seedY+y)/222);
//    double mappedWave = map((float)waveNoise, 0, 1, .17, .27);

//    double xNoise = 
//      quad==1||quad==4
//      ? ((
//      map((float)noiseX, 0, HW, 2, 100)+seedX)
//      /(xStatic+noiseY)+seedX)
//      * (1 + (Math.abs((double) centerY)+(Math.abs((double) noiseX/200)))
//      /7777777)
//      * (1 - noiseY/HH)
//      : ((
//      (noiseX/1.5)+seedX)
//      /(xStatic+noiseY))+seedX 
//      * (1 + (Math.abs((double) centerY/17)+(Math.abs((double) noiseX*(1+cos((float)noiseY*(frames/25)/777)/7)*mappedWave)))
//      /525555);

//    double yNoise = quad==2 || quad==3
//      ?
//      (( map((float)noiseY, 0, HH, 2, 33)+seedY)
//      /(yStatic+noiseX)+seedY)
//      * (1 + (Math.abs((double) centerX)+centerY)
//      /3333333 )
//      :
//      ((
//      (noiseY*1.5)+seedY)
//      /(yStatic+noiseX))+seedY 
//      * (1 + (Math.abs((double) centerX)+centerY)*(1+cos(map((float)noiseY, 0, HH, 500, 1000)*frames/33000)/27*mappedWave)
//      /1932222 );
     
//    noiseVal = noise.noise2(xNoise, yNoise);

    
//  }
