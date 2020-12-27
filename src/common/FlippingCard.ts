module codeBase{
    /**
     * 卡片正面和背面旋转显示
     */
    export class FlippingCard extends egret.Bitmap {
        private animateTime: number = 600.0;
        private posSide: egret.Texture;
        private negSide: egret.Texture;
        private customFilter: egret.CustomFilter;

        /**
         * posSide 正面
         * negSide 背面
         */
        constructor(posSide: egret.Texture, negSide: egret.Texture) {
            super();
            let s = this;
            s.texture = posSide;
            s.posSide = posSide;
            s.negSide = negSide;
            s.touchEnabled = true;
            s.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onTouch, s);

            //顶点着色器
            let vertex = `
            attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;
            attribute vec2 aColor;

            uniform vec2 projectionVector;

            varying vec2 vTextureCoord;
            varying vec4 vColor;

            const vec2 center = vec2(-1.0, 1.0);

            void main(void) {
                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
                vTextureCoord = aTextureCoord;
                vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
            }
        `;
            //面片着色器
            let fragment = `
            precision lowp float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform sampler2D uSampler;

            uniform float time;
            uniform float duration;
            uniform float max;

            void main() {
                vec2 uv = vTextureCoord.xy;
                vec2 texCoord = uv;
                float scale = max;
                float angle = time / duration * 3.1416;
                float scaletime = duration * 0.2;

                if(time < scaletime) scale = time / scaletime * (max - 1.0) + 1.0;
                if(time > duration - scaletime) scale = (duration - time) / scaletime * (max - 1.0) + 1.0;

                if(time > duration / 2.0) angle = (duration - time) / duration * 3.1416;
                float direct = 1.0;
                if(time > duration / 2.0) direct = -1.0;
                texCoord.y = uv.y + (uv.y - 0.5) * sin(angle) * 0.5 * (uv.x - 0.5) * direct;
                
                if(uv.x > 0.5) texCoord.x = (uv.x - 0.5) / cos(angle) + 0.5;
                else texCoord.x = 0.5 - (0.5 - uv.x) / cos(angle);

                texCoord.x = (texCoord.x - 0.5) / scale + 0.5;
                texCoord.y = (texCoord.y - 0.5) / scale + 0.5;

                gl_FragColor = texture2D(uSampler, texCoord);
            }
        `;

            //3d翻转自定义滤镜
            s.customFilter = new egret.CustomFilter(vertex, fragment, {
                time: 0,
                duration: s.animateTime,
                max: 1.1
            });
            s.customFilter.padding = s.width * 0.3;
            s.filters = [];
        }

        private _positive: boolean = true;
        public set positive(val: boolean) {
            let s = this;
            s._positive = val;
            s.texture = val ? s.posSide : s.negSide;
        }

        private onTouch(e: egret.TouchEvent) {
            let s = this;
            s.touchEnabled = false;
            s.startTime = Date.now();
            s.startFace = s._positive;
            s.addEventListener(egret.Event.ENTER_FRAME, s.update, s);
            s.filters = [s.customFilter];
        }

        private startTime: number;
        private startFace: boolean;
        
        private update() {
            let s = this;
            let total = Date.now() - s.startTime;
            if (total > s.animateTime) {
                s.removeEventListener(egret.Event.ENTER_FRAME, s.update, s);
                s.filters = [];
                s.touchEnabled = true;
                return false;
            }
            if (total > s.animateTime / 2 && s._positive == s.startFace) s.positive = (!s.startFace);

            s.customFilter.uniforms.time = total;
        }
    }
}
