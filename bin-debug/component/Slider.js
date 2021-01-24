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
    /***滑动器 */
    var Slider = (function (_super) {
        __extends(Slider, _super);
        /**
         * bg:滑动器背景
         * value:滑动器填充的滑动条
         * bar:滑动器滑动按钮
         */
        function Slider(bg, value, bar) {
            if (bg === void 0) { bg = null; }
            if (value === void 0) { value = null; }
            if (bar === void 0) { bar = null; }
            var _this = _super.call(this, bg, value) || this;
            _this.skinBar = bar || codeBase.Skin.sliderBar;
            _this.addChild(_this.skinBar);
            _this.skinBar.touchEnabled = true;
            _this.skinBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
            _this.layout();
            _this.value = 0;
            return _this;
        }
        Slider.prototype.setSkin = function (bg, value) {
            if (bg === void 0) { bg = null; }
            if (value === void 0) { value = null; }
            this.skinBg = bg || codeBase.Skin.sliderBackground;
            this.skinValue = value || codeBase.Skin.sliderValue;
        };
        Slider.prototype.onTouch = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.dispEvent(codeBase.LayoutEvent.START);
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.moveDo(e.stageX, e.stageY);
                    this.dispEvent(codeBase.LayoutEvent.MOVE);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.dispEvent(codeBase.LayoutEvent.OVER);
                    break;
            }
        };
        Slider.prototype.moveDo = function (x, y) {
            var p = this.globalToLocal(x, y);
            var v;
            if (this.type == codeBase.Style.HORIZONTAL)
                v = p.x / this.skinValue.width;
            else
                v = p.y / this.skinValue.width;
            this.value = v;
        };
        Object.defineProperty(Slider.prototype, "value", {
            /**获取进度值 */
            get: function () {
                return this._value;
            },
            /**设置进度值，只能是0－1之间 */
            set: function (v) {
                v = v < 0 ? 0 : v > 1 ? 1 : v;
                this._value = v;
                this.skinValue.scaleX = v;
                if (this.type == codeBase.Style.HORIZONTAL)
                    this.skinBar.x = this.skinValue.width * v;
                else
                    this.skinBar.y = this.skinValue.width * v;
            },
            enumerable: true,
            configurable: true
        });
        /**横竖版布局，默认是横版布局 */
        Slider.prototype.layout = function (type, interval) {
            if (type === void 0) { type = codeBase.Style.HORIZONTAL; }
            if (interval === void 0) { interval = 0; }
            this.type = type;
            if (type == codeBase.Style.VERTICAL) {
                var angle = 90;
                this.skinBar.x = -this.skinValue.height >> 1;
            }
            else {
                var angle = 0;
                this.skinBar.y = this.skinValue.height >> 1;
            }
            this.skinBg.rotation = angle;
            this.skinValue.rotation = angle;
            this.value = this._value;
        };
        return Slider;
    }(codeBase.Progress));
    codeBase.Slider = Slider;
    __reflect(Slider.prototype, "codeBase.Slider", ["codeBase.ILayout"]);
})(codeBase || (codeBase = {}));
//# sourceMappingURL=Slider.js.map