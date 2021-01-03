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
    var List = (function (_super) {
        __extends(List, _super);
        function List(drawDelay) {
            if (drawDelay === void 0) { drawDelay = false; }
            var _this = _super.call(this, drawDelay) || this;
            /**
             * 消息和方法的映射关系表
             */
            _this.METHOD_DEF = {};
            _this._itemRenderer = codeBase.DefaultRenderer;
            _this._itemContainer = null;
            _this._gap = 2;
            _this._direction = codeBase.Style.VERTICAL; //朝向
            _this._dataIndexBegin = 0; //显示数据起始索引
            _this._dataIndexEnd = 0; //显示数据结束索引
            _this._itemDatas = null;
            _this._dataIndexToRender = null;
            _this._autoSize = false;
            _this._marginTop = 4;
            _this._marginBottom = 4;
            _this._marginLeft = 4;
            _this._marginRight = 4;
            _this._line = 1; //设置排数
            _this._lineGap = 0; //设置排间距
            _this._effect = null; //效果选择
            _this._isDragBegin = false; //点击开始
            _this._isMoveBegin = false; //滑动开始
            _this._moveCount = 0; //移动的通知次数
            _this._dragBeginPoint = null;
            _this._dragLastTime = 0;
            _this.bounceBack = false; //列表项回弹
            _this._autoScrollGap = 0; //自动滚动的间距
            _this._lastTimeNum = 0; //
            _this._selected = null; //选择的对象
            _this._fixed = false; //在元素不够的时候,禁止继续滚动
            _this._data_end_func_call = null; //数据已经结束的call
            _this._data_end_func_this = null; //数据已经结束的func的this
            return _this;
        }
        List.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.setSize(100, 300);
            this.touchEnabled = true;
            this._itemContainer = new codeBase.BaseGroup();
            this.addChild(this._itemContainer);
            this._itemContainer.touchEnabled = true;
            this._itemContainer.setSize(this.width, this.height);
            this._itemContainer.scrollRect = new egret.Rectangle(0, 0, this.width, this.height);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginEvent, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoveEvent, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndEvent, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutsideEvent, this);
            this._dragBeginPoint = new egret.Point();
            this.addHandleEvent(codeBase.EventType.RESOURCE_DOWNLOADED, "onMyEventResDownloaded");
            this.touchNonePixel = true;
        };
        /**
         * 添加事件的处理
         * 注意:必须调用MessageControler.addEvent()注册事件名称,否者不会转发到这里
         * 如果没有对应的的类型在此出现,则改Handle对Event事件到此为止,不再派发,防止造成事件死循环
         * @param type MyEvent事件的类型
         * @param func  对应的call back function,不包含onEvent前缀
         */
        List.prototype.addHandleEvent = function (eventType, funcName) {
            //console.log("ReceiveGroup this=" + egret.getQualifiedClassName(this) + ", addHandleEvent=" + type + ", funcName=" + funcName);
            codeBase.MessageControler.addEvent(eventType);
            this.METHOD_DEF[eventType] = funcName;
        };
        /**
         * 收到界面弱事件通知
         * @param event
         */
        List.prototype.receiveEvent = function (event) {
            var sp = null;
            for (var i = 0; i < this._itemContainer.numChildren; i++) {
                sp = this._itemContainer.getChildAt(i);
                if (sp["refresh"]) {
                    sp["refresh"]();
                }
            }
        };
        /**
         * 点击开始
         * @param event
         */
        List.prototype.onTouchBeginEvent = function (event) {
            if (!this._itemDatas || this._itemDatas.length == 0)
                return;
            this._isDragBegin = true;
            this._isMoveBegin = false;
            this._lastTimeNum = 0;
            this._moveCount = 0;
            this._dragBeginPoint.x = event.stageX;
            this._dragBeginPoint.y = event.stageY;
            this._dragLastTime = egret.getTimer();
            codeBase.HeartBeat.removeListener(this, this.onAutoScroll);
            //console.log("this._isDragBegin=" + this._isDragBegin + ", x=" + this._dragBeginPoint.x + ", y=" + this._dragBeginPoint.y)
        };
        /**
         * 点击移动
         * @param event
         */
        List.prototype.onTouchMoveEvent = function (event) {
            //if (!this._isDragBegin || !this._itemDatas || this._itemDatas.length == 0) return;
            if (!this._itemDatas || this._itemDatas.length == 0 || this.bounceBack)
                return;
            //console.log("onTouchMoveEvent x=" + event.stageX + ", y=" + event.stageY)
            if (this._isDragBegin) {
                this._isMoveBegin = true;
                this._moveCount++;
                this.moveItemUIPosition(event.stageX - this._dragBeginPoint.x, event.stageY - this._dragBeginPoint.y);
            }
            if (this._direction == codeBase.Style.VERTICAL) {
                this._autoScrollGap = event.stageY - this._dragBeginPoint.y;
                if (event.stageY <= this.getGlobalXY().y || event.stageY >= this.getGlobalXY().y + this.height) {
                    this.onTouchEndEvent(event);
                    return;
                }
            }
            else {
                this._autoScrollGap = event.stageX - this._dragBeginPoint.x;
                if (event.stageX <= this.getGlobalXY().x || event.stageX >= this.getGlobalXY().x + this.width) {
                    this.onTouchEndEvent(event);
                    return;
                }
            }
            this._lastTimeNum = egret.getTimer() - this._dragLastTime;
            this._dragBeginPoint.x = event.stageX;
            this._dragBeginPoint.y = event.stageY;
            this._dragLastTime = egret.getTimer();
        };
        List.prototype.onTouchReleaseOutsideEvent = function (event) {
            //this._isDragBegin = false;
            //this._isMoveBegin = false;
            //if (!this._fixed)this.checkUIFreeback();
            this.onTouchEndEvent(event);
            console.log("onTouchReleaseOutsideEvent");
        };
        /**
         * 点击结束
         * @param event
         */
        List.prototype.onTouchEndEvent = function (event) {
            console.log("onTouchEndEvent this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd);
            //单击处理
            if (this._isDragBegin && (!this._isMoveBegin || (this._moveCount < 4 && Math.abs(event.stageX - this._dragBeginPoint.x) < 5 && Math.abs(event.stageY - this._dragBeginPoint.y) < 5))) {
                //console.log("onTouchEndEvent tap!!");
                var sp = null;
                var spPoint = this._itemContainer.globalToLocal(event.stageX, event.stageY);
                for (var i = 0; i < this._itemContainer.numChildren; i++) {
                    sp = this._itemContainer.getChildAt(i);
                    //spPoint = sp.localToGlobal(0, 0);
                    //if (spPoint.x < event.stageX && spPoint.y < event.stageY && (spPoint.x + sp.width) > event.stageX && (spPoint.y + sp.height) > event.stageY) 
                    //if(sp.hitTestPoint(event.stageX, event.stageY))
                    if (sp.x < spPoint.x && sp.y < spPoint.y && (sp.x + sp.width) > spPoint.x && (sp.y + sp.height) > spPoint.y) {
                        try {
                            this.selected = sp["_data"];
                            console.log(sp["dataIndex"]);
                            //console.log("list.selected=" + JSON.stringify(sp["_data"]));
                            break;
                        }
                        catch (e) {
                        }
                    }
                }
                this._isDragBegin = false;
                this._isMoveBegin = false;
                return;
            }
            this._isDragBegin = false;
            this._isMoveBegin = false;
            //console.log("000timer=" + this._lastTimeNum + ", gap.value=" + this._autoScrollGap);
            //Debug.log = "timer=" + this._lastTimeNum;
            if (this._lastTimeNum < 40 && ((this._dataIndexBegin > 0 && this._autoScrollGap > 0) || (this._itemDatas && this._dataIndexEnd < this._itemDatas.length - 1 && this._autoScrollGap < 0))) {
                //console.log("111timer=" + timer);
                //时间越短,倍数越大
                //Debug.log = "_autoScrollGap=" + this._autoScrollGap + ", caculte=" + (this._autoScrollGap / this._lastTimeNum);
                this._autoScrollGap = (this._autoScrollGap / this._lastTimeNum) * 10;
                //启用加速滑动的方式
                codeBase.HeartBeat.addListener(this, this.onAutoScroll);
                return;
            }
            this.checkUIFreeback();
        };
        List.prototype.onAutoScroll = function () {
            if (this._direction == codeBase.Style.VERTICAL) {
                this.moveItemUIPosition(0, this._autoScrollGap);
            }
            else {
                this.moveItemUIPosition(this._autoScrollGap, 0);
            }
            this._autoScrollGap -= this._autoScrollGap / 20;
            if (Math.abs(this._autoScrollGap) < 0.5 || this._dataIndexBegin == 0 || this._dataIndexEnd >= this._itemDatas.length - 1) {
                codeBase.HeartBeat.removeListener(this, this.onAutoScroll);
                this.checkUIFreeback();
            }
        };
        /**
         * 检测是否需要回弹
         */
        List.prototype.checkUIFreeback = function () {
            var _this = this;
            //console.log("checkUIFreeback 000 this._dataIndexEnd=" + this._dataIndexEnd);
            if (this._itemContainer.numChildren > 0 && this._itemDatas && this._itemDatas.length > 0 && (this._dataIndexBegin == 0 || this._dataIndexEnd >= this._itemDatas.length - 1)) {
                //console.log("checkUIFreeback 111")
                var pos = 0;
                if (this._dataIndexBegin == 0) {
                    //console.log("list.freeback.11111");
                    if (this._direction == codeBase.Style.VERTICAL) {
                        pos = this._itemContainer.getChildAt(0).y;
                    }
                    else {
                        pos = this._itemContainer.getChildAt(0).x;
                    }
                    if (pos < 0) {
                        //计算最后的边界
                        //console.log("list.freeback.2222");
                        if (this._direction == codeBase.Style.VERTICAL) {
                            pos = this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).y + this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).height - this._itemContainer.height;
                            if (pos + this._itemContainer.height > 0) {
                                pos = this._itemContainer.getChildAt(0).y;
                            }
                        }
                        else {
                            pos = this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).x + this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).width - this._itemContainer.width;
                        }
                        if (pos > 0) {
                            pos = 0;
                        }
                        //console.log("list.freeback.333=" + pos);
                    }
                }
                else if (this._dataIndexEnd >= this._itemDatas.length - 1) {
                    //console.log("list.freeback.4444");
                    if (this._direction == codeBase.Style.VERTICAL) {
                        pos = this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).y + this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).height - this._itemContainer.height;
                    }
                    else {
                        pos = this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).x + this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).width - this._itemContainer.width;
                    }
                    //console.log("list.freeback.5555=" + pos);
                }
                if (pos != 0) {
                    //设置列表回弹状态
                    this.bounceBack = true;
                    //console.log("list.freeback.66666=" + pos);
                    for (var i = 0; i < this._itemContainer.numChildren; i++) {
                        if (this._direction == codeBase.Style.VERTICAL) {
                            egret.Tween.get(this._itemContainer.getChildAt(i)).to({ y: this._itemContainer.getChildAt(i).y - pos }, 100);
                        }
                        else {
                            egret.Tween.get(this._itemContainer.getChildAt(i)).to({ x: this._itemContainer.getChildAt(i).x - pos }, 100);
                        }
                    }
                    //取消列表回弹状态
                    egret.setTimeout(function () {
                        _this.bounceBack = false;
                    }, this, 110);
                }
            }
        };
        /**
         * 移出render显示
         * @param render
         */
        List.prototype.removeRender = function (render) {
            if (!render)
                return;
            for (var key in this._dataIndexToRender) {
                if (this._dataIndexToRender[key] === render) {
                    delete this._dataIndexToRender[key];
                    break;
                }
            }
            try {
                //render["destroy"]();
                render["data"] = null;
                render["list"] = null;
            }
            catch (e) {
            }
            if (render && render.parent)
                render.parent.removeChild(render);
            codeBase.ObjectPool.recycleClass(render, "list_" + this.name);
        };
        /**
         * 对整体render进行位移,并补足空出的位置
         * @param xv
         * @param yv
         */
        List.prototype.moveItemUIPosition = function (xv, yv) {
            //console.log("moveItemUIPosition this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd + ", x=" + xv + ", y=" + yv)
            var itemRederer = null;
            var optNum = 0;
            for (var i = this._itemContainer.numChildren - 1; i >= 0; i--) {
                itemRederer = this._itemContainer.getChildAt(i);
                if (this._direction == codeBase.Style.VERTICAL) {
                    if (!this._fixed)
                        itemRederer.y += yv;
                    if (this._dataIndexBegin == 0 && yv >= 0 || this._dataIndexEnd == this._itemDatas.length - 1 && yv < 0) {
                        continue;
                    }
                    //if (this._fixed) itemRederer.y += yv;
                    //补充一个
                    console.log("this._dataIndexEnd=" + this._dataIndexEnd + ":this._itemDatas.length - 1=" + (this._itemDatas.length - 1));
                    if (yv < 0 && this._dataIndexEnd <= this._itemDatas.length - 1) {
                        if (this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).y + this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).height + this._gap < this._itemContainer.height) {
                            optNum = this.addUIItem(this._dataIndexEnd + 1, false);
                            this._dataIndexEnd += optNum;
                            console.log("moveItemUIPosition 00000 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd);
                        }
                        if ((itemRederer.y + itemRederer.height) < 0) {
                            this.removeRender(itemRederer);
                            console.log("remove 000 index.value=" + this._dataIndexBegin);
                            this._dataIndexBegin++;
                            console.log("moveItemUIPosition 11111 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd);
                        }
                    }
                    else if (this._dataIndexBegin > 0) {
                        if (this._itemContainer.getChildAt(0).y - this._gap > 0) {
                            optNum = this.addUIItem(this._dataIndexBegin - this._line, true);
                            this._dataIndexBegin -= optNum;
                            //console.log("moveItemUIPosition 22222 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd)
                        }
                        if (itemRederer.y > this._itemContainer.height) {
                            this.removeRender(itemRederer);
                            //console.log("remove 111 index.value=" + this._dataIndexEnd);
                            this._dataIndexEnd--;
                            //console.log("moveItemUIPosition 33333 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd)
                        }
                    }
                }
                else {
                    if (!this._fixed)
                        itemRederer.x += xv;
                    if (this._dataIndexBegin == 0 && xv >= 0 || this._dataIndexEnd == this._itemDatas.length - 1 && xv < 0) {
                        continue;
                    }
                    if (this._fixed)
                        itemRederer.x += xv;
                    //补充一个
                    if (xv < 0 && this._dataIndexEnd < this._itemDatas.length - 1) {
                        if (this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).x + itemRederer.width + this._gap < this._itemContainer.width) {
                            optNum = this.addUIItem(this._dataIndexEnd + 1, false);
                            this._dataIndexEnd += optNum;
                            //console.log("moveItemUIPosition 4444 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd)
                        }
                        if ((itemRederer.x + itemRederer.width) < 0) {
                            this.removeRender(this._itemContainer.getChildAt(i));
                            this._dataIndexBegin++;
                            //console.log("moveItemUIPosition 5555 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd)
                        }
                    }
                    else if (this._dataIndexBegin > 0) {
                        if (this._itemContainer.getChildAt(0).x - this._gap > 0) {
                            optNum = this.addUIItem(this._dataIndexBegin - this.line, true);
                            this._dataIndexBegin -= optNum;
                            //console.log("moveItemUIPosition 6666 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd)
                        }
                        if (itemRederer.x > this._itemContainer.width) {
                            this.removeRender(this._itemContainer.getChildAt(i));
                            this._dataIndexEnd--;
                            //console.log("moveItemUIPosition 7777 this._dataIndexBegin=" + this._dataIndexBegin + ", this._dataIndexEnd=" + this._dataIndexEnd)
                        }
                    }
                }
            }
        };
        /**
         * 添加一个节点
         * @param dataIndex 数据的下标
         * @param topPlace true:添加在最前面,添加在最后面
         */
        List.prototype.addUIItem = function (dataIndex, topPlace) {
            //console.log("addUIItem dataIndex=" + dataIndex + ", topPlace=" + topPlace + ", _dataIndexEnd=" + this._dataIndexEnd + ", _dataIndexBegin=" + this._dataIndexBegin);
            if (!this._itemDatas || dataIndex < 0 || dataIndex >= this._itemDatas.length) {
                return 0;
            }
            var indexAdd = 0;
            //console.log("addUIItem 000");
            //if (this._dataIndexToRender["" + dataIndex]) return indexAdd;
            //console.log("addUIItem 1111");
            var yPos = 0;
            var xPos = 0;
            while (indexAdd < this._line) {
                if (!this._itemDatas || dataIndex < 0 || dataIndex >= this._itemDatas.length)
                    break;
                var displayItemUI = codeBase.ObjectPool.getByClass(this._itemRenderer, "list_" + this.name);
                //初始化显示项
                if (!displayItemUI["isAddedToStage"]) {
                    this._itemContainer.addChild(displayItemUI);
                    this._itemContainer.removeChild(displayItemUI);
                }
                try {
                    displayItemUI["data"] = this._itemDatas[dataIndex]; //给显示项绑定数据
                    displayItemUI["list"] = this; //给显示项绑定所属列表
                    displayItemUI["dataIndex"] = dataIndex;
                    if (displayItemUI && displayItemUI["validateNow"])
                        displayItemUI["validateNow"]();
                }
                catch (e) {
                }
                if (this._autoSize) {
                    if (this._direction == codeBase.Style.VERTICAL) {
                        displayItemUI.width = (this._itemContainer.width - (this._line - 1) * this._gap) / this._line;
                    }
                    else {
                        displayItemUI.height = (this._itemContainer.height - (this._line - 1) * this._gap) / this._line;
                    }
                }
                if (this._direction == codeBase.Style.VERTICAL) {
                    xPos = (displayItemUI.width + this._lineGap) * indexAdd;
                    if (this._itemContainer.numChildren > 0 && indexAdd == 0) {
                        if (topPlace) {
                            yPos = this._itemContainer.getChildAt(0).y;
                            yPos -= (this._gap + displayItemUI.height);
                            //console.log("000=" + yPos + ", indexAdd=" + indexAdd);
                        }
                        else {
                            yPos = this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).y;
                            yPos += (this._gap + this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).height) * (indexAdd + 1);
                            //console.log("111=" + yPos + ", indexAdd=" + indexAdd);
                        }
                    }
                    if (yPos > this._itemContainer.height || yPos < -displayItemUI.height) {
                        this.removeRender(displayItemUI);
                        return indexAdd;
                    }
                    displayItemUI.x = xPos;
                    displayItemUI.y = yPos;
                }
                else {
                    yPos = (displayItemUI.height + this._lineGap) * indexAdd;
                    //console.log("yPos=" + yPos + ", indexAdd=" + indexAdd);
                    if (this._itemContainer.numChildren > 0 && indexAdd == 0) {
                        if (topPlace) {
                            xPos = this._itemContainer.getChildAt(0).x;
                            xPos = xPos - (this._gap + displayItemUI.width);
                            //console.log("000=" + xPos + ", indexAdd=" + indexAdd);
                        }
                        else {
                            xPos = this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).x;
                            xPos += (this._gap + this._itemContainer.getChildAt(this._itemContainer.numChildren - 1).width) * (indexAdd + 1);
                            //console.log("111=" + xPos + ", indexAdd=" + indexAdd);
                        }
                    }
                    if (xPos > this._itemContainer.width || xPos < -displayItemUI.width) {
                        this.removeRender(displayItemUI);
                        return indexAdd;
                    }
                    displayItemUI.x = xPos;
                    displayItemUI.y = yPos;
                }
                //往容器中添加显示项
                if (topPlace) {
                    this._itemContainer.addChildAt(displayItemUI, 0);
                }
                else {
                    this._itemContainer.addChild(displayItemUI);
                }
                this._dataIndexToRender["" + dataIndex] = displayItemUI;
                indexAdd++;
                //console.log("addUIItem indexAdd=" + indexAdd + ", dataIndex=" + dataIndex + ", x=" + xPos + ", y=" + yPos + ", _dataIndexEnd=" + this._dataIndexEnd + ", _dataIndexBegin=" + this._dataIndexBegin);
                dataIndex++;
            }
            //已经到底,没有数据了
            if (dataIndex >= this._itemDatas.length && indexAdd > 0) {
                //console.log("list.data.end.call");
                if (this._data_end_func_call)
                    this._data_end_func_call.call(this._data_end_func_this);
            }
            return indexAdd;
        };
        Object.defineProperty(List.prototype, "data", {
            set: function (value) {
                this._data = value;
                this._itemDatas = null;
                this._dataIndexToRender = {};
                this.setItemContainerSize();
                //清空显示
                var displayItemUI = null;
                while (this._itemContainer.numChildren > 0) {
                    displayItemUI = this._itemContainer.removeChildAt(0);
                    if (displayItemUI instanceof this._itemRenderer) {
                        this.removeRender(displayItemUI);
                        // if (displayItemUI["data"]) displayItemUI["data"] = null;
                        // ObjectPool.recycleClass(displayItemUI, "list_" + this.name);
                    }
                }
                if (this._data instanceof Array) {
                    //进行首次填充
                    this._itemDatas = this._data;
                    //console.log("set data.length=" + this._itemDatas.length + ", data=" + this._itemDatas);
                    if (this._itemDatas.length == 0)
                        return;
                    this._dataIndexBegin = 0;
                    var placeValue = 0; //占据的位置
                    var addNum = this.addUIItem(this._dataIndexBegin, false);
                    this._dataIndexEnd = addNum;
                    while (addNum != 0 && this._dataIndexEnd < this._itemDatas.length) {
                        addNum = this.addUIItem(this._dataIndexEnd, false);
                        this._dataIndexEnd += addNum;
                        //console.log("dataIndexEnd=" + this._dataIndexEnd + ", addNum=" + addNum);
                    }
                    this._dataIndexEnd--; //起始是从0开始,减去一个下标
                    //console.log("setData dataIndexBegin=" + this._dataIndexBegin + ", dataIndexEnd=" + this._dataIndexEnd)
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 追加滚动数据
         * @param value
         */
        List.prototype.append = function (datas) {
            if (datas) {
                this._itemDatas = this._itemDatas.concat(datas);
            }
        };
        List.prototype.renderItem = function () {
        };
        /**
         * Draws the visual ui of the component.
         */
        List.prototype.draw = function () {
            _super.prototype.draw.call(this);
            this.setItemContainerSize();
        };
        List.prototype.setItemContainerSize = function () {
            this._itemContainer.x = this._marginLeft;
            this._itemContainer.y = this._marginTop;
            this._itemContainer.width = this.width - this._marginLeft - this._marginRight;
            this._itemContainer.height = this.height - this._marginTop - this._marginBottom;
            this._itemContainer.scrollRect.width = this._itemContainer.width;
            this._itemContainer.scrollRect.height = this._itemContainer.height;
        };
        List.prototype.setHorizontalLayout = function () {
            this.layout = codeBase.Style.HORIZONTAL;
        };
        List.prototype.setVerticalLayout = function () {
            this.layout = codeBase.Style.VERTICAL;
        };
        Object.defineProperty(List.prototype, "layout", {
            /**
             * 设置列表布局：水平和竖直
             */
            get: function () {
                return this._direction;
            },
            set: function (direct) {
                this._direction = direct;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            /**
             * 设置当前选择项
             */
            set: function (item) {
                //console.log("selectedItem item=" + item)
                var sp = null;
                this._selected = item;
                for (var i = 0; i < this._itemContainer.numChildren; i++) {
                    sp = this._itemContainer.getChildAt(i);
                    if (sp["selected"])
                        sp["selected"] = false;
                    try {
                        if (sp["_data"] == item) {
                            sp["selected"] = true;
                            //console.log("list.selected=" + JSON.stringify(item));
                            // let selectEvent = new MyEvent(List.ITEM_SELECTED);
                            // selectEvent.addItem("item", sp);
                            // selectEvent.addItem("dataIndex", 0);
                            // selectEvent.send();
                            this.dispatchEventWith(List.ITEM_SELECTED, false, { item: sp }, false);
                        }
                    }
                    catch (e) {
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "selectedIndex", {
            /**
             * 获取选择对象的index
             * @returns {number}
             */
            get: function () {
                if (this._selected) {
                    return this._data.indexOf(this._selected);
                }
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "itemRenderer", {
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
        Object.defineProperty(List.prototype, "autoSize", {
            get: function () {
                return this._autoSize;
            },
            /**
             * 设置自动大小
             * @param value
             */
            set: function (value) {
                if (this._autoSize != value) {
                    this._autoSize = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "marginTop", {
            get: function () {
                return this._marginTop;
            },
            /**
             * 设置顶边距
             * @param value
             */
            set: function (value) {
                if (this._marginTop != value) {
                    this._marginTop = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "marginBottom", {
            get: function () {
                return this._marginBottom;
            },
            /**
             * 设置底边距
             * @param value
             */
            set: function (value) {
                if (this._marginBottom != value) {
                    this._marginBottom = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "marginLeft", {
            get: function () {
                return this._marginLeft;
            },
            /**
             * 设置左边距
             * @param value
             */
            set: function (value) {
                this._marginLeft = value;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "marginRight", {
            get: function () {
                return this._marginRight;
            },
            /**
             * 设置右边距
             * @param value
             */
            set: function (value) {
                if (this._marginRight = value) {
                    this._marginRight = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "gap", {
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
        Object.defineProperty(List.prototype, "line", {
            get: function () {
                return this._line;
            },
            /**
             * 设置render的排数,默认是1
             */
            set: function (value) {
                this._line = value;
                if (this._line < 1)
                    this._line = 1;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "lineGap", {
            get: function () {
                return this._lineGap;
            },
            /**
             * 设置render的排间距,默认是0
             */
            set: function (value) {
                this._lineGap = value;
                if (this._lineGap < 0)
                    this._lineGap = 0;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "fixed", {
            get: function () {
                return this._fixed;
            },
            /**
             * 设置无滚动元素的时候,禁止背景滚动
             */
            set: function (value) {
                if (this._fixed != value) {
                    this._fixed = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置滚动数据结束的通知
         * @param func
         * @param thisObj
         */
        List.prototype.setDataEndCall = function (func, thisObj) {
            this._data_end_func_call = func;
            this._data_end_func_this = thisObj;
        };
        List.ITEM_SELECTED = "ITEM_SELECTED";
        return List;
    }(codeBase.Group));
    codeBase.List = List;
    __reflect(List.prototype, "codeBase.List");
})(codeBase || (codeBase = {}));
