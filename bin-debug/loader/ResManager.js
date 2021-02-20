var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 对config文件下载进行统一调度,加强RES下载的及时性,确保成功
     */
    var ResManager = (function () {
        function ResManager() {
        }
        /**
         * 下载config文件
         * @param url config文件路径
         * @param func group下载完成的通知
         * @param funcThis
         * @param groupNames
         */
        ResManager.loadConfig = function (url, root, complete, thisObject, loadError, thisObject2) {
            if (root === void 0) { root = "resource/"; }
            if (complete === void 0) { complete = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (loadError === void 0) { loadError = null; }
            if (thisObject2 === void 0) { thisObject2 = null; }
            ResManager.config_load_listener.push({ configUrl: url, root: root, complete: complete, thisObj: thisObject, loadError: loadError, thisObj2: thisObject2 });
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, ResManager.onConfigComplete, ResManager);
            RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, ResManager.onConfigLoadError, ResManager);
            RES.loadConfig(url, root);
        };
        /**
         * 资源配置加载完成
         */
        ResManager.onConfigComplete = function (event) {
            if (ResManager.config_load_listener.length > 0) {
                for (var i = 0; i < ResManager.config_load_listener.length; ++i) {
                    if (ResManager.config_load_listener[i].complete) {
                        ResManager.config_load_listener[i].complete.call(ResManager.config_load_listener[i].thisObj, ResManager.config_load_listener[i].configUrl);
                    }
                }
                ResManager.config_load_listener.length = 0;
            }
            ResManager.onCheckLoadGroup();
        };
        /**
         * 资源配置加载错误
         */
        ResManager.onConfigLoadError = function (event) {
            if (ResManager.config_load_listener.length > 0) {
                for (var i = 0; i < ResManager.config_load_listener.length; ++i) {
                    if (ResManager.config_load_listener[i].loadError) {
                        ResManager.config_load_listener[i].loadError.call(ResManager.config_load_listener[i].thisObj2, ResManager.config_load_listener[i].configUrl);
                    }
                }
                ResManager.config_load_listener.length = 0;
            }
            console.log("CONFIG_LOAD_ERROR");
        };
        /**
         * 对group组进行检测加载
         * @param groupNames
         */
        ResManager.loadGroups = function (groupNames, listener, thisObject, loadingNow) {
            if (listener === void 0) { listener = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (loadingNow === void 0) { loadingNow = false; }
            if (groupNames == null || groupNames.length == 0)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                ResManager.loadGroup(groupNames[i], listener, thisObject, loadingNow);
            }
        };
        /**
         * 对单个group进行检测加载
         * @param groupName
         */
        ResManager.loadGroup = function (groupName, listener, thisObject, loadingNow) {
            if (listener === void 0) { listener = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (loadingNow === void 0) { loadingNow = false; }
            if (!codeBase.StringUtil.isUsage(groupName))
                return;
            //Debug.log = "@RES_M group add 000 name=" + groupName;
            ResManager.addGroupCompleteListener(groupName, listener, thisObject, loadingNow);
        };
        /**
         * 添加group完成的监听
         * @param listener
         * @param thisObject
         */
        ResManager.addGroupCompleteListener = function (groupName, listener, thisObject, loadingNow) {
            if (loadingNow === void 0) { loadingNow = false; }
            if (!codeBase.StringUtil.isUsage(groupName))
                return;
            if (ResManager._res_group_arr.indexOf(groupName) < 0) {
                if (loadingNow) {
                    ResManager._res_group_arr.unshift(groupName);
                }
                else {
                    ResManager._res_group_arr.push(groupName);
                }
                ResManager.checkAddGroupCompleteListener();
                codeBase.HeartBeat.addListener(ResManager, ResManager.onCheckLoadGroup, ResManager._res_hb_rate);
            }
            var funcArr = [];
            if (ResManager._res_group_listener_name.indexOf(groupName) >= 0) {
                funcArr = ResManager._res_group_listener[groupName];
            }
            else {
                ResManager._res_group_listener_name.push(groupName);
                ResManager._res_group_listener[groupName] = funcArr;
            }
            if (listener != null || thisObject != null) {
                for (var i = 0; i < funcArr.length; i++) {
                    if (funcArr[i].func == listener && funcArr[i].thisObj == thisObject) {
                        return;
                    }
                }
                funcArr.push({ func: listener, thisObj: thisObject });
            }
        };
        //检测是否添加过RES的Group完成通知
        ResManager.checkAddGroupCompleteListener = function () {
            //Debug.log = "@RES_M group add 000 GroupCompleteListener";
            if (!ResManager._res_group_listener_add) {
                //Debug.log = "@RES_M group add 111 GroupCompleteListener";
                ResManager._res_group_listener_add = true;
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, ResManager.onLoadGroupComplete, ResManager);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, ResManager.onLoadGroupError, ResManager);
            }
        };
        /**
         * RES的group下载完成
         * @param event
         */
        ResManager.onLoadGroupComplete = function (event) {
            var groupName = null;
            var index;
            //Debug.log = "@RES_M group complete 000";
            //var resItems: Array<RES.ResourceItem> = null;
            for (var i = ResManager._res_group_arr.length - 1; i >= 0; i--) {
                //console.log("@Main onConfigComplete resItems" + JSON.stringify(resItems));
                groupName = ResManager._res_group_arr[i];
                if (!codeBase.StringUtil.isUsage(groupName)) {
                    ResManager._res_group_arr.splice(i, 1);
                    continue;
                }
                if (RES.isGroupLoaded(groupName)) {
                    index = ResManager._res_group_loading_arr.indexOf(groupName);
                    if (index >= 0) {
                        ResManager._res_group_loading_arr.splice(index, 1);
                    }
                    //Debug.log = "@RES_M group complete 111 name=" + groupName;
                    ResManager._res_group_arr.splice(ResManager._res_group_arr.indexOf(groupName), 1);
                    //监听触发
                    if (ResManager._res_group_listener[groupName]) {
                        //Debug.log = "@RES_M group complete 222 name=" + groupName;
                        var funcArr = ResManager._res_group_listener[groupName];
                        for (var i = 0; i < funcArr.length; i++) {
                            if (funcArr[i] && funcArr[i].func)
                                funcArr[i].func.call(funcArr[i].thisObj, event);
                        }
                        ResManager.removeGroupCompleteListener(groupName);
                    }
                }
            }
            if (ResManager._res_group_arr.length == 0) {
                //Debug.log = "@RES_M group complete 333 remove listener";
                codeBase.HeartBeat.removeListener(ResManager, ResManager.onCheckLoadGroup);
                if (ResManager._res_group_listener_add) {
                    ResManager._res_group_listener_add = false;
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, ResManager.onLoadGroupComplete, ResManager);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, ResManager.onLoadGroupError, ResManager);
                }
            }
            //Debug.log = "@RES_M group complete 444 group.length=" + ResManager._res_group_arr.length + ", v=" + ResManager._res_group_arr;
        };
        /**
         * load group错误
         * @param event
         */
        ResManager.onLoadGroupError = function (event) {
            if (event && codeBase.StringUtil.isUsage(event.groupName)) {
                var index = ResManager._res_group_loading_arr.indexOf(event.groupName);
                if (index >= 0)
                    ResManager._res_group_loading_arr.splice(index, 1);
                // index = ResManager._res_group_arr.indexOf(event.groupName);
                // if (index >= 0) ResManager._res_group_arr.splice(index, 1);
                //console.log("onLoadGroupError=" + event.groupName);
            }
        };
        /**
         * 检测group是否可以开始下载
         */
        ResManager.onCheckLoadGroup = function () {
            //Debug.log = "@RES_M group 000 checkload onCheckLoadGroup=" + ResManager._res_group_arr;
            var groupName = null;
            for (var i = 0; i < ResManager._res_group_arr.length; i++) {
                //console.log("@Main onConfigComplete resItems" + JSON.stringify(resItems));
                groupName = ResManager._res_group_arr[i];
                if (!codeBase.StringUtil.isUsage(groupName)) {
                    ResManager._res_group_arr.splice(i, 1);
                    continue;
                }
                //添加到加载队列
                if (ResManager._res_group_loading_arr.indexOf(groupName) < 0) {
                    ResManager._res_group_loading_arr.push(groupName);
                    //Debug.log = "@RES_M group checkload 111 name=" + groupName;
                    RES.loadGroup(groupName);
                }
            }
        };
        /**
         * 移除group完成的监听
         * @param listener
         * @param thisObject
         */
        ResManager.removeGroupCompleteListener = function (groupName) {
            //Debug.log = "@RES_M group removel 000 name=" + groupName;
            var index = ResManager._res_group_listener_name.indexOf(groupName);
            if (index >= 0) {
                //Debug.log = "@RES_M group removel 111 name=" + groupName;
                delete ResManager._res_group_listener[groupName];
                ResManager._res_group_listener_name.splice(index, 1);
                if (ResManager._res_group_listener_name.length == 0) {
                    //Debug.log = "@RES_M group removel 222 name=" + groupName;
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, ResManager.onLoadGroupComplete, ResManager);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, ResManager.onLoadGroupError, ResManager);
                    ResManager._res_group_listener_add = false;
                }
            }
        };
        /**
         *  要下载的group列表
         */
        ResManager._res_group_arr = [];
        /**
         * 已添加下载的group列表
         */
        ResManager._res_group_loading_arr = [];
        /**
         * group完成的监听列表,key->[{func, thisObj}]
         */
        ResManager._res_group_listener = {};
        /**
         * group的监听key列表
         */
        ResManager._res_group_listener_name = [];
        /**
         * group complete的通知是否已经添加
         */
        ResManager._res_group_listener_add = false;
        ResManager._res_hb_rate = 30;
        ResManager.config_load_listener = [];
        return ResManager;
    }());
    codeBase.ResManager = ResManager;
    __reflect(ResManager.prototype, "codeBase.ResManager");
})(codeBase || (codeBase = {}));
