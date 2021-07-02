//Game of life

//CONTROLS
/*
    R:       restart
    T:       leave trails toggle
    N:       skip one generation
    M:       skip four generations
    O:       decrease max framerate (FPS)
    P:       increase max framerate (FPS)
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
  
  boolean paused = false;
  boolean resetOn = true;
  
  int genType = 3;
  
  int frames = 0;
  float fps = 30;
  
  int cellSize = 4;
  int tempCellSize = cellSize; //this allows the cell size to change mid game without breaking logic 
  
  Game[] games;
  
    
  //loop function that runs on a loop 
  void draw() {
    
    //circle(WIDTH/2, HEIGHT/2, 10);
    frames++;
    //initalizeGame();
    
    if (resetOn) background(0); // reset screen
    
    //double count = 0;

    renderLife();
    //renderGames();
    //calcNextGen();
    println(frames);
    //println(count / (cellCols*cellRows));
  
  }
    
  void setup() {
    //set canvas size
    //WIDTH //3840; //1920 //1280 //800
    //HEIGHT //2160; //1080 //720  //450
    size(3840,2160);
    
    //set color mode to hue/saturation/brightness which i perfer for my animations
    colorMode(HSB, 360, 100, 100);
    
    //NO LOOP, program will only draw to the screen on time ------------------------------------->
    //noLoop();
    
    //create instance of the simplex noise class
    noise = new OpenSimplex2S( 314159265 );
    
    initalizeGames();
    frameRate(fps);
  }

  
  void initalizeGames() {
    
    
    //CREATE ONE GAME (grows bottom to top
    //games = new Game[1];
    //cellSize = tempCellSize;
    //int cellCols = WIDTH / cellSize;
    //Game game1 = new Game(0, 0, cellCols, 0,WIDTH/2, -PI/4, 0, 0);
    //games[0] = game1;
    
    
    
    //CREATE 4 GAMES
    games = new Game[4];
    cellSize = tempCellSize;
    int heightCells = HEIGHT / cellSize;
    
    float xTrans1 = WIDTH/2;
    float yTrans1 = HEIGHT/2;
    float xTrans2 = -HEIGHT/2 - cellSize/2;
    float yTrans2 = -cellSize/2;
    
    Game game1 = new Game(1, 2, heightCells, xTrans1, yTrans1, 0, xTrans2, yTrans2);
    Game game2 = new Game(1, 2, heightCells, xTrans1, yTrans1, PI, xTrans2, yTrans2);
    Game game3 = new Game(1, 2, heightCells, xTrans1, yTrans1, PI/2, xTrans2, yTrans2);
    Game game4 = new Game(1, 2, heightCells, xTrans1, yTrans1, -PI/2, xTrans2, yTrans2);
    
    games[0] = game4;
    games[1] = game3;
    games[2] = game2;
    games[3] = game1;
    
    
    
    //calcNextGen();
  
  }
  
  void calcNextGen() {
    
    for (int i = 0; i < games.length; i++) {
      games[i].calculateGen();
    
    }
    
  }

  void renderGames() {
    
    //games[0].renderGame();
    //games[1].renderGame();
    push();
      translate(WIDTH/2, HEIGHT/2);
      rotate(PI/4);
      translate(-WIDTH/2, -HEIGHT/2);
      for (int i = 0; i < games.length; i++) {
        
        if (games[i].generation != 0) games[i].renderGame();
        
      
      }
    pop();
    
  }
  
  void renderLife() {
       
       for (int i = WIDTH; i > 0; i--) {
       
          renderGames();
          calcNextGen();
       
       }
       
    initalizeGames();
             
  }
  
  
  //USER CONTROLS
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
        initalizeGames();
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
  
  
  }
  
  //int calcSurroundingAlive(int x, int y) {
    
  //  int aCount = 0;
  //  for (int i = x - 1; i < x + 2; i++) {
  //    for (int j = y - 1; j < y + 2; j++) {
        
  //        //if (x == 0 && y == 0) println (i,j);
        
  //       if (
  //         i >= 0 && j >= 0
  //         && i < cellCols && j < cellRows 
  //         && allCells[i][j].alive
  //         && !(i == x && j == y)
  //       ) { aCount++; }
      
  //    }
    
  //  }
  //  //println(x, y, aCount);
  //  return aCount;
  //}
  
