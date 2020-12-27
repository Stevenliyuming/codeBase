var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var codeBase;
(function (codeBase) {
    /**
     * 动画数据
     */
    var AnimateData = (function () {
        function AnimateData(name) {
            this.id = null; //数据id
            this.frame = 0; //帧数
            this._json = null; //材质json定义
            this.width = 0;
            this.height = 0;
            this._spriteSheet = null;
            this.textures = null; //通用动画材质
            this.textureDict = null;
            this._type = AnimateData.TYPE_EFFECT;
            this._merge = true; //材质是否是合并输出的
            this.id = name;
            var jsonData = RES.getRes(name + "_animate_json");
            if (jsonData != null) {
                this.textureDict = {};
                this.id = jsonData.id;
                this.frame = jsonData.frame;
                this._type = jsonData.type;
                if (jsonData.merge)
                    this._merge = (jsonData.merge == "true");
                var animateTexture = null;
                if (this._merge) {
                    this._spriteSheet = new egret.SpriteSheet(RES.getRes(name + "_animate_img"));
                }
                if (jsonData.type == "actor") {
                    var textureArr = null;
                    for (var key in jsonData.texture) {
                        textureArr = [];
                        this.textureDict[key] = textureArr;
                        for (var i = 0; i < jsonData.texture[key].length; i++) {
                            animateTexture = new codeBase.AnimateTexture();
                            animateTexture.width = jsonData.texture[key][i].w;
                            animateTexture.height = jsonData.texture[key][i].h;
                            animateTexture.id = jsonData.texture[key][i].id;
                            if (animateTexture.width > this.width)
                                this.width = animateTexture.width;
                            if (animateTexture.height > this.height)
                                this.height = animateTexture.height;
                            if (jsonData.texture[key][i].f) {
                                animateTexture.frame = jsonData.texture[key][i].f;
                            }
                            else {
                                animateTexture.frame = this.frame;
                            }
                            animateTexture.x = jsonData.texture[key][i].ox;
                            animateTexture.y = jsonData.texture[key][i].oy;
                            if (this._merge) {
                                animateTexture.offsetX = jsonData.texture[key][i].x;
                                animateTexture.offsetY = jsonData.texture[key][i].y;
                                animateTexture.texutre = this._spriteSheet.createTexture(key + "_" + i, animateTexture.offsetX, animateTexture.offsetY, animateTexture.width, animateTexture.height);
                            }
                            else {
                                animateTexture.resId = jsonData.texture[key][i].l;
                                animateTexture.texutre = RES.getRes(animateTexture.resId);
                            }
                            textureArr.push(animateTexture);
                        }
                    }
                }
                else {
                    this.textures = [];
                    for (var i = 0; i < jsonData.texture.length; i++) {
                        animateTexture = new codeBase.AnimateTexture();
                        animateTexture.width = jsonData.texture[i].w;
                        animateTexture.height = jsonData.texture[i].h;
                        animateTexture.id = jsonData.texture[i].id;
                        if (animateTexture.width > this.width)
                            this.width = animateTexture.width;
                        if (animateTexture.height > this.height)
                            this.height = animateTexture.height;
                        if (jsonData.texture[i].f) {
                            animateTexture.frame = jsonData.texture[i].f;
                        }
                        else {
                            animateTexture.frame = this.frame;
                        }
                        animateTexture.x = jsonData.texture[i].ox;
                        animateTexture.y = jsonData.texture[i].oy;
                        if (this._merge) {
                            animateTexture.offsetX = jsonData.texture[i].x;
                            animateTexture.offsetY = jsonData.texture[i].y;
                            animateTexture.texutre = this._spriteSheet.createTexture(this.id + "_" + i, animateTexture.offsetX, animateTexture.offsetY, animateTexture.width, animateTexture.height);
                        }
                        else {
                            animateTexture.resId = jsonData.texture[i].l;
                            animateTexture.texutre = RES.getRes(animateTexture.resId);
                        }
                        this.textures.push(animateTexture);
                    }
                }
            }
        }
        /**
         * 获取通用动画材质数据
         */
        AnimateData.prototype.getTexture = function (index) {
            if (index >= 0 && index < this.textures.length) {
                return this.textures[index];
            }
            return null;
        };
        /**
         * 获取人物动画材质
         * @param direction
         * @param index
         * @returns {null}
         */
        AnimateData.prototype.getTextureActor = function (direction, index) {
            if (this.textureDict[direction] && index >= 0) {
                if (index < this.textureDict[direction].length) {
                    return this.textureDict[direction][index];
                }
            }
            return null;
        };
        AnimateData.TYPE_ACTOR = "actor"; //人物动画材质
        AnimateData.TYPE_EFFECT = "effect"; //普通动画效果
        return AnimateData;
    }());
    codeBase.AnimateData = AnimateData;
    __reflect(AnimateData.prototype, "codeBase.AnimateData");
})(codeBase || (codeBase = {}));
