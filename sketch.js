let john;
let grounds = [];
let foods = [];
let health = 20;
let scorrr = 0;
let poops = [];
let globalSpeed = 2;
let hDesceleration = 0.1;
let globalNormSpeed = 3;
let level = 0;
let levelGauge = 0;
let clouds = [];
let sun;
let cantPoop = false;
let target;

function setup() {
  createCanvas(800, 700);
  john = new John();
  sun = new Sun();
  target = new Target();
  [0, 100, 200, 300, 400, 500, 600, 700, 800].forEach((x) =>
    grounds.push(new Ground(x, 200, 100))
  );
  clouds.push(new Cloud());
}

function draw() {
  if (frameCount > 300) {
    levelUp();
  }
  if (health < 0) {
    gameOver();
  } else {
    //background
    background(0, 150, 240);

    //sun
    sun.animate();

    //Clouds
    for (let k = 0; k <= clouds.length - 1; k++) {
      if (clouds[k].x < -500) {
        clouds.splice(k, 1);
      }
      clouds[k].update();
      clouds[k].show();
    }
    if (frameCount % 100 === 0) {
      clouds.push(new Cloud());
    }

    //Ground
    if (globalSpeed > globalNormSpeed) {
      globalSpeed -= hDesceleration;
    } else if (globalSpeed < globalNormSpeed) {
      globalSpeed += hDesceleration;
    }
    if (grounds[grounds.length - 1].x + 100 < width) {
      grounds.push(new Ground(width, 200, 100));
    }
    //all events happening with the grounds array
    //update and show
    for (let i = grounds.length - 1; i >= 0; i--) {
      grounds[i].animate();

      if (grounds[i].hits(john)) {
        health -= 3;
      }
      //grounds disappear when offscreen
      if (grounds[i].invisible()) {
        grounds.splice(i, 1);
      }
    }

    // introduction of the food
    if (frameCount % 30 == 0 && random(3) > 2) {
      foods.push(new Food());
    }
    for (let j = 0; j < foods.length; j++) {
      foods[j].show();
      foods[j].update();

      if (foods[j].eaten(john) == true) {
        foods.splice(j, 1);
        levelGauge++;
      } else {
        if (foods[j].isInvisible()) {
          foods.splice(j, 1);
        }
      }
    }

    //target
    target.animate();

    // moves update of John and of the poop
    for (var i = 0; i <= poops.length - 1; i++) {
      poops[i].update();
      poops[i].show();
      if (poops[i].hitsTarget()) {
        scorrr = scorrr + level * level;
        console.log("target hit");
      }
      if (poops[0].x < -10) {
        poops.shift(1);
      }
    }

    john.update();
    john.show();

    //top left corner with all the stats
    fill(255);
    textSize(18);
    text("Health: ", 30, 20);
    text("Food:", 30, 40);
    text("Score: ", 30, 60);
    text("level " + level, 30, 80);
    text(scorrr, 100, 60);
    fill(0, 255, 0);
    rect(100, 5, health * 3, 15);
    fill(200, 200, 0);
    rect(100, 25, levelGauge * 3, 15);

    //tutorial showing how to play at the beginning of the game
    showGameIntro();

    //message in case no food to poop
    textSize(15);
    noStroke();
    fill(255);
    if (cantPoop == true) {
      text("Can't poop, need food...", 200, 250);
    }
    if (frameCount % 50 == 0) {
      cantPoop = false;
    }
  }
}

//Game ending when health goes to 0, endscreen

function gameOver() {
  background(0);
  textSize(20);
  fill(255);
  rect(150, 175, 110, 5);
  rect(150, 205, 110, 5);
  text("Game Over", 150, 200);
  text("Your Score: " + scorrr, 140, 240);
}

//leveling up when food is eaten
function levelUp() {
  if (levelGauge < 5) {
    level = 1;
  } else if (levelGauge < 15) {
    level = 2;
  } else {
    level = 3;
  }
}

//controls
function keyPressed() {
  if (keyCode == UP_ARROW) {
    john.up();
    john.wingMove();
  }
  if (key == " ") {
    if (levelGauge > 0) {
      poops.push(new Poop(john.y));
      levelGauge -= level;
    } else {
      cantPoop = true;
    }
  }
  if (keyCode == RIGHT_ARROW) {
    globalSpeed = 6;
    john.wingMove();
  }
  if (keyCode == LEFT_ARROW) {
    globalSpeed = 1;
  }
}
