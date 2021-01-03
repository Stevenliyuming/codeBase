module codeBase{
    /**
     * 最小二叉堆
     */
    export class BinaryHeap {
        public a: Array<Object> = new Array<Object>();
        public justMinFun: Function = function (x: any, y: any): boolean {
            return this.x < this.y;
        };
        public static judgeFun: Function;

        public constructor(justMinFun: Function = null) {
            this.a.push(-1);
            if (justMinFun != null)
                this.justMinFun = justMinFun;
        }

        public ins(value: any): void {
            var p: number = this.a.length;
            this.a[p] = value;
            var pp: number = p >> 1;
            while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
                var temp: any = this.a[p];
                this.a[p] = this.a[pp];
                this.a[pp] = temp;
                p = pp;
                pp = p >> 1;
            }
        }

        public pop(): any {
            var min: any = this.a[1];
            this.a[1] = this.a[this.a.length - 1];
            this.a.pop();
            var p: number = 1;
            var l: number = this.a.length;
            var sp1: number = p << 1;
            var sp2: number = sp1 + 1;
            while (sp1 < l) {
                if (sp2 < l) {
                    var minp: number = this.justMinFun(this.a[sp2], this.a[sp1]) ? sp2 : sp1;
                } else {
                    minp = sp1;
                }
                if (this.justMinFun(this.a[minp], this.a[p])) {
                    var temp: any = this.a[p];
                    this.a[p] = this.a[minp];
                    this.a[minp] = temp;
                    p = minp;
                    sp1 = p << 1;
                    sp2 = sp1 + 1;
                } else {
                    break;
                }
            }
            return min;
        }

        /**
         * 设置堆排序函数
         */
        public static setJudgeFunction(fun:Function) {
            if (fun != null) {
                BinaryHeap.judgeFun = fun;
            }
        }

        /**
        * 上浮调整
        * @param array     待调整的堆
        */
        public static upAdjust(array: any[] = []) {
            let childIndex = array.length - 1;
            let parentIndex = Math.floor((childIndex - 1) / 2);
            // temp保存插入的叶子节点值，用于最后的赋值
            let temp = array[childIndex];
            // while (childIndex > 0 && temp < array[parentIndex]) 
            while (childIndex > 0 && BinaryHeap.judgeFun(temp, array[parentIndex])) 
            {
                //无需真正交换，单向赋值即可
                array[childIndex] = array[parentIndex];
                childIndex = parentIndex;
                parentIndex = Math.floor((childIndex - 1) / 2);
            }
            array[childIndex] = temp;
        }

        /**
        * 下沉调整
        * @param array     待调整的堆
        * @param parentIndex    要下沉的父节点
        * @param parentIndex    堆的有效大小
        */
        public static downAdjust(array: any[], parentIndex:number, length:number) {
            // temp保存父节点值，用于最后的赋值
            let temp = array[parentIndex];
            let childIndex = 2 * parentIndex + 1;
            while (childIndex < length) {
                // 如果有右孩子，且右孩子小于左孩子的值，则定位到右孩子
                // if (childIndex + 1 < length && array[childIndex + 1] < array[childIndex])
                if (childIndex + 1 < length && BinaryHeap.judgeFun(array[childIndex + 1], array[childIndex]))
                {
                    childIndex++;
                }

                // 如果父节点小于任何一个孩子的值，直接跳出
                // if (temp <= array[childIndex])
                if (BinaryHeap.judgeFun(temp, array[childIndex]))
                    break;

                //无需真正交换，单向赋值即可
                array[parentIndex] = array[childIndex];
                parentIndex = childIndex;
                childIndex = 2 * childIndex + 1;
            }
            array[parentIndex] = temp;
        }

        /**
        * 构建堆
        * @param array     待调整的堆
        */
        public static buildHeap(array: any[] = []) {
            // 从最后一个非叶子节点开始，依次下沉调整
            let s = this;
            for (let i = Math.floor(array.length / 2); i >= 0; i--) {
                s.downAdjust(array, i, array.length - 1);
            }
        }    
    }
}