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
    /**列表组件 */
    var ListGroup = (function (_super) {
        __extends(ListGroup, _super);
        /**设置宽与高 */
        function ListGroup(w, h, type, interval, itemList) {
            if (type === void 0) { type = codeBase.Style.VERTICAL; }
            if (interval === void 0) { interval = 10; }
            if (itemList === void 0) { itemList = []; }
            var _this = _super.call(this) || this;
            _this.itemInterval = 0;
            _this.items = [];
            var s = _this;
            s.alignType = type;
            s.itemInterval = interval;
            s.contentView = new codeBase.BasicGroup();
            s.scrollBar = new codeBase.Scroller(w, h, s.contentView, type);
            s.addChild(s.scrollBar);
            s.width = w;
            s.height = h;
            s.initItem(itemList);
            return _this;
        }
        ListGroup.prototype.initItem = function (items) {
            var s = this;
            items.forEach(function (element) {
                s.addItem(element);
            });
            s.layout(s.alignType, s.itemInterval);
        };
        ListGroup.prototype.addItem = function (item) {
            var s = this;
            s.contentView.addChild(item);
            item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
            item.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
            s.items.push(item);
        };
        ListGroup.prototype.removeItem = function (item) {
            var s = this;
            if (s.contentView.contains(item)) {
                s.contentView.removeChild(item);
                item.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
                item.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
                if (item instanceof codeBase.BasicGroup) {
                    item.dispose();
                }
                s.layout(s.alignType, s.itemInterval);
            }
        };
        ListGroup.prototype.layout = function (type, interval) {
            var s = this;
            if (type == codeBase.Style.VERTICAL) {
                s.items.forEach(function (element, index) {
                    element.x = 0;
                    element.y = 0 + index * (element.height + interval);
                });
            }
            else if (type == codeBase.Style.HORIZONTAL) {
                s.items.forEach(function (element, index) {
                    element.x = 0 + index * (element.width + interval);
                    element.y = 0;
                });
            }
        };
        /**设置可配置渲染列表
         * renderer 渲染项实现,继承DisplayObjectContainer类，实现IListItemrenderer接口
         * data 渲染数据
         */
        ListGroup.prototype.renderList = function (renderer, data, executeSelected) {
            if (data === void 0) { data = []; }
            if (executeSelected === void 0) { executeSelected = true; }
            var s = this;
            if (renderer && data) {
                s.clear();
                s.executeSelected = executeSelected;
                s.itemRenderer = renderer;
                s.dataProvider = data.concat();
                for (var i = 0; i < data.length; ++i) {
                    var displayItemUI = new renderer();
                    displayItemUI.data = data[i]; //给显示项绑定数据
                    displayItemUI.dataIndex = i; //数据项下标
                    displayItemUI.list = s; //给显示项绑定所属列表
                    displayItemUI.validateNow();
                    s.addItem(displayItemUI);
                }
                s.layout(s.alignType, s.itemInterval);
            }
        };
        /**设置实例化渲染列表 */
        ListGroup.prototype.setItemList = function (itemList) {
            if (itemList === void 0) { itemList = []; }
            var s = this;
            s.clear();
            s.initItem(itemList);
        };
        /**如果需要给列表填充新的显示项 需要调用此方法清理列表 */
        ListGroup.prototype.clear = function () {
            var s = this;
            s.itemRenderer = null;
            if (s.dataProvider && s.dataProvider instanceof Array) {
                s.dataProvider.length = 0;
                s.dataProvider = null;
            }
            s.items.forEach(function (element) {
                s.removeItem(element);
            });
            s.items.length = 0;
        };
        /**设置是否可以鼠标滚动列表 */
        ListGroup.prototype.setMouseWheelEnable = function (value) {
            var s = this;
            s.scrollBar.setMouseWheelEnable(value);
        };
        /***两点间的距离 */
        ListGroup.prototype.twoDistance = function (a, b) {
            var x = a.x - b.x;
            var y = a.y - b.y;
            return Math.sqrt(x * x + y * y);
        };
        ListGroup.prototype.onTouch = function (e) {
            var s = this;
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                s.posStart = new codeBase.Point(e.stageX, e.stageY);
            }
            else {
                var posEnd = new codeBase.Point(e.stageX, e.stageY);
                if (s.posStart && s.twoDistance(s.posStart, posEnd) < 20) {
                    s.onClick(e.currentTarget);
                }
                s.posStart = null;
            }
        };
        ListGroup.prototype.onClick = function (item) {
            var s = this;
            if (s.itemRenderer) {
                if (s.itemSelected && s.executeSelected)
                    s.itemSelected.setSelected(false);
                s.itemSelected = item;
                s.itemSelected.setSelected(true);
            }
            else {
                s.itemSelected = item;
            }
            var param = { item: item, index: s.items.indexOf(item) };
            s.dispEvent(codeBase.BasicUIEvent.CLICK, param);
        };
        return ListGroup;
    }(codeBase.BasicGroup));
    codeBase.ListGroup = ListGroup;
    __reflect(ListGroup.prototype, "codeBase.ListGroup", ["codeBase.ILayout"]);
})(codeBase || (codeBase = {}));
