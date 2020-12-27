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
     * 卡片正面和背面旋转显示
     */
    var FlippingCard = (function (_super) {
        __extends(FlippingCard, _super);
        /**
         * posSide 正面
         * negSide 背面
         */
        function FlippingCard(posSide, negSide) {
            var _this = _super.call(this) || this;
            _this.animateTime = 600.0;
            _this._positive = true;
            var s = _this;
            s.texture = posSide;
            s.posSide = posSide;
            s.negSide = negSide;
            s.touchEnabled = true;
            s.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onTouch, s);
            //顶点着色器
            var vertex = "\n            attribute vec2 aVertexPosition;\n            attribute vec2 aTextureCoord;\n            attribute vec2 aColor;\n\n            uniform vec2 projectionVector;\n\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n\n            const vec2 center = vec2(-1.0, 1.0);\n\n            void main(void) {\n                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n                vTextureCoord = aTextureCoord;\n                vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n            }\n        ";
            //面片着色器
            var fragment = "\n            precision lowp float;\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n            uniform sampler2D uSampler;\n\n            uniform float time;\n            uniform float duration;\n            uniform float max;\n\n            void main() {\n                vec2 uv = vTextureCoord.xy;\n                vec2 texCoord = uv;\n                float scale = max;\n                float angle = time / duration * 3.1416;\n                float scaletime = duration * 0.2;\n\n                if(time < scaletime) scale = time / scaletime * (max - 1.0) + 1.0;\n                if(time > duration - scaletime) scale = (duration - time) / scaletime * (max - 1.0) + 1.0;\n\n                if(time > duration / 2.0) angle = (duration - time) / duration * 3.1416;\n                float direct = 1.0;\n                if(time > duration / 2.0) direct = -1.0;\n                texCoord.y = uv.y + (uv.y - 0.5) * sin(angle) * 0.5 * (uv.x - 0.5) * direct;\n                \n                if(uv.x > 0.5) texCoord.x = (uv.x - 0.5) / cos(angle) + 0.5;\n                else texCoord.x = 0.5 - (0.5 - uv.x) / cos(angle);\n\n                texCoord.x = (texCoord.x - 0.5) / scale + 0.5;\n                texCoord.y = (texCoord.y - 0.5) / scale + 0.5;\n\n                gl_FragColor = texture2D(uSampler, texCoord);\n            }\n        ";
            //3d翻转自定义滤镜
            s.customFilter = new egret.CustomFilter(vertex, fragment, {
                time: 0,
                duration: s.animateTime,
                max: 1.1
            });
            s.customFilter.padding = s.width * 0.3;
            s.filters = [];
            return _this;
        }
        Object.defineProperty(FlippingCard.prototype, "positive", {
            set: function (val) {
                var s = this;
                s._positive = val;
                s.texture = val ? s.posSide : s.negSide;
            },
            enumerable: true,
            configurable: true
        });
        FlippingCard.prototype.onTouch = function (e) {
            var s = this;
            s.touchEnabled = false;
            s.startTime = Date.now();
            s.startFace = s._positive;
            s.addEventListener(egret.Event.ENTER_FRAME, s.update, s);
            s.filters = [s.customFilter];
        };
        FlippingCard.prototype.update = function () {
            var s = this;
            var total = Date.now() - s.startTime;
            if (total > s.animateTime) {
                s.removeEventListener(egret.Event.ENTER_FRAME, s.update, s);
                s.filters = [];
                s.touchEnabled = true;
                return false;
            }
            if (total > s.animateTime / 2 && s._positive == s.startFace)
                s.positive = (!s.startFace);
            s.customFilter.uniforms.time = total;
        };
        return FlippingCard;
    }(egret.Bitmap));
    codeBase.FlippingCard = FlippingCard;
    __reflect(FlippingCard.prototype, "codeBase.FlippingCard");
})(codeBase || (codeBase = {}));
