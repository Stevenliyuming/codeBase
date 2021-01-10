module codeBase {
	export class TextInput extends Group {
		public _textField: egret.TextField = null;
		public _text: string = "";
		public _password: boolean = false;
		private _fontName: string = Style.fontName;//字体
		private _fontSize: number = Style.fontSize;//字体大小
		private _fontColor: number = Style.TEXTINPUT_COLOR;//字体颜色

		private _hAlign: string = egret.HorizontalAlign.LEFT;
		private _vAlign: string = egret.VerticalAlign.TOP;
		private _bold: boolean = false;
		private _italic: boolean = false;
		private _lineSpacing: number = 10;//行间距
		private _multiline: boolean = false;//多行显示
		private _stroke: number = 0;
		private _strokeColor: number = 0;
		private _wordWrap: boolean = true;//自动换行
		private _maxChars: number = 0;//输入最大字符
		private _restrict: string = null;//限制输入
		private _inputType: string = null;//键盘输入类型

		private _paddingLeft:number = 0;
		private _paddingRight:number = 0;
		private _paddingTop:number = 0;
		private _paddingBottom:number = 0;

		public constructor() {
			super();
		}

		public createChildren(): void {
			super.createChildren();
			//this.setSize(Style.TEXTINPUT_WIDTH, Style.TEXTINPUT_HEIGHT);
			this.bgColor = Style.INPUT_TEXT;
			this.clip = false;
			this.touchEnabled = true;
			this._textField = new egret.TextField();
			this._textField.height = this.height;
			this._textField.width = this.width;
			this._textField.displayAsPassword = false;
			this._textField.type = egret.TextFieldType.INPUT;
			this._textField.addEventListener(egret.Event.CHANGE, this.onTextChange, this);
			this._textField.touchEnabled = true;
			this.addChild(this._textField);
		}

		/**
		 * 文字输入变化处理
		 */
		public onTextChange(event: egret.Event): void {
			this._text = this._textField.text;
			//console.log("TextInput Change text=" + this._text);
			//this.invalidate();
		}

		/**
		 * 返回文字输入对象
		 */
		public getTextField(): egret.TextField {
			return this._textField;
		}

		/**
		 * 绘制组件内容
		 */
		public draw(): void {
			super.draw();
			//console.log("TextInput draw=" + this._textField + ", text=" + this._textField.type);
			if (!this._textField) return;
			if (this._fontName != null) {
				this._textField.fontFamily = this._fontName;
			}
			if(this._textField.width != this.width) this._textField.width = this.width;
			if(this._textField.height != this.height) this._textField.height = this.height;
			var newWidth = this._textField.width - this._paddingLeft - this._paddingRight;
			var newHeight = this._textField.height - this._paddingTop - this._paddingBottom;
			this._textField.width = newWidth;
			this._textField.height = newHeight;
			this._textField.x = this._paddingLeft;
			this._textField.y = this._paddingTop;
			if (this._fontColor >= 0) this._textField.textColor = this._fontColor;
			if (this._fontSize > 0) this._textField.size = this._fontSize;
			this._textField.textAlign = this._hAlign;
			this._textField.verticalAlign = this._vAlign;
			this._textField.bold = this._bold;
			this._textField.italic = this._italic;
			this._textField.multiline = this._multiline;
			this._textField.lineSpacing = this._lineSpacing;
			this._textField.stroke = this._stroke;
			this._textField.strokeColor = this._strokeColor;
			this._textField.displayAsPassword = this._password;
			this._textField.text = this._text;
			this._textField.wordWrap = this._wordWrap;
			this._textField.maxChars = this._maxChars;
			if (StringUtil.isUsage(this._restrict)) this._textField.restrict = this._restrict;
			if (StringUtil.isUsage(this._inputType)) this._textField.inputType = this._inputType;
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
		 * 设置文本输入为密码输入,采用掩码显示输入的内容
		 * @param value
		 * 
		 */
		public set password(value: boolean) {
			if (this._password != value) {
				this._password = value;
				this.invalidate();
			}
		}
		public get password(): boolean {
			return this._password;
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
		public set fontColor(value: number) {
			if (this._fontColor != value) {
				this._fontColor = value;
				this.invalidate();
			}
		}
		public get fontColor(): number {
			return this._fontColor;
		}

		/**
		 * 显示和设置文字
		 */
		public set text(t: string) {
			if (this._text != t) {
				this._text = t;
				this.invalidate();
			}
		}
		public get text(): string {
			return this._text;
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
		 * 文字水平对齐方式
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
		 * 文字竖直对齐方式
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

		public setFocus() {
			if (this._textField) {
				this._textField.setFocus();
			}
		}

		/**
		 * 最大输入字符
		 * @param value
		 */
		public set maxChars(value: number) {
			if (this._maxChars != value) {
				this._maxChars = value;
				this.invalidate();
			}
		}
		public get maxChars(): number {
			return this._maxChars;
		}

		/**
		 * 正则表达式,限制输入
		 * @param value
		 */
		public set restrict(value: string) {
			if (this._restrict != value) {
				this._restrict = value;
				this.invalidate();
			}
		}
		public get restrict(): string {
			return this._restrict;
		}

		/**
		 * 键盘类型
		 * @param value
		 */
		public set inputType(value: string) {
			if (this._inputType != value) {
				this._inputType = value;
				this.invalidate();
			}
		}
		public get inputType(): string {
			return this._inputType;
		}
	}
}