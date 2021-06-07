//Game of life

//CONTROLS
/*
    R:       restart
    T:       leave trails toggle
    N:       skip one generation
    M:       skip four generations
    O:       decrease max framerate
    P:       increase max framerate
    U:       zoom out / decrease cell size
    I        zoom in / increase cell size
    0-3      select preset games (press R after selecting)
    Space:   pause
    R-Click: kill cell
    L-Click: birth cell
    

*/

//GLOBAL VARS
  //Noise algorithm that produces values used in this animation, not made by me
 OpenSimplex2S noise;
  
  int WIDTH = 3840;//3840; //1920 //1280 //800
  int HEIGHT = 2160;//2160; //1080 //720  //450
  
  boolean paused = true;
  boolean resetOn = true;
  
  int genType = 3;
  
  int frames = 0;
  float fps = 15;
  
  int cellSize =  11;
  int tempCellSize = cellSize;
  int cellCols;
  int cellRows;

  //array of Points to keep track of quadrent information and x/y position aswell as pixel index
  Cell[][] allCells;

  
  void setup() {
    //set canvas size
    //WIDTH //3840; //1920 //1280 //800
    //HEIGHT //2160; //1080 //720  //450
    size(3840,2160);
    
    //set color mode to hue/saturation/brightness which i perfer for my animations
    colorMode(HSB, 360, 100, 100);
    //noLoop();
    //create instance of the simplex noise class
    noise = new OpenSimplex2S( 314159265 );
    
    initalizeGame();
    frameRate(fps);
  }
  
  void keyPressed() {
    switch (key) {
      case ' ': 
        paused = !paused;
      break;
      case 't': 
        resetOn = !resetOn;
      break;
      case 'n':
        calcNextGen();
      break;
      case 'm':
        calcNextGen();
        calcNextGen();
        calcNextGen();
        calcNextGen();
      break;
      case 'r':
        initalizeGame();
      break;
      case 'o':
        fps-=5;
        if (fps < 1) fps = 1;
        frameRate(fps);
        println("FPS set to: " + fps);
      break;
      case 'p':
        fps+=5;
        if (fps > 60) fps = 60;
        frameRate(fps);
        println("FPS set to: " + fps);
      break;
      case 'u':
        tempCellSize--;
        if (tempCellSize < 1) tempCellSize = 1;
        println("Cell size: " + tempCellSize + "px");
      break;
      case 'i':
        tempCellSize++;
        println("Cell size: " + tempCellSize + "px");
      break;
      case '0':
      case '1':
      case '2':
      case '3':
        genType = Character.getNumericValue(key);
      break;
     
    }
    
    
  }
  
  void mouseDragged() {
  
    int indX = mouseX / cellSize;
    int indY = mouseY / cellSize;
    
    try {
      if (mouseButton == RIGHT) {
      
        allCells[indX][indY].alive = false;
      
      } else if (mouseButton == LEFT) {
      
        allCells[indX][indY].alive = true;
      
      }
    } catch (Exception e) {
    
    }
    
  
  }
  
  //loop function that runs on a loop 
  void draw() {
    
    //initalizeGame();
    
    if (resetOn) background(0); // reset screen
    
    //double count = 0;

    //itterate through all pixels/Points
    for ( int i = 0; i < allCells.length; i++) {  
      
      for ( int j = 0; j < allCells[i].length; j++) {
  
        allCells[i][j].render();
        //if (allCells[i][j].alive) count++;
      
      }
      
    } 
    
    if (!paused) calcNextGen();
    
    //println(count / (cellCols*cellRows));
  
  }
  
  void initalizeGame() {
    
    background(0);
    cellSize = tempCellSize;
    cellCols = WIDTH / cellSize;
    cellRows =  HEIGHT / cellSize;
    
    
    allCells = new Cell[cellCols][cellRows];
    
    int columns = cellCols;
    int rows = cellRows;
    boolean startsAlive;
    
    
    for (int i = 0; i < columns; i++) {
      
      for (int j = 0; j < rows; j++) {
        
        switch (genType) {
          case 0: 
            startsAlive = random(0,1) > .7;
          break;
          case 1: 
            double noiseVal = noise.noise2((double)i/77,(double)j/444);
            startsAlive = noiseVal > PI/42;
          break;
          case 2:
            startsAlive = false;
          break;
          case 3:
       
            if (
              i > (columns/4)+1 
              && i < (columns *3/4)-1 
              && j == rows/2
            ) { startsAlive = true;
            } else startsAlive = false;
          break;
          default: startsAlive = true;
        }
        
        
        allCells[i][j] = new Cell(i,j, startsAlive);
      
      }    
    
    }
    
    //calcNextGen();
  
  }
  
  void calcNextGen() {
    
    
    int[][] aliveCount = new int[cellCols][cellRows];
  
    //CALCULATE ALIVE COUNT
    for ( int i = 0; i < cellCols; i++) {   
      for ( int j = 0; j < cellRows; j++) {  
        int x = allCells[i][j].x;
        int y = allCells[i][j].y;
        
        aliveCount[i][j] = calcSurroundingAlive(x, y);
      }  
    }   
    
    //CHANGE ALIVE STATUS
    
    for ( int i = 0; i < cellCols; i++) {   
        //println();
      for ( int j = 0; j < cellRows; j++) { 
        //print(i, aliveCount[i][j]);
        int count = aliveCount[i][j];
        Cell cell = allCells[i][j];
        
        cell.age++;
        
        if (count == 3 && !cell.alive) {
          cell.alive = true;
          cell.age = 0;
        } else if (cell.alive && count < 2 || count > 3 ) {
          cell.alive = false;
          cell.age = 0;
        }
        
      }  
    }   
    
    
    
  }

  
  int calcSurroundingAlive(int x, int y) {
    
    int aCount = 0;
    for (int i = x - 1; i < x + 2; i++) {
      for (int j = y - 1; j < y + 2; j++) {
        
          //if (x == 0 && y == 0) println (i,j);
        
         if (
           i >= 0 && j >= 0
           && i < cellCols && j < cellRows 
           && allCells[i][j].alive
           && !(i == x && j == y)
         ) { aCount++; }
      
      }
    
    }
    //println(x, y, aCount);
    return aCount;
  }
  
