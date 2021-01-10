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
    var ListItemRenderer = (function (_super) {
        __extends(ListItemRenderer, _super);
        function ListItemRenderer() {
            return _super.call(this) || this;
        }
        /**
         * 初始化一些必要的逻辑数据
         * 这个方法是在第一次加入stage的时候,做调用
         */
        ListItemRenderer.prototype.initData = function () {
            var s = this;
        };
        ListItemRenderer.prototype.draw = function () {
            //super.draw();
            if (this.itemImage) {
                this.width = this.itemImage.texture.textureWidth;
                this.height = this.itemImage.texture.textureHeight;
            }
        };
        /**
         * 做ui的销毁
         * 一般情况下,需要手动调用销毁
         */
        ListItemRenderer.prototype.destroy = function () {
            var s = this;
            if (s.itemImage) {
                if (s.itemImage.parent) {
                    s.itemImage.parent.removeChild(s.itemImage);
                }
                s.itemImage = null;
            }
        };
        ListItemRenderer.prototype.validateNow = function () {
            var s = this;
            if (s.data) {
                if (!s.itemImage) {
                    s.itemImage = new codeBase.Image;
                    s.addChild(s.itemImage);
                }
                s.itemImage.texture = RES.getRes(s.data.res);
                s.onInvalidate(null);
            }
        };
        return ListItemRenderer;
    }(codeBase.DefaultRenderer));
    codeBase.ListItemRenderer = ListItemRenderer;
    __reflect(ListItemRenderer.prototype, "codeBase.ListItemRenderer");
})(codeBase || (codeBase = {}));
