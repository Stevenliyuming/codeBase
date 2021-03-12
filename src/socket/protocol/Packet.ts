module codeBase {
    export class Packet {
        //--------------常量定义区域--------------
        public static TYPE_BOOLEAN: string = "boolean";//CHAR	1	单字节字符
        public static TYPE_BYTE: string = "byte";//CHAR	1	单字节字符
        public static TYPE_USHORT: string = "ushort";//WORD	2	2个字节无符号整型
        public static TYPE_SHORT: string = "short";//WORD	2	2个字节整型
        public static TYPE_UINT: string = "uint";//DWORD	4	4个字节无符号整型
        public static TYPE_INT: string = "int";//DWORD 4 4个字节带符号整形
        public static TYPE_UINT64: string = "uint64";//DWORD	4	4个字节无符号整型
        public static TYPE_INT64: string = "int64";//DWORD 4 4个字节带符号整形
        public static TYPE_FLOAT: string = "float";//long	4	32位双精度
        public static TYPE_UFLOAT: string = "ufloat";//long	4	32位无符号双精度
        public static TYPE_DOUBLE: string = "double";//long	8	64位双精度
        public static TYPE_UDOUBLE: string = "udouble";//long	8	64位无符号双精度
        public static TYPE_STRING: string = "string";//String  字符串
        public static TYPE_ARRAY: string = "array";//ARRAY	变长	某种数据结构的数组
        public static TYPE_ARRAY_CONST: string = "array_const";//ARRAY	定长	某种数据结构的数组
        public static TYPE_BYTEARRAY: string = "bytearray";
        public static TYPE_ENTITY: string = "entity";//实体类

        public static CHARSET_ASCII: string = "ASCII";
        public static CHARSET_UNICODE: string = "Unicode";
        public static CHARSET: string = Packet.CHARSET_UNICODE;
        public static MATH_POW_2_32: number = 4294967296;// 2^32.


        public header: IHeader = null;//包头
        /**
         * 包体item定义:item = { type:string, id:string, length:number, entity:string|Packet }
         * type:数据类型
         * id:定义的包类属性名
         * length:定长数组长度
         * entity：数组里面的数据具体类型
         */
        public define: Array<any> = new Array<any>();
        private _clientSide: boolean = true;//cleint 端协议

        public constructor(messageId: number = 0, cside: boolean = true) {
            this.clientSide = cside;
            this.header.messageId = messageId;
        }

        /**
         * 内容成功与否标识
         * @return true,对应请求成功;false,对应请求失败
         * 
         */
        public get isSuccess(): boolean {
            return this.header.code == 0 ? true : false;
        }

        public send(): void {
            if (this.clientSide) {
                WebSocket.getInstance().send(this);
            } else {
                EventManager.dispactchPacket(this);
            }
        }

        public get clientSide(): boolean {
            return this._clientSide;
        }
        public set clientSide(v: boolean) {
            this._clientSide = v;
            if (this.clientSide) {
                this.header = new PacketFactory.headerClientClz();
            } else {
                this.header = new PacketFactory.headerServerClz();
            }
        }

        /**
         * 销毁数据
         */
        public destory(): void {
        }
    }
}