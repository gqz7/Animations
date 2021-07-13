
class Cell {
  
  //private int cellNum;
  public int x;
  public int y;
  public int z;
  public float posX;
  public float posY;
  public float posZ;
  public boolean alive;
  public int age;
  
  public Cell (int x, int y, int z, boolean alive) {
  
    age = 0;
    posX = x*cellSize;
    posY = y*cellSize;
    posZ = z*cellSize;
    this.x = x;
    this.y = y;
    this.z = z;
    this.alive = alive;
    //this.cellNum = (y * cellSize) + (z * cellSize) + x;
    
    
  }
  
  public void render() {
  
    //println(alive);
    
    if (alive) {
      
      int hue = 333-age*11;
      int sat = 90-age;
      int brt = 100-age;
      if (brt < 10) brt = 10;
      
      fill(0);//fill(hue, sat, brt);
      //noFill();
      stroke(hue, sat, brt);
        push();
        
         translate(posX+cellSize/2, posY+cellSize/2, posZ+cellSize/2);
         box(cellSize);
         //sphere(cellSize); //MIGHT MELT COMPUTER
        
        pop();
      
      
    }
    
    
  }


}
