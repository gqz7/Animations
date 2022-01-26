final int W = 3840;//(8K) 7680// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 //1680 //2560
final int H = 2160;//(8K) 4320// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720 //1050 //1600
boolean isPaused = true;
float frames;
int time; 

float renderSpeed = 1;

float globalLines = 15;
float globalSides = 1;
float globalDimensions = 20;
float globalHigherDimensions = 10;
float globalDeityNum = 10;

float globalAngle = 90;
float globalHDAngle = 0;
float globalDeityAngle = 0;
float globalRndrScl = 272;
float globalLineWidth = .0001;
float globalLineAlpha = 1;
float incrementer = 1;

int colorMode = 1;
int globalLineHue = 177;
int globalBgHue = 339;

int renderOption = 4;
boolean zoomedIn = false;
boolean isShowingVars = false;

boolean halfLeaf = false;
boolean leafSymmetry = true;
boolean toggle1 = true;
boolean toggle2 = true;

boolean dragLocked = true;

float xOffset = 0;
float yOffset = 0;
float transX = 0;// screenshots: -300;
float transY = 0;
Space space;

void settings() {
  //set canvas size
  fullScreen();
  size(W, H); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720

}


void setup() {
  //set colormode
  colorMode(HSB, 360, 100, 100, 100);
  // noLoop();
  // noCursor();
  space = new Space();

    // background(0);
}

//loop function that runs on a loop 
void draw() {


  space.renderScene(renderOption);
 
  if (!isPaused) {
    // yOffset += 1;
    //println(frames);
    frames+=renderSpeed;
    time++;
    // globalRndrScl -= .7 * renderSpeed;

    if ( time % 111 == 0 ) {
      // incrementAll(1);
      // ranIncrement();
    }

    // globalLines += .02 * renderSpeed;
    // globalSides += .005;
    // globalDimensions += .002;
    // globalHigherDimensions += .001;
    // globalRndrScl = map(frames, 0, 3333, 3333, 222);

    if (toggle1) globalHDAngle = globalHDAngle > 0 ? globalHDAngle - .01 * incrementer : 360;
    if (toggle2) globalDeityAngle = globalDeityAngle > 0 ? globalDeityAngle - .01 * incrementer: 360;
    // globalAngle += .05;

    if (colorMode == 1) {
      globalBgHue += .2;
      globalLineHue += .2;
    }

    // saveFrame("../../../newrender/img_######.png");

  }

}

void incrementAll (int inc) {
  globalLines += inc;
  globalSides += inc;
  globalDimensions += inc;
  globalHigherDimensions += inc;
  globalDeityNum += inc;
}

void ranIncrement() {
  float ran = random(1);
  if ( ran < .2) {
    globalLines += incrementer;
  } else if ( ran < .4) {
    globalSides += incrementer;
    
  } else if ( ran < .6) {
    globalDimensions += incrementer;
    
  } else if ( ran < .8) {
    globalHigherDimensions += incrementer;

  } else {
    globalDeityNum += incrementer;
  }

  println((int)globalSides+"-"+(int)globalLines+"-"+(int)globalDimensions+"-"+(int)globalHigherDimensions);
}

