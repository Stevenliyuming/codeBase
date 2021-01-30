var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var codeBase;
(function (codeBase) {
    var ResourceItem;
    (function (ResourceItem) {
        /**
         * EXML file.
         * @version Egret 5.2
         * @platform Web,Native
         * @language en_US
         */
        ResourceItem.TYPE_EXML = "exml";
        /**
         * XML 文件。
         * @version Egret 5.2
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_XML = "xml";
        /**
         * Picture file.
         * @version Egret 5.2
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 图片文件。
         * @version Egret 5.2
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_IMAGE = "image";
        /**
         * Binary file.
         * @version Egret 5.2
         * @platform Web
         * @language en_US
         */
        /**
         * 二进制文件。
         * @version Egret 5.2
         * @platform Web
         * @language zh_CN
         */
        ResourceItem.TYPE_BIN = "bin";
        /**
         * Text file.
         * @version Egret 5.2
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 文本文件。
         * @version Egret 5.2
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_TEXT = "text";
        /**
         * JSON file.
         * @version Egret 5.2
         * @platform Web,Native
         * @language en_US
         */
        /**
         * JSON 文件。
         * @version Egret 5.2
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_JSON = "json";
        /**
         * SpriteSheet file.
         * @version Egret 5.2
         * @platform Web,Native
         * @language en_US
         */
        /**
         * SpriteSheet 文件。
         * @version Egret 5.2
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_SHEET = "sheet";
        /**
         * BitmapTextSpriteSheet file.
         * @version Egret 5.2
         * @platform Web,Native
         * @language en_US
         */
        /**
         * BitmapTextSpriteSheet 文件。
         * @version Egret 5.2
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_FONT = "font";
        /**
         * Sound file.
         * @version Egret 5.2
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 声音文件。
         * @version Egret 5.2
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_SOUND = "sound";
        /**
         * TTF file.
         * @version Egret 5.3
         * @platform Web,Native
         * @language en_US
         */
        /**
         * TTF字体文件。
         * @version Egret 5.3
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceItem.TYPE_TTF = "ttf";
        /**
         * 动画图集文件
         */
        ResourceItem.TYPE_ATLAS = "atlas";
        /**
         * 打包资源文件
         */
        ResourceItem.TYPE_PKG = "pkg";
        /**资源对象，包含资源以及资源的引用计数，引用计数为0时，资源会被回收*/
        var ResObject = (function () {
            function ResObject() {
                this._count = 0;
                this.res = null;
                this.inPool = false;
            }
            /**获取资源时，请尽量使用getRes，以便引用计数*/
            ResObject.prototype.getRes = function () {
                var s = this;
                s._count += 1;
                return s.res;
            };
            /**资源释放时，请把引用设置为null，避免重复释放*/
            ResObject.prototype.relRes = function () {
                var s = this;
                s._count -= 1;
                if (s._count <= 0) {
                    console.log("重复释放资源：" + s.pathKey);
                }
            };
            ResObject.prototype.clear = function (gc) {
                var s = this;
                if (s.type == ResourceItem.TYPE_IMAGE) {
                    s.res.dispose();
                }
                else if (s.type == ResourceItem.TYPE_SOUND) {
                    s.res.close();
                }
                if (s.param && s.param.subRes) {
                    var len = s.param.subRes.length;
                    while (--len > -1) {
                        s.param.subRes[len].clear();
                    }
                }
                s.res = null;
                s.inPool = true;
                s._count = 0;
                s.param = null;
                s.pathKey = null;
            };
            Object.defineProperty(ResObject.prototype, "count", {
                /**引用数量*/
                get: function () {
                    return this._count;
                },
                enumerable: true,
                configurable: true
            });
            ;
            /**
             * 获得一个资源实例
             */
            ResObject.getResObject = function () {
                var obj = new ResObject;
                return obj;
            };
            return ResObject;
        }());
        ResourceItem.ResObject = ResObject;
        __reflect(ResObject.prototype, "codeBase.ResourceItem.ResObject");
        /**资源加载信息 */
        var LoadInfo = (function () {
            function LoadInfo() {
                this.url = null;
                this.callBack = null;
                this.funObj = null;
                this.responseType = "";
                this.resTag = null;
                this.loader = null;
                this.resGroup = null;
            }
            return LoadInfo;
        }());
        ResourceItem.LoadInfo = LoadInfo;
        __reflect(LoadInfo.prototype, "codeBase.ResourceItem.LoadInfo");
        var ResGroup = (function () {
            function ResGroup() {
                this.groupName = null;
                this.resNum = 0;
                this.status = 0; //0 未加载完成 1 加载完成
                this.loadInfoArray = [];
                this.callBack = null;
                this.funObj = null;
            }
            return ResGroup;
        }());
        ResourceItem.ResGroup = ResGroup;
        __reflect(ResGroup.prototype, "codeBase.ResourceItem.ResGroup");
    })(ResourceItem = codeBase.ResourceItem || (codeBase.ResourceItem = {}));
    var ResLoader = (function (_super) {
        __extends(ResLoader, _super);
        function ResLoader() {
            var _this = _super.call(this) || this;
            _this.resDict = {};
            _this.loadPool = [];
            _this.waitPool = [];
            _this._maxLoadNum = 5;
            _this.resGroupPool = {};
            return _this;
        }
        ResLoader.getInstance = function () {
            if (!ResLoader.inst)
                ResLoader.inst = new ResLoader;
            return ResLoader.inst;
        };
        /**加载资源
         * url 资源路径
         * callBack 加载结束回调
         * funObj 回调函数指向
         * resTag 资源标签 传入此标签调用方可以确认是哪个资源加载成功
        */
        ResLoader.prototype.loadRes = function (url, callBack, funObj, responseType, resTag) {
            if (callBack === void 0) { callBack = null; }
            if (funObj === void 0) { funObj = null; }
            if (responseType === void 0) { responseType = ""; }
            if (resTag === void 0) { resTag = null; }
            var s = this;
            ResLoader.loadHashCode += 1;
            var loadInfo = s.checkLoadInfo(url);
            //检测是否已经在加载队列中
            if (!loadInfo) {
                //检测加载队列是否已满
                if (s.loadPool.length < s._maxLoadNum) {
                    loadInfo = s.resLoad(url, null, callBack, funObj, "get", responseType, false, null);
                    s.loadPool.push(loadInfo);
                }
                else {
                    s.waitPool.push(loadInfo);
                }
            }
        };
        ResLoader.prototype.checkLoadInfo = function (url) {
            var s = this;
            if (s.loadPool.length > 0) {
                for (var i = 0; i < s.loadPool.length; ++i) {
                    var item = s.loadPool[i];
                    if (item.url === url) {
                        return item;
                    }
                }
            }
            if (s.waitPool.length > 0) {
                for (var i = 0; i < s.waitPool.length; ++i) {
                    var item = s.waitPool[i];
                    if (item.url === url) {
                        return item;
                    }
                }
            }
            return null;
        };
        Object.defineProperty(ResLoader.prototype, "maxLoadNum", {
            /**获取最大加载请求数 */
            get: function () {
                return this.maxLoadNum;
            },
            /**设置最大加载请求数 */
            set: function (value) {
                this.maxLoadNum = value;
            },
            enumerable: true,
            configurable: true
        });
        /**加载资源 */
        ResLoader.prototype.resLoad = function (url, data, callBack, funObj, method, responseType, withCredentials, headerObj) {
            if (data === void 0) { data = null; }
            if (method === void 0) { method = "GET"; }
            if (responseType === void 0) { responseType = null; }
            if (withCredentials === void 0) { withCredentials = false; }
            if (headerObj === void 0) { headerObj = null; }
            var s = this;
            var loadInfo = new ResourceItem.LoadInfo;
            loadInfo.url = url;
            loadInfo.callBack = callBack;
            loadInfo.funObj = funObj;
            loadInfo.responseType = responseType;
            //loadInfo.resTag = resTag;
            _super.prototype.load.call(this, url, data, loadInfo, method, responseType, withCredentials);
            return loadInfo;
        };
        /**加载资源 */
        ResLoader.prototype.resGroupLoad = function (urlGroup, groupName, data, callBack, funObj, method, responseType, withCredentials, headerObj) {
            if (urlGroup === void 0) { urlGroup = []; }
            if (data === void 0) { data = null; }
            if (method === void 0) { method = "GET"; }
            if (responseType === void 0) { responseType = ""; }
            if (withCredentials === void 0) { withCredentials = false; }
            if (headerObj === void 0) { headerObj = null; }
            var s = this;
            if (s.resGroupPool[groupName]) {
                console.log(groupName + ":资源组已经在加载队列中");
                return;
            }
            var resGroup = new ResourceItem.ResGroup;
            resGroup.groupName = groupName;
            resGroup.callBack = callBack;
            resGroup.funObj = funObj;
            s.resGroupPool[groupName] = resGroup;
            for (var i = 0; i < urlGroup.length; ++i) {
                if (urlGroup[i] == "")
                    continue;
                var resType = s.typeSelector(urlGroup[i]);
                var respType = responseType;
                if (resType == ResourceItem.TYPE_IMAGE || resType == ResourceItem.TYPE_SOUND || resType == ResourceItem.TYPE_BIN) {
                    respType = "arraybuffer";
                }
                var loadInfo = new ResourceItem.LoadInfo;
                loadInfo.url = urlGroup[i];
                loadInfo.callBack = callBack;
                loadInfo.funObj = funObj;
                loadInfo.responseType = respType;
                //loadInfo.resTag = resTag;
                //组资源加载
                loadInfo.resGroup = resGroup;
                resGroup.loadInfoArray.push(loadInfo);
                resGroup.resNum += 1;
                _super.prototype.load.call(this, urlGroup[i], data, loadInfo, method, respType, withCredentials);
            }
        };
        ResLoader.prototype.loadFinishCall = function (target) {
            var s = this;
            var loadInfo = target.loadInfo;
            var resPath = loadInfo.url;
            // console.log(resPath);
            var type = s.typeSelector(resPath);
            var decodeFun = s.decodeFunction(type);
            if (decodeFun) {
                decodeFun.call(s, loadInfo);
            }
            else {
                console.log("无法解析资源类型：" + resPath);
            }
        };
        /**解析打包资源 */
        ResLoader.prototype.decodePackageRes = function (loadInfo) {
            var s = this;
            var resGroup = new ResourceItem.ResGroup;
            resGroup.groupName = loadInfo.url;
            resGroup.callBack = loadInfo.callBack;
            resGroup.funObj = loadInfo.funObj;
            s.resGroupPool[resGroup.groupName] = resGroup;
            var res = loadInfo.loader.response;
            var resBuffer = new egret.ByteArray(res);
            resBuffer.position = 0;
            resBuffer.endian = egret.Endian.LITTLE_ENDIAN;
            //打包的文件个数
            var fileNum = resBuffer.readUnsignedShort();
            resGroup.resNum = fileNum;
            for (var i = 0; i < fileNum; ++i) {
                resBuffer.endian = egret.Endian.LITTLE_ENDIAN;
                //文件路径长度
                var pathLength = resBuffer.readUnsignedShort();
                //文件内容长度
                var fileLength = resBuffer.readUnsignedInt();
                //读取文件路径
                resBuffer.endian = egret.Endian.BIG_ENDIAN;
                var fileLocalPath = resBuffer.readUTFBytes(pathLength);
                console.log(fileLocalPath);
                //读取文件内容
                var fileByteArray = new egret.ByteArray;
                resBuffer.readBytes(fileByteArray, 0, fileLength);
                //单个文件信息
                var loadInfo2 = new ResourceItem.LoadInfo;
                loadInfo2.url = fileLocalPath;
                loadInfo2.callBack = loadInfo.callBack;
                loadInfo2.funObj = loadInfo.funObj;
                loadInfo2.resGroup = resGroup;
                loadInfo2.loader = new codeBase.HttpLoader;
                //文件类型
                var respType = void 0;
                var resType = s.typeSelector(fileLocalPath);
                if (resType == ResourceItem.TYPE_IMAGE || resType == ResourceItem.TYPE_SOUND || resType == ResourceItem.TYPE_BIN) {
                    respType = "arraybuffer";
                    loadInfo2.buffer = fileByteArray.buffer;
                }
                else {
                    loadInfo2.buffer = fileByteArray.readUTFBytes(fileLength);
                }
                loadInfo2.responseType = respType;
                //在资源组中添加单个资源
                resGroup.loadInfoArray.push(loadInfo2);
                // resGroup.resNum += 1;
                var decodeFun = s.decodeFunction(resType);
                if (decodeFun) {
                    decodeFun.call(s, loadInfo2);
                }
                else {
                    console.log("无法解析资源类型：" + fileLocalPath);
                }
            }
        };
        /**
         * 解析图片
         */
        ResLoader.prototype.decodeIMAGE = function (loadInfo) {
            var s = this;
            var data = loadInfo.loader.response || loadInfo.buffer;
            var bitmapData = egret.BitmapData.create("arraybuffer", data, function (bmp) {
                var res = new egret.Texture();
                res._setBitmapData(bmp);
                var obj = ResourceItem.ResObject.getResObject();
                obj.pathKey = loadInfo.url;
                obj.type = ResourceItem.TYPE_IMAGE;
                obj.res = res;
                obj.buffer = data;
                s.setRes(obj.pathKey, obj, loadInfo);
            });
        };
        /**
         * 解析声音
         */
        ResLoader.prototype.decodeSOUND = function (loadInfo) {
            var s = this;
            var buff = loadInfo.loader.response || loadInfo.buffer;
            var sound = new egret.Sound();
            var _file = new File([buff], "");
            var obj_url = window.URL.createObjectURL(_file);
            sound.load(obj_url);
            sound.once(egret.Event.COMPLETE, onAudioLoaded, s);
            sound.once(egret.IOErrorEvent.IO_ERROR, onAudioLoaded, s);
            /**WebAudioSound解析方式 */
            // let buffer:ArrayBuffer = target.response;
            // var audioDecode = egret["web"].WebAudioDecode;
            // audioDecode.decodeArr.push({
            // 	"buffer": buffer,
            // 	"success": onAudioLoaded,
            // 	"fail": onAudioError,
            // 	"self": sound,
            // 	//"url": self.url
            // });
            // audioDecode.decodeAudios();
            function onAudioLoaded() {
                var obj = ResourceItem.ResObject.getResObject();
                obj.pathKey = loadInfo.url;
                obj.type = ResourceItem.TYPE_SOUND;
                obj.res = sound;
                obj.buffer = buff;
                s.setRes(obj.pathKey, obj, loadInfo);
            }
            function onAudioError() {
                sound.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                console.log("声音解析失败：" + loadInfo.url);
                URL.revokeObjectURL(obj_url);
                obj_url = null;
            }
        };
        /**
       * desc: base64对象转blob文件对象
       * @param base64  ：数据的base64对象
       * @param fileType  ：文件类型 mp3等;
       * @returns {Blob}：Blob文件对象
       */
        ResLoader.prototype.base64ToBlob = function (base64, fileType) {
            var typeHeader = 'data:application/' + fileType + ';base64,'; // 定义base64 头部文件类型
            var audioSrc = typeHeader + base64; // 拼接最终的base64
            var arr = audioSrc.split(',');
            var array = arr[0].match(/:(.*?);/);
            var mime = (array && array.length > 1 ? array[1] : fileType) || fileType;
            // 去掉url的头，并转化为byte
            var bytes = window.atob(arr[1]);
            // 处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], {
                type: mime
            });
        };
        /**
         * 解析xml
         */
        ResLoader.prototype.decodeXML = function (loadInfo) {
            var s = this;
            var data = loadInfo.loader.response || loadInfo.buffer;
            var res = egret.XML.parse(data);
            var obj = ResourceItem.ResObject.getResObject();
            obj.pathKey = loadInfo.url;
            obj.type = ResourceItem.TYPE_XML;
            obj.res = res;
            obj.buffer = data;
            s.setRes(obj.pathKey, obj, loadInfo);
        };
        /**
         * 解析json
         */
        ResLoader.prototype.decodeJSON = function (loadInfo) {
            var s = this;
            var data = loadInfo.loader.response || loadInfo.buffer;
            var res = JSON.parse(data);
            var obj = ResourceItem.ResObject.getResObject();
            obj.pathKey = loadInfo.url;
            obj.type = ResourceItem.TYPE_JSON;
            obj.res = res;
            obj.buffer = data;
            s.setRes(obj.pathKey, obj, loadInfo);
        };
        /**
         * 解析txt
         */
        ResLoader.prototype.decodeTEXT = function (loadInfo) {
            var s = this;
            var data = loadInfo.loader.response || loadInfo.buffer;
            var res = JSON.parse(data);
            var obj = ResourceItem.ResObject.getResObject();
            obj.pathKey = loadInfo.url;
            obj.type = ResourceItem.TYPE_TEXT;
            obj.res = res;
            obj.buffer = data;
            s.setRes(obj.pathKey, obj, loadInfo);
        };
        /**解析字体 */
        ResLoader.prototype.decodeFONT = function () {
            var s = this;
        };
        /**解析字节数据 */
        ResLoader.prototype.decodeBIN = function (loadInfo) {
            var s = this;
            var res = loadInfo.loader.response || loadInfo.buffer;
            var obj = ResourceItem.ResObject.getResObject();
            obj.pathKey = loadInfo.url;
            obj.type = ResourceItem.TYPE_BIN;
            obj.res = res;
            obj.buffer = res;
            s.setRes(obj.pathKey, obj, loadInfo);
        };
        /**解析atlas图集数据 */
        ResLoader.prototype.decodeATLAS = function (loadInfo) {
            var s = this;
            var res = loadInfo.loader.response || loadInfo.buffer;
            var obj = ResourceItem.ResObject.getResObject();
            obj.pathKey = loadInfo.url;
            obj.type = ResourceItem.TYPE_ATLAS;
            obj.res = res;
            obj.buffer = res;
            s.setRes(obj.pathKey, obj, loadInfo);
        };
        /**解析帧动画 */
        ResLoader.prototype.decodeMovieClip = function (text) {
            var s = this;
            var mcData = JSON.parse(text);
            var imagePath = mcData.file;
            var mcTexture = s.getTexture(imagePath);
            var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        };
        /**设置加载资源 */
        ResLoader.prototype.setRes = function (url, res, loadInfo) {
            if (loadInfo === void 0) { loadInfo = null; }
            var s = this;
            if (s.resDict[url]) {
                s.resDict[url].clear();
            }
            s.resDict[url] = res;
            /**资源加载完成回调 */
            if (loadInfo) {
                console.log("单个资源加载完成:" + loadInfo.url);
                if (loadInfo.resGroup) {
                    loadInfo.resGroup.resNum -= 1;
                    if (loadInfo.resGroup.resNum <= 0) {
                        console.log("组资源加载完成:" + loadInfo.resGroup.groupName);
                        loadInfo.resGroup.status = 1;
                        if (loadInfo.resGroup.callBack) {
                            loadInfo.resGroup.callBack.call(loadInfo.resGroup.funObj, loadInfo.resGroup);
                        }
                    }
                }
                else {
                    if (loadInfo && loadInfo.callBack) {
                        loadInfo.callBack.call(loadInfo.funObj, loadInfo);
                    }
                }
            }
        };
        /**
         * 获取资源
         */
        ResLoader.prototype.getRes = function (key, aliasKey) {
            if (aliasKey === void 0) { aliasKey = null; }
            var s = this;
            if (aliasKey === void 0) {
                aliasKey = null;
            }
            var res;
            if (aliasKey == null)
                res = s.resDict[key];
            else {
                var arr = void 0;
                key = aliasKey + "$" + key;
                res = s.resDict[key];
                if (res == null) {
                    var spriteSheet = void 0;
                    var textureRes = void 0;
                    /**图集资源 */
                    textureRes = s.resDict[aliasKey];
                    if (textureRes) {
                        /**图集中的散图资源 */
                        if (textureRes.param == null) {
                            /**图集对应的json配置文件资源对象,需跟图集在同一个目录下 */
                            var jsonRes = s.getRes(aliasKey.replace(".png", ".json"));
                            if (jsonRes) {
                                textureRes.param = { sheet: new egret.SpriteSheet(textureRes.res), json: jsonRes, subRes: [] };
                                spriteSheet = textureRes.param.sheet;
                                /**json文件对象 */
                                var data = jsonRes.res;
                                var frames_1 = data.frames;
                                // spriteSheet["$resourceInfo"] = r;
                                for (var subkey in frames_1) {
                                    var config = frames_1[subkey];
                                    var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                                    if (config["scale9grid"]) {
                                        var str = config["scale9grid"];
                                        var list = str.split(",");
                                        texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                                    }
                                    /**散图贴图 */
                                    var newRes = ResourceItem.ResObject.getResObject();
                                    newRes.res = texture;
                                    newRes.pathKey = aliasKey + "$" + subkey;
                                    newRes.type = ResourceItem.TYPE_IMAGE;
                                    textureRes.param.subRes.push(newRes);
                                    s.setRes(newRes.pathKey, newRes);
                                }
                            }
                        }
                    }
                }
                res = s.resDict[key];
            }
            return res;
        };
        /**
         * 获取文本数据
         */
        ResLoader.prototype.getResData = function (key, alias) {
            if (alias === void 0) { alias = null; }
            var s = this;
        };
        ResLoader.prototype.getResGroup = function (key) {
            var s = this;
            var resGroup = [];
            if (key == null) {
                console.log("getResGroup:key为空");
                return resGroup;
            }
            ;
            var ind;
            for (var key2 in s.resDict) {
                ind = key2.indexOf(key);
                if (ind > -1) {
                    resGroup.push(s.resDict[key2]);
                }
            }
            return resGroup;
        };
        ResLoader.prototype.getTexture = function (imageName) {
            var s = this;
            var tex = s.getRes(imageName).res;
            return tex;
        };
        ResLoader.prototype.typeSelector = function (path) {
            var ext = path.substr(path.lastIndexOf(".") + 1);
            var type;
            switch (ext) {
                case ResourceItem.TYPE_XML:
                case ResourceItem.TYPE_JSON:
                case ResourceItem.TYPE_SHEET:
                    type = ext;
                    break;
                case "png":
                case "jpg":
                case "gif":
                case "jpeg":
                case "bmp":
                    type = ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    type = ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    type = ResourceItem.TYPE_TEXT;
                    break;
                case "mp3":
                case "ogg":
                case "mpeg":
                case "wav":
                case "m4a":
                case "mp4":
                case "aiff":
                case "wma":
                case "mid":
                    type = ResourceItem.TYPE_SOUND;
                    break;
                case "mergeJson":
                case "zip":
                case "pvr":
                    type = ext;
                    break;
                case "ttf":
                    type = ResourceItem.TYPE_TTF;
                    break;
                case "atlas":
                    type = ResourceItem.TYPE_ATLAS;
                    break;
                case "pkg":
                    type = ResourceItem.TYPE_PKG;
                    break;
                default:
                    type = ResourceItem.TYPE_BIN;
                    break;
            }
            return type;
        };
        ResLoader.prototype.decodeFunction = function (type) {
            var s = this;
            var processorMap = {
                "image": s.decodeIMAGE,
                "json": s.decodeJSON,
                "text": s.decodeTEXT,
                "xml": s.decodeXML,
                //"sheet": s.decodeSHEET,
                "font": s.decodeJSON,
                "bin": s.decodeBIN,
                // "commonjs": processor_1.CommonJSProcessor,
                "sound": s.decodeSOUND,
                "movieclip": s.decodeMovieClip,
                "atlas": s.decodeATLAS,
                "pkg": s.decodePackageRes
            };
            return processorMap[type];
        };
        ResLoader.loadHashCode = 1;
        return ResLoader;
    }(codeBase.Loader));
    codeBase.ResLoader = ResLoader;
    __reflect(ResLoader.prototype, "codeBase.ResLoader");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=ResLoader.js.map