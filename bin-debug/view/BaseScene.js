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
            return _this;
            //this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        /**
         * 初始化一些必要的逻辑数据
         * 这个方法是在第一次加入stage的时候,做调用
         */
        BaseScene.prototype.initData = function () {
            _super.prototype.initData.call(this);
            var s = this;
            s.stage = codeBase.curStage();
            s.modulePath = ""; //UIControl.getInstance().curUIIDPath;
            s.skeletonPath = s.modulePath + "/skeleton/";
            s.videopath = "video/" + s.modulePath + "/";
        };
        BaseScene.prototype.hide = function () {
            console.log("remove" + egret.getQualifiedClassName(this));
        };
        return BaseScene;
    }(codeBase.BaseGroup));
    codeBase.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "codeBase.BaseScene");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=BaseScene.js.map