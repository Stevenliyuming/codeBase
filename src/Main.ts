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
            //this.loadResource()
            //this.createGameScene();
        }, this);

        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    }

    private loadRes() {
        codeBase.ResManager.loadConfig("resource/default.res.json", "resource/", null, ()=>{
            codeBase.ResManager.loadGroups(["preload"], ()=>{
                this.createGameScene();
            }, this);
        }, this);
        // await RES.loadConfig("resource/default.res.json", "resource/");
        // codeBase.ResManager.loadGroups(["preload"], ()=>{
        //     this.createGameScene();
        // }, this);
    }

    private onComplete(event:any):void {
        console.log(event);
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, this.loadingView);
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