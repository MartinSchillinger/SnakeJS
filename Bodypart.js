class BodyPart {
  constructor(posX, posY, parent) {
    this.parent = parent;
    this.x = posX;
    this.y = posY;
    this.lastX = 0;
    this.lastY = 0;
    this.nextBodyPart = null;
    this.color = "black"
  }

  draw(recursive = true) {
    let x = this.x * this.tileSize;
    let y = this.y * this.tileSize;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    if (recursive && this.nextBodyPart !== null) {
      this.nextBodyPart.draw();
    }
  }

  getVector() {
    let coords = new Coordinates(this.x, this.y, "snake/body");
    if (this.nextBodyPart === null) {
      return [coords];
    }
    return [...this.nextBodyPart.getVector(), coords];
  }

  get ctx() {
    return this.parent.ctx;
  }

  get tileSize() {
    return this.parent.tileSize;
  }

  move(x, y) {
    if (this.nextBodyPart !== null) {
      this.nextBodyPart.move(this.x, this.y);
    }
    this.x = x;
    this.y = y;
    this.draw();
  }

  addBodyPart() {
    if (this.nextBodyPart === null) {
      this.nextBodyPart = new BodyPart(this.x, this.y, this);
      return;
    }
    this.nextBodyPart.addBodyPart();    
  }
}

class Head extends BodyPart {
  constructor(posX, posY, parent) {
    super(posX, posY, parent);
    this.color = "red";
  }

  getHeadPosition(){
    return new Coordinates(this.x, this.y, "snake/head");
  }

  getVector() {
    return [...this.nextBodyPart.getVector()];
  }
}
