var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    // export class RES {
    // 	public constructor() {
    // 	}
    // 	public static VersionController: any;
    // 	public static vcs: any;
    // 	public static getVirtualUrl(url: string): string {
    // 		return RES.vcs ? RES.getVirtualUrl(url) : url;
    // 	}
    // 	public static getRes(key: string): any {
    // 		if (key == null) {
    // 			Debug.log = "资源key为空";
    // 			return;
    // 		}
    // 		let res: any;
    // 		let arr: Array<string> = key.split(".");
    // 		let mainKey: string;
    // 		let fileData: any;
    // 		mainKey = arr[0];
    // 		fileData = EgretProto.getFileData(mainKey);
    // 		if (fileData == null) {
    // 			Debug.log = "资源配置表中不存在资源:" + key;
    // 			return null;
    // 		}
    // 		if (fileData.type == "sheet") {
    // 			//mainKey = mainKey.replace("_json", "");
    // 			res = EgretProto.getResByKey(arr[1], fileData.url.replace(".json", ".png"));
    // 		}
    // 		else {
    // 			if (fileData.type == "font") {
    // 				res = EgretProto.getFontByKey(fileData.url);
    // 			}
    // 			else if (fileData.type == "image") {
    // 				res = EgretProto.getResByKey(fileData.url);
    // 			}
    // 			else if (fileData.type == "bin") {
    // 				res = EgretProto.getResByKey(fileData.url);
    // 			}
    // 			else if (fileData.type == "sound") {
    // 				res = EgretProto.getResByKey(fileData.url);
    // 			}
    // 			else {
    // 				res = EgretProto.getResByKey(fileData.url);
    // 			}
    // 		}
    // 		return res;
    // 	}
    // 	// public static getResAsync(key: string, callBack: Function = null, thisObject: any = null): Promise<any> {
    // 	// 	let res: any;
    // 	// 	let mainKey: string;
    // 	// 	if (key == null) {
    // 	// 		Debug.log = "资源key为空";
    // 	// 		return;
    // 	// 	}
    // 	// 	res = RES.getRes(key);
    // 	// 	if (res == null) {
    // 	// 		let arr: Array<string> = key.split(".");
    // 	// 		mainKey = arr[0];
    // 	// 		if (arr.length == 2) {
    // 	// 			arr[0] = mainKey = mainKey.replace("_json", "");
    // 	// 			Main.instance.myLoader.loadData(mainKey + ".json", function (l: GYLite.LoadInfo): void {
    // 	// 				Main.instance.myLoader.loadPath(mainKey + ".png", function (l: GYLite.LoadInfo): void {
    // 	// 					if (l.param.json == null || l.content == null) {
    // 	// 						Log.writeLog("资源不存在 " + arr[0] + "-" + arr[1], Log.WARN);
    // 	// 						if (l.param.callBack != null)
    // 	// 							l.param.callBack.call(l.param.thisObject, null, l.param.paramKey);
    // 	// 					}
    // 	// 					else if (l.param.callBack != null)
    // 	// 						l.param.callBack.call(l.param.thisObject, EgretProto.getResByKey(arr[1], arr[0] + ".png"), l.param.paramKey);
    // 	// 				}, null, GYLite.GYLoader.TYPE_IMAGE, { json: l.content.res, paramKey: arr, callBack: callBack, thisObject: thisObject });
    // 	// 			}, null, null, GYLite.GYLoader.TYPE_JSON, "get", { paramKey: arr, callBack: callBack, thisObject: thisObject });
    // 	// 		}
    // 	// 		else {
    // 	// 			if (mainKey.indexOf("_fnt") > -1) {
    // 	// 				Main.instance.myLoader.loadData(mainKey.replace("_fnt", ".fnt"), function (l: GYLite.LoadInfo): void {
    // 	// 					Main.instance.myLoader.loadPath(mainKey.replace("_fnt", ".png"), function (l: GYLite.LoadInfo): void {
    // 	// 						if (l.param.json == null || l.content == null) {
    // 	// 							Log.writeLog("字体不存在 " + l.param.paramKey, Log.WARN);
    // 	// 							if (l.param.callBack != null)
    // 	// 								l.param.callBack.call(l.param.thisObject, null, l.param.paramKey);
    // 	// 						}
    // 	// 						else if (l.param.callBack != null)
    // 	// 							l.param.callBack.call(l.param.thisObject, EgretProto.getFontByKey(mainKey));
    // 	// 					}, null, GYLite.GYLoader.TYPE_IMAGE, { json: l.content.res, paramKey: mainKey, callBack: callBack, thisObject: thisObject });
    // 	// 				}, null, null, GYLite.GYLoader.TYPE_JSON, "get", { paramKey: mainKey, callBack: callBack, thisObject: thisObject });
    // 	// 			}
    // 	// 			else if (mainKey.indexOf("_json") > -1) {
    // 	// 				Main.instance.myLoader.loadData(mainKey, function (l: GYLite.LoadInfo): void {
    // 	// 					if (l.param.json == null || l.content == null) {
    // 	// 						Log.writeLog("json数据不存在 " + l.param.paramKey, Log.WARN);
    // 	// 						if (l.param.callBack != null)
    // 	// 							l.param.callBack.call(l.param.thisObject, null, l.param.paramKey);
    // 	// 					}
    // 	// 					else if (l.param.callBack != null)
    // 	// 						l.param.callBack.call(l.param.thisObject, EgretProto.getDataResByKey(mainKey), l.param.paramKey);
    // 	// 				}, null, null, GYLite.GYLoader.TYPE_JSON, "get", { paramKey: mainKey, callBack: callBack, thisObject: thisObject });
    // 	// 			}
    // 	// 			else {
    // 	// 				mainKey = mainKey.replace("_jpg", ".jpg");
    // 	// 				mainKey = mainKey.replace("_png", ".png");
    // 	// 				Main.instance.myLoader.loadPath(mainKey, function (l: GYLite.LoadInfo): void {
    // 	// 					if (l.param.json == null || l.content == null) {
    // 	// 						Log.writeLog("图片不存在 " + l.param.paramKey, Log.WARN);
    // 	// 						if (l.param.callBack != null)
    // 	// 							l.param.callBack.call(l.param.thisObject, null, l.param.paramKey);
    // 	// 					}
    // 	// 					else if (l.param.callBack != null)
    // 	// 						l.param.callBack.call(l.param.thisObject, EgretProto.getResByKey(mainKey), l.param.paramKey);
    // 	// 				}, null, GYLite.GYLoader.TYPE_IMAGE, { parmaKey: mainKey, callBack: callBack, thisObject: thisObject });
    // 	// 			}
    // 	// 		}
    // 	// 	}
    // 	// 	return Promise.resolve(res);
    // 	// }
    // 	public static loadGroup(name, priority, reporter): void {
    // 		Debug.log = "暂时不支持组加载";
    // 	}
    // 	public static createGroup(name, keys, override): void {
    // 		Debug.log = "暂时不支持组创建";
    // 	}
    // 	public static getResByUrl(url: string, compFunc?: Function, thisObject?: any, type?: string): Promise<any> {
    // 		Debug.log = "暂时不支持getResByUrl";
    // 		return Promise.reject(null);
    // 	}
    // }
    var NativeVersionController = (function () {
        function NativeVersionController() {
        }
        NativeVersionController.prototype.init = function () {
            this.versionInfo = this.getLocalData("all.manifest");
            return Promise.resolve();
        };
        NativeVersionController.prototype.getVirtualUrl = function (url) {
            return url;
        };
        ;
        NativeVersionController.prototype.getLocalData = function (filePath) {
            if (egret_native.readUpdateFileSync && egret_native.readResourceFileSync) {
                //先取更新目录
                var content = egret_native.readUpdateFileSync(filePath);
                if (content != null) {
                    return JSON.parse(content);
                }
                //再取资源目录
                content = egret_native.readResourceFileSync(filePath);
                if (content != null) {
                    return JSON.parse(content);
                }
            }
            return null;
        };
        return NativeVersionController;
    }());
    codeBase.NativeVersionController = NativeVersionController;
    __reflect(NativeVersionController.prototype, "codeBase.NativeVersionController");
})(codeBase || (codeBase = {}));
