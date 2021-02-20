var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var FairyGUIProto = (function () {
        function FairyGUIProto() {
        }
        FairyGUIProto.inject = function () {
            var fair;
            if (window["fairygui"] == null)
                return;
            fair = window["fairygui"];
            fair.GRoot.prototype["__winResize"] = function () {
                this.setSize(this._displayObject.width == 0 ? egret.MainContext.instance.stage.stageWidth : this._displayObject.width, this._displayObject.height == 0 ? egret.MainContext.instance.stage.stageHeight : this._displayObject.height);
            };
            fair.TweenManager.killAllTweens = function () {
                var cnt = fair.TweenManager._totalActiveTweens;
                for (var i = 0; i < cnt; i++) {
                    var tweener = fair.TweenManager._activeTweens[i];
                    if (tweener != null && !tweener._killed) {
                        tweener.kill();
                    }
                }
            };
        };
        return FairyGUIProto;
    }());
    codeBase.FairyGUIProto = FairyGUIProto;
    __reflect(FairyGUIProto.prototype, "codeBase.FairyGUIProto");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=FairyGUIProto.js.map