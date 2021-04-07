module codeBase {
	export class CheckBox extends Button {
		protected static normalTexture: egret.Texture;
		protected static checkTexture: egret.Texture;
		protected static disableTexture: egret.Texture;
		protected touchId: number = -1;
		public constructor() {
			super();
		}

		public createChildren(): void {
			//super.createChildren();
			let s = this;
			s._currentState = Button.STATUS_NORMAL;
			s.touchEnabled = true;//事件接收
			s.touchChildren = false;
			//box显示
			s._imgDisplay = new egret.Bitmap;
			s.addChild(s._imgDisplay);
			// s._imgDisplay.width = s.width;
			// s._imgDisplay.height = s.height;
			s._imgDisplay.fillMode = s._fillMode;
			s._imgDisplay.touchEnabled = false;

			//文字显示
			s._labelMarginLeft = NaN;
			s._labelMarginTop = NaN;
			s._label = new Label;
			s.fontSize = 15;
			s._label.autoSize = true;
			s._label.clip = false;
			s._label.hAlign = egret.HorizontalAlign.LEFT;
			s._label.vAlign = egret.VerticalAlign.MIDDLE;
			s._label.showBg = false;
			s.addChild(s._label);

			s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouchEvent, s, true);
			//this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEvent, this);
			s.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouchEvent, s, true);
			s.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, s.onTouchReleaseOutside, s, true);
			s.addEventListener(egret.TouchEvent.TOUCH_CANCEL, s.onTouchReleaseOutside, s, true);
		}

		public initData() {
			let s = this;
			s.stateArray = [Button.STATUS_NORMAL, Button.STATUS_CHECKED];
			//初始化默认的皮肤
			if (!CheckBox.normalTexture) {
				let normalSpr: DisplayObject = UISkin.checkBoxOff;
				let normalRenderTex = new egret.RenderTexture;
				normalRenderTex.drawToTexture(normalSpr);
				CheckBox.normalTexture = <egret.Texture>normalRenderTex;

				let checkSpr: DisplayObject = UISkin.checkBoxOn;
				let checkRenderTex = new egret.RenderTexture;
				checkRenderTex.drawToTexture(checkSpr);
				CheckBox.checkTexture = <egret.Texture>checkRenderTex;

				let disableSpr: DisplayObject = UISkin.checkBoxDisabel;
				let disableRenderTex = new egret.RenderTexture;
				disableRenderTex.drawToTexture(disableSpr);
				CheckBox.disableTexture = <egret.Texture>disableRenderTex;
			}
		}

		public onTouchEvent(event: egret.TouchEvent): void {
			let s = this;
			if (!s.enabled || s.currentState == Button.STATUS_DISABLE) {
				event.stopImmediatePropagation();
				return;
			}
			//console.log("Button onTouchEvent=" + event.type);
			if (event.currentTarget == s) {
				//像素检测
				if (s._testPixelEnable && !s.testPixel32(event.localX, event.localY)) {
					event.stopImmediatePropagation();
					return;
				}
				if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
					s.alpha = 0.8;
					s.touchId = event.touchPointID;
				}
				else if (event.type == egret.TouchEvent.TOUCH_END) {
					if (s.touchId == -1) return;
					s.touchId = -1;
					s.alpha = 1;
					s.selected = !s._selected;
					s.onPlaySound();
				}
				// console.log("Button _toggleGroup=" + this._toggleGroup + ", _selected=" + this._selected);
			}
			s.invalidate();
		}

        /**
         * 在外释放
         * @param event
         */
		public onTouchReleaseOutside(event: egret.TouchEvent): void {
			let s = this;
			s.alpha = 1;
			s.touchId = -1;
		}

		public set selected(value: boolean) {
			let s = this;
			s._selected = value;
			s._currentState = (s._selected ? Button.STATUS_CHECKED : Button.STATUS_NORMAL);
			s.dispatchEventWith(BasicUIEvent.CHANGE, false, { caller: s, status: s.currentState });
			//if (this._data)console.log("button data=" + this._data.id + ", selected=" + this._selected);
			// var myevent: MyEvent = MyEvent.getEvent(BasicUIEvent.CHANGE);
			// myevent.addItem("caller", s);
			// myevent.send();
			if (s.clickFun && s.clickFunObj) {
				s.clickFun.call(s.clickFunObj, event);
			}
			s.invalidate();
		}
		public get selected(): boolean {
			return this._selected;
		}

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
					s._label.x = s.width + 5;//默认文本放在复选框右边
					//console.log("Button.draw 222 this.width=" +this.width + ", this._label.width=" + this._label.width);
				}
				if (!isNaN(s._labelMarginTop)) {
					s._label.y = s._labelMarginTop;
				} else {
					s._label.y = (s.height - s._label.height) / 2;
				}
			}
		}

		protected initDisplay() {
			let s = this;
			s.setSkins([CheckBox.normalTexture, CheckBox.checkTexture, CheckBox.disableTexture]);
		}

		/**
		 * 设置按钮可用状态皮肤
		 * <p>[STATE_NORMAL, STATE_CHECK, STATE_DISABLE]</p>
		 */
		public setSkins(skins: egret.Texture[]) {
			let s = this;
			if (!skins || skins.length < 2) {
				console.warn("CHECKBOX皮肤数量不能小于2");
				return;
			}
			if (skins.length == 3) {
				s.stateArray.push(Button.STATUS_DISABLE);
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