export interface IDoom3Token {
    reset(): void
    isString(str: String): boolean
    readonly type: ETokenType
    getString(): string
    getFloat(): number
    getInt(): number
}

export enum ETokenType {
    NONE,
    STRING,
    NUMBER
}

export interface IDoomTokenizer {
    setSource(source: string): void
    reset(): void
    getNextToken(token: IDoom3Token): boolean
}

class Doom3Token implements IDoom3Token {
    private _type!: ETokenType
    private _charArr: string[] = []
    private _val!: number
    constructor() {
        this.reset()
    }

    reset() {
        this._charArr.length = 0
        this._type = ETokenType.NONE
        this._val = 0.0
    }

    get type(): ETokenType {
        return this._type
    }

    getString(): string {
        return this._charArr.join('')
    }

    getFloat(): number {
        return this._val
    }

    getInt(): number {
        return parseInt(this._val.toString(), 10)
    }

    isString(str: string): boolean {
        let count: number = this._charArr.length
        if (str.length !== count) return false
        for (let i = 0; i < count; i++) {
            if (this._charArr[i] !== str[i]) return false
        }
        return true
    }

    addChar(str: String): void {
        this._charArr.push(str)
    }

    setVal(num: number): void {
        this._val = num
        this._type = ETokenType.NUMBER
    }

    setType(type: ETokenType): void {
        this._type = type
    }
}

class Doom3Tokenizer implements IDoomTokenizer {
    private _diaits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',]
    private _whiteSpaces: string[] = [' ', '\t', '\v', '\n']
    private _isDigit(c: string): boolean {
        for(const diait of this._diaits) {
            if(diait === c) return true
        }
        return false
    }

    private _isWhitespace(c: string): boolean {
        for(const whitespace of this._whiteSpaces) {
            if(whitespace === c) return true
        }
        return false
    }

    private _source: string = ''
    private _currIdx: number = 0
    private setSource(source: string): void {
        this._source = source
        this._currIdx = 0
    }
    private reset() {
        this._currIdx = 0
    }
    private _getNumber(c: Doom3Token): string {
        return ''
    }
    private _getChar(): string {
        if(this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source.charAt(this._currIdx++)
        }
        return ''
    }
    private _peekChar(): string {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source.charAt(this._currIdx)
        }
        return ''
    }
    private _ungetChar(): void {
        if(this._currIdx > 0) {
            --this._currIdx
        }
    }

    getNextToken(tok: IDoom3Token): boolean {
        let token: Doom3Token = tok as Doom3Token
        let c: string = ''
        token.reset()
        do {
            c = this._skipWhiteSpace()    
            if(c === '/' && this._peekChar() === '/') { // 注释
                c = this._skipComments0()
            } else if (c === '/' && this._peekChar() === '*') {
                //  /* 开头
                c = this._skipComments1()
            } else if(this._isDigit(c) || c === '-' || (c === '.' && this._isDigit(this._peekChar()))) {
                this._ungetChar()
                c = this._getNumber(token)
            }
        }
    }

    _skipWhiteSpace(): string {
        return ''
    }

    _skipComments0(): string {
        return ''
    }

    _skipComments1(): string {
        return ''
    }
}

export default {

}