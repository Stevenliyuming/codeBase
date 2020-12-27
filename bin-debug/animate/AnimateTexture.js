var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 动画元数据
     */
    var AnimateTexture = (function () {
        function AnimateTexture() {
            this.id = null; //名称
            this.frame = 0; //播放时长
            this.width = 0; //材质宽
            this.height = 0; //材质高
            this.x = 0; //x值
            this.y = 0; //y值
            this.offsetX = 0; //offset x值
            this.offsetY = 0; //offset y值
            this.texutre = null; //材质
            this.resId = null; //不合并的时候的资源id
        }
        return AnimateTexture;
    }());
    codeBase.AnimateTexture = AnimateTexture;
    __reflect(AnimateTexture.prototype, "codeBase.AnimateTexture");
})(codeBase || (codeBase = {}));
