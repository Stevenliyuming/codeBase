var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var spine;
(function (spine) {
    var EventEmitter = (function () {
        function EventEmitter() {
            this.events = new spine.Map2();
        }
        EventEmitter.prototype.on = function (event, fn, context) {
            var listeners = this.events.get(event);
            if (listeners) {
                listeners.push({ once: false, fn: fn, context: context });
            }
            else {
                this.events.set(event, [{ once: false, fn: fn, context: context }]);
            }
            return this;
        };
        EventEmitter.prototype.once = function (event, fn, context) {
            var listeners = this.events.get(event);
            if (listeners) {
                listeners.push({ once: true, fn: fn, context: context });
            }
            else {
                this.events.set(event, [{ once: true, fn: fn, context: context }]);
            }
            return this;
        };
        EventEmitter.prototype.off = function (event, fn, context, once) {
            var listeners = this.events.get(event);
            if (listeners) {
                if (fn) {
                    for (var i = 0; i < listeners.length; i++) {
                        var l = listeners[i];
                        if ((fn === l.fn) && (!once || l.once) && (!context || l.context === context)) {
                            listeners.splice(i--, 1);
                        }
                    }
                }
                else {
                    this.events.delete(event);
                }
            }
            return this;
        };
        EventEmitter.prototype.offAll = function () {
            this.events.clear();
            return this;
        };
        EventEmitter.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var listeners = this.events.get(event);
            if (listeners) {
                for (var i = 0; i < listeners.length; i++) {
                    var listener = listeners[i];
                    if (listener.once)
                        listeners.splice(i--, 1);
                    listener.fn.apply(listener.context, args);
                }
            }
            return this;
        };
        return EventEmitter;
    }());
    spine.EventEmitter = EventEmitter;
    __reflect(EventEmitter.prototype, "spine.EventEmitter");
})(spine || (spine = {}));
