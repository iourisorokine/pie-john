function Cloud() {
  this.x = width;
  this.varPosition = 0.5 + random(1.5);
  this.y = height - this.varPosition * (height / 2);
  this.speed = globalSpeed / 3;
  this.cloudCircles = [10, 18, 20, 25, 18, 15, 10];
  for (let mm = 0; mm <= this.cloudCircles.length - 1; mm++) {
    this.cloudCircles[mm] = this.cloudCircles[mm] * this.varPosition;
  }

  this.show = function () {
    fill(200, 200, 255, 120);
    noStroke();
    for (let m = 0; m <= this.cloudCircles.length - 1; m++) {
      ellipse(
        this.x + m * 10 * this.varPosition,
        this.y - this.cloudCircles[m],
        this.cloudCircles[m] * 2,
        this.cloudCircles[m] * 2
      );
    }
  };

  this.update = function () {
    this.x = this.x - this.speed;
  };
}

function Sun() {
  this.x = width + 200;
  this.y = random(height / 2);
  this.speed = globalSpeed / 10;
  this.shine = 0;
  this.shineVar = 0.1;
  this.shineMin = -5;
  this.shineMax = 5;
  this.sunCircles = [50, 70, 90, 100, 120];

  this.update = function () {
    this.x = this.x - this.speed;
    if (this.x < -200) {
      this.x = width + 200;
    }
    this.shine += this.shineVar;
    if (this.shine >= this.shineMax || this.shine <= this.shineMin) {
      this.shineVar = -this.shineVar;
    }
  };

  this.show = function () {
    fill(255, 255, 80, 60);
    noStroke();
    this.sunCircles.forEach((i) => {
      ellipse(this.x, this.y, i - this.shine, i + this.shine);
    });
    textSize(10);
    stroke(100, 100, 0, 100);
    text(this.x - 5, this.y - 5, "o  o");
    text(this.x - 5, this.y + 5, " __/");
  };
  this.animate = function () {
    this.update();
    this.show();
  };
}
