class GameMap {
  constructor(game) {
    this.game = game;
  }
  draw() {
    let ctx = this.game.ctx;
    let cnv = this.game.canvas;
    let tileSize = this.game.tileSize;
    //top
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, cnv.width, tileSize);
    //right
    ctx.fillStyle = "red";
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
      result.push({
        x: i,
        y: 1,
        type: "map"
      });
    }
    //right wall
    for (let i = 2; i < height; i++) {
      result.push({
        x: width,
        y: i,
        type: "map"
      });
    }
    //bottom wall
    for (let i = 1; i <= width; i++) {
      result.push({
        x: i,
        y: height,
        type: "map"
      });
    }
    //left wall
    for (let i = 2; i < height; i++) {
      result.push({
        x: 1,
        y: i,
        type: "map"
      });
    }
    return result;
  }
}
