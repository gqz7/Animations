
  boolean isLatteral = false;

   final float spaceSpeed = renderSpeed;

   final int maxStarCount = 3333;
   final int startingTotal = 111;//(int) ( (float) maxStarCount * (float) .111);
  
   int totalStars;
  
   Star[] allStars;
   
   int starRenderQuality;

  
 class SpaceRender {

  
  
  void starGenesis() { //width, height
     
       Star[] startingStars = new Star[maxStarCount];
     
       for ( int i = 0; i < startingTotal; i++ ) {
         
         //float oX = random(-width*3, width*3);//(float) (random(width) - width/2);
         //float oY = random(-width*3, width*3);//(float) (random(height) - height/2);
         //float oZ = random(-width*3, width*3);//isLatteral ? random(-width*1.5, width*1.5) : random(-width*2, width*2);
         
         //startingStars[i] = new Star( oX, oY, oZ );
         
         startingStars[i] = new Star(0);
         
       }
       
       totalStars = startingTotal;
   
       allStars = startingStars;
  };
  
  void displayStars() {
    
    int starfieldSz = width*3;
    
    if (totalStars < maxStarCount && frames % 30 == 0 ) {
        allStars[totalStars++] = new Star( random(-starfieldSz, starfieldSz), random(-starfieldSz, starfieldSz), random(-starfieldSz, starfieldSz));
    }
     
    for (int i = 0; i < totalStars; i++) {
      //Star s = stars[i];
      //s.display();
      allStars[i].display();
   
    }
    
  }
  
 }
