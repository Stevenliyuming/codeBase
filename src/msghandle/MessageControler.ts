module codeBase{
    export class MessageControler {
        private static _handles: Array<IHandle> = [];
        private static _eventHandles: Array<string> = [];

        /**
         * 添加数据处理的Handle
         * 逻辑处理模块,需要添加Handle,以便方便的在view刷新前,有限得到数据,预先处理数据
         * @param handle
         */
        public static addHandle(handle: IHandle): void {
            if (handle != null && MessageControler._handles.indexOf(handle) < 0) MessageControler._handles.push(handle);
        }

        /**
         * 添加弱事件处理
         * 只有注册的时间,当前的view才能收到
         * @param eventName
         */
        public static addEvent(eventName: string): void {
            if (MessageControler._eventHandles.indexOf(eventName) < 0) MessageControler._eventHandles.push(eventName);
        }

        /**
         * MyEvent事件派发
         * @param event
         */
        public static receiveEvent(event: MyEvent): void {
            //console.log("MessageControl onEventData=" + event.type)
            // if (MessageControler._eventHandles.indexOf(event.type) >= 0) {
            //     ViewManager.receiveEvent(event);
            //     var i: number = 0;
            //     for (i = 0; i < MessageControler._handles.length; i++) {
            //         MessageControler._handles[i].receiveEvent(event);
            //     }
            // }
        }

        /**
         * 协议事件派发
         * @param pkt
         */
        public static receivePacket(pkt: any): void {
            //console.log("MessageHandle onPacketData=" + egret.getQualifiedClassName(pkt));
            //优先处理数据的handle
            var i: number = 0;
            for (i = 0; i < MessageControler._handles.length; i++) {
                MessageControler._handles[i].receivePacket(pkt);
            }
            //界面刷新
            //ViewManager.receivePacket(pkt);
        }
    }
}