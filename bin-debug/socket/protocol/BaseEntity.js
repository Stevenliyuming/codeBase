var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var BaseEntity = (function () {
        function BaseEntity() {
            this.define = new Array(); //包体 item定义数据
        }
        BaseEntity.prototype.destory = function () {
        };
        return BaseEntity;
    }());
    codeBase.BaseEntity = BaseEntity;
    __reflect(BaseEntity.prototype, "codeBase.BaseEntity");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=BaseEntity.js.map