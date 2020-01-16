class Snake {
    constructor(posX, posY, game){
        this.game = game
        this.posX = posX
        this.posY = posY
        this.currentDirection = null;
        this.tiles = []
        this.spawn()
    }    

    setDirection(newDirection){
        this.currentDirection = newDirection
    }

    draw() {
        this.tiles.forEach(e => e.draw())
    }

    spawn() {
        this.tiles.push(new BodyPart(this.posX, this.posY, this))
        this.tiles.push(new BodyPart(this.posX, this.posY +1, this))
        this.tiles.push(new BodyPart(this.posX, this.posY +2, this))
        this.draw()
    }

}

const Direction = {
    up: 1,
    right: 2,
    down: 3,
    left: 4
}