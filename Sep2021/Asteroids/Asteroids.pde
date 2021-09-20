Stars stars;
Rocket player1;
boolean isPaused = false;

int frames = 0;

void setup() {
  
  //display setup
  // size(800, 800);
  fullScreen();
  colorMode(HSB, 360, 100, 100);
  background(255);
  //noLoop(); 
  noCursor();
  // frameRate(60);
  //game setup
  player1 = new Rocket();
  stars = new Stars();
  
}

void draw() {

  if (!isPaused) {
    frames++;
    clear();
    //color of outlines / lines
    stars.render();
    player1.render();
    player1.move();
    //player1.rotation += 1;
    playerControls();

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
  
  if (spacePressed) {
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
