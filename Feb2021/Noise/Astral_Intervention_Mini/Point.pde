int HW = WIDTH/2;//half width 
int HH = HEIGHT/2;//half height 

class Point {
  
  private int x;
  private int noiseX;
  private double centerX;
  private double centerY;
  private int y;
  private int noiseY;
  private int pixelNum;
  private double noiseVal;
  private int quad;
  
  private static final boolean isLightMode = lightModeBool;
  
  private NoiseSeed seedXNum;
  private NoiseSeed seedYNum;
  
  Point(int xInit, int yInit) {
    
    x = xInit;
    y = yInit;
    
    //this logic sperates the points into diffrent quadrents which will mirror the x/y positions accordingly and set the quad property which can later be used to apply diffrent logic based on which quadrent a point is in
    
    pixelNum = x + y * width;
    
    if (x <= HW && y <= HH) {
      quad = 1;

    } else if (x <= HW && y > HH) {
      quad = 2;
      y = yInit-HH;

    }  else if (x > HW && y >= HH) {
      quad = 3;
      y = yInit-HH;
      x = xInit-HW;

    }  else if (x > HW && y < HH) {
      quad = 4;
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
    
    double seedX = quad==1||quad==4 ? nSeedX1.value : nSeedX2.value; 
    double seedY = quad==1||quad==4 ? nSeedY1.value : nSeedY2.value;
    double waveNoise = noise.noise2((seedX+x)/222, (seedY+y)/222);
    double mappedWave = map((float)waveNoise, 0, 1, .17, .27);
    //double xNoise = ((
    //  map(noiseX, 0, HW, 2, 100)+seedX)
    //  /(xStatic+noiseY)+seedX)
    //  * (1 + (Math.abs((double) centerY)+(
    //  (quad==1||quad==4)
    //    ? Math.abs((double) noiseX/200)
    //    : Math.abs((double) noiseX*(1+cos(noiseY*(frames))/17))))
    //  /7777777)
    //  * (1 - noiseY/HH);
    double xNoise = 
      quad==1||quad==4
      ? ((
      map(noiseX, 0, HW, 2, 100)+seedX)
      /(xStatic+noiseY)+seedX)
      * (1 + (Math.abs((double) centerY)+(Math.abs((double) noiseX/200)))
      /7777777)
      * (1 - noiseY/HH)
      : ((
      (noiseX/1.5)+seedX)
      /(xStatic+noiseY))+seedX 
      * (1 + (Math.abs((double) centerY/17)+(Math.abs((double) noiseX*(1+cos(noiseY*(frames/25)/777)/7)*mappedWave)))
      /525555);
      
     //println(seedX);
    // if (logC < 10) {
    //  logC++;
    
    // }

    double yNoise = quad==2 || quad==3
      ?
      (( map(noiseY, 0, HH, 2, 33)+seedY)
      /(yStatic+noiseX)+seedY)
      * (1 + (Math.abs((double) centerX)+centerY)
      /3333333 )
      :
      ((
      (noiseY*1.5)+seedY)
      /(yStatic+noiseX))+seedY 
      * (1 + (Math.abs((double) centerX)+centerY)*(1+cos(map(noiseY, 0, HH, 500, 1000)*frames/33000)/27*mappedWave)
      /1932222 );
      
      //double yNoise = (((noiseY*1.5)+seedY)/(yStatic+noiseX))+seedY * (1 + (Math.abs((double) centerX)+centerY/2)/3456789); // * (1 + (double) y /3000)
    
    noiseVal = noise.noise2(xNoise, yNoise);

  }
  
  public int[] calcColor( ) {
    
    //changeNoise();
    calcNoise();
    //pixel saturation
    int saturation = 100;

    float lightAdd = quad == 1 || quad == 2 ? abs((float)x-(float)width/2) : abs((float) x);
    //lightness calculation
    float lightCalc = ( 
        Math.abs(
          Math.round( 27-100*noiseVal )) + lightAdd/19.3
        );
    
    float mapH1 = quad == 1 || quad == 4 ? abs(height- y*2-30) : abs(noiseY*2);
    
    float lightness = map( mapH1, 0, height/2, 0, lightCalc/1); 
    
    //pixel hue calculation
    int hue = ( int (
      Math.round( 720*noiseVal))+ (int)(720+frames*5)
    )%360;
    
    int convertedSaturation;
    int convertedBrightness;
    
    int intLight = round(lightness);
    
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
    
    convertedBrightness = convertedSaturation - intLight + 100;
    
    return new int[] { hue, convertedSaturation, convertedBrightness };
  } 

    
}
