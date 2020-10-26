//IMPORTS

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
  OpenSimplex2S noise;
  //seeds for noise algorithm, can be randomized for unique image every render
  float nSeedX1 = (float) Math.random()*1000 + 417.3939;
  float nSeedX2 = (float) Math.random()*1000 + 777.777;
  float nSeedY1 = (float) Math.random()*1000 + 3939.719;
  float nSeedY2 = (float) Math.random()*1000 + 3141.5826;
  //width and height of canvas
  int WIDTH = 2700;//3840; //1920
  int HEIGHT = 1500;//2160; //1080
  //tracker for how many frames have elapsed
  int frames = 0;
  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Point[] allPixs = new Point[WIDTH*HEIGHT];

//setup function that runs before render
void setup() {
  //set canvas size
  size(2700,1500); //h: 2160
  //set color mode to hue/saturation/brightness which i perfer for my animations
  colorMode(HSB, 360, 100, 100);

  //create instance of the simplex noise class
  noise = new OpenSimplex2S( 3141592 );
  //run function to fill allPixs array
  initalizePixels();
    //noLoop(); //uncomment to only render one frame
}

//loop function that runs on a loop 
void draw() {
  
  background(0); // reset screen
  loadPixels(); // load pixels needs to be ran to modify pixels array and changePixels()
  
  frames++; //iterate frame tracker
  
  //iterate seed values so animation image moves
  nSeedX1+=.007;
  nSeedY1+=.003;
  nSeedX2+=.007;
  nSeedY2+=.003;
  
  //itterate through all pixels/Points
  for ( int i = 0; i < allPixs.length; i++) {  

    //get basic info from current pixel    
    int pxNum = allPixs[i].pixelNum;
    allPixs[i].calcX();
    allPixs[i].calcY();

    float seedX;
    float seedY;
    if (allPixs[i].quad == 1 || allPixs[i].quad == 4 ) {
      seedX = nSeedX1;
      seedY = nSeedY1;
    } else {
      seedX = nSeedX2;
      seedY = nSeedY2;
    }

    //calculate noise with simplex noise method
    allPixs[i].calcNoise(seedX, seedY);

    int[] pxColorArr = allPixs[i].calcColor( frames );
    
    //modify the individual pixel
    pixels[pxNum] = color(pxColorArr[0], pxColorArr[1], pxColorArr[2]);
    
  } 
  
  //update the pixel info
  updatePixels();

  saveFrame("../../../../../../Renders/noise003/img_#####.png");

 
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
