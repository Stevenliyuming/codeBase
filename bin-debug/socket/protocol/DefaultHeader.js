var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var DefaultHeader = (function () {
        function DefaultHeader() {
            this.messageId = 0; //协议号
            this.code = 0; //校验位
        }
        return DefaultHeader;
    }());
    codeBase.DefaultHeader = DefaultHeader;
    __reflect(DefaultHeader.prototype, "codeBase.DefaultHeader", ["codeBase.IHeader"]);
})(codeBase || (codeBase = {}));
//# sourceMappingURL=DefaultHeader.js.map