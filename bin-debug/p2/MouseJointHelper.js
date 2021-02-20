var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var codeBase;
(function (codeBase) {
    var MouseJointHelper = (function (_super) {
        __extends(MouseJointHelper, _super);
        function MouseJointHelper(stageRef, pSceneCtn, pWorld, hasDisplaySkin) {
            if (hasDisplaySkin === void 0) { hasDisplaySkin = true; }
            var _this = _super.call(this) || this;
            _this.stage = stageRef;
            _this.world = pWorld;
            _this.sceneCtn = pSceneCtn;
            if (hasDisplaySkin) {
                _this.mouseBody = codeBase.easyP2.P2Space.addOneBox(_this.world, _this.sceneCtn, 400, 400, 20, 20, 0, p2.Body.KINEMATIC); //mouseBody
                _this.mouseBody.shapes[0].collisionMask = 0;
            }
            else {
                _this.mouseBody = new p2.Body();
            }
            _this.mouseBody.allowSleep = false;
            _this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onStageTouchBegin, _this);
            _this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onStageTouchMove, _this);
            _this.stage.addEventListener(egret.TouchEvent.TOUCH_END, _this.onStageTouchEnd, _this);
            return _this;
        }
        MouseJointHelper.prototype.onStageTouchBegin = function (e) {
            for (var i = 0; i < this.sceneCtn.numChildren; i++) {
                var disp = this.sceneCtn.getChildAt(i);
                if (disp.hitTestPoint(e.stageX, e.stageY, true)) {
                    console.log("hit disp");
                    var temBody = this.getDispP2Body(disp);
                    if (temBody == this.mouseBody) {
                        return;
                    }
                    if (temBody == null) {
                        return;
                    }
                    console.log("hit bodyType:" + temBody.type);
                    if (temBody.type == p2.Body.DYNAMIC) {
                        temBody.wakeUp();
                        var p2x = codeBase.easyP2.P2Space.convertEgretValueToP2(e.stageX);
                        var p2y = codeBase.easyP2.P2Space.convertEgretY_To_P2Y(e.stageY);
                        this.mouseBody.position[0] = p2x;
                        this.mouseBody.position[1] = p2y;
                        if (this.mouseConstraint) {
                            this.world.removeConstraint(this.mouseConstraint);
                            this.mouseConstraint.bodyA = null;
                            this.mouseConstraint.bodyB = null;
                            this.mouseConstraint = null;
                        }
                        this.mouseConstraint = new p2.RevoluteConstraint(this.mouseBody, temBody, { worldPivot: [p2x, p2y] });
                        this.world.addConstraint(this.mouseConstraint);
                        if (this.mouseBody.displays) {
                            this.sceneCtn.addChild(this.mouseBody.displays[0]);
                        }
                    }
                }
            }
        };
        MouseJointHelper.prototype.onStageTouchMove = function (e) {
            if (this.mouseConstraint) {
                var p2x = codeBase.easyP2.P2Space.convertEgretValueToP2(e.stageX);
                var p2y = codeBase.easyP2.P2Space.convertEgretY_To_P2Y(e.stageY);
                this.mouseBody.position[0] = p2x;
                this.mouseBody.position[1] = p2y;
            }
        };
        MouseJointHelper.prototype.onStageTouchEnd = function (e) {
            if (this.mouseConstraint) {
                this.world.removeConstraint(this.mouseConstraint);
                this.mouseConstraint.bodyA = null;
                this.mouseConstraint.bodyB = null;
                this.mouseConstraint = null;
            }
        };
        /**
        * 获得显示对象对应的刚体
        */
        MouseJointHelper.prototype.getDispP2Body = function (disp) {
            var result;
            for (var i = 0; i < this.world.bodies.length; i++) {
                if (this.world.bodies[i].displays == null) {
                    continue;
                }
                if (this.world.bodies[i].displays[0] == disp) {
                    result = this.world.bodies[i];
                    break;
                }
            }
            return result;
        };
        return MouseJointHelper;
    }(egret.EventDispatcher));
    codeBase.MouseJointHelper = MouseJointHelper;
    __reflect(MouseJointHelper.prototype, "codeBase.MouseJointHelper");
})(codeBase || (codeBase = {}));
