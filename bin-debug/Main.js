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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin
        //     context.onUpdate = () => {
        //     }
        // })
        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }
        this.runGame();
    };
    Main.prototype.runGame = function () {
        var _this = this;
        codeBase.SceneManager.instance.Init();
        codeBase.GlobalSetting.initData();
        codeBase.HeartBeat.init();
        this.loadingView = new codeBase.LoadingUI();
        codeBase.SceneManager.instance.showScene(this.loadingView);
        codeBase.EventManager.addEventListener(codeBase.EventType.LOADINGUI_FINISH, function () {
            _this.loadRes();
        }, this);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    };
    Main.prototype.loadRes = function () {
        this.loadResource();
        this.createGameScene();
        // codeBase.ResManager.loadConfig("resource/default.res.json", "resource/", ()=>{
        //     codeBase.ResManager.loadGroups(["preload", "res"], ()=>{
        //         this.createGameScene();
        //     }, this);
        // }, this);
        // await RES.loadConfig("resource/default.res.json", "resource/");
        // codeBase.ResManager.loadGroups(["preload"], ()=>{
        //     this.createGameScene();
        // }, this);
        // codeBase.ResLoader.getInstance().resGroupLoad([
        //     "resource/assets/A.png",
        //     "resource/assets/A点击.png",
        //     "resource/assets/btnNumber.fnt",
        //     "resource/assets/btnNumber.png",
        //     "resource/assets/click.mp3",
        //     "resource/assets/comRes_1.json",
        //     "resource/assets/comRes_1.png",
        //     "resource/assets/bg.png",
        //     "resource/assets/slider_bar_h.png",
        //     "resource/assets/slider_bar_v.png",
        //     "resource/default.res.json",
        // ], "preload", null, (data:any)=>{
        //     console.log(data);
        //     codeBase.EgretProto.inject();
        //      this.createGameScene();
        // }, this);
        codeBase.ResLoader.getInstance().resLoad("http://dev4iandcode.oss-cn-shenzhen.aliyuncs.com/s/platform/interactive/common/interactiveTemplate/mainScratch/moduleRelease/test.pkg", null, function (data) {
            console.log(data);
            //codeBase.EgretProto.inject();
            //this.createGameScene();
        }, this, "get", "arraybuffer");
    };
    Main.prototype.onComplete = function (event) {
        console.log(event);
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, this.loadingView)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("res", 0, this.loadingView)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        egret.setTimeout(function () {
            codeBase.SceneManager.instance.showScene(new codeBase.MainScene());
        }, this, 1000);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
