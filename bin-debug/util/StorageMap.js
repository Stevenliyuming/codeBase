var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var StorageMap = (function () {
        function StorageMap() {
            this.mapObj = {};
        }
        StorageMap.prototype.setValue = function (key, value) {
            var s = this;
            if (key != "") {
                s.mapObj[key] = value;
            }
            else {
                console.log("key键值不能为空字符串!");
            }
        };
        StorageMap.prototype.getValue = function (key) {
            if (key != "") {
                return this.mapObj[key];
            }
            return null;
        };
        StorageMap.prototype.dispose = function () {
            var s = this;
            var key;
            for (key in s.mapObj) {
                if (s.mapObj[key]) {
                    delete s.mapObj[key];
                    s.mapObj[key] = null;
                }
            }
            s.mapObj = {};
        };
        return StorageMap;
    }());
    codeBase.StorageMap = StorageMap;
    __reflect(StorageMap.prototype, "codeBase.StorageMap");
})(codeBase || (codeBase = {}));
