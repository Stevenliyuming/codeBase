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
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            var _this = _super.call(this) || this;
            _this.isClear = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
            return _this;
        }
        BaseScene.prototype.init = function () {
            var s = this;
            s.stage = codeBase.curStage();
            s.modulePath = ""; //UIControl.getInstance().curUIIDPath;
            s.skeletonPath = s.modulePath + "/skeleton/";
            s.videopath = "video/" + s.modulePath + "/";
            s.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.hide, s);
        };
        BaseScene.prototype.hide = function () {
            console.log("remove" + egret.getQualifiedClassName(this));
        };
        return BaseScene;
    }(codeBase.BaseGroup));
    codeBase.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "codeBase.BaseScene");
})(codeBase || (codeBase = {}));
