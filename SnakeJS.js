class SnakeJS {
  constructor(boardSizeX, boardSizeY, canvas) {
    this.boardSizeX = boardSizeX;
    this.boardSizeY = boardSizeY;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.tileSize = 0;
    this.snake = null;
    this.assets = [];
    this.init();
    this.drawInterval = 0;
    this.updateInterval = 0;
    this.keyConv = new KeyConverter();
    this.cDetector = new CollisionDetector();
    this.map = new GameMap(this);
  }

  static factory(boardSizeX, boardSizeY, canvas) {
    if (boardSizeX % 2 === 0 || boardSizeY % 2 === 0) {
      throw new EvenCanvasSizeException("Boardsize has to be uneven");
    }
    return new SnakeJS(boardSizeX, boardSizeY, canvas);
  }

  init() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
    window.addEventListener("keydown", e => {
      this.keyDown(e);
    });
    this.map = new GameMap(this);
    this.snake = Snake.factory(this);
    this.resizeCanvas();
    this.drawInterval = setInterval(() => {
      this.draw();
    }, 16);
    this.updateInterval = setInterval(() => {
      this.update();
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.draw();
    this.snake.draw();
  }

  keyDown(event) {
    let key = this.keyConv.convertKeyToAction(event);
    this.snake.setDirection(key);
  }

  update() {
    this.snake.move();
    this.cDetector.detect();
  }

  resizeCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let width = Math.floor(window.innerWidth * 0.8);
    let newCanvasWidth = width - (width % this.boardSizeX);
    let newCanvasHeight = (newCanvasWidth / this.boardSizeX) * this.boardSizeY;
    this.canvas.style.height = newCanvasHeight + "px";
    this.canvas.style.width = newCanvasWidth + "px";
    this.canvas.height = newCanvasHeight;
    this.canvas.width = newCanvasWidth;
    this.canvas.style.marginLeft = (newCanvasWidth / 2) * -1 + "px";
    this.tileSize = newCanvasHeight / this.boardSizeY;
    console.log(
      `New Canvas Size: ${newCanvasWidth}px x ${newCanvasHeight}px - Tilesize: ${this.tileSize}px x ${this.tileSize}px`
    );
    this.draw();
  }
}

function EvenCanvasSizeException(message) {
  this.message = message;
  this.name = "EvenCanvasSizeException";
}

const Controls = {
  up: 1,
  right: 2,
  down: 3,
  left: 4,
  unused: 5
};
