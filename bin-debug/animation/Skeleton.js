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
    var Skeleton = (function (_super) {
        __extends(Skeleton, _super);
        function Skeleton() {
            var _this = _super.call(this) || this;
            _this._mcScale = 1;
            //Skeleton.init();
            var s = _this;
            s._timeScale = 1;
            s._archorX = s._archorY = 0;
            return _this;
        }
        Skeleton.init = function () {
            if (!Skeleton._inited) {
                Skeleton._inited = true;
                //dragonBones.EgretFactory.factory.clock.timeScale = 2;
                //HeartBeat.addListener(Skeleton, Skeleton.dragonLoop);
            }
        };
        Skeleton.dragonLoop = function (currentTime) {
            Skeleton._gapTime = currentTime - Skeleton._mTime;
            Skeleton._mTime = currentTime;
            dragonBones.EgretFactory.factory.clock.advanceTime(Skeleton._gapTime / 1000);
        };
        Object.defineProperty(Skeleton.prototype, "display", {
            get: function () {
                return this._display;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * bName:龙骨文件和帧动画文件前缀名称，导出时要统一命名
         * skPath:放置龙骨动画文件的文件夹路径
         * boneName:龙骨动画名称
         * armatureName:龙骨动画骨架名称
         * movieClipScale:帧动画缩放大小，有些帧动画导出时为了减小贴图大小，会缩放导出比例，显示的时候会比骨骼动画小，所以需要手动放大以达到骨骼动画的大小
         */
        Skeleton.prototype.setDataByName = function (bName, skPath, boneName, armatureName, movieClipScale) {
            if (skPath === void 0) { skPath = ""; }
            if (boneName === void 0) { boneName = null; }
            if (armatureName === void 0) { armatureName = null; }
            if (movieClipScale === void 0) { movieClipScale = 1; }
            var s = this;
            var forceSk;
            var pathStr;
            if (codeBase.GlobalSetting.deviceVer === "canvas") {
                pathStr = skPath.replace("skeleton", "framesAnimation");
                forceSk = !RES.hasRes(pathStr + bName + "_mc.json");
            }
            if (codeBase.GlobalSetting.deviceVer === "webgl" || forceSk) {
                //使用骨骼动画
                s.setData(RES.getRes(skPath + bName + "_ske_json"), RES.getRes(skPath + bName + "_tex_json"), RES.getRes(skPath + bName + "_tex_png"), boneName ? boneName : bName, armatureName);
            }
            else {
                //使用帧动画			
                s.setMovieClipData(RES.getRes(pathStr + bName + "_mc_json"), RES.getRes(pathStr + bName + "_tex2_png"), boneName ? boneName : bName, 1 / movieClipScale);
            }
        };
        /**
         * bName:龙骨名称
         * armatureName:骨架名称，骨架名称和龙骨名称一致时，可以只传bName
         */
        Skeleton.prototype.setData = function (dragonData, textureData, tex, bName, armatureName) {
            if (armatureName === void 0) { armatureName = null; }
            var s = this;
            if (dragonData == null || textureData == null || tex == null) {
                console.error("龙骨资源不能为空！");
                return;
            }
            s.clear();
            s._dragonbonesData = dragonData;
            s._textureData = textureData;
            s._texture = tex;
            var egretFactory = dragonBones.EgretFactory.factory;
            //往龙骨工厂里添加资源
            s._boneData = egretFactory.getDragonBonesData(bName);
            if (s._boneData == null) {
                s._boneData = egretFactory.parseDragonBonesData(s._dragonbonesData, bName);
            }
            s._atlasData = egretFactory.getTextureAtlasData(bName);
            if (s._atlasData == null) {
                egretFactory.parseTextureAtlasData(s._textureData, s._texture, bName);
            }
            s._atlasData = egretFactory.getTextureAtlasData(bName);
            s._boneName = bName;
            s._aramtureName = armatureName;
            //不同龙骨文件骨架名称可能会一样，加上龙骨文件名称，避免错误
            if (s._aramtureName) {
                s._armature = egretFactory.buildArmatureDisplay(s._aramtureName, s._boneName); //egretFactory.buildArmature(s._aramtureName, s._boneName);
            }
            else {
                //如果不传骨架名称，默认为龙骨名称就是骨架名称
                s._armature = egretFactory.buildArmatureDisplay(s._boneName);
                if (!s._armature) {
                    console.log("不存在Aramture名称为：" + s._boneName + "的龙骨动画,需要指定一个正确骨架名称", "warn");
                }
            }
            s._armature.animation.timeScale = s._timeScale;
            s._armature.addDBEventListener(dragonBones.EventObject.LOOP_COMPLETE, s.skEnd, s);
            s._armature.addDBEventListener(dragonBones.EventObject.COMPLETE, s.completeEndCall, s);
            s._display = s._armature;
            s._display.x = -s._archorX;
            s._display.y = -s._archorY;
            s.addChild(s._display);
        };
        Skeleton.prototype.setMovieClipData = function (_mcData, _mcTexture, _mcName, _scale) {
            var s = this;
            if (_mcData == null || _mcTexture == null) {
                console.error("帧动画数据不能为空！");
                return;
            }
            // let readd: boolean = false;
            // if (s._display && s._display.parent) {
            // 	readd = true;
            // }
            s.clear();
            s._mcData = _mcData;
            s._mcTeX = _mcTexture;
            var mcDataFactory = new egret.MovieClipDataFactory(_mcData, _mcTexture);
            var mcData = mcDataFactory.generateMovieClipData(_mcName);
            s._movieClip = new egret.MovieClip(mcData);
            s._display = s._movieClip;
            s.scale(_scale, _scale);
            s._mcScale = _scale;
            s._display.addEventListener(egret.Event.LOOP_COMPLETE, s.skEnd, s);
            s._display.addEventListener(egret.Event.COMPLETE, s.completeEndCall, s);
            s._display.x = -s._archorX;
            s._display.y = -s._archorY;
            s._mcFrameRate = mcData.frameRate;
            s.addChild(s._display);
        };
        Skeleton.prototype.scale = function (sx, sy) {
            var s = this;
            if (!s._display)
                return;
            if (s._movieClip) {
                sx *= s._mcScale;
                sy *= s._mcScale;
            }
            s._display.scaleX = sx;
            s._display.scaleY = sy;
        };
        Object.defineProperty(Skeleton.prototype, "scaleX", {
            get: function () {
                var s = this;
                var val = s._display.scaleX;
                if (s._movieClip) {
                    val = s._display.scaleX / s._mcScale;
                }
                return val;
            },
            set: function (val) {
                var s = this;
                if (!s._display)
                    return;
                if (s._movieClip) {
                    val *= s._mcScale;
                }
                s._display.scaleX = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skeleton.prototype, "scaleY", {
            get: function () {
                var s = this;
                var val = s._display.scaleY;
                if (s._movieClip) {
                    val = s._display.scaleY / s._mcScale;
                }
                return val;
            },
            set: function (val) {
                var s = this;
                if (!s._display)
                    return;
                if (s._movieClip) {
                    val *= s._mcScale;
                }
                s._display.scaleY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skeleton.prototype, "alpha", {
            get: function () {
                var s = this;
                return s._display ? s._display.alpha : 1;
            },
            set: function (val) {
                var s = this;
                if (!s._display)
                    return;
                s._display.alpha = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skeleton.prototype, "boneName", {
            get: function () {
                return this._boneName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skeleton.prototype, "curActionName", {
            get: function () {
                return this._curActionName;
            },
            enumerable: true,
            configurable: true
        });
        Skeleton.prototype.skEnd = function (e) {
            var s = this;
            if (s._endFunc != null) {
                s._endFunc.call(s._endObject, this);
            }
            if (s._sound == null && s._endAct) {
                s.gotoAndPlay(s._endAct, 0);
                s._endAct = null;
            }
        };
        //添加动画最后一次循环结束时间监听
        Skeleton.prototype.addAnimationCompleteListener = function (_fun, obj) {
            var s = this;
            s._completeEndFunc = _fun;
            s._completeEndObject = obj;
        };
        //移除动画最后一次循环结束时间监听
        Skeleton.prototype.removeAnimationCompleteListener = function () { };
        Skeleton.prototype.completeEndCall = function (e) {
            var s = this;
            /**在这里派发一个loop_complete事件：帧动画播放最后一次底层是没有派发这个事件的 */
            if (s._movieClip) {
                s._movieClip.dispatchEvent(new egret.Event(egret.Event.LOOP_COMPLETE));
            }
            if (s._completeEndFunc != null) {
                var fun = s._completeEndFunc;
                var funObj = s._completeEndObject;
                s._completeEndFunc = null;
                s._completeEndObject = null;
                fun.call(funObj, this);
            }
        };
        /**调整速度百分比
         * @param val 速度百分比，默认是1 例如2，就是两倍
        */
        Skeleton.prototype.setTimeScale = function (val) {
            var s = this;
            if (s._armature) {
                s._timeScale = val;
                s._armature.animation.timeScale = s._timeScale;
            }
            else if (s._movieClip) {
                s._movieClip.frameRate = val * s._mcFrameRate;
            }
        };
        Skeleton.prototype.dispose = function () {
            var s = this;
            s.clear(true);
        };
        Skeleton.prototype.clear = function (remove) {
            if (remove === void 0) { remove = false; }
            var s = this;
            if (s._display && s._display.parent) {
                if (s._display.parent.removeElement)
                    s._display.parent.removeElement(s._display);
                else
                    s._display.parent.removeChild(s._display);
            }
            if (remove)
                s.hide();
            if (s._armature) {
                //dragonBones.EgretFactory.factory.clock.remove(s._armature.armature);
                s._armature.removeDBEventListener(dragonBones.EventObject.LOOP_COMPLETE, s.skEnd, s);
                s._armature.removeDBEventListener(dragonBones.EventObject.COMPLETE, s.completeEndCall, s);
                s._armature.dispose();
                s._armature = null;
            }
            if (s._dragonbonesData) {
                dragonBones.EgretFactory.factory.removeDragonBonesData(s._boneName);
                s._boneData = s._dragonbonesData = null;
            }
            if (s._textureData) {
                dragonBones.EgretFactory.factory.removeTextureAtlasData(s._boneName);
                s._atlasData = s._textureData = null;
            }
            if (s._soundEndCallBack != null) {
                s._soundEndCallBack = null;
                s._soundEndObject = null;
            }
            if (s._sound) {
                codeBase.SoundManager.Instance.stopSoundByName(s._sound);
            }
            s._textureData = null;
            s._texture = null;
            s._display = null;
            //清空帧动画数据		
            if (s._movieClip) {
                s._movieClip.removeEventListener(egret.Event.LOOP_COMPLETE, s.skEnd, s);
                s._movieClip.removeEventListener(egret.Event.COMPLETE, s.completeEndCall, s);
                s._movieClip.stop();
            }
            if (s._mcData) {
                s._mcData = null;
            }
            if (s._mcTeX) {
                s._mcTeX = null;
            }
            s._mcScale = 1.0;
        };
        Skeleton.prototype.gotoAndPlay = function (actionName, playTimes, sound, endAct, soundEndCall, soundThisObject) {
            if (playTimes === void 0) { playTimes = 1; }
            if (sound === void 0) { sound = null; }
            if (endAct === void 0) { endAct = null; }
            if (soundEndCall === void 0) { soundEndCall = null; }
            if (soundThisObject === void 0) { soundThisObject = null; }
            var s = this;
            s._curActionName = actionName;
            s._sound = sound;
            s._endAct = endAct;
            s._soundEndCallBack = soundEndCall;
            s._soundEndObject = soundThisObject;
            //判断播放骨骼动画还是帧动画
            if (s._armature) {
                // if (s._armature.armature.clock == null)
                // 	dragonBones.EgretFactory.factory.clock.add(s._armature.armature);
                s._armature.animation.play(actionName, playTimes);
            }
            else if (s._movieClip) {
                s._movieClip.gotoAndPlay(actionName, playTimes);
            }
            if (s._sound) {
                codeBase.SoundManager.Instance.PlaySoundByName(s._sound, 1, s.soundEnd, s, 1, true, false);
            }
        };
        Skeleton.prototype.soundEnd = function () {
            var s = this;
            var func, obj;
            func = s._soundEndCallBack;
            obj = s._soundEndObject;
            if (s._endAct) {
                s.gotoAndPlay(s._endAct, 0);
                s._endAct = null;
            }
            if (func != null) {
                func.call(obj);
            }
        };
        /**停止动画
         * @param actionName 为null则停止所有动画
         * @param removeFromClock 是否从绘制时钟里面移除
        */
        Skeleton.prototype.stop = function (actionName, removeFromClock) {
            if (actionName === void 0) { actionName = null; }
            if (removeFromClock === void 0) { removeFromClock = true; }
            var s = this;
            if (s._armature) {
                s._armature.animation.stop(actionName);
            }
            else if (s._movieClip) {
                s._movieClip.stop();
            }
        };
        Skeleton.prototype.show = function (pr, toX, toY) {
            if (toX === void 0) { toX = 0; }
            if (toY === void 0) { toY = 0; }
            var s = this;
            if (pr.addElement != null)
                pr.addElement(s);
            else
                pr.addChild(s);
            s.x = toX;
            s.y = toY;
        };
        Skeleton.prototype.hide = function () {
            var s = this;
            if (s.parent) {
                if (s.parent.removeElement)
                    s.parent.removeElement(this);
                else
                    s.parent.removeChild(this);
            }
        };
        Skeleton.prototype.setPlayEnd = function (func, thisObject) {
            var s = this;
            s._endFunc = func;
            s._endObject = thisObject;
        };
        Skeleton.prototype.clearPlayEnd = function () {
            var s = this;
            if (s._endFunc) {
                s._endFunc = null;
                s._endObject = null;
            }
        };
        Object.defineProperty(Skeleton.prototype, "archorX", {
            get: function () {
                return this._archorX;
            },
            set: function (val) {
                var s = this;
                s._archorX = val;
                if (s._display)
                    s._display.x = -s._archorX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skeleton.prototype, "archorY", {
            get: function () {
                return this._archorY;
            },
            set: function (val) {
                var s = this;
                s._archorY = val;
                if (s._display)
                    s._display.y = -s._archorY;
            },
            enumerable: true,
            configurable: true
        });
        Skeleton._inited = false;
        Skeleton._mTime = 0;
        Skeleton._gapTime = 0;
        return Skeleton;
    }(egret.Sprite));
    codeBase.Skeleton = Skeleton;
    __reflect(Skeleton.prototype, "codeBase.Skeleton");
})(codeBase || (codeBase = {}));
