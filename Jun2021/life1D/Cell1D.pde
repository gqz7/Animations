boolean showCoord = false;


class Cell1D {
  
  private int index;
  public boolean alive;
  public int age;
  public float posX;
  public float posY;
  
  public Cell1D (int index, boolean alive) {
  
    this.alive = alive;
    this.index = index;
    posX = index*cellSize;
    posY = 0;
    age = 0;
    
  }
  
  public void renderCell(int gen, int len) {
  
    //age++;
    
    //maturity = random(0,1) > .2 ? maturity+1 : maturity;
    //println(alive);
    posY = cellSize*gen;    
        
    if (alive) {
      
      int hue = abs(333-(gen/5)+abs(index-len/2)+(frames*4)) % 360;
      int sat = 111-age/3;
      int brt = 177-age/3;
      
      fill(hue, sat, brt);
      stroke(hue, sat, brt);
      square(posX, posY, cellSize);
    }
    //if (alive) {
      
    //  int hue = 333-age*11;
    //  int sat = 90-age;
    //  int brt = 100-age;
    //  if (brt < 10) brt = 10;
    //  fill(hue, sat, brt);
    //  stroke(hue, sat, brt);
    //  square(posX, posY, cellSize);
    //}
   
    
  }


}
