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
    var TabBar = (function (_super) {
        __extends(TabBar, _super);
        function TabBar() {
            return _super.call(this) || this;
        }
        TabBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        TabBar.prototype.initData = function () {
            var s = this;
            s.UI_PREFIX = "ui#TabBar#";
            s.stateArray = [codeBase.Button.STATUS_NORMAL, codeBase.Button.STATUS_CHECKED];
            //初始化默认的皮肤
            if (!TabBar.tabBar_normalTexture) {
                var normalSpr = codeBase.UISkin.getRect(TabBar.tabDefaultWidth, TabBar.tabDefaultHeight, codeBase.UIColor.white);
                var normalRenderTex = new codeBase.RenderTexture;
                normalRenderTex.drawToTexture(normalSpr);
                TabBar.tabBar_normalTexture = normalRenderTex;
                var checkSpr = codeBase.UISkin.getRect(TabBar.tabDefaultWidth, TabBar.tabDefaultHeight, codeBase.UIColor.gray);
                var checkRenderTex = new codeBase.RenderTexture;
                checkRenderTex.drawToTexture(checkSpr);
                TabBar.tabBar_checkTexture = checkRenderTex;
            }
        };
        TabBar.prototype.initDisplay = function () {
            var s = this;
            s.setSkins([TabBar.tabBar_normalTexture, TabBar.tabBar_checkTexture]);
        };
        /**
         * 绘制
         */
        TabBar.prototype.draw = function () {
            //super.draw();
            //if (this._data)console.log("@@Button draw _text=" + this._text + ", selected=" + this.selected + ", data=" + this._data.id);
            //初始化显示对象和数据
            var s = this;
            if (!s._initDisplayData) {
                s.initDisplay();
            }
            if (s._imgDisplay == null)
                return;
            s._imgDisplay.texture = s._textureDict[s._currentState];
            //文字标签
            if (s._label) {
                if (!s._label.parent)
                    s.addChild(s._label);
                s._label.text = s._text;
                s._label.fontSize = s._fontSize;
                s._label.fontName = s._fontName;
                s._label.bold = s._labelBold;
                s._label.italic = s._labelItalic;
                s._label.lineSpacing = s._labelLineSpacing;
                s._label.multiline = s._labelMultiline;
                s._label.stroke = s._labelStroke;
                s._label.strokeColor = s._labelStrokeColor;
                s._label.onInvalidate(null); //立即生效,这样下面的数据才准
                if (!isNaN(s._labelMarginLeft)) {
                    s._label.x = s._labelMarginLeft;
                }
                else {
                    s._label.x = (s.width - s._label.width) / 2;
                    //console.log("Button.draw 222 this.width=" +this.width + ", this._label.width=" + this._label.width);
                }
                if (!isNaN(s._labelMarginTop)) {
                    s._label.y = s._labelMarginTop;
                }
                else {
                    s._label.y = (s.height - s._label.height) / 2;
                }
            }
        };
        TabBar.tabDefaultWidth = 60;
        TabBar.tabDefaultHeight = 30;
        return TabBar;
    }(codeBase.RadioButton));
    codeBase.TabBar = TabBar;
    __reflect(TabBar.prototype, "codeBase.TabBar");
})(codeBase || (codeBase = {}));
