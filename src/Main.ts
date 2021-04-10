class  Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
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
    }

    private loadingView:codeBase.LoadingUI;
    private runGame() {
        codeBase.SceneManager.instance.Init();
        codeBase.GlobalSetting.initData();
        codeBase.HeartBeat.init();
        this.loadingView = new codeBase.LoadingUI();
        codeBase.SceneManager.instance.showScene(this.loadingView);
        codeBase.EventManager.addEventListener(codeBase.EventType.LOADINGUI_FINISH, () => {
            this.loadRes();
        }, this);

        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    }

    private loadRes() {
        this.loadResource()
        //this.createGameScene();

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

        codeBase.ResLoader.getInstance().resLoad("http://dev4iandcode.oss-cn-shenzhen.aliyuncs.com/s/platform/interactive/common/interactiveTemplate/mainScratch/moduleRelease/test.pkg", null, (data: any) => {
            console.log(data);
            //codeBase.EgretProto.inject();

            this.createGameScene();
        }, this, "get", "arraybuffer");
    }

    private onComplete(event:any):void {
        console.log(event);
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, this.loadingView);
            await RES.loadGroup("res", 0, this.loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        egret.setTimeout(()=>{
            codeBase.SceneManager.instance.showScene(new codeBase.MainScene());
        }, this, 1000);
    }
}