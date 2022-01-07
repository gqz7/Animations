final int W = 3840;//(8K) 7680// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 //1680 //2560
final int H = 2160;//(8K) 4320// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720 //1050 //1600
boolean isPaused = true;
float frames;
int time; 
float renderSpeed = 5.0;
// 3-45-4-24
float globalAngle = 90;
float globalLines = 3;
float globalSides = 3;//77;
float globalDimensions = 3;//32;
float globalHigherDimensions = 3;//24;
float globalRndrScl = 333;
float globalLineWidth = .0001;
float incrementer = 3;

int colorMode = 1;
int globalHue = 159;

int renderOption = 3;
boolean zoomedIn = false;
boolean isShowingVars = false;

boolean halfLeaf = false;
boolean halfEntity = false;
boolean halfInDim = false;
boolean halfHiDim = false;

float offsetX = 0;
float offsetY = 0;

Space space;

void settings() {
  //set canvas size
  fullScreen();
  size(W, H); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720

}


void setup() {
  //set colormode
  colorMode(HSB, 360, 100, 100);
  // noLoop();
  // noCursor();
  space = new Space();

    // background(0);
}

//loop function that runs on a loop 
void draw() {

 
  if (!isPaused) {
    // offsetY += 1;
    //println(frames);
    frames+=renderSpeed;
    time++;
    // globalRndrScl -= .7 * renderSpeed;

    if ( time % 111 == 0 ) {
      
      ranIncrement();
    }

    // globalLines += .02 * renderSpeed;
    // globalSides += .005;
    // globalDimensions += .002;
    // globalHigherDimensions += .001;
    // globalRndrScl = map(frames, 0, 3333, 3333, 222);



    // saveFrame("../../../newrender/img_######.png");
  
  }
  space.renderScene();


}

void ranIncrement() {
  float ran = random(1);
  if ( ran < .25) {
    globalLines += incrementer;
  } else if ( ran < .5) {
    globalSides += incrementer;
    
  } else if ( ran < .75) {
    globalDimensions += incrementer;
    
  } else {
    globalHigherDimensions += incrementer;

  }

  println((int)globalSides+"-"+(int)globalLines+"-"+(int)globalDimensions+"-"+(int)globalHigherDimensions);
}

void displayVars() {

  beginShape();
  fill(0);
  rect(0, 0, 250, H/2);
  endShape();

  textSize(20);
  fill(360);
  // push();
    text("frames: " + frames, 50, 50);
    text("lines(q/w): " + globalLines, 50, 100);
    text("sides(a/s): " + globalSides, 50, 150 );
    text("scl(z/x): " + globalRndrScl, 50, 200 );
    text("lw(e/r): " + globalLineWidth, 50, 250 );
    text("dim(d/f): " + globalDimensions, 50, 300 );
    text("higDm(c/v): " + globalHigherDimensions, 50, 350 );
    text("inc(t/y): " + incrementer, 50, 400 );
    text("rndOpt(#): " + renderOption, 50, 450 );
    text("normalize(n)", 50, 500 );
    text("resetScl(b)", 50, 550 );
    text("screenshot(=)", 50, 600 );
    text("toggleDis(m): "+(isShowingVars?"on":"off") , 50, 650 );
    text("toggleZoom(,): "+(zoomedIn?"on":"off"), 50, 700 );
    text("halfLeaf(.): "+(halfLeaf?"on":"off"), 50, 750 );
    text("halfEntity(/): "+(halfEntity?"on":"off"), 50, 800 );
    text("halfInDim(;): "+offsetY, 50, 850 );
    text("halfHiDim('): "+offsetX, 50, 900 );
    text("resetVars(\\)", 50, 950 );
    text("angle([ / ]):" + globalAngle, 50, 1000 );
  // pop();
}


void keyPressed() {
  switch (key) {
    case ',':
      zoomedIn = !zoomedIn;
      break;
    //VAR 1 - line num
    case 'q': 
      globalLines-=incrementer;
      if (globalLines <1 ) globalLines = 1;
      break;
    case 'w': 
      globalLines+=incrementer;
      break;
    //VAR 2 - side num
    case 'a': 
      globalSides-=incrementer;
      if (globalLines <2 ) globalSides = 1;
      break;
    case 's': 
      globalSides+=incrementer;
      
      break;
    //VAR 3 - render scale
    case 'z': 
      globalRndrScl-=incrementer*10;
      if (globalRndrScl < 1) globalRndrScl = 1;
      break;
    case 'x': 
      globalRndrScl+=incrementer*10;
      break;
    //VAR 5 - dimensions
    case 'd': 
      globalDimensions-=incrementer;
      if (globalDimensions < 1) globalDimensions = 1;
      
      break;
    case 'f': 
      globalDimensions+=incrementer;
      break;
    //VAR 6 - higher dimensions
    case 'c': 
      globalHigherDimensions-=incrementer;
      if (globalHigherDimensions < 1) globalHigherDimensions = 1;
      break;
    case 'v': 
      globalHigherDimensions+=incrementer;
      break;
    //VAR 4 - line width
    case 'e': 
      globalLineWidth-=.010;
      if (globalLineWidth <= 0) globalLineWidth = .001;
      
      break;
    case 'r': 
      globalLineWidth+=.010;
      break;
    //VAR 5 - incrementer
    case 't': 
      incrementer-=1;
      if (incrementer <= 0) incrementer = 1;
      break;
    case 'y': 
      incrementer+=1;
      break;
    case ' ': 
      isPaused = !isPaused;
      break;
    case 'n': 
      globalDimensions = globalLines;
      globalHigherDimensions = globalSides;
      break;
    case 'm': 
      isShowingVars = !isShowingVars;
      break;
    case 'b': 
      globalRndrScl = H/4;
      break;
    case '=': 
      saveFrame("../../../renderScreenShot/screenshot_######.png");
      break;
    case '\\':
      globalAngle = 0;
      globalDimensions = 6;
      globalHigherDimensions = 6;
      globalSides = 6;
      globalLines = 6;
      globalLineWidth = .01;
      globalRndrScl = 333; 
      
    break;
    case '.':
      halfLeaf = !halfLeaf;
    break;
    case '/':
      colorMode = colorMode < 3 ? colorMode+1 : 1;
      println("colormode: " + colorMode);

    case '[':
      globalAngle = globalAngle > 0 ? globalAngle-1 : 360;
    break;
    case ']':
      globalAngle = globalAngle < 360 ? globalAngle+1 : 0;

    break;
    case ';':
      ranIncrement();

    break;
    case '\'':
      globalHue = globalHue < 361 ? globalHue + (int) incrementer : 1;

    break;

      //RENDER OPTIONS 
    case '1': 
      renderOption = 1;
      break;
    case '2': 
      renderOption = 2;
      break;
    case '3': 
      renderOption = 3;
      break;
    case '4': 
      renderOption = 4;
      break;
    
      
  }

  if (key == CODED) {
    switch (keyCode) {
      case UP:
        offsetY += incrementer/10;
      break;
      case DOWN:
        offsetY -= incrementer/10;

      break;
      case LEFT:
        offsetX += incrementer/10;

      break;
      case RIGHT:
        offsetX -= incrementer/10;

      break;
    }
  }

  

}

