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
    //课程类型
    var InteractionType;
    (function (InteractionType) {
        InteractionType[InteractionType["kids"] = 1] = "kids";
        InteractionType[InteractionType["pupil"] = 2] = "pupil";
    })(InteractionType || (InteractionType = {}));
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            var _this = _super.call(this) || this;
            //自定义属性
            _this.interactionType = InteractionType.pupil;
            _this.currentDragTarget = null;
            _this.currentDragTargetRenderIndex = 0;
            _this.currentDragTargetIndex = -1;
            _this.dragTargetLeavePos = new egret.Point();
            _this._distance = new egret.Point(0, 0); //鼠标点击时，鼠标全局坐标与目标的位置差
            //键盘输入数字
            //private inputText:string = "0";
            //交互状态,初始默认为0
            _this.gameStage = 0;
            _this.wrongCounter = 0;
            _this.counter = 0;
            return _this;
        }
        /**
         * 初始化一些必要的逻辑数据
         * 这个方法是在第一次加入stage的时候,做调用
         */
        MainScene.prototype.initData = function () {
            _super.prototype.initData.call(this);
            this.showScene();
        };
        MainScene.prototype.showScene = function () {
            var s = this;
            //背景
            s.bg = new codeBase.Image(); //SkinManager.createImage(s, 0, 0, s.modulePath + "/img/bg.jpg");
            s.bg.texture = RES.getRes("bg_png");
            s.bg.width = 1920;
            s.bg.height = 1080;
            s.addChild(s.bg);
            // s.bg.horizontalCenter = 0;
            // s.bg.verticalCenter = 0;
            codeBase.GameUtil.Instance.setScreenAuto(s.bg);
            // let group = new Group;
            // group.width = 1920;
            // group.height = 1080;
            // s.group_play.addChild(group);
            // group.horizontalCenter = 0;
            // group.verticalCenter = 0;
            // //GameUtil.Instance.setScreenAuto(group);
            // group.showBg = true;
            //交互区
            s.group_play = new codeBase.Group;
            s.addChild(s.group_play);
            s.group_play.width = 1920;
            s.group_play.height = 1080;
            s.group_play.horizontalCenter = 0;
            s.group_play.verticalCenter = 0;
            //s.group_play.showBg = true;
            // let proto = Object.getPrototypeOf(s.group_play);
            // console.log(proto === Group.prototype);
            // console.log(proto === Object.prototype);
            // console.log(proto.constructor === Group);
            // let group = new Group;
            // group.width = 300;
            // group.height = 200;
            // group.x = 600;
            // group.y = 600;
            // s.group_play.addChild(group);
            // group.showBg = true;
            // group.border = true;
            // let label:Label = new Label;
            // //label.setSize(800, 50);
            // label.text = "这是一个具有布局约束的文本";
            // s.group_play.addChild(label);
            // label.left = 50;
            // label.top = 500;
            // label.showBg = true;
            // console.log("label.width:" + label.width + "  label.height:" + label.height);
            // // label.autoSize = false;
            // // label.paddingLeft = 20;
            // // label.paddingRight = 20;
            // egret.setTimeout(()=>{
            // 	label.text = "一个具有布局约束的文本00000000000";
            // }, s, 100);
            // let hand = new Image;
            // hand.texture = RES.getRes("comRes_1_json.hand");
            // s.group_play.addChild(hand);
            // hand.left = 0;
            // hand.top = 300;
            // console.log("hand.width:" + hand.width + "  hand.height:" + hand.height);
            // let textInput = new TextInput;
            // textInput.width = 100;
            // textInput.height = 60;
            // s.group_play.addChild(textInput);
            // textInput.x = 1000;
            // textInput.y = 650;
            // textInput.showBg = true;
            // textInput.paddingLeft = 10;
            // textInput.paddingTop = 5;
            // textInput.paddingRight = 10;
            // textInput.paddingBottom = 5;
            // textInput.vAlign = egret.VerticalAlign.MIDDLE;
            // let textArea = new TextArea;
            // textArea.width = 300;
            // textArea.height = 300;
            // s.group_play.addChild(textArea);
            // textArea.x = 50;
            // textArea.y = 100;
            // textArea.showBg = true;
            // textArea.text = "1月1日"
            // // textArea.editable = true;
            // // textArea.paddingLeft = 10;
            // // textArea.paddingTop = 20;
            // // textArea.paddingRight = 10;
            // // textArea.paddingBottom = 20;
            // let button = new Button;
            // s.group_play.addChild(button);
            // button.setStatus([RES.getRes("A_png"), RES.getRes("A点击_png")]);
            // button.setClickFunction(()=>{
            // 	EffectUtil.playEffect(hand, 1);
            // }, s);
            // button.x = 0;
            // button.y = s.group_play.height - button.height;
            // console.log("button.width:" + button.width + "  button.height:" + button.height);
            // EffectUtil.breatheEffect(button);
            // let bitmap2 = UICreator.createBitmap("A点击_png");
            // s.group_play.addChild(bitmap2);
            // bitmap2.x = 500;
            // bitmap2.y = s.group_play.height - bitmap2.height;
            // EffectUtil.breatheEffect(bitmap2);
            // let buttonGroup = new BaseGroup;
            // let buttonSkins:any[] = [RES.getRes("A_png"), RES.getRes("A点击_png")];
            // for(let i=0; i<3; ++i) {
            // 	button = UICreator.createToggleButton(buttonSkins, "abc", (data:any)=>{
            // 		console.log(i);
            // 		console.log(data);
            // 	}, s);
            // 	buttonGroup.addChild(button);
            // 	button.x = 0;// + i * (button.width + 20);
            // 	button.y = 0 + i * (button.height + 20);
            // }
            // buttonGroup.width = button.width;
            // buttonGroup.height = button.y + button.height + 50;
            // let slider = new Image;
            // slider.texture = RES.getRes("slider_bar_v_png");
            // let scrollBar = new Scroller(buttonGroup.width, 500, buttonGroup, Style.VERTICAL, slider, true);
            // scrollBar.x = 1000;
            // scrollBar.y = 600;
            // s.group_play.addChild(scrollBar);
            // scrollBar.setMouseWheelEnable(true);
            // let listItemDataArr:any[] = [
            // 	{
            // 		res: "A_png"
            // 	},
            // 	{
            // 		res: "A点击_png"
            // 	},
            // 	{
            // 		res: "A_png"
            // 	},
            // 	{
            // 		res: "A点击_png"
            // 	},
            // 	{
            // 		res: "A_png"
            // 	},				
            // 	{
            // 		res: "A点击_png"
            // 	},				
            // 	{
            // 		res: "A_png"
            // 	},
            // 	{
            // 		res: "A点击_png"
            // 	},
            // 	{
            // 		res: "A_png"
            // 	},
            // 	{
            // 		res: "A点击_png"
            // 	},
            // 	{
            // 		res: "A_png"
            // 	},				
            // 	{
            // 		res: "A点击_png"
            // 	},
            // ];
            // let listGroup = new List;
            // s.group_play.addChild(listGroup);
            // listGroup.x = 1300;
            // listGroup.y = 0;
            // listGroup.width = 700;
            // listGroup.height = 600;
            // listGroup.itemRenderer = ListItemRenderer;
            // listGroup.gap = 100;
            // listGroup.line = 2;
            // listGroup.lineGap = 20;
            // //listGroup.layout = Style.HORIZONTAL;
            // listGroup.data = listItemDataArr;
            // listGroup.addEventListener(List.ITEM_SELECTED, (ev:egret.Event)=>{
            // 	console.log(ev.data);
            // }, s);
            // let listGroup2 = new ListGroup(322, 600, Style.VERTICAL, 20);
            // listGroup2.renderList(ListItemRenderer, listItemDataArr, true);
            // s.group_play.addChild(listGroup2);
            // listGroup2.x = 600;
            // listGroup2.y = 0;
            // listGroup2.scrollBar.sliderBarSkins(UICreator.createBitmap("slider_bar_v_png"), UICreator.createBitmap("slider_bar_h_png"));
            // let img = UICreator.createImage(s.group_play, 0, 0, RES.getRes("A点击_png"));
            // img.anchorOffsetX = 0.5;
            // img.anchorOffsetY = 0.5;
            // img.width = 300;
            // img.height = 200;
            // img.autoSize = false;
            // MoreTouch.start(img, true, 0.5, 5, true);
            // let btn:egret.Bitmap = UICreator.createBitmap("A_png");
            // s.group_play.addChild(btn);
            // btn.x = 0;
            // btn.y = 0;
            // let euiImage2: eui.Image = new eui.Image;
            // euiImage2.texture = RES.getRes("comRes_1_json.playSound");
            // s.group_play.addChild(euiImage2);
            // euiImage2.left = 350;
            // euiImage2.top = 600;
            // egret.setTimeout(() => {
            // 	let euiImage: eui.Image = new eui.Image;
            // 	euiImage.texture = RES.getRes("A_png");
            // 	s.group_play.addElement(euiImage);
            // 	euiImage.left = 0;
            // 	euiImage.top = 600;
            // }, s, 1000);
            // let hxmSkeleton: Skeleton = new Skeleton;
            // hxmSkeleton.setDataByName("xilili", "", "xilili", "xilili");
            // hxmSkeleton.show(s.group_play, 500, 600);
            // hxmSkeleton.gotoAndPlay("daiji", -1);
            // //hxmSkeleton.setTimeScale(2);
            // console.log(egret.getQualifiedClassName(s.group_play));
            // let spineAni = UICreator.createSpineAnimation("spineboy");
            // s.group_play.addChild(spineAni);
            // spineAni.x = s.group_play.width / 2 + 300;
            // spineAni.y = s.group_play.height - 100;
            // let track: spine.Track = spineAni.play("portal", -1);
            // // track.add("jump");
            // // track.add("roar");
            // // track.add("gun-grab");
            // // track.add("gun-holster");
            // track.waitPlayEnd().then((resolve) => {
            // 	console.log("Finished!");
            // });
            for (var i = 0; i < 1; ++i) {
                var text = codeBase.UICreator.createLabel(s.group_play, 200 + i * 60, 300, 30, i.toString());
                //let textContainer = new egret.Sprite;
                //textContainer.addChild(text);
                s.group_play.addChild(text);
                text.x = 200 + i * 100;
                text.y = 300;
                //text.size = 30;
                text.text = i.toString();
            }
            //标题
            // s.titleGroup = new BaseGroup;
            // s.titleGroup.touchEnabled = true;
            // s.titleGroup.touchChildren = true;
            // s.title = SkinManager.createImage(s.titleGroup, 0, 0, s.modulePath + "/img/title1.png");
            // s.playSound_btn = SkinManager.createImage(s.titleGroup, 0, 0, "playSound", s.modulePath + "/img/commonRes/comRes_1.png");
            // s.playSound_btn.y =(s.title.height - s.playSound_btn.height) / 2;
            // s.playSound_btn.touchEnabled = true;
            // s.playSound_btn['buttonModeForMouse'] = true;
            // s.addChild(s.titleGroup);
            // s.titleGroup.top = 10;
            // s.titleGroup.horizonalCenter = 0;
            //s.dispatchEvent(new egret.Event(egret.Event.RESIZE));
            //s.addEventListener(egret.Event.ENTER_FRAME, s.update, s);
            // if(isMobile() && s.interactionType == InteractionType.kids) {
            // 	let gameLayer:BaseGroup = SceneManager.Instance.gameLayer;
            // 	gameLayer.width = 1920;
            // 	gameLayer.height = 1080;
            // 	let scaleY = s.stage.stageHeight / 1080;
            // 	gameLayer.scaleY = scaleY;
            // 	gameLayer.scaleX = scaleY;
            // 	gameLayer.x = (s.stage.stageWidth - gameLayer.width * scaleY) / 2;
            // 	gameLayer.y = (s.stage.stageHeight - gameLayer.height * scaleY) / 2;
            // 	gameLayer.addChild(s.bg);
            // 	gameLayer.addChild(s.group_play);
            // }
        };
        MainScene.prototype.virtualKeyBoardCall = function (str) {
            //console.log(str);
            var s = this;
            if (str == "up") {
                s.keyUp(38);
            }
            else if (str == "down") {
                s.keyUp(40);
            }
        };
        MainScene.prototype.virtualKeyBoardBeginCall = function (str) {
            //console.log(str);
            var s = this;
            if (str == "up") {
                s.keyDown(38);
            }
            else if (str == "down") {
                s.keyDown(40);
            }
        };
        MainScene.prototype.tweeObjectAlpha = function (obj, from, to, duration, callFun, _obj) {
            if (callFun === void 0) { callFun = null; }
            if (_obj === void 0) { _obj = null; }
            obj.scaleX = 1;
            obj.scaleY = 1;
            obj.alpha = from;
            if (callFun && _obj) {
                egret.Tween.get(obj).to({ alpha: to }, duration).call(callFun.bind(_obj), this);
            }
            else {
                egret.Tween.get(obj).to({ alpha: to }, duration);
            }
        };
        MainScene.prototype.gameStart = function () {
        };
        MainScene.prototype.restart = function () {
            //this.gameStage = 0;
        };
        MainScene.prototype.selectOptions = function (e) {
            // if (this.gameStage != 0) {
            // 	return;
            // }
            // this.gameStage = 1;
        };
        MainScene.prototype.hide = function () {
            _super.prototype.hide.call(this);
            var s = this;
            if (s.isClear)
                return;
            s.isClear = true;
            s.removeEventListener(egret.Event.ENTER_FRAME, s.update, s);
            if (codeBase.isMobile()) {
                //ui1Lib.VirtualKeyboard.getInstance().hide();
            }
            else {
                document.removeEventListener("keydown", s.onkeydown);
                document.removeEventListener("keyup", s.onkeyup);
            }
        };
        MainScene.prototype.gameFinished = function () {
            var s = this;
            if (s.gameStage > 0) {
                return;
            }
            s.gameStage = 1;
            s.hide();
            s.removeEventListener(egret.Event.ENTER_FRAME, s.update, s);
            egret.setTimeout(function () {
                //SceneManager.Instance.showScene(new SecondScene);
            }, this, 2500);
        };
        MainScene.prototype.update = function () {
            var s = this;
        };
        MainScene.prototype.onkeydown = function (event) {
            //console.log(event.keyCode);
            var s = this;
            s.keyDown(event.keyCode);
        };
        MainScene.prototype.keyDown = function (keyCode) {
            var s = this;
            if (keyCode == 38) {
                //up Arrow
            }
            else if (keyCode == 40) {
                //down Arrow
            }
        };
        MainScene.prototype.keyUp = function (keyCode) {
            var s = this;
            if (keyCode == 38) {
                //up Arrow
            }
            else if (keyCode == 40) {
                //down Arrow
            }
        };
        MainScene.prototype.onkeyup = function (event) {
            //console.log(event.keyCode);
            var s = this;
            s.keyUp(event.keyCode);
        };
        MainScene.prototype.mouseMoveOver = function (e) {
        };
        MainScene.prototype.mouseMoveOut = function (e) {
        };
        MainScene.prototype.comfirmButtonCall = function () {
            // if(this.gameStage != 0) {
            // 	return;
            // }
            // this.gameStage = 3;
        };
        MainScene.prototype.notifyVideoClose = function () {
            this.restart();
        };
        MainScene.prototype.onMove = function (evt) {
            // if (this.gameStage == -1) {
            // 	return;
            // }
            //console.log(evt.x + "===" + evt.y);
            // let pos = this.group_play.globalToLocal(evt.x, evt.y);
            // this.pen.x = pos.x;
            // this.pen.y = pos.y;
            //var temp = this.getPoint(this.canvas, evt.x, evt.y);
            //this.pen.x = temp.x;
            //this.pen.y = temp.y;/
            // if(btn.hitTestPoint(temp.x,temp.y)) {//这里使用egret显示对象自带的碰撞检测,btn是egret的显示对象
            //     this.canvas.style.cursor = "pointer";//手型鼠标
            // }
        };
        MainScene.prototype.sceneTouchMoveCall = function (evt) {
            var s = this;
            if (s.currentDragTarget != null) {
                var pos = s.group_play.globalToLocal(evt.stageX, evt.stageY);
                s.currentDragTarget.x = pos.x - s._distance.x;
                s.currentDragTarget.y = pos.y - s._distance.y;
                //console.log("moving now ! currentTarget: [X:" + evt.currentTarget.x + ",Y:" + evt.currentTarget.y + "]");
            }
        };
        MainScene.prototype.dragTargetBeginCall = function (e) {
            // if (this.gameStage != 0) {
            // 	return;
            // }
            // this.gameStage = 1;
            var s = this;
            var target = e.target;
            s.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, s.sceneTouchMoveCall, s);
            s.stage.addEventListener(egret.TouchEvent.TOUCH_END, s.dragTargetEndCall, s);
            //foodTarget.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragFoodCallMove, this);
            //foodTarget.addEventListener(egret.TouchEvent.TOUCH_END, this.dragFoodCallEnd, this);
            s.currentDragTarget = target;
            // s.currentDragTargetRenderIndex = this.group_play.getChildIndex(target);
            // s.group_play.setChildIndex(this.currentDragTarget, 100);
            //目标被拖动离开时的位置
            s.dragTargetLeavePos.x = s.currentDragTarget.x;
            s.dragTargetLeavePos.y = s.currentDragTarget.y;
            s._distance.x = e.localX;
            s._distance.y = e.localY;
        };
        MainScene.prototype.dragTargetEndCall = function (e) {
            var s = this;
            s.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, s.sceneTouchMoveCall, s);
            s.stage.removeEventListener(egret.TouchEvent.TOUCH_END, s.dragTargetEndCall, s);
            // this.currentDragTarget.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragTargetBeginCall, this);
            //let dragTarget: Image = this.currentDragTarget;
            //dragTarget.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragFoodCallMove, this);
            //dragTarget.removeEventListener(egret.TouchEvent.TOUCH_END, this.dragTargetEndCall, this);
            //恢复原来的渲染层级
            // this.group_play.setChildIndex(this.currentDragTarget, this.currentDragTargetRenderIndex);
            // if(this.dropFrame.hitTestPoint(e.stageX, e.stageY)) {
            // } else {
            // 	//SoundManager.Instance.PlayEffect(2);
            // 	//目标返回原来的位置
            // 	egret.Tween.get(this.currentDragTarget).to({ x: this.dragTargetLeavePos.x, y: this.dragTargetLeavePos.y }, 200).call(()=>{
            // 		this.gameStage = 0;
            // 	}, this);
            // }
        };
        return MainScene;
    }(codeBase.BaseScene));
    codeBase.MainScene = MainScene;
    __reflect(MainScene.prototype, "codeBase.MainScene");
})(codeBase || (codeBase = {}));
