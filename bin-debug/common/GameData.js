var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var GameData = (function () {
        function GameData() {
            this.targetIndexList = [];
            this.rabbitStatus = [];
        }
        Object.defineProperty(GameData, "Instance", {
            get: function () {
                if (GameData._instance == null) {
                    GameData._instance = new GameData();
                }
                return GameData._instance;
            },
            enumerable: true,
            configurable: true
        });
        return GameData;
    }());
    codeBase.GameData = GameData;
    __reflect(GameData.prototype, "codeBase.GameData");
})(codeBase || (codeBase = {}));
