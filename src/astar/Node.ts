module codeBase{

	export class Node {
        public row:number = 0;//行
        public column:number = 0;//列
        public f:number = 0;//g+h
        public g:number = 0;//代表(从指定节点到相邻)节点本身的代价
        public h:number = 0;//代表从指定节点到目标节点（根据不同的估价公式--后面会解释估价公式）估算出来的代价。
        public walkable:boolean = true;
        public alpha:number = 1;
        public data:number = 0;
        public parent:Node = null;
        public version:number = 1;
        public links:Array<Link>;
        public point:egret.Point = null;
        
        public constructor(row:number, column:number, value:number = 0){
            this.row = row;
            this.column = column;
            this.data = value;
            if (this.data == 0) {
                this.walkable = false;
            } else {
                this.walkable = true;
            }
            this.point = new egret.Point();
        }
    }
}