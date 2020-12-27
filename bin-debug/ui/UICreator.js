var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var UICreator = (function () {
        function UICreator() {
        }
        /**
         * 根据name关键字创建一个Bitmap对象
         */
        UICreator.createBitmap = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        /**创建九宫格图片 */
        UICreator.createScale9Image = function (name, alias, rect) {
            if (alias === void 0) { alias = null; }
            var result = new codeBase.Scale9Image(name, alias, rect);
            return result;
        };
        /**
         * 获取xy位置的像素值,xy是舞台值
         * @param x
         * @param y
         */
        UICreator.prototype.getPixel32 = function (target, x, y) {
            if (target && target.texture) {
                var locolPoint = target.globalToLocal(x, y);
                return target.texture.getPixel32(locolPoint.x, locolPoint.y);
            }
            return [];
        };
        /**
         * 检测xy位置的像素值是否透明,xy是舞台值
         * @param x 舞台值
         * @param y 舞台值
         * @return true:有像素值, false:无像素值
         */
        UICreator.prototype.testPixel32 = function (target, x, y) {
            var datas = this.getPixel32(target, x, y);
            for (var i = 0; i < datas.length; i++) {
                if (datas[i] > 0) {
                    return true;
                }
            }
            return false;
        };
        return UICreator;
    }());
    codeBase.UICreator = UICreator;
    __reflect(UICreator.prototype, "codeBase.UICreator");
})(codeBase || (codeBase = {}));
