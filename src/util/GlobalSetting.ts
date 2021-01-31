module codeBase{
    /**
     * 这里记录全局公用的一些数据和设置
     */
    export class GlobalSetting {
        /**
         * 开发模式开关
         * 打开开发模式,logger会记录打印信息到debug窗口
         * @type {boolean}
         */
        public static DEV_MODEL:Boolean = true;//开发模式
        /**
         * 游戏系统的时间校对
         * 一般登录完成后,服务器会通知一个当前的服务器时间
         * 以此时间为基准,客户端可以随时校对自己的时间
         * @type {number}
         */
        public static SYSTEM_DATE:number = 0;
        /**
         * 声音总开关
         * @type {boolean}
         */
        public static VOLUME_OPEN:boolean = true;//音量开关
        /**
         * 帧频设置
         * @type {number}
         */
        public static FRAME_RATE:number = 30;//帧频
        /**
         * 舞台
         * @type {null}
         */
        public static STAGE:egret.Stage = null;//舞台
        //public static IOS:Boolean = false;//是否ios设备
        /**
         * 舞台的宽
         * @type {number}
         */
        public static STAGE_WIDTH:number = 1920;//实际舞台宽
        /**
         * 舞台的高
         * @type {number}
         */
        public static STAGE_HEIGHT:number = 1080;//实际舞台高
        /**
         * 显示的宽
         * @type {number}
         */
        public static DISPLAY_WIDTH:number = 1920;
        /**
         * 显示的高
         * @type {number}
         */
        public static DISPLAY_HEIGHT:number = 1080;
        /**
         * 最小view的宽
         * @type {number}
         */
        public static VIEW_MINI_WIDTH:number = 300;//最小view宽
        /**
         * 最小view的高
         * @type {number}
         */
        public static VIEW_MINI_HEIGHT:number = 300;//最小view高
        /**
         * 最大加载数量
         * @type {number}
         */
        public static LOADING_THREAD_MAX:number = 5;
        /**
         * 检测空闲下载的间隔时间,单位:秒
         * @type {number}
         */
        public static CHECK_IDLE_LOADING:number = 15;
        /**
         * 开关
         * 进行报表统计
         * @type {null}
         */
        public static REPORT:boolean = false;
        /**
         * 开关
         * 对UI的可点击对象进行报表统计
         * @type {null}
         */
        public static REPORT_UI:boolean = false;
        //报表URL地址
        public static REPORT_URL:string = "";
        //产品名
        public static APP_NAME:string = "";
        //产品id
        public static APP_PRODUCT:string = "";
        /**
         * 设备信息, 报表使用
         */
        public static APP_DEVICE:string = "";
        public static APP_RATE:number = 0;
        public static APP_RATE_NAME:number = 0;
        /**
         * 渠道信息, 报表使用
         */
        public static APP_CHANNEL:string = "";
        /**
         * 版本信息, 报表使用
         */
        public static APP_VERSION:string = "";
        /**
         * 使用的渠道, 报表使用
         */
        public static APP_PROVIDE:number = 0;
        /**
         * app存取数据的方式
         */
        public static APP_STORAGE:string = "local";//local:本地, net:网络, local_net:混合模式
        //存储方式的常量设定
        public static STORAGE_LOCAL:string = "local";//本地存储方式
        public static STORAGE_NET:string = "net";//网络存储方式
        public static STORAGE_LOCAL_NET:string = "local_net";//本地和网络混合存储方式
		/**
		 * runtime环境
		 */
		public static RUNTIME:string = "web";
		public static RUNTIME_WEB:string = "web";
		public static RUNTIME_NATIVE:string = "native";
        /**
         * 统计
         */
        public static STATS_VIEW:boolean = false;//VIEW 统计
        public static STATS_WIN:boolean = false;//WIN 统计
        public static STATS_BTN:boolean = false;//BTN 统计
        public static STATS_MC:boolean = false;//MC 统计
        public static STATS_LIST:boolean = false;//LIST 统计
        /**
         * CDN资源位置
         */
        public static CDN_RES:string = "resource/";

        /**
         * 是否支持webgl
         */
        public static deviceVer:string = "webgl";

        /**
         * 初始化全局的数据
         */
        public static initData():void{
			GlobalSetting.RUNTIME = egret.Capabilities.runtimeType;
            GlobalSetting.STAGE = egret.MainContext.instance.stage;
            //Debug.log = "计算正常帧时=" + HeartBeat._eplasedTime;

            //console.log("uuid=" + GlobalSetting.APP_DEVICE);
            Debug.log = "---- GlobalSetting init ----";
            Debug.log = "runtimeType=" + egret.Capabilities.runtimeType + ", deviceType=" + egret.MainContext.deviceType;
            Debug.log = "RUNTIME=" + GlobalSetting.RUNTIME;

            //是否支持webgl
            GlobalSetting.deviceVer = egret.WebGLUtils.checkCanUseWebGL()?"webgl":"canvas";

            //尺寸初始化
            GlobalSetting.initInfoSize();
        }

        /**
         * 初始化舞台尺寸
         */
        public static initInfoSize():void {
            console.log("stage resize w=" + GlobalSetting.STAGE.stageWidth + ", h=" + GlobalSetting.STAGE.stageHeight);
            GlobalSetting.STAGE_WIDTH = GlobalSetting.STAGE.stageWidth;
            GlobalSetting.STAGE_HEIGHT = GlobalSetting.STAGE.stageHeight;

            //var sizeInfo:egret.sys.StageDisplaySize = egret.sys.screenAdapter.calculateStageSize();
            GlobalSetting.DISPLAY_WIDTH = GlobalSetting.STAGE_WIDTH;
            GlobalSetting.DISPLAY_HEIGHT = GlobalSetting.STAGE_HEIGHT;

            if (GlobalSetting.DEV_MODEL) {
                Debug.log = "---- GlobalSetting Info Size ----";
                Debug.log = "STAGE_WIDTH=" + GlobalSetting.STAGE_WIDTH + ", STAGE_HEIGHT=" + GlobalSetting.STAGE_HEIGHT;
                //Debug.log = "DISPLAY_WIDTH=" + GlobalSetting.DISPLAY_WIDTH + ", DISPLAY_HEIGHT=" + GlobalSetting.DISPLAY_HEIGHT;
            }
        }
		/**
		 * 是否native运行
		 */
		public static isNative():boolean{
			return GlobalSetting.RUNTIME == GlobalSetting.RUNTIME_NATIVE;
		}
    }
}