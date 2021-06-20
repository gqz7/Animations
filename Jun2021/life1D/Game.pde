class Game {

  public int ruleSet;
  public int genPreset;
  public int gameWidth; 
  public int generation;
  public float xPos; 
  public float yPos;
  public float xTrans; 
  public float yTrans;
  public float rotation;
  public Cell1D[] cells;
  
  Game (int ruleSet, int genPreset, int gameWidth, float xPos, float yPos, float rotation, float xTrans, float yTrans) { 
  
    this.gameWidth = gameWidth;
    this.genPreset = genPreset;
    this.ruleSet = ruleSet;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xTrans = xTrans;
    this.yTrans = yTrans;
    this.rotation = rotation;
    
    cells = new Cell1D[gameWidth];
    generation = 0;
    
    startGame();
    
    
  }
  
   void startGame() {
     
     switch (genPreset) {
       case 0:
          for (int i = 0; i < cells.length; i++) {
    
            cells[i] = new Cell1D(i, true);
            
          }
          
          cells[gameWidth/2].alive = false;
       break;
       case 1:
          for (int i = 0; i < cells.length; i++) {
    
            cells[i] = new Cell1D(i, random(0,1) > .5 ? true : false);
            
          }
          
       break;
       case 2:
           for (int i = 0; i < cells.length; i++) {
    
            cells[i] = new Cell1D(i, false);
            
          }
          
          cells[gameWidth/2].alive = true;
          
          for (int i = 0; i < frames; i++) {
          
            calculateGen();
            generation--;
          
          }
          
       break;
     }
    
  
  }     
   
   
  void calculateGen() {
    
    generation++;
    
    switch (ruleSet) {
      case 0:
          rule30();
          break;
      case 1:
          rule90();
          break;
      default:
          acidentialSirpinskiRule();
      break;
    }
   
  } 
   
  void renderGame() {
    
    push();
      
      translate(xPos, yPos);
      rotate(rotation);
      translate(xTrans, yTrans);
      
      if (genPreset == 2) {
        
       translate(-cellSize*frames, -cellSize*frames); 
      
      }
    
      for (int i = 0; i < cells.length; i++) {
      
        cells[i].renderCell(generation, cells.length);
        
        //println(cells[i]);
        
       // if (cells[i].alive) {
       //     //print(  "1");
       //     count++;
       // } else {
       //    print(  count);
       //   count = 0;  
       //}
      
         
      }
    
    pop();
   
  }
  
  void rule30 () {
    
    boolean[] newState = new boolean[cells.length];
    
    for (int i = 0; i < cells.length; i++) {
    
       //    TRUE IS ALIVE --- FALSE IS DEAD
       
       boolean leftState = i == 0 ? true : cells[i-1].alive;
       boolean curState = cells[i].alive;
       boolean rightState = i == cells.length-1 ? true : cells[i+1].alive;
       
       if ( 
         (leftState && !(rightState && curState) )
         || (curState && rightState && !leftState) 
       ) {
         
         newState[i] = false;
         
       } else { 
       
         newState[i] = true;
       
       }
            
    }
    
    for (int i = 0; i < cells.length; i++) {
    
       cells[i].alive = newState[i];
            
    }
    
    
  
  
  }
  
  void rule90 () {
      boolean[] newState = new boolean[cells.length];
    
      for (int i = 0; i < cells.length; i++) {
      
         //    TRUE IS ALIVE --- FALSE IS DEAD
         
         boolean leftState = i == 0 ? true : cells[i-1].alive;
         //boolean curState = cells[i].alive;
         boolean rightState = i == cells.length-1 ? true : cells[i+1].alive;
         
         if ( 
           (leftState != rightState )
         ) {
           
           newState[i] = true;
           
         } else { 
         
           newState[i] = false;
         
         }
              
      }
      
      for (int i = 0; i < cells.length; i++) {
      
         cells[i].alive = newState[i];
              
      }
      
      cells[0].alive = false;
      cells[cells.length-1].alive = false;
  
  }
  
  void acidentialSirpinskiRule () {
    
    boolean[] newState = new boolean[cells.length];
    
    for (int i = 0; i < cells.length; i++) {
    
       //    TRUE IS ALIVE --- FALSE IS DEAD
       
       boolean leftState = i == 0 ? true : cells[i-1].alive;
       boolean curState = cells[i].alive;
       boolean rightState = i == cells.length-1 ? true : cells[cells.length-1].alive;
       
       if ( 
         leftState && !(rightState && curState) 
         || curState && rightState && !leftState 
       ) {
         
         newState[i] = false;
         
       } else { 
       
         newState[i] = true;
       
       }
            
    }
    
    for (int i = 0; i < cells.length; i++) {
    
       cells[i].alive = newState[i];
            
    }
    
    
  
  
  }



}

    //if (gameWidth % 2 != 0) {
    //  cellsL = new Cell1D[gameWidth/2];
      
    //} 
    //else {
    //  cellsL = new Cell1D[gameWidth/2+1];
    
    //}
