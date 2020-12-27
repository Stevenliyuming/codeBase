module codeBase{ 
export class  Main extends egret.DisplayObjectContainer {

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

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        codeBase.SceneManager.Instance.Init();
        codeBase.GlobalSetting.initData();
        codeBase.HeartBeat.init();
        await this.loadResource()
        this.createGameScene();
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new codeBase.LoadingUI();
            codeBase.SceneManager.Instance.showScene(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        egret.setTimeout(()=>{
            codeBase.SceneManager.Instance.showScene(new codeBase.MainScene());
        }, this, 1000);
    }
}
}