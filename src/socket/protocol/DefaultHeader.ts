module codeBase{
	export class DefaultHeader implements IHeader{
        public messageId:number = 0;//协议号
        public code:number = 0;//校验位
    }
}