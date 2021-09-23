OpenSimplex2S noise;
Stars stars;
Rocket player1;
ArrayList<Rocket> allRockets;
ArrayList<Debris> allDebris;
boolean isPaused = false;
float momentumPerc = 1;
int highScore;
int spawnPeriod;
int frames;
float rMin;
float rMax;
int hMult;
int totalMass;

void setup() {
  
  //display setup
   //size(800, 640);
  fullScreen();
  colorMode(HSB, 360, 100, 100);
  background(255);
  //noLoop(); 
  noCursor();
  frameRate(60);
  //game setup
  getHS();
  spawnPeriod = 100;
  rMin = 20;
  rMax = 70;
  hMult = 10000;
  frames = 0;
  totalMass = 0;
  
  player1 = new Rocket();
  stars = new Stars();
  noise = new OpenSimplex2S( 314159265 );
  allDebris = new ArrayList<Debris>();
  allRockets = new ArrayList<Rocket>();
  allRockets.add(player1);
  for (int i = 0; i < 1; i++) {
    allDebris.add(new Debris());
  }
  
}

void draw() {
  //println(frames);
  if (!isPaused) {
    frames++;
    
    if (frames%200 == 0 && rMax < 120) {
        rMin++;
        rMax++;
    } 
    if (frames < 10000) hMult++;
    
    if (frames%500 == 0 && spawnPeriod > 500) spawnPeriod--;
    if (frames % spawnPeriod == 0 && totalMass < 500)  allDebris.add(new Debris());
    
    clear();
    //color of outlines / lines
    stars.render();
    renderDebris();
    player1.render();
    renderUI();
    
    player1.move();
    playerControls();

  }
  
  
}

void renderUI () {
  player1.renderCoolDown();
  player1.renderSpeed();
  player1.renderScore();
}

void renderDebris () {
   for (int i = allDebris.size()-1; i >= 0 ; i--) {
    if (i < allDebris.size()) {
      allDebris.get(i).render();
    }
    
  }
}

void getHS () {

  try {
    String[] dat = loadStrings("hs.txt");
    highScore = Integer.parseInt(dat[0]);
    
  } catch (Exception e) {
    println("No Highscore Found");
  }
}

void playerControls () {
  if (wPressed) {
    player1.propel(true);
  } else if (sPressed) {
    player1.propel(false);
  }

  if (aPressed) {
    player1.turn(true);
  } else if (dPressed) {
    player1.turn(false);
  }
  
  if (spacePressed || upPressed) {
    player1.fire();
  
  }

}

/////////////////////////////



//INPUTS
boolean upPressed = false;
boolean downPressed = false;
boolean leftPressed = false;
boolean rightPressed = false;
boolean wPressed = false;
boolean dPressed = false;
boolean aPressed = false;
boolean sPressed = false;
boolean spacePressed = false;


void keyPressed() {
  if (keyCode == UP) {
    upPressed = true;
  }
  else if (keyCode == DOWN) {
    downPressed = true;
  }
  else if (keyCode == LEFT) {
    leftPressed = true;
  }
  else if (keyCode == RIGHT) {
    rightPressed = true;
  }
  else if (key == 'w') {
    wPressed = true;
  }
  else if (key == 'a') {
    aPressed = true;
  }
  else if (key == 's') {
    sPressed = true;
  }
  else if (key == 'd') {
    dPressed = true;
  }
  else if (keyCode == ' ') {
    spacePressed = true;
  } else if (key == 'p') {
    isPaused = !isPaused;
  }


}

void keyReleased() {
  if (keyCode == UP) {
    upPressed = false;
  }
  else if (keyCode == DOWN) {
    downPressed = false;
  }
  else if (keyCode == LEFT) {
    leftPressed = false;
  }
  else if (keyCode == RIGHT) {
    rightPressed = false;
  }
  else if (key == 'w') {
    wPressed = false;
  }
  else if (key == 'a') {
    aPressed = false;
  }
  else if (key == 's') {
    sPressed = false;
  }
  else if (key == 'd') {
    dPressed = false;
  }
  else if (keyCode == ' ') {
    spacePressed = false;
  }

}
