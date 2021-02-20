var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 本地数据存储
     */
    var LocalStorage = (function () {
        function LocalStorage() {
        }
        // 储存数据需要key和value，都必须是字符串
        LocalStorage.setLocalData = function (key, value) {
            egret.localStorage.setItem(key, value);
        };
        // 读取数据
        LocalStorage.getLocalData = function (key) {
            return egret.localStorage.getItem(key);
        };
        // 删除数据
        LocalStorage.deleteLocalData = function (key) {
            egret.localStorage.removeItem(key);
        };
        // 将所有数据清空
        LocalStorage.clearLocalData = function () {
            egret.localStorage.clear();
        };
        return LocalStorage;
    }());
    codeBase.LocalStorage = LocalStorage;
    __reflect(LocalStorage.prototype, "codeBase.LocalStorage");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=LocalStorage.js.map