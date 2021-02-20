var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var EffectData = (function () {
        function EffectData() {
            this.oldX = 0;
            this.oldY = 0;
            this.newX = 0;
            this.newY = 0;
            this.oldAlpha = 0;
            this.newAlpha = 0;
            this.oldRotation = 0;
            this.newRotation = 0;
            this.oldScaleX = 0;
            this.newScaleX = 0;
            this.oldScaleY = 0;
            this.newScaleY = 0;
            this.oldAnchorX = 0;
            this.newAnchorX = 0;
            this.oldAnchorY = 0;
            this.newAnchorY = 0;
            this.isPlay = false; //当前是否播放
            this.loop = false; //是否循环
        }
        return EffectData;
    }());
    codeBase.EffectData = EffectData;
    __reflect(EffectData.prototype, "codeBase.EffectData");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=EffectData.js.map