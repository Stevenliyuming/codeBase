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
     * 为方便使用,简写名称
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextField;
    }(egret.TextField));
    codeBase.TextField = TextField;
    __reflect(TextField.prototype, "codeBase.TextField");
    ;
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Sprite;
    }(egret.Sprite));
    codeBase.Sprite = Sprite;
    __reflect(Sprite.prototype, "codeBase.Sprite");
    ;
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Shape;
    }(egret.Shape));
    codeBase.Shape = Shape;
    __reflect(Shape.prototype, "codeBase.Shape");
    ;
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DisplayObject;
    }(egret.DisplayObject));
    codeBase.DisplayObject = DisplayObject;
    __reflect(DisplayObject.prototype, "codeBase.DisplayObject");
    ;
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DisplayObjectContainer;
    }(egret.DisplayObjectContainer));
    codeBase.DisplayObjectContainer = DisplayObjectContainer;
    __reflect(DisplayObjectContainer.prototype, "codeBase.DisplayObjectContainer");
    ;
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Point;
    }(egret.Point));
    codeBase.Point = Point;
    __reflect(Point.prototype, "codeBase.Point");
    ;
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Rectangle;
    }(egret.Rectangle));
    codeBase.Rectangle = Rectangle;
    __reflect(Rectangle.prototype, "codeBase.Rectangle");
    ;
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bitmap;
    }(egret.Bitmap));
    codeBase.Bitmap = Bitmap;
    __reflect(Bitmap.prototype, "codeBase.Bitmap");
    ;
    var BitmapData = (function (_super) {
        __extends(BitmapData, _super);
        function BitmapData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BitmapData;
    }(egret.BitmapData));
    codeBase.BitmapData = BitmapData;
    __reflect(BitmapData.prototype, "codeBase.BitmapData");
    ;
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Stage;
    }(egret.Stage));
    codeBase.Stage = Stage;
    __reflect(Stage.prototype, "codeBase.Stage");
    ;
    var Tween = (function (_super) {
        __extends(Tween, _super);
        function Tween() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Tween;
    }(egret.Tween));
    codeBase.Tween = Tween;
    __reflect(Tween.prototype, "codeBase.Tween");
    ;
    var Ease = (function (_super) {
        __extends(Ease, _super);
        function Ease() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Ease;
    }(egret.Ease));
    codeBase.Ease = Ease;
    __reflect(Ease.prototype, "codeBase.Ease");
    ;
    /**
     * 布局组件变化事件分发和侦听处理类
     */
    var LayoutEvent = (function (_super) {
        __extends(LayoutEvent, _super);
        function LayoutEvent(type, data, currentTarget) {
            if (type === void 0) { type = ""; }
            if (data === void 0) { data = null; }
            if (currentTarget === void 0) { currentTarget = null; }
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.data = data;
            _this.currentTarget = currentTarget;
            return _this;
        }
        //button event
        LayoutEvent.MOUSE_OVER = "event-over"; //移进
        LayoutEvent.MOUSE_OUT = "event-out"; //移出
        LayoutEvent.MOUSE_DOWN = "event-down"; //点下
        LayoutEvent.MOUSE_MOVE = "event-move"; //移动
        LayoutEvent.MOUSE_UP = "event-up"; //弹开
        LayoutEvent.CLICK = "event-click"; //单击
        //tabbar event
        LayoutEvent.CHANGE = "change"; //更换
        LayoutEvent.COMPLETE = "complete"; //完成
        LayoutEvent.ERROR = "error"; //错误
        LayoutEvent.RENDER_COMPLETE = "render complete"; //渲染完成
        LayoutEvent.UPDATE = "update"; //更新
        LayoutEvent.START = "start"; //开始
        LayoutEvent.MOVE = "move"; //移动
        LayoutEvent.OVER = "over"; //结束
        LayoutEvent.PAUSE = "pause"; //暂停
        LayoutEvent.STOP = "stop"; //停止
        LayoutEvent.PLAY = "play"; //播放
        LayoutEvent.OPEN = "open"; //开启
        LayoutEvent.CLOSE = "close"; //关闭
        return LayoutEvent;
    }(egret.EventDispatcher));
    codeBase.LayoutEvent = LayoutEvent;
    __reflect(LayoutEvent.prototype, "codeBase.LayoutEvent");
    var FONT = (function () {
        function FONT() {
        }
        FONT.fontName = "黑体";
        return FONT;
    }());
    codeBase.FONT = FONT;
    __reflect(FONT.prototype, "codeBase.FONT");
    var LayoutConst = (function () {
        function LayoutConst() {
        }
        /**布局 横版*/
        LayoutConst.HORIZONTAL = "horizontal";
        /**布局 竖版*/
        LayoutConst.VERTICAL = "vertical";
        /**形状 方块*/
        LayoutConst.SHAPE_RECT = "shape rect";
        /**形状 圆角方块*/
        LayoutConst.SHAPE_RECT_ROUND = "shape rect round";
        /**形状 圆块*/
        LayoutConst.SHAPE_CIRCLE = "shape circle";
        /**版本 调试*/
        LayoutConst.VER_DEBUG = "debug";
        /**版本 发布*/
        LayoutConst.VER_RELEASE = "release";
        return LayoutConst;
    }());
    codeBase.LayoutConst = LayoutConst;
    __reflect(LayoutConst.prototype, "codeBase.LayoutConst");
    /**颜色 */
    var Color = (function () {
        function Color() {
        }
        Object.defineProperty(Color, "random", {
            get: function () { return Math.random() * 0XFFFFFF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "white", {
            get: function () { return 0XFFFFFF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "black", {
            get: function () { return 0X000000; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "gray", {
            get: function () { return 0X666666; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "red", {
            get: function () { return 0XFF0000; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "green", {
            get: function () { return 0X00FF00; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "bule", {
            get: function () { return 0X0000FF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "skinNormal", {
            get: function () { return 0X15191C; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "skinDown", {
            get: function () { return 0X999999; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "titleBackground", {
            get: function () { return 0X20262B; },
            enumerable: true,
            configurable: true
        });
        ;
        Color.getRandomArray = function (count) {
            var colors = [];
            for (var i = 0; i < count; i++)
                colors.push(Math.random() * 0XFFFFFF);
            return colors;
        };
        ;
        /** 可改变颜色的亮暗,value值是-255到255*/
        Color.lightenDarkenColor = function (color, value) {
            var r = (color >> 16) + value;
            if (r > 255)
                r = 255;
            else if (r < 0)
                r = 0;
            var b = ((color >> 8) & 0x00FF) + value;
            if (b > 255)
                b = 255;
            else if (b < 0)
                b = 0;
            var g = (color & 0x0000FF) + value;
            if (g > 255)
                g = 255;
            else if (g < 0)
                g = 0;
            return (g | (b << 8) | (r << 16));
        };
        return Color;
    }());
    codeBase.Color = Color;
    __reflect(Color.prototype, "codeBase.Color");
    /**皮肤 */
    var Skin = (function () {
        function Skin() {
        }
        Object.defineProperty(Skin, "randomRect", {
            /**随机色的矩形与圆 */
            get: function () { return LayoutUI.getRect(60, 60, Color.random); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "randomCircle", {
            get: function () { return LayoutUI.getCircle(50, Color.random); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "pointNormal", {
            /**默认点 */
            get: function () { return LayoutUI.getCircle(6, Color.black); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "pointDown", {
            get: function () { return LayoutUI.getCircle(6, Color.gray); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "buttonNormal", {
            /**默认按钮 */
            get: function () { return LayoutUI.getRect(60, 60, Color.skinNormal); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "buttonDown", {
            get: function () { return LayoutUI.getRect(60, 60, Color.skinDown); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "radioOff", {
            /**默认单选框 */
            get: function () { return LayoutUI.getRadioCircle(Color.white, Color.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "radioOn", {
            get: function () { return LayoutUI.getRadioCircle(Color.white, Color.black, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "checkBoxOff", {
            /**默认复选框 */
            get: function () { return LayoutUI.getCheckBoxRect(Color.white, Color.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "checkBoxOn", {
            get: function () { return LayoutUI.getCheckBoxRect(Color.white, Color.black, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "switchOff", {
            /**默认开关 */
            get: function () { return LayoutUI.getSwitch(Color.skinNormal, Color.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "switchOn", {
            get: function () { return LayoutUI.getSwitch(Color.skinNormal, Color.white, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "progressBackground", {
            /**默认进度条 */
            get: function () { return LayoutUI.getRect(300, 20, Color.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "progressValue", {
            get: function () { return LayoutUI.getRect(300, 20, Color.skinDown); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "sliderBackground", {
            /**默认滑动器 */
            get: function () { return LayoutUI.getRect(300, 10, Color.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "sliderValue", {
            get: function () { return LayoutUI.getRect(300, 10, Color.skinDown); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "sliderBar", {
            get: function () { return LayoutUI.getCircle(15, Color.white); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "scrollBar", {
            /**默认滚动条 */
            get: function () { return LayoutUI.getRect(10, 10, Color.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "pnBarPrevNormal", {
            /**上下页切换组件 */
            get: function () { return LayoutUI.getPolygon(3, 20, Color.skinNormal, 180); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "pnBarPrevDown", {
            get: function () { return LayoutUI.getPolygon(3, 20, Color.skinDown, 180); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "pnBarNextNormal", {
            get: function () { return LayoutUI.getPolygon(3, 20, Color.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin, "pnBarNextDown", {
            get: function () { return LayoutUI.getPolygon(3, 20, Color.skinDown); },
            enumerable: true,
            configurable: true
        });
        Skin.getRodatioButton = function (label) {
            var btn = new BasicButton(Skin.radioOff, Skin.radioOn);
            btn.skinAutoScale = false;
            btn.label = label;
            btn.labelColor = Color.black;
            btn.setLabelPoint(40, 0);
            return btn;
        };
        Skin.getCheckBox = function (label) {
            var skins = [Skin.checkBoxOff, Skin.checkBoxOff, Skin.checkBoxOn, Skin.checkBoxOn];
            var btn = new MoreSkinButton(skins);
            btn.skinAutoScale = false;
            btn.label = label;
            btn.toggleSwitch = true;
            btn.labelColor = Color.black;
            btn.setLabelPoint(50, 2);
            return btn;
        };
        return Skin;
    }());
    codeBase.Skin = Skin;
    __reflect(Skin.prototype, "codeBase.Skin");
    /**
     * 简单的布局
     */
    var SimpleLayout = (function () {
        function SimpleLayout() {
        }
        /**参数：数组,X轴个数,X轴距离,Y轴距离,X轴位置,Y轴位置,正排/反排 */
        SimpleLayout.displayRank = function (array, xNum, xDis, yDis, x, y, sign) {
            if (xNum === void 0) { xNum = 1; }
            if (xDis === void 0) { xDis = 0; }
            if (yDis === void 0) { yDis = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (sign === void 0) { sign = 1; }
            var display;
            for (var i = 0; i < array.length; i++) {
                display = array[i];
                display.x = x + Math.floor(i % xNum) * (display.width + xDis) * sign;
                display.y = y + Math.floor(i / xNum) * (display.height + yDis) * sign;
            }
        };
        return SimpleLayout;
    }());
    codeBase.SimpleLayout = SimpleLayout;
    __reflect(SimpleLayout.prototype, "codeBase.SimpleLayout");
    /**
     * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆角高
     */
    var LayoutUI = (function () {
        function LayoutUI() {
        }
        /**得到矩形框*/
        LayoutUI.getLineRect = function (w, h, c, s, x, y) {
            if (c === void 0) { c = 0; }
            if (s === void 0) { s = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var node = new Sprite();
            node.graphics.lineStyle(s, c);
            node.graphics.drawRect(x, y, w, h);
            node.graphics.endFill();
            return node;
        };
        /**得到圆形框*/
        LayoutUI.getLineCircle = function (r, c, s, x, y) {
            if (c === void 0) { c = 0; }
            if (s === void 0) { s = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var node = new Sprite();
            node.graphics.lineStyle(s, c);
            node.graphics.drawCircle(x, y, r);
            node.graphics.endFill();
            return node;
        };
        /**得到渐变矩形 a为角度偏移率0,0.5,1,2分别为四个正方向*/
        LayoutUI.getMatrixRect = function (w, h, c1, c2, a) {
            if (c1 === void 0) { c1 = 0; }
            if (c2 === void 0) { c2 = 0; }
            if (a === void 0) { a = 0; }
            var node = new Sprite();
            var matrix = new egret.Matrix();
            matrix.createGradientBox(w, h, Math.PI * a, 0, 0);
            node.graphics.beginGradientFill(egret.GradientType.LINEAR, [c1, c2], [1, 1], [0, 255], matrix);
            node.graphics.drawRect(0, 0, w, h);
            node.graphics.endFill();
            return node;
        };
        /**得到矩形*/
        LayoutUI.getRect = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawRect(x, y, w, h);
            s.graphics.endFill();
            return s;
        };
        /**得到矩形中间带一个X*/
        LayoutUI.getRectAndX = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = this.getRect(w, h, c, x, y);
            s.addChild(this.getX(w, h, c, 1, x, y));
            return s;
        };
        /**得到一个X*/
        LayoutUI.getX = function (w, h, c, s, x, y) {
            if (c === void 0) { c = 0; }
            if (s === void 0) { s = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var container = new Sprite;
            var l1 = new Sprite;
            l1.graphics.lineStyle(s, c);
            l1.graphics.moveTo(0, 0);
            l1.graphics.lineTo(w, h);
            var l2 = new Sprite;
            l2.graphics.lineStyle(s, c);
            l2.graphics.moveTo(w, 0);
            l2.graphics.lineTo(0, h);
            container.addChild(l1);
            container.addChild(l2);
            return container;
        };
        /**得到圆角矩形*/
        LayoutUI.getRoundRect = function (w, h, c, ew, eh, x, y) {
            if (c === void 0) { c = 0; }
            if (ew === void 0) { ew = 5; }
            if (eh === void 0) { eh = 5; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawRoundRect(x, y, w, h, ew, eh);
            s.graphics.endFill();
            return s;
        };
        /**得到圆形*/
        LayoutUI.getCircle = function (r, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawCircle(x, y, r);
            s.graphics.endFill();
            return s;
        };
        /**得到多边形,side边数,rotation角度*/
        LayoutUI.getPolygon = function (side, r, c, rotation) {
            if (side === void 0) { side = 3; }
            if (r === void 0) { r = 10; }
            if (c === void 0) { c = 0; }
            if (rotation === void 0) { rotation = 0; }
            var s = new Sprite;
            s.rotation = rotation;
            s.graphics.beginFill(c);
            for (var i = 0; i <= side; i++) {
                var lineX = Math.cos((i * (360 / side) * Math.PI / 180)) * r;
                var lineY = Math.sin((i * (360 / side) * Math.PI / 180)) * r;
                if (i == 0)
                    s.graphics.moveTo(lineX, lineY);
                else
                    s.graphics.lineTo(lineX, lineY);
            }
            s.graphics.endFill();
            return s;
        };
        /**得到圆角矩形与三角形合体rc是正方形颜色,pc是三角形颜色*/
        LayoutUI.getArrowRoundRect = function (w, h, rc, pc, rotation) {
            if (pc === void 0) { pc = 0; }
            if (rotation === void 0) { rotation = 0; }
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, rc));
            var p = this.getPolygon(3, w / 3, pc, 30 + rotation);
            p.x = s.width >> 1;
            p.y = s.height >> 1;
            s.addChild(p);
            return s;
        };
        /**得到滚动条的bar*/
        LayoutUI.getScrollLineBar = function (w, h, c) {
            var s = new Sprite;
            var _h = h / 3;
            for (var i = 0; i < 3; i++) {
                var r = this.getRect(w, 1, c, 0, i * _h);
                s.addChild(r);
            }
            return s;
        };
        /**得到圆角矩形-加*/
        LayoutUI.getAddRoundRect = function (w, h, c) {
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r1 = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            var r2 = this.getRect(2, h / 2, 0, w / 2 - 1, h / 4);
            s.addChild(r1);
            s.addChild(r2);
            return s;
        };
        /**得到圆角矩形-减*/
        LayoutUI.getRemoveRoundRect = function (w, h, c) {
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            s.addChild(r);
            return s;
        };
        /**得到带文字的圆角方形*/
        LayoutUI.getRoundRectText = function (w, h, c, str) {
            if (str === void 0) { str = "click"; }
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var text = new TextField;
            text.name = "text";
            text.text = str;
            text.x = (s.width - text.width) >> 1;
            text.y = (s.height - text.height) >> 1;
            s.addChild(text);
            return s;
        };
        /**得到矩形-switchButton bc背景颜色，gc钩选的颜色,type为0是没有钩 为1是有钩*/
        LayoutUI.getSwitch = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var node = LayoutUI.getRoundRect(80, 50, bc, 60, 60);
            node.addChild(LayoutUI.getCircle(22, gc, type == 0 ? 25 : 55, 25));
            return node;
        };
        /**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
        LayoutUI.getCheckBoxRect = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var s = new Sprite;
            s.addChild(this.getRect(40, 40, bc));
            if (type == 1) {
                var r = new Sprite;
                r.graphics.beginFill(gc);
                r.graphics.moveTo(0, 20);
                r.graphics.lineTo(20, 36);
                r.graphics.lineTo(44, 8);
                r.graphics.lineTo(36, 0);
                r.graphics.lineTo(20, 18);
                r.graphics.lineTo(12, 8);
                r.graphics.lineTo(0, 20);
                s.addChild(r);
            }
            return s;
        };
        /**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
        LayoutUI.getRadioCircle = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var s = new Sprite;
            s.addChild(this.getCircle(16, bc, 16, 16));
            s.graphics.lineStyle(1, 0);
            if (type == 1) {
                var r = this.getCircle(8, gc, 16, 16);
                s.addChild(r);
            }
            return s;
        };
        /**得到矩形-网格
         * rect.x是x轴数量
         * rect.y是y轴数量
         * rect.width是网格宽
         * rect.height是网格高
         * lc网格线颜色
         * */
        LayoutUI.getGridding = function (rect, c) {
            if (c === void 0) { c = 0; }
            var s = new Sprite;
            s.graphics.lineStyle(0.1, c);
            var disx = rect.width / rect.x;
            var disy = rect.height / rect.y;
            for (var i = 0; i < rect.x; i++) {
                s.graphics.moveTo(0, i * disy);
                s.graphics.lineTo(rect.width, i * disy);
            }
            for (i = 0; i < rect.y; i++) {
                s.graphics.moveTo(i * disx, 0);
                s.graphics.lineTo(i * disx, rect.height);
            }
            return s;
        };
        /***得到爱心 */
        LayoutUI.getHeart = function (r, c) {
            if (r === void 0) { r = 15; }
            if (c === void 0) { c = 0XFF0000; }
            var s = new Sprite;
            s.graphics.beginFill(c);
            s.graphics.moveTo(0, 0);
            s.graphics.lineTo(0, -r * 2);
            s.graphics.cubicCurveTo(r, -r * 2.5, r * 2, -r * 1.5, 0, 0);
            s.graphics.moveTo(0, 0);
            s.graphics.lineTo(0, -r * 2);
            s.graphics.cubicCurveTo(-r, -r * 2.5, -r * 2, -r * 1.5, 0, 0);
            s.graphics.endFill();
            s.anchorOffsetX = -s.width / 2;
            s.anchorOffsetY = -s.height;
            return s;
        };
        return LayoutUI;
    }());
    codeBase.LayoutUI = LayoutUI;
    __reflect(LayoutUI.prototype, "codeBase.LayoutUI");
    var LayoutSprite = (function (_super) {
        __extends(LayoutSprite, _super);
        function LayoutSprite() {
            var _this = _super.call(this) || this;
            _this._type = LayoutConst.SHAPE_RECT;
            _this._color = 0;
            _this.display = new Sprite;
            _this.bg = new Sprite;
            return _this;
        }
        Object.defineProperty(LayoutSprite.prototype, "type", {
            get: function () { return this._type; },
            set: function (value) { this._type = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayoutSprite.prototype, "color", {
            get: function () { return this._color; },
            set: function (value) { this._color = value; this._data.c = value; this.draw(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayoutSprite.prototype, "data", {
            /**{w:1,h:1,r:1,c:1,ew:1,eh:1} */
            set: function (value) { this._data = value; this.draw(); },
            enumerable: true,
            configurable: true
        });
        LayoutSprite.prototype.draw = function () {
            var s = this;
            s._color = s._data.c;
            s.display.graphics.clear();
            s.display = s.getDisplay(s._data);
            s.addChild(s.display);
            s.setPosition();
        };
        LayoutSprite.prototype.setPosition = function () {
            var s = this;
            if (s._hasBg && s.type != LayoutConst.SHAPE_CIRCLE) {
                s.display.x = (s.bg.width - s.display.width) >> 1;
                s.display.y = (s.bg.height - s.display.height) >> 1;
            }
        };
        LayoutSprite.prototype.setBackground = function (color, side) {
            if (side === void 0) { side = 1; }
            var s = this;
            s._hasBg = true;
            var d = s._data;
            var o = {};
            for (var i in d) {
                o[i] = d[i];
            }
            o.c = color;
            if (o.w)
                o.w = o.w + side * 2;
            if (o.h)
                o.h = o.h + side * 2;
            if (o.r)
                o.r = o.r + side;
            s.bg.graphics.clear();
            s.bg = s.getDisplay(o);
            s.addChildAt(s.bg, 0);
            s.setPosition();
        };
        LayoutSprite.prototype.getDisplay = function (o) {
            switch (this.type) {
                case LayoutConst.SHAPE_RECT:
                    return LayoutUI.getRect(o.w, o.h, o.c);
                case LayoutConst.SHAPE_RECT_ROUND:
                    return LayoutUI.getRoundRect(o.w, o.h, o.c, o.ew, o.eh);
                case LayoutConst.SHAPE_CIRCLE:
                    return LayoutUI.getCircle(o.r, o.c);
            }
        };
        return LayoutSprite;
    }(Sprite));
    codeBase.LayoutSprite = LayoutSprite;
    __reflect(LayoutSprite.prototype, "codeBase.LayoutSprite");
    var LayoutContainer = (function (_super) {
        __extends(LayoutContainer, _super);
        function LayoutContainer() {
            var _this = _super.call(this) || this;
            _this.dataEvent = new Object;
            _this.init();
            _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
            return _this;
        }
        LayoutContainer.prototype.addToStage = function () {
            this.render();
        };
        /**加载到舞台之前调用 */
        LayoutContainer.prototype.init = function () {
        };
        /**加载到舞台之后调用 */
        LayoutContainer.prototype.render = function () {
            var s = this;
            s.stageWidth = s.stage.stageWidth;
            s.stageHeight = s.stage.stageHeight;
        };
        /**分发事件*/
        LayoutContainer.prototype.dispEvent = function (type, data, dataType) {
            if (data === void 0) { data = null; }
            if (dataType === void 0) { dataType = null; }
            if (this.dataEvent) {
                var fun = this.dataEvent[type];
                if (fun != null) {
                    var layoutEvent = new LayoutEvent;
                    layoutEvent.currentTarget = this;
                    layoutEvent.data = data;
                    layoutEvent.type = type;
                    layoutEvent.dataType = dataType;
                    if (fun["this"]) {
                        fun.apply(fun["this"], [layoutEvent]);
                    }
                    else {
                        fun(layoutEvent);
                    }
                }
            }
        };
        /**帧听事件*/
        LayoutContainer.prototype.addEvent = function (type, listener, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var s = this;
            if (s.dataEvent && s.dataEvent[type] == null) {
                listener["this"] = thisObj;
                s.dataEvent[type] = listener;
            }
        };
        /**删除事件*/
        LayoutContainer.prototype.removeEvent = function (type, listener) {
            var s = this;
            if (s.dataEvent && s.dataEvent[type]) {
                delete s.dataEvent[type];
            }
        };
        /**把自己从父级删除*/
        LayoutContainer.prototype.removeFromParent = function (value) {
            if (value === void 0) { value = false; }
            var s = this;
            var _parent = this.parent;
            if (value)
                s.dispose();
            if (_parent && _parent.contains(s))
                _parent.removeChild(s);
            _parent = null;
        };
        /**删除所有的*/
        LayoutContainer.prototype.removeChildAll = function (dispose) {
            if (dispose === void 0) { dispose = false; }
            while (this.numChildren > 0) {
                this.removeChildIndex(0, dispose);
            }
        };
        /**删除index层的*/
        LayoutContainer.prototype.removeChildIndex = function (index, dispose) {
            var s = this;
            if (index >= 0 || index < s.numChildren) {
                var basicContent = s.getChildAt(index);
                if (basicContent instanceof LayoutContainer) {
                    basicContent.removeFromParent(dispose);
                }
                else {
                    var display = this.getChildAt(index);
                    if (display.parent)
                        display.parent.removeChild(display);
                }
            }
        };
        /**销毁*/
        LayoutContainer.prototype.dispose = function () {
            var s = this;
            s.removeChildAll(true);
            s.dataEvent = null;
            s.stageWidth = null;
            s.stageHeight = null;
        };
        return LayoutContainer;
    }(DisplayObjectContainer));
    codeBase.LayoutContainer = LayoutContainer;
    __reflect(LayoutContainer.prototype, "codeBase.LayoutContainer");
    /**基本按钮： 正常、按下状态 */
    var BasicButton = (function (_super) {
        __extends(BasicButton, _super);
        function BasicButton(normal, down) {
            if (normal === void 0) { normal = null; }
            if (down === void 0) { down = null; }
            var _this = _super.call(this) || this;
            /**皮肤大小随字体大小变化 */
            _this.skinAutoScale = true;
            var s = _this;
            s.statusNormal = normal || Skin.buttonNormal;
            s.statusDown = down || Skin.buttonDown;
            s.skinContainer = new DisplayObjectContainer;
            s.addChild(s.skinContainer);
            //s.skinContainer.addChild(normal);
            //s.skinContainer.addChild(down);
            s.updateSkin(s.statusNormal);
            s.text = (new TextLabel).textField;
            s.addChild(s.text);
            _this.open();
            return _this;
        }
        BasicButton.prototype.open = function () {
            var s = this;
            s.close();
            s.touchEnabled = true;
            s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
            s.setGray(false);
        };
        BasicButton.prototype.close = function () {
            var s = this;
            s.touchEnabled = false;
            s.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
            if (s.stage)
                s.stage.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
        };
        BasicButton.prototype.closeAndSetGray = function () {
            var s = this;
            s.close();
            s.setGray(true);
        };
        BasicButton.prototype.setLabelPoint = function (x, y) {
            var s = this;
            // s.text.anchorOffsetX = 0;
            // s.text.anchorOffsetY = 0;
            s.text.x = x;
            s.text.y = y;
        };
        Object.defineProperty(BasicButton.prototype, "labelCircle", {
            set: function (value) {
                var s = this;
                s.text.text = value;
                s.skinAutoScale = false;
                s.text.x = s.text.y = 0;
                s.text.anchorOffsetX = s.text.textWidth >> 1;
                s.text.anchorOffsetY = s.text.textHeight >> 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicButton.prototype, "labelColor", {
            set: function (value) {
                this.text.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicButton.prototype, "label", {
            get: function () {
                return this.text.text;
            },
            set: function (value) {
                var s = this;
                s.text.text = value;
                //var width: number = this.text.width + 20;
                s.setSkinSize();
                s.setTextPosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicButton.prototype, "textFild", {
            get: function () {
                return this.text;
            },
            enumerable: true,
            configurable: true
        });
        /**设置富文字 {text:"string",style:{"size":50,"textColor":0}}*/
        BasicButton.prototype.setTextFlow = function (textFlow) {
            var s = this;
            s.text.textFlow = textFlow;
            s.setSkinSize();
            s.setTextPosition();
        };
        BasicButton.prototype.setSkinNormal = function () {
            var s = this;
            s.updateSkin(s.statusNormal);
        };
        BasicButton.prototype.setSkinDown = function () {
            var s = this;
            s.updateSkin(s.statusDown);
        };
        BasicButton.prototype.onTouch = function (e) {
            var s = this;
            if (!s.stage)
                return;
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                s.stage.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
                s.updateSkin(s.statusDown);
                s.dispEvent(LayoutEvent.CLICK);
            }
            else {
                s.stage.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
                s.updateSkin(s.statusNormal);
            }
        };
        Object.defineProperty(BasicButton.prototype, "textWidth", {
            get: function () {
                return this.text.width + 20;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicButton.prototype, "textHeight", {
            get: function () {
                return this.text.height + 20;
            },
            enumerable: true,
            configurable: true
        });
        BasicButton.prototype.setSkinSize = function () {
            var s = this;
            if (s.skinAutoScale && s.text.text != "") {
                var scale = s.textWidth / s.statusNormal.width;
                if (s.statusNormal instanceof Bitmap) {
                    s.statusNormal.width = s.textWidth;
                    s.statusDown.width = s.textWidth;
                }
                else {
                    s.statusNormal.scaleX = s.statusDown.scaleX = scale;
                }
                var height = s.textHeight;
                if (height >= s.statusNormal.height) {
                    scale = height / s.statusNormal.height;
                    if (s.statusNormal instanceof Bitmap) {
                        s.statusNormal.height = s.textHeight;
                        s.statusDown.height = s.textHeight;
                    }
                    else {
                        s.statusNormal.scaleY = s.statusDown.scaleY = scale;
                    }
                }
            }
        };
        BasicButton.prototype.setTextPosition = function () {
            var s = this;
            s.text.anchorOffsetX = s.text.width >> 1;
            s.text.anchorOffsetY = s.text.height >> 1;
            if (s.textWidth > s.statusNormal.width)
                s.text.x = s.textWidth >> 1;
            else
                s.text.x = s.statusNormal.width >> 1;
            if (s.textHeight > s.statusNormal.height)
                s.text.y = s.textHeight >> 1;
            else
                s.text.y = s.statusNormal.height >> 1;
        };
        BasicButton.prototype.updateSkin = function (skin) {
            var s = this;
            // skin.visible=true;
            // skin == s.statusDown? s.statusNormal.visible=false:s.statusDown.visible=false;
            s.skinContainer.removeChildren();
            s.skinContainer.addChild(skin);
        };
        /**设置可示对象是否为灰色 */
        BasicButton.prototype.setGray = function (isGray) {
            if (isGray) {
                this.filters = [new egret.ColorMatrixFilter([
                        0.3, 0.6, 0.08, 0, 0,
                        0.3, 0.6, 0.08, 0, 0,
                        0.3, 0.6, 0.08, 0, 0,
                        0, 0, 0, 1, 0
                    ])
                ];
            }
            else {
                this.filters = [];
            }
        };
        BasicButton.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.close();
        };
        return BasicButton;
    }(LayoutContainer));
    codeBase.BasicButton = BasicButton;
    __reflect(BasicButton.prototype, "codeBase.BasicButton", ["codeBase.IOnoff"]);
    /**多个皮肤按钮,构造函数的参数必须大于2个且必须是2的次方
     * 使用四个皮肤就可以模拟ToggleSwitch
    */
    var MoreSkinButton = (function (_super) {
        __extends(MoreSkinButton, _super);
        function MoreSkinButton(skins) {
            var _this = _super.call(this, skins[0], skins[1]) || this;
            _this._currentPage = 0;
            _this.skins = [];
            _this._toggleSwitch = false;
            _this.skins = skins;
            return _this;
        }
        /**更新到第几个按钮同时刷新皮肤 */
        MoreSkinButton.prototype.updatePage = function (value) {
            var s = this;
            s.currentPage = value;
            s.setSkinNormal();
        };
        Object.defineProperty(MoreSkinButton.prototype, "currentPage", {
            get: function () {
                return this._currentPage;
            },
            set: function (value) {
                var s = this;
                value = value * 2 == s.skins.length ? 0 : value;
                s._currentPage = value;
                s.statusNormal = s.skins[value * 2];
                s.statusDown = s.skins[(value * 2) + 1];
                s.setSkinSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MoreSkinButton.prototype, "toggleSwitch", {
            set: function (value) {
                this._toggleSwitch = value;
            },
            enumerable: true,
            configurable: true
        });
        MoreSkinButton.prototype.onTouch = function (e) {
            var s = this;
            if (e.type == egret.TouchEvent.TOUCH_END) {
                if (s._toggleSwitch) {
                    s.currentPage = 1 - s.currentPage;
                }
            }
            _super.prototype.onTouch.call(this, e);
        };
        return MoreSkinButton;
    }(BasicButton));
    codeBase.MoreSkinButton = MoreSkinButton;
    __reflect(MoreSkinButton.prototype, "codeBase.MoreSkinButton");
    var SwitchButton = (function (_super) {
        __extends(SwitchButton, _super);
        function SwitchButton() {
            var _this = this;
            var normal = Skin.switchOn;
            var down = Skin.switchOn;
            var normal2 = Skin.switchOff;
            var down2 = Skin.switchOff;
            var skins = [normal, down, normal2, down2];
            _this = _super.call(this, skins) || this;
            _this.toggleSwitch = true;
            return _this;
        }
        return SwitchButton;
    }(MoreSkinButton));
    codeBase.SwitchButton = SwitchButton;
    __reflect(SwitchButton.prototype, "codeBase.SwitchButton");
    var TextLabel = (function (_super) {
        __extends(TextLabel, _super);
        function TextLabel(str, c) {
            if (str === void 0) { str = ""; }
            if (c === void 0) { c = 0XFFFFFF; }
            var _this = _super.call(this) || this;
            _this._textFiled = new TextField;
            _this._textFiled.textAlign = egret.HorizontalAlign.LEFT;
            _this._textFiled.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this._textFiled.text = str;
            _this._textFiled.textColor = c;
            _this._textFiled.fontFamily = FONT.fontName;
            _this.addChild(_this._textFiled);
            return _this;
        }
        Object.defineProperty(TextLabel.prototype, "text", {
            set: function (value) {
                this._textFiled.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextLabel.prototype, "textField", {
            get: function () {
                return this._textFiled;
            },
            enumerable: true,
            configurable: true
        });
        return TextLabel;
    }(LayoutContainer));
    codeBase.TextLabel = TextLabel;
    __reflect(TextLabel.prototype, "codeBase.TextLabel");
    var BasicView = (function (_super) {
        __extends(BasicView, _super);
        function BasicView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BasicView.prototype.createText = function (x, y, s) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (s === void 0) { s = ""; }
            var text = (new TextLabel).textField;
            text.x = x;
            text.y = y;
            text.text = s;
            this.addChild(text);
            return text;
        };
        BasicView.prototype.createRect = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var sprite = LayoutUI.getRect(w, h, c, x, y);
            this.addChild(sprite);
            return sprite;
        };
        BasicView.prototype.createCircle = function (r, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var sprite = LayoutUI.getCircle(r, c, x, y);
            this.addChild(sprite);
            return sprite;
        };
        BasicView.prototype.createRectBySprite = function (s, w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            s.graphics.clear();
            s.graphics.beginFill(c);
            s.graphics.drawRect(x, y, w, h);
            s.graphics.endFill();
        };
        /**创建纯色背景 */
        BasicView.prototype.createBackground = function (c, a) {
            if (c === void 0) { c = 0; }
            if (a === void 0) { a = 1; }
            var s = this.createRect(this.stageWidth, this.stageHeight, c);
            s.alpha = a;
            s.touchEnabled = true; //用于阻止下层点击事件
            return s;
        };
        /**创建渐变色背景 */
        BasicView.prototype.createBgGradientFill = function (c1, c2) {
            if (c1 === void 0) { c1 = 0X017AC3; }
            if (c2 === void 0) { c2 = 0XDDDDDD; }
            var w = this.stageWidth;
            var h = this.stageHeight;
            var matrix = new egret.Matrix();
            matrix.createGradientBox(w, h, Math.PI / 2);
            var sprite = new Sprite;
            sprite.graphics.beginGradientFill(egret.GradientType.LINEAR, [c1, c2], [1, 1], [0, 255], matrix);
            sprite.graphics.drawRect(0, 0, w, h);
            this.addChild(sprite);
            return sprite;
        };
        return BasicView;
    }(LayoutContainer));
    codeBase.BasicView = BasicView;
    __reflect(BasicView.prototype, "codeBase.BasicView");
    /**基础的组件类*/
    var BasicComponent = (function (_super) {
        __extends(BasicComponent, _super);
        function BasicComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.items = [];
            _this.index = 0;
            return _this;
        }
        BasicComponent.prototype.addItem = function (item) {
            this.items.push(item);
        };
        BasicComponent.prototype.removeItem = function (item) {
            var s = this;
            var index = s.items.indexOf(item);
            if (index >= 0)
                s.items.splice(index, 1);
        };
        BasicComponent.prototype.hasItem = function (index) {
            var s = this;
            return s.items.length > 0 && (index >= 0 && index < s.items.length);
        };
        BasicComponent.prototype.getItem = function (index) {
            return this.items[index];
        };
        BasicComponent.prototype.getNextItem = function () {
            return this.items[this.index++];
        };
        BasicComponent.prototype.getIndexByItem = function (item) {
            return this.items.indexOf(item);
        };
        BasicComponent.prototype.reset = function () {
            this.index = 0;
        };
        BasicComponent.prototype.update = function () {
        };
        /**布局 type类型为横向或纵向，interval为对象间的间隔*/
        BasicComponent.prototype.layout = function (type, interval) {
            if (type === void 0) { type = LayoutConst.VERTICAL; }
            if (interval === void 0) { interval = 10; }
            var s = this;
            var item;
            var num = s.items.length;
            for (var i = 0; i < num; i++) {
                item = s.items[i];
                if (type == LayoutConst.VERTICAL) {
                    item.y = (item.height + interval) * i;
                }
                else {
                    item.x = (item.width + interval) * i;
                }
            }
        };
        /**销毁*/
        BasicComponent.prototype.dispose = function () {
            var s = this;
            s.reset();
            var item;
            while (s.hasItem(s.index)) {
                item = s.getItem(s.index);
                s.removeItem(item);
                if (item instanceof LayoutContainer) {
                    item.removeFromParent(true);
                }
            }
        };
        return BasicComponent;
    }(BasicView));
    codeBase.BasicComponent = BasicComponent;
    __reflect(BasicComponent.prototype, "codeBase.BasicComponent", ["codeBase.IItem", "codeBase.ILayout"]);
    /**提示警告框 手动关闭*/
    var AlertBar = (function (_super) {
        __extends(AlertBar, _super);
        function AlertBar(title) {
            if (title === void 0) { title = "提示或警告"; }
            var _this = _super.call(this) || this;
            _this.bgColor = Color.gray;
            _this.text = (new TextLabel).textField;
            _this.text.text = title;
            return _this;
        }
        /**加载到舞台之后调用 */
        AlertBar.prototype.render = function () {
            _super.prototype.render.call(this);
            this.initView();
        };
        AlertBar.prototype.initView = function () {
            var node = this.createBackground(0, 0.3);
            var tw = this.text.width;
            var th = this.text.height;
            var w = tw + 80;
            var h = th + 120;
            var x = (this.stageWidth - w) >> 1;
            var y = (this.stageHeight - h) >> 1;
            this.bg = new LayoutSprite;
            this.bg.type = LayoutConst.SHAPE_RECT_ROUND;
            this.bg.data = { w: w, h: h, c: this.bgColor, ew: 10, eh: 10 };
            this.bg.setBackground(0, 2);
            this.bg.x = x;
            this.bg.y = y;
            this.addChild(this.bg);
            var btn = new BasicButton;
            btn.label = "确 定";
            this.bg.addChild(btn);
            btn.x = (w - btn.width) >> 1;
            btn.y = this.text.y + th + 40;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.text.x = x + ((w - tw) >> 1);
            this.text.y = y + 20;
            this.addChild(this.text);
        };
        AlertBar.prototype.onClick = function (e) {
            this.removeFromParent(true);
            this.dispEvent(LayoutEvent.CLOSE);
        };
        Object.defineProperty(AlertBar.prototype, "color", {
            /**设置背景色 */
            set: function (value) {
                this.bgColor = value;
                if (this.bg)
                    this.bg.color = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        AlertBar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.bg = null;
            this.bgColor = null;
            this.text = null;
        };
        return AlertBar;
    }(BasicComponent));
    codeBase.AlertBar = AlertBar;
    __reflect(AlertBar.prototype, "codeBase.AlertBar");
    /**提示警告框 自动关闭*/
    var AlertAutoBar = (function (_super) {
        __extends(AlertAutoBar, _super);
        function AlertAutoBar(title, closeTime) {
            if (title === void 0) { title = "提示或警告"; }
            if (closeTime === void 0) { closeTime = 3; }
            var _this = _super.call(this, title) || this;
            _this.time = closeTime;
            return _this;
        }
        AlertAutoBar.prototype.initView = function () {
            var tw = this.text.width;
            var th = this.text.height;
            var w = tw + 20;
            var h = th + 20;
            var x = (this.stageWidth - w) >> 1;
            var y = (this.stageHeight - h) >> 1;
            this.bg = new LayoutSprite;
            this.bg.type = LayoutConst.SHAPE_RECT_ROUND;
            this.bg.data = { w: w, h: h, c: this.bgColor, ew: 10, eh: 10 };
            this.bg.setBackground(0, 2);
            this.bg.x = x;
            this.bg.y = y;
            this.addChild(this.bg);
            this.text.x = x + ((w - tw) >> 1);
            this.text.y = y + ((h - th) >> 1);
            this.addChild(this.text);
            this.alpha = 0;
            var ty = this.y - 50;
            Tween.get(this).to({ alpha: 1 }, 500).wait(this.time * 1000).to({ alpha: 0, y: ty }, 500).call(this.backCall, this);
        };
        AlertAutoBar.prototype.backCall = function () {
            Tween.removeTweens(this);
            this.removeFromParent(true);
            this.time = null;
            this.dispEvent(LayoutEvent.CLOSE);
        };
        AlertAutoBar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            Tween.removeTweens(this);
        };
        return AlertAutoBar;
    }(AlertBar));
    codeBase.AlertAutoBar = AlertAutoBar;
    __reflect(AlertAutoBar.prototype, "codeBase.AlertAutoBar");
    /**提示警告框 滚动显示*/
    var AlertRollBar = (function (_super) {
        __extends(AlertRollBar, _super);
        function AlertRollBar(title, bgWidth) {
            if (title === void 0) { title = "提示或警告"; }
            if (bgWidth === void 0) { bgWidth = 200; }
            var _this = _super.call(this, title) || this;
            _this.bgWidth = bgWidth;
            return _this;
        }
        AlertRollBar.prototype.initView = function () {
            var tw = this.text.width;
            var th = this.text.height;
            var w = this.bgWidth;
            var h = th + 20;
            var x = (this.stageWidth - w) >> 1;
            var y = 100;
            this.bg = new LayoutSprite;
            this.bg.type = LayoutConst.SHAPE_RECT;
            this.bg.data = { w: w, h: h, c: this.bgColor };
            this.bg.x = x;
            this.bg.y = y;
            this.addChild(this.bg);
            var m = LayoutUI.getRect(w, h, 0, x, y);
            this.addChild(m);
            this.bg.mask = m;
            this.text.x = w;
            this.text.y = 10;
            this.bg.addChild(this.text);
            var time = 2000 + this.text.text.length * 100;
            var tx = -tw;
            Tween.get(this.text).to({ x: tx }, time).call(this.backCall, this);
        };
        AlertRollBar.prototype.backCall = function () {
            Tween.removeTweens(this);
            Tween.removeTweens(this.text);
            this.removeFromParent(true);
            this.bgWidth = null;
            this.dispEvent(LayoutEvent.CLOSE);
        };
        return AlertRollBar;
    }(AlertBar));
    codeBase.AlertRollBar = AlertRollBar;
    __reflect(AlertRollBar.prototype, "codeBase.AlertRollBar");
    /**复选框按钮 */
    var CheckBoxBar = (function (_super) {
        __extends(CheckBoxBar, _super);
        function CheckBoxBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckBoxBar.prototype.addItemLabel = function (label, item) {
            if (item === void 0) { item = null; }
            if (item == null)
                item = Skin.getCheckBox(label);
            else
                item.label = label;
            this.addItem(item);
        };
        CheckBoxBar.prototype.addItem = function (item) {
            _super.prototype.addItem.call(this, item);
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(item);
        };
        CheckBoxBar.prototype.removeItem = function (item) {
            _super.prototype.removeItem.call(this, item);
            item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            item.removeFromParent(true);
        };
        CheckBoxBar.prototype.onClick = function (e) {
            var item = e.currentTarget;
            this.dispEvent(LayoutEvent.CHANGE);
        };
        Object.defineProperty(CheckBoxBar.prototype, "selectIndexs", {
            get: function () {
                var nums = [];
                for (var i = 0; i < this.items.length; i++) {
                    var btn = this.items[i];
                    if (btn.currentPage == 1)
                        nums.push(i);
                }
                return nums;
            },
            enumerable: true,
            configurable: true
        });
        return CheckBoxBar;
    }(BasicComponent));
    codeBase.CheckBoxBar = CheckBoxBar;
    __reflect(CheckBoxBar.prototype, "codeBase.CheckBoxBar");
    /**单选框按钮 */
    var RadioButtonBar = (function (_super) {
        __extends(RadioButtonBar, _super);
        function RadioButtonBar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isAutoLayout = false;
            return _this;
        }
        RadioButtonBar.prototype.addItemLabel = function (label, item) {
            if (item === void 0) { item = null; }
            if (item == null)
                item = Skin.getRodatioButton(label);
            else
                item.label = label;
            this.addItem(item);
        };
        RadioButtonBar.prototype.render = function () {
            this.update();
        };
        RadioButtonBar.prototype.update = function () {
            var item;
            if (this.isAutoLayout == true) {
                for (var i = 0; i < this.items.length; i++) {
                    item = this.items[i];
                    item.x = (item.width + 10) * i;
                }
            }
        };
        RadioButtonBar.prototype.onClick = function (e) {
            var item = e.currentTarget;
            this.selectIndex = this.items.indexOf(item);
            this.dispEvent(LayoutEvent.CHANGE);
        };
        Object.defineProperty(RadioButtonBar.prototype, "selectIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (index) {
                this._selectIndex = index;
                var item = this.items[index];
                this.items.map(setSkinNormal, this);
                function setSkinNormal(i) {
                    i.setSkinNormal();
                }
                item.setSkinDown();
            },
            enumerable: true,
            configurable: true
        });
        return RadioButtonBar;
    }(CheckBoxBar));
    codeBase.RadioButtonBar = RadioButtonBar;
    __reflect(RadioButtonBar.prototype, "codeBase.RadioButtonBar");
    /**选项栏组件 */
    var TabbarBar = (function (_super) {
        __extends(TabbarBar, _super);
        function TabbarBar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._selectIndex = 0;
            return _this;
        }
        TabbarBar.prototype.onClick = function (e) {
            var curr = e.currentTarget;
            this.selectItem(curr);
        };
        TabbarBar.prototype.selectItem = function (curr) {
            this.reset();
            while (this.hasItem(this.index)) {
                var item = this.getNextItem();
                item.currentPage = 0;
                item.setSkinNormal();
                item.open();
            }
            if (curr) {
                curr.close();
                curr.currentPage = 1;
                curr.setSkinNormal();
                this._selectIndex = this.items.indexOf(curr);
                this.dispEvent(LayoutEvent.CHANGE, this._selectIndex);
            }
        };
        Object.defineProperty(TabbarBar.prototype, "selectIndex", {
            get: function () { return this._selectIndex; },
            set: function (value) { this._selectIndex = value, this.selectItem(this.getItem(value)); },
            enumerable: true,
            configurable: true
        });
        return TabbarBar;
    }(CheckBoxBar));
    codeBase.TabbarBar = TabbarBar;
    __reflect(TabbarBar.prototype, "codeBase.TabbarBar");
})(codeBase || (codeBase = {}));
