var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var MyEvent = (function () {
        /**
         * <p>事件基类构造函数,包含一个参数</p>
         * @param type 事件类型
         */
        function MyEvent(typeValue) {
            this.callStack = null;
            this.type = null;
            this.datas = {};
            this.type = typeValue;
        }
        /**
         *  <p>添加单个对象到结果集中</p>
         *  @param value 要添加的对象
         */
        MyEvent.prototype.addItem = function (property, value) {
            this.datas[property] = value;
        };
        /**
         * 获取property对应的内容
         * @param property
         * @returns {null}
         */
        MyEvent.prototype.getItem = function (property) {
            if (this.datas.hasOwnProperty(property)) {
                return this.datas[property];
            }
            return null;
        };
        /**
         * 查询是否携带了proprty名称的数据
         * @param property
         * @returns {boolean}
         */
        MyEvent.prototype.hasItem = function (property) {
            return this.datas.hasOwnProperty(property);
        };
        /**
         * 回收对象到对象池中
         */
        MyEvent.prototype.destory = function () {
            this.callStack = null;
            for (var item in this.datas) {
                delete this.datas[item];
            }
        };
        /**
         * 删除property名称的数据
         * @param proprty
         */
        MyEvent.prototype.removeItem = function (property) {
            if (this.datas.hasOwnProperty(property)) {
                delete this.datas[property];
                return true;
            }
            return false;
        };
        /**
         * 派发event对象
         */
        MyEvent.prototype.send = function () {
            codeBase.EventManager.dispatchEvent(this);
        };
        /**
         * 从对象池中获取一个type类型的event对象
         * @param type
         * @returns {MyEvent}
         */
        MyEvent.getEvent = function (type) {
            return codeBase.EventManager.getEvent(type);
        };
        /**
         * 快捷发送一个type类型的event事件
         * @param type
         */
        MyEvent.sendEvent = function (type, param) {
            if (param === void 0) { param = null; }
            codeBase.EventManager.dispatch(type, param);
        };
        return MyEvent;
    }());
    codeBase.MyEvent = MyEvent;
    __reflect(MyEvent.prototype, "codeBase.MyEvent");
})(codeBase || (codeBase = {}));
