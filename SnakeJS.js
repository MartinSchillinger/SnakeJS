class SnakeJS {
  constructor(boardSizeX, boardSizeY, canvas) {
    this.state = State.stopped;
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
    this.cDetector = new CollisionDetector(this);
    this.map = new GameMap(this);
  }

  start() {
    this.drawInterval = setInterval(() => {
      this.draw();
    }, 16);
    this.updateInterval = setInterval(() => {
      this.update();
    }, 100);
    this.state = State.running;
  }

  changeGameState(newState){
    switch(newstate){
      //TODO
    }
  }

  pause() {
    clearInterval(this.drawInterval);
    clearInterval(this.updateInterval);
    this.state = State.stopped;
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
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.map.draw();
    this.snake.draw();
  }

  keyDown(event) {
    let key = this.keyConv.convertKeyToAction(event);
    let snakeDirections = [
      Controls.up,
      Controls.down,
      Controls.left,
      Controls.right
    ];

    if(snakeDirections.includes(key)) {
      this.snake.setDirection(key);
      return;
    }
    
    if(key === Controls.togglePause){
      switch(this.state){
        case State.running:
          this.state = State.paused;
          break;
        case State.paused:
          this.state = State.running;
          break;
        case State.won:
        case State.lost:
          this.resetGame();
        break;
        default:
          return;
      }
    }

  }

  update() {
    this.snake.move();
    let hit = this.cDetector.detect(this.snake.getHeadPosition());
    if(!hit){
      return;
    }

    if(hit.type === "map/food"){
      this.snake.bodyParts.addBodyPart();
      this.map.spawnFood();
      return;
    }


    this.pause();
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
      `New Canvas Size: ${newCanvasWidth}px x ${newCanvasHeight}px - Tilesize: ${this.tileSize}px x ${this.tileSize}px - Mapsize: ${this.boardSizeX}, ${this.boardSizeY}`
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
  unused: 5,
  togglePause: 6
};

const State = {
  reset: 0,
  running: 1,
  paused: 2,
  won: 3,
  lost: 4
}