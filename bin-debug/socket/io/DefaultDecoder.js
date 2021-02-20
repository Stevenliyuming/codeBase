var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var DefaultDecoder = (function () {
        function DefaultDecoder() {
        }
        //        public static const headersCache:Array = [];//packet header缓冲包
        DefaultDecoder.prototype.decode = function (bytePacket) {
            var messageId = this.decodeMessageId(bytePacket);
            var packet = codeBase.PacketFactory.createPacket(messageId, false);
            if (packet && bytePacket.bytesAvailable > 0)
                this.decodeHeader(bytePacket, packet);
            if (packet && bytePacket.bytesAvailable > 0)
                this.decodeBody(bytePacket, packet);
            return packet;
        };
        DefaultDecoder.prototype.decodeMessageId = function (bytePacket) {
            var messageId = bytePacket.readUnsignedShort();
            bytePacket.position = 2;
            return messageId;
        };
        DefaultDecoder.prototype.decodeHeader = function (bytePacket, packet) {
            if (packet.clientSide) {
                packet.header.messageId = bytePacket.readUnsignedShort(); //WORD  cmd_index;//命令
                packet.header.code = bytePacket.readUnsignedShort(); //WORD   check_code;//校验位
            }
            else {
                packet.header.messageId = bytePacket.readUnsignedShort(); //WORD  cmd_index;//命令
                packet.header.code = bytePacket.readUnsignedShort(); //WORD   check_code;//校验位
            }
        };
        DefaultDecoder.prototype.decodeBody = function (bytePacket, packet) {
            try {
                var i = 0;
                var count = packet.define.length;
                for (i = 0; i < count; i++) {
                    this.decodeItem(packet.define[i], bytePacket, packet);
                }
            }
            catch (e) {
                codeBase.Debug.log = "@--decodeError" + e.message;
            }
        };
        //CHAR	1	单字节字符
        DefaultDecoder.prototype.readByte = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readByte();
        };
        ////UBYTE	1	1个字节无符合整型
        DefaultDecoder.prototype.readUByte = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readUnsignedByte();
        };
        ////UBYTE	1	1个字节无符合整型
        DefaultDecoder.prototype.readBoolean = function (defItem, bytePacket, target) {
            var value = bytePacket.readUnsignedByte();
            target[defItem.id] = false;
            if (value == 1)
                target[defItem.id] = true;
        };
        //WORD	2	2个字节无符合整型
        DefaultDecoder.prototype.readUShort = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readUnsignedShort();
        };
        //2字节有符号整数
        DefaultDecoder.prototype.readShort = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readShort();
        };
        //DWORD	4	4个字节无符合整型
        DefaultDecoder.prototype.readUInt = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readUnsignedInt();
        };
        //DWORD	4	4个字节有符合整型
        DefaultDecoder.prototype.readInt = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readInt();
        };
        //long	8	64位无符号双精度
        DefaultDecoder.prototype.readUInt64 = function (defItem, bytePacket, target) {
            var long_l = 0;
            var long_h = 0;
            long_h = bytePacket.readUnsignedInt();
            long_l = bytePacket.readUnsignedInt();
            target[defItem.id] = (long_h * DefaultDecoder.MATH_POW_2_32) + long_l;
        };
        //8字节
        DefaultDecoder.prototype.readInt64 = function (defItem, bytePacket, target) {
            var long_l = 0;
            var long_h = 0;
            long_h = bytePacket.readInt();
            long_l = bytePacket.readUnsignedInt();
            target[defItem.id] = (long_h * DefaultDecoder.MATH_POW_2_32) + long_l;
        };
        //long	4	32位双精度
        DefaultDecoder.prototype.readFloat = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readFloat();
        };
        //long	4	32位无符号双精度
        DefaultDecoder.prototype.readUFloat = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readFloat();
        };
        //long	8	64位无符号双精度
        DefaultDecoder.prototype.readUDouble = function (defItem, bytePacket, target) {
            var long_l = 0;
            var long_h = 0;
            long_l = bytePacket.readUnsignedInt();
            long_h = bytePacket.readUnsignedInt();
            target[defItem.id] = (long_h * DefaultDecoder.MATH_POW_2_32) + long_l;
        };
        //8字节
        DefaultDecoder.prototype.readDouble = function (defItem, bytePacket, target) {
            var long_l = 0;
            var long_h = 0;
            long_l = bytePacket.readUnsignedInt();
            long_h = bytePacket.readInt();
            target[defItem.id] = (long_h * DefaultDecoder.MATH_POW_2_32) + long_l;
        };
        //数据流
        DefaultDecoder.prototype.readByteArray = function (defItem, bytePacket, target) {
            var length = bytePacket.readUnsignedShort(); //数据流长度
            var ba = codeBase.ObjectPool.getByClass(egret.ByteArray);
            if (length > 0) {
                bytePacket.readBytes(ba, 0, length);
            }
            target[defItem.id] = ba;
        };
        //字符串读取
        DefaultDecoder.prototype.readString = function (defItem, bytePacket, target) {
            target[defItem.id] = bytePacket.readUTF();
        };
        //数组读取
        DefaultDecoder.prototype.readArray = function (defItem, bytePacket, target) {
            var count = 0;
            if (codeBase.Packet.TYPE_ARRAY_CONST == defItem.type) {
                count = defItem["length"];
            }
            else if (codeBase.Packet.TYPE_ARRAY == defItem.type) {
                count = bytePacket.readUnsignedShort();
            }
            target[defItem.id].length = 0;
            var isEntity = false;
            if (typeof (defItem.entity) == "string") {
                isEntity = false;
            }
            else {
                isEntity = true;
            }
            var i = 0;
            if (isEntity) {
                for (i = 0; i < count; i++) {
                    this.readEntityToArray(defItem, bytePacket, target[defItem.id]);
                }
            }
            else {
                var tempObj = null;
                for (i = 0; i < count; i++) {
                    tempObj = {};
                    this.decodeItem({ id: "value", type: codeBase.Packet[defItem.entity] }, bytePacket, tempObj);
                    target[defItem.id].push(tempObj["value"]);
                }
            }
        };
        //实体读取
        DefaultDecoder.prototype.readEntity = function (defItem, bytePacket, target) {
            var entity = codeBase.ObjectPool.getByClass(defItem.entity);
            var define = entity.define;
            var i = 0;
            for (i = 0; i < define.length; i++) {
                this.decodeItem(define[i], bytePacket, entity);
            }
            target[defItem.id] = entity;
        };
        //往数组实体读取
        DefaultDecoder.prototype.readEntityToArray = function (defItem, bytePacket, target) {
            var entity = codeBase.ObjectPool.getByClass(defItem.entity);
            var define = entity.define;
            var i = 0;
            for (i = 0; i < define.length; i++) {
                this.decodeItem(define[i], bytePacket, entity);
            }
            target.push(entity);
        };
        DefaultDecoder.prototype.decodeItem = function (defItem, bytePacket, target) {
            switch (defItem.type) {
                case codeBase.Packet.TYPE_BYTE://CHAR	1	单字节字符
                    this.readByte(defItem, bytePacket, target);
                    break;
                //                case Packet.TYPE_UBYTE://UBYTE	1	1个字节无符合整型
                //                    this.readUByte(defItem, bytePacket, target);
                //                    break;
                case codeBase.Packet.TYPE_USHORT://WORD	2	2个字节无符合整型
                    this.readUShort(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_SHORT://2字节有符号整数
                    this.readShort(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_UINT://DWORD	4	4个字节无符合整型
                    this.readUInt(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_INT://DWORD	4	4个字节有符合整型
                    this.readInt(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_INT64://DWORD	8	8个字节有符合整型
                    this.readInt64(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_UINT64://DWORD	8	8个字节有符合整型
                    this.readUInt64(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_FLOAT://8字节
                    this.readFloat(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_UFLOAT://8字节
                    this.readUFloat(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_DOUBLE://8字节
                    this.readDouble(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_UDOUBLE://8字节
                    this.readUDouble(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_BYTEARRAY://数据流
                    this.readByteArray(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_STRING://WCHAR(N)	N*2	双字节变长字符串	字符串以\0为结束符
                    this.readString(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_BOOLEAN://布尔值
                    this.readBoolean(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_ARRAY: //ARRAY	变长	某种数据结构的数组
                case codeBase.Packet.TYPE_ARRAY_CONST://ARRAY	定长	某种数据结构的数组
                    this.readArray(defItem, bytePacket, target);
                    break;
                case codeBase.Packet.TYPE_ENTITY:
                    this.readEntity(defItem, bytePacket, target);
                    break;
            }
            codeBase.Debug.log = defItem.id + "=" + target[defItem.id];
        };
        DefaultDecoder.MATH_POW_2_32 = 4294967296; // 2^32.
        return DefaultDecoder;
    }());
    codeBase.DefaultDecoder = DefaultDecoder;
    __reflect(DefaultDecoder.prototype, "codeBase.DefaultDecoder", ["codeBase.IDecoder"]);
})(codeBase || (codeBase = {}));
//# sourceMappingURL=DefaultDecoder.js.map