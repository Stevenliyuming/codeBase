var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var spine;
(function (spine) {
    var Map2 = (function () {
        function Map2() {
            this.mapData = {};
        }
        Map2.prototype.get = function (event) {
            if (typeof event !== "string") {
                return null;
            }
            var key = event;
            return this.mapData[key];
        };
        Map2.prototype.set = function (event, value) {
            if (typeof event !== "string") {
                return null;
            }
            var key = event;
            var val = value;
            if (!this.mapData[key]) {
                this.mapData[key] = [];
            }
            this.mapData[key].push(val);
        };
        Map2.prototype.delete = function (event) {
            if (typeof event !== "string") {
                return null;
            }
            var key = event;
            if (this.mapData[key]) {
                this.mapData[key] = [];
                delete this.mapData[key];
            }
        };
        Map2.prototype.clear = function () {
            for (var key in this.mapData) {
                if (this.mapData.hasOwnProperty[key]) {
                    delete this.mapData[key];
                }
            }
        };
        return Map2;
    }());
    spine.Map2 = Map2;
    __reflect(Map2.prototype, "spine.Map2");
})(spine || (spine = {}));
