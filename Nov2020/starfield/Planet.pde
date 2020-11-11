class Planet {

  PShape sphere;
  
  PImage rendermap;

  Planet (String imageFile, int size) { 
    
    rendermap = loadImage(imageFile);
    sphere = createShape(SPHERE, size); 
    sphere.setTexture(rendermap);

  }
 
  void render() { 
    shape(sphere);
  }
}
 
