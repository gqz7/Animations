

float cellSize = 1;
float gameSize = 25;
float gameDimensions = gameSize / cellSize;

float gameGenNoiseSeedX = 2233.23423;
float gameGenNoiseSeedY = 3443.23423;
float gameGenNoiseSeedZ = 2414.23423;

Cell[][][] cells;

class ThreeDimLife {
  
    public void lifeGenesis (int genType) {
        gameGenNoiseSeedY += .0125;
      
        cells = new Cell[(int)gameDimensions][(int)gameDimensions][(int)gameDimensions];
        
        for (int x = 0; x < gameDimensions; x++) {
        
            for (int y = 0; y < gameDimensions; y++) {
            
                for (int z = 0; z < gameDimensions; z++) {
                  boolean alive;
                  switch (genType) {
                    
                    //RANDOM
                    case 1:
                      alive = random(0,1) > .9 ? true : false;//random(0,1) > .99 ? true : false;
                      //println(alive);
                      cells[x][y][z] = new Cell(x, y, z, alive);
              
                    break;
                    //NOISE GENERATED
                    case 2:
                      double noiseVal = noise.noise3_Classic( gameGenNoiseSeedX + (float)x/10, gameGenNoiseSeedY + (float)y/10, gameGenNoiseSeedZ + (float)z/10);
                      //println(x, y, z, noiseVal);
                      alive = noiseVal > 0 ? true : false;//random(0,1) > .99 ? true : false;
                      //println(alive);
                      cells[x][y][z] = new Cell(x, y, z, alive);
              
                    break;
                  
                  }
                   
                  
            
                }
            
            }    
        
        }
    
    }
  
  
    public void renderLife () {
      
      strokeWeight(1);
      
      push();
      
      
      translate(-gameSize/2,-gameSize/2,-gameSize/2);
    
        
        for (int x = 0; x < gameDimensions; x++) {
        
            for (int y = 0; y < gameDimensions; y++) {
            
                for (int z = 0; z < gameDimensions; z++) {
                   
                    
                  Cell c = cells[x][y][z];
                  
                  c.render();
            
            
                }
            
            }    
        
        }
        
      pop();
      
      if (frames % 20 == 0 ) {
        calcNextGen();
      
      }
      
    
    }
    
    public void calcNextGen () {
      
      
      
        int[][][] newCells = new int[(int)gameDimensions][(int)gameDimensions][(int)gameDimensions];
        
        
        //CALCULATE THE NUMBER OF ALIVE NEIGHBORS
        
        for (int x = 0; x < gameDimensions; x++) {
        
            for (int y = 0; y < gameDimensions; y++) {
            
                for (int z = 0; z < gameDimensions; z++) {
                  
                  int aliveN = 0;
                  
                  Cell c = cells[x][y][z];
                  
                  for ( int i = -1; i < 2; i++) {
                  
                    for (int j = -1; j < 2; ++j) {
                      
                      for (int k = -1; k < 2; ++k) {
                          if ( 
                              c.x+i != -1 && c.y+j != -1 && c.z+k != -1 
                              &&  !(k == 0 && j == 0 && i == 0) 
                              //&& //WRITE CODE FOR c.x + 1 not greateer than length
                          ) {
                           
                             Cell n = cells[c.x-i][c.y-j][c.z-k];
                             
                             if (n.alive) {
                               aliveN++;
                             }

                          }
                      }

                    }
                  
                  } 
                  
                  if ( aliveN > 6 && aliveN < 18) {
                    newCells[x][y][z] = 1;
                  } else {
                    newCells[x][y][z] = 0;
                  }
            
                }
            
            }    
        
        }
        
        
        ///UPDATE THE STATUS OF THE CELLS

         for (int x = 0; x < gameDimensions; x++) {
        
            for (int y = 0; y < gameDimensions; y++) {
            
                for (int z = 0; z < gameDimensions; z++) {
            
                  if (newCells[x][y][z] == 1) {
                    cells[x][y][z].alive = true;
                  } else {
                    cells[x][y][z].alive = false;
                  
                  }
                  
                }
          
            }
            
         }
    
    }



}
