function Poop(aim){
  this.aim = aim;
  this.x=john.x;
  this.y=john.y-10;
  this.speed = globalSpeed;
  this.gravity = 0.5;
  this.velocity = 0;
  this.landed = false;


  this.show = function(){
    noStroke();
    fill(230);
    switch(level){
      case 1: ellipse(this.x-10,this.y+20,10,10);
      break;
      case 2: ellipse(this.x-10,this.y+20,15,15);
      break;
      case 3: 
      ellipse(this.x-10,this.y+20,20,20);
    }
  }
  
    this.update = function(){
       this.speed = globalSpeed;
       this.x-=this.speed;
       this.velocity += this.gravity;
       if(this.y<height-(200-(this.aim/3))){
       this.y=this.y+this.velocity;
       }else{
         this.landed = true;
        }
    }

    this.hitsTarget = function (){
      if(this.landed==true){
      if ((target.x<this.x)&&(target.x+120)>this.x){
        if ((target.y < this.y)&&((target.y+30)>this.y)){
        return true;
      }
    }
  }
    return false;
  }
}