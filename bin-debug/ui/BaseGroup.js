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
    var BaseGroup = (function (_super) {
        __extends(BaseGroup, _super);
        function BaseGroup() {
            var _this = _super.call(this) || this;
            //是否已加入过显示列表中,可用来判断各组件是否已经具备显示赋值的作用
            _this._isAddedToStage = false;
            _this._top = NaN;
            _this._left = NaN;
            _this._bottom = NaN;
            _this._right = NaN;
            _this._horizontalCenter = NaN;
            _this._verticalCenter = NaN;
            //是否重新计算位置布局
            _this._hasInvalidatePosition = false;
            //延迟绘制
            _this._drawDelay = false;
            //是否下一帧重绘
            _this._hasInvalidate = false;
            _this._data = null; //可携带的数据
            _this._enabled = true; //不可用状态
            _this.elements = [];
            var s = _this;
            s._drawDelay = false;
            s.addEventListener(egret.Event.ADDED_TO_STAGE, s.onAddToStage, s);
            return _this;
            //console.log("this._drawDelay=" + this._drawDelay)
        }
        /**
         * 第一次加入场景的时候会调用该方法
         */
        BaseGroup.prototype.onAddToStage = function (event) {
            var s = this;
            s._isAddedToStage = true;
            s.removeEventListener(egret.Event.ADDED_TO_STAGE, s.onAddToStage, s);
            s.createChildren();
            s.initData();
            s.onInvalidatePosition();
            s.invalidate();
            //console.log("222222this._drawDelay=" + this._drawDelay)
        };
        /**
         * 加入到显示列表时调用
         * 子类覆写该方法,添加UI逻辑
         */
        BaseGroup.prototype.createChildren = function () {
            var s = this;
            s.touchEnabled = false; //默认不接受事件
            //this.setSize(Style.BASEGROUP_WIDTH, Style.BASEGROUP_HEIGHT);
        };
        /**
         * 初始化一些必要的逻辑数据
         * 加入到显示列表的时候会调用
         */
        BaseGroup.prototype.initData = function () {
        };
        Object.defineProperty(BaseGroup.prototype, "width", {
            get: function () {
                return this.$getWidth();
            },
            /**
             * 覆写width方法,在width改变的时候,做逻辑运算
             * @param w
             */
            set: function (w) {
                if (w >= 0) {
                    _super.prototype.$setWidth.call(this, w);
                    //if (this._anchorX != 0) this.anchorOffsetX = w * this._anchorX;
                    this.onInvalidatePosition();
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "height", {
            get: function () {
                return this.$getHeight();
            },
            /**
             * 覆写height方法,在height改变的时候,做逻辑运算
             * @param h
             */
            set: function (h) {
                if (h >= 0) {
                    _super.prototype.$setHeight.call(this, h);
                    //if (this._anchorY != 0) this.anchorOffsetY = h * this._anchorY;
                    this.onInvalidatePosition();
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the size of the component.
         * @param w The width of the component.
         * @param h The height of the component.
         */
        BaseGroup.prototype.setSize = function (w, h) {
            var s = this;
            if (s.width != w || s.height != h) {
                s.width = w;
                s.height = h;
                s.onInvalidatePosition();
                s.invalidate();
            }
        };
        Object.defineProperty(BaseGroup.prototype, "top", {
            ///////////////////////////////////
            // 组件相对布局设置
            ///////////////////////////////////
            get: function () {
                return this._top;
            },
            /**
             * 设置顶距
             */
            set: function (value) {
                var s = this;
                if (s._top != value) {
                    s._top = value;
                    s.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "left", {
            /**
             * 设置左距
             */
            get: function () {
                return this._left;
            },
            set: function (value) {
                var s = this;
                if (s._left != value) {
                    s._left = value;
                    s.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "bottom", {
            get: function () {
                return this._bottom;
            },
            /**
             * 设置底距
             */
            set: function (value) {
                var s = this;
                if (s._bottom != value) {
                    s._bottom = value;
                    s.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "right", {
            get: function () {
                return this._right;
            },
            /**
             * 设置右距
             */
            set: function (value) {
                var s = this;
                if (s._right != value) {
                    s._right = value;
                    s.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "horizontalCenter", {
            get: function () {
                return this._horizontalCenter;
            },
            /**
             * 设置水平居中相对位置
             */
            set: function (value) {
                var s = this;
                if (s._horizontalCenter != value) {
                    s._horizontalCenter = value;
                    s.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "verticalCenter", {
            get: function () {
                return this._verticalCenter;
            },
            /**
             * 设置竖直居中相对位置
             */
            set: function (value) {
                var s = this;
                if (s._verticalCenter != value) {
                    s._verticalCenter = value;
                    s.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置是否下一帧计算相对位置
         */
        BaseGroup.prototype.onInvalidatePosition = function () {
            //console.log("onInvalidatePosition 000 name=" + this.name);
            //if (this._drawDelay) return;
            var s = this;
            if (!s._hasInvalidatePosition) {
                //console.log("onInvalidatePosition 111 name=" + this.name);
                s._hasInvalidatePosition = true;
                s.addEventListener(egret.Event.ENTER_FRAME, s.resetPosition, s);
                var child = void 0;
                for (var i = 0; i < s.numChildren; i++) {
                    child = s.getChildAt(i);
                    if (child instanceof BaseGroup) {
                        child.onInvalidatePosition();
                    }
                }
            }
        };
        /**
         * 容器相对位置刷新
         */
        BaseGroup.prototype.resetPosition = function () {
            var s = this;
            //console.log("resetPosition name=" + s.name);
            var pr = s.parent;
            if (pr != null) {
                var parentWidth = pr.width;
                var parentHeight = pr.height;
                var thisWidth = s.width;
                var thisHeight = s.height;
                //为了保证得到的宽高是数值型,这里进行了严格的检测
                if (isNaN(parentWidth) || parentHeight == undefined) {
                    parentWidth = 0;
                }
                if (isNaN(parentHeight) || parentHeight == undefined) {
                    parentHeight = 0;
                }
                if (isNaN(thisWidth) || thisWidth == undefined) {
                    thisWidth = 0;
                }
                if (isNaN(thisHeight) || thisHeight == undefined) {
                    thisWidth = 0;
                }
                var widthChanged = false; //宽度有改变
                var heightChanged = false; //高度有改变
                if (!isNaN(s._top) && isNaN(s._bottom)) {
                    s.y = s._top;
                }
                else if (!isNaN(s._bottom) && isNaN(s._top)) {
                    s.y = parentHeight - s._bottom - thisHeight;
                }
                else if (!isNaN(s._top) && !isNaN(s._bottom)) {
                    s.y = s._top;
                    thisHeight = parentHeight - s._top - s._bottom;
                    if (s.height != thisHeight) {
                        s.height = thisHeight;
                        heightChanged = true;
                    }
                }
                if (!isNaN(s._left) && isNaN(s._right)) {
                    s.x = s._left;
                }
                else if (!isNaN(s._right) && isNaN(s.left)) {
                    s.x = parentWidth - s._right - thisWidth;
                }
                else if (!isNaN(s.left) && !isNaN(s._right)) {
                    s.x = s._left;
                    thisWidth = parentWidth - s._left - s._right;
                    if (s.width != thisWidth) {
                        s.width = thisWidth;
                        widthChanged = true;
                    }
                }
                if (!isNaN(s._horizontalCenter) && !widthChanged) {
                    s.x = (parentWidth - thisWidth) / 2 + s._horizontalCenter;
                    //console.log("this._horizontalEnabled=" + this._horizontalEnabled + ", x=" + this._x);
                }
                if (!isNaN(s._verticalCenter) && !heightChanged) {
                    s.y = (parentHeight - thisHeight) / 2 + s._verticalCenter;
                    //console.log("this._verticalEnabled=" + this._verticalEnabled + ", y=" + this._y);
                }
                //改变子级布局
                // if (widthChanged || heightChanged) {
                // 	let child: any;
                // 	for (var i: number = 0; i < s.numChildren; i++) {
                // 		child = s.getChildAt(i);
                // 		if ((widthChanged || heightChanged) && child instanceof BaseGroup) {
                // 			child.onInvalidatePosition();
                // 		}
                // 	}
                // }
                //添加具有约束布局的元素
                if (s.elements.length > 0) {
                    for (var i_1 = 0; i_1 < s.elements.length; ++i_1) {
                        this.addChild(s.elements[i_1]);
                    }
                    s.elements.length = 0;
                }
                var child = void 0;
                for (var i = 0; i < s.numChildren; i++) {
                    child = s.getChildAt(i);
                    if ((widthChanged || heightChanged) && child instanceof BaseGroup) {
                        child.onInvalidatePosition();
                    }
                    else {
                        if (egret.is(child, "eui.UIComponent")) {
                            BaseGroup.resetChildPosition(child);
                        }
                    }
                }
            }
            s.removeEventListener(egret.Event.ENTER_FRAME, s.resetPosition, s);
            s._hasInvalidatePosition = false;
        };
        BaseGroup.resetChildPosition = function (child) {
            var pr = child.parent;
            if (pr != null && child['top'] !== undefined && child['bottom'] !== undefined && child['left'] !== undefined && child['right'] !== undefined && child['horizontalCenter'] !== undefined && child['verticalCenter'] !== undefined) {
                var parentWidth = pr.width;
                var parentHeight = pr.height;
                var thisWidth = child.width;
                var thisHeight = child.height;
                //为了保证得到的宽高是数值型,这里进行了严格的检测
                if (isNaN(parentWidth) || parentHeight == undefined) {
                    parentWidth = 0;
                }
                if (isNaN(parentHeight) || parentHeight == undefined) {
                    parentHeight = 0;
                }
                if (isNaN(thisWidth) || thisWidth == undefined) {
                    thisWidth = 0;
                }
                if (isNaN(thisHeight) || thisHeight == undefined) {
                    thisWidth = 0;
                }
                var widthChanged = false; //宽度有改变
                var heightChanged = false; //高度有改变
                if (!isNaN(child['top']) && isNaN(child['bottom'])) {
                    child.y = child['top'];
                }
                else if (!isNaN(child['bottom']) && isNaN(child['top'])) {
                    child.y = parentHeight - child['bottom'] - thisHeight;
                }
                else if (!isNaN(child['top']) && !isNaN(child['bottom'])) {
                    child.y = child['top'];
                    thisHeight = parentHeight - child['top'] - child['bottom'];
                    if (child.height != thisHeight) {
                        child.height = thisHeight;
                        heightChanged = true;
                    }
                }
                if (!isNaN(child['left']) && isNaN(child['right'])) {
                    child.x = child['left'];
                }
                else if (!isNaN(child['right']) && isNaN(child['left'])) {
                    child.x = parentWidth - child['right'] - thisWidth;
                }
                else if (!isNaN(child['left']) && !isNaN(child['right'])) {
                    child.x = child['left'];
                    thisWidth = parentWidth - child['left'] - child['right'];
                    if (child.width != thisWidth) {
                        child.width = thisWidth;
                        widthChanged = true;
                    }
                }
                if (!isNaN(child['horizontalCenter']) && !widthChanged) {
                    child.x = (parentWidth - thisWidth) / 2 + child['horizontalCenter'];
                    //console.log("this._horizontalEnabled=" + this._horizontalEnabled + ", x=" + this._x);
                }
                if (!isNaN(child['verticalCenter']) && !heightChanged) {
                    child.y = (parentHeight - thisHeight) / 2 + child['verticalCenter'];
                    //console.log("this._verticalEnabled=" + this._verticalEnabled + ", y=" + this._y);
                }
                //改变子级布局
                if (widthChanged || heightChanged) {
                    if (child.numChildren == undefined)
                        return;
                    var temp = void 0;
                    for (var i = 0; i < child.numChildren; i++) {
                        temp = child.getChildAt(i);
                        if (temp instanceof BaseGroup) {
                            temp.onInvalidatePosition();
                        }
                        else {
                            BaseGroup.resetChildPosition(temp);
                        }
                    }
                }
            }
        };
        /**
         * 添加实现了eui.UIComponent类约束布局的元素,例如：eui.Image
         */
        BaseGroup.prototype.addElement = function (child) {
            var s = this;
            if (s.elements.indexOf(child) >= 0)
                return;
            if (egret.is(child, "eui.UIComponent")) {
                s.elements.push(child);
                s.onInvalidatePosition();
            }
            else {
                s.addChild(child);
            }
        };
        Object.defineProperty(BaseGroup.prototype, "data", {
            /**
             * 可设置的携带数据
             */
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 清理数据
         */
        BaseGroup.prototype.clean = function () {
        };
        Object.defineProperty(BaseGroup.prototype, "enabled", {
            /**
            * 设置enabled状态
            * @return
            */
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "cx", {
            /**
             * 中心x位置
             * @returns {number}
             */
            get: function () {
                return this.width / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "cy", {
            /**
             * 中心y位置
             * @returns {number}
             */
            get: function () {
                return this.height / 2;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 从场景中移除对象
         */
        BaseGroup.prototype.removeFromParent = function () {
            if (this.parent)
                this.parent.removeChild(this);
        };
        /**
         * 返回全局x,y值
         * @returns {egret.Point}
         */
        BaseGroup.prototype.getGlobalXY = function () {
            var point = new egret.Point(0, 0);
            this.localToGlobal(point.x, point.y, point);
            return point;
        };
        Object.defineProperty(BaseGroup.prototype, "actualWidth", {
            /**
             * 返回实际宽度
             * @returns {number}
             */
            get: function () {
                return this.width * this.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "actualHeight", {
            /**
             * 返回实际高度
             * @returns {number}
             */
            get: function () {
                return this.height * this.scaleX;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取注册点相对的偏移像素值
         * 官方很奇葩,修改了注册点后,子组件竟然不是以改注册点的值作为起始xy的0值
         * 这里计算出实际的偏移值,供大家使用
         */
        BaseGroup.prototype.getRegPoint = function () {
            var regPoint = new egret.Point(0, 0);
            if (this.anchorOffsetX != 0) {
                regPoint.x = this.anchorOffsetX;
            }
            if (this.anchorOffsetY != 0) {
                regPoint.y = this.anchorOffsetY;
            }
            return regPoint;
        };
        BaseGroup.prototype.invalidate = function () {
            //当前无效标识状态_hasInvalidate为flase(即还没有进行延时绘制)并且没有设置延迟绘制标识_drawDelay
            var s = this;
            if (!s._hasInvalidate && !s._drawDelay) {
                //console.log("add invalidate draw")
                s.addEventListener(egret.Event.ENTER_FRAME, s.onInvalidate, s);
                s._hasInvalidate = true;
            }
        };
        /**
         * 重绘通知
         */
        BaseGroup.prototype.onInvalidate = function (event) {
            var s = this;
            s.draw();
            s.removeEventListener(egret.Event.ENTER_FRAME, s.onInvalidate, s);
            s._hasInvalidate = false;
        };
        BaseGroup.prototype.draw = function () {
            //console.log("draw name=" + this.name);
        };
        Object.defineProperty(BaseGroup.prototype, "drawDelay", {
            get: function () {
                return this._drawDelay;
            },
            /**
             * 设置延迟draw
             * @param delay
             */
            set: function (delay) {
                //console.log("drawDelay=" + delay)
                var s = this;
                s._drawDelay = delay;
                if (s._drawDelay) {
                    s.removeEventListener(egret.Event.ENTER_FRAME, s.onInvalidate, s);
                    s._hasInvalidate = false;
                }
                else {
                    s.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "isAddedToStage", {
            /**
             * 判断曾经加入过显示列表中
             * 可以用来判断各属性是否已经准备好显示和使用
             * @returns {boolean}
             */
            get: function () {
                return this._isAddedToStage;
            },
            enumerable: true,
            configurable: true
        });
        return BaseGroup;
    }(egret.DisplayObjectContainer));
    codeBase.BaseGroup = BaseGroup;
    __reflect(BaseGroup.prototype, "codeBase.BaseGroup");
})(codeBase || (codeBase = {}));
