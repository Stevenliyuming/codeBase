var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 数据集中处理
     */
    var BaseHandle = (function () {
        function BaseHandle() {
            this.METHOD_DEF = {}; //消息和方法的映射关系表
            this.EVENT_DEF = [];
            this.initWeakListener();
        }
        /**
         * 初始化弱监听
         * 子类可以覆写这个,添加数据
         */
        BaseHandle.prototype.initWeakListener = function () {
        };
        /**
         * 添加事件的处理，注意,functName的名称,前缀onEvent不包含
         * 如果没有对应的类型在此出现,则该Handle对Event事件到此为止,不再派发,防止造成事件死循环
         * @param type MyEvent事件的类型
         */
        BaseHandle.prototype.addHandleEvent = function (type, funcName) {
            if (this.EVENT_DEF.indexOf(type) < 0) {
                this.EVENT_DEF.push(type);
                this.METHOD_DEF[type] = funcName;
            }
        };
        /**
         * 添加协议处理的Handle,注意,functName的名称,前缀onPacket不包含
         * @param msgId packet协议号
         * @param funcName  对应的callback function,不包含onPacket前缀
         */
        BaseHandle.prototype.addHandlePacket = function (msgId, funcName) {
            this.METHOD_DEF["" + msgId] = funcName;
            //console.log("BaseHandle ADD METHOD_DEF=" + msgId + ", funcName=" + funcName);
        };
        /**
         * 接收到服务器的控制信号
         * call function的时候,会自动前缀onPacket
         * @param packet
         */
        BaseHandle.prototype.receivePacket = function (packet) {
            //console.log("BaseHandle onPacketData=" + egret.getQualifiedClassName(this) + ", has=" + this.METHOD_DEF.hasOwnProperty("" + packet.header.messageId));
            if (this.METHOD_DEF.hasOwnProperty("" + packet.header.messageId))
                this["onPacket" + this.METHOD_DEF["" + packet.header.messageId]].call(this, packet);
        };
        /**
         * 事件派发
         * call function的时候,会自动前缀onEvent
         * @param event
         */
        BaseHandle.prototype.receiveEvent = function (event) {
            if (this.EVENT_DEF.indexOf(event.type) >= 0) {
                if (this.METHOD_DEF.hasOwnProperty(event.type))
                    this["onEvent" + this.METHOD_DEF[event.type]].call(this, event);
            }
        };
        return BaseHandle;
    }());
    codeBase.BaseHandle = BaseHandle;
    __reflect(BaseHandle.prototype, "codeBase.BaseHandle", ["codeBase.IHandle"]);
})(codeBase || (codeBase = {}));
//# sourceMappingURL=BaseHandle.js.map