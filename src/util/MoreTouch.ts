module codeBase {
    export class MoreTouch {
        private static _touchPoints: Object = { names: [] };
        private static _distance: number = 0;
        private static _angle: number = 0;
        private static _touchCount: number = 0;
        private static _currentRotation: number = 0;
        private static _currentDistance: number = 0;
        private static _moveObject: BaseGroup = null;
        private static _isMiddle: boolean = true;
        private static _minScale: number = 0;
        private static currentScale: number = 1;
        private static _maxScale: number = 0;
        private static _oldX: number = 0;
        private static _oldY: number = 0;
        private static _firstTouchId: number = 0;

        /**
         * @param object 
         * @param isControlGlobal 
         * @param minScale 
         * @param maxScale 
         * @param isMiddle 
         */
        public static start(object: BaseGroup, isControlGlobal: boolean = true, minScale: number = 0, maxScale: number = 9999, isMiddle: boolean = true): void {
            if(this._moveObject && this._moveObject == object) return;
            this._moveObject = object;
            if (isControlGlobal) {
                var stage = egret.MainContext.instance.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            } else {
                this._moveObject.touchEnabled = true;
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (isMiddle) {
                TweenEffect.setAnchorXY(this._moveObject);
            }
            this._minScale = minScale;// * this._moveObject.width;
            this._maxScale = maxScale;// * this._moveObject.width;
            // console.log("_minScale:" + this._minScale);
            // console.log("_maxScale:" + this._maxScale);
        }

        /**
         * @param e
         */
        private static mouseDown(e: egret.TouchEvent): void {
            if (this._touchPoints[e.touchPointID] == null) {
                this._touchPoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
                this._touchPoints["names"].push(e.touchPointID);
            }
            this._touchCount++;
            if (this._touchCount == 1) {
                var names = this._touchPoints["names"];
                let pos = this._moveObject.parent.globalToLocal(e.stageX, e.stageY);
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
        }

        /**
         * e
         */
        private static mouseMove(e: egret.TouchEvent): void {
            //console.log(e.touchPointID);
            this._touchPoints[e.touchPointID].x = e.stageX;
            this._touchPoints[e.touchPointID].y = e.stageY;
            if (e.touchPointID == this._firstTouchId) {
                // this._moveObject.x = e.stageX - this._oldX;
                // this._moveObject.y = e.stageY - this._oldY;
                let pos = this._moveObject.parent.globalToLocal(e.stageX, e.stageY);
                this._moveObject.x = pos.x - this._oldX;
                this._moveObject.y = pos.y - this._oldY;
            }
            if (this._touchCount == 2) {
                var newDistance: number = this.getTouchDistance();
                // console.log("newDistance:" + newDistance);
                // var scale = newDistance / this._distance;
                // if (scale < this._minScale) scale = this._minScale;
                // if (scale > this._maxScale) scale = this._maxScale;

                var tempScale = Math.abs((newDistance / this._distance) - 1);
                tempScale *= 0.1;
                console.log("tempScale:" + tempScale);
                this.currentScale += newDistance > this._currentDistance?tempScale:-tempScale;
                var scale = this.currentScale;
                if (scale < this._minScale) scale = this._minScale;
                if (scale > this._maxScale) scale = this._maxScale;
                this.currentScale = scale;
                this._currentDistance = newDistance;
                console.log("scale:" + scale);
                this._moveObject.scaleX = scale;
                this._moveObject.scaleY = scale;

                var newAngle: number = this.getTouchAngle();
                this._moveObject.rotation = newAngle - this._angle + this._currentRotation;
            }
        }

        /**
         * @param e
         */
        private static mouseUp(e: egret.TouchEvent): void {
            //console.log(e.touchPointID);
            delete this._touchPoints[e.touchPointID];
            var index: number = this._touchPoints["names"].indexOf(e.touchPointID);
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
        }

        /**
         */
        private static getTouchDistance(): number {
            var names = this._touchPoints["names"];
            var distance: number = 0;
            return distance = egret.Point.distance(this._touchPoints[names[names.length - 1]], this._touchPoints[names[names.length - 2]]);
        }

        /**
         */
        private static getTouchAngle(): number {
            var angle: number = 0;
            var names: Array<any> = this._touchPoints["names"];
            var p1: egret.Point = this._touchPoints[names[names.length - 1]];
            var p2: egret.Point = this._touchPoints[names[names.length - 2]];
            return angle = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI;
        }

    }
}



