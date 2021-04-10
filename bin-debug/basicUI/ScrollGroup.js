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
    /**
     * 卷轴容器
     */
    var ScrollGroup = (function (_super) {
        __extends(ScrollGroup, _super);
        function ScrollGroup() {
            var _this = _super.call(this) || this;
            _this._moveFunc = null;
            _this._moveFuncThis = null;
            _this._scrollItemArr = [];
            /**
             * 是否将子代剪切到视区的边界,
             * 默认为true,剪切.
             */
            _this._clip = true;
            /**
             * 运行状态
             * @type {boolean}
             * @private
             */
            _this._running = false;
            //自动播放
            _this._autoplay = false;
            return _this;
        }
        /**
         * 加入到显示列表时调用
         * 子类可覆写该方法,添加UI逻辑
         */
        ScrollGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 设置卷轴数据
         * @param textures
         * @param speed
         */
        ScrollGroup.prototype.setScrollData = function (textures, speed, direction, gap) {
            if (speed === void 0) { speed = 3; }
            if (direction === void 0) { direction = ScrollGroup.SCROLL_DOWN; }
            if (gap === void 0) { gap = 0; }
            var item = codeBase.ObjectPool.getByClass(ScrollItemGroup);
            this.addChild(item);
            this._scrollItemArr.push(item);
            item.width = this.width;
            item.height = this.height;
            item.setScrollData(textures, speed, direction, gap);
            this.invalidate();
        };
        /**
         * 删除滚动数据
         * @param index
         */
        ScrollGroup.prototype.delScrollData = function (index) {
            if (index === void 0) { index = -1; }
            var item = null;
            if (index <= -1) {
                while (this._scrollItemArr.length > 0) {
                    item = this._scrollItemArr.pop();
                    if (item)
                        item.removeFromParent();
                }
            }
            else if (index < this._scrollItemArr.length) {
                item = this._scrollItemArr[index];
                if (item) {
                    item.removeFromParent();
                    this._scrollItemArr.splice(index, 1);
                }
            }
        };
        /**
         * 开始卷轴
         */
        ScrollGroup.prototype.play = function (index) {
            if (index === void 0) { index = -1; }
            this._running = true;
            this.setItemState(ScrollGroup.STATE_START, index);
            //初始数据
            codeBase.HeartBeat.addListener(this, this.onHeartBeat);
        };
        /**
         * 停止卷轴
         */
        ScrollGroup.prototype.stop = function (index) {
            if (index === void 0) { index = -1; }
            this.setItemState(ScrollGroup.STATE_STOP, index);
            if (!this._running)
                codeBase.HeartBeat.removeListener(this, this.onHeartBeat);
        };
        /**
         * 暂停卷轴
         */
        ScrollGroup.prototype.pause = function (index) {
            if (index === void 0) { index = -1; }
            this.setItemState(ScrollGroup.STATE_STOP, index);
            if (!this._running)
                codeBase.HeartBeat.removeListener(this, this.onHeartBeat);
        };
        /**
         * 重新卷轴卷轴
         */
        ScrollGroup.prototype.restart = function (index) {
            if (index === void 0) { index = -1; }
            this.setItemState(ScrollGroup.STATE_START, index);
            codeBase.HeartBeat.addListener(this, this.onHeartBeat);
        };
        /**
         * 设置速度
         */
        ScrollGroup.prototype.setSpeed = function (speed, index) {
            if (index === void 0) { index = -1; }
            if (index <= -1) {
                for (var i = 0; i < this._scrollItemArr.length; i++) {
                    this._scrollItemArr[i].speed = speed;
                }
            }
            else {
                if (index >= 0 && index <= this._scrollItemArr.length - 1) {
                    this._scrollItemArr[index].speed = speed;
                }
            }
        };
        /**
         * 设置方向
         */
        ScrollGroup.prototype.setDirection = function (direction, index) {
            if (index === void 0) { index = -1; }
            if (index <= -1) {
                for (var i = 0; i < this._scrollItemArr.length; i++) {
                    this._scrollItemArr[i].direction = direction;
                }
            }
            else {
                if (index >= 0 && index <= this._scrollItemArr.length - 1) {
                    this._scrollItemArr[index].direction = direction;
                }
            }
        };
        /**
         * 设置滚动item的state
         * @param state
         */
        ScrollGroup.prototype.setItemState = function (state, index) {
            if (index === void 0) { index = -1; }
            if (index <= -1) {
                for (var i = 0; i < this._scrollItemArr.length; i++) {
                    this._scrollItemArr[i]._state = state;
                }
            }
            else if (index >= 0 && index <= this._scrollItemArr.length - 1) {
                this._scrollItemArr[index]._state = state;
            }
            if (state == ScrollGroup.STATE_START) {
                this._running = true;
            }
            else {
                this._running = false;
                for (var i = 0; i < this._scrollItemArr.length; i++) {
                    if (this._scrollItemArr[i]._state == ScrollGroup.STATE_START) {
                        this._running = true;
                        break;
                    }
                }
            }
        };
        /**
         * 呼吸计数
         */
        ScrollGroup.prototype.onHeartBeat = function () {
            for (var i = 0; i < this._scrollItemArr.length; i++) {
                this._scrollItemArr[i].onHeartBeat();
            }
            if (this._moveFunc) {
                this._moveFunc.call(this._moveFuncThis);
            }
        };
        /**
         * 重绘
         */
        ScrollGroup.prototype.draw = function () {
            if (this.width == 0 || this.height == 0)
                return;
            if (this._clip) {
                if (this.scrollRect == null) {
                    this.scrollRect = new codeBase.Rectangle(0, 0, this.width, this.height);
                }
                else {
                    this.scrollRect.width = this.width;
                    this.scrollRect.height = this.height;
                }
            }
            else {
                this.scrollRect = null;
            }
            if (this.width != codeBase.Style.BASEGROUP_WIDTH || this.height != codeBase.Style.BASEGROUP_HEIGHT) {
                for (var i = 0; i < this._scrollItemArr.length; i++) {
                    if (this._scrollItemArr[i].width == codeBase.Style.BASEGROUP_WIDTH || this._scrollItemArr[i].width == 0) {
                        this._scrollItemArr[i].width = this.width;
                    }
                    if (this._scrollItemArr[i].height == codeBase.Style.BASEGROUP_HEIGHT || this._scrollItemArr[i].height == 0) {
                        this._scrollItemArr[i].height = this.height;
                    }
                    this._scrollItemArr[i]._initData = false;
                }
            }
        };
        Object.defineProperty(ScrollGroup.prototype, "clip", {
            get: function () {
                return this._clip;
            },
            /**
             * 设置剪裁
             * @param value
             */
            set: function (value) {
                if (value != this._clip) {
                    this._clip = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 移动回call的方法
         * @param value
         */
        ScrollGroup.prototype.setMoveCallbackFunc = function (func, thisObj) {
            this._moveFunc = func;
            this._moveFuncThis = thisObj;
        };
        Object.defineProperty(ScrollGroup.prototype, "autoplay", {
            get: function () {
                return this._autoplay;
            },
            /**
             * 自动播放
             * @param value
             */
            set: function (value) {
                if (this._autoplay != value) {
                    this._autoplay = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        ScrollGroup.SCROLL_UP = "up";
        ScrollGroup.SCROLL_DOWN = "down";
        ScrollGroup.SCROLL_LEFT = "left";
        ScrollGroup.SCROLL_RIGHT = "right";
        ScrollGroup.STATE_START = "start";
        ScrollGroup.STATE_STOP = "stop";
        return ScrollGroup;
    }(codeBase.BasicGroup));
    codeBase.ScrollGroup = ScrollGroup;
    __reflect(ScrollGroup.prototype, "codeBase.ScrollGroup");
    /**
     * 滚动项类
     */
    var ScrollItemGroup = (function (_super) {
        __extends(ScrollItemGroup, _super);
        function ScrollItemGroup() {
            var _this = _super.call(this) || this;
            _this.speed = 0; //帧速度
            _this.gap = 0; //间隔
            _this.direction = ScrollGroup.SCROLL_DOWN; //卷轴的方向
            _this._textures = null; //卷轴的背景材料
            _this._scrollTextureIndex = 0; ///卷轴的下标
            _this._scrollBitmapArr = null; //卷轴图像
            _this._state = ScrollGroup.STATE_STOP;
            _this._initData = false; //初始化数据
            _this._textureWidth = 0; //材质的宽度
            _this._textureHeight = 0; //材质的高度
            _this._totalBitmapLength = 0;
            _this._limitDistance = 0; //最大宽度或高度
            /**
             * 是否将子代剪切到视区的边界,
             * 默认为true,剪切.
             */
            _this._clip = true;
            /**
             * 设置卷轴数据
             * @param textures
             * @param speed
             */
            _this._textureIndex = 0;
            return _this;
        }
        /**
         * 初始化主场景的组件
         * 这个方法在对象new的时候就调用,因为有些ui必须在加入stage之前就准备好
         * 子类覆写该方法,添加UI逻辑
         */
        ScrollItemGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        ScrollItemGroup.prototype.setScrollData = function (textures, speed, direction, gap) {
            if (speed === void 0) { speed = 3; }
            if (gap === void 0) { gap = 0; }
            this._initData = false;
            this.gap = gap;
            this.direction = direction;
            this._textureIndex = 0;
            this._textures = textures;
            this._textureWidth = this._textures[0].textureWidth;
            this._textureHeight = this._textures[0].textureHeight;
            this.speed = speed;
            var textureLength = this._textures.length;
            if (this._scrollBitmapArr && this._scrollBitmapArr.length > 0) {
                var image = null;
                while (this._scrollBitmapArr.length > 0) {
                    image = this._scrollBitmapArr.pop();
                    if (image.parent)
                        image.parent.removeChild(image);
                    codeBase.ObjectPool.recycleClass(image, "scroll_group");
                }
            }
            this._scrollBitmapArr = [];
            this._totalBitmapLength = 0;
            this._limitDistance = 0;
            if (this.direction == ScrollGroup.SCROLL_DOWN || this.direction == ScrollGroup.SCROLL_UP) {
                while (this._limitDistance < this.height) {
                    if (this._textureIndex >= this._textures.length) {
                        this._textureIndex = 0;
                    }
                    this._limitDistance += this._textures[this._textureIndex].textureHeight + this.gap;
                    this._textureIndex++;
                    this._totalBitmapLength++;
                }
            }
            else if (this.direction == ScrollGroup.SCROLL_LEFT || this.direction == ScrollGroup.SCROLL_RIGHT) {
                while (this._limitDistance < this.width) {
                    if (this._textureIndex >= this._textures.length) {
                        this._textureIndex = 0;
                    }
                    this._limitDistance += this._textures[this._textureIndex].textureWidth + this.gap;
                    this._textureIndex++;
                    this._totalBitmapLength++;
                }
            }
            //console.log("totalNum = " + this._totalBitmapLength);
            for (var i = 0; i < this._totalBitmapLength; i++) {
                var bitmap = codeBase.ObjectPool.getByClass(codeBase.Image, "scroll_group");
                this._scrollBitmapArr.push(bitmap);
            }
            for (var j = 0; j < this._scrollBitmapArr.length; j++) {
                this.addChild(this._scrollBitmapArr[j]);
                this.getTexture(this._scrollBitmapArr[j]);
                if (this._scrollBitmapArr[j]) {
                    this._scrollBitmapArr[j].width = this._scrollBitmapArr[j].texture.textureWidth;
                    this._scrollBitmapArr[j].height = this._scrollBitmapArr[j].texture.textureHeight;
                }
            }
            this.initScrollBitmapData();
        };
        /**
         * 初始化初始卷轴数据
         */
        ScrollItemGroup.prototype.initScrollBitmapData = function () {
            if (this._initData)
                return;
            this._initData = true;
            if (this.direction == ScrollGroup.SCROLL_UP) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].x = 0;
                    if (i == 0) {
                        this._scrollBitmapArr[0].y = 0;
                    }
                    else if (i > 0) {
                        this._scrollBitmapArr[i].y = this._scrollBitmapArr[i - 1].y + this._scrollBitmapArr[i - 1].texture.textureHeight + this.gap;
                    }
                }
            }
            else if (this.direction == ScrollGroup.SCROLL_DOWN) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].x = 0;
                    if (i == 0) {
                        this._scrollBitmapArr[0].y = this.height - this._scrollBitmapArr[0].texture.textureHeight;
                    }
                    else if (i > 0) {
                        this._scrollBitmapArr[i].y = this._scrollBitmapArr[i - 1].y - this._scrollBitmapArr[i].texture.textureHeight - this.gap;
                    }
                }
            }
            else if (this.direction == ScrollGroup.SCROLL_LEFT) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].y = 0;
                    if (i == 0) {
                        this._scrollBitmapArr[0].x = 0;
                    }
                    else if (i > 0) {
                        this._scrollBitmapArr[i].x = this._scrollBitmapArr[i - 1].x + this._scrollBitmapArr[i - 1].texture.textureWidth + this.gap;
                    }
                }
            }
            else if (this.direction == ScrollGroup.SCROLL_RIGHT) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].y = 0;
                    if (i == 0) {
                        this._scrollBitmapArr[0].x = this.width - this._scrollBitmapArr[0].texture.textureWidth;
                    }
                    else if (i > 0) {
                        this._scrollBitmapArr[i].x = this._scrollBitmapArr[i - 1].x - this._scrollBitmapArr[i].texture.textureWidth - this.gap;
                    }
                }
            }
        };
        /**
         * 获取当前卷轴材质
         * @returns {Texture}
         */
        ScrollItemGroup.prototype.getTexture = function (img) {
            var texture = this._textures[this._scrollTextureIndex];
            this._scrollTextureIndex++;
            if (this._scrollTextureIndex >= this._textures.length) {
                this._scrollTextureIndex = 0;
            }
            img.scaleX = 1;
            img.scaleY = 1;
            img.alpha = 1;
            img.rotation = 0;
            img.texture = texture;
            img.width = texture.textureWidth;
            img.height = texture.textureHeight;
            return texture;
        };
        /**
         * 呼吸计数
         */
        ScrollItemGroup.prototype.onHeartBeat = function () {
            if (this._state == ScrollGroup.STATE_STOP)
                return;
            if (!this._initData)
                this.initScrollBitmapData();
            if (this.direction == ScrollGroup.SCROLL_UP) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].y -= this.speed;
                }
                //补充显示项
                if (this._scrollBitmapArr[this._scrollBitmapArr.length - 1].y <= (this.height - this._scrollBitmapArr[this._scrollBitmapArr.length - 1].texture.textureHeight - this.speed)) {
                    var image = codeBase.ObjectPool.getByClass(codeBase.Image, "scroll_group");
                    this.addChild(image);
                    this.getTexture(image);
                    image.x = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].x;
                    image.y = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].y + this._scrollBitmapArr[this._scrollBitmapArr.length - 1].texture.textureHeight + this.gap;
                    this._scrollBitmapArr.push(image);
                }
                if (this._scrollBitmapArr[0].y + this._scrollBitmapArr[0].texture.textureHeight <= 0) {
                    var image = this._scrollBitmapArr.splice(0, 1)[0];
                    if (image.parent)
                        image.parent.removeChild(image);
                    codeBase.ObjectPool.recycleClass(image, "scroll_group");
                }
            }
            else if (this.direction == ScrollGroup.SCROLL_DOWN) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].y += this.speed;
                }
                if (this._scrollBitmapArr[this._scrollBitmapArr.length - 1].y >= -this.speed) {
                    var image = codeBase.ObjectPool.getByClass(codeBase.Image, "scroll_group");
                    this.addChild(image);
                    this.getTexture(image);
                    image.x = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].x;
                    image.y = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].y - image.texture.textureHeight - this.gap;
                    this._scrollBitmapArr.push(image);
                }
                if (this._scrollBitmapArr[0].y >= this.height) {
                    var image = this._scrollBitmapArr.splice(0, 1)[0];
                    if (image.parent)
                        image.parent.removeChild(image);
                    codeBase.ObjectPool.recycleClass(image, "scroll_group");
                }
            }
            else if (this.direction == ScrollGroup.SCROLL_LEFT) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].x -= this.speed;
                }
                if (this._scrollBitmapArr[this._scrollBitmapArr.length - 1].x <= (this.width - this._scrollBitmapArr[this._scrollBitmapArr.length - 1].texture.textureWidth - this.speed)) {
                    var image = codeBase.ObjectPool.getByClass(codeBase.Image, "scroll_group");
                    this.addChild(image);
                    this.getTexture(image);
                    image.y = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].y;
                    image.x = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].x + this._scrollBitmapArr[this._scrollBitmapArr.length - 1].texture.textureWidth + this.gap;
                    this._scrollBitmapArr.push(image);
                }
                if (this._scrollBitmapArr[0].x + this._scrollBitmapArr[0].texture.textureWidth <= 0) {
                    var image = this._scrollBitmapArr.splice(0, 1)[0];
                    if (image.parent)
                        image.parent.removeChild(image);
                    codeBase.ObjectPool.recycleClass(image, "scroll_group");
                }
            }
            else if (this.direction == ScrollGroup.SCROLL_RIGHT) {
                for (var i = 0; i < this._scrollBitmapArr.length; i++) {
                    this._scrollBitmapArr[i].x += this.speed;
                }
                if (this._scrollBitmapArr[this._scrollBitmapArr.length - 1].x >= -this.speed) {
                    var image = codeBase.ObjectPool.getByClass(codeBase.Image, "scroll_group");
                    this.addChild(image);
                    this.getTexture(image);
                    image.y = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].y;
                    image.x = this._scrollBitmapArr[this._scrollBitmapArr.length - 1].x - image.texture.textureWidth - this.gap;
                    this._scrollBitmapArr.push(image);
                }
                if (this._scrollBitmapArr[0].x >= this.width) {
                    var image = this._scrollBitmapArr.splice(0, 1)[0];
                    if (image.parent)
                        image.parent.removeChild(image);
                    codeBase.ObjectPool.recycleClass(image, "scroll_group");
                }
            }
        };
        /**
         * 重绘
         */
        ScrollItemGroup.prototype.draw = function () {
            if (this.width == 0 || this.height == 0)
                return;
            if (this._clip) {
                if (this.scrollRect == null) {
                    this.scrollRect = new codeBase.Rectangle(0, 0, this.width, this.height);
                }
                else {
                    this.scrollRect.width = this.width;
                    this.scrollRect.height = this.height;
                }
            }
            else {
                this.scrollRect = null;
            }
        };
        Object.defineProperty(ScrollItemGroup.prototype, "clip", {
            get: function () {
                return this._clip;
            },
            /**
             * 设置剪裁
             * @param value
             */
            set: function (value) {
                if (value != this._clip) {
                    this._clip = value;
                    this.invalidate();
                }
            },
            enumerable: true,
            configurable: true
        });
        return ScrollItemGroup;
    }(codeBase.BasicGroup));
    __reflect(ScrollItemGroup.prototype, "ScrollItemGroup");
})(codeBase || (codeBase = {}));
