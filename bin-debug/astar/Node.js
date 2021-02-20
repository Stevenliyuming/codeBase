var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var Node = (function () {
        function Node(row, column, value) {
            if (value === void 0) { value = 0; }
            this.row = 0; //行
            this.column = 0; //列
            this.f = 0;
            this.g = 0;
            this.h = 0;
            this.walkable = true;
            this.alpha = 1;
            this.data = 0;
            this.parent = null;
            this.version = 1;
            this.point = null;
            this.row = row;
            this.column = column;
            this.data = value;
            if (this.data == 0) {
                this.walkable = false;
            }
            else {
                this.walkable = true;
            }
            this.point = new egret.Point();
        }
        return Node;
    }());
    codeBase.Node = Node;
    __reflect(Node.prototype, "codeBase.Node");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=Node.js.map