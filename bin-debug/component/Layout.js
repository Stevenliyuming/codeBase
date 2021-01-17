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
        Object.defineProperty(Skin, "switchOff", {
            // /**默认点 */
            // public static get pointNormal(): Sprite { return LayoutUI.getCircle(6, Color.black) };
            // public static get pointDown(): Sprite { return LayoutUI.getCircle(6, Color.gray) };
            // /**默认按钮 */
            // public static get buttonNormal(): Sprite { return LayoutUI.getRect(60, 60, Color.skinNormal) };
            // public static get buttonDown(): Sprite { return LayoutUI.getRect(60, 60, Color.skinDown) };
            // /**默认单选框 */
            // public static get radioOff(): Sprite { return LayoutUI.getRadioCircle(Color.white, Color.white) };
            // public static get radioOn(): Sprite { return LayoutUI.getRadioCircle(Color.white, Color.black, 1) };
            // /**默认复选框 */
            // public static get checkBoxOff(): Sprite { return LayoutUI.getCheckBoxRect(Color.white, Color.white) };
            // public static get checkBoxOn(): Sprite { return LayoutUI.getCheckBoxRect(Color.white, Color.black, 1) };
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
        // /**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
        // public static getCheckBoxRect(bc: number = 0XFFFFFF, gc: number = 0, type: number = 0): Sprite {
        // 	var s: Sprite = new Sprite;
        // 	s.addChild(this.getRect(40, 40, bc));
        // 	if (type == 1) {
        // 		var r: Sprite = new Sprite;
        // 		r.graphics.beginFill(gc);
        // 		r.graphics.moveTo(0, 20);
        // 		r.graphics.lineTo(20, 36); r.graphics.lineTo(44, 8); r.graphics.lineTo(36, 0); r.graphics.lineTo(20, 18);
        // 		r.graphics.lineTo(12, 8); r.graphics.lineTo(0, 20);
        // 		s.addChild(r);
        // 	}
        // 	return s;
        // }
        // /**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
        // public static getRadioCircle(bc: number = 0XFFFFFF, gc: number = 0, type: number = 0): Sprite {
        // 	var s: Sprite = new Sprite;
        // 	s.addChild(this.getCircle(16, bc, 16, 16));
        // 	s.graphics.lineStyle(1, 0);
        // 	if (type == 1) {
        // 		var r: Sprite = this.getCircle(8, gc, 16, 16)
        // 		s.addChild(r);
        // 	}
        // 	return s;
        // }
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
})(codeBase || (codeBase = {}));
