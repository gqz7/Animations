

float nebulaAge = 0;
float nebulaNoiseSeed;
float nebulaNoiseSpeed;
int nebulaSize;
float noiseRes;
float nebulaDensity;

float[][][] nebulaData;

class NebulaController {


  void birthNebula () {
    
    nebulaNoiseSeed = 3472.37;
    nebulaNoiseSpeed = .1;
    nebulaSize = 30;
    noiseRes = .03;
    nebulaDensity = 1;
    nebulaData = new float[nebulaSize*2][nebulaSize*2][nebulaSize*2];
    
    calculateNebula();
  }
  
  
  void renderNebula () {
    
    //nebulaNoiseSeed += nebulaNoiseSpeed;
    
    noFill();
    strokeWeight(.5);
  
      for (float x = -nebulaSize; x < nebulaSize; x+= nebulaDensity) {
        
            for (float z = -nebulaSize; z < nebulaSize; z+= nebulaDensity) {
              
                  for (float y = -nebulaSize; y < nebulaSize; y+= nebulaDensity) {
                      //println(x,y,z);
                      
                      float nebNoiseVal = nebulaData[(int)x+nebulaSize][(int)y+nebulaSize][(int)z+nebulaSize] ;
                      
                      if (nebNoiseVal > 0) {
                        push();
                          translate(x+nebNoiseVal*5, y+nebNoiseVal*5, z+nebNoiseVal*5);
                          stroke(10000);
                          //fill(10000);
                          box(nebulaDensity/5);
                        pop();
      
                      
                      }
  
                  }
  
            }
            
      }
  
  }

  void calculateNebula () {
  
    
    for (float x = -nebulaSize; x < nebulaSize; x+= nebulaDensity) {
      
          for (float z = -nebulaSize; z < nebulaSize; z+= nebulaDensity) {
            
                for (float y = -nebulaSize; y < nebulaSize; y+= nebulaDensity) {
                    //println(x,y,z);
                    float noiseX = x * noiseRes + nebulaNoiseSeed;
                    float noiseY = y * noiseRes + nebulaNoiseSeed;
                    float noiseZ = z * noiseRes + nebulaNoiseSeed;
                  
                    float nebNoiseVal = (float) noise.noise3_Classic(noiseX, noiseY, noiseZ);
                    
                    nebulaData[(int)x+nebulaSize][(int)y+nebulaSize][(int)z+nebulaSize] = nebNoiseVal;

                }

          }
          
    }
    
  
  }


}
