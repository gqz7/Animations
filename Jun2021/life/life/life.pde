//Game of life

int WIDTH = width;
int HEIGHT = height;

int frames = 0;
  double timeScale = .25;
  double renderScale = .9;  
  //intended height and width for rendering
  int w2 = 3840;
  int y2 = 2160;
  //starting seeds for noise
  double xStatic = 97 * renderScale;
  double yStatic = 444 * renderScale;
  
 //width and height of canvas
  int WIDTH = 3840;//3840; //1920 //1280 //800
  int HEIGHT = 2160;//2160; //1080 //720  //450

  float scaleX = (pow(WIDTH/(float)w2, (float)-1));
  float scaleY = (pow(HEIGHT/(float)y2, (float)-1));
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];

  
void setup() {
  //set canvas size
  size(3840,2160);//0//set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);

  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 314159265 );
}

//loop function that runs on a loop 
void draw() {
  
  background(0); // reset screen
  
  //itterate through all pixels/Points
  for ( int i = 0; i < allPixs.length; i++) {  

    //get pixel number of current pixel    
    int pxNum = allPixs[i].pixelNum;

    int[] pxColorArr = allPixs[i].calcColor( frames );
    
    //modify the individual pixel
    pixels[pxNum] = color(pxColorArr[0], pxColorArr[1], pxColorArr[2]);
    
  } 
  
  //update the pixel info
  updatePixels();

}
