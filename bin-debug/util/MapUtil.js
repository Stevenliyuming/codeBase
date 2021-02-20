var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var MapUtil = (function () {
        function MapUtil() {
            this.mapObj = {};
        }
        MapUtil.prototype.setValue = function (key, value) {
            var s = this;
            if (key != "") {
                s.mapObj[key] = value;
            }
            else {
                console.log("key键值不能为空字符串!");
            }
        };
        MapUtil.prototype.getValue = function (key) {
            if (key != "") {
                return this.mapObj[key];
            }
            return null;
        };
        MapUtil.prototype.dispose = function () {
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
        return MapUtil;
    }());
    codeBase.MapUtil = MapUtil;
    __reflect(MapUtil.prototype, "codeBase.MapUtil");
})(codeBase || (codeBase = {}));
