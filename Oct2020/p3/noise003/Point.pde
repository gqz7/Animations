int HW = WIDTH/2;//half width 
int HH = HEIGHT/2;//half height 

class Point {
  private int x;
  private int y;
  private int pixelNum;
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
  public int calcX() {
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

     return xValue;
  }

  public int calcY() {
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
    return yValue;
  }
  
  public int[] calcColor( double pixelNoise, int frames, int pxlX, int pxlY ) {
    //pixel saturation
    int pxSatur = int(Math.round(100*pixelNoise));

    //lightness calculation
    int pxLig = int( 
      100 -
        Math.abs(
          Math.round( 100*pixelNoise )) ) + pxlY/4 + pxlX/20 - 100;
    
    //pixel hue calculation
    int pxColor = ( int(
      Math.round(
        720*pixelNoise))+720+frames*10
    )%360;
    
    return new int[] {pxColor,pxSatur,pxLig};
  } 

    
}
