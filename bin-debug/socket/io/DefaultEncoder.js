var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var DefaultEncoder = (function () {
        function DefaultEncoder() {
        }
        // public static MATH_POW_2_32:number = 4294967296;// 2^32.
        DefaultEncoder.prototype.encoder = function (packet) {
            //回写包体长度
            var bodyBytes = this.encodeBody(packet);
            var headBytes = this.encodeHeader(packet, bodyBytes.length);
            headBytes.writeBytes(bodyBytes);
            bodyBytes.clear();
            codeBase.ObjectPool.recycleClass(bodyBytes);
            return headBytes;
        };
        DefaultEncoder.prototype.encodeHeader = function (packet, bodylen) {
            var headBytes = codeBase.ObjectPool.getByClass(egret.ByteArray);
            headBytes.clear();
            headBytes.endian = codeBase.WebSocket.ENDIAN;
            if (packet.clientSide) {
                headBytes.writeShort(bodylen); //WORD pack_size;//包体长度,不包含协议头
                headBytes.writeShort(packet.header.messageId); //WORD  cmd_index;//命令
                headBytes.writeShort(packet.header.code); //WORD   check_code;//校验位
            }
            else {
                headBytes.writeShort(bodylen); //WORD pack_size;//包体长度,不包含协议头
                headBytes.writeShort(packet.header.messageId); //WORD  cmd_index;//命令
                headBytes.writeShort(packet.header.code); //WORD   check_code;//校验位
            }
            return headBytes;
        };
        DefaultEncoder.prototype.encodeBody = function (packet) {
            var outBytes = codeBase.ObjectPool.getByClass(egret.ByteArray);
            outBytes.clear();
            outBytes.endian = codeBase.WebSocket.ENDIAN;
            var i = 0;
            var count = packet.define.length;
            for (i = 0; i < count; i++) {
                if (codeBase.Packet.TYPE_ENTITY == packet.define[i].type) {
                    this.encodeItem(packet.define[i], outBytes, packet[packet.define[i].id]);
                }
                else {
                    this.encodeItem(packet.define[i], outBytes, packet);
                }
            }
            return outBytes;
        };
        //CHAR	1	单字节字符
        DefaultEncoder.prototype.writeByte = function (defItem, outByteArray, target) {
            outByteArray.writeByte(target[defItem.id]);
        };
        //UBYTE	1	1个字节无符合整型
        DefaultEncoder.prototype.writeUByte = function (defItem, outByteArray, target) {
            outByteArray.writeByte(target[defItem.id]);
        };
        //UBYTE	1	1个字节无符合整型
        DefaultEncoder.prototype.writeBoolean = function (defItem, outByteArray, target) {
            if (target[defItem.id]) {
                outByteArray.writeByte(1);
            }
            else {
                outByteArray.writeByte(0);
            }
        };
        //WORD	2	2个字节短整型
        DefaultEncoder.prototype.writeShort = function (defItem, outByteArray, target) {
            outByteArray.writeShort(target[defItem.id]);
        };
        //WORD	2	2个字节短整型
        DefaultEncoder.prototype.writeUShort = function (defItem, outByteArray, target) {
            outByteArray.writeShort(target[defItem.id]);
        };
        //DWORD	4	4个字节整型
        DefaultEncoder.prototype.writeInt = function (defItem, outByteArray, target) {
            outByteArray.writeInt(target[defItem.id]);
        };
        //DWORD	4	4个字节无符号整型
        DefaultEncoder.prototype.writeUInt = function (defItem, outByteArray, target) {
            outByteArray.writeUnsignedInt(target[defItem.id]);
        };
        //WORD	8	8个字节数值
        DefaultEncoder.prototype.writeUInt64 = function (defItem, outByteArray, target) {
            var double = target[defItem.id];
            var long_l = parseInt("" + double);
            var long_h = (double - long_l) / codeBase.Packet.MATH_POW_2_32;
            outByteArray.writeUnsignedInt(long_h);
            outByteArray.writeUnsignedInt(long_l);
        };
        //WORD	8	8个字节数值
        DefaultEncoder.prototype.writeInt64 = function (defItem, outByteArray, target) {
            var double = target[defItem.id];
            var long_l = parseInt("" + double);
            var long_h = parseInt("" + ((double - long_l) / codeBase.Packet.MATH_POW_2_32));
            outByteArray.writeInt(long_h);
            outByteArray.writeUnsignedInt(long_l);
        };
        //WORD	2	4个字节无符号
        DefaultEncoder.prototype.writeUFloat = function (defItem, outByteArray, target) {
            outByteArray.writeFloat(target[defItem.id]);
        };
        //WORD	2	4个字节
        DefaultEncoder.prototype.writeFloat = function (defItem, outByteArray, target) {
            outByteArray.writeFloat(target[defItem.id]);
        };
        //WORD	8	8个字节数值
        DefaultEncoder.prototype.writeUDouble = function (defItem, outByteArray, target) {
            var double = target[defItem.id];
            var long_l = parseInt("" + double);
            var long_h = (double - long_l) / codeBase.Packet.MATH_POW_2_32;
            var bytes = codeBase.ObjectPool.getByClass(egret.ByteArray);
            bytes.clear();
            bytes.endian = codeBase.WebSocket.ENDIAN;
            bytes.writeUnsignedInt(long_l);
            bytes.writeUnsignedInt(long_h);
            outByteArray.writeBytes(bytes, 0, bytes.bytesAvailable);
            bytes.clear();
            codeBase.ObjectPool.recycleClass(bytes);
        };
        //WORD	8	8个字节数值
        DefaultEncoder.prototype.writeDouble = function (defItem, outByteArray, target) {
            var double = target[defItem.id];
            var long_l = parseInt("" + double);
            var long_h = (double - long_l) / codeBase.Packet.MATH_POW_2_32;
            var bytes = codeBase.ObjectPool.getByClass(egret.ByteArray);
            bytes.clear();
            bytes.endian = codeBase.WebSocket.ENDIAN;
            bytes.writeUnsignedInt(long_l);
            bytes.writeInt(long_h);
            outByteArray.writeBytes(bytes, 0, bytes.bytesAvailable);
            bytes.clear();
            codeBase.ObjectPool.recycleClass(bytes);
        };
        //WCHAR(N)	N*2	双字节变长字符串	字符串以\0为结束符
        DefaultEncoder.prototype.writeString = function (defItem, outByteArray, target) {
            outByteArray.writeUTF(target[defItem.id] == null ? "" : target[defItem.id]);
        };
        //数据流
        DefaultEncoder.prototype.writeByteArray = function (defItem, outByteArray, target) {
            //填充字节长度
            outByteArray.writeShort(target[defItem.id].length);
            //填充具体字节数据
            if (target[defItem.id].length > 0)
                outByteArray.writeBytes(target[defItem.id]);
        };
        //数组
        DefaultEncoder.prototype.writeArray = function (defItem, outByteArray, target) {
            var arrayData = target[defItem.id];
            var count = arrayData.length;
            if (codeBase.Packet.TYPE_ARRAY_CONST == defItem.type) {
                count = defItem["length"];
            }
            outByteArray.writeShort(count);
            var i = 0;
            var isEntity = false;
            var tempObj = null;
            if (typeof (defItem.entity) == "string") {
                isEntity = false;
            }
            else {
                isEntity = true;
            }
            for (i = 0; i < count; i++) {
                if (isEntity) {
                    this.writeEntity(defItem, outByteArray, arrayData[i]);
                }
                else {
                    tempObj = {};
                    tempObj["value"] = arrayData[i];
                    this.encodeItem({ id: "value", type: codeBase.Packet[defItem.entity] }, outByteArray, tempObj);
                }
            }
        };
        //写实体
        DefaultEncoder.prototype.writeEntity = function (defItem, outByteArray, target) {
            if (!target)
                return;
            var define = target.define;
            var i = 0;
            for (i = 0; i < define.length; i++) {
                this.encodeItem(define[i], outByteArray, target);
            }
        };
        DefaultEncoder.prototype.encodeItem = function (defItem, outByteArray, target) {
            switch (defItem.type) {
                case codeBase.Packet.TYPE_BYTE://CHAR	1	单字节字符
                    this.writeByte(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_SHORT://WORD	2	2个字节无符合整型
                    this.writeShort(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_USHORT://WORD	2	2个字节无符合整型
                    this.writeUShort(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_UINT://DWORD	4	4个字节无符合整型
                    this.writeUInt(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_INT://DWORD	4	4个字节无符合整型
                    this.writeInt(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_INT64://DWORD	8	8个字节无符合整型
                    this.writeInt64(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_UINT64://DWORD	8	8个字节无符合整型
                    this.writeUInt64(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_FLOAT:
                    this.writeFloat(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_UFLOAT:
                    this.writeUFloat(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_UDOUBLE:
                    this.writeUDouble(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_DOUBLE:
                    this.writeDouble(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_BOOLEAN:
                    this.writeBoolean(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_BYTEARRAY://数据流
                    this.writeByteArray(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_STRING://WCHAR(N)	N*2	双字节变长字符串	字符串以\0为结束符
                    this.writeString(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_ARRAY: //ARRAY	变长	某种数据结构的数组
                case codeBase.Packet.TYPE_ARRAY_CONST://ARRAY	定长	某种数据结构的数组
                    this.writeArray(defItem, outByteArray, target);
                    break;
                case codeBase.Packet.TYPE_ENTITY:
                    this.writeEntity(defItem, outByteArray, target);
                    break;
            }
        };
        return DefaultEncoder;
    }());
    codeBase.DefaultEncoder = DefaultEncoder;
    __reflect(DefaultEncoder.prototype, "codeBase.DefaultEncoder", ["codeBase.IEncoder"]);
})(codeBase || (codeBase = {}));
