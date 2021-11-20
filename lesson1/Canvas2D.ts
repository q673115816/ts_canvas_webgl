export default class Canvas2D {
    context: CanvasRenderingContext2D | null
    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d')
    }

    drawText(text: string) {
        if (!this.context) return
        this.context.save()
        this.context.textAlign = 'center'
        this.context.fillStyle = 'red'
        let centerX = this.context.canvas.width * 0.5
        let centerY = this.context.canvas.height * 0.5
        this.context.fillText(text, centerX, centerY)
        this.context.strokeStyle = 'green'
        this.context.strokeText(text, centerX, centerY)
        this.context.restore()
    }
}