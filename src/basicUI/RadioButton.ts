module codeBase {
	export class RadioButton extends CheckBox {
		public static RadioButton_PREFIX: string = "ui#radioButton#";//RadioButton事件的前缀,尽量避免受到其他事件名称的混淆
		//private _radioButtonGroup: string = null;//RadioButton分组名称
		protected _groupName: string;
		// protected static normalTexture: egret.Texture;
		// protected static checkTexture: egret.Texture;
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
			if (!RadioButton.normalTexture) {
				let normalSpr: DisplayObject = UISkin.radioOff;
				let normalRenderTex = new egret.RenderTexture;
				normalRenderTex.drawToTexture(normalSpr);
				RadioButton.normalTexture = <egret.Texture>normalRenderTex;

				let checkSpr: DisplayObject = UISkin.radioOn;
				let checkRenderTex = new egret.RenderTexture;
				checkRenderTex.drawToTexture(checkSpr);
				RadioButton.checkTexture = <egret.Texture>checkRenderTex;
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
				if (s._testPixelEnable) {
					if (!s.testPixel32(event.localX, event.localY)) {
						event.stopImmediatePropagation();
						return;
					}
				}
				if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
					s.alpha = 0.8;
				}
				else if (event.type == egret.TouchEvent.TOUCH_END) {
					s.alpha = 1;
					if (s.selected) return;
					s.selected = !s._selected;
					s.onPlaySound();
				}
				// console.log("Button _toggleGroup=" + this._toggleGroup + ", _selected=" + this._selected);
			}
			s.invalidate();
		}

		protected initDisplay() {
			let s = this;
			s.setSkins([RadioButton.normalTexture, RadioButton.checkTexture]);
		}

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

		public set groupName(value: string) {
			let s = this;
			if (StringUtil.isUsage(s._groupName)) {//旧的group
				EventManager.removeEventListener(RadioButton.RadioButton_PREFIX + s._groupName, s.onEventToggle, s);
			}
			s._groupName = value;//新的group
			if (StringUtil.isUsage(s._groupName)) {
				EventManager.addEventListener(RadioButton.RadioButton_PREFIX + s._groupName, s.onEventToggle, s);
			}
		}
		public get groupName(): string {
			return this._groupName;
		}

		private onEventToggle(event: MyEvent): void {
			let s = this;
			if (StringUtil.isUsage(s._groupName) && event.getItem("groupName") == s._groupName) {
				s.dispatchEventWith(BasicUIEvent.CHANGE, false, { caller: s, status: s.currentState });
				//console.log("0000 onEventToggle group=" + this._toggleGroup + ", data=" + this._data.id);
				if (event.getItem("caller") != s) {
					s.selected = false;
					//this._currentState = Button.STATE_UP;
					s.invalidate();
				} else {
					if (s.clickFun && s.clickFunObj) {
						s.clickFun.call(s.clickFunObj, event);
					}
				}
			}
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