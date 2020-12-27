module codeBase{

    //全局字体颜色表--可以扩展
    export var TextColors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xfbf1af,//乳白色 
        grayWhite: 0xceb6a2,//灰白色
        yellow: 0xffff00,//金黄色 
        lightYellow: 0xffd375,//淡黄色
        orangeYellow: 0xff9900,//橘黄色//道具名称 //玩家姓名
        red: 0xf11300,//红色
        green: 0x00e500,//绿色 
        blue: 0x1a94d7,//蓝色 
        grayBlue: 0x2f5177,//墨蓝色 
        purple: 0xe938f2,//紫色 
        pink: 0xFF3030,//粉色 
        black: 0x2e2d2d,//黑色
        golden: 0xFFD700 //金色
    }

    //全局字体大小表--可以扩展
    export var LabelFontSize = {
        littleSize: 12,//小型字体大小
        middleSize: 18,//中型字体大小
        normalSize: 24,//正常字体大小
        bigSize: 36//大型字体大小
    }

    //是不是微信浏览
    export function isWeiXin(): boolean {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if(microStr == "null") {
            return false;
        } else if(microStr == "micromessenger") {
            return true;
        }
    } 

    //是不是大屏
    export function isBigScreen(): boolean {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    } 

    /**
     * 是否移动设备
     */
    export function isMobile() {
        if(egret.Capabilities.isMobile) return true;
        return false;
    }

    //获得浏览器类型 pc android ios
    export function systemType(): string {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if(("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        } else if(("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        } else if(("" + ua.match(/android/i)) == "android") {
            return "android";
        } else if(("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        } else if(("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        } else if(("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        } else if(("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        } else {
            console.log("未知系统类型");
        }
    }  

    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    export function platformType(): string {
        var ua = window.navigator.userAgent.toLowerCase();
        if(("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        } else if(("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        } else if(("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        } else if(("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        } else if(("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        } else if(("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        } else if(("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        } else {
            return "other";
        }
    }

    /**
	 * 获取指定名称的 url 参数
	 * @param {String} name - 参数名称
	 * @param {String} url - 指定 url，不指定默认为当前页面 url
	 * @returns {String} - 参数的值，未找到则返回 null
	 */
  	export function getUrlParam(name: string, url ?: string): any {
		const reg = new RegExp('(\\?|&)' + name + '=([^&#]*)')
		const result = reg.exec(url ? url : window.location.href)
		return result != null ? decodeURIComponent(result[2]) : null
	}

    //当前舞台
    export function curStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    //当前面板
    export var curPanel: egret.DisplayObjectContainer;

    //当前游戏宽度
    export function curStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    //当前游戏高度
    export function curStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    //当前浏览器窗口宽度
    export function curClientWidth(): number {
        return egret.Capabilities.boundingClientWidth;
    }

    //当前浏览器窗口高度
    export function curCientHeight(): number {
        return egret.Capabilities.boundingClientHeight;
    }

	//舞台画面
	export function getScreen() {
      let _renderTexture:egret.RenderTexture;
	  let _stage = curStage();
	  _renderTexture.drawToTexture(_stage, new egret.Rectangle(0, 0, _stage.stageWidth, _stage.stageHeight));
	  return _renderTexture;
    } 	

	//获取当前地址
	export function getCurUrl():string {
		return window.location.href;
    } 	

	//当前游戏角度
	export var curAngle:number = Number(window["orientation"]);	

    export class Global {
        /**帧率 */
        public static FRAME_RATE:number = 30;
    }
}