var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var Grid = (function () {
        function Grid(gridData, cellSize) {
            if (cellSize === void 0) { cellSize = 0; }
            this._startNode = null;
            this._endNode = null;
            this._nodes = null;
            this._numCols = 0;
            this._numRows = 0;
            this._cellSize = 20;
            this.type = 0;
            this._straightCost = 1.0;
            this._diagCost = Math.SQRT2;
            this._numRows = gridData.length;
            this._numCols = gridData[0].length;
            this._cellSize = cellSize;
            this._nodes = new Array();
            for (var i = 0; i < this._numCols; i++) {
                this._nodes[i] = new Array();
                for (var j = 0; j < this._numRows; j++) {
                    this._nodes[i][j] = new codeBase.Node(i, j, gridData[j][i]);
                    this._nodes[i][j].point.x = i * this._cellSize + this._cellSize / 2;
                    this._nodes[i][j].point.y = j * this._cellSize + this._cellSize / 2;
                }
            }
        }
        Object.defineProperty(Grid.prototype, "cellSize", {
            get: function () {
                return this._cellSize;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         * @param	type	0四方向 1八方向 2跳棋
         */
        Grid.prototype.calculateLinks = function (type) {
            if (type === void 0) { type = 0; }
            this.type = type;
            for (var i = 0; i < this._numCols; i++) {
                for (var j = 0; j < this._numRows; j++) {
                    this.initNodeLink(this._nodes[i][j], type);
                }
            }
        };
        Grid.prototype.getType = function () {
            return this.type;
        };
        /**
         *
         * @param	node
         * @param	type	0八方向 1四方向 2跳棋
         */
        Grid.prototype.initNodeLink = function (node, type) {
            if (type === void 0) { type = 0; }
            var startX = Math.max(0, node.row - 1);
            //            var endX:int = Math.min(numCols - 1, node.row);
            var endX = Math.min(this.numCols - 1, node.row + 1);
            var startY = Math.max(0, node.column - 1);
            //            var endY:int = Math.min(numRows - 1, node.column);
            var endY = Math.min(this.numRows - 1, node.column + 1);
            node.links = new Array();
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this.getNode(i, j);
                    if (test == node || !test.walkable) {
                        continue;
                    }
                    if (type != 2 && i != node.row && j != node.column) {
                        var test2 = this.getNode(node.row, j);
                        if (!test2.walkable) {
                            continue;
                        }
                        test2 = this.getNode(i, node.column);
                        if (!test2.walkable) {
                            continue;
                        }
                    }
                    var cost = this._straightCost;
                    if (!((node.row == test.row) || (node.column == test.column))) {
                        if (type == 1) {
                            continue;
                        }
                        if (type == 2 && (node.row - test.row) * (node.column - test.column) == 1) {
                            continue;
                        }
                        if (type == 2) {
                            cost = this._straightCost;
                        }
                        else {
                            cost = this._diagCost;
                        }
                    }
                    node.links.push(new codeBase.Link(test, cost));
                }
            }
        };
        Grid.prototype.getNode = function (x, y) {
            if (y === void 0) { y = 0; }
            return this._nodes[x][y];
        };
        Grid.prototype.setEndNode = function (x, y) {
            if (y === void 0) { y = 0; }
            this._endNode = this._nodes[x][y];
        };
        Grid.prototype.setStartNode = function (x, y) {
            if (y === void 0) { y = 0; }
            this._startNode = this._nodes[x][y];
        };
        Grid.prototype.setWalkable = function (x, y, value) {
            this._nodes[x][y].walkable = value;
        };
        Object.defineProperty(Grid.prototype, "endNode", {
            get: function () {
                return this._endNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "numCols", {
            get: function () {
                return this._numCols;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "numRows", {
            get: function () {
                return this._numRows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "startNode", {
            get: function () {
                return this._startNode;
            },
            enumerable: true,
            configurable: true
        });
        return Grid;
    }());
    codeBase.Grid = Grid;
    __reflect(Grid.prototype, "codeBase.Grid");
})(codeBase || (codeBase = {}));
