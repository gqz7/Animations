

static class StarCalculation {
  
    private final static int maxStarCount = 777;
    
    static float[] generateOriginPoints () {
     
     float[] points = new float[2]; 
      
     return points;
   }
   
   static Star[] starGenesis(float w, float h) { //width, height
     
       int startingTotal = (int) ( (float) maxStarCount * (float) .75);
       
       println(startingTotal);
     
       Star[] startingStars = new Star[maxStarCount];
     
       for ( int i = 0; i < startingTotal; i++ ) {
         
         float ranX = (float)Math.random()* 1000;
       
         float ranY = (float)Math.random()* 1000;
       }
   
       return new Star[777];
   };
}
