function Food(){
  this.x = width;
  this.y = random(100,(height/2));
  this.speed = globalSpeed;


  this.eaten = function (john){
    if (dist(john.x+5, john.y+5, this.x, this.y)<20){
    return true;
    }else{
  return false;
  }
}

this.invisible = function(){
  if (this.x < -30){
    return true;
  }else{
    return false;
  }
 }

  this.show = function(){
    stroke(180,180,20);
    strokeWeight(3);
    fill(220,220,50);
    ellipse(this.x,this.y,30,20);
    line(this.x-15, this.y,this.x+15, this.y);
    strokeWeight(1);

  }
  
    this.update = function(){
      this.speed = globalSpeed; 
      this.x-=this.speed;
  }
}
