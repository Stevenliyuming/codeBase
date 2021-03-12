module codeBase {
	export class EgretProto {
		private static _resDict: any = {};
		private static _dataResDict: any = {};
		private static _fontDict: any = {};
		private static _dataDict: any = {};
		private static _fileDict: any = {};

		public constructor() {
		}

		/**
		 * eui资源获取方法复写
		 */
		public static inject(): void {
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
					Debug.log = "资源key为空";
					return null;
				}
				let res: any;
				let arr: Array<string> = key.split(".");
				let mainKey: string;
				let fileData: any;
				mainKey = arr[0];
				fileData = EgretProto.getFileData(mainKey);
				if (fileData == null) {
					Debug.log = "资源配置表中不存在资源:" + key;
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
			}

			eui.getAssets = function (key: string, callBack: Function, thisObject: any) {
				if (key == null) {
					Debug.log = "资源key为空";
					return;
				}
				let res = RES.getRes(key);
				if (res && callBack != null)
					callBack.call(thisObject, res);
			}

			//资源配置表注入解析
			EgretProto.injectResConfig("default.res.json");
		}

		/**
		 * 注入资源配置表
		 */
		protected static injectResConfig(resFile: string) {
			let s = this;
			if (resFile == null) {
				Debug.log = "请指定需要使用的资源配置表文件";
				return;
			}
			//初始化egret资源字典
			let res: any = EgretProto.getConfigDataByKey(resFile);
			let i: number, len: number;
			if (res == null) {
				Debug.log = "不存在资源配置表文件:" + resFile;
			} else {
				if (EgretProto._fileDict[resFile] == null)
					EgretProto._fileDict[resFile] = {};
				let fileDict: any = EgretProto._fileDict[resFile];
				let fileData: any;
				let arr: Array<string>;
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
		}

		/**获取数据资源
		 * @param key 数据键名 json则是_json结尾
		 * @param uiID 模块名称，没有则默认为当前模块，包含包路径
		*/
		public static getFileData(key: string, uiID: string = "default.res.json"): any {
			let fileDict: any = EgretProto._fileDict[uiID];
			let s = this;
			if (fileDict == null) {
				for (var fileKey in EgretProto._fileDict) {
					if (EgretProto._fileDict[fileKey][key]) {
						return EgretProto._fileDict[fileKey][key];
					}
				}
			}
			return fileDict[key];
		}

		/**获取数据资源
		 * @param key 数据键名 json则是_json结尾
		 * @param uiID 模块名称，没有则默认为当前模块，包含包路径
		 * @param check 检测提示
		*/
		public static getConfigDataByKey(key: string, uiID: string = null, check: boolean = true): any {
			let arr: Array<ResourceItem.ResObject>;
			let dataRes: ResourceItem.ResObject;
			let resKey: string;
			uiID = uiID != null ? uiID : "";
			resKey = uiID + "_" + key;
			if (EgretProto._dataDict[resKey] != null)
				return EgretProto._dataDict[resKey];

			arr = ResLoader.getInstance().getResGroup(key);
			if (arr.length > 0) {
				dataRes = arr[0];
			}
			if (dataRes == null && check) {
				Debug.log = "数据不存在 " + key;
				return null;
			}
			EgretProto._dataDict[resKey] = dataRes.res;
			return dataRes.res;
		}

		/**获取字体资源
		 * @param key 字体键名 _fnt结尾
		 * @param uiID 模块名称，没有则默认为当前模块，包含包路径
		 * @param check 检测提示
		*/
		public static getFontByKey(key: string, uiID: string = null, check: boolean = true): any {
			let arr: Array<ResourceItem.ResObject>;
			let pngRes: ResourceItem.ResObject, jsonRes: ResourceItem.ResObject;
			let fontKey: string;
			uiID = "";
			fontKey = uiID + "_" + key;
			if (EgretProto._fontDict[fontKey] != null)
				return EgretProto._fontDict[fontKey];

			arr = ResLoader.getInstance().getResGroup(key);
			if (arr.length > 0) {
				jsonRes = arr[0];
			}
			pngRes = ResLoader.getInstance().getRes(jsonRes.pathKey.replace(".fnt", ".png"));
			if (check) {
				if (pngRes == null) {
					Debug.log = "字体图集不存在 " + key;
				}
				if (jsonRes == null) {
					Debug.log = "字体配置不存在 " + key;
				}
				return null;
			}
			EgretProto._fontDict[fontKey] = new egret.BitmapFont(pngRes.res, jsonRes.res);
			return EgretProto._fontDict[fontKey];
		}

		/**获取图片资源
		 * @param key 图片键名 图集小图只需要名称，不需要后缀名，PS：白鹭的图集小图，只根据名称进行查询，所以此方法内部会根据uiID进行遍历查询
		 * @param alias 图集名称，需要后缀名
		 * @param uiID 模块名称，没有则默认为当前模块，包含包路径
		 * @param check 检测提示
		*/
		public static getResByKey(key: string, alias: string = null, check: boolean = true): any {
			let arr: Array<ResourceItem.ResObject>;
			let len: number;
			let res: ResourceItem.ResObject;
			let ind: number;
			let resKey = alias ? alias + key : key
			if (EgretProto._resDict[resKey] != null)
				return EgretProto._resDict[resKey];
			if (alias == null) {
				arr = ResLoader.getInstance().getResGroup(key);
				if (arr.length > 0) {
					res = arr[0];
				}

			} else {
				let arr2: Array<ResourceItem.ResObject> = ResLoader.getInstance().getResGroup(alias);
				if (arr2.length > 0) {
					res = ResLoader.getInstance().getRes(key, arr2[0].pathKey);
				}
			}
			if (res == null && check) {
				Debug.log = "资源不存在 " + key + "-" + alias;
				return null;
			}
			EgretProto._resDict[resKey] = res.res;
			return res.res;
		}


		public static deleteResByKey(deleteKey: string): void {
			let ind: number;
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
		}
	}
}
