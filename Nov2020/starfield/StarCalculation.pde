

static class StarCalculation {
  
    private final static int maxStarCount = 777;
    private final static int WIDTH = 1920;//3840; //1920
    private final static int HEIGHT = 1080;//2160; //1080
    
    static float[] generateOriginPoints () {
     
     float[] points = new float[2]; 
     
     float[0] =  (float) random(WIDTH);
      
     return points;
   }
   
   static Star[] starGenesis(float w, float h) { //width, height
     
       starfield f = new starfield();
     
       int startingTotal = (int) ( (float) maxStarCount * (float) .75);
     
       Star[] startingStars = new Star[maxStarCount];
     
       for ( int i = 0; i < startingTotal; i++ ) {
         
         startingStars[i] = f.new Star();
         
       }
   
       return startingStars;
   };
}
