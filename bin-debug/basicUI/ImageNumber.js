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
    //图片字体类
    var ImageNumber = (function (_super) {
        __extends(ImageNumber, _super);
        /**
         * imageAlias 单张字体图片命名格式
         * sheetAlias 全部字体图片的纹理图集
         * verticalAlign 垂直方向的对齐方式 默认顶部对齐
         * horizontalAlign 水平方向的对齐方式 默认左边对齐
         */
        function ImageNumber() {
            var _this = _super.call(this) || this;
            _this.numberImages = [];
            _this.numberImagePool = [];
            _this.numberTexture = {};
            _this.deltaWidth = 0;
            _this.deltaHeight = 0;
            return _this;
        }
        /**
         * imageAlias 单张字体图片命名格式
         * sheetAlias 全部字体图片的纹理图集
         * verticalAlign 垂直方向的对齐方式 默认顶部对齐
         * horizontalAlign 水平方向的对齐方式 默认左边对齐
         */
        ImageNumber.prototype.init = function (imageAlias, sheetAlias, verticalAlign, horizontalAlign) {
            if (sheetAlias === void 0) { sheetAlias = ""; }
            if (verticalAlign === void 0) { verticalAlign = "top"; }
            if (horizontalAlign === void 0) { horizontalAlign = "left"; }
            var s = this;
            s.imageAlias = imageAlias;
            s.sheetAlias = sheetAlias;
            s.verticalAlign = verticalAlign.toLowerCase();
            s.horizontalAlign = horizontalAlign.toLowerCase();
        };
        ImageNumber.prototype.show = function (pr, px, py, defaultText) {
            if (defaultText === void 0) { defaultText = null; }
            var s = this;
            if (s.parent != pr) {
                pr.addChild(s);
            }
            s.px = px;
            s.py = py;
            s.x = px;
            s.y = py;
            s.numberValue = defaultText;
            s.setNumber();
        };
        Object.defineProperty(ImageNumber.prototype, "text", {
            get: function () {
                var s = this;
                return s.numberValue;
            },
            set: function (value) {
                var s = this;
                if (s.numberValue != value) {
                    s.numberValue = value;
                    s.setNumber();
                }
            },
            enumerable: true,
            configurable: true
        });
        ImageNumber.prototype.setNumber = function () {
            var s = this;
            if (s.numberImages.length > 0) {
                for (var i = 0; i < s.numberImages.length; ++i) {
                    s.removeChild(s.numberImages[i]);
                    s.numberImagePool.push(s.numberImages[i]);
                }
                s.numberImages.length = 0;
            }
            if (s.numberValue && s.numberValue.length > 0) {
                var num = s.numberValue.length;
                var numberBitmap = void 0;
                var tex = void 0;
                var name_1;
                var spriteWidth = 0;
                var spriteHeight = 0;
                var temp = num / 2; //Math.floor(num / 2);
                for (var i = 0; i < num; ++i) {
                    name_1 = s.numberValue[i];
                    if (s.numberImagePool.length > 0) {
                        numberBitmap = s.numberImagePool.pop();
                    }
                    else {
                        numberBitmap = new egret.Bitmap;
                    }
                    tex = s.numberTexture[s.imageAlias + name_1];
                    if (!tex) {
                        tex = RES.getRes(s.sheetAlias + ("." + (s.imageAlias + name_1)));
                    }
                    numberBitmap.texture = tex;
                    if (numberBitmap) {
                        s.addChild(numberBitmap);
                        if (s.horizontalAlign == "left") {
                            numberBitmap.x = 0 + i * numberBitmap.width + i * s.deltaWidth;
                        }
                        else if (s.horizontalAlign == "center") {
                            numberBitmap.x = 0 + (i - temp) * numberBitmap.width + i * s.deltaWidth;
                        }
                        else if (s.horizontalAlign == "right") {
                            numberBitmap.x = 0 - (i + 1) * numberBitmap.width + i * s.deltaWidth;
                        }
                        if (s.verticalAlign == "top") {
                            numberBitmap.y = 0;
                        }
                        else if (s.verticalAlign == "middle") {
                            numberBitmap.y = 0 - numberBitmap.height / 2;
                        }
                        else if (s.verticalAlign == "bottom") {
                            numberBitmap.y = 0 - numberBitmap.height;
                        }
                        s.numberImages.push(numberBitmap);
                        spriteWidth += (numberBitmap.width + s.deltaWidth);
                        spriteHeight = numberBitmap.height;
                    }
                }
                s.width = spriteWidth;
                s.height = spriteHeight;
                if (s.horizontalAlign == "center") {
                    s.x = s.px + ((num - 1) * s.deltaWidth * -1) / 2;
                }
            }
        };
        return ImageNumber;
    }(codeBase.BasicGroup));
    codeBase.ImageNumber = ImageNumber;
    __reflect(ImageNumber.prototype, "codeBase.ImageNumber");
})(codeBase || (codeBase = {}));
