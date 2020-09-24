class CollisionDetector {
  constructor(game) {
    this.game = game;
    this.elements = [];
    this.intersection = false;
  }

  addElement(e) {
    this.elements.concat(e.getVector());
  }

  detect(inputCoord) {
    //check food
    let food = this.game.map.food.getVector();
    let hits = food.filter(foodCoord => foodCoord.isEqual(inputCoord));
    if(hits.length > 0){
      return hits[0];
    }

    //check snake
    let snake = this.game.snake.getVector();
    hits = snake.filter(snakeCoord => snakeCoord.isEqual(inputCoord));
    if(hits.length > 0){
      return hits[0];
    }

    //check walls
    let walls = this.game.map.getVector();
    hits = walls.filter(wallsCoord => wallsCoord.isEqual(inputCoord));
    if(hits.length > 0){
      return hits[0];
    }

    return false;
  }
}
