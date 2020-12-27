module codeBase{
    /**
     * 动画元数据
     */
    export class AnimateTexture {
        public id:string = null;//名称
        public frame:number = 0;//播放时长
        public width:number = 0;//材质宽
        public height:number = 0;//材质高
        public x:number = 0;//x值
        public y:number = 0;//y值
        public offsetX:number = 0;//offset x值
        public offsetY:number = 0;//offset y值
        public texutre:egret.Texture = null;//材质
        public resId:string = null;//不合并的时候的资源id
        public constructor() {
        }
    }
}