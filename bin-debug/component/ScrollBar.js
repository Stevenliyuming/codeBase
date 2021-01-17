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
    /***滚动器，可以设置裁剪滚动的内容，分为横向和纵向滚动 */
    var ScrollBar = (function (_super) {
        __extends(ScrollBar, _super);
        /**
         * w:滚动容器宽
         * h:滚动容器高
         * content:滚动容器内容
         * align:容器滑动方向，水平和垂直滚动
         * bar:滚动容器侧边或者底部滚动条
         * barVisible:是否显示滚动条
         */
        function ScrollBar(w, h, content, align, sliderSKin, barVisible) {
            if (align === void 0) { align = codeBase.Style.VERTICAL; }
            if (sliderSKin === void 0) { sliderSKin = null; }
            if (barVisible === void 0) { barVisible = true; }
            var _this = _super.call(this) || this;
            _this.mouseEnable = false;
            _this.mouseOver = false;
            _this.mouseWheelMoveStep = 5;
            var s = _this;
            s.width = w;
            s.height = h;
            s.touchEnabled = true;
            s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTouch, s);
            s.startPos = new codeBase.Point;
            s.stPos = new codeBase.Point;
            s._contentPos = new egret.Point;
            s.content = content;
            s.alignType = align;
            s.sliderBarV = sliderSKin || codeBase.Skin.scrollBar;
            s.sliderBarV.alpha = 0;
            s.barVisible = barVisible;
            s.addChild(s.sliderBarV);
            s.sliderBarV.visible = barVisible;
            s.setSize(w, h);
            s.layout(align);
            return _this;
        }
        ScrollBar.prototype.onTouch = function (e) {
            var s = this;
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    s.stage.addEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
                    s.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouch, s);
                    s.stPos.x = e.stageX;
                    s.stPos.y = e.stageY;
                    s.startPos.x = e.stageX - s._contentPos.x;
                    s.startPos.y = e.stageY - s._contentPos.y;
                    s.hideShow(1);
                    s.startTime = egret.getTimer();
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    s.moveDo(e.stageX, e.stageY);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    s.stage.removeEventListener(egret.TouchEvent.TOUCH_END, s.onTouch, s);
                    s.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, s.onTouch, s);
                    s.hideShow(0, 100);
                    s.timeMove(e.stageX, e.stageY);
                    break;
            }
        };
        /**是否可以鼠标控制滚动 在滚动容器为垂直滚动的条件下才生效*/
        ScrollBar.prototype.setMouseWheelEnable = function (value) {
            var s = this;
            if (s.alignType == codeBase.Style.VERTICAL) {
                if (s.mouseEnable == value)
                    return;
                s.mouseEnable = value;
                if (s.mouseEnable) {
                    s.addMouseEvent();
                }
                else {
                    s.removeMouseEvent();
                }
            }
        };
        // public onMouseMove(evt:egret.TouchEvent) {
        // 	//console.log("onTouchMove");
        // 	let s = this;
        // 	s.doMove(evt.target, evt.stageX, evt.stageY);
        // }
        ScrollBar.prototype.addMouseEvent = function () {
            var s = this;
            //s.addEventListener(mouse.MouseEvent.MOUSE_OVER, s.onMouseMoveEvent, s);
            //s.addEventListener(mouse.MouseEvent.MOUSE_OUT, s.onMouseMoveEvent, s);
            s.addCanvasEventListener("mousewheel", s.onMouseWheel, s);
        };
        ScrollBar.prototype.removeMouseEvent = function () {
            var s = this;
            //s.removeEventListener(mouse.MouseEvent.MOUSE_OVER, s.onMouseMoveEvent, s);
            //s.removeEventListener(mouse.MouseEvent.MOUSE_OUT, s.onMouseMoveEvent, s);
            if (s.canvas && s.mouseWheelFun) {
                s.canvas.removeEventListener("mousewheel", s.mouseWheelFun);
            }
        };
        /**
         * 添加Canvas事件监听
         * 例如
         * canvas.addEventListener('mousemove',(evt: MouseEvent)=>{});
         */
        ScrollBar.prototype.addCanvasEventListener = function (type, fun, funObj) {
            var s = this;
            if (!s.canvas) {
                s.canvas = document.getElementsByTagName("CANVAS")[0];
            }
            s.mouseWheelFun = fun.bind(funObj);
            s.canvas.addEventListener(type, s.mouseWheelFun);
        };
        ScrollBar.prototype.onMouseMoveEvent = function (ev) {
            var s = this;
            //console.log(ev.type);
            if (ev.type == "mouseOver") {
                s.mouseOver = true;
            }
            else if (ev.type == "mouseOut") {
                s.mouseOver = false;
                //s.hideShow(0);
            }
        };
        ScrollBar.prototype.onMouseWheel = function (evt) {
            var s = this;
            var pos = s.globalToLocal(evt.x, evt.y);
            if (pos.x >= s.viewPort.x && pos.x <= s.viewPort.x + s.viewPort.width && pos.y >= s.viewPort.y && pos.y <= s.viewPort.y + s.viewPort.height) {
                s.mouseWheelMoveY(evt.deltaY);
                s.hideShow(1);
            }
            else {
                s.hideShow(0);
            }
        };
        //缓动动画
        ScrollBar.prototype.timeMove = function (x, y) {
            var s = this;
            var time = egret.getTimer() - s.startTime;
            if (time < 500) {
                var target = s._contentPos; //this._content;
                var maskRect = s.viewPort;
                codeBase.Tween.removeTweens(target);
                var dx = x - s.stPos.x;
                var dy = y - s.stPos.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                var value = (distance / time) * 100;
                var tw = codeBase.Tween.get(target, { loop: false, onChange: function () {
                        var rect = s._content.scrollRect;
                        rect.x = -s._contentPos.x;
                        rect.y = -s._contentPos.y;
                        s._content.scrollRect = rect;
                    }, onChangeObj: s });
                if (this.alignType == codeBase.Style.VERTICAL) {
                    var sign = dy > 0 ? 1 : -1;
                    value *= sign;
                    var h = target.y + value;
                    if (h > 0 && target.y + value > 0)
                        h = 0; //向下滑动
                    if (h < 0 && target.y + value < (maskRect.height - s._content.height))
                        h = maskRect.height - s._content.height; //向上滑动
                    tw.to({ y: h }, 400, codeBase.Ease.sineOut).call(s.setBarPos, s);
                }
                else {
                    var sign = dx > 0 ? 1 : -1;
                    value *= sign;
                    var w = target.x + value;
                    if (w > 0 && target.x + value > 0)
                        w = 0; //向右滑动
                    if (w < 0 && target.x + value < (maskRect.width - s._content.width))
                        w = maskRect.width - s._content.width; //向左滑动
                    tw.to({ x: w }, 400, codeBase.Ease.sineOut).call(s.setBarPos, s);
                }
            }
        };
        Object.defineProperty(ScrollBar.prototype, "isBarVisible", {
            set: function (value) {
                this.barVisible = value;
            },
            enumerable: true,
            configurable: true
        });
        ScrollBar.prototype.setBarPos = function () {
            var s = this;
            if (!s.barVisible)
                return;
            if (s.alignType == codeBase.Style.VERTICAL)
                s.sliderBarV.y = -s._content.y / (s._content.height - s.viewPort.height) * (s.viewPort.height - s.sliderBarV.height);
            else
                s.sliderBarV.x = -s._content.x / (s._content.width - s.viewPort.width) * (s.viewPort.width - s.sliderBarV.width);
        };
        ScrollBar.prototype.hideShow = function (alpha, time) {
            if (time === void 0) { time = 1000; }
            var s = this;
            if (!s.barVisible)
                return;
            if (s.sliderBarV.alpha == alpha)
                return;
            codeBase.Tween.removeTweens(s.sliderBarV);
            if (alpha == 1) {
                s.sliderBarV.alpha = 1;
            }
            else {
                var tw = codeBase.Tween.get(s.sliderBarV);
                tw.to({ alpha: alpha }, time);
            }
        };
        ScrollBar.prototype.moveDo = function (x, y) {
            var s = this;
            if (s.alignType == codeBase.Style.VERTICAL) {
                s.canMoveY(y);
            }
            else if (s.alignType == codeBase.Style.HORIZONTAL) {
                s.canMoveX(x);
            }
        };
        ScrollBar.prototype.canMoveX = function (x) {
            var s = this;
            var deltaWidth = s.viewPort.width - s._content.width;
            var xx = x - s.startPos.x;
            if (xx > deltaWidth && xx < 0) {
                s._contentPos.x = xx;
                var rect = s._content.scrollRect;
                rect.x = -xx;
                s._content.scrollRect = rect;
                s.sliderBarV.x = -xx / (s._content.width - s.viewPort.width) * (s.viewPort.width - s.sliderBarV.width);
            }
        };
        ScrollBar.prototype.canMoveY = function (y) {
            var s = this;
            var deltaHeight = s.viewPort.height - s._content.height;
            var yy = y - s.startPos.y;
            if (yy > deltaHeight && yy < 0) {
                s._contentPos.y = yy;
                var rect = s._content.scrollRect;
                rect.y = -yy;
                s._content.scrollRect = rect;
                s.sliderBarV.y = -yy / (s._content.height - s.viewPort.height) * (s.viewPort.height - s.sliderBarV.height);
            }
        };
        ScrollBar.prototype.mouseWheelMoveY = function (deltaY) {
            var s = this;
            var deltaHeight = s.viewPort.height - s._content.height;
            if (deltaHeight < 0) {
                var yy = s._contentPos.y;
                yy -= deltaY;
                if (yy < deltaHeight) {
                    yy = deltaHeight;
                }
                else if (yy > 0) {
                    yy = 0;
                }
                s._contentPos.y = yy;
                var rect = s._content.scrollRect;
                rect.y = -yy;
                s._content.scrollRect = rect;
                s.sliderBarV.y = -yy / (s._content.height - s.viewPort.height) * (s.viewPort.height - s.sliderBarV.height);
            }
        };
        ScrollBar.prototype.setScrollRect = function () {
            var s = this;
            if (s._content) {
                s._content.scrollRect = new egret.Rectangle(0, 0, s.width, s.height);
            }
        };
        ScrollBar.prototype.setSliderBarPos = function () {
            var s = this;
            s.sliderBarV.x = s.sliderBarV.y = 0;
            if (s.alignType == codeBase.Style.VERTICAL) {
                s.sliderBarV.x = s.viewPort.width; // + s.sliderBar.width;
            }
            else if (s.alignType == codeBase.Style.HORIZONTAL) {
                s.sliderBarV.y = s.viewPort.height; // - s.sliderBar.height;
            }
        };
        ScrollBar.prototype.layout = function (type, interval) {
            if (type === void 0) { type = codeBase.Style.VERTICAL; }
            if (interval === void 0) { interval = 0; }
            var s = this;
            s.alignType = type;
            if (s.alignType == codeBase.Style.HORIZONTAL) {
                s.setMouseWheelEnable(false);
            }
            s.setSliderBarPos();
            if (s.content) {
                s.content.x = s.content.y = 0;
            }
        };
        /**重置滚动容器 */
        ScrollBar.prototype.reset = function () {
            var s = this;
            s.layout(s.alignType);
        };
        ScrollBar.prototype.setSize = function (w, h) {
            var s = this;
            s.viewPort = codeBase.LayoutUI.getRect(w, h, codeBase.Color.white);
            s.addChildAt(s.viewPort, 0);
            s.viewPort.visible = false;
            s.setScrollRect();
            s.setSliderBarPos();
        };
        Object.defineProperty(ScrollBar.prototype, "content", {
            set: function (value) {
                var s = this;
                if (s._content == value)
                    return;
                if (s._content && s == s._content.parent) {
                    if (s._content instanceof codeBase.LayoutComponent)
                        s._content.removeFromParent(true);
                    else
                        s.removeChild(s._content);
                }
                s._content = value;
                s.addChild(s._content);
                s.setScrollRect();
            },
            enumerable: true,
            configurable: true
        });
        ScrollBar.prototype.sliderBarSkins = function (barV, barH) {
            if (barV === void 0) { barV = null; }
            if (barH === void 0) { barH = null; }
            var s = this;
            if (s.alignType == codeBase.Style.VERTICAL) {
                if (s.sliderBarV && s.sliderBarV != barV) {
                    if (s.contains(s.sliderBarV))
                        s.removeChild(s.sliderBarV);
                }
                s.sliderBarV = barV;
                if (s.sliderBarV) {
                    s.addChild(s.sliderBarV);
                }
            }
            else if (s.alignType == codeBase.Style.HORIZONTAL) {
                if (s.sliderBarH && s.sliderBarH != barH) {
                    if (s.contains(s.sliderBarV))
                        s.removeChild(s.sliderBarH);
                }
                s.sliderBarH = barH;
                if (s.sliderBarH) {
                    s.addChild(s.sliderBarH);
                }
            }
            s.setSliderBarPos();
        };
        return ScrollBar;
    }(codeBase.LayoutComponent));
    codeBase.ScrollBar = ScrollBar;
    __reflect(ScrollBar.prototype, "codeBase.ScrollBar", ["codeBase.ILayout"]);
})(codeBase || (codeBase = {}));
