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
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image() {
            var _this = _super.call(this) || this;
            _this._bitmap = null;
            _this._texture = null;
            /**
             * 根据外部设定的大小改变实际bitmap大小
             */
            _this._autoSize = true;
            _this._scale9GridEnable = false;
            _this._scale9GridRect = null; //九宫拉伸的尺寸
            _this.scale9RectData = [];
            _this._fillMode = egret.BitmapFillMode.SCALE; //scale, repeat, clip
            _this._smoothing = false;
            _this.explicitWidth = NaN;
            _this.explicitHeight = NaN;
            return _this;
        }
        Image.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._bitmap = new egret.Bitmap();
            this._bitmap.fillMode = egret.BitmapFillMode.SCALE;
            this.addChild(this._bitmap);
        };
        Object.defineProperty(Image.prototype, "fillMode", {
            /**
             * Sets/gets the fillMode of the scale9Grid bitmap.(scale|repeat)
             */
            get: function () {
                return this._fillMode;
            },
            set: function (value) {
                if (this._fillMode != value) {
                    this._fillMode = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "autoSize", {
            /**
             *  Sets/gets the common scaleEnable of the bitmap.
             */
            get: function () {
                return this._autoSize;
            },
            set: function (value) {
                if (this._autoSize != value) {
                    this._autoSize = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "texture", {
            /**
             * Sets/gets the bitmapData of the bitmap.
             */
            get: function () {
                return this._texture;
            },
            set: function (value) {
                if (this._texture != value) {
                    this._texture = value;
                    this.invalidate();
                    this.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * scale9Rectangle : [左边距,右边距,上边距,下边距]
         *
         */
        Image.prototype.scale9Grid = function (scale9RectData) {
            if (scale9RectData === void 0) { scale9RectData = []; }
            var s = this;
            if (scale9RectData.length == 4) {
                this.scale9RectData = scale9RectData.concat();
            }
            else {
                this.scale9RectData.length = 0;
            }
            this.invalidate();
        };
        Image.prototype.scale9Rect = function () {
            var rect = new egret.Rectangle();
            rect.x = 1;
            rect.y = 1;
            rect.width = 1;
            rect.height = 1;
            return rect;
        };
        Object.defineProperty(Image.prototype, "smoothing", {
            get: function () {
                return this._smoothing;
            },
            /**
             * 图片平滑设置，优化图片拉伸.
             * @param value
             *
             */
            set: function (value) {
                if (this._smoothing != value) {
                    this._smoothing = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "width", {
            get: function () {
                return this.$getWidth();
            },
            /**
             * 覆写width方法,在width改变的时候,做逻辑运算
             * @param w
             */
            set: function (w) {
                if (w < 0 || w == this.explicitWidth) {
                    return;
                }
                this.explicitWidth = w;
                _super.prototype.$setWidth.call(this, w);
                this.onInvalidatePosition();
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "height", {
            get: function () {
                return this.$getHeight();
            },
            /**
             * 覆写height方法,在height改变的时候,做逻辑运算
             * @param h
             */
            set: function (h) {
                if (h < 0 || h == this.explicitHeight) {
                    return;
                }
                this.explicitHeight = h;
                _super.prototype.$setHeight.call(this, h);
                this.onInvalidatePosition();
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Image.prototype.draw = function () {
            if (!this._bitmap || this._texture == null)
                return;
            if (this._bitmap.texture != this._texture) {
                this._bitmap.texture = this._texture;
                if (isNaN(this.explicitWidth)) {
                    this.width = this._bitmap.texture.textureWidth;
                }
                if (isNaN(this.explicitHeight)) {
                    this.height = this._bitmap.texture.textureHeight;
                }
            }
            this._bitmap.fillMode = this._fillMode;
            if (this.scale9RectData.length == 4) {
                if (this._scale9GridRect == null)
                    this._scale9GridRect = this.scale9Rect();
                this._scale9GridRect.x = this.scale9RectData[0];
                this._scale9GridRect.y = this.scale9RectData[2];
                this._scale9GridRect.width = this._bitmap.texture.$getTextureWidth() - (this.scale9RectData[0] + this.scale9RectData[1]);
                this._scale9GridRect.height = this._bitmap.texture.$getTextureHeight() - (this.scale9RectData[2] + this.scale9RectData[3]);
                this._bitmap.scale9Grid = this._scale9GridRect;
                this._bitmap.scaleX = 1;
                this._bitmap.scaleY = 1;
                // this._bitmap.width = this.width;
                // this._bitmap.height = this.height;
            }
            else {
                this._bitmap.scale9Grid = null;
            }
            if (this._fillMode != egret.BitmapFillMode.SCALE) {
                this._bitmap.width = this.width;
                this._bitmap.height = this.height;
            }
            else {
                this._bitmap.scaleX = this.width / this._bitmap.texture.textureWidth;
                this._bitmap.scaleY = this.height / this._bitmap.texture.textureHeight;
            }
            //this.setSize(this._bitmap.width, this._bitmap.height);
            this.anchorOffsetX = this.anchorX * this.width;
            this.anchorOffsetY = this.anchorY * this.height;
        };
        Image.prototype.getBitmap = function () {
            return this._bitmap;
        };
        /**
         * 获取xy位置的像素值,xy是舞台值
         * @param x
         * @param y
         */
        Image.prototype.getPixel32 = function (x, y) {
            if (this._bitmap && this._bitmap.texture) {
                var locolPoint = this.globalToLocal(x, y);
                return this._bitmap.texture.getPixel32(locolPoint.x, locolPoint.y);
            }
            return [];
        };
        /**
         * 检测xy位置的像素值是否透明,xy是舞台值
         * @param x 舞台值
         * @param y 舞台值
         * @return true:有像素值, false:无像素值
         */
        Image.prototype.testPixel32 = function (x, y) {
            var datas = this.getPixel32(x, y);
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    return true;
                }
            }
            return false;
        };
        return Image;
    }(codeBase.BaseGroup));
    codeBase.Image = Image;
    __reflect(Image.prototype, "codeBase.Image");
})(codeBase || (codeBase = {}));
