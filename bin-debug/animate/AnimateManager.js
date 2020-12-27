var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 动画数据
     */
    var AnimateManager = (function () {
        function AnimateManager() {
        }
        /**
         * 获取动画数据
         */
        AnimateManager.getAnimateData = function (name) {
            //Debug.log = "getAnimateData=" + name;
            if (AnimateManager._animiateDataDict[name]) {
                return AnimateManager._animiateDataDict[name];
            }
            if (RES.isGroupLoaded(name + "_animate_group")) {
                AnimateManager._animiateDataDict[name] = new codeBase.AnimateData(name);
                return AnimateManager._animiateDataDict[name];
            }
            else {
                AnimateManager.loadAnimate(name);
            }
            return null;
        };
        /**
         * url加载json data数据到RES中
         */
        AnimateManager.loadAnimate = function (name) {
            if (!codeBase.StringUtil.isUsage(name))
                return;
            if (AnimateManager.names_down.indexOf(name) >= 0 || RES.isGroupLoaded(name + "_animate_group"))
                return;
            if (AnimateManager.waiting_groups.indexOf(name) < 0)
                AnimateManager.waiting_groups.push(name);
            if (AnimateManager.waiting_names.indexOf(name) < 0)
                AnimateManager.waiting_names.push(name);
            AnimateManager.names_down.push(name);
            codeBase.HeartBeat.addListener(AnimateManager, AnimateManager.onHeartBeatCheckLoadedFile, 60);
        };
        /**
         * 开始下载数据
         * @param name
         */
        AnimateManager.fireDownAnimate = function (name) {
            if (codeBase.GlobalSetting.isNative()) {
                //ResManager.loadConfig(RES.getVersionController().getVirtualUrl(GlobalSetting.CDN_RES + "assets/animate/" + name + "_loader.json"), [name + "_animate_group"], AnimateManager.onLoadingGroupJosnFileComplete, AnimateManager);
            }
            else {
                //ResManager.loadConfig(GlobalSetting.CDN_RES + "assets/animate/" + name + "_loader.json?r=" + Math.floor(Math.random()*9999999999), [name + "_animate_group"], AnimateManager.onLoadingGroupJosnFileComplete, AnimateManager);
            }
        };
        /**
         * loading配置文件的Group加载完成
         * @param event
         */
        AnimateManager.onLoadingGroupJosnFileComplete = function (event) {
            //console.log("animate load complete!!!=" + event.groupName);
            if (event && codeBase.StringUtil.isUsage(event.groupName) && event.groupName.indexOf("_animate_group") >= 0) {
                var groupName = event.groupName.substring(0, event.groupName.indexOf("_animate_group"));
                if (AnimateManager.waiting_names.indexOf(groupName) >= 0)
                    AnimateManager.waiting_names.splice(AnimateManager.waiting_names.indexOf(groupName), 1);
                if (AnimateManager.waiting_groups.indexOf(groupName) >= 0)
                    AnimateManager.waiting_groups.splice(AnimateManager.waiting_groups.indexOf(groupName), 1);
                var myEvent = codeBase.MyEvent.getEvent(codeBase.EventType.RESOURCE_DOWNLOADED);
                myEvent.addItem("name", groupName);
                myEvent.send();
            }
            AnimateManager.onHeartBeatCheckLoadedFile();
        };
        /**
         * 检测是否有文件没有下载完成,重新加入下载列表中
         */
        AnimateManager.onHeartBeatCheckLoadedFile = function () {
            if (AnimateManager.waiting_groups.length == 0 && AnimateManager.waiting_names.length == 0) {
                codeBase.HeartBeat.removeListener(AnimateManager, AnimateManager.onHeartBeatCheckLoadedFile);
            }
            if (AnimateManager.waiting_groups.length > 0 && AnimateManager.waiting_names.length > 0) {
                var reloadArr = [];
                for (var i = AnimateManager.waiting_names.length - 1; i >= 0; i--) {
                    if (AnimateManager.waiting_groups.indexOf(AnimateManager.waiting_names[i]) >= 0) {
                        reloadArr.push(AnimateManager.waiting_names[i]);
                        AnimateManager.waiting_names.splice(i, 1);
                        AnimateManager.waiting_groups.splice(AnimateManager.waiting_groups.indexOf(AnimateManager.waiting_names[i]), 1);
                    }
                }
                var resName = null;
                while (reloadArr.length > 0) {
                    //Debug.log = "onHeartBeatCheckLoadedFile 111111111111111";
                    AnimateManager.fireDownAnimate(reloadArr.pop());
                }
            }
        };
        AnimateManager._animiateDataDict = {};
        AnimateManager.waiting_groups = []; //等待下载的group列表
        AnimateManager.waiting_names = []; //等待下载的name列表
        AnimateManager.names_down = []; //已下载的那么集合
        return AnimateManager;
    }());
    codeBase.AnimateManager = AnimateManager;
    __reflect(AnimateManager.prototype, "codeBase.AnimateManager");
})(codeBase || (codeBase = {}));
