module codeBase{
    /**
     * 动画数据
     */
    export class AnimateManager {
        private static _animiateDataDict:any = {};

        private static waiting_groups:Array<string> = [];//等待下载的group列表
        private static waiting_names:Array<string> = [];//等待下载的name列表
        private static names_down:Array<string> = [];//已下载的那么集合

        /**
         * 获取动画数据
         */
        public static getAnimateData(name:string):AnimateData{
            //Debug.log = "getAnimateData=" + name;
            if (AnimateManager._animiateDataDict[name]) {
                return AnimateManager._animiateDataDict[name];
            }
            if (RES.isGroupLoaded(name + "_animate_group")) {
                AnimateManager._animiateDataDict[name] = new AnimateData(name);
                return AnimateManager._animiateDataDict[name];
            } else {
                AnimateManager.loadAnimate(name);
            }
            return null;
        }
        /**
         * url加载json data数据到RES中
         */
        public static loadAnimate(name:string):void {
            if (!StringUtil.isUsage(name)) return;
            if (AnimateManager.names_down.indexOf(name) >= 0 || RES.isGroupLoaded(name + "_animate_group")) return;
            if (AnimateManager.waiting_groups.indexOf(name) < 0) AnimateManager.waiting_groups.push(name);
            if (AnimateManager.waiting_names.indexOf(name) < 0) AnimateManager.waiting_names.push(name);
            AnimateManager.names_down.push(name);
            HeartBeat.addListener(AnimateManager, AnimateManager.onHeartBeatCheckLoadedFile, 60);
        }

        /**
         * 开始下载数据
         * @param name
         */
        private static fireDownAnimate(name:string):void {
            if (GlobalSetting.isNative()){
                //ResManager.loadConfig(RES.getVersionController().getVirtualUrl(GlobalSetting.CDN_RES + "assets/animate/" + name + "_loader.json"), [name + "_animate_group"], AnimateManager.onLoadingGroupJosnFileComplete, AnimateManager);
            } else {
                //ResManager.loadConfig(GlobalSetting.CDN_RES + "assets/animate/" + name + "_loader.json?r=" + Math.floor(Math.random()*9999999999), [name + "_animate_group"], AnimateManager.onLoadingGroupJosnFileComplete, AnimateManager);
            }
        }
        /**
         * loading配置文件的Group加载完成
         * @param event
         */
        private static onLoadingGroupJosnFileComplete(event:RES.ResourceEvent):void{
            //console.log("animate load complete!!!=" + event.groupName);
            if (event && StringUtil.isUsage(event.groupName) && event.groupName.indexOf("_animate_group") >=0) {
                var groupName:string = event.groupName.substring(0, event.groupName.indexOf("_animate_group"));
                if (AnimateManager.waiting_names.indexOf(groupName) >= 0) AnimateManager.waiting_names.splice(AnimateManager.waiting_names.indexOf(groupName),1);
                if (AnimateManager.waiting_groups.indexOf(groupName) >= 0) AnimateManager.waiting_groups.splice(AnimateManager.waiting_groups.indexOf(groupName),1);
                var myEvent:MyEvent = MyEvent.getEvent(EventType.RESOURCE_DOWNLOADED);
                myEvent.addItem("name", groupName);
                myEvent.send();
            }
            AnimateManager.onHeartBeatCheckLoadedFile();
        }

        /**
         * 检测是否有文件没有下载完成,重新加入下载列表中
         */
        private static onHeartBeatCheckLoadedFile():void {
            if (AnimateManager.waiting_groups.length == 0 && AnimateManager.waiting_names.length == 0) {
                HeartBeat.removeListener(AnimateManager, AnimateManager.onHeartBeatCheckLoadedFile);
            }
            if(AnimateManager.waiting_groups.length > 0 && AnimateManager.waiting_names.length > 0){
                var reloadArr:Array<string> = [];
                for(var i = AnimateManager.waiting_names.length-1; i >= 0; i--) {
                    if (AnimateManager.waiting_groups.indexOf(AnimateManager.waiting_names[i]) >= 0) {
                        reloadArr.push(AnimateManager.waiting_names[i]);
                        AnimateManager.waiting_names.splice(i,1);
                        AnimateManager.waiting_groups.splice(AnimateManager.waiting_groups.indexOf(AnimateManager.waiting_names[i]),1);
                    }
                }
                var resName:string = null;
                while(reloadArr.length > 0) {
                    //Debug.log = "onHeartBeatCheckLoadedFile 111111111111111";
                    AnimateManager.fireDownAnimate(reloadArr.pop());
                }
            }
        }
    }
}