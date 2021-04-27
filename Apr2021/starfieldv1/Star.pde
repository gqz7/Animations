

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
     
     //if (isLatteral) 
     //  calculateAnglesLatteralExpansion();
     //else
       calculateAnglesCenterExpansion();
   }
   
   void display() {
     
     float distance = sqrt( pow(x,2) + pow(y,2));
     float maxLen = map( velocity, .01, .03, 50, 250);
     float trailLen = map( distance, 0, maxDistance, 0, maxLen);
     float trailWidth = trailLen/50 + .3;
     
     //int maxColor = abs(-360-frames) % 360;
     //int minColor = abs(-frames) % 360;
     //int sat = (int) (100-light*.8);
     //color c1 = color(maxColor, sat, light);
     //color c2 = color(minColor, sat, light);
     
     //color grad = lerpColor(c1, c2, map(distance, 0, maxDistance, 0, 1)); 
     
     //fill(grad);
     
    fill(light);// fill(360);// 
     
     //if (abs(x) < abs(y)) {
     //  fill(360);// fill(327, 100, 100);
     //} else {
     //  return;
     //}
     
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
     
      if (isLatteral) 
        this.updatePosLatteral();
      else
        this.updatePosCenter();
     //calculateAnglesCenterExpansion();
   }
   
   void updatePosCenter() {
     
      x *= 1 + velocity * speed;
      y *= 1 + velocity * speed;
      z *= 1 + velocity * speed;
      light = light < 255 ? light * (1 + velocity*2) : 255;
      
      if ( z > width*1.5 || z < -width*1.5  || y > height*10 || y < -height*10 || x > width*10 || x < -width*10 ) this.reset();
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
       
       
       //----------------------------------------------------------
       
       
       float hypoY = sqrt( pow(x,2) + pow(z,2));// + pow(z,2)
       
       float trigVal = x/hypoY; // 
       
       float resultAngleY = asin(trigVal) - PI/2; //acos atan asin
       
       if (z>=0) resultAngleY = -resultAngleY;
       angleY = -resultAngleY;
       
       //-------------------------------------------------------
     
       float hypoZ = sqrt( pow(x,2) + pow(y,2));// + pow(z,2)
       
       trigVal = x / hypoZ;
       
       float resultAngleZ = cos(trigVal) + PI/2;
       
       angleZ = resultAngleZ;//z <= 0 ? -resultAngleZ : resultAngleZ;
       
       //if (x<=0) angleZ = -angleZ;
       if (y>=0) angleZ = -angleZ;
  
  
       //----------------------------------------------------------
       
       //float hypoZ = sqrt( pow(x,2) + pow(y,2));// + pow(z,2)
       
       //float trigVal = x / hypoZ;
       
       //float resultAngleZ = abs(x) < abs(y) ? atan(trigVal) + PI/2 : asin(trigVal) + PI/2;
       
       //angleZ = y >= 0 ? -resultAngleZ : resultAngleZ;
       
       
       //float hypoZ = sqrt( pow(x,2) + pow(y,2));// + pow(z,2)
       
       //float trigVal = x / hypoZ;
       
       //float resultAngleZ = asin(trigVal) - PI/2;
       
       //angleZ = y >= 0 ? -resultAngleZ : resultAngleZ;
       
       
       //if (x<=0) angleZ = -angleZ;
  
  
       ////----------------------------------------------------------
       
       
       //float hypoY = sqrt( pow(x,2) + pow(z,2));// + pow(z,2)
       
       //trigVal = x/hypoY; // 
       
       //float resultAngleY = asin(trigVal) - PI/2; //acos atan asin
       
       //if (z>=0) resultAngleY = -resultAngleY;
       
       ////if (x>=0) resultAngleY = -resultAngleY;
  
       ////if (abs(x) < abs(y)) {
       ////   if (x < 0) {
       ////     //resultAngleY = resultAngleY * ((pow(y,2))/1000000);
       ////   } else {
       ////     //resultAngleY = resultAngleY / ((pow(y,2))/1000000);
       ////   }
         
         
       ////}
       
       //angleY = -resultAngleY;//angleY/(y/x);     
                 
       //if (printCount < printLim && abs(x) < abs(y)) {
       //  printCount++;
       //  println(pow(abs(x) / abs(y), 2)); //insert test print statment
       //}
       
     
     
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
