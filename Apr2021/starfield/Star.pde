
class Star {
 
   private float x;
   private float y;
   private float velocity;
   private float light;
   private float angleZ;
   private float angleY;
   private float z;
   
   
   public Star( float originX, float originY, float originZ) {
     light = 10;
     velocity = random(.01, .025);
     x = originX;
     y = originY;
     z = originZ;
     
     if (isLatteral) 
       calculateAnglesLatteralExpansion();
     else
       calculateAnglesCenterExpansion();
   }
   
   void display() {
     
     float distance = pow( pow(x,2) + pow(y,2) + pow(z,2), (float)1/3);
     float maxLen = map( velocity, .01, .03, 100, 2500);
     float trailLen = map( distance, 0, maxDistance, 0, maxLen);
     float trailWidth = trailLen/50 + .3;
     
     if (isTestingStars) {
       if (abs(x) < abs(y)) {
          
         fill(327, 100, 100);
       } else {
         //return
         fill(360);
       }
     } else {
     
       fill(light);//fill(360);// 
     
     }
     
     noStroke();
     
     pushMatrix();
     translate(x, y, z);
     //rotateZ(angleZ);
     //rotate(angleZ);
     
     rotateY(angleY);
     rotateZ(angleZ);
     //rotateX(random(0, PI*2));
     //ellipse(0,0,light/50, light/50);
     ellipse(0, 0, trailLen, trailWidth);
     popMatrix();
     
     if (!isTestingStars) {
      if (isLatteral) 
        this.updatePosLatteral();
      else
        this.updatePosCenter();
     
     }
     //calculateAnglesCenterExpansion();
   }
   
   void updatePosCenter() {
     
      x *= 1 + velocity * speed;
      y *= 1 + velocity * speed;
      z *= 1 + velocity * speed;
      light = light < 350 ? light * (1 + velocity*2.7) : 350;
      
      if ( z > width*10 || z < -width*10  || y > height*10 || y < -height*10 || x > width*10 || x < -width*10 ) this.reset();
   }
   
   void updatePosLatteral() {
     
      z += ((1+velocity) * speed * 37) + y/1000 + x/1000;
      if (velocity < .03) velocity+=speed/2222;
      light = light < 255 ? light * (1 + velocity*2) : 255;
      
      if ( z > width*1.5 || z < -width*1.5  || y > height*10 || y < -height*10 || x > width*10 || x < -width*10 ) this.reset();
   }
   
   void reset() {
     
     light = 10;

     float 
       ranAngle = random(100),
       radius = isLatteral ? 5 :25,
       randomX1 = (cos(ranAngle) * radius),
       randomY1 = (sin(ranAngle) * radius),
       randomX2 = (cos(ranAngle) * radius * 4),
       randomY2 = (sin(ranAngle) * radius * 4),
       ranNum = random(1, 17);

      x =  (randomX2 * ranNum) + (randomX1 * ranNum) * random(1);
      y =  (randomY2 * ranNum) + (randomY1 * ranNum) * random(5);
      z =  isLatteral ? random(-2000, -1000) : random(-500, 500);
      velocity = random(.01, .025);
     
     if (isLatteral) 
       calculateAnglesLatteralExpansion();
     else
       calculateAnglesCenterExpansion();
   }
   
   void calculateAnglesCenterExpansion() {
     
     if (abs(x) > abs(y)) {

       float hypoZ = sqrt( pow(x,2) + pow(y,2));// + pow(z,2)
       
       float trigVal = x / hypoZ;
       
       float resultAngleZ = asin(trigVal) - PI/2;
       
       angleZ = y >= 0 ? -resultAngleZ : resultAngleZ;
       
       if (x<=0) angleZ = -angleZ;
  
       //----------------------------------------------------------
       
       float hypoY = sqrt( pow(x,2) + pow(z,2));// + pow(z,2)
       
       trigVal = x/hypoY; // 
       
       float resultAngleY = asin(trigVal) - PI/2; //acos atan asin
       
       if (z>=0) resultAngleY = -resultAngleY;
       angleY = -resultAngleY;
       
     } else {
       
       float hypoZ = sqrt( pow(z,2) + pow(y,2));// + pow(z,2)
       
       float trigVal = z / hypoZ;
       
       float resultAngleZ = asin(trigVal) - PI/2;

       if (y <= 0 && z <= 0 || y >= 0 && z >= 0) {
         resultAngleZ = -resultAngleZ;
       }
       angleZ = resultAngleZ;
  
       //----------------------------------------------------------
       
       float hypoY = sqrt( pow(x,2) + pow(z,2));// + pow(z,2)
       
       trigVal = x/hypoY; // 
       
       float resultAngleY = asin(trigVal) - PI/2; //acos atan asin
       
       if (z<=0) resultAngleY = -resultAngleY;
       angleY = resultAngleY; 
     
     }
   
     
     
   }
   
      
   void calculateAnglesLatteralExpansion() {
   
     float hypoZ = sqrt( pow(x,2) + pow(y,2));// + pow(z,2)
     
     float trigVal = x / hypoZ;
     
     float resultAngleZ = asin(trigVal) + PI/2;
     
     angleZ = y >= 0 ? -resultAngleZ : resultAngleZ;


     //----------------------------------------------------------
     
     
     float hypoY = sqrt( pow(x,2) + pow(z,2));// + pow(z,2)
     
     trigVal = x/x/y/hypoY; 
     
     float resultAngleY = asin(trigVal) + PI/2;
     
     if (z>=0) resultAngleY = -resultAngleY;
     
     if (x<=0) resultAngleY = -resultAngleY;
     
     angleY = resultAngleY;

     
   }
   
}
