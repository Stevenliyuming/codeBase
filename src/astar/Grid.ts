module codeBase{
    export class Grid {
        private _startNode: Node = null;
        private _endNode: Node = null;
        private _nodes: Array<Array<Node>> = null;
        private _numRows: number = 0;
        private _numCols: number = 0;
        private _cellSize: number = 20;
        private type: number = 0;
        // //格子直走权重
        // public static _straightCost: number = 10;//1.0;
        // //格子斜走权重
        // public static _diagCost: number = 14;//Math.SQRT2;

        public constructor(gridData: Array<any>, cellSize: number = 0) {
            this._numRows = gridData.length;
            this._numCols = gridData[0].length;
            this._cellSize = cellSize;
            this._nodes = new Array<Array<Node>>();
            for (var i: number = 0; i < this._numRows; i++) {
                this._nodes[i] = new Array<Node>();
                for (var j: number = 0; j < this._numCols; j++) {
                    let value = gridData[i][j].type == 1?0:1;
                    this._nodes[i][j] = new Node(i, j, value);
                    this._nodes[i][j].point.x = j * this._cellSize + this._cellSize / 2;
                    this._nodes[i][j].point.y = i * this._cellSize + this._cellSize / 2;
                }
            }
        }

        public get cellSize(): number {
            return this._cellSize;
        }

        /**
         * node 当前格子节点
         * type 0 八个方向的格子 1 四个方向的格子
         */
        public getNeighbourNodes(node:Node, type:number = 0) {
            let neighbourNodes:Node[] = [];
            let targetRow:number;
            let targetColumn:number;
            if(type == 0) {
                for(let i=-1; i<=1; ++i) {
                    for(let j=-1; j<=1; ++j) {
                        if(i==0 && j == 0) continue;
                        targetRow = node.row + i;
                        targetColumn = node.column + j;
                        if(targetRow >= 0 && targetRow < this._numRows && targetColumn >= 0 && targetColumn < this._numCols) {
                            neighbourNodes.push(this._nodes[targetRow][targetColumn]);
                        }
                    }
                }
            } else if(type == 1) {
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
        }

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

        public getType(): number {
            return this.type;
        }

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
        public getNodeByPoint(mapPoint:egret.Point):Node {
            var row:number = Math.floor(mapPoint.y / this.cellSize);
            var column:number = Math.floor(mapPoint.x / this.cellSize);
            row = Math.min(row, this.numRows - 1);
            row = Math.max(row, 0);
            column = Math.min(column, this.numCols - 1);
            column = Math.max(column, 0);
            return this.getNode(row, column);
        }

        public getNode(row: number, column: number): Node {
            return this._nodes[row][column];
        }

        public getLeftNode(node:Node) {
            if(node.column - 1 >= 0) {
                return this._nodes[node.row][node.column - 1];
            } 
            return null;
        }

        public getRightNode(node:Node) {
            if(node.column + 1 < this._numCols) {
                return this._nodes[node.row][node.column + 1];
            } 
            return null;
        }

        public getUpNode(node:Node) {
            if(node.row - 1 >= 0) {
                return this._nodes[node.row-1][node.column];
            } 
            return null;
        }

        public getDownNode(node:Node) {
            if(node.row + 1 < this._numRows) {
                return this._nodes[node.row+1][node.column];
            } 
            return null;
        }

        public setEndNode(row: number, column: number): void {
            this._endNode = this._nodes[row][column];
        }

        public setStartNode(row: number, column: number): void {
            this._startNode = this._nodes[row][column];
        }

        public setWalkable(row: number, column: number, value: boolean): void {
            this._nodes[row][column].walkable = value;
        }

        public get endNode(): Node {
            return this._endNode;
        }

        public get numCols(): number {
            return this._numCols;
        }

        public get numRows(): number {
            return this._numRows;
        }

        public get startNode(): Node {
            return this._startNode;
        }
    }
}