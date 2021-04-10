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
        function Slider() {
            return _super.call(this) || this;
        }
        /**
         * bg:滑动器背景
         * skin:滑动器填充的滑动条
         * bar:滑动器滑动按钮
         */
        Slider.prototype.setSkin = function (bg, skin, bar) {
            if (bg === void 0) { bg = null; }
            if (skin === void 0) { skin = null; }
            if (bar === void 0) { bar = null; }
            _super.prototype.setSkin.call(this, bg, skin);
            this.skinBar = bar || codeBase.UISkin.sliderBar;
            this.addChild(this.skinBar);
            this.skinBar.touchEnabled = true;
            this.skinBar.addEventListener(codeBase.BasicUIEvent.TOUCH_BEGIN, this.onTouch, this);
            this.layout();
            this.value = 0;
        };
        Slider.prototype.onTouch = function (e) {
            switch (e.type) {
                case codeBase.BasicUIEvent.TOUCH_BEGIN:
                    this.stage.addEventListener(codeBase.BasicUIEvent.TOUCH_END, this.onTouch, this);
                    this.stage.addEventListener(codeBase.BasicUIEvent.TOUCH_MOVE, this.onTouch, this);
                    this.dispEvent(codeBase.BasicUIEvent.START);
                    break;
                case codeBase.BasicUIEvent.TOUCH_MOVE:
                    this.moveDo(e.stageX, e.stageY);
                    this.dispEvent(codeBase.BasicUIEvent.MOVE);
                    break;
                case codeBase.BasicUIEvent.TOUCH_END:
                    this.stage.removeEventListener(codeBase.BasicUIEvent.TOUCH_END, this.onTouch, this);
                    this.stage.removeEventListener(codeBase.BasicUIEvent.TOUCH_MOVE, this.onTouch, this);
                    this.dispEvent(codeBase.BasicUIEvent.OVER);
                    break;
            }
        };
        Slider.prototype.moveDo = function (x, y) {
            var s = this;
            var p = s.globalToLocal(x, y);
            var v;
            if (s.type == codeBase.Style.HORIZONTAL)
                v = p.x / s.skinProgress.width;
            else
                v = p.y / s.skinProgress.width;
            s.value = v;
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
                this.skinProgress.scaleX = v;
                if (this.type == codeBase.Style.HORIZONTAL)
                    this.skinBar.x = this.skinProgress.width * v;
                else
                    this.skinBar.y = this.skinProgress.width * v;
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
                this.skinBar.x = -this.skinProgress.height >> 1;
            }
            else {
                var angle = 0;
                this.skinBar.y = this.skinProgress.height >> 1;
            }
            this.skinBg.rotation = angle;
            this.skinProgress.rotation = angle;
            this.value = this._value;
        };
        return Slider;
    }(codeBase.Progress));
    codeBase.Slider = Slider;
    __reflect(Slider.prototype, "codeBase.Slider", ["codeBase.ILayout"]);
})(codeBase || (codeBase = {}));
