module codeBase {
	export class Label extends Group {
		private _text: string = "";//文本内容
		public _textField: egret.TextField = null;
		private _initFlow: Array<egret.ITextElement> = null;
		private _htmlTextParser: egret.HtmlTextParser = null;

		private _fontSize: number = Style.fontSize;//字体大小
		private _color: number = Style.LABEL_TEXT;//字体颜色
		private _fontName: string = Style.fontName;//字体名称
		private _hAlign: string = egret.HorizontalAlign.LEFT;
		private _vAlign: string = egret.VerticalAlign.MIDDLE;
		private _bold: boolean = false;
		private _italic: boolean = false;
		private _lineSpacing: number = 0;//行间距
		private _multiline: boolean = false;//多行显示
		private _wordWrap: boolean = false;//自动换行
		private _stroke: number = 0;
		private _strokeColor: number = 0x003350;
		private _html: boolean = false;
		private _autoSize: boolean = true;//根据文字自动调整Label的尺寸

		private _paddingLeft:number = 0;
		private _paddingRight:number = 0;
		private _paddingTop:number = 0;
		private _paddingBottom:number = 0;

		public constructor(drawDelay: boolean = false) {
			super(drawDelay);
		}

		public initData(): void {
			super.initData();
		}

        /**
         * 初始化主场景的组件,加入场景时,主动调用一次
         * 子类覆写该方法,添加UI逻辑
         */
		public createChildren(): void {
			super.createChildren();
			//if (!this._autoSize) this.setSize(Style.TEXTINPUT_WIDTH, Style.TEXTINPUT_HEIGHT);
			this._textField = new egret.TextField();
			this._textField.addEventListener(egret.Event.CHANGE, this.onTextChange, this);
			this.addChild(this._textField);
			this.invalidate();
		}

		/**
		 * Called when the text in the text field is manually changed.
		 */
		public onTextChange(event: Event): void {
			this._text = this._textField.text;
		}

        /**
         * 文本内容
         */
		public get text(): string {
			return this._text;
		}

		public set text(value: string) {
			if (this._text != value) {
				this._text = value;
				if (this._html) {
					if (this._text == null) {
						this._text = "";
						this._initFlow = [];
					} else {
						if (this._htmlTextParser == null) this._htmlTextParser = new egret.HtmlTextParser();
						this._initFlow = this._htmlTextParser.parser(this._text);
					}
				} else {
					if (this._text == null) {
						this._text = "";
					}
				}
				this.invalidate();
			}
		}

        /**
         * 文本内容显示对象
         */
		public getTextField(): egret.TextField {
			return this._textField;
		}

		/**
		 * Draws the visual ui of the component.
		 */
		public draw(): void {
			// super.draw();
			if (this._textField == null) return;
			//console.log("@@label draw text=" + this._text);
			if (this._fontName != null) {
				this._textField.fontFamily = this.fontName;
			}
			if (this._color >= 0) this._textField.textColor = this._color;
			if (this._fontSize > 0) this._textField.size = this._fontSize;
			this._textField.bold = this._bold;
			this._textField.italic = this._italic;
			this._textField.multiline = this._multiline;
			this._textField.lineSpacing = this._lineSpacing;
			this._textField.stroke = this._stroke;
			this._textField.strokeColor = this._strokeColor;
			this._textField.wordWrap = this._wordWrap;

			if (this._html) {
				if (this._initFlow) this._textField.textFlow = this._initFlow;
				this._initFlow = null;
			} else {
				this._textField.text = this._text;
			}

			if (this._autoSize) {
				this.setSize(this._textField.measuredWidth, this._textField.measuredHeight);
				//this.width = this._textField.width;
				//this.height = this._textField.height;

				// this._textField.textAlign = this._hAlign;
				// this._textField.verticalAlign = this._vAlign;
			} else {
				this._textField.width = this.width;
				this._textField.height = this.height;

				// if (this._hAlign == egret.HorizontalAlign.LEFT) {
				// 	this._textField.x = 0;
				// } else if (this._hAlign == egret.HorizontalAlign.RIGHT) {
				// 	this._textField.x = this.width - this._textField.width;
				// } else {
				// 	this._textField.x = (this.width - this._textField.width)/2;
				// }

				// if (this._vAlign == egret.VerticalAlign.MIDDLE) {
				// 	this._textField.y = (this.height - this._textField.height) / 2;
				// } else if (this._vAlign == egret.VerticalAlign.BOTTOM) {
				// 	this._textField.y = this.height - this._textField.height;
				// } else {
				// 	this._textField.y = 0;
				// }
			}
			// var newWidth = this._textField.width - this._paddingLeft - this._paddingRight;
			// var newHeight = this._textField.height - this._paddingTop - this._paddingBottom;
			// this._textField.width = newWidth;
			// this._textField.height = newHeight;
			// this._textField.x = this._paddingLeft;
			// this._textField.y = this._paddingTop;
			this._textField.textAlign = this._hAlign;
			this._textField.verticalAlign = this._vAlign;
			super.draw();
		}


