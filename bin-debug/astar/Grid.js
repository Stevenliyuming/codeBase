var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var Grid = (function () {
        // //格子直走权重
        // public static _straightCost: number = 10;//1.0;
        // //格子斜走权重
        // public static _diagCost: number = 14;//Math.SQRT2;
        function Grid(gridData, cellSize) {
            if (cellSize === void 0) { cellSize = 0; }
            this._startNode = null;
            this._endNode = null;
            this._nodes = null;
            this._numRows = 0;
            this._numCols = 0;
            this._cellSize = 20;
            this.type = 0;
            this._numRows = gridData.length;
            this._numCols = gridData[0].length;
            this._cellSize = cellSize;
            this._nodes = new Array();
            for (var i = 0; i < this._numRows; i++) {
                this._nodes[i] = new Array();
                for (var j = 0; j < this._numCols; j++) {
                    var value = gridData[i][j].type == 1 ? 0 : 1;
                    this._nodes[i][j] = new codeBase.Node(i, j, value);
                    this._nodes[i][j].point.x = j * this._cellSize + this._cellSize / 2;
                    this._nodes[i][j].point.y = i * this._cellSize + this._cellSize / 2;
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
         * node 当前格子节点
         * type 0 八个方向的格子 1 四个方向的格子
         */
        Grid.prototype.getNeighbourNodes = function (node, type) {
            if (type === void 0) { type = 0; }
            var neighbourNodes = [];
            var targetRow;
            var targetColumn;
            if (type == 0) {
                for (var i = -1; i <= 1; ++i) {
                    for (var j = -1; j <= 1; ++j) {
                        if (i == 0 && j == 0)
                            continue;
                        targetRow = node.row + i;
                        targetColumn = node.column + j;
                        if (targetRow >= 0 && targetRow < this._numRows && targetColumn >= 0 && targetColumn < this._numCols) {
                            neighbourNodes.push(this._nodes[targetRow][targetColumn]);
                        }
                    }
                }
            }
            else if (type == 1) {
                //上
                targetRow = node.row - 1;
                targetColumn = node.column;
                if (targetRow >= 0 && targetRow < this._numRows && targetColumn >= 0 && targetColumn < this._numCols) {
                    neighbourNodes.push(this._nodes[targetRow][targetColumn]);
                }
                //下
                targetRow = node.row + 1;
                targetColumn = node.column;
                if (targetRow >= 0 && targetRow < this._numRows && targetColumn >= 0 && targetColumn < this._numCols) {
                    neighbourNodes.push(this._nodes[targetRow][targetColumn]);
                }
                //左
                targetRow = node.row;
                targetColumn = node.column - 1;
                if (targetRow >= 0 && targetRow < this._numRows && targetColumn >= 0 && targetColumn < this._numCols) {
                    neighbourNodes.push(this._nodes[targetRow][targetColumn]);
                }
                //右
                targetRow = node.row;
                targetColumn = node.column + 1;
                if (targetRow >= 0 && targetRow < this._numRows && targetColumn >= 0 && targetColumn < this._numCols) {
                    neighbourNodes.push(this._nodes[targetRow][targetColumn]);
                }
            }
            return neighbourNodes;
        };
        // /**
        //  *
        //  * @param	type	0四方向 1八方向
        //  */
        // public calculateLinks(type: number = 0): void {
        //     this.type = type;
        //     for (var i: number = 0; i < this._numRows; i++) {
        //         for (var j: number = 0; j < this._numCols; j++) {
        //             this.initNodeLink(this._nodes[i][j], type);
        //         }
        //     }
        // }
        Grid.prototype.getType = function () {
            return this.type;
        };
        /**
         *
         * @param	node
         * @param	type	0八方向 1四方向
         */
        // private initNodeLink(node: Node, type: number = 0): void {
        //     var startX: number = Math.max(0, node.row - 1);
        //     //            var endX:int = Math.min(numCols - 1, node.row);
        //     var endX: number = Math.min(this.numCols - 1, node.row + 1);
        //     var startY: number = Math.max(0, node.column - 1);
        //     //            var endY:int = Math.min(numRows - 1, node.column);
        //     var endY: number = Math.min(this.numRows - 1, node.column + 1);
        //     node.links = new Array<Link>();
        //     for (var i: number = startX; i <= endX; i++) {
        //         for (var j: number = startY; j <= endY; j++) {
        //             var test: Node = this.getNode(i, j);
        //             if (test == node || !test.walkable) {
        //                 continue;
        //             }
        //             if (type != 2 && i != node.row && j != node.column) {
        //                 var test2: Node = this.getNode(node.row, j);
        //                 if (!test2.walkable) {
        //                     continue;
        //                 }
        //                 test2 = this.getNode(i, node.column);
        //                 if (!test2.walkable) {
        //                     continue;
        //                 }
        //             }
        //             var cost: number = Grid._straightCost;
        //             if (!((node.row == test.row) || (node.column == test.column))) {
        //                 if (type == 1) {
        //                     continue;
        //                 }
        //                 if (type == 2 && (node.row - test.row) * (node.column - test.column) == 1) {
        //                     continue;
        //                 }
        //                 if (type == 2) {
        //                     cost = Grid._straightCost;
        //                 } else {
        //                     cost = Grid._diagCost;
        //                 }
        //             }
        //             node.links.push(new Link(test, cost));
        //         }
        //     }
        // }
        /**
         * 路点格子
         */
        Grid.prototype.getNodeByPoint = function (mapPoint) {
            var row = Math.floor(mapPoint.y / this.cellSize);
            var column = Math.floor(mapPoint.x / this.cellSize);
            row = Math.min(row, this.numRows - 1);
            row = Math.max(row, 0);
            column = Math.min(column, this.numCols - 1);
            column = Math.max(column, 0);
            return this.getNode(row, column);
        };
        Grid.prototype.getNode = function (row, column) {
            return this._nodes[row][column];
        };
        Grid.prototype.getLeftNode = function (node) {
            if (node.column - 1 >= 0) {
                return this._nodes[node.row][node.column - 1];
            }
            return null;
        };
        Grid.prototype.getRightNode = function (node) {
            if (node.column + 1 < this._numCols) {
                return this._nodes[node.row][node.column + 1];
            }
            return null;
        };
        Grid.prototype.getUpNode = function (node) {
            if (node.row - 1 >= 0) {
                return this._nodes[node.row - 1][node.column];
            }
            return null;
        };
        Grid.prototype.getDownNode = function (node) {
            if (node.row + 1 < this._numRows) {
                return this._nodes[node.row + 1][node.column];
            }
            return null;
        };
        Grid.prototype.setEndNode = function (row, column) {
            this._endNode = this._nodes[row][column];
        };
        Grid.prototype.setStartNode = function (row, column) {
            this._startNode = this._nodes[row][column];
        };
        Grid.prototype.setWalkable = function (row, column, value) {
            this._nodes[row][column].walkable = value;
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
//# sourceMappingURL=Grid.js.map