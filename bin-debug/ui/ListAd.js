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
    var ListAd = (function (_super) {
        __extends(ListAd, _super);
        function ListAd(drawDelay) {
            if (drawDelay === void 0) { drawDelay = false; }
            var _this = _super.call(this, drawDelay) || this;
            /**
             * 消息和方法的映射关系表
             */
            _this.METHOD_DEF = {};
            _this._dataItems = [];
            _this._itemContainer = null;
            _this._itemRenderer = codeBase.DefaultRenderer;
            _this._itemIndexToRender = null;
            _this._speed = 150; //滚动动画时间
            _this._delay = 3000; //触发下次滚动的间隔
            _this._align = ListAd.ALIGN_BOTTOM; //对齐方式
            _this._gapFactor = 1;
            _this._direction = ListAd.SCROLL_LEFT; //滚动方向
            _this._firstGapWidth = 0; //层级间距
            _this._scaleFactor = 0.1; //层级差异系数
            _this._maxTextureWidth = 0;
            _this._maxTextureHeight = 0;
            _this._totalLength = 0;
            _this._middleIndex = 0; //当前展示的item标识
            _this._middleItemX = 0; //当前展示的itemX坐标
            _this._middleItemY = 0; //当前展示的itemY坐标
            _this._firstItemIndex = 0; //最前端的item的下标
            _this._gap = 2; //render对象折叠间隔
            _this._stop = false;
            _this._delayIndex1 = 0;
            _this._delayIndex2 = 0;
            _this._destroyIndex = 0;
            return _this;
        }
        ListAd.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.setSize(300, 300);
            this._itemContainer = new codeBase.Group();
            this.addChild(this._itemContainer);
            this._itemContainer.showBg = false;
            this._itemContainer.setSize(this.width, this.height);
            this.addHandleEvent(codeBase.EventType.RESOURCE_DOWNLOADED, "onMyEventResDownloaded");
        };
        /**
         * 添加事件的处理
         * 注意:必须调用MessageControler.addEvent()注册事件名称,否者不会转发到这里
         * 如果没有对应的的类型在此出现,则改Handle对Event事件到此为止,不再派发,防止造成事件死循环
         * @param type MyEvent事件的类型
         * @param func  对应的call back function,不包含onEvent前缀
         */
        ListAd.prototype.addHandleEvent = function (eventType, funcName) {
            //console.log("ReceiveGroup this=" + egret.getQualifiedClassName(this) + ", addHandleEvent=" + type + ", funcName=" + funcName);
            codeBase.MessageControler.addEvent(eventType);
            this.METHOD_DEF[eventType] = funcName;
        };
        /**
         * 收到界面弱事件通知
         * @param event
         */
        ListAd.prototype.receiveEvent = function (event) {
            var sp = null;
            for (var i = 0; i < this._itemContainer.numChildren; i++) {
                sp = this._itemContainer.getChildAt(i);
                if (sp["refresh"]) {
                    sp["refresh"]();
                }
            }
        };
        Object.defineProperty(ListAd.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                if (!value)
                    return;
                this._data = value;
                this._dataItems = null;
                this._itemIndexToRender = {};
                //清空显示
                var displayItemUI = null;
                while (this._itemContainer.numChildren > 0) {
                    displayItemUI = this._itemContainer.removeChildAt(0);
                    if (displayItemUI["data"])
                        displayItemUI["data"] = null;
                    codeBase.ObjectPool.recycleClass(displayItemUI, "listad_" + this.name);
                }
                //if(!this._scaleFactor)this._scaleFactor = 0.1;
                if (value instanceof Array) {
                    this._dataItems = value;
                    if (this._dataItems.length == 0)
                        return;
                    this._totalLength = this._dataItems.length;
                    if (this._totalLength % 2 == 0) {
                        this._middleIndex = this._totalLength / 2;
                    }
                    else if (this._totalLength % 2 == 1) {
                        this._middleIndex = (this._totalLength - 1) / 2;
                    }
                    this._firstItemIndex = 0;
                    var addNum = 0;
                    while (addNum < this._totalLength) {
                        this.addItem(addNum);
                        addNum++;
                    }
                    if (this._dataItems.length <= 3) {
                    }
                    else {
                        //this.refreshTree();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 展示的元素少于等于3个时启用
         */
        ListAd.prototype.reserveModel = function () {
        };
        /**
         * 初始化添加item
         * @param index
         */
        ListAd.prototype.addItem = function (index) {
            var item = codeBase.ObjectPool.getByClass(this._itemRenderer, "listad_" + this.name);
            //var item:Group = ObjectPool.getByClass(Group);
            item.setSize(200, 200);
            item.anchorX = 0.5;
            item.anchorY = 0.5;
            this._itemContainer.addChild(item);
            this._itemContainer.removeChild(item);
            if (item && item["validateNow"])
                item["validateNow"]();
            if (!this._firstGapWidth)
                this._firstGapWidth = item.width / 2;
            //var label:Label = new Label();
            //item.addChild(label);
            //label.color = 0xff00ff;
            //label.autoSize = false;
            //label.width = 150;
            //label.height = 150;
            //label.fontSize = 100;
            //label.horizontalEnabled = true;
            //label.verticalEnabled = true;
            //label.showBg = false;
            //label.text = "" + index;
            this._middleItemX = this._itemContainer.width / 2;
            this._middleItemY = this._itemContainer.height / 2;
            if (Math.abs(index - this._middleIndex) <= 1) {
                if (index - this._middleIndex == -1) {
                    this._itemContainer.addChild(item);
                    item.x = (index - this._middleIndex) * this._firstGapWidth + this._middleItemX;
                }
                else if (index == this._middleIndex) {
                    this._itemContainer.addChild(item);
                    item.x = this._middleItemX;
                }
                else if (index - this._middleIndex == 1) {
                    this._itemContainer.addChildAt(item, 1);
                    item.x = this._middleItemX + (index - this._middleIndex) * this._firstGapWidth;
                    item.bgColor = 0x000000;
                }
                item.scaleY = (1 - Math.abs(index - this._middleIndex) * this._scaleFactor);
                item.alpha = (1 - Math.abs(index - this._middleIndex) * this._scaleFactor);
                item.y = Math.abs(index - this._middleIndex) * this._scaleFactor * item.height * item.anchorY * this._gapFactor + this._middleItemY;
            }
            item.data = this._dataItems[index];
            this._itemIndexToRender["" + index] = item;
        };
        /**
         *开始滚动
         */
        ListAd.prototype.start = function () {
            if (this._delayIndex2)
                egret.clearTimeout(this._delayIndex2);
            var oldX = 0;
            var oldY = 0;
            var oldScaleY = 0;
            var oldAlpha = 0;
            var height = 0;
            var anchorY = 0;
            var moveIndex1 = 0;
            var moveIndex2 = 0;
            var moveIndex3 = 0;
            var moveArray = [];
            moveIndex1 = this._middleIndex - 1;
            if (moveIndex1 < 0)
                moveIndex1 = this._totalLength - 1;
            moveIndex2 = this._middleIndex;
            moveIndex3 = this._middleIndex + 1;
            if (moveIndex3 == this._totalLength)
                moveIndex3 = 0;
            moveArray = [moveIndex1, moveIndex2, moveIndex3];
            for (var i = 0; i < moveArray.length; i++) {
                oldX = this._itemIndexToRender["" + moveArray[i]].x;
                oldY = this._itemIndexToRender["" + moveArray[i]].y;
                oldScaleY = this._itemIndexToRender["" + moveArray[i]].scaleY;
                oldAlpha = this._itemIndexToRender["" + moveArray[i]].alpha;
                height = this._itemIndexToRender["" + moveArray[i]].height;
                anchorY = this._itemIndexToRender["" + moveArray[i]].anchorY;
                if (this._direction == "left") {
                    this._destroyIndex = moveIndex1;
                    if (i == 0) {
                        egret.Tween.get(this._itemIndexToRender["" + moveArray[i]]).to({
                            x: oldX + this._firstGapWidth,
                            y: oldY + this._scaleFactor * height * anchorY * this._gapFactor,
                            scaleY: oldScaleY - this._scaleFactor,
                            alpha: 0
                        }, this._speed);
                    }
                    else if (i == 1) {
                        egret.Tween.get(this._itemIndexToRender["" + moveArray[i]]).to({
                            x: oldX - this._firstGapWidth,
                            y: oldY + this._scaleFactor * height * anchorY * this._gapFactor,
                            scaleY: oldScaleY - this._scaleFactor,
                            alpha: oldAlpha - this._scaleFactor
                        }, this._speed);
                    }
                    else if (i == 2) {
                        egret.Tween.get(this._itemIndexToRender["" + moveArray[i]]).to({
                            x: oldX - this._firstGapWidth,
                            y: oldY - this._scaleFactor * height * anchorY * this._gapFactor,
                            scaleY: oldScaleY + this._scaleFactor,
                            alpha: oldAlpha + this._scaleFactor
                        }, this._speed);
                    }
                }
                else if (this._direction == "right") {
                    this._destroyIndex = moveIndex3;
                    if (i == 0) {
                        egret.Tween.get(this._itemIndexToRender["" + moveArray[i]]).to({
                            x: oldX + this._firstGapWidth,
                            y: oldY - this._scaleFactor * height * anchorY * this._gapFactor,
                            scaleY: oldScaleY + this._scaleFactor,
                            alpha: oldAlpha + this._scaleFactor
                        }, this._speed);
                    }
                    else if (i == 1) {
                        egret.Tween.get(this._itemIndexToRender["" + moveArray[i]]).to({
                            x: oldX + this._firstGapWidth,
                            y: oldY + this._scaleFactor * height * anchorY * this._gapFactor,
                            scaleY: oldScaleY - this._scaleFactor,
                            alpha: oldAlpha - this._scaleFactor
                        }, this._speed);
                    }
                    else if (i == 2) {
                        egret.Tween.get(this._itemIndexToRender["" + moveArray[i]]).to({
                            x: oldX - this._firstGapWidth,
                            y: oldY - this._scaleFactor * height * anchorY * this._gapFactor,
                            scaleY: oldScaleY + this._scaleFactor,
                            alpha: 0
                        }, this._speed);
                    }
                }
            }
            if (this._direction == "left") {
                this._middleIndex++;
                if (this._middleIndex == this._totalLength)
                    this._middleIndex = 0;
            }
            else if (this._direction == "right") {
                this._middleIndex--;
                if (this._middleIndex < 0)
                    this._middleIndex = this._totalLength - 1;
            }
            this.addNewItem(this._direction);
            this._delayIndex1 = egret.setTimeout(this.refreshTree, this, this._speed);
        };
        ListAd.prototype.stop = function () {
            for (var key in this._itemIndexToRender) {
                egret.Tween.removeTweens(this._itemIndexToRender[key]);
            }
            if (this._delayIndex1)
                egret.clearTimeout(this._delayIndex1);
            if (this._delayIndex2)
                egret.clearTimeout(this._delayIndex2);
        };
        /**
         * 添加一个新的元素
         * @param type
         * @param index
         */
        ListAd.prototype.addNewItem = function (type, index) {
            if (index === void 0) { index = this._middleIndex; }
            if (type == "left") {
                index++;
                if (index == this._totalLength)
                    index = 0;
            }
            else if (type == "right") {
                index--;
                if (index < 0)
                    index = this._totalLength - 1;
            }
            var item = this._itemIndexToRender["" + index];
            this._itemContainer.addChildAt(item, 1);
            item.alpha = 0;
            item.anchorX = 0.5;
            item.anchorY = 0.5;
            item.scaleY = 1;
            item.x = this._middleItemX;
            item.y = this._middleItemY;
            item.bgColor = 0x000000;
            item.data = item._data;
            if (type == "left") {
                egret.Tween.get(item).to({ x: item.x + this._firstGapWidth, y: item.y + this._scaleFactor * item.height * item.anchorY * this._gapFactor, scaleY: 1 - this._scaleFactor, alpha: 1 - this._scaleFactor }, this._speed);
            }
            else if (type == "right") {
                egret.Tween.get(item).to({ x: item.x - this._firstGapWidth, y: item.y + this._scaleFactor * item.height * item.anchorY * this._gapFactor, scaleY: 1 - this._scaleFactor, alpha: 1 - this._scaleFactor }, this._speed);
            }
        };
        /**
         *  滚动一次结束 调整item层次
         */
        ListAd.prototype.refreshTree = function () {
            for (var key in this._itemIndexToRender) {
                egret.Tween.removeTweens(this._itemIndexToRender[key]);
            }
            if (this._delayIndex1)
                egret.clearTimeout(this._delayIndex1);
            this._itemIndexToRender["" + this._destroyIndex].removeFromParent();
            this._itemContainer.addChildAt(this._itemIndexToRender["" + this._middleIndex], this._totalLength);
            this._delayIndex2 = egret.setTimeout(this.start, this, this._delay);
        };
        Object.defineProperty(ListAd.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (value) {
                if (!value)
                    return;
                this._direction = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListAd.prototype, "align", {
            get: function () {
                return this._align;
            },
            set: function (value) {
                if (value == "bottom") {
                    this._align = value;
                    this._gapFactor = 1;
                }
                else if (value == "center") {
                    this._align = value;
                    this._gapFactor = 0.2;
                }
                else {
                    return;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListAd.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (value) {
                if (!value || value <= 0)
                    return;
                this._speed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListAd.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            set: function (value) {
                if (!value || value <= 0)
                    return;
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListAd.prototype, "itemRenderer", {
            get: function () {
                return this._itemRenderer;
            },
            /**
             * 设置itemRenderer
             * @param value
             */
            set: function (value) {
                if (this._itemRenderer != value) {
                    this._itemRenderer = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListAd.prototype, "gap", {
            get: function () {
                return this._gap;
            },
            /**
             * 设置item render的间距
             */
            set: function (value) {
                this._gap = value;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListAd.prototype, "scaleFactor", {
            get: function () {
                return this._scaleFactor;
            },
            set: function (value) {
                this._scaleFactor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ListAd.prototype, "firstGapWidth", {
            get: function () {
                return this._firstGapWidth;
            },
            set: function (value) {
                if (value)
                    this._firstGapWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        ListAd.ALIGN_BOTTOM = "bottom"; //底部对齐
        ListAd.ALIGN_CENTER = "center"; //中间对齐
        ListAd.SCROLL_UP = "up";
        ListAd.SCROLL_DOWN = "down";
        ListAd.SCROLL_LEFT = "left";
        ListAd.SCROLL_RIGHT = "right";
        return ListAd;
    }(codeBase.Group));
    codeBase.ListAd = ListAd;
    __reflect(ListAd.prototype, "codeBase.ListAd");
})(codeBase || (codeBase = {}));
