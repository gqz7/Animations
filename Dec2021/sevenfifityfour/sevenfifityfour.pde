final int W = 1920;// (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 //1680
final int H = 1080;// (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720 //950
boolean isPaused = false;
float frames;
int time; 
float renderSpeed = 1.0;

float globalVar1 = 12;
float globalVar2 = 6;
int globalVar3 = 111;
float globalVar4 = .1;
float globalVar5 = 8;
float globalVar6 = 4;
float incrementer = 1;

boolean isShowingVars = false;
int renderOption = 3;

void settings() {
  //set canvas size
  fullScreen();
  size(W, H); //width: (4K) 3840; // (HD) 1920 //(Square HD) 1280 //(SD) 1280 // height: (4K) 2160; //(HD) 1080 //(Square HD) 1024//(SD) 720

}


void setup() {
  //set colormode
  colorMode(HSB, 360, 100, 100);
  // noLoop();

    // background(0);
}

//loop function that runs on a loop 
void draw() {
 
  if (!isPaused) {
    //println(frames);
    frames+=renderSpeed;
    time++;
    // saveFrame("../../../newrender/img_######.png");
  }

  renderScene();

}


void renderScene () {

    clear();
    background(0);
    if (isShowingVars) displayVars();
    
    stroke(360);
    strokeWeight(globalVar4 > 0 ? globalVar4 : .01);
    
    translate(W/2, H/2);

    switch (renderOption) {
      case 1: 
        //STANDARD ENTITY
        renderEntity(globalVar1, globalVar2, globalVar3);
      break;
      case 2: 
        //INTERDIMENSIONAL
        renderInterdimensionalEntity(
          globalVar5,//dim
          globalVar1,//lines
          globalVar2,//side
          globalVar3 //size
        );
      break;
      case 3: 
        //HIGHER DIMENSIONAL
        renderHigherDimensionalEntity(
          globalVar6,//higherdims
          globalVar5,//dim
          globalVar1,//lines
          globalVar2,//side
          globalVar3 //size
        );
      break;
      case 4: 
        //ENTITY GRID
        translate(-W/2, -H/2);
        renderEntityGrid();
      break;
    }    
 
}



void renderHigherDimensionalEntity (float numOfHigherDims, float numOfDims, float numOfLines, float numOfSides, float leafSize) {
  
  //
  for (float i = 0; i < numOfHigherDims; ++i) {
      push();
        float x1 = (cos(map(i, 0, numOfHigherDims, 0, TWO_PI)) * leafSize);
        float y1 = (sin(map(i, 0, numOfHigherDims, 0, TWO_PI)) * leafSize);

        translate(x1, y1);
        renderInterdimensionalEntity(numOfDims, numOfLines, numOfSides, leafSize);

      pop();
    }
}

void renderInterdimensionalEntity (float numOfDims, float numOfLines, float numOfSides, float leafSize) {
    for (float i = 0; i < numOfDims; ++i) {
      push();
        float x1 = (cos(map(i, 0, numOfDims, 0, TWO_PI)) * leafSize);
        float y1 = (sin(map(i, 0, numOfDims, 0, TWO_PI)) * leafSize);

        translate(x1, y1);
        renderEntity (numOfLines, numOfSides, leafSize);

      pop();
    }

}


void renderEntity (float numOfLines, float numOfSides, float leafSize) {
    for (int i = 0; i < numOfSides; ++i) {
      push();
        rotate(map(i, 0, numOfSides, 0, TWO_PI));
        renderLeaf(numOfLines, leafSize);
      pop();
    }
}

void renderLeaf (float numOfLines, float size) {
    for (float i = 0; i < numOfLines; ++i) {

        float x1 = (cos(map(i, 0, numOfLines, 0, TWO_PI)) * size);
        float y1 = (sin(map(i, 0, numOfLines, 0, TWO_PI)) * size);

        line(x1, y1, 0, -size);
    }
}

void displayVars() {
  textSize(20);
  fill(360);
  push();
    text("lines(q): " + globalVar1, 50, 100);
    text("sides(a): " + globalVar2, 50, 150 );
    text("scl(z): " + globalVar3, 50, 200 );
    text("lw(e): " + globalVar4, 50, 250 );
    text("dim(d): " + globalVar5, 50, 300 );
    text("higDm(c): " + globalVar6, 50, 350 );
    text("inc(t): " + incrementer, 50, 400 );
    text("rndOpt(#): " + renderOption, 50, 450 );
    text("normalize(n)", 50, 500 );
    text("toggleDis(m)", 50, 550 );
  pop();
}


void keyPressed() {
  switch (key) {
    //VAR 1 - line num
    case 'q': 
      globalVar1-=incrementer;
      break;
    case 'w': 
      globalVar1+=incrementer;
      break;
    //VAR 2 - side num
    case 'a': 
      globalVar2-=incrementer;
      break;
    case 's': 
      globalVar2+=incrementer;
      break;
    //VAR 3 - render scale
    case 'z': 
      globalVar3-=incrementer*10;
      break;
    case 'x': 
      globalVar3+=incrementer*10;
      break;
    //VAR 5 - dimensions
    case 'd': 
      globalVar5-=incrementer;
      break;
    case 'f': 
      globalVar5+=incrementer;
      break;
    //VAR 6 - higher dimensions
    case 'c': 
      globalVar6-=incrementer;
      break;
    case 'v': 
      globalVar6+=incrementer;
      break;
    //VAR 4 - line width
    case 'e': 
      globalVar4-=.010;
      if (globalVar4 <= 0) globalVar4 = .001;
      
      break;
    case 'r': 
      globalVar4+=.010;
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
      globalVar5 = globalVar1;
      globalVar6 = globalVar2;
      break;
    case 'm': 
      isShowingVars = !isShowingVars;
      break;
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

  

}


void renderEntityGrid () {

    clear();
    background(0);
    
    stroke(360);
    strokeWeight(.5);
    
    int minNum = (int) globalVar1;
    int maxNum = (int) (globalVar1 + globalVar2);

    int minSpace = H < W ? H : W;

    int enitiySz = (int) (minSpace / ((maxNum-minNum+1) * 2.5));

    for (int lineNum = minNum; lineNum <= maxNum; ++lineNum) {
      for (int sideNum = minNum; sideNum <= maxNum; ++sideNum) {
        push();
          float transX = map(lineNum, minNum, maxNum, 0, W - enitiySz*3) + enitiySz*1.5;
          float transY = map(sideNum, minNum, maxNum, 0, H - enitiySz*3) + enitiySz*1.5;
          translate(transX, transY);

          renderEntity(lineNum, sideNum, enitiySz);

        pop();
      }
    }
}