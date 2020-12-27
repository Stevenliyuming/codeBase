module codeBase{
    /**
     * logger日志记录
     * 主要是输出到debugwin窗口中,一边debug信息查看
     */
    export class Debug {
        /**
         * log日志记录
         */
        private static _log:string = "";

        public static callbackFunc:Function = null;

        public static set log(str:string) {
            if (GlobalSetting.DEV_MODEL) {
                console.log(str);
                Debug._log += str + "\n";
                if (Debug.callbackFunc) this.callbackFunc.call(null);
            }
        }

        public static get log():string {
            return this._log;
        }

        public static refresh():void {
            if (Debug.callbackFunc) this.callbackFunc.call(null);
        }

        public static clean():void {
            if (GlobalSetting.DEV_MODEL) {
                this._log = "";
                if (this.callbackFunc) this.callbackFunc.call(null);
            }
        }
    }
}