void displayVars() {

  fill(0);
  rect(0, 0, 444, 1444);



  textSize(30);
  fill(360);
  text("frames: " + frames, 50, 30);
  text("lines(q/w): " + globalLines, 50, 70);
  text("sides(a/s): " + globalSides, 50, 110 );
  text("dim(d/f): " + globalDimensions, 50, 150 );
  text("higDm(c/v): " + globalHigherDimensions, 50, 190 );
  text("deityNum(g/h): " + globalDeityNum, 50, 230 );
  text("scl(z/x): " + globalRndrScl, 50, 300 );
  text("lw(e/r): " + globalLineWidth, 50, 350 );
  text("inc(t/y): " + incrementer, 50, 400 );
  text("rndOpt(#): " + renderOption, 50, 450 );
  text("2X scl(n)", 50, 500 );
  text("/2 scl(b)", 50, 550 );
  text("screenshot(=)", 50, 600 );
  text("toggleDis(m): "+(isShowingVars?"on":"off") , 50, 650 );
  text("toggleZoom(,): "+(zoomedIn?"on":"off"), 50, 700 );
  text("halfLeaf(.): "+(halfLeaf?"on":"off"), 50, 750 );
  text("colorMode(/): "+colorMode, 50, 800 );
  text("transX: "+transX, 50, 850 );
  text("transY: "+transY, 50, 900 );
  text("resetVars(\\)", 50, 950 );
  text("G-angle( [/] ):" + globalAngle, 50, 1000 );
  text("D-angle( o/p ):" + globalDeityAngle, 50, 1050 );
  text("HD-angle( u/i ):" + globalHDAngle, 50, 1100 );
  text("HD-rotate(j):"+(toggle1?"on":"off"), 50, 1150 );
  text("D-rotate(k):"+(toggle2?"on":"off"), 50, 1200 );
  text("leaftType(l):"+(leafSymmetry?"0":"1"), 50, 1250 );
  text("Colors( ' ) bg:"+globalBgHue+" ln:"+globalLineHue, 50, 1300 );
  text("incrementAll(-)", 50, 1350 );
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
      if (globalSides <2 ) globalSides = 1;
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
    //VAR 7 - deitiy dimensions
    case 'g': 
      globalDeityNum-=incrementer;
      if (globalDeityNum < 1) globalDeityNum = 1;
      break;
    case 'h': 
      globalDeityNum+=incrementer;
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
    //PAUSE
    case ' ': 
      isPaused = !isPaused;
      break;
    case 'm': 
      isShowingVars = !isShowingVars;
      break;
    case 'j': 
      toggle1 = !toggle1;
      break;
    case 'k': 
      toggle2 = !toggle2;
      break;
    case 'l': 
      leafSymmetry = !leafSymmetry;
      break;
    case 'b': 
      globalRndrScl = globalRndrScl/2;
      break;
    case 'n': 
      globalRndrScl = globalRndrScl*2;
      break;
    case '=': 
      saveFrame("../../../renderScreenShot/screenshot_######.png");
      break;
    case '-': 
      incrementAll((int)incrementer);
      // ranIncrement();
      break;
    case '\\':
      globalAngle = 0;
      globalDeityAngle = 0;
      globalHDAngle = 0;
      globalDimensions = 1;
      globalHigherDimensions = 1;
      globalSides = 1;
      globalLines = 1;
      globalDeityNum = 1;
      globalLineWidth = .01;
      globalRndrScl = 272; 
      transX = 0;
      transY = 0;
      halfLeaf = false;
    break;
    case '.':
      halfLeaf = !halfLeaf;
    break;
    case '/':
      colorMode = colorMode < 3 ? colorMode+1 : 1;
      println("colormode: " + colorMode);
    break;
    case '[':
      globalAngle = globalAngle > 0 ? globalAngle-incrementer : 360;
    break;
    case ']':
      globalAngle = globalAngle < 360 ? globalAngle+incrementer : 0;

    break;
    case 'o':
      globalDeityAngle = globalDeityAngle > 0 ? globalDeityAngle-incrementer : 360;
    break;
    case 'p':
      globalDeityAngle = globalDeityAngle < 360 ? globalDeityAngle+incrementer : 0;

    break;
    case 'u':
      globalHDAngle = globalHDAngle > 0 ? globalHDAngle-incrementer : 360;
    break;
    case 'i':
      globalHDAngle = globalHDAngle < 360 ? globalHDAngle+incrementer : 0;

    break;
    case ';':
        globalLineAlpha = globalLineAlpha-incrementer > 0 ? globalLineAlpha-incrementer : .01;
    break;
    case '\'':
        globalLineAlpha = globalLineAlpha < 100 ? globalLineAlpha+incrementer : globalLineAlpha;

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
    case '5': 
      renderOption = 5;
      break;
  }

  if (key == CODED) {
    switch (keyCode) {
      case UP:
        transY += incrementer/10;
      break;
      case DOWN:
        transY -= incrementer/10;
      break;
      case LEFT:
        transX += incrementer/10;

      break;
      case RIGHT:
        transX -= incrementer/10;

      break;
    }
  }

  

}

void mousePressed() {
  dragLocked = true; 
  xOffset = mouseX-transX; 
  yOffset = mouseY-transY; 

}

void mouseDragged() {
  if(dragLocked) {
    transX = mouseX-xOffset; 
    transY = mouseY-yOffset; 
  }
}

void mouseReleased() {
  dragLocked = false;
}

void mouseWheel(MouseEvent event) {
  if (globalRndrScl > 10) {
    globalRndrScl -= event.getCount() * incrementer * 2;
  } else if ( globalRndrScl == 10 && event.getCount() == 1) {
    globalRndrScl = 10 * 2;
  } else {
    globalRndrScl = 10;
  }
}