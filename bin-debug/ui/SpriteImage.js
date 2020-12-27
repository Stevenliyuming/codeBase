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
    var SpriteImage = (function (_super) {
        __extends(SpriteImage, _super);
        function SpriteImage() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.bitmap = new egret.Bitmap;
            self.addChild(self.bitmap);
            return _this;
        }
        Object.defineProperty(SpriteImage.prototype, "texture", {
            get: function () {
                return this.bitmap.texture;
            },
            set: function (value) {
                this.bitmap.texture = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteImage.prototype, "width", {
            get: function () {
                if (this.bitmap) {
                    return this.bitmap.width;
                }
                return undefined;
            },
            set: function (value) {
                egret.superSetter(SpriteImage, this, "width", value);
                if (this.bitmap) {
                    this.bitmap.width = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteImage.prototype, "height", {
            get: function () {
                if (this.bitmap) {
                    return this.bitmap.height;
                }
                return undefined;
            },
            set: function (value) {
                egret.superSetter(SpriteImage, this, "height", value);
                if (this.bitmap) {
                    this.bitmap.height = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        // public get anchorOffsetX(): number {
        // 	return this.bitmap.$anchorOffsetX;
        // }
        // public set anchorOffsetX(value: number) {
        // 	this.bitmap.anchorOffsetX = value;
        // }
        // public get anchorOffsetY(): number {
        // 	return this.bitmap.$anchorOffsetY;
        // }
        // public set anchorOffsetY(value: number) {
        // 	this.bitmap.anchorOffsetY = value;
        // }
        /**
         * scale9Rectangle : [左边距,右边距,上边距,下边距]
         *
         */
        SpriteImage.prototype.scale9Grid = function (scale9Rectangle) {
            if (scale9Rectangle === void 0) { scale9Rectangle = []; }
            var s = this;
            if (scale9Rectangle.length == 4 && s.bitmap.texture) {
                var x = scale9Rectangle[0];
                var y = scale9Rectangle[2];
                var width = s.bitmap.texture.$getTextureWidth() - (scale9Rectangle[0] + scale9Rectangle[1]);
                var height = s.bitmap.texture.$getTextureHeight() - (scale9Rectangle[2] + scale9Rectangle[3]);
                s.bitmap.scale9Grid = new egret.Rectangle(x, y, width, height);
            }
        };
        /**创建精灵位图
         * 区别于Bitmap,精灵位图有容器和布局约束的功能
         * scale9Rectangle : [左边距,右边距,上边距,下边距]
         */
        SpriteImage.createImage = function (texture, scale9Rectangle) {
            if (scale9Rectangle === void 0) { scale9Rectangle = []; }
            var img = new SpriteImage;
            img.texture = texture;
            img.scale9Grid(scale9Rectangle);
            return img;
        };
        return SpriteImage;
    }(codeBase.BaseGroup));
    codeBase.SpriteImage = SpriteImage;
    __reflect(SpriteImage.prototype, "codeBase.SpriteImage");
})(codeBase || (codeBase = {}));
