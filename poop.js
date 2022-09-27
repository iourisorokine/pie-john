const levels = {
  1: {
    poopSize: 10,
  },
  2: {
    poopSize: 15,
  },
  3: {
    poopSize: 20,
  },
};

function Poop(aim) {
  this.aim = aim;
  this.x = john.x;
  this.y = john.y - 10;
  this.speed = globalSpeed;
  this.gravity = 0.5;
  this.velocity = 0;
  this.landed = false;

  this.show = function () {
    noStroke();
    fill(230);
    const poopSize = levels[level].poopSize;
    ellipse(this.x - 10, this.y + 20, poopSize, poopSize);
  };

  this.update = function () {
    this.speed = globalSpeed;
    this.x -= this.speed;
    this.velocity += this.gravity;
    if (this.y < height - (200 - this.aim / 3)) {
      this.y = this.y + this.velocity;
    } else {
      this.landed = true;
    }
  };

  this.hitsTarget = function () {
    if (this.landed) {
      if (target.x < this.x && target.x + 120 > this.x) {
        if (target.y < this.y && target.y + 30 > this.y) {
          return true;
        }
      }
    }
    return false;
  };
}
