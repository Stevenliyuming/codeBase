module codeBase{
	/***进度条 */
	export class Progress extends BasicLayout {
		protected skinBg: DisplayObject;
		protected skinValue: DisplayObject;
		protected text: Label;
		protected _value: number = 0;
		/**
		 * bg:进度条背景显示对象
		 * 
		 * value:进度条进度显示对象
		 */
		public constructor(bg: DisplayObject = null, value: DisplayObject = null) {
			super();
			this.setSkin(bg, value);
			this.addChild(this.skinBg);
			this.addChild(this.skinValue);
			this.text = new Label;
			this.addChild(this.text);
		}

		protected setSkin(bg: DisplayObject = null, value: DisplayObject = null) {
			this.skinBg = bg || Skin.progressBackground;
			this.skinValue = value || Skin.progressValue;
		}

		/**值只能是0－1之间 */
		public set value(v: number) {
			v = v < 0 ? 0 : v > 1 ? 1 : v;
			this._value = v;
			this.skinValue.scaleX = v;
		}

		public get value(): number {
			return this._value;
		}

		/**
		 * 显示进度文本
		 */
		public showText(text: string, x: number = -1, y: number = -1): void {
			this.text.text = text;
			if (x == -1) this.text.x = (this.skinBg.width - this.text.width) >> 1
			else this.text.x = x;
			if (y == -1) this.text.y = this.skinBg.height + 5;
			else this.text.y = y;
		}
	}
}