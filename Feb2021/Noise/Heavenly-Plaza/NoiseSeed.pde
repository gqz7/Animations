 
class NoiseSeed {
  
  public float value;
  
  NoiseSeed (float value) {
    
    this.value = value;  
  
  }
  
  public void move(float change) {
      this.value += change;
  }
  
}
