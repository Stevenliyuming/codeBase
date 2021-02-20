var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var EgretProto = (function () {
        function EgretProto() {
        }
        /**
         * eui资源获取方法复写
         */
        EgretProto.inject = function () {
            //let eui;
            // if (window["eui"] == null) {
            // 	window["eui"] = {};
            // }
            // eui = window["eui"];
            // let res;
            // if(window["RES"] == null) {
            // 	window["RES"] = {};
            // }
            // res = window["RES"];
            RES.getRes = function (key) {
                if (key == null) {
                    codeBase.Debug.log = "资源key为空";
                    return;
                }
                var res;
                var arr = key.split(".");
                var mainKey;
                var fileData;
                mainKey = arr[0];
                fileData = EgretProto.getFileData(mainKey);
                if (fileData == null) {
                    codeBase.Debug.log = "资源配置表中不存在资源:" + key;
                    return null;
                }
                if (fileData.type == "sheet") {
                    //mainKey = mainKey.replace("_json", "");
                    res = EgretProto.getResByKey(arr[1], fileData.url.replace(".json", ".png"));
                }
                else {
                    if (fileData.type == "font") {
                        res = EgretProto.getFontByKey(fileData.url);
                    }
                    else if (fileData.type == "image") {
                        res = EgretProto.getResByKey(fileData.url);
                    }
                    else if (fileData.type == "bin") {
                        res = EgretProto.getResByKey(fileData.url);
                    }
                    else if (fileData.type == "sound") {
                        res = EgretProto.getResByKey(fileData.url);
                    }
                    else {
                        res = EgretProto.getResByKey(fileData.url);
                    }
                }
                return res;
            };
            eui.getAssets = function (key, callBack, thisObject) {
                if (key == null) {
                    codeBase.Debug.log = "资源key为空";
                    return;
                }
                var res;
                res = RES.getRes(key);
                if (callBack != null)
                    callBack.call(thisObject, res);
            };
            EgretProto.injectResConfig("default.res.json");
        };
        /**
         * 注入资源配置表
         */
        EgretProto.injectResConfig = function (resFile) {
            var s = this;
            if (resFile == null) {
                codeBase.Debug.log = "请指定需要使用的资源配置表文件";
                return;
            }
            //初始化egret资源字典
            var res = EgretProto.getConfigDataByKey(resFile);
            var i, len;
            if (res == null) {
                codeBase.Debug.log = "不存在资源配置表文件:" + resFile;
            }
            else {
                if (EgretProto._fileDict[resFile] == null)
                    EgretProto._fileDict[resFile] = {};
                var fileDict = EgretProto._fileDict[resFile];
                var fileData = void 0;
                var arr = void 0;
                len = res.resources.length;
                for (i = 0; i < len; ++i) {
                    fileData = res.resources[i];
                    arr = fileData.url.split("/");
                    fileData.fileName = arr[arr.length - 1];
                    arr = fileData.fileName.split(".");
                    fileData.ext = arr[arr.length - 1];
                    fileDict[fileData.name] = fileData;
                }
            }
        };
        /**获取数据资源
         * @param key 数据键名 json则是_json结尾
         * @param uiID 模块名称，没有则默认为当前模块，包含包路径
        */
        EgretProto.getFileData = function (key, uiID) {
            if (uiID === void 0) { uiID = "default.res.json"; }
            var fileDict = EgretProto._fileDict[uiID];
            var s = this;
            if (fileDict == null) {
                for (var fileKey in EgretProto._fileDict) {
                    if (EgretProto._fileDict[fileKey][key]) {
                        return EgretProto._fileDict[fileKey][key];
                    }
                }
            }
            return fileDict[key];
        };
        /**获取数据资源
         * @param key 数据键名 json则是_json结尾
         * @param uiID 模块名称，没有则默认为当前模块，包含包路径
         * @param check 检测提示
        */
        EgretProto.getConfigDataByKey = function (key, uiID, check) {
            if (uiID === void 0) { uiID = null; }
            if (check === void 0) { check = true; }
            var arr;
            var dataRes;
            var resKey;
            uiID = "";
            resKey = uiID + "_" + key;
            if (EgretProto._dataDict[resKey] != null)
                return EgretProto._dataDict[resKey];
            arr = codeBase.ResLoader.getInstance().getResGroup(key);
            if (arr.length > 0) {
                dataRes = arr[0];
            }
            if (dataRes == null && check) {
                codeBase.Debug.log = "数据不存在 " + key;
                return null;
            }
            EgretProto._dataDict[resKey] = dataRes.res;
            return dataRes.res;
        };
        /**获取字体资源
         * @param key 字体键名 _fnt结尾
         * @param uiID 模块名称，没有则默认为当前模块，包含包路径
         * @param check 检测提示
        */
        EgretProto.getFontByKey = function (key, uiID, check) {
            if (uiID === void 0) { uiID = null; }
            if (check === void 0) { check = true; }
            var arr;
            var pngRes, jsonRes;
            var fontKey;
            uiID = "";
            fontKey = uiID + "_" + key;
            if (EgretProto._fontDict[fontKey] != null)
                return EgretProto._fontDict[fontKey];
            arr = codeBase.ResLoader.getInstance().getResGroup(key);
            if (arr.length > 0) {
                jsonRes = arr[0];
            }
            pngRes = codeBase.ResLoader.getInstance().getRes(jsonRes.pathKey.replace(".fnt", ".png"));
            if (check) {
                if (pngRes == null) {
                    codeBase.Debug.log = "字体图集不存在 " + key;
                }
                if (jsonRes == null) {
                    codeBase.Debug.log = "字体配置不存在 " + key;
                }
                return null;
            }
            EgretProto._fontDict[fontKey] = new egret.BitmapFont(pngRes.res, jsonRes.res);
            return EgretProto._fontDict[fontKey];
        };
        /**获取图片资源
         * @param key 图片键名 图集小图只需要名称，不需要后缀名，PS：白鹭的图集小图，只根据名称进行查询，所以此方法内部会根据uiID进行遍历查询
         * @param alias 图集名称，需要后缀名
         * @param uiID 模块名称，没有则默认为当前模块，包含包路径
         * @param check 检测提示
        */
        EgretProto.getResByKey = function (key, alias, check) {
            if (alias === void 0) { alias = null; }
            if (check === void 0) { check = true; }
            var arr;
            var len;
            var res;
            var ind;
            var resKey = alias ? alias + key : key;
            if (EgretProto._resDict[resKey] != null)
                return EgretProto._resDict[resKey];
            if (alias == null) {
                arr = codeBase.ResLoader.getInstance().getResGroup(key);
                if (arr.length > 0) {
                    res = arr[0];
                }
            }
            else {
                var arr2 = codeBase.ResLoader.getInstance().getResGroup(alias);
                if (arr2.length > 0) {
                    res = codeBase.ResLoader.getInstance().getRes(key, arr2[0].pathKey);
                }
            }
            if (res == null && check) {
                codeBase.Debug.log = "资源不存在 " + key + "-" + alias;
                return null;
            }
            EgretProto._resDict[resKey] = res.res;
            return res.res;
        };
        EgretProto.deleteResByKey = function (deleteKey) {
            var ind;
            for (var key in EgretProto._resDict) {
                ind = key.indexOf(deleteKey);
                if (ind == 0 || key.indexOf("/" + deleteKey) > -1) {
                    delete EgretProto._resDict[key];
                }
            }
            for (var key in EgretProto._dataDict) {
                ind = key.indexOf(deleteKey);
                if (ind == 0 || key.indexOf("/" + deleteKey) > -1) {
                    delete EgretProto._resDict[key];
                }
            }
            for (var key in EgretProto._fontDict) {
                ind = key.indexOf(deleteKey + "_");
                if (ind == 0) {
                    EgretProto._fontDict[key].dispose();
                    delete EgretProto._fontDict[key];
                }
            }
            if (EgretProto._fileDict[deleteKey])
                delete EgretProto._fileDict[deleteKey];
        };
        EgretProto._resDict = {};
        EgretProto._dataResDict = {};
        EgretProto._fontDict = {};
        EgretProto._dataDict = {};
        EgretProto._fileDict = {};
        return EgretProto;
    }());
    codeBase.EgretProto = EgretProto;
    __reflect(EgretProto.prototype, "codeBase.EgretProto");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=EgretProto.js.map