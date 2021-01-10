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
            if (this._moveObject && this._moveObject == object)
                return;
            this._moveObject = object;
            if (isControlGlobal) {
                var stage = egret.MainContext.instance.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            else {
                this._moveObject.touchEnabled = true;
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (isMiddle) {
                codeBase.TweenEffect.setAnchorXY(this._moveObject);
            }
            this._minScale = minScale; // * this._moveObject.width;
            this._maxScale = maxScale; // * this._moveObject.width;
            // console.log("_minScale:" + this._minScale);
            // console.log("_maxScale:" + this._maxScale);
        };
        /**
         * @param e
         */
        MoreTouch.mouseDown = function (e) {
            if (this._touchPoints[e.touchPointID] == null) {
                this._touchPoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
                this._touchPoints["names"].push(e.touchPointID);
            }
            this._touchCount++;
            if (this._touchCount == 1) {
                var names = this._touchPoints["names"];
                var pos = this._moveObject.parent.globalToLocal(e.stageX, e.stageY);
                this._oldX = pos.x - this._moveObject.x;
                this._oldY = pos.y - this._moveObject.y;
                this._firstTouchId = e.touchPointID;
                // console.log("_oldX:" + this._oldX);
                // console.log("_oldY:" + this._oldY);
            }
            if (this._touchCount == 2) {
                this._distance = this.getTouchDistance();
                this._angle = this.getTouchAngle();
                console.log("_distance:" + this._distance);
            }
            //console.log(e.touchPointID);
        };
        /**
         * e
         */
        MoreTouch.mouseMove = function (e) {
            //console.log(e.touchPointID);
            this._touchPoints[e.touchPointID].x = e.stageX;
            this._touchPoints[e.touchPointID].y = e.stageY;
            if (e.touchPointID == this._firstTouchId) {
                // this._moveObject.x = e.stageX - this._oldX;
                // this._moveObject.y = e.stageY - this._oldY;
                var pos = this._moveObject.parent.globalToLocal(e.stageX, e.stageY);
                this._moveObject.x = pos.x - this._oldX;
                this._moveObject.y = pos.y - this._oldY;
            }
            if (this._touchCount == 2) {
                var newDistance = this.getTouchDistance();
                // console.log("newDistance:" + newDistance);
                // var scale = newDistance / this._distance;
                // if (scale < this._minScale) scale = this._minScale;
                // if (scale > this._maxScale) scale = this._maxScale;
                var tempScale = Math.abs((newDistance / this._distance) - 1);
                tempScale *= 0.1;
                console.log("tempScale:" + tempScale);
                this.currentScale += newDistance > this._currentDistance ? tempScale : -tempScale;
                var scale = this.currentScale;
                if (scale < this._minScale)
                    scale = this._minScale;
                if (scale > this._maxScale)
                    scale = this._maxScale;
                this.currentScale = scale;
                this._currentDistance = newDistance;
                console.log("scale:" + scale);
                this._moveObject.scaleX = scale;
                this._moveObject.scaleY = scale;
                var newAngle = this.getTouchAngle();
                this._moveObject.rotation = newAngle - this._angle + this._currentRotation;
            }
        };
        /**
         * @param e
         */
        MoreTouch.mouseUp = function (e) {
            //console.log(e.touchPointID);
            delete this._touchPoints[e.touchPointID];
            var index = this._touchPoints["names"].indexOf(e.touchPointID);
            if (index >= 0) {
                this._touchPoints["names"].splice(index, 1);
            }
            this._touchCount--;
            this.currentScale = this._moveObject.scaleX;
            // this._moveObject.width *= this._moveObject.scaleX;
            // this._moveObject.height *= this._moveObject.scaleY;
            // this._moveObject.scaleX = 1;
            // this._moveObject.scaleY = 1;
            // if (this._isMiddle) {
            //     this._moveObject.anchorOffsetX = this._moveObject.width / 2;
            //     this._moveObject.anchorOffsetY = this._moveObject.height / 2;
            // }
            //this._moveObject.draw();
            this._currentRotation = this._moveObject.rotation;
        };
        /**
         */
        MoreTouch.getTouchDistance = function () {
            var names = this._touchPoints["names"];
            var distance = 0;
            return distance = egret.Point.distance(this._touchPoints[names[names.length - 1]], this._touchPoints[names[names.length - 2]]);
        };
        /**
         */
        MoreTouch.getTouchAngle = function () {
            var angle = 0;
            var names = this._touchPoints["names"];
            var p1 = this._touchPoints[names[names.length - 1]];
            var p2 = this._touchPoints[names[names.length - 2]];
            return angle = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI;
        };
        MoreTouch._touchPoints = { names: [] };
        MoreTouch._distance = 0;
        MoreTouch._angle = 0;
        MoreTouch._touchCount = 0;
        MoreTouch._currentRotation = 0;
        MoreTouch._currentDistance = 0;
        MoreTouch._moveObject = null;
        MoreTouch._isMiddle = true;
        MoreTouch._minScale = 0;
        MoreTouch.currentScale = 1;
        MoreTouch._maxScale = 0;
        MoreTouch._oldX = 0;
        MoreTouch._oldY = 0;
        MoreTouch._firstTouchId = 0;
        return MoreTouch;
    }());
    codeBase.MoreTouch = MoreTouch;
    __reflect(MoreTouch.prototype, "codeBase.MoreTouch");
})(codeBase || (codeBase = {}));
