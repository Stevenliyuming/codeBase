var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 方便便捷的监听utils
     * 它的计时单位是帧
     */
    var HeartBeat = (function () {
        function HeartBeat() {
        }
        /**
         * 采用通用的补帧补偿机制
         */
        HeartBeat.onEnterFrame = function (event) {
            var i = 0;
            var j = 0;
            var lenght = 0;
            var item = null;
            //计算补帧次数
            var runNum = 1;
            if (HeartBeat._lastTime > 0 && HeartBeat._eplasedTime > 0) {
                //Debug.log = "正常帧时:" + HeartBeat._eplasedTime + ", 累积=" + HeartBeat._cumulativeTime;
                //当前帧频
                var timeNum = Math.floor((egret.getTimer() - HeartBeat._lastTime) - HeartBeat._eplasedTime);
                //Debug.log = "正常帧时:" + HeartBeat._eplasedTime + ", 当前=" + timeNum;
                if (timeNum > 0) {
                    HeartBeat._cumulativeTime += timeNum;
                    if (HeartBeat._cumulativeTime > HeartBeat._eplasedTime) {
                        runNum += Math.floor(HeartBeat._cumulativeTime / HeartBeat._eplasedTime);
                        HeartBeat._cumulativeTime = HeartBeat._cumulativeTime % HeartBeat._eplasedTime;
                        //Debug.log = "补帧:" + runNum;
                    }
                }
            }
            //检索并整理数据
            for (var k = 0; k < runNum; k++) {
                lenght = HeartBeat._listeners.length - 1;
                for (i = lenght; i >= 0; i--) {
                    item = HeartBeat._listeners[i];
                    item.frameIndex++;
                    if (item.del) {
                        //console.log("HeartBeat Del Func=" + item.func + ", clz=" + egret.getQualifiedClassName(item.thisArg));
                        HeartBeat._listeners.splice(i, 1);
                        codeBase.ObjectPool.recycleClass(item);
                        continue;
                    }
                    //回调帧频数为1或者当前的帧计数值达到了回调帧频数
                    if (item.frameCount <= 1 || (item.frameIndex % item.frameCount) == 0) {
                        item.loopcount++;
                        if (item.loop > 0 && item.loopcount >= item.loop) {
                            item.del = true;
                        }
                        //加入call的列表中
                        HeartBeat._functionCallList.unshift(item);
                    }
                }
            }
            //执行
            lenght = HeartBeat._functionCallList.length;
            //lenght = lenght > HeartBeat._MAX_EXECUTE_COUNT ? HeartBeat._MAX_EXECUTE_COUNT : lenght;
            for (i = 0; i < lenght; i++) {
                item = HeartBeat._functionCallList.pop();
                HeartBeat.executeFunCall(item);
            }
            if (HeartBeat._listeners.length == 0)
                codeBase.GlobalSetting.STAGE.removeEventListener(egret.Event.ENTER_FRAME, HeartBeat.onEnterFrame, HeartBeat);
            HeartBeat._lastTime = egret.getTimer(); //当前时间记录
        };
        /**
         * 执行回调
         */
        HeartBeat.executeFunCall = function (item) {
            //判断func的参数情况
            //console.log("1111111")
            if (item.param && item.param.length > 0) {
                //console.log("222222")
                //显式定义参数,直接用指定参数返回
                item.func.apply(item.thisArg, item.param);
            }
            else {
                //console.log("333333 arguments=" + item.func.length)
                if (item.func.length == 0) {
                    item.func.call(item.thisArg);
                }
                else {
                    //console.log("heatbeat=" + typeof(item.func.arguments[0]))
                    //if (item.func.arguments[0] instanceof boolean) {
                    item.func.call(item.thisArg, item.del);
                    //} else if (item.func.arguments[0] instanceof number) {
                    //    item.func.call(item.thisArg, item.loopcount);
                    //} else {
                    //    item.func.call(item.thisArg, null);
                    //}
                }
            }
        };
        /**
         *  添加呼吸监听
         * @param thisArg 回调方法的this指向
         * @param respone call back 的方法
         * @param heartRrate 执行回调的帧频率, 从加入开始计算,当达到heartRrate的值时,进行一次func call
         * @param repeat 要循环 call func 的次数
         * @param params 回传的参数值
         * @param nowExecute 立即执行
         */
        HeartBeat.addListener = function (thisArg, respone, heartRrate, repeat, delay, params, nowExecute) {
            if (heartRrate === void 0) { heartRrate = 1; }
            if (repeat === void 0) { repeat = -1; }
            if (delay === void 0) { delay = 0; }
            if (params === void 0) { params = null; }
            if (nowExecute === void 0) { nowExecute = false; }
            if (respone == null || HeartBeat.hasListener(thisArg, respone))
                return false; //同一个func防止重复添加
            //console.log("HeartBeat ADD Func=" + respone + ", clz=" + egret.getQualifiedClassName(thisArg));
            var item = codeBase.ObjectPool.getByClass(BeatItem);
            //if (GlobalSetting.DEV_MODEL) item.traceMsg = new Error().getStackTrace();//调试信息追踪
            if (heartRrate <= 0)
                heartRrate = 1;
            item.setData(thisArg, respone, heartRrate, repeat, delay, params);
            HeartBeat._listeners.push(item);
            if (nowExecute) {
                item.loopcount++;
                HeartBeat.executeFunCall(item);
            }
            HeartBeat._lastTime = egret.getTimer();
            codeBase.GlobalSetting.STAGE.addEventListener(egret.Event.ENTER_FRAME, HeartBeat.onEnterFrame, HeartBeat);
            return true;
        };
        /**
         * 移除呼吸
         * @param thisArg 方法的this宿主
         * @param respone
         */
        HeartBeat.removeListener = function (thisArg, respone) {
            var i = 0;
            for (i = 0; i < HeartBeat._listeners.length; i++) {
                if (HeartBeat._listeners[i].func == respone && HeartBeat._listeners[i].thisArg == thisArg) {
                    HeartBeat._listeners[i].del = true;
                    break;
                }
            }
        };
        /**
         * 呼吸中是否包含指定的回调func
         * @param thisArg 方法的this宿主
         * @param respone
         * @return
         */
        HeartBeat.hasListener = function (thisArg, respone) {
            var i = 0;
            for (i = 0; i < HeartBeat._listeners.length; i++) {
                if (HeartBeat._listeners[i].thisArg == thisArg && HeartBeat._listeners[i].func == respone && !HeartBeat._listeners[i].del) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 当前呼吸内容长度
         * @return
         */
        HeartBeat.getHearBeatLenght = function () {
            return HeartBeat._listeners.length;
        };
        /**
         * 初始化操作
         */
        HeartBeat.init = function () {
            //每帧时间间隔-毫秒
            if (HeartBeat._eplasedTime == 0) {
                HeartBeat._eplasedTime = 1000 / codeBase.GlobalSetting.FRAME_RATE;
            }
            // HeartBeat.dispose();
        };
        /**
         * 清空帧回调处理机制
         */
        HeartBeat.dispose = function () {
            var i = 0;
            var item;
            codeBase.GlobalSetting.STAGE.removeEventListener(egret.Event.ENTER_FRAME, HeartBeat.onEnterFrame, HeartBeat);
            for (i = 0; i < HeartBeat._listeners.length; i++) {
                item = HeartBeat._listeners[i];
                codeBase.ObjectPool.recycleClass(item);
            }
            HeartBeat._listeners.length = 0;
            HeartBeat._functionCallList.length = 0;
            HeartBeat._lastTime = 0;
            HeartBeat._eplasedTime = 0;
            HeartBeat._cumulativeTime = 0;
        };
        /**
         * 打印输出方法的追踪信息以及活动状态
         * @return
         */
        HeartBeat.getHearBeatTrace = function () {
            var i = 0;
            var msg = "";
            var item = null;
            msg += "总数:" + HeartBeat._listeners.length + "\n";
            msg += "========================================================\n";
            for (i = 0; i < HeartBeat._listeners.length; i++) {
                item = HeartBeat._listeners[i];
                if (item) {
                    msg += "基本信息 (" + i + "): ";
                    msg += "del=" + item.del + ", count=" + item.frameCount + ", index=" + item.frameIndex + ", loop=" + item.loop + ", loopCount=" + item.loopcount + "\n";
                    //msg += "追踪信息:\n";
                    //if (StringUtil.isUsage(item.traceMsg))msg += item.traceMsg.substring(item.traceMsg.indexOf("]") + 2, item.traceMsg.length)  + "\n";
                    msg += "------------------------------------\n";
                }
            }
            msg += "========================================================\n";
            return msg;
        };
        HeartBeat._listeners = new Array(); //{func:方法, count:频率, index:计数, loop:循环次数 -1:无限循环, loopcount:已call计数}
        HeartBeat._functionCallList = new Array(); //需要进行调用的方法列表
        HeartBeat._MAX_EXECUTE_COUNT = 20; //每帧执行的个数
        HeartBeat.isInit = false;
        HeartBeat._lastTime = 0; //最后一帧的时间
        HeartBeat._eplasedTime = 0; //正常帧时间
        HeartBeat._cumulativeTime = 0; //累积的丢失的帧时间
        HeartBeat.nowTime = 0;
        HeartBeat.realFrame = 0; //上一帧的实际帧频
        HeartBeat.item = null;
        HeartBeat.endCall = false;
        return HeartBeat;
    }());
    codeBase.HeartBeat = HeartBeat;
    __reflect(HeartBeat.prototype, "codeBase.HeartBeat");
    var BeatItem = (function () {
        function BeatItem() {
            //要回调的call方法
            this.func = null;
            //回调方法的this指向
            this.thisArg = null;
            //call back function的参数
            this.param = null;
            //执行回调的帧频率
            this.frameCount = 0;
            //当前计数频率
            this.frameIndex = 0;
            //循环次数 小于等于0为循环
            this.loop = 0;
            //已经循环的次数
            this.loopcount = 0;
            //延迟
            this.delay = 0;
            //完成,删除标记
            this.del = false;
            //trace信息追踪
            this.traceMsg = null;
        }
        BeatItem.prototype.setData = function (thisArg, respone, heartRrate, repeat, delay, params) {
            this.thisArg = thisArg;
            this.func = respone;
            this.frameCount = heartRrate;
            this.loop = repeat;
            this.delay = delay;
            this.frameIndex = 0;
            this.loopcount = 0;
            this.del = false;
            this.param = params;
        };
        return BeatItem;
    }());
    __reflect(BeatItem.prototype, "BeatItem");
})(codeBase || (codeBase = {}));
//# sourceMappingURL=HeartBeat.js.map