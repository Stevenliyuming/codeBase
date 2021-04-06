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
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        // protected static normalTexture: egret.Texture;
        // protected static checkTexture: egret.Texture;
        function RadioButton() {
            return _super.call(this) || this;
        }
        RadioButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        RadioButton.prototype.initData = function () {
            var s = this;
            s.stateArray = [codeBase.Button.STATUS_NORMAL, codeBase.Button.STATUS_CHECKED];
            //初始化默认的皮肤
            if (!RadioButton.normalTexture) {
                var normalSpr = codeBase.UISkin.radioOff;
                var normalRenderTex = new egret.RenderTexture;
                normalRenderTex.drawToTexture(normalSpr);
                RadioButton.normalTexture = normalRenderTex;
                var checkSpr = codeBase.UISkin.radioOn;
                var checkRenderTex = new egret.RenderTexture;
                checkRenderTex.drawToTexture(checkSpr);
                RadioButton.checkTexture = checkRenderTex;
            }
        };
        RadioButton.prototype.onTouchEvent = function (event) {
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
                    if (s.selected)
                        return;
                    s.selected = !s._selected;
                    s.onPlaySound();
                }
                // console.log("Button _toggleGroup=" + this._toggleGroup + ", _selected=" + this._selected);
            }
            s.invalidate();
        };
        RadioButton.prototype.initDisplay = function () {
            var s = this;
            s.setSkins([RadioButton.normalTexture, RadioButton.checkTexture]);
        };
        Object.defineProperty(RadioButton.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                var s = this;
                s._selected = value;
                s._currentState = (s._selected ? codeBase.Button.STATUS_CHECKED : codeBase.Button.STATUS_NORMAL);
                //if (this._data)console.log("button data=" + this._data.id + ", selected=" + this._selected);
                if (s._selected && codeBase.StringUtil.isUsage(s._groupName)) {
                    var myevent = codeBase.MyEvent.getEvent(RadioButton.RadioButton_PREFIX + s._groupName);
                    myevent.addItem("caller", s);
                    myevent.addItem("groupName", s._groupName);
                    myevent.send();
                }
                s.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButton.prototype, "groupName", {
            get: function () {
                return this._groupName;
            },
            set: function (value) {
                var s = this;
                if (codeBase.StringUtil.isUsage(s._groupName)) {
                    codeBase.EventManager.removeEventListener(RadioButton.RadioButton_PREFIX + s._groupName, s.onEventToggle, s);
                }
                s._groupName = value; //新的group
                if (codeBase.StringUtil.isUsage(s._groupName)) {
                    codeBase.EventManager.addEventListener(RadioButton.RadioButton_PREFIX + s._groupName, s.onEventToggle, s);
                }
            },
            enumerable: true,
            configurable: true
        });
        RadioButton.prototype.onEventToggle = function (event) {
            var s = this;
            if (codeBase.StringUtil.isUsage(s._groupName) && event.getItem("groupName") == s._groupName) {
                s.dispatchEventWith(codeBase.BasicUIEvent.CHANGE, false, { caller: s, status: s.currentState });
                //console.log("0000 onEventToggle group=" + this._toggleGroup + ", data=" + this._data.id);
                if (event.getItem("caller") != s) {
                    s.selected = false;
                    //this._currentState = Button.STATE_UP;
                    s.invalidate();
                }
                else {
                    if (s.clickFun && s.clickFunObj) {
                        s.clickFun.call(s.clickFunObj, event);
                    }
                }
            }
        };
        /**
         * 设置按钮可用状态皮肤
         * <p>[STATE_NORMAL, STATE_CHECK, STATE_DISABLE]</p>
         */
        RadioButton.prototype.setSkins = function (skins) {
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
        RadioButton.RadioButton_PREFIX = "ui#radioButton#"; //RadioButton事件的前缀,尽量避免受到其他事件名称的混淆
        return RadioButton;
    }(codeBase.CheckBox));
    codeBase.RadioButton = RadioButton;
    __reflect(RadioButton.prototype, "codeBase.RadioButton");
})(codeBase || (codeBase = {}));
