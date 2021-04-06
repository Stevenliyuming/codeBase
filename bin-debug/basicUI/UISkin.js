var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**皮肤
     * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆角高
    */
    var UISkin = (function () {
        function UISkin() {
        }
        Object.defineProperty(UISkin, "randomRect", {
            /**随机色的矩形与圆 */
            get: function () { return UISkin.getRect(60, 60, codeBase.UIColor.random); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "randomCircle", {
            get: function () { return UISkin.getCircle(50, codeBase.UIColor.random); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "pointNormal", {
            // /**默认点 */
            get: function () { return UISkin.getCircle(6, codeBase.UIColor.black); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "pointDown", {
            get: function () { return UISkin.getCircle(6, codeBase.UIColor.gray); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "buttonNormal", {
            /**默认按钮 */
            get: function () { return UISkin.getRect(60, 60, codeBase.UIColor.skinNormal); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "buttonDown", {
            get: function () { return UISkin.getRect(60, 60, codeBase.UIColor.skinDown); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "radioOff", {
            /**默认单选框 */
            get: function () { return UISkin.getRadioCircle(codeBase.UIColor.white, codeBase.UIColor.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "radioOn", {
            get: function () { return UISkin.getRadioCircle(codeBase.UIColor.white, codeBase.UIColor.black, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "checkBoxOff", {
            /**默认复选框 */
            get: function () { return UISkin.getCheckBoxRect(codeBase.UIColor.white, codeBase.UIColor.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "checkBoxOn", {
            get: function () { return UISkin.getCheckBoxRect(codeBase.UIColor.white, codeBase.UIColor.black, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "checkBoxDisabel", {
            get: function () { return UISkin.getCheckBoxRect(codeBase.UIColor.gray, codeBase.UIColor.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "switchOff", {
            /**默认开关 */
            get: function () { return UISkin.getSwitch(codeBase.UIColor.skinNormal, codeBase.UIColor.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "switchOn", {
            get: function () { return UISkin.getSwitch(codeBase.UIColor.skinNormal, codeBase.UIColor.white, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(UISkin, "progressBackground", {
            /**默认进度条 */
            get: function () { return UISkin.getRect(300, 20, codeBase.UIColor.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "progressSkin", {
            get: function () { return UISkin.getRect(300, 20, codeBase.UIColor.skinDown); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "sliderBackground", {
            /**默认滑动器 */
            get: function () { return UISkin.getRect(300, 10, codeBase.UIColor.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "sliderSkin", {
            get: function () { return UISkin.getRect(300, 10, codeBase.UIColor.skinDown); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "sliderBar", {
            get: function () { return UISkin.getCircle(15, codeBase.UIColor.white); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "scrollBar", {
            /**默认滚动条 */
            get: function () { return UISkin.getRect(10, 10, codeBase.UIColor.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "pnBarPrevNormal", {
            /**上下页切换组件 */
            get: function () { return UISkin.getPolygon(3, 20, codeBase.UIColor.skinNormal, 180); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "pnBarPrevDown", {
            get: function () { return UISkin.getPolygon(3, 20, codeBase.UIColor.skinDown, 180); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "pnBarNextNormal", {
            get: function () { return UISkin.getPolygon(3, 20, codeBase.UIColor.skinNormal); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UISkin, "pnBarNextDown", {
            get: function () { return UISkin.getPolygon(3, 20, codeBase.UIColor.skinDown); },
            enumerable: true,
            configurable: true
        });
        /**得到矩形框*/
        UISkin.getLineRect = function (w, h, c, s, x, y) {
            if (c === void 0) { c = 0; }
            if (s === void 0) { s = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var node = new codeBase.Sprite();
            node.graphics.lineStyle(s, c);
            node.graphics.drawRect(x, y, w, h);
            node.graphics.endFill();
            return node;
        };
        /**得到圆形框*/
        UISkin.getLineCircle = function (r, c, s, x, y) {
            if (c === void 0) { c = 0; }
            if (s === void 0) { s = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var node = new codeBase.Sprite();
            node.graphics.lineStyle(s, c);
            node.graphics.drawCircle(x, y, r);
            node.graphics.endFill();
            return node;
        };
        /**得到渐变矩形 a为角度偏移率0,0.5,1,2分别为四个正方向*/
        UISkin.getMatrixRect = function (w, h, c1, c2, a) {
            if (c1 === void 0) { c1 = 0; }
            if (c2 === void 0) { c2 = 0; }
            if (a === void 0) { a = 0; }
            var node = new codeBase.Sprite();
            var matrix = new egret.Matrix();
            matrix.createGradientBox(w, h, Math.PI * a, 0, 0);
            node.graphics.beginGradientFill(egret.GradientType.LINEAR, [c1, c2], [1, 1], [0, 255], matrix);
            node.graphics.drawRect(0, 0, w, h);
            node.graphics.endFill();
            return node;
        };
        /**得到矩形*/
        UISkin.getRect = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new codeBase.Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawRect(x, y, w, h);
            s.graphics.endFill();
            return s;
        };
        /**得到矩形中间带一个X*/
        UISkin.getRectAndX = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = this.getRect(w, h, c, x, y);
            s.addChild(this.getX(w, h, c, 1, x, y));
            return s;
        };
        /**得到一个X*/
        UISkin.getX = function (w, h, c, s, x, y) {
            if (c === void 0) { c = 0; }
            if (s === void 0) { s = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var container = new codeBase.Sprite;
            var l1 = new codeBase.Sprite;
            l1.graphics.lineStyle(s, c);
            l1.graphics.moveTo(0, 0);
            l1.graphics.lineTo(w, h);
            var l2 = new codeBase.Sprite;
            l2.graphics.lineStyle(s, c);
            l2.graphics.moveTo(w, 0);
            l2.graphics.lineTo(0, h);
            container.addChild(l1);
            container.addChild(l2);
            return container;
        };
        /**得到圆角矩形*/
        UISkin.getRoundRect = function (w, h, c, ew, eh, x, y) {
            if (c === void 0) { c = 0; }
            if (ew === void 0) { ew = 5; }
            if (eh === void 0) { eh = 5; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new codeBase.Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawRoundRect(x, y, w, h, ew, eh);
            s.graphics.endFill();
            return s;
        };
        /**得到圆形*/
        UISkin.getCircle = function (r, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new codeBase.Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawCircle(x, y, r);
            s.graphics.endFill();
            return s;
        };
        /**得到多边形,side边数,rotation角度*/
        UISkin.getPolygon = function (side, r, c, rotation) {
            if (side === void 0) { side = 3; }
            if (r === void 0) { r = 10; }
            if (c === void 0) { c = 0; }
            if (rotation === void 0) { rotation = 0; }
            var s = new codeBase.Sprite;
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
        UISkin.getArrowRoundRect = function (w, h, rc, pc, rotation) {
            if (pc === void 0) { pc = 0; }
            if (rotation === void 0) { rotation = 0; }
            var s = new codeBase.Sprite;
            s.addChild(this.getRoundRect(w, h, rc));
            var p = this.getPolygon(3, w / 3, pc, 30 + rotation);
            p.x = s.width >> 1;
            p.y = s.height >> 1;
            s.addChild(p);
            return s;
        };
        /**得到滚动条的bar*/
        UISkin.getScrollLineBar = function (w, h, c) {
            var s = new codeBase.Sprite;
            var _h = h / 3;
            for (var i = 0; i < 3; i++) {
                var r = this.getRect(w, 1, c, 0, i * _h);
                s.addChild(r);
            }
            return s;
        };
        /**得到圆角矩形-加*/
        UISkin.getAddRoundRect = function (w, h, c) {
            var s = new codeBase.Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r1 = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            var r2 = this.getRect(2, h / 2, 0, w / 2 - 1, h / 4);
            s.addChild(r1);
            s.addChild(r2);
            return s;
        };
        /**得到圆角矩形-减*/
        UISkin.getRemoveRoundRect = function (w, h, c) {
            var s = new codeBase.Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            s.addChild(r);
            return s;
        };
        /**得到带文字的圆角方形*/
        UISkin.getRoundRectText = function (w, h, c, str) {
            if (str === void 0) { str = "click"; }
            var s = new codeBase.Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var text = new codeBase.TextField;
            text.name = "text";
            text.text = str;
            text.x = (s.width - text.width) >> 1;
            text.y = (s.height - text.height) >> 1;
            s.addChild(text);
            return s;
        };
        /**得到矩形-switchButton bc背景颜色，gc钩选的颜色,type为0是没有钩 为1是有钩*/
        UISkin.getSwitch = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var node = UISkin.getRoundRect(80, 50, bc, 60, 60);
            node.addChild(UISkin.getCircle(22, gc, type == 0 ? 25 : 55, 25));
            return node;
        };
        /**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
        UISkin.getCheckBoxRect = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var s = new codeBase.Sprite;
            s.addChild(this.getRect(40, 40, bc));
            if (type == 1) {
                var r = new codeBase.Sprite;
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
        UISkin.getRadioCircle = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var s = new codeBase.Sprite;
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
        UISkin.getGridding = function (rect, c) {
            if (c === void 0) { c = 0; }
            var s = new codeBase.Sprite;
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
        UISkin.getHeart = function (r, c) {
            if (r === void 0) { r = 15; }
            if (c === void 0) { c = 0XFF0000; }
            var s = new codeBase.Sprite;
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
        return UISkin;
    }());
    codeBase.UISkin = UISkin;
    __reflect(UISkin.prototype, "codeBase.UISkin");
})(codeBase || (codeBase = {}));
