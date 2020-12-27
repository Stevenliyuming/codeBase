module codeBase{
    class MoreTouch {
        private static _touchPoints:Object = {names:[]};
        private static _distance:number = 0;//����
        private static _angle:number = 0;//�Ƕ�
        private static _touchCount:number = 0;//��������
        private static _currentRotation:number = 0;//��ǰ�Ƕ�
        private static _moveObject:codeBase.BaseGroup = null;//Ҫ�仯�Ķ���
        private static _isMiddle:boolean = true;//�Ƿ��������ĵ��ı�
        private static _minScale:number = 0;//��С�Ŵ�ϵ��
        private static _maxScale:number = 0;//�����Ŵ�ϵ��
        private static _oldX:number = 0;//��ʼx����
        private static _oldY:number = 0;//��ʼy����
        private static _firstTouchId:number = 0;//��һ�ε�����id
        /**
         * ��������ʶ��
         * @param object Ҫ��ת�����ƶ��Ķ���
         * @param isControlGlobal �Ƿ���������̨�Ͽ��ƶ���
         * @param minScale ������С�Ŵ�ϵ��
         * @param maxScale ���������Ŵ�ϵ��
         * @param isMiddle �Ƿ��������ĵ��Ŵ�
         */
        public static start(object:codeBase.BaseGroup,isControlGlobal:boolean = true,minScale:number = 0,maxScale:number = 9999,isMiddle:boolean = true):void{
            if(isControlGlobal){
                var stage =  egret.MainContext.instance.stage;
                stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }else{
                this._moveObject.touchEnabled = true;
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                this._moveObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            this._moveObject = object;
            if(isMiddle){
                codeBase.TweenEffect.setAnchorXY(this._moveObject);
            }
            this._minScale = minScale * this._moveObject.width;
            this._maxScale = maxScale * this._moveObject.width;
            if(this._moveObject instanceof codeBase.Image){//��������ͼƬ���ͣ������Զ�����
                this._moveObject["autoSize"] = true;
            }
        }
        /**
         * ��ʼ����
         * @param e
         */
        private static mouseDown(e:egret.TouchEvent):void{
            if(this._touchPoints[e.touchPointID] == null){
                this._touchPoints[e.touchPointID] = new egret.Point(e.stageX,e.stageY);
                this._touchPoints["names"].push(e.touchPointID);
            }
            this._touchCount ++;
            if(this._touchCount == 1){
                var names = this._touchPoints["names"];
                this._oldX = this._touchPoints[names[0]].x - this._moveObject.x;
                this._oldY = this._touchPoints[names[0]].y - this._moveObject.y;
                this._firstTouchId = e.touchPointID;
            }
            if(this._touchCount == 2){
                this._distance = this.getTouchDistance();
                this._angle = this.getTouchAngle();
            }
        }
        /**
         * �����ƶ�
         */
        private static mouseMove(e:egret.TouchEvent):void{
            this._touchPoints[e.touchPointID].x = e.stageX;
            this._touchPoints[e.touchPointID].y = e.stageY;
            if(e.touchPointID == this._firstTouchId){
                this._moveObject.x = e.stageX - this._oldX;
                this._moveObject.y = e.stageY - this._oldY;
            }
            if(this._touchCount == 2){
                var newDistance:number = this.getTouchDistance();
                var scale = newDistance / this._distance;
                if(scale * this._moveObject.width < this._minScale)scale = this._minScale / this._moveObject.width;
                if(scale * this._moveObject.width > this._maxScale)scale = this._maxScale / this._moveObject.width;
                this._moveObject.scaleX = scale;
                this._moveObject.scaleY = scale;

                var newAngle:number = this.getTouchAngle();
                this._moveObject.rotation = newAngle - this._angle + this._currentRotation;
            }
        }
        /**
         * ��������
         * @param e
         */
        private static mouseUp(e:egret.TouchEvent):void{
            delete this._touchPoints[e.touchPointID];
            var index:number = this._touchPoints["names"].indexOf(e.touchPointID);
            if(index != - 1){
                this._touchPoints["names"].splice(index,1);
            }
            this._touchCount --;
            this._moveObject.width *= this._moveObject.scaleX;
            this._moveObject.height *= this._moveObject.scaleY;
            this._moveObject.scaleX = 1;
            this._moveObject.scaleY = 1;
            if(this._isMiddle){
                this._moveObject.anchorOffsetX = this._moveObject.width / 2;
                this._moveObject.anchorOffsetY = this._moveObject.height / 2;
            }
            this._moveObject.draw();
            this._currentRotation = this._moveObject.rotation;
        }
        /**
         * ��ȡ������ָ�ľ���
         */
        private static getTouchDistance():number{
            var names = this._touchPoints["names"];
            var distance:number = 0;
            return distance = egret.Point.distance(this._touchPoints[names[names.length - 1]],this._touchPoints[names[names.length - 2]]);
        }
        /**
         * ����������ָ���ĽǶ�
         */
        private static getTouchAngle():number{
            var angle:number = 0;
            var names:Array<any> = this._touchPoints["names"];
            var p1:egret.Point = this._touchPoints[names[names.length - 1]];//��һ����ָ����λ��
            var p2:egret.Point = this._touchPoints[names[names.length - 2]];//�ڶ�����ָ����λ��
            return angle = Math.atan2(p1.y - p2.y,p1.x - p2.x) * 180 / Math.PI;
        }

    }
}



