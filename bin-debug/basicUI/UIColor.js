var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**颜色 */
    var UIColor = (function () {
        function UIColor() {
        }
        Object.defineProperty(UIColor, "random", {
            get: function () { return Math.random() * 0XFFFFFF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "white", {
            get: function () { return 0XFFFFFF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "black", {
            get: function () { return 0X000000; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "gray", {
            get: function () { return 0X666666; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "red", {
            get: function () { return 0XFF0000; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "green", {
            get: function () { return 0X00FF00; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "blue", {
            get: function () { return 0X0000FF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "skinNormal", {
            get: function () { return 0X15191C; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "skinDown", {
            get: function () { return 0X999999; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UIColor, "titleBackground", {
            get: function () { return 0X20262B; },
            enumerable: true,
            configurable: true
        });
        ;
        UIColor.getRandomColors = function (count) {
            var colors = [];
            for (var i = 0; i < count; i++)
                colors.push(Math.random() * 0XFFFFFF);
            return colors;
        };
        ;
        /** 可改变颜色的亮暗,value值是-255到255*/
        UIColor.lightenDarkenColor = function (color, value) {
            var r = (color >> 16) + value;
            if (r > 255)
                r = 255;
            else if (r < 0)
                r = 0;
            var b = ((color >> 8) & 0x00FF) + value;
            if (b > 255)
                b = 255;
            else if (b < 0)
                b = 0;
            var g = (color & 0x0000FF) + value;
            if (g > 255)
                g = 255;
            else if (g < 0)
                g = 0;
            return (g | (b << 8) | (r << 16));
        };
        return UIColor;
    }());
    codeBase.UIColor = UIColor;
    __reflect(UIColor.prototype, "codeBase.UIColor");
})(codeBase || (codeBase = {}));
