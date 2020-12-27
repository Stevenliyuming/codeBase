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
    /**九宫格*/
    var Scale9Image = (function (_super) {
        __extends(Scale9Image, _super);
        function Scale9Image(name, alias, rect) {
            if (alias === void 0) { alias = null; }
            if (rect === void 0) { rect = null; }
            var _this = _super.call(this) || this;
            if (name != null) {
                _this.texture = RES.getRes(name);
                if (_this.texture) {
                    _this.scale9Grid = rect || new codeBase.Rectangle(8, 8, 2, 2);
                }
                else {
                    if (name.indexOf("http") == 0) {
                        _this.loadImage(name);
                    }
                    else {
                        egret.error("找不到资源：" + name);
                    }
                }
            }
            return _this;
        }
        /**实时加载图片资源 */
        Scale9Image.prototype.loadImage = function (url) {
            if (url != null && url != "") {
                var imageLoader = new egret.ImageLoader();
                egret.ImageLoader.crossOrigin = "anonymous"; //用于跨域加载
                imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
                imageLoader.load(url);
            }
        };
        Scale9Image.prototype.loadCompleteHandler = function (event) {
            var imageLoader = event.currentTarget;
            var texture = new egret.Texture();
            texture._setBitmapData(imageLoader.data);
            this.texture = texture;
        };
        return Scale9Image;
    }(codeBase.Bitmap));
    codeBase.Scale9Image = Scale9Image;
    __reflect(Scale9Image.prototype, "codeBase.Scale9Image");
})(codeBase || (codeBase = {}));
