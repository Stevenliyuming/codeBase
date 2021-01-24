var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var FilterUtil = (function () {
        function FilterUtil() {
            this.glowFilter = null;
        }
        Object.defineProperty(FilterUtil, "getInstance", {
            get: function () {
                if (!FilterUtil.instance) {
                    FilterUtil.instance = new FilterUtil;
                    FilterUtil.instance.init();
                }
                return FilterUtil.instance;
            },
            enumerable: true,
            configurable: true
        });
        FilterUtil.prototype.init = function () {
            var s = this;
            s.InitLightFilter();
        };
        FilterUtil.prototype.InitLightFilter = function () {
            var color = 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
            var alpha = 0.6; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%
            var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
            var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
            var strength = 6; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255
            var quality = 2 /* MEDIUM */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
            var inner = false; /// 指定发光是否为内侧发光
            var knockout = false; /// 指定对象是否具有挖空效果
            this.glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        };
        /**设置发光滤镜
         * alpha:0-1
         * strength:0-255
        */
        FilterUtil.prototype.setGlowFilter = function (obj, color, alpha, strength) {
            if (color === void 0) { color = 0x33CCFF; }
            if (alpha === void 0) { alpha = 0.6; }
            if (strength === void 0) { strength = 6; }
            var s = this;
            s.glowFilter.color = color;
            s.glowFilter.alpha = alpha;
            s.glowFilter.strength = strength;
            obj.filters = [this.glowFilter];
        };
        /**清除滤镜 */
        FilterUtil.prototype.cleanFilter = function (obj) {
            obj.filters = [];
        };
        /**设置对象颜色
         * color 颜色
         * alpha:透明度 默认值1
         */
        FilterUtil.prototype.setDisplayColor = function (display, color, alpha) {
            if (alpha === void 0) { alpha = 1; }
            var s = this;
            var result = s.spliceColor(color);
            //console.log(result);
            var colorMatrix = [
                1, 0, 0, 0, 40,
                0, 1, 0, 0, 10,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            colorMatrix[0] = result.r / 255;
            colorMatrix[6] = result.g / 255;
            colorMatrix[12] = result.b / 255;
            colorMatrix[18] = alpha;
            var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            display.filters = [colorFilter];
        };
        /**
         *将16进制颜色分割成rgb值
         */
        FilterUtil.prototype.spliceColor = function (color) {
            var result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        };
        /**
         * 转换10进制rbg颜色转换到16进制
         */
        FilterUtil.prototype.convertNumberToHex = function (r, g, b) {
            var strHex = "";
            var r1 = r.toString(16);
            if (r1.length == 1 || r1 === "0")
                r1 = "0" + r1;
            var g1 = g.toString(16);
            if (g1.length == 1 || g1 === "0")
                g1 = "0" + g1;
            var b1 = b.toString(16);
            if (b1.length == 1 || b1 === "0")
                b1 = "0" + b1;
            strHex = "0x" + r1 + g1 + b1;
            return parseInt(strHex);
        };
        return FilterUtil;
    }());
    codeBase.FilterUtil = FilterUtil;
    __reflect(FilterUtil.prototype, "codeBase.FilterUtil");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=FilterUtil.js.map