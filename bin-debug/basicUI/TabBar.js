var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var codeBase;
(function (codeBase) {
    var TabBar = (function (_super) {
        __extends(TabBar, _super);
        function TabBar() {
            return _super.call(this) || this;
        }
        TabBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        TabBar.prototype.initData = function () {
            var s = this;
            s.stateArray = [codeBase.Button.STATUS_NORMAL, codeBase.Button.STATUS_CHECKED];
            //初始化默认的皮肤
            if (!TabBar.normalTexture) {
                var normalSpr = codeBase.UISkin.getRect(TabBar.tabWidth, TabBar.tabHeight, codeBase.UIColor.white);
                var normalRenderTex = new egret.RenderTexture;
                normalRenderTex.drawToTexture(normalSpr);
                TabBar.normalTexture = normalRenderTex;
                var checkSpr = codeBase.UISkin.getRect(TabBar.tabWidth, TabBar.tabHeight, codeBase.UIColor.gray);
                var checkRenderTex = new egret.RenderTexture;
                checkRenderTex.drawToTexture(checkSpr);
                TabBar.checkTexture = checkRenderTex;
            }
        };
        TabBar.prototype.initDisplay = function () {
            var s = this;
            s.setSkins([TabBar.normalTexture, TabBar.checkTexture]);
        };
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
        TabBar.prototype.draw = function () {
            //super.draw();
            //if (this._data)console.log("@@Button draw _text=" + this._text + ", selected=" + this.selected + ", data=" + this._data.id);
            //初始化显示对象和数据
            var s = this;
            if (!s._initDisplayData) {
                s.initDisplay();
            }
            if (s._imgDisplay == null)
                return;
            s._imgDisplay.texture = s._textureDict[s._currentState];
            //文字标签
            if (s._label) {
                if (!s._label.parent)
                    s.addChild(s._label);
                s._label.text = s._text;
                s._label.fontSize = s._fontSize;
                s._label.fontName = s._fontName;
                s._label.bold = s._labelBold;
                s._label.italic = s._labelItalic;
                s._label.lineSpacing = s._labelLineSpacing;
                s._label.multiline = s._labelMultiline;
                s._label.stroke = s._labelStroke;
                s._label.strokeColor = s._labelStrokeColor;
                s._label.onInvalidate(null); //立即生效,这样下面的数据才准
                if (!isNaN(s._labelMarginLeft)) {
                    s._label.x = s._labelMarginLeft;
                }
                else {
                    s._label.x = (s.width - s._label.width) / 2;
                    //console.log("Button.draw 222 this.width=" +this.width + ", this._label.width=" + this._label.width);
                }
                if (!isNaN(s._labelMarginTop)) {
                    s._label.y = s._labelMarginTop;
                }
                else {
                    s._label.y = (s.height - s._label.height) / 2;
                }
            }
        };
        Object.defineProperty(TabBar.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            // protected initDisplay() {
            // 	let s = this;
            // 	s.setSkins([RadioButton.normalTexture, RadioButton.checkTexture]);
            // }
            set: function (value) {
                var s = this;
                s._selected = value;
                s._currentState = (s._selected ? codeBase.Button.STATUS_CHECKED : codeBase.Button.STATUS_NORMAL);
                //if (this._data)console.log("button data=" + this._data.id + ", selected=" + this._selected);
                if (s._selected && codeBase.StringUtil.isUsage(s._groupName)) {
                    var myevent = codeBase.MyEvent.getEvent(codeBase.RadioButton.RadioButton_PREFIX + s._groupName);
                    myevent.addItem("caller", s);
                    myevent.addItem("groupName", s._groupName);
                    myevent.send();
                }
                s.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置按钮可用状态皮肤
         * <p>[STATE_NORMAL, STATE_CHECK, STATE_DISABLE]</p>
         */
        TabBar.prototype.setSkins = function (skins) {
            var s = this;
            if (!skins || skins.length < 1 || skins.length > 2) {
                console.warn("CHECKBOX皮肤数量不能小于1或者大于2");
                return;
            }
            //初始化按钮状态皮肤
            s._initDisplayData = true;
            for (var i = 0, len = s.stateArray.length; i < len; ++i) {
                if (skins[i]) {
                    s._textureDict[s.stateArray[i]] = skins[i];
                }
                else {
                    s._initDisplayData = false;
                    console.warn("指定的状态数和状态图片数不一致");
                    break;
                }
            }
            if (s._initDisplayData)
                s.setSize(skins[0].textureWidth, skins[0].textureHeight);
            s.invalidate();
        };
        TabBar.TabBar_PREFIX = "ui#TabBar#"; //TabBar事件的前缀,尽量避免受到其他事件名称的混淆
        TabBar.tabWidth = 60;
        TabBar.tabHeight = 30;
        return TabBar;
    }(codeBase.RadioButton));
    codeBase.TabBar = TabBar;
    __reflect(TabBar.prototype, "codeBase.TabBar");
})(codeBase || (codeBase = {}));
