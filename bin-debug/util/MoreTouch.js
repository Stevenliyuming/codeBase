var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    var MoreTouch = (function () {
        function MoreTouch() {
        }
        /**
         * @param object
         * @param isControlGlobal
         * @param minScale
         * @param maxScale
         * @param isMiddle
         */
        MoreTouch.start = function (object, isControlGlobal, minScale, maxScale, isMiddle) {
            if (isControlGlobal === void 0) { isControlGlobal = true; }
            if (minScale === void 0) { minScale = 0; }
            if (maxScale === void 0) { maxScale = 9999; }
            if (isMiddle === void 0) { isMiddle = true; }
            if (this.moveObject && this.moveObject == object)
                return;
            this.moveObject = object;
            if (isControlGlobal) {
                var stage = egret.MainContext.instance.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            else {
                this.moveObject.touchEnabled = true;
                this.moveObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                this.moveObject.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                this.moveObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (isMiddle) {
                codeBase.TweenEffect.setAnchorXY(this.moveObject);
            }
            this.minScale = minScale; // * this._moveObject.width;
            this.maxScale = maxScale; // * this._moveObject.width;
            // console.log("_minScale:" + this._minScale);
            // console.log("_maxScale:" + this._maxScale);
        };
        MoreTouch.mouseDown = function (e) {
            if (this.touchPoints[e.touchPointID] == null) {
                this.touchPoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
                this.touchPoints["names"].push(e.touchPointID);
            }
            this.touchCount++;
            if (this.touchCount == 1) {
                var names = this.touchPoints["names"];
                var pos = this.moveObject.parent.globalToLocal(e.stageX, e.stageY);
                this.oldX = pos.x - this.moveObject.x;
                this.oldY = pos.y - this.moveObject.y;
                this.firstTouchId = e.touchPointID;
                // console.log("_oldX:" + this._oldX);
                // console.log("_oldY:" + this._oldY);
            }
            if (this.touchCount == 2) {
                this.distance = this.getTouchDistance();
                this.angle = this.getTouchAngle();
                console.log("_distance:" + this.distance);
            }
            //console.log(e.touchPointID);
        };
        MoreTouch.mouseMove = function (e) {
            //console.log(e.touchPointID);
            this.touchPoints[e.touchPointID].x = e.stageX;
            this.touchPoints[e.touchPointID].y = e.stageY;
            if (e.touchPointID == this.firstTouchId) {
                // this._moveObject.x = e.stageX - this._oldX;
                // this._moveObject.y = e.stageY - this._oldY;
                var pos = this.moveObject.parent.globalToLocal(e.stageX, e.stageY);
                this.moveObject.x = pos.x - this.oldX;
                this.moveObject.y = pos.y - this.oldY;
            }
            if (this.touchCount == 2) {
                var newDistance = this.getTouchDistance();
                // console.log("newDistance:" + newDistance);
                // var scale = newDistance / this._distance;
                // if (scale < this._minScale) scale = this._minScale;
                // if (scale > this._maxScale) scale = this._maxScale;
                var tempScale = Math.abs((newDistance / this.distance) - 1);
                tempScale *= 0.1;
                console.log("tempScale:" + tempScale);
                this.currentScale += newDistance > this.currentDistance ? tempScale : -tempScale;
                var scale = this.currentScale;
                if (scale < this.minScale)
                    scale = this.minScale;
                if (scale > this.maxScale)
                    scale = this.maxScale;
                this.currentScale = scale;
                this.currentDistance = newDistance;
                console.log("scale:" + scale);
                this.moveObject.scaleX = scale;
                this.moveObject.scaleY = scale;
                var newAngle = this.getTouchAngle();
                this.moveObject.rotation = newAngle - this.angle + this.currentRotation;
            }
        };
        MoreTouch.mouseUp = function (e) {
            //console.log(e.touchPointID);
            delete this.touchPoints[e.touchPointID];
            var index = this.touchPoints["names"].indexOf(e.touchPointID);
            if (index >= 0) {
                this.touchPoints["names"].splice(index, 1);
            }
            this.touchCount--;
            this.currentScale = this.moveObject.scaleX;
            // this._moveObject.width *= this._moveObject.scaleX;
            // this._moveObject.height *= this._moveObject.scaleY;
            // this._moveObject.scaleX = 1;
            // this._moveObject.scaleY = 1;
            // if (this._isMiddle) {
            //     this._moveObject.anchorOffsetX = this._moveObject.width / 2;
            //     this._moveObject.anchorOffsetY = this._moveObject.height / 2;
            // }
            //this._moveObject.draw();
            this.currentRotation = this.moveObject.rotation;
        };
        MoreTouch.getTouchDistance = function () {
            var names = this.touchPoints["names"];
            var distance = 0;
            return distance = egret.Point.distance(this.touchPoints[names[names.length - 1]], this.touchPoints[names[names.length - 2]]);
        };
        MoreTouch.getTouchAngle = function () {
            var angle = 0;
            var names = this.touchPoints["names"];
            var p1 = this.touchPoints[names[names.length - 1]];
            var p2 = this.touchPoints[names[names.length - 2]];
            return angle = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI;
        };
        MoreTouch.touchPoints = { names: [] };
        MoreTouch.distance = 0;
        MoreTouch.angle = 0;
        MoreTouch.touchCount = 0;
        MoreTouch.currentRotation = 0;
        MoreTouch.currentDistance = 0;
        MoreTouch.moveObject = null;
        MoreTouch.isMiddle = true;
        MoreTouch.minScale = 0;
        MoreTouch.currentScale = 1;
        MoreTouch.maxScale = 0;
        MoreTouch.oldX = 0;
        MoreTouch.oldY = 0;
        MoreTouch.firstTouchId = 0;
        return MoreTouch;
    }());
    codeBase.MoreTouch = MoreTouch;
    __reflect(MoreTouch.prototype, "codeBase.MoreTouch");
})(codeBase || (codeBase = {}));
