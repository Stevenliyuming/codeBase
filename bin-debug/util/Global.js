var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    //全局字体颜色表--可以扩展
    codeBase.TextColors = {
        white: 0xFFFFFF,
        milkWhite: 0xfbf1af,
        grayWhite: 0xceb6a2,
        yellow: 0xffff00,
        lightYellow: 0xffd375,
        orangeYellow: 0xff9900,
        red: 0xf11300,
        green: 0x00e500,
        blue: 0x1a94d7,
        grayBlue: 0x2f5177,
        purple: 0xe938f2,
        pink: 0xFF3030,
        black: 0x2e2d2d,
        golden: 0xFFD700 //金色
    };
    //全局字体大小表--可以扩展
    codeBase.LabelFontSize = {
        littleSize: 12,
        middleSize: 18,
        normalSize: 24,
        bigSize: 36 //大型字体大小
    };
    //是不是微信浏览
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (microStr == "null") {
            return false;
        }
        else if (microStr == "micromessenger") {
            return true;
        }
    }
    codeBase.isWeiXin = isWeiXin;
    //是不是大屏
    function isBigScreen() {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    }
    codeBase.isBigScreen = isBigScreen;
    /**
     * 是否移动设备
     */
    function isMobile() {
        if (egret.Capabilities.isMobile)
            return true;
        return false;
    }
    codeBase.isMobile = isMobile;
    //获得浏览器类型 pc android ios
    function systemType() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        }
        else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        }
        else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        }
        else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        }
        else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        }
        else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        }
        else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        }
        else {
            console.log("未知系统类型");
        }
    }
    codeBase.systemType = systemType;
    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    function platformType() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        }
        else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        }
        else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        }
        else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        }
        else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        }
        else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        }
        else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        }
        else {
            return "other";
        }
    }
    codeBase.platformType = platformType;
    /**
     * 获取指定名称的 url 参数
     * @param {String} name - 参数名称
     * @param {String} url - 指定 url，不指定默认为当前页面 url
     * @returns {String} - 参数的值，未找到则返回 null
     */
    function getUrlParam(name, url) {
        var reg = new RegExp('(\\?|&)' + name + '=([^&#]*)');
        var result = reg.exec(url ? url : window.location.href);
        return result != null ? decodeURIComponent(result[2]) : null;
    }
    codeBase.getUrlParam = getUrlParam;
    //当前舞台
    function curStage() {
        return egret.MainContext.instance.stage;
    }
    codeBase.curStage = curStage;
    //当前游戏宽度
    function curStageWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    codeBase.curStageWidth = curStageWidth;
    //当前游戏高度
    function curStageHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    codeBase.curStageHeight = curStageHeight;
    //当前浏览器窗口宽度
    function curClientWidth() {
        return egret.Capabilities.boundingClientWidth;
    }
    codeBase.curClientWidth = curClientWidth;
    //当前浏览器窗口高度
    function curCientHeight() {
        return egret.Capabilities.boundingClientHeight;
    }
    codeBase.curCientHeight = curCientHeight;
    //舞台画面
    function getScreen() {
        var _renderTexture;
        var _stage = curStage();
        _renderTexture.drawToTexture(_stage, new egret.Rectangle(0, 0, _stage.stageWidth, _stage.stageHeight));
        return _renderTexture;
    }
    codeBase.getScreen = getScreen;
    //获取当前地址
    function getCurUrl() {
        return window.location.href;
    }
    codeBase.getCurUrl = getCurUrl;
    //当前游戏角度
    codeBase.curAngle = Number(window["orientation"]);
    var Global = (function () {
        function Global() {
        }
        /**帧率 */
        Global.FRAME_RATE = 30;
        return Global;
    }());
    codeBase.Global = Global;
    __reflect(Global.prototype, "codeBase.Global");
})(codeBase || (codeBase = {}));
