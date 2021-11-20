import Canvas2D from './Canvas2D'

let canvas: HTMLCanvasElement | null = document.querySelector('canvas') as HTMLCanvasElement
if(!canvas) console.log('hello world')
let canvas2D = new Canvas2D(canvas)
canvas2D.drawText('hello world')