var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 屏幕切换效果
     */
    var ScreenSwitch = (function () {
        /**
         * 屏幕切换类型 1 -> 卷帘特效 2-> 左右切换移动 3 -> 直接翻 4-> 旋转掉落 5-> 随机一种
         * txNumber 总的分割小图数
         * XNumber 水平方向上分割的小图数
         */
        function ScreenSwitch(switchType, time, callFun, funObj, txNumber, XNumber) {
            if (time === void 0) { time = 1000; }
            // 当前小截图数量
            this.curNumber = 0;
            // 分割的小图容器
            this.gridGroup = new egret.Sprite;
            //切换时间
            this.switchTime = 1000;
            var s = this;
            s.switchType = switchType || 5;
            s.txNumber = txNumber || 20;
            s.XNumber = XNumber || 5;
            s.callFun = callFun;
            s.funObj = funObj;
            s.switchTime = time;
            s.switchScreen();
        }
        ScreenSwitch.prototype.switchScreen = function () {
            var s = this;
            // 获取当前舞台大小 用以创建截图Bitmap
            var stage = egret.MainContext.instance.stage;
            var stageWidth = stage.stageWidth;
            var stageHeight = stage.stageHeight;
            s.gridGroup.width = stageWidth;
            s.gridGroup.height = stageHeight;
            s.gridGroup.touchEnabled = false;
            s.gridGroup.touchChildren = false;
            stage.addChild(s.gridGroup);
            // 由小截图总数量和横向截图数决定纵向截图数
            var YNumber = s.txNumber / s.XNumber;
            for (var i = 0; i < s.txNumber; i++) {
                // 计算每个小截图的xy及宽高
                var _mcW = stageWidth / s.XNumber;
                var _mcH = stageHeight / YNumber;
                var _mcX = i % s.XNumber * _mcW;
                var _mcY = Math.floor(i / s.XNumber) * _mcH;
                // 创建截图对象并画到每个小截图区域
                var renderTexture = new egret.RenderTexture();
                var renderPic = renderTexture.drawToTexture(stage, new egret.Rectangle(_mcX, _mcY, _mcW, _mcH));
                var bmp = new egret.Bitmap();
                bmp.texture = renderTexture;
                bmp.anchorOffsetX = _mcW / 2;
                bmp.anchorOffsetY = _mcH / 2;
                bmp.x = _mcX + _mcW / 2;
                bmp.y = _mcY + _mcH / 2;
                s.gridGroup.addChild(bmp);
                bmp.touchEnabled = false;
                if (s.switchType == 5) {
                    s.switchType = Math.ceil(Math.random() * 4);
                }
                var tw = egret.Tween.get(bmp);
                // 开始特效
                switch (s.switchType) {
                    case 1:
                        tw.to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 359 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s);
                        break;
                    case 2:
                        var stageWidth_1 = stage.stageWidth;
                        var my_x = -stageWidth_1;
                        if (!(i % 2)) {
                            my_x = stageWidth_1 * 2;
                        }
                        tw.to({ x: my_x, alpha: 0 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s);
                        break;
                    case 3:
                        var stageHeight_1 = stage.stageHeight;
                        var my_y = -stageHeight_1;
                        if (!(i % 2)) {
                            my_y = stageHeight_1 * 2;
                        }
                        tw.to({ y: my_y, alpha: 0 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s);
                        break;
                    case 4:
                        tw.to({ scaleX: 0.2, scaleY: 1, alpha: 0, blurFliter: 0 }, s.switchTime, egret.Ease.backInOut).call(s.onComplete, s);
                        break;
                    default:
                        tw.to({ scaleX: 1, scaleY: 0, alpha: 0 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s);
                }
            }
        };
        ScreenSwitch.prototype.onComplete = function () {
            var s = this;
            s.curNumber += 1;
            if (s.curNumber == s.txNumber) {
                egret.MainContext.instance.stage.removeChild(s.gridGroup);
                if (s.callFun && s.funObj) {
                    s.callFun.call(s.funObj);
                }
            }
        };
        return ScreenSwitch;
    }());
    codeBase.ScreenSwitch = ScreenSwitch;
    __reflect(ScreenSwitch.prototype, "codeBase.ScreenSwitch");
})(codeBase || (codeBase = {}));
