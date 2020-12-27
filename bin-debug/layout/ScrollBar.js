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
        function ScrollBar(w, h, content, align, bar, barVisible) {
            if (align === void 0) { align = codeBase.LayoutConst.VERTICAL; }
            if (bar === void 0) { bar = null; }
            if (barVisible === void 0) { barVisible = true; }
            var _this = _super.call(this) || this;
            _this._contentPos = new egret.Point;
            _this.mouseEnable = false;
            _this.mouseOver = false;
            _this.mouseWheelMoveStep = 5;
            _this.skinBar = bar || codeBase.Skin.scrollBar;
            _this.skinBar.alpha = 0;
            _this.barVisible = barVisible;
            _this.addChild(_this.skinBar);
            _this.width = w;
            _this.height = h;
            if (!barVisible)
                _this.skinBar.visible = false;
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
            _this.startPos = new codeBase.Point;
            _this.stPos = new codeBase.Point;
            _this.content = content;
            _this.alignType = align;
            _this.setSize(w, h);
            _this.layout(align);
            return _this;
        }
        ScrollBar.prototype.onTouch = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.stPos.x = e.stageX;
                    this.stPos.y = e.stageY;
                    // let rect:egret.Rectangle = this._content.scrollRect;
                    // this.startPos.x = e.stageX - rect.x;
                    // this.startPos.y = e.stageY - rect.y;
                    this.startPos.x = e.stageX - this._contentPos.x;
                    this.startPos.y = e.stageY - this._contentPos.y;
                    this.hideShow(1);
                    this.startTime = egret.getTimer();
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.moveDo(e.stageX, e.stageY);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.hideShow(0, 100);
                    this.timeMove(e.stageX, e.stageY);
                    break;
            }
        };
        /**是否可以鼠标控制滚动 在滚动容器为垂直滚动的条件下才生效*/
        ScrollBar.prototype.setMouseWheelEnable = function (value) {
            var s = this;
            if (s.alignType == codeBase.LayoutConst.VERTICAL) {
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
            var bindFun = fun.bind(funObj);
            s.mouseWheelFun = bindFun;
            s.canvas.addEventListener(type, bindFun);
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
            if (pos.x >= s.maskRect.x && pos.x <= s.maskRect.x + s.maskRect.width && pos.y >= s.maskRect.y && pos.y <= s.maskRect.y + s.maskRect.height) {
                s.mouseWheelMoveY(evt.deltaY);
                s.hideShow(1);
            }
            else {
                s.hideShow(0);
            }
        };
        //缓动动画
        ScrollBar.prototype.timeMove = function (x, y) {
            var _this = this;
            var time = egret.getTimer() - this.startTime;
            if (time < 500) {
                var target = this._contentPos; //this._content;
                var maskRect = this.maskRect;
                codeBase.Tween.removeTweens(target);
                var dx = x - this.stPos.x;
                var dy = y - this.stPos.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                var value = (distance / time) * 100;
                var tw = codeBase.Tween.get(target, { loop: false, onChange: function () {
                        var rect = _this._content.scrollRect;
                        rect.x = -_this._contentPos.x;
                        rect.y = -_this._contentPos.y;
                        _this._content.scrollRect = rect;
                    }, onChangeObj: this });
                if (this.alignType == codeBase.LayoutConst.VERTICAL) {
                    var sign = dy > 0 ? 1 : -1;
                    value *= sign;
                    var h = target.y + value;
                    if (h > 0 && target.y + value > 0)
                        h = 0; //向下滑动
                    if (h < 0 && target.y + value < (maskRect.height - this._content.height))
                        h = maskRect.height - this._content.height; //向上滑动
                    tw.to({ y: h }, 400, codeBase.Ease.sineOut).call(this.setBarPos, this);
                }
                else {
                    var sign = dx > 0 ? 1 : -1;
                    value *= sign;
                    var w = target.x + value;
                    if (w > 0 && target.x + value > 0)
                        w = 0; //向右滑动
                    if (w < 0 && target.x + value < (maskRect.width - this._content.width))
                        w = maskRect.width - this._content.width; //向左滑动
                    tw.to({ x: w }, 400, codeBase.Ease.sineOut).call(this.setBarPos, this);
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
            if (s.alignType == codeBase.LayoutConst.VERTICAL)
                s.skinBar.y = -s._content.y / (s._content.height - s.maskRect.height) * (s.maskRect.height - s.skinBar.height);
            else
                s.skinBar.x = -s._content.x / (s._content.width - s.maskRect.width) * (s.maskRect.width - s.skinBar.width);
        };
        ScrollBar.prototype.hideShow = function (alpha, time) {
            if (time === void 0) { time = 1000; }
            if (!this.barVisible)
                return;
            if (this.skinBar.alpha == alpha)
                return;
            codeBase.Tween.removeTweens(this.skinBar);
            if (alpha == 1) {
                this.skinBar.alpha = 1;
            }
            else {
                var tw = codeBase.Tween.get(this.skinBar);
                tw.to({ alpha: alpha }, time);
            }
        };
        ScrollBar.prototype.moveDo = function (x, y) {
            var s = this;
            if (s.alignType == codeBase.LayoutConst.VERTICAL) {
                s.canMoveY(y);
            }
            else if (s.alignType == codeBase.LayoutConst.HORIZONTAL) {
                s.canMoveX(x);
            }
        };
        ScrollBar.prototype.canMoveX = function (x) {
            var s = this;
            var deltaWidth = s.maskRect.width - s._content.width;
            var xx = x - s.startPos.x;
            if (xx > deltaWidth && xx < 0) {
                s._contentPos.x = xx;
                var rect = s._content.scrollRect;
                rect.y = -xx;
                s._content.scrollRect = rect;
                s.skinBar.x = -xx / (s._content.width - s.maskRect.width) * (s.maskRect.width - s.skinBar.width);
            }
        };
        ScrollBar.prototype.canMoveY = function (y) {
            var s = this;
            var deltaHeight = s.maskRect.height - s._content.height;
            var yy = y - s.startPos.y;
            if (yy > deltaHeight && yy < 0) {
                s._contentPos.y = yy;
                var rect = s._content.scrollRect;
                rect.y = -yy;
                s._content.scrollRect = rect;
                s.skinBar.y = -yy / (s._content.height - s.maskRect.height) * (s.maskRect.height - s.skinBar.height);
            }
        };
        ScrollBar.prototype.mouseWheelMoveY = function (deltaY) {
            var s = this;
            var deltaHeight = s.maskRect.height - s._content.height;
            if (deltaHeight < 0) {
                // let rect:egret.Rectangle = s._content.scrollRect;
                // let yy = rect.y;
                // yy += deltaY;
                // if(yy > Math.abs(deltaHeight)) {
                // 	yy = deltaHeight;
                // } else if(yy < 0) {
                // 	yy = 0;
                // }
                // rect.y = yy;
                // s._content.scrollRect = rect;
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
                s.skinBar.y = -yy / (s._content.height - s.maskRect.height) * (s.maskRect.height - s.skinBar.height);
            }
        };
        ScrollBar.prototype.setMask = function () {
            // if (this.maskRect != null && this._content != null) {
            // 	this._content.mask = this.maskRect;
            // }
            if (this._content) {
                this._content.scrollRect = new egret.Rectangle(0, 0, this.width, this.height);
            }
        };
        ScrollBar.prototype.setSkinBarPos = function () {
            this.skinBar.x = this.skinBar.y = 0;
            if (this.alignType == codeBase.LayoutConst.VERTICAL) {
                this.skinBar.x = this.maskRect.width - this.skinBar.width;
            }
            else if (this.alignType == codeBase.LayoutConst.HORIZONTAL) {
                this.skinBar.y = this.maskRect.height - this.skinBar.height;
            }
        };
        ScrollBar.prototype.layout = function (type, interval) {
            if (type === void 0) { type = codeBase.LayoutConst.VERTICAL; }
            if (interval === void 0) { interval = 0; }
            var s = this;
            s.alignType = type;
            if (s.alignType == codeBase.LayoutConst.HORIZONTAL) {
                s.setMouseWheelEnable(false);
            }
            s.setSkinBarPos();
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
            this.maskRect = codeBase.LayoutUI.getRect(w, h, codeBase.Color.white);
            this.addChildAt(this.maskRect, 0);
            this.maskRect.visible = false;
            this.setMask();
            this.setSkinBarPos();
        };
        Object.defineProperty(ScrollBar.prototype, "content", {
            set: function (value) {
                this._content = value;
                this.addChild(this._content);
                this.setMask();
            },
            enumerable: true,
            configurable: true
        });
        return ScrollBar;
    }(codeBase.LayoutContainer));
    codeBase.ScrollBar = ScrollBar;
    __reflect(ScrollBar.prototype, "codeBase.ScrollBar", ["codeBase.ILayout"]);
})(codeBase || (codeBase = {}));
