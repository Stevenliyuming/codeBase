var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var PacketFactory = (function () {
        function PacketFactory() {
        }
        PacketFactory.initPacketDefine = function (packetClass) {
            var instance = new packetClass();
            codeBase.EventManager.releasePacket(instance);
            PacketFactory.setPacketDefine(instance.header.messageId, instance.clientSide, packetClass);
        };
        /**
         * 设置协议包定义
         * @param messageId
         * @param clientSide
         * @param packetClass
         */
        PacketFactory.setPacketDefine = function (messageId, clientSide, packetClass) {
            PacketFactory.packetDefineDic[(clientSide ? "c_" : "s_") + messageId] = packetClass;
        };
        /**
         * 根据协议号,创建协议
         * @param messageId
         * @param clientSide
         * @returns {any}
         */
        PacketFactory.createPacket = function (messageId, clientSide) {
            codeBase.Debug.log = "header->packet:" + messageId;
            var classz = PacketFactory.packetDefineDic[(clientSide ? "c_" : "s_") + messageId];
            if (classz) {
                var packet = new classz();
                packet.header.messageId = messageId;
                codeBase.Debug.log = "header->packet:" + egret.getQualifiedClassName(packet);
                return packet;
            }
            codeBase.Debug.log = "header->packet:" + "NULL";
            return null;
        };
        //从packet字典中删除包定义
        PacketFactory.removePacketDefine = function (messageId, clientSize) {
            if (clientSize === void 0) { clientSize = true; }
            delete PacketFactory.packetDefineDic[messageId + "_" + (clientSize ? 0 : 1)];
        };
        PacketFactory.headerClientClz = codeBase.DefaultHeader;
        PacketFactory.headerClientLength = 6;
        PacketFactory.headerServerClz = codeBase.DefaultHeader;
        PacketFactory.headerServerLength = 6;
        PacketFactory.packetDefineDic = {}; //packet字典
        return PacketFactory;
    }());
    codeBase.PacketFactory = PacketFactory;
    __reflect(PacketFactory.prototype, "codeBase.PacketFactory");
})(codeBase || (codeBase = {}));
