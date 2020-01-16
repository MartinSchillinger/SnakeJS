class BodyPart {
    constructor(posX, posY, snake){
        this.snake = snake
        this.posX = posX
        this.posY = posY
        this.ctx = snake.game.ctx
    }    

    draw() {
        let tileSize = this.snake.game.tileSize
        let x = this.posX * tileSize
        let y = this.posY * tileSize
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(x, y, tileSize, tileSize)
    }
}