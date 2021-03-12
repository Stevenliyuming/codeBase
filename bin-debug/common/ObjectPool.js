var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 对象池,针对经常创建的对象进行 回收并复用,减少对象创建的消耗
     * 不给垃圾回收的机会
     */
    var ObjectPool = (function () {
        function ObjectPool() {
        }
        //public static length:number = 0;//长度
        /**
         * 传入一个class,给你一个class对象的实例
         * 使用class的名称作为对象映射的key
         * 该class的构造函数必须是无参数要求
         * 从对象池中提取Object
         * @param clz 要提取的objec的Class
         * @return clz 对象的实例
         */
        ObjectPool.getByClass = function (clz, flag, pop) {
            if (flag === void 0) { flag = ""; }
            if (pop === void 0) { pop = true; }
            var key = egret.getQualifiedClassName(clz);
            key = flag + key;
            var item = ObjectPool.getObject(key, pop);
            if (item == null)
                item = new clz();
            if (!pop) {
                ObjectPool.recycleClass(item, flag);
            }
            return item;
        };
        /**
         * 释放object,使得objec返回到pool池,可以继续重复利用
         * 使用class的名称作为对象映射的key
         * @param item 要返回池中的item对象
         */
        ObjectPool.recycleClass = function (obj, flag) {
            if (flag === void 0) { flag = ""; }
            if (!obj)
                return;
            var key = egret.getQualifiedClassName(obj);
            key = flag + key;
            ObjectPool.recycleObject(key, obj);
        };
        /**
         * 查询是否有某class名称的对象池存在
         * @param clz
         * @returns {any}
         */
        ObjectPool.hasClass = function (clz, flag) {
            if (flag === void 0) { flag = ""; }
            return ObjectPool.getByClass(clz, flag, false);
        };
        /**
         * 根据name从对象池中提取Object
         * @param name 要提取的objec的name
         * @param pop 是否从对象池中弹出
         * @return clz 对象的实例
         */
        ObjectPool.getObject = function (name, pop) {
            if (pop === void 0) { pop = true; }
            if (ObjectPool._dataPool.hasOwnProperty(name) && ObjectPool._dataPool[name].length > 0) {
                var obj = null;
                if (pop) {
                    obj = ObjectPool._dataPool[name].pop();
                    if (ObjectPool._dataPool[name].length == 0)
                        delete ObjectPool._dataPool[name];
                }
                else {
                    obj = ObjectPool._dataPool[name][0];
                }
                return obj;
            }
            return null;
        };
        /**
         * 使用name存储对象
         * @param item
         * @param name
         * @param group
         */
        ObjectPool.setObject = function (name, item) {
            ObjectPool.recycleObject(name, item);
        };
        /**
         * 回收对象,使用name存储
         * 反之,通过name提取
         * @param name
         * @param item
         */
        ObjectPool.recycleObject = function (name, item) {
            if (!item)
                return;
            if (!ObjectPool._dataPool.hasOwnProperty(name)) {
                ObjectPool._dataPool[name] = [];
            }
            if (item.hasOwnProperty("destroy"))
                item.destroy();
            if (ObjectPool._dataPool[name].indexOf(item) < 0) {
                ObjectPool._dataPool[name].push(item);
            }
        };
        /**
         * 查询是否有name名称的对象池存在
         * @param name
         * @returns {any}
         */
        ObjectPool.hasObject = function (name) {
            return ObjectPool.getObject(name, false);
        };
        /**
         * 释放所有clz归属的objec的引用
         * 获取class的名称作为对象映射的key,把对应的对象列表引用释放
         * @param clz 要释放的objec的Class
         */
        ObjectPool.dispose = function (clz) {
            var key = egret.getQualifiedClassName(clz);
            ObjectPool.disposeObjects(key);
        };
        /**
         * 释放某个对象池的所有对象
         * 获取name对应的对象列表, 把引用释放
         * @param name
         */
        ObjectPool.disposeObjects = function (name) {
            if (ObjectPool._dataPool.hasOwnProperty(name)) {
                ObjectPool._dataPool[name].length = 0;
                delete ObjectPool._dataPool[name];
            }
        };
        /**
         * 清空对象池所有对象
         */
        ObjectPool.destroy = function () {
            for (var key in ObjectPool._dataPool) {
                if (ObjectPool._dataPool.hasOwnProperty(key)) {
                    ObjectPool._dataPool[key].length = 0;
                    delete ObjectPool._dataPool[key];
                }
            }
        };
        ObjectPool._dataPool = {}; //池数据
        return ObjectPool;
    }());
    codeBase.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "codeBase.ObjectPool");
})(codeBase || (codeBase = {}));