		/**
		 * 文本区域左边距偏移
		 */
		public set paddingLeft(value:number) {
			if(this._paddingLeft != value) {
				this._paddingLeft = value;
				this.invalidate();
			}
		}
		public get paddingLeft() {
			return this._paddingLeft;
		}

		/**
		 * 文本区域右边距偏移
		 */
		public set paddingRight(value:number) {
			if(this._paddingRight != value) {
				this._paddingRight = value;
				this.invalidate();
			}
		}
		public get paddingRight() {
			return this._paddingRight;
		}

		/**
		 * 文本区域顶部边距偏移
		 */
		public set paddingTop(value:number) {
			if(this._paddingTop != value) {
				this._paddingTop = value;
				this.invalidate();
			}
		}
		public get paddingTop() {
			return this._paddingTop;
		}

		/**
		 * 文本区域底部边距偏移
		 */
		public set paddingBottom(value:number) {
			if(this._paddingBottom != value) {
				this._paddingBottom = value;
				this.invalidate();
			}
		}
		public get paddingBottom() {
			return this._paddingBottom;
		}

		/**
		 * 设置自动换行
		 */
		public get wordWrap(): boolean {
			return this._wordWrap;
		}

		public set wordWrap(value: boolean) {
			if (this._wordWrap != value) {
				this._wordWrap = value;
				this.invalidate();
			}
		}

		/**
		 * 设置文本是否斜体
		 * @param value
		 *
		 */
		public set italic(value: boolean) {
			if (this._italic != value) {
				this._italic = value;
				this.invalidate();
			}
		}
		public get italic(): boolean {
			return this._italic;
		}

		/**
		 * 设置文本是否粗体
		 * @param value
		 *
		 */
		public set bold(value: boolean) {
			if (this._bold != value) {
				this._bold = value;
				this.invalidate();
			}
		}
		public get bold(): boolean {
			return this._bold;
		}

		/**
		 * 设置文本字体 
		 * @param value
		 * 
		 */
		public set fontName(value: string) {
			if (this._fontName != value) {
				this._fontName = value;
				this.invalidate();
			}
		}
		public get fontName(): string {
			return this._fontName;
		}

		/**
		 * 设置文本字体大小 
		 * @param value
		 * 
		 */
		public set fontSize(value: any) {
			if (this._fontSize != value) {
				this._fontSize = value;
				this.invalidate();
			}
		}
		public get fontSize(): any {
			return this._fontSize;
		}

		/**
		 * 设置文本颜色 
		 * @param value
		 * 
		 */
		public set color(value: any) {
			if (this._color != value) {
				this._color = value;
				this.invalidate();
			}
		}
		public get color(): any {
			return this._color;
		}

		/**
		 * 设置多行间距，外部设置一般为正数
		 */
		public get lineSpacing(): number {
			return this._lineSpacing;
		}

		public set lineSpacing(value: number) {
			if (this._lineSpacing != value) {
				this._lineSpacing = value;
				this.invalidate();
			}
		}

		/**
		 * 设置多行间距，外部设置一般为正数
		 */
		public get multiline(): boolean {
			return this._multiline;
		}

		public set multiline(value: boolean) {
			if (this._multiline != value) {
				this._multiline = value;
				this.invalidate();
			}
		}

		/**
		 * 文字描边
		 */
		public get stroke(): number {
			return this._stroke;
		}

		public set stroke(value: number) {
			if (this._stroke != value) {
				this._stroke = value;
				this.invalidate();
			}
		}

		/**
		 * 文字描边颜色
		 */
		public get strokeColor(): number {
			return this._strokeColor;
		}

		public set strokeColor(value: number) {
			if (this._strokeColor != value) {
				this._strokeColor = value;
				this.invalidate();
			}
		}

		/**
		 * 是否自动计算文字的尺寸来设置label尺寸
		 */
		public get autoSize(): boolean {
			return this._autoSize;
		}

		public set autoSize(value: boolean) {
			if (this._autoSize != value) {
				this._autoSize = value;
				this.invalidate();
			}
		}

		/**
		 * 水平对齐设置
		 * 默认egret.HorizontalAlign.LEFT;
		 */
		public get hAlign(): string {
			return this._hAlign;
		}

		public set hAlign(value: string) {
			if (this._hAlign != value) {
				this._hAlign = value;
				this.invalidate();
			}
		}

		/**
		 * 竖直对齐设置
		 * 默认egret.VerticalAlign.MIDDLE;
		 */
		public get vAlign(): string {
			return this._vAlign;
		}

		public set vAlign(value: string) {
			if (this._vAlign != value) {
				this._vAlign = value;
				this.invalidate();
			}
		}

		/**
		 * html的文本
		 * @param value
		 */
		public set html(value: boolean) {
			if (this._html != value) {
				this._html = value;
				this.invalidate();
			}
		}
		public get html(): boolean {
			return this._html;
		}
	}
}