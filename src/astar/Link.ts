module codeBase{
    export class Link {
        public node: Node = null;
        public cost: number = 0;

        public constructor(node: Node, cost: number) {
            this.node = node;
            this.cost = cost;
        }
    }
}