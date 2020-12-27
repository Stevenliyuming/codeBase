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
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.init = function () {
            _super.prototype.init.call(this);
            this.createView();
        };
        LoadingUI.prototype.createView = function () {
            this.textField = new codeBase.Label();
            this.addChild(this.textField);
            this.textField.horizontalCenter = 0;
            this.textField.verticalCenter = 0;
            this.textField.width = 480;
            this.textField.height = 100;
            this.textField.autoSize = true;
            this.textField.showBg = false;
        };
        LoadingUI.prototype.onProgress = function (current, total) {
            this.textField.text = "Loading..." + current + "/" + total;
        };
        return LoadingUI;
    }(codeBase.BaseScene));
    codeBase.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "codeBase.LoadingUI", ["RES.PromiseTaskReporter"]);
})(codeBase || (codeBase = {}));
