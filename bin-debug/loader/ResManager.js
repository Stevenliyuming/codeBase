var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var ResManager = (function () {
        function ResManager() {
        }
        /**
         * 获取Texture材质
         */
        // public static getTexture(name: string): egret.Texture {
        //     //判断是项目公用素材,还是独立下载资源
        //     if (!this._isInit && ResManager._canSplit) {
        //         ResManager.splitSpriteSheet();
        //     }
        //     if (ResManager._projectNameSprite.indexOf(name) >= 0) {//项目公用的材质
        //         if (!this._isInit) {
        //             return null;
        //         }
        //         return ResManager._spriteSheet.getTexture(name);
        //     } else {//动态下载的资源
        //         return ResManager.getRes(name);
        //     }
        // }
        // /**
        //  * 非材质或者材质,请通过这个方法获取
        //  * 内容请自行解析
        //  */
        // public static getRes(name: string, type: string = RES.ResourceItem.TYPE_IMAGE): any {
        //     if (!StringUtil.isUsage(name)) return null;
        //     if (ResManager._urlDataDict[name]) {
        //         return ResManager._urlDataDict[name];
        //     } else if (RES.hasRes(name)) {
        //         return RES.getRes(name);
        //     } else if (ResManager._urlDownloading.indexOf(name) < 0) {//启动下载
        //         ResManager._urlDownloading.push(name);
        //         if (GlobalSetting.isNative()) {
        //             RES.getResByUrl(RES.getVersionController().getVirtualUrl(name), ResManager.onloadedCompleteDynamicTexture, this, type);
        //         } else {
        //             RES.getResByUrl(name + "?r=" + Math.floor(Math.random() * 9999999999), ResManager.onloadedCompleteDynamicTexture, this, type);
        //         }
        //     }
        //     return null;
        // }
        // /**
        //  * 动态加载的数据完成
        //  * @param data
        //  * @param url
        //  */
        // private static onloadedCompleteDynamicTexture(data, url) {
        //     var key: string = url;
        //     if (key.lastIndexOf("?r=") > 0) {
        //         key = key.substring(0, key.lastIndexOf("?r="));
        //     }
        //     //console.log("loaded.url=" + key);
        //     //console.log("loaded.data=" + RES.getRes(key));
        //     if (data) {
        //         if (ResManager._urlDownloading.indexOf(key) >= 0) ResManager._urlDownloading.splice(ResManager._urlDownloading.indexOf(key), 1);
        //         ResManager._urlDataDict[key] = data;
        //         var myEvent: MyEvent = MyEvent.getEvent(EventType.RESOURCE_DOWNLOADED);
        //         myEvent.addItem("name", key);
        //         myEvent.addItem("data", data);
        //         myEvent.send();
        //     }
        // }
        /**
         * 初始化加载报表信息
         */
        // public static loadResFile(projectName: string): void {
        //     ResManager._projectName = projectName;
        //     ResManager._projectGroup = projectName + "_common";
        //     //初始化Resource资源加载库
        //     ResManager.loadConfig(GlobalSetting.CDN_RES + "assets/ui/" + ResManager._projectName + "/" + ResManager._projectGroup + "_loader.json", [ResManager._projectGroup + "_group"], ResManager.onLoadingGroupJosnFileComplete, ResManager);
        // }
        /**
         * loading配置文件的Group加载完成
         * @param event
         */
        ResManager.onLoadingGroupJosnFileComplete = function (event) {
            //console.log("onLoadingGroupJosnFileComplete.groupName=" + event.groupName);
            //console.log("@RES_MANAGER onLoadingGroupJosnFileComplete=" + event.groupName);
            if (RES.isGroupLoaded(ResManager._projectGroup + "_group") && !ResManager._canSplit) {
                //console.log("ResManager init!!")
                ResManager._canSplit = true;
                codeBase.MyEvent.sendEvent(codeBase.EventType.PROJECT_RES_DOWNLOADED);
            }
        };
        /**
         * 切割材质
         */
        ResManager.splitSpriteSheet = function () {
            if (!ResManager._isInit && ResManager._canSplit) {
                ResManager._isInit = true;
                //材质集的情况
                var jsonData = RES.getRes(ResManager._projectGroup + "_json");
                if (jsonData) {
                    ResManager._spriteSheet = new egret.SpriteSheet(RES.getRes(ResManager._projectGroup + "_img"));
                    for (var key in jsonData.texture) {
                        ResManager._projectNameSprite.push(key);
                        ResManager._spriteSheet.createTexture(key, jsonData.texture[key].x, jsonData.texture[key].y, jsonData.texture[key].w, jsonData.texture[key].h);
                    }
                }
            }
        };
        /**
         * 检测是否公用资源加载已经全部完成
         * @returns {boolean}
         */
        ResManager.checkProjectResLoaded = function () {
            if (codeBase.StringUtil.isUsage(ResManager._projectGroup)) {
                return ResManager._canSplit;
            }
            return true;
        };
        /**
         * 下载config文件
         * @param url config文件路径
         * @param func group下载完成的通知
         * @param funcThis
         * @param groupNames
         */
        ResManager.loadConfig = function (url, root, groupNames, listener, thisObject) {
            //Debug.log = "@RES_M loadConfig url=" + url;
            // if(!RES['instance']) RES['instance'] = new RES.Resource();
            //RES.setMaxLoadingThread(5);
            // if (GlobalSetting.isNative()) {
            //     RES.getResByUrl(RES.getVersionController().getVirtualUrl(url), ResManager.onLoadConfigComplete, ResManager, RES.ResourceItem.TYPE_JSON);
            // } else {
            //     RES.getResByUrl(url, ResManager.onLoadConfigComplete, ResManager, RES.ResourceItem.TYPE_JSON);
            // }
            // ResLoader.getInstance().resLoad(url, null, (data:ResourceItem.LoadInfo)=>{
            //     RES.config.config = ResLoader.getInstance().getRes(data.url).res;
            //     ResManager.onCheckLoadGroup();
            // }, this);
            // if (groupNames && groupNames.length > 0) {
            //     ResManager.loadGroups(groupNames, listener, thisObject);
            // }
            if (groupNames === void 0) { groupNames = null; }
            if (listener === void 0) { listener = null; }
            if (thisObject === void 0) { thisObject = null; }
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, listener, thisObject);
            RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, ResManager.onConfigLoadError, ResManager);
            RES.loadConfig(url, root);
        };
        ResManager.onConfigComplete = function (event) {
            ResManager.onCheckLoadGroup();
        };
        ResManager.onConfigLoadError = function (event) {
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
         * 加载group选项
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
            codeBase.HeartBeat.addListener(ResManager, ResManager.onCheckLoadGroup, ResManager._res_hb_rate);
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
            if (event)
                ResManager._res_resourceConfig = event.target.resConfig;
            var groupName = null;
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
                    if (ResManager._res_group_loading_arr.indexOf(groupName) >= 0) {
                        ResManager._res_group_loading_arr.splice(ResManager._res_group_loading_arr.indexOf(groupName), 1);
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
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, ResManager.onLoadGroupComplete, ResManager);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, ResManager.onLoadGroupError, ResManager);
                }
                ResManager._res_group_listener_add = false;
            }
            //Debug.log = "@RES_M group complete 444 group.length=" + ResManager._res_group_arr.length + ", v=" + ResManager._res_group_arr;
        };
        /**
         * load group错误
         * @param event
         */
        ResManager.onLoadGroupError = function (event) {
            if (event && codeBase.StringUtil.isUsage(event.groupName)) {
                if (ResManager._res_group_loading_arr.indexOf(event.groupName) >= 0)
                    ResManager._res_group_loading_arr.splice(ResManager._res_group_loading_arr.indexOf(event.groupName), 1);
                if (ResManager._res_group_arr.indexOf(event.groupName) >= 0)
                    ResManager._res_group_arr.splice(ResManager._res_group_arr.indexOf(event.groupName), 1);
                //ResManager.loadGroup(event.groupName);
                //console.log("onLoadGroupError=" + event.groupName);
            }
        };
        /**
         * 配置文件加载完成
         */
        ResManager.onLoadConfigComplete = function (config) {
            //Debug.log = "@RES_M config complete _res_resourceConfig=" + ResManager._res_resourceConfig;
            //RES.parseConfig(config, GlobalSetting.CDN_RES);
            RES.config.config = config;
            ResManager.onCheckLoadGroup();
        };
        /**
         * 检测group是否可以开始下载
         */
        ResManager.onCheckLoadGroup = function () {
            if (ResManager._res_resourceConfig == null)
                ResManager._res_resourceConfig = RES["configInstance"];
            //Debug.log = "@RES_M group 000 checkload onCheckLoadGroup=" + ResManager._res_group_arr;
            var resItems = null;
            var allloaded = true;
            var groupName = null;
            var delNameArr = [];
            for (var i = 0; i < ResManager._res_group_arr.length; i++) {
                //console.log("@Main onConfigComplete resItems" + JSON.stringify(resItems));
                groupName = ResManager._res_group_arr[i];
                if (!codeBase.StringUtil.isUsage(groupName)) {
                    ResManager._res_group_arr.splice(i, 1);
                    continue;
                }
                if (RES.isGroupLoaded(groupName)) {
                    //Debug.log = "@RES_M group checkload 222 name=" + groupName;
                    delNameArr.push(groupName);
                }
                else {
                    if (ResManager._res_group_loading_arr.indexOf(groupName) < 0) {
                        ResManager._res_group_loading_arr.push(groupName);
                        //Debug.log = "@RES_M group checkload 111 name=" + groupName;
                        RES.loadGroup(groupName);
                    }
                }
                // resItems = null;
                // if (ResManager._res_resourceConfig) {
                //     resItems = ResManager._res_resourceConfig.getGroupByName(groupName);// getRawGroupByName(groupName);
                // }
                // //Debug.log = "@RES_M group checkload i=" + i + ", name=" + groupName + ", resItems=" + resItems;
                // if (resItems && resItems.length > 0 && !resItems[0].loaded) {
                //     allloaded = false;
                //     //Debug.log = "@RES_M group checkload 111 _res_group_loading_arr=" + this._res_group_loading_arr;
                //     if (ResManager._res_group_loading_arr.indexOf(groupName) < 0) {
                //         ResManager._res_group_loading_arr.push(groupName);
                //         //Debug.log = "@RES_M group checkload 111 name=" + groupName;
                //         RES.loadGroup(groupName);
                //     }
                // } else if (RES.isGroupLoaded(groupName)) {
                //     //Debug.log = "@RES_M group checkload 222 name=" + groupName;
                //     delNameArr.push(groupName);
                // } else if (resItems) {//把所有的resItems全部下载完成,说明group也下载完成了
                //     var downNum: number = 0;
                //     for (var j: number = 0; j < resItems.length; j++) {
                //         if (resItems[j].loaded) {
                //             downNum++;
                //         }
                //     }
                //     if (downNum == resItems.length) {
                //         if (!RES.isGroupLoaded(groupName)) {
                //             RES.loadGroup(groupName);
                //         } else {
                //             delNameArr.push(groupName);
                //         }
                //     }
                //     //Debug.log = "@RES_M group checkload ------ resItems=" + JSON.stringify(resItems);
                // }
            }
            //删除已检测到下载完成的名称
            // for (var j: number = 0; j < delNameArr.length; j++) {
            //     groupName = delNameArr[j];
            //     ResManager._res_group_arr.splice(ResManager._res_group_arr.indexOf(groupName), 1);
            //     if (ResManager._res_group_loading_arr.indexOf(groupName) >= 0) {
            //         ResManager._res_group_loading_arr.splice(ResManager._res_group_loading_arr.indexOf(groupName), 1);
            //     }
            //     //监听触发
            //     if (ResManager._res_group_listener_name.indexOf(groupName) >= 0) {
            //         //Debug.log = "@RES_M group checkload 333 name=" + groupName;
            //         var funcArr: Array<any> = ResManager._res_group_listener[groupName];
            //         for (var i: number = 0; i < funcArr.length; i++) {
            //             if (funcArr[i].func) funcArr[i].func.call(funcArr[i].thisObj, null);
            //         }
            //         ResManager.removeGroupCompleteListener(groupName);
            //     }
            // }
            // this.onLoadGroupComplete(null);
        };
        /**
         * 移除group完成的监听
         * @param listener
         * @param thisObject
         */
        ResManager.removeGroupCompleteListener = function (groupName) {
            //Debug.log = "@RES_M group removel 000 name=" + groupName;
            if (ResManager._res_group_listener_name.indexOf(groupName) >= 0) {
                //Debug.log = "@RES_M group removel 111 name=" + groupName;
                delete ResManager._res_group_listener[groupName];
                ResManager._res_group_listener_name.splice(ResManager._res_group_listener_name.indexOf(groupName), 1);
                if (ResManager._res_group_listener_name.length == 0) {
                    //Debug.log = "@RES_M group removel 222 name=" + groupName;
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, ResManager.onLoadGroupComplete, ResManager);
                    ResManager._res_group_listener_add = false;
                }
            }
        };
        //---- for project texture manager---
        ResManager._hasProjectResLoading = false; //是否有公用资源要下载
        ResManager._isInit = false; //是否已初始化
        ResManager._canSplit = false; //是否可以切割
        ResManager._projectGroup = "";
        ResManager._projectName = "";
        ResManager._projectNameSprite = [];
        ResManager._spriteSheet = null;
        //--- for Dynamic loaded texture manager ----
        ResManager._urlDataDict = {};
        ResManager._urlDownloading = []; //已进入下载的url
        // //空闲下载控制
        // private static _idleDownloadClz: Array<any> = [];
        // //当前在空闲下载的对象
        // private static _currentIdleDown: ReceiveGroup = null;
        // /**
        //  * 添加闲时加载的View或者Win类
        //  * 遵循先加先下的原则
        //  * @param clz
        //  */
        // public static addIdleDownload(clz: any): void {
        //     if (clz) {
        //         var inst: any = new clz();
        //         if (inst instanceof View || inst instanceof Win || inst instanceof Template) {
        //             if (ResManager._idleDownloadClz.indexOf(clz) < 0) {
        //                 ResManager._idleDownloadClz.push(clz);
        //             }
        //             ObjectPool.recycleClass(inst);
        //             HeartBeat.addListener(this, this.onHbCheckDownloadIdle, GlobalSetting.CHECK_IDLE_LOADING);
        //         } else {
        //             Debug.log = "[WARING]addIdleDownload 类不是WIN或者VIEW,不做调度下载!";
        //         }
        //     }
        // }
        // /**
        //  * 检测是否可以进行闲时现在
        //  */
        // private static onHbCheckDownloadIdle(): void {
        //     if (ResManager._currentIdleDown && ResManager._currentIdleDown._uiResReady) {//下载完成
        //         ResManager._currentIdleDown = null;
        //     }
        //     if (ResManager._currentIdleDown == null && ResManager._idleDownloadClz.length > 0) {
        //         ResManager.onFireIdleDownload();
        //     }
        //     if (ResManager._idleDownloadClz.length == 0) {
        //         ResManager._currentIdleDown = null;
        //         HeartBeat.removeListener(this, this.onHbCheckDownloadIdle);
        //     }
        // }
        // /**
        //  * 进行闲时现在
        //  */
        // private static onFireIdleDownload(): void {
        //     if (ResManager._currentIdleDown == null && ResManager._idleDownloadClz.length > 0) {
        //         var clz: any = ResManager._idleDownloadClz.shift();
        //         var inst: ReceiveGroup = <ReceiveGroup>ObjectPool.getByClass(clz, "", false);
        //         if (inst && !inst._uiResReady) {
        //             ResManager._currentIdleDown = inst;
        //             inst.visible = false;
        //             GlobalSetting.STAGE.addChildAt(inst, 0);
        //             inst.idleDownload();
        //             inst.removeFromParent();
        //             inst.visible = true;
        //         }
        //     }
        // }
        /****************** 对config文件下载进行统一调度,加强RES下载的及时性,确保成功 *****************************/
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
        ResManager._res_resourceConfig = null;
        ResManager._res_hb_rate = 30;
        return ResManager;
    }());
    codeBase.ResManager = ResManager;
    __reflect(ResManager.prototype, "codeBase.ResManager");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=ResManager.js.map