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
    
    double seedX = seedXNum.value, seedY = seedYNum.value;
    
    double xNoise = (((noiseX*2)+seedX)/(xStatic+noiseY))+seedX;
    double yNoise = (((noiseY*1.5)+seedY)/(yStatic+noiseX))+seedY;
    
    noiseVal = noise.noise2(xNoise, yNoise);

  }
  
  public int[] calcColor( int frames ) {
    
    calcNoise();
    //pixel saturation
    int saturation = 100;

    float lightAdd = quad == 1 || quad == 2 ? (float) (Math.abs(x-width/2)) : (float) (Math.abs(x));
    //lightness calculation
    int lightCalc = int( 
        Math.abs(
          Math.round( 100*noiseVal )) + lightAdd/19.3
        );
    
    float mapH1 = quad == 1 || quad == 4 ? Math.abs(height-y*2) : Math.abs(y*1.5);
    
    float lightness = map( mapH1, 0, height/2, 0, lightCalc/1.7); 
    
    //pixel hue calculation
    int hue = ( int(
      Math.round(
        720*noiseVal))+720+frames*10
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
    
    convertedBrightness = 90-convertedSaturation + intLight;
    
    return new int[] { hue, convertedSaturation, convertedBrightness };
  } 

    
}
