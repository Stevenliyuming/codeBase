var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var AStar = (function () {
        function AStar() {
            this._straightCost = 10; ////1.0;
            this._diagCost = 14; //Math.SQRT2;
            //过滤斜向行走的可能，避免穿墙效果
            this.avoidSideGrids = false;
            this.nowVersion = 1;
            this.openSet = new Array();
            this.closeSet = new Array();
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
        AStar.prototype.floydPath = function (source, target, nodes) {
            /** 弗洛伊德路径平滑处理 **/
            var floydPath = nodes.concat();
            var len = floydPath.length;
            var i = 0;
            if (len > 2) {
                //遍历路径数组中全部路径节点，合并在同一直线上的路径节点
                //假设有1,2,3,三点，若2与1的横、纵坐标差值分别与3与2的横、纵坐标差值相等则
                //判断此三点共线，此时可以删除中间点2
                var vector = new codeBase.Node(0, 0, 1);
                var tempVector = new codeBase.Node(0, 0, 1);
                this.floydVector(vector, floydPath[len - 1], floydPath[len - 2]);
                for (i = len - 3; i >= 0; i--) {
                    this.floydVector(tempVector, floydPath[i + 1], floydPath[i]);
                    if (vector.row == tempVector.row && vector.column == tempVector.column) {
                        floydPath.splice(i + 1, 1);
                    }
                    else {
                        vector.row = tempVector.row;
                        vector.column = tempVector.column;
                    }
                }
            }
            //合并共线节点后进行第二步，消除拐点操作。算法流程如下：
            //使用两点之间的样本数值,不停的测试直线上的节点是不是可行走区域
            len = floydPath.length;
            if (len > 2) {
                for (i = len - 3; i >= 0; i--) {
                    if (!this.hasBarrier(floydPath[i + 2], floydPath[i])) {
                        floydPath.splice(i + 1, 1);
                    }
                }
            }
            var result = new Array();
            result.push(source);
            for (i = 1; i < floydPath.length - 1; i++) {
                result.push(floydPath[i].point);
            }
            result.push(target);
            floydPath.length = 0;
            return result;
        };
        /**
         * 判断两节点之间是否存在障碍物
         * @param node1
         * @param node2
         * @return
         */
        AStar.prototype.hasBarrier = function (node1, node2) {
            var d = Math.abs(egret.Point.distance(node1.point, node2.point));
            var index = 1;
            var grid = this.grid.cellSize / 2;
            var gridPoint = null;
            var gridNode = null;
            //取样点
            //while(index*grid<d){
            //    gridPoint = egret.Point.interpolate(node1.point, node2.point, index*grid/d);
            //    gridNode = this.getNode(gridPoint);
            //    if (!gridNode.walkable) return true;
            //    index ++;
            //}
            return false;
        };
        AStar.prototype.floydVector = function (target, n1, n2) {
            target.row = n1.row - n2.row;
            target.column = n1.column - n2.column;
        };
        /**
         * 二叉堆排序算法
         */
        AStar.prototype.justMin = function (x, y) {
            return x.f < y.f;
        };
        /**
         * 把节点放进二叉堆开放列表
         */
        AStar.prototype.pushOpenSetNode = function (node) {
            this.openSet.push(node);
            //将新加入的节点在二叉堆中做上浮处理：F值最小的放在最顶层位置
            codeBase.BinaryHeap.upAdjust(this.openSet);
        };
        /**
         * 从二叉堆开放列表中拿最小F值消耗的节点
         */
        AStar.prototype.popOpenSetNode = function () {
            if (this.openSet.length > 0) {
                var node = this.openSet[0];
                if (this.openSet.length > 1) {
                    //把二叉堆最后一个叶子节点放在顶部位置
                    this.openSet[0] = this.openSet[this.openSet.length - 1];
                    //从顶部节点位置开始向下排序节点，把最小F值节点放到最顶节点位置
                    codeBase.BinaryHeap.downAdjust(this.openSet, 0, this.openSet.length - 1);
                }
                else {
                    this.openSet.length = 0;
                }
                return node;
            }
            return null;
        };
        AStar.prototype.findPath = function (grid) {
            this._grid = grid;
            this._startNode = this._grid.startNode;
            this._endNode = this._grid.endNode;
            this._startNode.g = 0;
            this.openSet.length = 0;
            this.closeSet.length = 0;
            //this.openSet.push(this._startNode);
            codeBase.BinaryHeap.setJudgeFunction(this.justMin);
            this.pushOpenSetNode(this._startNode);
            while (this.openSet.length > 0) {
                //选择 F 值最小的 ( 方格 ) 节点，优化：可以通过维护一个排好序的表来改进，每次当你需要找到具有最小 F 值的方格时，仅取出表的第一项即可
                //let curNode: Node = this.openSet[0];
                // for (let i = 0, max = this.openSet.length; i < max; i++) {
                //     if (this.openSet[i].f < curNode.f) 
                //     //if (this.openSet[i].f <= curNode.f && this.openSet[i].h < curNode.h) 
                //     {
                //         curNode = this.openSet[i];
                //     }
                // }
                //this.openSet.splice(this.openSet.indexOf(curNode), 1);
                var curNode = this.popOpenSetNode();
                this.closeSet.push(curNode);
                // 找到的目标节点
                if (curNode == this._endNode) {
                    this.buildPath();
                    return true;
                }
                // 判断周围节点，选择一个最优的节点
                var neighbourNodes = grid.getNeighbourNodes(curNode, 0);
                var item = void 0;
                for (var i = 0; i < neighbourNodes.length; ++i) {
                    item = neighbourNodes[i];
                    // 如果是墙或者已经在关闭列表中
                    if (!item.walkable || this.closeSet.indexOf(item) >= 0)
                        continue;
                    if (this.avoidSideGrids) {
                        //当前节点左上角和左下角的相邻节点
                        if (item.row != curNode.row && item.column < curNode.column) {
                            var leftNode = this.grid.getLeftNode(curNode);
                            var upNode = this.grid.getUpNode(curNode);
                            var downNode = this.grid.getDownNode(curNode);
                            if (item.row < curNode.row && (leftNode && !leftNode.walkable) || (upNode && !upNode.walkable))
                                continue;
                            if (item.row > curNode.row && (leftNode && !leftNode.walkable) || (downNode && !downNode.walkable))
                                continue;
                        }
                        //当前节点右上角和右下角的相邻节点
                        if (item.row != curNode.row && item.column > curNode.column) {
                            var rightNode = this.grid.getLeftNode(curNode);
                            var upNode = this.grid.getUpNode(curNode);
                            var downNode = this.grid.getDownNode(curNode);
                            if (item.row < curNode.row && (rightNode && !rightNode.walkable || (upNode && !upNode.walkable)))
                                continue;
                            if (item.row > curNode.row && (rightNode && !rightNode.walkable || (downNode && !downNode.walkable)))
                                continue;
                        }
                    }
                    // 计算当前相邻节点和开始节点距离
                    var newCost = curNode.g + this.getDistanceNodes2(curNode, item);
                    var index = this.openSet.indexOf(item);
                    // 如果距离更小，或者原来不在开始列表中
                    if (newCost < item.g || index < 0) {
                        // 更新与开始节点的距离
                        item.g = newCost;
                        // 更新与终点的距离
                        item.h = this.manhattan2(item); //this.getDistanceNodes(this.grid.endNode, item);
                        //总的权重
                        item.f = item.g + item.h;
                        // 更新父节点为当前选定的节点
                        item.parent = curNode;
                        // 如果节点是新加入的，将它加入打开列表中
                        if (index < 0) {
                            //this.openSet.push(item);
                            this.pushOpenSetNode(item);
                        }
                    }
                }
            }
            return false;
        };
        // 获取两个节点之间的距离
        AStar.prototype.getDistanceNodes = function (a, b) {
            var cntX = Math.abs(a.point.x - b.point.x);
            var cntY = Math.abs(a.point.y - b.point.y);
            return Math.sqrt(cntX * cntX + cntY * cntY);
        };
        AStar.prototype.getDistanceNodes2 = function (a, b) {
            // let cntX = Math.abs(a.row - b.row) * this._straightCost;
            // let cntY = Math.abs(a.column - b.column) * this._straightCost;
            // return Math.sqrt(cntX * cntX + cntY * cntY);
            var cntX = Math.abs(a.row - b.row);
            var cntY = Math.abs(a.column - b.column);
            if (cntX > cntY) {
                return this._diagCost * cntY + this._straightCost * (cntX - cntY);
            }
            else {
                return this._diagCost * cntX + this._straightCost * (cntY - cntX);
            }
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
        // 曼哈顿距离, 表示两个点在标准坐标系上的绝对轴距之和
        AStar.prototype.manhattan = function (node) {
            return Math.abs(node.point.x - this._endNode.point.x) + Math.abs(node.point.y - this._endNode.point.y);
        };
        AStar.prototype.manhattan2 = function (node) {
            var dx = Math.abs(node.row - this._endNode.row);
            var dy = Math.abs(node.column - this._endNode.column);
            return (dx + dy) * this._straightCost;
        };
        //欧式距离, 其实就是应用勾股定理计算两个点的直线距离
        AStar.prototype.euclidian = function (node) {
            var dx = node.point.x - this._endNode.point.x;
            var dy = node.point.y - this._endNode.point.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        AStar.prototype.euclidian2 = function (node) {
            var dx = node.row - this._endNode.row;
            var dy = node.column - this._endNode.column;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
        };
        AStar.prototype.diagonal = function (node) {
            var dx = Math.abs(node.point.x - this._endNode.point.x);
            var dy = Math.abs(node.point.y - this._endNode.point.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
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
        return AStar;
    }());
    codeBase.AStar = AStar;
    __reflect(AStar.prototype, "codeBase.AStar");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=AStar.js.map