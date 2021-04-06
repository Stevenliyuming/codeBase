module codeBase {
	export class TabBar extends RadioButton {
		public static TabBar_PREFIX: string = "ui#TabBar#";//TabBar事件的前缀,尽量避免受到其他事件名称的混淆
		// private _tabBarGroup: string = null;//TabBar分组名称
		protected static normalTexture: egret.Texture;
		protected static checkTexture: egret.Texture;
		private static tabWidth: number = 60;
		private static tabHeight: number = 30;
		public constructor() {
			super();
		}

		public createChildren(): void {
			super.createChildren();
		}

		public initData() {
			let s = this;
			s.stateArray = [Button.STATUS_NORMAL, Button.STATUS_CHECKED];
			//初始化默认的皮肤
			if (!TabBar.normalTexture) {
				let normalSpr: DisplayObject = UISkin.getRect(TabBar.tabWidth, TabBar.tabHeight, UIColor.white);
				let normalRenderTex = new egret.RenderTexture;
				normalRenderTex.drawToTexture(normalSpr);
				TabBar.normalTexture = <egret.Texture>normalRenderTex;

				let checkSpr: DisplayObject = UISkin.getRect(TabBar.tabWidth, TabBar.tabHeight, UIColor.gray);
				let checkRenderTex = new egret.RenderTexture;
				checkRenderTex.drawToTexture(checkSpr);
				TabBar.checkTexture = <egret.Texture>checkRenderTex;
			}
		}

		protected initDisplay() {
			let s = this;
			s.setSkins([TabBar.normalTexture, TabBar.checkTexture]);
		}


		// public onTouchEvent(event: egret.TouchEvent): void {
		// 	let s = this;
		// 	if (!s.enabled || s.currentState == Button.STATUS_DISABLE) {
		// 		event.stopImmediatePropagation();
		// 		return;
		// 	}
		// 	//console.log("Button onTouchEvent=" + event.type);
		// 	if (event.currentTarget == s) {
		// 		//像素检测
		// 		if (s._testPixelEnable) {
		// 			if (!s.testPixel32(event.localX, event.localY)) {
		// 				event.stopImmediatePropagation();
		// 				return;
		// 			}
		// 		}
		// 		if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
		// 			s.alpha = 0.8;
		// 		}
		// 		else if (event.type == egret.TouchEvent.TOUCH_END) {
		// 			s.alpha = 1;
		// 			if (s.selected) return;
		// 			s.selected = !s._selected;
		// 			s.onPlaySound();
		// 		}
		// 		// console.log("Button _toggleGroup=" + this._toggleGroup + ", _selected=" + this._selected);
		// 	}
		// 	s.invalidate();
		// }

		/**
		 * 绘制
		 */
		public draw(): void {
			//super.draw();
			//if (this._data)console.log("@@Button draw _text=" + this._text + ", selected=" + this.selected + ", data=" + this._data.id);
			//初始化显示对象和数据
			let s = this;
			if (!s._initDisplayData) {
				s.initDisplay();
			}

			if (s._imgDisplay == null) return;
			s._imgDisplay.texture = s._textureDict[s._currentState];

			//文字标签
			if (s._label) {
				if (!s._label.parent) s.addChild(s._label);
				s._label.text = s._text;
				s._label.fontSize = s._fontSize;
				s._label.fontName = s._fontName;
				s._label.bold = s._labelBold;
				s._label.italic = s._labelItalic;
				s._label.lineSpacing = s._labelLineSpacing;
				s._label.multiline = s._labelMultiline;
				s._label.stroke = s._labelStroke;
				s._label.strokeColor = s._labelStrokeColor;
				s._label.onInvalidate(null);//立即生效,这样下面的数据才准

				if (!isNaN(s._labelMarginLeft)) {
					s._label.x = s._labelMarginLeft;
				} else {
					s._label.x = (s.width - s._label.width) / 2;
					//console.log("Button.draw 222 this.width=" +this.width + ", this._label.width=" + this._label.width);
				}
				if (!isNaN(s._labelMarginTop)) {
					s._label.y = s._labelMarginTop;
				} else {
					s._label.y = (s.height - s._label.height) / 2;
				}
			}
		}

		// protected initDisplay() {
		// 	let s = this;
		// 	s.setSkins([RadioButton.normalTexture, RadioButton.checkTexture]);
		// }

		public set selected(value: boolean) {
			let s = this;
			s._selected = value;
			s._currentState = (s._selected ? Button.STATUS_CHECKED : Button.STATUS_NORMAL);
			//if (this._data)console.log("button data=" + this._data.id + ", selected=" + this._selected);
			if (s._selected && StringUtil.isUsage(s._groupName)) {
				var myevent: MyEvent = MyEvent.getEvent(RadioButton.RadioButton_PREFIX + s._groupName);
				myevent.addItem("caller", s);
				myevent.addItem("groupName", s._groupName);
				myevent.send();
			}
			s.invalidate();
		}
		public get selected(): boolean {
			return this._selected;
		}

		/**
		 * 设置按钮可用状态皮肤
		 * <p>[STATE_NORMAL, STATE_CHECK, STATE_DISABLE]</p>
		 */
		public setSkins(skins: egret.Texture[]) {
			let s = this;
			if (!skins || skins.length < 1 || skins.length > 2) {
				console.warn("CHECKBOX皮肤数量不能小于1或者大于2");
				return;
			}
			//初始化按钮状态皮肤
			s._initDisplayData = true;
			for (let i = 0, len = s.stateArray.length; i < len; ++i) {
				if (skins[i]) {
					s._textureDict[s.stateArray[i]] = skins[i];
				} else {
					s._initDisplayData = false;
					console.warn("指定的状态数和状态图片数不一致");
					break;
				}
			}
			if (s._initDisplayData) s.setSize(skins[0].textureWidth, skins[0].textureHeight);
			s.invalidate();
		}
	}
}