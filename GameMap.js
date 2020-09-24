class GameMap {
  constructor(game) {
    this.game = game;
    this.food = null;
    this.spawnFood();
  }
  
  spawnFood(){
    this.food = Food.spawn(this);
  }

  draw() {
    this.food.draw();
    let ctx = this.game.ctx;
    let cnv = this.game.canvas;
    let tileSize = this.game.tileSize;
    //top
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, cnv.width, tileSize);
    //right
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      cnv.width - tileSize,
      tileSize,
      tileSize,
      cnv.height - 2 * tileSize
    );
    //bottom
    ctx.fillStyle = "blue";
    ctx.fillRect(0, cnv.height - tileSize, cnv.width, tileSize);
    //left
    ctx.fillStyle = "green";
    ctx.fillRect(0, tileSize, tileSize, cnv.height - 2 * tileSize);
  }
  getVector() {
    let width = this.game.boardSizeX;
    let height = this.game.boardSizeY;
    let result = [];

    //top wall
    for (let i = 1; i <= width; i++) {
      result.push(new Coordinates(i, 0, "map/top"));
    }

    //right wall
    for (let i = 2; i < height; i++) {
      result.push(new Coordinates(width - 1, i, "map/wall/right"));
    }

    //bottom wall
    for (let i = 1; i <= width; i++) {
      result.push(new Coordinates(i, height - 1, "map/wall/bottom"));
    }

    //left wall
    for (let i = 2; i < height; i++) {
      result.push(new Coordinates(0, i, "map/wall/left"));
    }
    return result;
  }
}

class Coordinates {
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
  }

  isEqual(coord){
    return (coord.y === this.y && coord.x === this.x);
  }
}

class Food {
  constructor(coords, map){
    this.ctx = map.game.ctx;
    this.cnv = map.game.canvas;
    this.tileSize = map.game.tileSize;
    this.coords = coords;
    this.color = "orange";
  }

  static randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
  }  

  getVector(){
    return [this.coords];
  }
  
  static spawn(map) {
    let coords = new Coordinates(
      Food.randomNumber(1, map.game.boardSizeX - 2),
      Food.randomNumber(1, map.game.boardSizeY - 2),
      "map/food"
    );
    return new Food(coords, map);
  }

  draw() {
    let x = this.coords.x * this.tileSize;
    let y = this.coords.y * this.tileSize;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
  }
}

class Wall {

}