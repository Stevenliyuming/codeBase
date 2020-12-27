module codeBase{
    /**
     * 屏幕切换效果
     */
    export class ScreenSwitch {
        // 舞台截图需要分割成小截图的总数量 默认20
        private txNumber: number
        // 舞台截图需要分割成小截图横向数量 默认5
        private XNumber: number
        // 屏幕切换类型 1 -> 卷帘特效 2-> 左右切换移动 3 -> 直接翻 4-> 旋转掉落 5-> 随机一种 
        private switchType: number
        // 当前小截图数量
        private curNumber: number = 0
        // 分割的小图容器
        private gridGroup: egret.Sprite = new egret.Sprite;
        //回调函数
        private callFun: Function;
        private funObj: any;
        //切换时间
        private switchTime: number = 1000;

        /**
         * 屏幕切换类型 1 -> 卷帘特效 2-> 左右切换移动 3 -> 直接翻 4-> 旋转掉落 5-> 随机一种 
         * txNumber 总的分割小图数
         * XNumber 水平方向上分割的小图数
         */
        public constructor(switchType?: number, time: number = 1000, callFun?: Function, funObj?: any, txNumber?: number, XNumber?: number) {
            let s = this;
            s.switchType = switchType || 5
            s.txNumber = txNumber || 20
            s.XNumber = XNumber || 5
            s.callFun = callFun;
            s.funObj = funObj;
            s.switchTime = time;
            s.switchScreen()
        }

        private switchScreen(): void {
            let s = this;
            // 获取当前舞台大小 用以创建截图Bitmap
            let stage: egret.Stage = egret.MainContext.instance.stage
            let stageWidth = stage.stageWidth
            let stageHeight = stage.stageHeight

            s.gridGroup.width = stageWidth
            s.gridGroup.height = stageHeight
            s.gridGroup.touchEnabled = false;
            s.gridGroup.touchChildren = false;
            stage.addChild(s.gridGroup)

            // 由小截图总数量和横向截图数决定纵向截图数
            let YNumber = s.txNumber / s.XNumber
            for (let i = 0; i < s.txNumber; i++) {
                // 计算每个小截图的xy及宽高
                let _mcW = stageWidth / s.XNumber
                let _mcH = stageHeight / YNumber
                let _mcX = i % s.XNumber * _mcW
                let _mcY = Math.floor(i / s.XNumber) * _mcH

                // 创建截图对象并画到每个小截图区域
                let renderTexture: egret.RenderTexture = new egret.RenderTexture()
                let renderPic = renderTexture.drawToTexture(stage, new egret.Rectangle(_mcX, _mcY, _mcW, _mcH))
                let bmp: egret.Bitmap = new egret.Bitmap()
                bmp.texture = renderTexture
                bmp.anchorOffsetX = _mcW / 2
                bmp.anchorOffsetY = _mcH / 2
                bmp.x = _mcX + _mcW / 2
                bmp.y = _mcY + _mcH / 2
                s.gridGroup.addChild(bmp)
                bmp.touchEnabled = false;

                if (s.switchType == 5) {
                    s.switchType = Math.ceil(Math.random() * 4)
                }
                let tw = egret.Tween.get(bmp)
                // 开始特效
                switch (s.switchType) {
                    case 1:
                        tw.to({ scaleX: 0, scaleY: 0, alpha: 0, rotation: 359 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s)
                        break
                    case 2:
                        let stageWidth = stage.stageWidth;
                        let my_x = - stageWidth
                        if (!(i % 2)) {
                            my_x = stageWidth * 2
                        }
                        tw.to({ x: my_x, alpha: 0 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s)
                        break
                    case 3:
                        let stageHeight = stage.stageHeight;
                        let my_y = - stageHeight
                        if (!(i % 2)) {
                            my_y = stageHeight * 2
                        }
                        tw.to({ y: my_y, alpha: 0 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s)
                        break
                    case 4:
                        tw.to({ scaleX: 0.2, scaleY: 1, alpha: 0, blurFliter: 0 }, s.switchTime, egret.Ease.backInOut).call(s.onComplete, s)
                        break
                    default:
                        tw.to({ scaleX: 1, scaleY: 0, alpha: 0 }, s.switchTime, egret.Ease.circIn).call(s.onComplete, s)
                }
            }
        }

        private onComplete(): void {
            let s = this;
            s.curNumber += 1;
            if (s.curNumber == s.txNumber) {
                egret.MainContext.instance.stage.removeChild(s.gridGroup)
                if (s.callFun && s.funObj) {
                    s.callFun.call(s.funObj);
                }
            }
        }
    }
}
