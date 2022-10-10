function Ground(startX, groundHight = 200, groubdWidth = 300) {
  this.bottom = groundHight;
  this.x = startX;
  this.w = groubdWidth;

  // determines if John hits the ground
  this.hits = function (john) {
    if (john.y > height - this.bottom) {
      if (john.x > this.x && john.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  };

  this.show = function () {
    stroke(30, 150, 30);
    fill(50, 200, 50);
    rect(this.x, height - this.bottom, this.w, this.bottom);
    fill(30, 150, 30);
    rect(this.x, height - this.bottom, this.w, 20);
  };
  this.update = function () {
    this.speed = globalSpeed;
    this.x -= this.speed;
  };
  this.invisible = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };
  this.animate = function () {
    this.update();
    this.show();
  };
}

function Target() {
  this.x = width + 1600;
  this.y = height - 100 - random(80);

  this.update = function () {
    this.speed = globalSpeed;
    if (this.x < -200) {
      this.x = width + random(1000);
    }
    this.x -= this.speed;
  };

  this.show = function () {
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, 120, 30);
    fill(255);
    rect(this.x + 25, this.y + 5, 70, 20);
    fill(255, 0, 0);
    rect(this.x + 45, this.y + 10, 30, 10);
  };
  this.animate = function () {
    this.show();
    this.update();
  };
}
