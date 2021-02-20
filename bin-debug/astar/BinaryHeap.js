var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 最小二叉堆
     */
    var BinaryHeap = (function () {
        function BinaryHeap(justMinFun) {
            if (justMinFun === void 0) { justMinFun = null; }
            this.a = new Array();
            this.justMinFun = function (x, y) {
                return this.x < this.y;
            };
            this.a.push(-1);
            if (justMinFun != null)
                this.justMinFun = justMinFun;
        }
        BinaryHeap.prototype.ins = function (value) {
            var p = this.a.length;
            this.a[p] = value;
            var pp = p >> 1;
            while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
                var temp = this.a[p];
                this.a[p] = this.a[pp];
                this.a[pp] = temp;
                p = pp;
                pp = p >> 1;
            }
        };
        BinaryHeap.prototype.pop = function () {
            var min = this.a[1];
            this.a[1] = this.a[this.a.length - 1];
            this.a.pop();
            var p = 1;
            var l = this.a.length;
            var sp1 = p << 1;
            var sp2 = sp1 + 1;
            while (sp1 < l) {
                if (sp2 < l) {
                    var minp = this.justMinFun(this.a[sp2], this.a[sp1]) ? sp2 : sp1;
                }
                else {
                    minp = sp1;
                }
                if (this.justMinFun(this.a[minp], this.a[p])) {
                    var temp = this.a[p];
                    this.a[p] = this.a[minp];
                    this.a[minp] = temp;
                    p = minp;
                    sp1 = p << 1;
                    sp2 = sp1 + 1;
                }
                else {
                    break;
                }
            }
            return min;
        };
        /**
         * 设置堆排序函数
         */
        BinaryHeap.setJudgeFunction = function (fun) {
            if (fun != null) {
                BinaryHeap.judgeFun = fun;
            }
        };
        /**
        * 上浮调整
        * @param array     待调整的堆
        */
        BinaryHeap.upAdjust = function (array) {
            if (array === void 0) { array = []; }
            var childIndex = array.length - 1;
            var parentIndex = Math.floor((childIndex - 1) / 2);
            // temp保存插入的叶子节点值，用于最后的赋值
            var temp = array[childIndex];
            // while (childIndex > 0 && temp < array[parentIndex]) 
            while (childIndex > 0 && BinaryHeap.judgeFun(temp, array[parentIndex])) {
                //无需真正交换，单向赋值即可
                array[childIndex] = array[parentIndex];
                childIndex = parentIndex;
                parentIndex = Math.floor((childIndex - 1) / 2);
            }
            array[childIndex] = temp;
        };
        /**
        * 下沉调整
        * @param array     待调整的堆
        * @param parentIndex    要下沉的父节点
        * @param parentIndex    堆的有效大小
        */
        BinaryHeap.downAdjust = function (array, parentIndex, length) {
            // temp保存父节点值，用于最后的赋值
            var temp = array[parentIndex];
            var childIndex = 2 * parentIndex + 1;
            while (childIndex < length) {
                // 如果有右孩子，且右孩子小于左孩子的值，则定位到右孩子
                // if (childIndex + 1 < length && array[childIndex + 1] < array[childIndex])
                if (childIndex + 1 < length && BinaryHeap.judgeFun(array[childIndex + 1], array[childIndex])) {
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
        };
        /**
        * 构建堆
        * @param array     待调整的堆
        */
        BinaryHeap.buildHeap = function (array) {
            if (array === void 0) { array = []; }
            // 从最后一个非叶子节点开始，依次下沉调整
            var s = this;
            for (var i = Math.floor(array.length / 2); i >= 0; i--) {
                s.downAdjust(array, i, array.length - 1);
            }
        };
        return BinaryHeap;
    }());
    codeBase.BinaryHeap = BinaryHeap;
    __reflect(BinaryHeap.prototype, "codeBase.BinaryHeap");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=BinaryHeap.js.map