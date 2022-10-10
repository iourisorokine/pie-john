showHowToPlayMessage = function () {
  fill(255);
  textSize(40);
  strokeWeight(6);
  text("PIE JOHN", 140, 150);
  textSize(15);
  strokeWeight(2);
  text("Poop on the targets and score points!", 100, 200);
  text("Up-arrow : up", 100, 230);
  text("Right-arrow : accelerate", 100, 260);
  text("Left-arrow: slow down", 100, 290);
  text("Space: poop", 100, 320);
};

showReadyMessage = function () {
  fill(255);
  textSize(40);
  strokeWeight(6);
  text("READY?", 140, 250);
};

showGoMessage = function () {
  fill(255);
  textSize(40);
  strokeWeight(6);
  text("GO!!!", 140, 250);
};

showGameIntro = function () {
  if (frameCount < 400) {
    showHowToPlayMessage();
  } else if (frameCount < 450) {
    showReadyMessage();
  } else if (frameCount < 480) {
    showGoMessage();
    level = 1;
  }
};
