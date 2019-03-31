var john;
var grounds = [];
var foods = [];
var health = 20;
var scorrr = 0;
var poops = [];
let globalSpeed = 2;
let hDesceleration = 0.1;
let globalNormSpeed = 3;
var level =1;
var levelGauge =0;
var clouds = [];
var sun;
var cantPoop = false;
var target;

function setup() {
 createCanvas(500,600); 
 john = new John();
 sun = new Sun();
 target = new Target();
 grounds.push(new Ground());
 clouds.push(new Cloud());
}

function draw() {
levelUp();  
if (health<0){
  gameOver();
}else{

//background
background(0,150,240);

//sun
sun.update();
sun.show();

//Clouds
for(let k =0; k<=clouds.length-1;k++){
  if(clouds[k].x<-500){clouds.splice(k,1);
  }
  clouds[k].update();
  clouds[k].show();
}
if (frameCount % 100 == 0){
  clouds.push(new Cloud());
}

//Ground
if(globalSpeed>globalNormSpeed){
globalSpeed -= hDesceleration;
}else if(globalSpeed<globalNormSpeed){
globalSpeed += hDesceleration;
}
if ((grounds[grounds.length-1].x)+298<width){
    grounds.push(new Ground());
}
//all events happening with the grounds array
//update and show
for (let i = grounds.length-1; i >= 0; i--){
    grounds[i].show();
    grounds[i].update();

if (grounds[i].hits(john)){
this.health = this.health-3;
  }
//grounds disappear when offscreen
    if (grounds[i].invisible() == true){
    grounds.splice(i,1);
  }
}

// introduction of the food
    if ((frameCount % 30 == 0)&&(random(3)>2)){
    foods.push(new Food());
    }
    for (var j = 0; j < foods.length ; j++){
    foods[j].show();
    foods[j].update();
    if (foods[j].eaten(john) == true){
        foods.splice(j,1);
        levelGauge++;
     }else{
    if (foods[j].invisible() == true){
        foods.splice(j,1);
     }
    }
  }

  //target
  target.update();
  target.show();

  // moves update of John and of the poop
  for (var i = 0; i <= poops.length-1; i++){
    poops[i].update();
    poops[i].show()
  //  poops offscreen delete --> bugs... :(    
  //  if(poops[i].x<-10){
  //    poops.splice(i,1);
  //  }
    if(poops[i].hitsTarget()==true){
      scorrr=scorrr+(level*level);
      poops.splice(i,1);
      console.log('target hit');
    }
  }
  
  john.update();
  john.show(); 

  //top left corner with all the stats
  fill(255);
  textSize(18);
  text('Health: ',30,20);
  text('Food:',30,40);
  text('Score: ',30,60);
  text('level '+level,30,80);
  text(scorrr, 100,60);
  fill(0,255,0);
  rect(100,5,health*3,15);
  fill(200,200,0);
  rect(100,25, levelGauge*3,15);

  //tutorial showing how to play at the beginning of the game
  if(frameCount<400){
    howToPlayMessage();
  }else if(frameCount<450){
    readyMessage();
  }else if(frameCount<480){
    goMessage();
  }

  //message in case no food to poop
  textSize(15);
  noStroke();
  fill(255);
  if(cantPoop==true){
    text("Can't poop, need food...",200,250);
  }
  if(frameCount%50==0){
    cantPoop=false;
  }
  }
}

//Game ending when health goes to 0, endscreen
  
function gameOver(){
  background(0);
    textSize(20);
    fill(255);
    rect(150,175,110,5);
    rect(150,205,110,5);
    text('Game Over',150,200);
    text('Your Score: '+scorrr,140,240);
}

//leveling up when food is eaten
function levelUp(){
 if(levelGauge<5){level=1;}else if(levelGauge<15){level=2}else{level=3}
}

//controls
function keyPressed(){
  if (keyCode == UP_ARROW){
    john.up();
    john.wingMove();
    }
    if (key==' '){
      if(levelGauge>0){
      poops.push(new Poop(john.y));
      levelGauge -=level;
      }else{
      cantPoop = true;
      }
    } 
    if (keyCode == RIGHT_ARROW){
    globalSpeed = 6;
    john.wingMove();
    }
    if (keyCode == LEFT_ARROW){
    globalSpeed = 1;  
    }
}

howToPlayMessage = function(){
  fill(255);
  textSize(40);
  strokeWeight(6);
  text('PIE JOHN',140,150);
  textSize(15);
  strokeWeight(2);
  text('Poop on the targets and score points!',100,200);
  text('Up-arrow : up',100,230);
  text('Right-arrow : accelerate',100,260);
  text('Left-arrow: slow down',100,290);
  text('Space: poop',100,320);
  if(frameCount%55==0){
    john.up();
    john.wingMove();
  }
}
readyMessage = function(){
  fill(255);
  textSize(40);
  strokeWeight(6);
  text('READY?',140,250);
  if(frameCount%55==0){
    john.up();
    john.wingMove();
  }
}
goMessage = function(){
  fill(255);
  textSize(40);
  strokeWeight(6);
  text('GO!!!',140,250);
}

