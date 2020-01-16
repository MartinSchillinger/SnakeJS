
class SnakeJS {
    constructor(boardSizeX, boardSizeY, canvas){
        this.boardSizeX = boardSizeX
        this.boardSizeY = boardSizeY
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.tileSize = 0
        this.resizeCanvas()
        this.snake = this.spawnSnake()
        this.init()        
    }

    static factory(boardSizeX, boardSizeY, canvas){
        if (boardSizeX % 2 === 0 || boardSizeY % 2 === 0) {
            throw new EvenCanvasSizeException("Boardsize has to be uneven") 
        }
        return new SnakeJS(boardSizeX, boardSizeY, canvas)
    }
    
    init() {        
        var that = this;
        window.addEventListener('resize', function() {
            return that.resizeCanvas()
        })       
    }

    spawnSnake(){
        let snakeX = Math.floor(this.boardSizeX / 2)
        let snakeY = Math.floor(this.boardSizeY / 2)
        return new Snake(snakeX, snakeY, this)        
    }

    run() {

    }

    calculateTileSize(){
    
    }

    resizeCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let width = Math.floor(window.innerWidth * 0.8)
        let newCanvasWidth = width - (width  % this.boardSizeX)
        let newCanvasHeight = newCanvasWidth / this.boardSizeX * this.boardSizeY
        this.canvas.style.height = newCanvasHeight + "px"
        this.canvas.style.width = newCanvasWidth + "px"
        this.canvas.height = newCanvasHeight
        this.canvas.width = newCanvasWidth
        this.canvas.style.marginLeft = newCanvasWidth / 2 * (-1) + 'px'
        this.tileSize = newCanvasHeight / this.boardSizeY
        console.log(`New Canvas Size: ${newCanvasWidth}px x ${newCanvasHeight}px - Tilesize: ${this.tileSize}px x ${this.tileSize}px`)
        this.spawnSnake()
    }

    

}

function EvenCanvasSizeException(message) {
    this.message = message;
    this.name = "EvenCanvasSizeException";
}