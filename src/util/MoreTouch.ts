module codeBase {
    export class MoreTouch {
        private static touchPoints: Object = { names: [] };
        private static distance: number = 0;
        private static angle: number = 0;
        private static touchCount: number = 0;
        private static currentRotation: number = 0;
        private static currentDistance: number = 0;
        private static moveObject: egret.DisplayObject = null;
        private static isMiddle: boolean = true;
        private static minScale: number = 0;
        private static currentScale: number = 1;
        private static maxScale: number = 0;
        private static oldX: number = 0;
        private static oldY: number = 0;
        private static firstTouchId: number = 0;

        /**
         * @param object 
         * @param isControlGlobal 
         * @param minScale 
         * @param maxScale 
         * @param isMiddle 
         */
        public static start(object: egret.DisplayObject, isControlGlobal: boolean = true, minScale: number = 0, maxScale: number = 9999, isMiddle: boolean = true): void {
            if(this.moveObject && this.moveObject == object) return;
            this.moveObject = object;
            if (isControlGlobal) {
                var stage = egret.MainContext.instance.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            } else {
                this.moveObject.touchEnabled = true;
                this.moveObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                this.moveObject.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                this.moveObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (isMiddle) {
                TweenEffect.setAnchorXY(this.moveObject);
            }
            this.minScale = minScale;// * this._moveObject.width;
            this.maxScale = maxScale;// * this._moveObject.width;
            // console.log("_minScale:" + this._minScale);
            // console.log("_maxScale:" + this._maxScale);
        }

        private static mouseDown(e: egret.TouchEvent): void {
            if (this.touchPoints[e.touchPointID] == null) {
                this.touchPoints[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
                this.touchPoints["names"].push(e.touchPointID);
            }
            this.touchCount++;
            if (this.touchCount == 1) {
                var names = this.touchPoints["names"];
                let pos = this.moveObject.parent.globalToLocal(e.stageX, e.stageY);
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
        }

        private static mouseMove(e: egret.TouchEvent): void {
            //console.log(e.touchPointID);
            this.touchPoints[e.touchPointID].x = e.stageX;
            this.touchPoints[e.touchPointID].y = e.stageY;
            if (e.touchPointID == this.firstTouchId) {
                // this._moveObject.x = e.stageX - this._oldX;
                // this._moveObject.y = e.stageY - this._oldY;
                let pos = this.moveObject.parent.globalToLocal(e.stageX, e.stageY);
                this.moveObject.x = pos.x - this.oldX;
                this.moveObject.y = pos.y - this.oldY;
            }
            if (this.touchCount == 2) {
                var newDistance: number = this.getTouchDistance();
                // console.log("newDistance:" + newDistance);
                // var scale = newDistance / this._distance;
                // if (scale < this._minScale) scale = this._minScale;
                // if (scale > this._maxScale) scale = this._maxScale;

                var tempScale = Math.abs((newDistance / this.distance) - 1);
                tempScale *= 0.1;
                console.log("tempScale:" + tempScale);
                this.currentScale += newDistance > this.currentDistance?tempScale:-tempScale;
                var scale = this.currentScale;
                if (scale < this.minScale) scale = this.minScale;
                if (scale > this.maxScale) scale = this.maxScale;
                this.currentScale = scale;
                this.currentDistance = newDistance;
                console.log("scale:" + scale);
                this.moveObject.scaleX = scale;
                this.moveObject.scaleY = scale;

                var newAngle: number = this.getTouchAngle();
                this.moveObject.rotation = newAngle - this.angle + this.currentRotation;
            }
        }

        private static mouseUp(e: egret.TouchEvent): void {
            //console.log(e.touchPointID);
            delete this.touchPoints[e.touchPointID];
            var index: number = this.touchPoints["names"].indexOf(e.touchPointID);
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
        }

        private static getTouchDistance(): number {
            var names = this.touchPoints["names"];
            var distance: number = 0;
            return distance = egret.Point.distance(this.touchPoints[names[names.length - 1]], this.touchPoints[names[names.length - 2]]);
        }

        private static getTouchAngle(): number {
            var angle: number = 0;
            var names: Array<any> = this.touchPoints["names"];
            var p1: egret.Point = this.touchPoints[names[names.length - 1]];
            var p2: egret.Point = this.touchPoints[names[names.length - 2]];
            return angle = Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI;
        }

    }
}



