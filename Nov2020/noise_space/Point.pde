int HW = WIDTH/2;//half width 
int HH = HEIGHT/2;//half height 

class Point {
  
  private int x;
  private int noiseX;
  private int y;
  private int noiseY;
  private int pixelNum;
  private double noiseVal;
  public int quad;
  
  Point(int xInit, int yInit) {
    
    x = xInit;
    y = yInit;
    
    //this logic sperates the points into diffrent quadrents which will mirror the x/y positions accordingly and set the quad property which can later be used to apply diffrent logic based on which quadrent a point is in
    if (x <= HW && y <= HH) {
      quad = 1;
      pixelNum = x + y * WIDTH;

    } else if (x <= HW && y > HH) {
      quad = 2;
      pixelNum = x + y * WIDTH;
      y = yInit-HH;

    }  else if (x > HW && y >= HH) {
      quad = 3;
      pixelNum = x + y * WIDTH;
      y = yInit-HH;
      x = xInit-HW;

    }  else if (x > HW && y < HH) {
      quad = 4;
      pixelNum = x + y * WIDTH;
      x = xInit-HW;

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
  
  private void calcNoise (double seedX, double seedY) { 
    
    double xNoise = (((noiseX*2)+seedX)/(88+noiseY))+seedX;
    double yNoise = (((noiseY*1.5)+seedY)/(777+noiseX))+seedY;
    
    noiseVal = noise.noise2(xNoise, yNoise);

  }
  
  public int[] calcColor( int frames ) {
    //pixel saturation
    int saturation = 100;

    //lightness calculation
    int lightness = int( 
      100 -
        Math.abs(
          Math.round( 100*noiseVal ))
        );
    
    //pixel hue calculation
    int hue = ( int(
      Math.round(
        720*noiseVal))+720+frames*10
    )%360;
    
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

    
}
