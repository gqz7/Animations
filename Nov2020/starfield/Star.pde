

class Star {
 
   private float x;
   private float y;
   private float light;
   
   
   public Star() {
     light = 10;
     
     float[] originPoints = StarCalculation.generateOriginPoints();
     
     x = originPoints[0];
     y = originPoints[1];
     
   }
   
}
