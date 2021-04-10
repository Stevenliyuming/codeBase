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
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Texture;
    }(egret.Texture));
    codeBase.Texture = Texture;
    __reflect(Texture.prototype, "codeBase.Texture");
    ;
    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        function RenderTexture() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RenderTexture;
    }(egret.RenderTexture));
    codeBase.RenderTexture = RenderTexture;
    __reflect(RenderTexture.prototype, "codeBase.RenderTexture");
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
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Event;
    }(egret.Event));
    codeBase.Event = Event;
    __reflect(Event.prototype, "codeBase.Event");
    ;
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        function TouchEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TouchEvent;
    }(egret.TouchEvent));
    codeBase.TouchEvent = TouchEvent;
    __reflect(TouchEvent.prototype, "codeBase.TouchEvent");
    ;
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
})(codeBase || (codeBase = {}));
