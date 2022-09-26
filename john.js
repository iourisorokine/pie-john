function John() {
  this.y = height / 4;
  this.x = 180;

  this.gravity = 0.1;
  this.lift = -8;
  this.velocity = 0;
  this.wingPosMax = 30;
  this.wingPos = this.wingPosMax;

  this.show = function () {
    //body
    fill(200);
    stroke(0);
    rect(
      this.x - 50,
      this.y + 5 - levelGauge / 5,
      50 + levelGauge / 3,
      20 + levelGauge
    );
    rect(this.x - 5, this.y - 5, 20, 20);
    rect(this.x - 50, this.y + 5, 40, 15);
    //wings with dynamic variation when flapping them
    rect(this.x - 50, this.y + 15 - this.wingPos / 3, 38, 12);
    rect(this.x - 55, this.y + 15 - this.wingPos / 2, 35, 10);
    rect(this.x - 60, this.y + 25 - this.wingPos, 32, 10);
    //eyes
    fill(0);
    rect(this.x + 5, this.y + 3, 8, 8);
    fill(150, 150, 50);
    rect(this.x + 15, this.y + 5, 8, 5);
    //shade
    fill(50, 50, 50, 50);
    noStroke();
    rect(this.x - 50, height - (180 - this.y / 3), 50, 10);
  };

  this.up = function () {
    this.velocity += this.lift;
  };

  this.wingMove = function () {
    this.wingPos = 0;
  };

  this.update = function () {
    this.gravity = 0.1 * level;
    this.velocity += this.gravity;
    this.y += this.velocity;
    if (this.wingPos < this.wingPosMax) {
      this.wingPos += 0.8;
    }

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}
