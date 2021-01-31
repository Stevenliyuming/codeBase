var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var MessageControler = (function () {
        function MessageControler() {
        }
        /**
         * 添加数据处理的Handle
         * 逻辑处理模块,需要添加Handle,以便方便的在view刷新前,优先得到数据,预先处理数据
         * @param handle
         */
        MessageControler.addHandle = function (handle) {
            if (handle != null && MessageControler.handles.indexOf(handle) < 0)
                MessageControler.handles.push(handle);
        };
        /**
         * 添加弱事件处理
         * 只有注册的事件,当前的view才能收到
         * @param eventName
         */
        MessageControler.addEvent = function (eventName) {
            if (MessageControler.eventHandles.indexOf(eventName) < 0)
                MessageControler.eventHandles.push(eventName);
        };
        /**
         * 协议事件派发
         * @param pkt
         */
        MessageControler.receivePacket = function (pkt) {
            //console.log("MessageHandle onPacketData=" + egret.getQualifiedClassName(pkt));
            //优先处理数据的handle
            var i = 0;
            for (i = 0; i < MessageControler.handles.length; i++) {
                MessageControler.handles[i].receivePacket(pkt);
            }
            //界面刷新
            //ViewManager.receivePacket(pkt);
        };
        /**
         * MyEvent事件派发
         * @param event
         */
        MessageControler.receiveEvent = function (event) {
            //console.log("MessageControl onEventData=" + event.type)
            if (MessageControler.eventHandles.indexOf(event.type) >= 0) {
                var i = 0;
                for (i = 0; i < MessageControler.handles.length; i++) {
                    MessageControler.handles[i].receiveEvent(event);
                }
            }
            //界面刷新
            //ViewManager.receiveEvent(event);
        };
        MessageControler.handles = [];
        MessageControler.eventHandles = [];
        return MessageControler;
    }());
    codeBase.MessageControler = MessageControler;
    __reflect(MessageControler.prototype, "codeBase.MessageControler");
})(codeBase || (codeBase = {}));
