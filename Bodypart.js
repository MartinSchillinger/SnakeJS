class BodyPart {
    constructor(posX, posY, parent){
        this.parent = parent
        this.x = posX
        this.y = posY
        this.lastX = 0
        this.lastY = 0
        this.nextBodyPart = null
    }    

    draw(recursive = true) {
        let x = this.x * this.tileSize
        let y = this.y * this.tileSize
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(x, y, this.tileSize, this.tileSize)
        if(recursive && this.nextBodyPart !== null){
            this.nextBodyPart.draw()
        }
    }

    get ctx(){
        return this.parent.ctx
    }

    get tileSize(){
        return this.parent.tileSize
    }

    move(x, y){
        if(this.nextBodyPart !== null){
            this.nextBodyPart.move(this.x, this.y)
        }
        this.x = x
        this.y = y
        this.draw()
    }

    addBodyPart() {
        if (this.nextBodyPart === null){
            this.nextBodyPart = new BodyPart(this.x, this.y, this)
        }else{
            this.nextBodyPart.addBodyPart()
        }
    }
}