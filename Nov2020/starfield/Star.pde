

class Star {
 
   private float x;
   private float y;
   private float light;
   
   
   public Star( float originX, float originY) {
     light = 10;
     
     x = originX;
     y = originY;
     
   }
   
   void display() {
     
     fill(light);
     
     ellipse(x, y, 3, 3);
     
     this.updatePos();
   }
   
   void updatePos() {
      x *= 1.01;
      y *= 1.01;
      light *= 1.1;
      
      if ( x > width/2 || x < -width/2 || y > height/2 || y < -height/2) this.reset();
   }
   
   void reset() {
     
     light = 10;
     x = random(-100, 100);
     y = random(-100, 100);

   
   }
   
}
