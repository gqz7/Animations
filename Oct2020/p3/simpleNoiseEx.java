
OpenSimplexNoise noise;

int width = 3840;
int height = 2160;

float xPos = random(1000);
float yPos = random(1000);

void setup() {
  size(3840,2160);
  noise = new OpenSimplexNoise();
  
}


void draw() {
  
  background(0);
  
  xPos+=.01;
  yPos+=.01;
  
  fill(254);
  rect(width/2,height/2,100+noise(xPos)*100,100+noise(yPos)*100);
 
}


class Point {
  int x;
  int y;
  int pixelNum;
  int clr;
  
  Point(int xInit, int yInit) {
    
    x = xInit;
    y = yInit;
    pixelNum = x + y * width;
    
  }
    
}