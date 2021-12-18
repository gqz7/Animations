class Planet {

  PShape sphere;
  
  PImage rendermap;

  Planet (String imageFile, int size) { 
    
    rendermap = loadImage(imageFile);
    sphere = createShape(SPHERE, size); 
    sphere.setTexture(rendermap);

  }
 
  void render() { 
    rotateY((float)frames/77);
    rotateX((float)frames/451);
    rotateZ((float)frames/250);
    //rotateY((float)mouseX/400);
    //rotateZ((float)mouseY/400);
    shape(sphere);
  }
}
 
