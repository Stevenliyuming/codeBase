var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var Packet = (function () {
        function Packet(messageId, cside) {
            if (messageId === void 0) { messageId = 0; }
            if (cside === void 0) { cside = true; }
            this.header = null; //包头
            this.define = new Array(); //包体 item定义数据
            this._clientSide = true; //cleint 端协议
            this.clientSide = cside;
            this.header.messageId = messageId;
        }
        Object.defineProperty(Packet.prototype, "isSuccess", {
            /**
             * 内容成功与否标识
             * @return true,对应请求成功;false,对应请求失败
             *
             */
            get: function () {
                return this.header.code == 0 ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        Packet.prototype.send = function () {
            if (this.clientSide) {
                codeBase.WebSocket.getInstance().send(this);
            }
            else {
                codeBase.EventManager.dispactchPacket(this);
            }
        };
        Object.defineProperty(Packet.prototype, "clientSide", {
            get: function () {
                return this._clientSide;
            },
            set: function (v) {
                this._clientSide = v;
                if (this.clientSide) {
                    this.header = new codeBase.PacketFactory.headerClientClz();
                }
                else {
                    this.header = new codeBase.PacketFactory.headerServerClz();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 销毁数据
         */
        Packet.prototype.destory = function () {
        };
        //--------------常量定义区域--------------
        Packet.TYPE_BOOLEAN = "boolean"; //CHAR	1	单字节字符
        Packet.TYPE_BYTE = "byte"; //CHAR	1	单字节字符
        Packet.TYPE_USHORT = "ushort"; //WORD	2	2个字节无符号整型
        Packet.TYPE_SHORT = "short"; //WORD	2	2个字节整型
        Packet.TYPE_UINT = "uint"; //DWORD	4	4个字节无符号整型
        Packet.TYPE_INT = "int"; //DWORD 4 4个字节带符号整形
        Packet.TYPE_UINT64 = "uint64"; //DWORD	4	4个字节无符号整型
        Packet.TYPE_INT64 = "int64"; //DWORD 4 4个字节带符号整形
        Packet.TYPE_FLOAT = "float"; //long	4	32位双精度
        Packet.TYPE_UFLOAT = "ufloat"; //long	4	32位无符号双精度
        Packet.TYPE_DOUBLE = "double"; //long	8	64位双精度
        Packet.TYPE_UDOUBLE = "udouble"; //long	8	64位无符号双精度
        Packet.TYPE_STRING = "string"; //String  字符串
        Packet.TYPE_ARRAY = "array"; //ARRAY	变长	某种数据结构的数组
        Packet.TYPE_ARRAY_CONST = "array_const"; //ARRAY	定长	某种数据结构的数组
        Packet.TYPE_BYTEARRAY = "bytearray";
        Packet.TYPE_ENTITY = "entity"; //实体类
        Packet.CHARSET_ASCII = "ASCII";
        Packet.CHARSET_UNICODE = "Unicode";
        Packet.CHARSET = Packet.CHARSET_UNICODE;
        Packet.MATH_POW_2_32 = 4294967296; // 2^32.
        return Packet;
    }());
    codeBase.Packet = Packet;
    __reflect(Packet.prototype, "codeBase.Packet");
})(codeBase || (codeBase = {}));
