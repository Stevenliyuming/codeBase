module codeBase{
	/***滑动器 */
	export class Slider extends Progress implements ILayout {
		protected skinBar: DisplayObject;
		protected type: string;
		/**
		 * bg:滑动器背景
		 * value:滑动器填充的滑动条
		 * bar:滑动器滑动按钮
		 */
		public constructor(bg: DisplayObject = null, value: DisplayObject = null, bar: DisplayObject = null) {
			super(bg, value);
			this.skinBar = bar || Skin.sliderBar;
			this.addChild(this.skinBar);
			this.skinBar.touchEnabled = true;
			this.skinBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
			this.layout();
			this.value = 0;
		}

		protected setSkin(bg: DisplayObject = null, value: DisplayObject = null) {
			this.skinBg = bg || Skin.sliderBackground;
			this.skinValue = value || Skin.sliderValue;
		}

		protected onTouch(e: egret.TouchEvent): void {
			switch (e.type) {
				case egret.TouchEvent.TOUCH_BEGIN:
					this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.dispEvent(LayoutEvent.START);
					break;
				case egret.TouchEvent.TOUCH_MOVE:
					this.moveDo(e.stageX, e.stageY);
					this.dispEvent(LayoutEvent.MOVE);
					break;
				case egret.TouchEvent.TOUCH_END:
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.dispEvent(LayoutEvent.OVER);
					break;
			}
		}

		protected moveDo(x: number, y: number): void {
			var p: Point = this.globalToLocal(x, y);
			var v: number;
			if (this.type == Style.HORIZONTAL) v = p.x / this.skinValue.width;
			else v = p.y / this.skinValue.width;
			this.value = v;
		}

		/**设置进度值，只能是0－1之间 */
		public set value(v: number) {
			v = v < 0 ? 0 : v > 1 ? 1 : v;
			this._value = v;
			this.skinValue.scaleX = v;
			if (this.type == Style.HORIZONTAL) this.skinBar.x = this.skinValue.width * v;
			else this.skinBar.y = this.skinValue.width * v;
		}

		/**获取进度值 */
		public get value(): number {
			return this._value;
		}

		/**横竖版布局，默认是横版布局 */
		public layout(type: string = Style.HORIZONTAL, interval: number = 0): void {
			this.type = type
			if (type == Style.VERTICAL) {
				var angle = 90;
				this.skinBar.x = -this.skinValue.height >> 1;
			} else {
				var angle = 0;
				this.skinBar.y = this.skinValue.height >> 1;
			}
			this.skinBg.rotation = angle;
			this.skinValue.rotation = angle;
			this.value = this._value;
		}
	}
}