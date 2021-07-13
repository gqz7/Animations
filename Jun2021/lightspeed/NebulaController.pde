

float nebulaAge = 0;
float nebulaNoiseSeed;
float nebulaNoiseSpeed;
float nebulaSize;
float noiseRes;
float nebulaDensity;

class NebulaController {


  void birthNebula () {
    
    nebulaNoiseSeed = 3472.37;
    nebulaNoiseSpeed = .1;
    nebulaSize = 10;
    noiseRes = .1;
    nebulaDensity = 1;
  }
  
  
  void renderNebula () {
    
    //nebulaNoiseSeed += nebulaNoiseSpeed;
    
  
    for (float x = -nebulaSize; x <= nebulaSize; x+= nebulaDensity) {
      
          for (float z = -nebulaSize; z <= nebulaSize; z+= nebulaDensity) {
            
                for (float y = -nebulaSize; y <= nebulaSize; y+= nebulaDensity) {
                    //println(x,y,z);
                    //float noiseX = x * noiseRes + nebulaNoiseSeed;
                    //float noiseY = y * noiseRes + nebulaNoiseSeed;
                    //float noiseZ = z * noiseRes + nebulaNoiseSeed;
                  
                    //float nebNoiseVal = (float) noise.noise3_Classic(noiseX, noiseY, noiseZ);
                    
                    //if (nebNoiseVal > 0) {
                    //  push();
                    //    translate(x, y, z);
                    //    stroke(10000);
                    //    fill(10000);
                    //    box(nebulaDensity);
                    //  pop();
    
                    
                    //}

                }

          }
          
    }
  
  
  }



}
