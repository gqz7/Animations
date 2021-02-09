PImage yyImg;


  int WIDTH = 3840;
  int HEIGHT = 2160;
  int frames = 1000;

  float yyRotation = 0;

  int maxStarCount = 2000;

  Star[] starList;

void setup() {
  size(3840, 2160);
  strokeWeight(1.4);
  background(0);
  colorMode(HSB, 360, 100, 100);
  starList = starGenesis();
  yyImg = loadImage("./yy.png");
}

void draw() {
  frames++;
  
  
  moveStars();
  renderStars();
  
  yyRotation+=.01;
  renderYY();
}

void renderYY () {
  pushMatrix();
    translate(WIDTH/2, HEIGHT/2);
    rotate(yyRotation);
    image(yyImg, -50, -50, 100, 100);
  popMatrix();
}

void moveStars () {
  for (int i = 0; i < starList.length; i++) {
      Star s = starList[i];
      s.update(i);   
  }
}
void renderStars () {
  for (int i = 0; i < starList.length; i++) {
      Star s = starList[i];
      s.render();   
  }
}

Star[] starGenesis() { 
     
   Star[] startingStars = new Star[maxStarCount];
 
   for ( int i = 0; i < maxStarCount; i++ ) {
     
     float
       oX = (float) (random(width) - width/2),
       oY = (float) ( random(height) - height/2),
       hue = ((float) Math.random() * 130) + 80;
     
     startingStars[i] = new Star( oX, oY, hue, 0 );
     
   }
 
   return startingStars;
};

Star createNewStar() {

   float  
        ranNum = (float) Math.random() * 100, 
        radius = (frames/150) + 5,
        randomX1 = (float) (Math.cos(ranNum) * radius),
        randomY1 = (float) (Math.sin(ranNum) * radius),
        ranPos = (float) Math.random() * 10, 
        x = (randomX1 * ranPos),
        y = (randomY1 * ranPos),
        hue = ((float) Math.random() * 130) + 80,
        lightness = 90;

  return new Star(x, y, lightness, hue);

}
