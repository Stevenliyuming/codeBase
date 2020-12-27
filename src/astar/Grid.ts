module codeBase{

	export class Grid {
        private _startNode:Node = null;
        private _endNode:Node = null;
        private _nodes:Array<Array<Node>> = null;
        private _numCols:number = 0;
        private _numRows:number = 0;
        private _cellSize:number = 20;
        
        private type:number = 0;
        
        private _straightCost:number = 1.0;
        private _diagCost:number = Math.SQRT2;
        
        public constructor(gridData:Array<any>, cellSize:number = 0){
            this._numRows = gridData.length;
            this._numCols = gridData[0].length;
            this._cellSize = cellSize;
            this._nodes = new Array<Array<Node>>();
            
            for (var i:number = 0; i < this._numCols; i++){
                this._nodes[i] = new Array<Node>();
                for (var j:number = 0; j < this._numRows; j++){
                    this._nodes[i][j] = new Node(i, j, gridData[j][i]);
                    this._nodes[i][j].point.x = i * this._cellSize + this._cellSize/2;
                    this._nodes[i][j].point.y = j * this._cellSize + this._cellSize/2;
                }
            }
        }
        
        public get cellSize():number {
            return this._cellSize;
        }

        /**
         *
         * @param	type	0四方向 1八方向 2跳棋
         */
        public calculateLinks(type:number = 0):void {
            this.type = type;
            for (var i:number = 0; i < this._numCols; i++){
                for (var j:number = 0; j < this._numRows; j++){
                    this.initNodeLink(this._nodes[i][j], type);
                }
            }
        }
        
        public getType():number {
            return this.type;
        }
        
        /**
         *
         * @param	node
         * @param	type	0八方向 1四方向 2跳棋
         */
        private initNodeLink(node:Node, type:number = 0):void {
            var startX:number = Math.max(0, node.row - 1);
//            var endX:int = Math.min(numCols - 1, node.row);
            var endX:number = Math.min(this.numCols - 1, node.row + 1);
            
            var startY:number = Math.max(0, node.column - 1);
//            var endY:int = Math.min(numRows - 1, node.column);
            var endY:number = Math.min(this.numRows - 1, node.column + 1);
            
            node.links = new Array<Link>();
            for (var i:number = startX; i <= endX; i++){
                for (var j:number = startY; j <= endY; j++){
                    var test:Node = this.getNode(i, j);
                    if (test == node || !test.walkable){
                        continue;
                    }
                    if (type != 2 && i != node.row && j != node.column){
                        var test2:Node = this.getNode(node.row, j);
                        if (!test2.walkable){
                            continue;
                        }
                        test2 = this.getNode(i, node.column);
                        if (!test2.walkable){
                            continue;
                        }
                    }
                    var cost:number = this._straightCost;
                    if (!((node.row == test.row) || (node.column == test.column))){
                        if (type == 1){
                            continue;
                        }
                        if (type == 2 && (node.row - test.row) * (node.column - test.column) == 1){
                            continue;
                        }
                        if (type == 2){
                            cost = this._straightCost;
                        } else {
                            cost = this._diagCost;
                        }
                    }
                    node.links.push(new Link(test, cost));
                }
            }
        }
        
        public getNode(x:number, y:number = 0):Node {
            return this._nodes[x][y];
        }
        
        public setEndNode(x:number, y:number = 0):void {
            this._endNode = this._nodes[x][y];
        }
        
        public setStartNode(x:number, y:number = 0):void {
            this._startNode = this._nodes[x][y];
        }
        
        public setWalkable(x:number, y:number, value:boolean):void {
            this._nodes[x][y].walkable = value;
        }
        
        public get endNode():Node {
            return this._endNode;
        }
        
        public get numCols():number {
            return this._numCols;
        }
        
        public get numRows():number {
            return this._numRows;
        }
        
        public get startNode():Node {
            return this._startNode;
        }
    }
}