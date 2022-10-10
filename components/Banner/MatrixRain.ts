class Sym {
  characters: string
  fontSize: number
  x: number
  y: number
  canvasHeight: number
  text: string
  constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
    this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = 'A';
    this.canvasHeight = canvasHeight;
  }
  draw(context: CanvasRenderingContext2D) {
    this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.9995) {
      this.y = 0;
    }
    else {
      this.y += 0.9;
    }
  }
}

class Effect {
  canvasHeight: number;
  fontSize: number;
  canvasWidth: number;
  columns: number;
  symbols: Array<Sym>
  constructor(canvasWidth: number, canvasHeight: number) {
    this.fontSize = 16;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
  initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Sym(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
}

export default Effect
