class Snake {
  constructor(posX, posY, game) {
    this.game = game;
    this.x = posX;
    this.y = posY;
    this.direction = 1;
    this.bodyParts = null;
    this.spawn();
  }

  static factory(game) {
    let snakeX = Math.floor(game.boardSizeX / 2);
    let snakeY = Math.floor(game.boardSizeY / 2);
    return new Snake(snakeX, snakeY, game);
  }

  get ctx() {
    return this.game.ctx;
  }

  get tileSize() {
    return this.game.tileSize;
  }

  getVector() {
    return this.bodyParts.getVector();
  }

  setDirection(direction) {
    if (
      direction === Controls.unused ||
      (direction === Controls.up && this.direction === Controls.down) ||
      (direction === Controls.right && this.direction === Controls.left) ||
      (direction === Controls.down && this.direction === Controls.up) ||
      (direction === Controls.left && this.direction === Controls.right)
    ) {
      return;
    }
    this.direction = direction;
  }

  move() {
    switch (this.direction) {
      case Controls.up:
        this.y -= 1;
        break;
      case Controls.right:
        this.x += 1;
        break;
      case Controls.down:
        this.y += 1;
        break;
      case Controls.left:
        this.x -= 1;
        break;

      default:
        break;
    }
    this.bodyParts.move(this.x, this.y);
  }

  draw() {
    this.bodyParts.draw();
  }

  spawn() {
    this.bodyParts = new BodyPart(this.x, this.y + 3, this);
    this.bodyParts.move(this.x, this.y + 2);
    this.bodyParts.addBodyPart();
    this.bodyParts.move(this.x, this.y + 1);
    this.bodyParts.addBodyPart();
    this.bodyParts.move(this.x, this.y);
    this.draw();
  }
}
