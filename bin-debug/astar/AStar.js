var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var AStar = (function () {
        function AStar() {
            this._straightCost = 1.0;
            this._diagCost = Math.SQRT2;
            this.nowversion = 1;
            this.TwoOneTwoZero = 2 * Math.cos(Math.PI / 3);
            this.heuristic = this.euclidian2;
        }
        Object.defineProperty(AStar.prototype, "grid", {
            get: function () {
                return this._grid;
            },
            enumerable: true,
            configurable: true
        });
        AStar.prototype.justMin = function (x, y) {
            return x.f < y.f;
        };
        AStar.prototype.findPath = function (grid) {
            this._grid = grid;
            this._endNode = this._grid.endNode;
            this.nowversion++;
            this._startNode = this._grid.startNode;
            //_open = [];
            this._open = new codeBase.BinaryHeap(this.justMin);
            this._startNode.g = 0;
            return this.search();
        };
        AStar.prototype.search = function () {
            var node = this._startNode;
            node.version = this.nowversion;
            while (node != this._endNode) {
                var len = node.links.length;
                for (var i = 0; i < len; i++) {
                    var test = node.links[i].node;
                    var cost = node.links[i].cost;
                    var g = node.g + cost;
                    var h = this.heuristic(test);
                    var f = g + h;
                    if (test.version == this.nowversion) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.ins(test);
                        test.version = this.nowversion;
                    }
                }
                if (this._open.a.length == 1) {
                    return false;
                }
                node = (this._open.pop());
            }
            this.buildPath();
            return true;
        };
        AStar.prototype.buildPath = function () {
            this.path = new Array();
            var node = this._endNode;
            this.path.push(node);
            while (node != this._startNode) {
                node = node.parent;
                this.path.unshift(node);
            }
        };
        AStar.prototype.manhattan = function (node) {
            return Math.abs(node.row - this._endNode.row) + Math.abs(node.column - this._endNode.column);
        };
        AStar.prototype.manhattan2 = function (node) {
            var dx = Math.abs(node.row - this._endNode.row);
            var dy = Math.abs(node.column - this._endNode.column);
            return dx + dy + Math.abs(dx - dy) / 1000;
        };
        AStar.prototype.euclidian = function (node) {
            var dx = node.row - this._endNode.row;
            var dy = node.column - this._endNode.column;
            return Math.sqrt(dx * dx + dy * dy);
        };
        AStar.prototype.chineseCheckersEuclidian2 = function (node) {
            var y = node.column / this.TwoOneTwoZero;
            var x = node.row + node.column / 2;
            var dx = x - this._endNode.row - this._endNode.column / 2;
            var dy = y - this._endNode.column / this.TwoOneTwoZero;
            return this.sqrt(dx * dx + dy * dy);
        };
        AStar.prototype.sqrt = function (x) {
            return Math.sqrt(x);
        };
        AStar.prototype.euclidian2 = function (node) {
            var dx = node.row - this._endNode.row;
            var dy = node.column - this._endNode.column;
            return dx * dx + dy * dy;
        };
        AStar.prototype.diagonal = function (node) {
            var dx = Math.abs(node.row - this._endNode.row);
            var dy = Math.abs(node.column - this._endNode.column);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        };
        return AStar;
    }());
    codeBase.AStar = AStar;
    __reflect(AStar.prototype, "codeBase.AStar");
})(codeBase || (codeBase = {}));
