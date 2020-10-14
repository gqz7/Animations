class Point {
  int x;
  int y;
  int pixelNum;
  int clr;
  int quad;
  
  Point(int xInit, int yInit) {
    
    x = xInit;
    y = yInit;

    int HW = WIDTH/2;//half width 
    int HH = HEIGHT/2;//half height 
    
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

  int calcX() {
    int xValue = 0;
    switch (quad) {
      case 1:
        xValue = this.x;//(int) this.x;
      case 2:
        xValue = this.x;//(int) this.x;
      case 3:
        xValue = this.x;//(int) this.x;
      case 4:
        xValue = this.x;//(int) this.x;
    }

     return xValue;
  }

  int calcY() {
    int yValue = 0;
    switch (quad) {
      case 1:
        yValue = this.y;
      case 2:
        yValue = this.y;
      case 3:
        yValue = this.y;
      case 4:
        yValue = this.y;
    }
    return yValue;
  }

    
}
