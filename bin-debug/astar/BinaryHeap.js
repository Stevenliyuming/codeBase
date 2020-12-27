var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
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
        return BinaryHeap;
    }());
    codeBase.BinaryHeap = BinaryHeap;
    __reflect(BinaryHeap.prototype, "codeBase.BinaryHeap");
})(codeBase || (codeBase = {}));
