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
    /***进度条 */
    var Progress = (function (_super) {
        __extends(Progress, _super);
        function Progress() {
            var _this = _super.call(this) || this;
            _this._value = 0;
            return _this;
        }
        /**
         * bg:进度条背景
         * skin:进度条进度
         */
        Progress.prototype.setSkin = function (bg, skin) {
            this.skinBg = bg || codeBase.UISkin.progressBackground;
            this.skinProgress = skin || codeBase.UISkin.progressSkin;
            this.addChild(this.skinBg);
            this.addChild(this.skinProgress);
            this.text = new codeBase.Label;
            this.addChild(this.text);
        };
        Object.defineProperty(Progress.prototype, "value", {
            get: function () {
                return this._value;
            },
            /**值只能是0－1之间 */
            set: function (v) {
                v = v < 0 ? 0 : v > 1 ? 1 : v;
                this._value = v;
                this.skinProgress.scaleX = v;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 显示进度文本
         */
        Progress.prototype.showText = function (text, x, y) {
            if (x === void 0) { x = -1; }
            if (y === void 0) { y = -1; }
            this.text.text = text;
            if (x == -1)
                this.text.x = (this.skinBg.width - this.text.width) >> 1;
            else
                this.text.x = x;
            if (y == -1)
                this.text.y = this.skinBg.height + 5;
            else
                this.text.y = y;
        };
        return Progress;
    }(codeBase.BasicGroup));
    codeBase.Progress = Progress;
    __reflect(Progress.prototype, "codeBase.Progress");
})(codeBase || (codeBase = {}));
