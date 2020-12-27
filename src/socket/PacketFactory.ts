module codeBase{

	export class PacketFactory{
	    public static headerClientClz:any = DefaultHeader;
	    public static headerClientLength:number = 6;
	    public static headerServerClz:any = DefaultHeader;
	    public static headerServerLength:number = 6;
        public static packetDefineDic:Object = {};//packet字典
        public static initPacketDefine(packetClass:any):void {
            var instance:Packet = new packetClass();
            EventManager.releasePacket(instance);
            PacketFactory.setPacketDefine(instance.header.messageId, instance.clientSide, packetClass);
        }

        /**
         * 设置协议包定义
         * @param messageId
         * @param clientSide
         * @param packetClass
         */
        public static setPacketDefine(messageId:number, clientSide:boolean, packetClass:any):void {
            PacketFactory.packetDefineDic[(clientSide?"c_":"s_") + messageId] = packetClass;
        }

        /**
         * 根据协议号,创建协议
         * @param messageId
         * @param clientSide
         * @returns {any}
         */
        public static createPacket(messageId:number, clientSide:boolean):Packet{
            Debug.log = "header->packet:" + messageId;
            var classz:any = PacketFactory.packetDefineDic[(clientSide?"c_":"s_") + messageId];
            if (classz){
                var packet:Packet = new classz();
                packet.header.messageId = messageId;
                Debug.log = "header->packet:" + egret.getQualifiedClassName(packet);
                return packet;
            }
            Debug.log = "header->packet:" + "NULL";
            return null;
        }
        //从packet字典中删除包定义
        public static removePacketDefine(messageId:number, clientSize:boolean = true):void{
            delete PacketFactory.packetDefineDic[messageId + "_" + (clientSize?0:1)];
        }
    }
}