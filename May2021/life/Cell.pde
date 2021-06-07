boolean showCoord = false;


class Cell {
  
  private int cellNum;
  public int x;
  public int y;
  public float posX;
  public float posY;
  public boolean alive;
  public int age;
  
  public Cell (int x, int y, boolean alive) {
  
    age = 0;
    posX = x*cellSize;
    posY = y*cellSize;
    this.x = x;
    this.y = y;
    this.alive = alive;
    this.cellNum = y * cellSize + x;
    
    
  }
  
  public void render() {
  
    //println(alive);
    
    if (alive) {
      
      int hue = 333-age*11;
      int sat = 90-age;
      int brt = 100-age;
      if (brt < 10) brt = 10;
      fill(hue, sat, brt);
      stroke(hue, sat, brt);
      square(posX, posY, cellSize);
    }
    
    
    if (showCoord) {
      if (alive) {
          fill(0);
          textSize(20);
          text(x+", "+y, posX + cellSize/3, posY + cellSize/1.5);

      } else {
        
        fill(360);
        textSize(20);
        text(x+", "+y, posX + cellSize/3, posY + cellSize/1.5);
    
      
      }
    }
    
  }


}
