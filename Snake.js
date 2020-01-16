class Snake {
    constructor(posX, posY, game){
        this.game = game
        this.posX = posX
        this.posY = posY
        this.currentDirection = 1;
        this.bodyParts = null
        this.spawn()
    }
    
    get ctx(){
        return this.game.ctx
    }

    get tileSize(){
        return this.game.tileSize
    }

    move(direction){
        if(direction === 1){
            this.posY -= 1            
        } 
        this.bodyParts.move(this.posX, this.posY)
    }

    draw() {
        this.bodyParts.draw()
    }

    spawn() {        
        this.bodyParts = new BodyPart(this.posX, this.posY +5, this)
        this.bodyParts.move(this.posX, this.posY + 4)
        this.bodyParts.addBodyPart()
        this.bodyParts.move(this.posX, this.posY + 3)
        this.bodyParts.addBodyPart()
        this.bodyParts.move(this.posX, this.posY + 2)
        this.bodyParts.addBodyPart()
        this.bodyParts.move(this.posX, this.posY + 1)
        this.bodyParts.addBodyPart()
        this.bodyParts.move(this.posX, this.posY)
        this.draw()
    }

}