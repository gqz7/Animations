OpenSimplex2S noise;
import java.text.MessageFormat;

float nSeed1 = 417.3939;// random(100);
float nSeed2 = 3141.5826;//random(100);
int WIDTH = 3840;//3840;
int HEIGHT = 2100;//2160;
int frames = 0;
boolean printTest = false;

Point[] allPixs = new Point[WIDTH*HEIGHT];

void setup() {
  // size(1600,900);
  size(3840,2100); //h: 2160
  colorMode(HSB, 360, 100, 100);
  noise = new OpenSimplex2S( (int) random(10000) );
  initalizePixels();
  // noLoop();
}


void draw() {
  
  //println("render");
  
  background(0);
  loadPixels();
  
  frames++;
  
  nSeed1-=6.007;
  nSeed2-=6.007;

      //printTest = false;
  for ( int i = 0; i < allPixs.length; i++) {  
    // println(xNoise, yNoise);
    
    //if (printTest == false) {
    //     println(calNoise);
    //}
    //printTest = true;
    
    int pxNum = allPixs[i].pixelNum;
    int pxlX = allPixs[i].calcX();
    int pxlY = allPixs[i].calcY();


    double xNoise = ((pxlX+100)+nSeed1)/(100+pxlY);
    double yNoise = ((pxlY+100)+nSeed2)/(420+pxlX);

    double calNoise = noise.noise2(xNoise,yNoise);

    
    int pxSatur = 87;//int(Math.round(100*calNoise));

    int pxLig = int( 
      Math.abs(
        Math.round( 100*calNoise )) )  - pxlX/100 ;
    
    int pxColor = ( int(
      Math.round(
        1080*calNoise))+1080+frames*10
    )%360;
    
    //String pxlHsl = MessageFormat.format("hsl({0}, {1}%, {2}%)", );
    pixels[pxNum] = color(pxColor, pxSatur, pxLig);
    
    
  } 
  
  updatePixels();
 
}

void initalizePixels() {
  int count = 0;
  for ( int x = 0; x < WIDTH; x++) {
    for (int y = 0; y < HEIGHT; y++ ) {
      allPixs[count] = new Point(x,y);
      count++;
    }
  }
}

float mapNumber ( float number, float min1, float max1, float min2, float max2) {
  return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
}
