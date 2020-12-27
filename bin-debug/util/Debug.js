var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * logger日志记录
     * 主要是输出到debugwin窗口中,一边debug信息查看
     */
    var Debug = (function () {
        function Debug() {
        }
        Object.defineProperty(Debug, "log", {
            get: function () {
                return this._log;
            },
            set: function (str) {
                if (codeBase.GlobalSetting.DEV_MODEL) {
                    console.log(str);
                    Debug._log += str + "\n";
                    if (Debug.callbackFunc)
                        this.callbackFunc.call(null);
                }
            },
            enumerable: true,
            configurable: true
        });
        Debug.refresh = function () {
            if (Debug.callbackFunc)
                this.callbackFunc.call(null);
        };
        Debug.clean = function () {
            if (codeBase.GlobalSetting.DEV_MODEL) {
                this._log = "";
                if (this.callbackFunc)
                    this.callbackFunc.call(null);
            }
        };
        /**
         * log日志记录
         */
        Debug._log = "";
        Debug.callbackFunc = null;
        return Debug;
    }());
    codeBase.Debug = Debug;
    __reflect(Debug.prototype, "codeBase.Debug");
})(codeBase || (codeBase = {}));
