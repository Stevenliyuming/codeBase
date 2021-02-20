var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var codeBase;
(function (codeBase) {
    /**
     * 水平放置的容器
     */
    var HGroup = (function (_super) {
        __extends(HGroup, _super);
        function HGroup() {
            var _this = _super.call(this) || this;
            _this._gap = 0;
            _this._hAlign = egret.HorizontalAlign.LEFT;
            _this._vAlign = egret.VerticalAlign.MIDDLE;
            return _this;
        }
        /**
         * 初始化主场景的组件
         * 这个方法在对象new的时候就调用,因为有些ui必须在加入stage之前就准备好
         * 子类覆写该方法,添加UI逻辑
         */
        HGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.invalidate();
        };
        Object.defineProperty(HGroup.prototype, "gap", {
            /**
             * 设置或获取参与布局元素间水平像素间隔
             */
            get: function () {
                return this._gap;
            },
            set: function (value) {
                if (this._gap != value) {
                    this._gap = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HGroup.prototype, "hAlign", {
            /**
             * 水平方向布局方式
             */
            get: function () {
                return this._hAlign;
            },
            set: function (value) {
                if (this._hAlign != value) {
                    this._hAlign = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HGroup.prototype, "vAlign", {
            /**
             * 垂直方向布局方式
             */
            get: function () {
                return this._vAlign;
            },
            set: function (value) {
                if (this._vAlign != value) {
                    this._vAlign = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新显示组件的各项属性,重新绘制显示
         */
        HGroup.prototype.draw = function () {
            _super.prototype.draw.call(this);
            this.updateLayout();
            if (this._showBg) {
                this.addChildAt(this._bgImage, 0);
            }
        };
        //public resetPosition():void{
        //    super.resetPosition();
        //}
        /**
         * 更新容器水平布局
         */
        HGroup.prototype.updateLayout = function () {
            var i = 0;
            var child = null;
            var childLast = null;
            var wElements = 0;
            //console.log("@@@@@HGroup numChildren=" + this.numChildren);
            for (i = 0; i < this.numChildren; i++) {
                if (this.getChildAt(i) != this._bgImage) {
                    wElements += this.getChildAt(i).width;
                }
            }
            //console.log("@@@@@HGroup 000 wElements=" + wElements + ", gap=" + this._gap);
            wElements += (this.numChildren - 1) * this._gap;
            //console.log("@@@@@HGroup 1111 wElements=" + wElements + ", gap=" + this._gap);
            var firstChild = true;
            for (i = 0; i < this.numChildren; i++) {
                child = this.getChildAt(i);
                if (child == this._bgImage)
                    continue;
                if (firstChild) {
                    firstChild = false;
                    if (this._hAlign == egret.HorizontalAlign.LEFT) {
                        child.x = 0;
                    }
                    else if (this._hAlign == egret.HorizontalAlign.CENTER) {
                        child.x = (this.width - wElements) / 2;
                    }
                    else if (this._hAlign == egret.HorizontalAlign.RIGHT) {
                        child.x = this.width - wElements;
                    }
                }
                else {
                    childLast = this.getChildAt(i - 1);
                    child.x = childLast.x + childLast.width + this.gap;
                }
                if (this._vAlign == egret.VerticalAlign.TOP) {
                    child.y = 0;
                }
                else if (this._vAlign == egret.VerticalAlign.MIDDLE) {
                    child.y = (this.height - child.height) / 2;
                }
                else if (this._vAlign == egret.VerticalAlign.BOTTOM) {
                    child.y = this.height - child.height;
                }
                //console.log("@@@@@HGroup x=" + child.x + ", y=" + child.y);
            }
        };
        return HGroup;
    }(codeBase.Group));
    codeBase.HGroup = HGroup;
    __reflect(HGroup.prototype, "codeBase.HGroup");
})(codeBase || (codeBase = {}));
