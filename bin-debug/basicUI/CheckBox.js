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
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox() {
            return _super.call(this) || this;
        }
        CheckBox.prototype.createChildren = function () {
            //super.createChildren();
            var s = this;
            s._currentState = codeBase.Button.STATUS_NORMAL;
            s.touchEnabled = true; //事件接收
            s.touchChildren = false;
            //背景图多态显示
            s._imgDisplay = new egret.Bitmap;
            s.addChild(s._imgDisplay);
            // s._imgDisplay.width = s.width;
            // s._imgDisplay.height = s.height;
            s._imgDisplay.fillMode = s._fillMode;
            s._imgDisplay.touchEnabled = false;
            //文字显示
            s._labelMarginLeft = NaN;
            s._labelMarginTop = NaN;
            s._label = new codeBase.Label;
            s._label.autoSize = true;
            s._label.clip = false;
            s._label.hAlign = egret.HorizontalAlign.LEFT;
            s._label.vAlign = egret.VerticalAlign.MIDDLE;
            s._label.showBg = false;
            s.addChild(s._label);
            s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouchEvent, s);
            //this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEvent, this);
            s.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouchEvent, s);
            s.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, s.onTouchRleaseOutside, s);
            s.addEventListener(egret.TouchEvent.TOUCH_CANCEL, s.onTouchRleaseOutside, s);
        };
        CheckBox.prototype.initData = function () {
            var s = this;
            s.stateArray = [codeBase.Button.STATUS_NORMAL, codeBase.Button.STATUS_CHECKED];
            //初始化默认的皮肤
            if (!CheckBox.normalTexture) {
                var normalSpr = codeBase.UISkin.checkBoxOff;
                var normalRenderTex = new egret.RenderTexture;
                normalRenderTex.drawToTexture(normalSpr);
                CheckBox.normalTexture = normalRenderTex;
                var checkSpr = codeBase.UISkin.checkBoxOn;
                var checkRenderTex = new egret.RenderTexture;
                checkRenderTex.drawToTexture(checkSpr);
                CheckBox.checkTexture = checkRenderTex;
                var disableSpr = codeBase.UISkin.checkBoxDisabel;
                var disableRenderTex = new egret.RenderTexture;
                disableRenderTex.drawToTexture(disableSpr);
                CheckBox.disableTexture = disableRenderTex;
            }
        };
        CheckBox.prototype.onTouchEvent = function (event) {
            var s = this;
            if (!s.enabled || s.currentState == codeBase.Button.STATUS_DISABLE) {
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
                    s.selected = !s._selected;
                    s.onPlaySound();
                }
                // console.log("Button _toggleGroup=" + this._toggleGroup + ", _selected=" + this._selected);
            }
            s.invalidate();
        };
        /**
         * 在外释放
         * @param event
         */
        CheckBox.prototype.onTouchRleaseOutside = function (event) {
            var s = this;
            s.alpha = 1;
        };
        Object.defineProperty(CheckBox.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                var s = this;
                s._selected = value;
                s._currentState = (s._selected ? codeBase.Button.STATUS_CHECKED : codeBase.Button.STATUS_NORMAL);
                s.dispatchEventWith(codeBase.BasicUIEvent.CHANGE, false, { caller: s, status: s.currentState });
                //if (this._data)console.log("button data=" + this._data.id + ", selected=" + this._selected);
                // var myevent: MyEvent = MyEvent.getEvent(BasicUIEvent.CHANGE);
                // myevent.addItem("caller", s);
                // myevent.send();
                if (s.clickFun && s.clickFunObj) {
                    s.clickFun.call(s.clickFunObj, event);
                }
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 绘制
         */
        CheckBox.prototype.draw = function () {
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
                    s._label.x = s.width + 5; //默认文本放在复选框右边
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
        CheckBox.prototype.initDisplay = function () {
            var s = this;
            s.setSkins([CheckBox.normalTexture, CheckBox.checkTexture, CheckBox.disableTexture]);
        };
        /**
         * 设置按钮可用状态皮肤
         * <p>[STATE_NORMAL, STATE_CHECK, STATE_DISABLE]</p>
         */
        CheckBox.prototype.setSkins = function (skins) {
            var s = this;
            if (!skins || skins.length < 2) {
                console.warn("CHECKBOX皮肤数量不能小于2");
                return;
            }
            if (skins.length == 3) {
                s.stateArray.push(codeBase.Button.STATUS_DISABLE);
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
        return CheckBox;
    }(codeBase.Button));
    codeBase.CheckBox = CheckBox;
    __reflect(CheckBox.prototype, "codeBase.CheckBox");
})(codeBase || (codeBase = {}));
