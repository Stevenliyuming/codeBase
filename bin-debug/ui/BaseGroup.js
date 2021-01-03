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
        function BaseGroup(drawDelay) {
            if (drawDelay === void 0) { drawDelay = false; }
            var _this = _super.call(this) || this;
            //是否已加入过显示列表中,可用来判断各组件是否已经具备显示赋值的作用
            _this._isAddedToStage = false;
            _this._top = NaN;
            _this._left = NaN;
            _this._bottom = NaN;
            _this._right = NaN;
            _this._horizontalCenter = NaN;
            _this._verticalCenter = NaN;
            //相对父级的注册点
            _this._registryOffsetX = 0;
            _this._registryOffsetY = 0;
            //xy自身原点偏移比例
            _this._anchorX = 0;
            _this._anchorY = 0;
            //是否重新计算位置布局
            _this._hasInvalidatePosition = false;
            //延迟绘制
            _this._drawDelay = false;
            //是否下一帧重绘
            _this._hasInvalidate = false;
            _this._data = null; //可携带的数据
            _this._enabled = true; //不可用状态
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onFirstAddToStage, _this);
            _this._drawDelay = drawDelay;
            return _this;
            //console.log("this._drawDelay=" + this._drawDelay)
        }
        /**
         * 第一次加入场景的时候会运行该方法
         */
        BaseGroup.prototype.onFirstAddToStage = function (event) {
            this._isAddedToStage = true;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onFirstAddToStage, this);
            this.createChildren();
            this.initData();
            //console.log("222222this._drawDelay=" + this._drawDelay)
        };
        /**
         * 初始化一些必要的逻辑数据
         * 这个方法是在第一次加入stage的时候,做调用
         */
        BaseGroup.prototype.initData = function () {
        };
        /**
         * 初始化主场景的组件
         * 子类覆写该方法,添加UI逻辑
         */
        BaseGroup.prototype.createChildren = function () {
            this.touchEnabled = false; //默认不接受事件
            if (this.width == 0)
                this.width = codeBase.Style.BASEGROUP_WIDTH;
            if (this.height == 0)
                this.height = codeBase.Style.BASEGROUP_HEIGHT;
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
                    if (this._anchorX != 0)
                        this.anchorOffsetX = w * this._anchorX;
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
                    if (this._anchorY != 0)
                        this.anchorOffsetY = h * this._anchorY;
                    this.onInvalidatePosition();
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Moves the component to the specified position.
         * @param xpos the x position to move the component
         * @param ypos the y position to move the component
         */
        BaseGroup.prototype.move = function (xpos, ypos) {
            this.x = xpos;
            this.y = ypos;
        };
        /**
         * Sets the size of the component.
         * @param w The width of the component.
         * @param h The height of the component.
         */
        BaseGroup.prototype.setSize = function (w, h) {
            if (this.width != w || this.height != h) {
                this.width = w;
                this.height = h;
                this.onInvalidatePosition();
                this.invalidate();
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
                if (this._top != value) {
                    this._top = value;
                    this.onInvalidatePosition();
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
                if (this._left != value) {
                    this._left = value;
                    this.onInvalidatePosition();
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
                if (this._bottom != value) {
                    this._bottom = value;
                    this.onInvalidatePosition();
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
                if (this._right != value) {
                    this._right = value;
                    this.onInvalidatePosition();
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
                if (this._horizontalCenter != value) {
                    this._horizontalCenter = value;
                    this.onInvalidatePosition();
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
                if (this._verticalCenter != value) {
                    this._verticalCenter = value;
                    this.onInvalidatePosition();
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
                if (s._registryOffsetX != 0 || s._registryOffsetY != 0) {
                    s.x = s._registryOffsetX;
                    s.y = s._registryOffsetY;
                }
                if (s._anchorX != 0 || s._anchorY != 0) {
                    s.anchorOffsetX = s._anchorX * s.width;
                    s.anchorOffsetY = s._anchorY * s.height;
                }
                //改变子级布局
                if (widthChanged || heightChanged) {
                    var child = void 0;
                    for (var i = 0; i < s.numChildren; i++) {
                        child = s.getChildAt(i);
                        if (child instanceof BaseGroup)
                            child.onInvalidatePosition();
                    }
                }
            }
            s.removeEventListener(egret.Event.ENTER_FRAME, s.resetPosition, s);
            s._hasInvalidatePosition = false;
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
            if (!this._hasInvalidate && !this._drawDelay) {
                //console.log("add invalidate draw")
                this.addEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
                this._hasInvalidate = true;
            }
        };
        /**
         * 重绘通知
         */
        BaseGroup.prototype.onInvalidate = function (event) {
            this.draw();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
            this._hasInvalidate = false;
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
                this._drawDelay = delay;
                if (this._drawDelay) {
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
                    this._hasInvalidate = false;
                }
                else {
                    this.invalidate();
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
        Object.defineProperty(BaseGroup.prototype, "anchorX", {
            get: function () {
                return this._anchorX;
            },
            /**
             * 设置x原点偏移比例
             * @param value
             */
            set: function (value) {
                if (this._anchorX != value) {
                    this._anchorX = value;
                    this.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "anchorY", {
            get: function () {
                return this._anchorY;
            },
            /**
             * 设置y原点偏移比例
             * @param value
             */
            set: function (value) {
                if (this._anchorY != value) {
                    this._anchorY = value;
                    this.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "registryOffsetX", {
            get: function () {
                return this._registryOffsetX;
            },
            /**
             * 设置注册点x偏移值
             * @param value
             */
            set: function (value) {
                if (this._registryOffsetX != value) {
                    this._registryOffsetX = value;
                    this.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGroup.prototype, "registryOffsetY", {
            get: function () {
                return this._registryOffsetY;
            },
            /**
             * 设置注册点y偏移值
             * @param value
             */
            set: function (value) {
                if (this._registryOffsetY != value) {
                    this._registryOffsetY = value;
                    this.onInvalidatePosition();
                }
            },
            enumerable: true,
            configurable: true
        });
        return BaseGroup;
    }(egret.DisplayObjectContainer));
    codeBase.BaseGroup = BaseGroup;
    __reflect(BaseGroup.prototype, "codeBase.BaseGroup");
})(codeBase || (codeBase = {}));
