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
    var ListItem = (function (_super) {
        __extends(ListItem, _super);
        function ListItem() {
            return _super.call(this) || this;
        }
        /**
         * 渲染项初始化
        */
        ListItem.prototype.init = function (data) {
            this.touchEnabled = true;
            this.icon = codeBase.UICreator.createBitmap(data.res);
            this.addChild(this.icon);
        };
        ListItem.prototype.setSelected = function (value) {
            if (this.selected == value)
                return;
            this.selected = value;
            if (this.selected) {
                this.icon.scaleX = this.scaleY = 1.2;
            }
            else {
                this.icon.scaleX = this.scaleY = 1;
            }
        };
        ListItem.prototype.addEvent = function () {
        };
        return ListItem;
    }(codeBase.DisplayObjectContainer));
    codeBase.ListItem = ListItem;
    __reflect(ListItem.prototype, "codeBase.ListItem", ["codeBase.IListItemRenderer"]);
})(codeBase || (codeBase = {}));
