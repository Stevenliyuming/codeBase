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
     * 橡皮擦擦除效果 使用此效果比较消耗性能
     */
    var MaskEraser = (function (_super) {
        __extends(MaskEraser, _super);
        function MaskEraser(touchAble) {
            if (touchAble === void 0) { touchAble = false; }
            var _this = _super.call(this) || this;
            _this.size = 100;
            // 创建一个位图的反遮罩
            _this.rect = new egret.Rectangle;
            _this.touchEnabled = touchAble;
            return _this;
            //this.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        }
        MaskEraser.prototype.show = function (pr, px, py, eraseImg) {
            var s = this;
            s.eraseImageTexture = eraseImg;
            s.x = px;
            s.y = py;
            pr.addChild(s);
            s.onAddedToStage(null);
        };
        MaskEraser.prototype.onAddedToStage = function (event) {
            var s = this;
            s.eraseImg = new egret.Bitmap(s.eraseImageTexture);
            s.addChild(s.eraseImg);
            s.width = s.eraseImg.width;
            s.height = s.eraseImg.height;
            s.eraserSp = new egret.Sprite;
            s.addChild(s.eraserSp);
            //去除圆角中的黑边
            s.eraserSp.visible = false;
            s.renderTexture = new egret.RenderTexture();
            // 遮罩图
            s._bitmapMask = new egret.Bitmap();
            // 将原来的遮罩图的混合模式设置为擦除
            s._bitmapMask.blendMode = egret.BlendMode.ERASE;
            //绘制一个黑色的Sprite作为反遮罩
            s._reverseMask = new egret.Sprite();
            s._reverseMask.graphics.beginFill(0, 1);
            s._reverseMask.graphics.drawRect(0, 0, s.width, s.height);
            s._reverseMask.graphics.endFill();
            // 把上面的遮罩加进黑色的Sprite作为反遮罩
            s._reverseMask.addChild(s._bitmapMask);
            // 创建一个RenderTexture，把反遮罩绘制上去
            s.renderTex = new egret.RenderTexture();
            s.reverseMask = new egret.Bitmap();
            // 添加反遮罩位图对象
            s.addChild(s.reverseMask);
            if (s.touchEnabled) {
                s.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.onTapBegin, s);
                s.addEventListener(egret.TouchEvent.TOUCH_END, s.onTapEnd, s);
            }
        };
        /** 手指按下开始擦除
         * px 手指全局x坐标
         * py 手指全局y坐标
        */
        MaskEraser.prototype.controlStart = function (px, py) {
            var s = this;
            s.startPoint = s.eraserSp.globalToLocal(px, py);
            s.clamErasePoint();
            s.eraserSp.graphics.lineStyle(s.size, 0x0);
            s.eraserSp.graphics.moveTo(s.startPoint.x, s.startPoint.y);
            s.eraserSp.graphics.lineTo(s.startPoint.x, s.startPoint.y);
            s.createReverseMask2();
        };
        /** 跟随手指坐标移动擦除
         * px 手指全局x坐标
         * py 手指全局y坐标
        */
        MaskEraser.prototype.controlMove = function (px, py) {
            var s = this;
            if (!s.startPoint) {
                s.controlStart(px, py);
                return;
            }
            s.movePoint = s.eraserSp.globalToLocal(px, py);
            s.clamErasePoint();
            if (s.movePoint.x > (s.eraseImg.x + s.eraseImg.width)
                || s.movePoint.x < s.eraseImg.x
                || s.movePoint.y > (s.eraseImg.y + s.eraseImg.height)
                || s.movePoint.y < s.eraseImg.y)
                return;
            s.eraserSp.graphics.lineTo(s.movePoint.x, s.movePoint.y);
            s.createReverseMask2();
        };
        MaskEraser.prototype.onTapBegin = function (e) {
            var s = this;
            s.controlStart(e.stageX, e.stageY);
            if (!s.hasEventListener(egret.TouchEvent.TOUCH_MOVE))
                s.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.mouseMove, s);
        };
        MaskEraser.prototype.mouseMove = function (e) {
            var s = this;
            s.controlMove(e.stageX, e.stageY);
        };
        MaskEraser.prototype.onTapEnd = function (e) {
            if (this.hasEventListener(egret.TouchEvent.TOUCH_MOVE))
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        };
        MaskEraser.prototype.clamErasePoint = function () {
            var s = this;
            //开始擦除位置
            if (s.startPoint) {
                if (s.startPoint.x > s.width - s.size / 2) {
                    s.startPoint.x = s.width - s.size / 2;
                }
                if (s.startPoint.x < s.size / 2) {
                    s.startPoint.x = s.size / 2;
                }
                if (s.startPoint.y > s.height - s.size / 2) {
                    s.startPoint.y = s.height - s.size / 2;
                }
                if (s.startPoint.y < s.size / 2) {
                    s.startPoint.y = s.size / 2;
                }
            }
            //移动擦除位置
            if (s.movePoint) {
                if (s.movePoint.x > s.width - s.size / 2) {
                    s.movePoint.x = s.width - s.size / 2;
                }
                if (s.movePoint.x < s.size / 2) {
                    s.movePoint.x = s.size / 2;
                }
                if (s.movePoint.y > s.height - s.size / 2) {
                    s.movePoint.y = s.height - s.size / 2;
                }
                if (s.movePoint.y < s.size / 2) {
                    s.movePoint.y = s.size / 2;
                }
            }
        };
        MaskEraser.prototype.createReverseMask2 = function () {
            var s = this;
            // 遮罩图Texture
            s.rect.setTo(0, 0, s.width, s.height);
            s.renderTexture.drawToTexture(s.eraserSp, s.rect); //new egret.Rectangle(0, 0, s.width, s.height));
            s._bitmapMask.texture = s.renderTexture;
            // RenderTexture，把反遮罩绘制上去
            s.renderTex.drawToTexture(s._reverseMask);
            // 得到最终的反遮罩位图对象
            s.reverseMask.texture = s.renderTex;
            if (!s.mask) {
                s.mask = s.reverseMask;
            }
        };
        return MaskEraser;
    }(egret.DisplayObjectContainer));
    codeBase.MaskEraser = MaskEraser;
    __reflect(MaskEraser.prototype, "codeBase.MaskEraser");
})(codeBase || (codeBase = {}));
