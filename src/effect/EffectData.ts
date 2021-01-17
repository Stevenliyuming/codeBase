module codeBase{
    export class EffectData {
        public oldX:number = 0;
        public oldY:number = 0;
        public newX:number = 0;
        public newY:number = 0;

        public oldAlpha:number = 0;
        public newAlpha:number = 0;

        public oldRotation:number = 0;
        public newRotation:number = 0;

        public oldScaleX:number = 0;
        public newScaleX:number = 0;
        public oldScaleY:number = 0;
        public newScaleY:number = 0;

        public oldAnchorX:number = 0;
        public newAnchorX:number = 0;
        public oldAnchorY:number = 0;
        public newAnchorY:number = 0;

        public isPlay:boolean = false;//当前是否播放
        public loop:boolean = false;//是否循环
    }
}