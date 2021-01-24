var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var Link = (function () {
        function Link(node, cost) {
            this.node = null;
            this.cost = 0;
            this.node = node;
            this.cost = cost;
        }
        return Link;
    }());
    codeBase.Link = Link;
    __reflect(Link.prototype, "codeBase.Link");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=Link.js.map