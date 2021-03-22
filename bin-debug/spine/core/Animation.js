/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated January 1, 2020. Replaces all prior versions.
 *
 * Copyright (c) 2013-2020, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software
 * or otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THE SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
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
var spine;
(function (spine) {
    /** A simple container for a list of timelines and a name. */
    var Animation = (function () {
        function Animation(name, timelines, duration) {
            if (name == null)
                throw new Error("name cannot be null.");
            if (timelines == null)
                throw new Error("timelines cannot be null.");
            this.name = name;
            this.timelines = timelines;
            this.timelineIds = [];
            for (var i = 0; i < timelines.length; i++)
                this.timelineIds[timelines[i].getPropertyId()] = true;
            this.duration = duration;
        }
        Animation.prototype.hasTimeline = function (id) {
            return this.timelineIds[id] == true;
        };
        /** Applies all the animation's timelines to the specified skeleton.
         *
         * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}.
         * @param loop If true, the animation repeats after {@link #getDuration()}.
         * @param events May be null to ignore fired events. */
        Animation.prototype.apply = function (skeleton, lastTime, time, loop, events, alpha, blend, direction) {
            if (skeleton == null)
                throw new Error("skeleton cannot be null.");
            if (loop && this.duration != 0) {
                time %= this.duration;
                if (lastTime > 0)
                    lastTime %= this.duration;
            }
            var timelines = this.timelines;
            for (var i = 0, n = timelines.length; i < n; i++)
                timelines[i].apply(skeleton, lastTime, time, events, alpha, blend, direction);
        };
        /** @param target After the first and before the last value.
         * @returns index of first value greater than the target. */
        Animation.binarySearch = function (values, target, step) {
            if (step === void 0) { step = 1; }
            var low = 0;
            var high = values.length / step - 2;
            if (high == 0)
                return step;
            var current = high >>> 1;
            while (true) {
                if (values[(current + 1) * step] <= target)
                    low = current + 1;
                else
                    high = current;
                if (low == high)
                    return (low + 1) * step;
                current = (low + high) >>> 1;
            }
        };
        Animation.linearSearch = function (values, target, step) {
            for (var i = 0, last = values.length - step; i <= last; i += step)
                if (values[i] > target)
                    return i;
            return -1;
        };
        return Animation;
    }());
    spine.Animation = Animation;
    __reflect(Animation.prototype, "spine.Animation");
    /** Controls how a timeline value is mixed with the setup pose value or current pose value when a timeline's `alpha`
     * < 1.
     *
     * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}. */
    var MixBlend;
    (function (MixBlend) {
        /** Transitions from the setup value to the timeline value (the current value is not used). Before the first key, the setup
         * value is set. */
        MixBlend[MixBlend["setup"] = 0] = "setup";
        /** Transitions from the current value to the timeline value. Before the first key, transitions from the current value to
         * the setup value. Timelines which perform instant transitions, such as {@link DrawOrderTimeline} or
         * {@link AttachmentTimeline}, use the setup value before the first key.
         *
         * `first` is intended for the first animations applied, not for animations layered on top of those. */
        MixBlend[MixBlend["first"] = 1] = "first";
        /** Transitions from the current value to the timeline value. No change is made before the first key (the current value is
         * kept until the first key).
         *
         * `replace` is intended for animations layered on top of others, not for the first animations applied. */
        MixBlend[MixBlend["replace"] = 2] = "replace";
        /** Transitions from the current value to the current value plus the timeline value. No change is made before the first key
         * (the current value is kept until the first key).
         *
         * `add` is intended for animations layered on top of others, not for the first animations applied. Properties
         * keyed by additive animations must be set manually or by another animation before applying the additive animations, else
         * the property values will increase continually. */
        MixBlend[MixBlend["add"] = 3] = "add";
    })(MixBlend = spine.MixBlend || (spine.MixBlend = {}));
    /** Indicates whether a timeline's `alpha` is mixing out over time toward 0 (the setup or current pose value) or
     * mixing in toward 1 (the timeline's value).
     *
     * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}. */
    var MixDirection;
    (function (MixDirection) {
        MixDirection[MixDirection["mixIn"] = 0] = "mixIn";
        MixDirection[MixDirection["mixOut"] = 1] = "mixOut";
    })(MixDirection = spine.MixDirection || (spine.MixDirection = {}));
    var TimelineType;
    (function (TimelineType) {
        TimelineType[TimelineType["rotate"] = 0] = "rotate";
        TimelineType[TimelineType["translate"] = 1] = "translate";
        TimelineType[TimelineType["scale"] = 2] = "scale";
        TimelineType[TimelineType["shear"] = 3] = "shear";
        TimelineType[TimelineType["attachment"] = 4] = "attachment";
        TimelineType[TimelineType["color"] = 5] = "color";
        TimelineType[TimelineType["deform"] = 6] = "deform";
        TimelineType[TimelineType["event"] = 7] = "event";
        TimelineType[TimelineType["drawOrder"] = 8] = "drawOrder";
        TimelineType[TimelineType["ikConstraint"] = 9] = "ikConstraint";
        TimelineType[TimelineType["transformConstraint"] = 10] = "transformConstraint";
        TimelineType[TimelineType["pathConstraintPosition"] = 11] = "pathConstraintPosition";
        TimelineType[TimelineType["pathConstraintSpacing"] = 12] = "pathConstraintSpacing";
        TimelineType[TimelineType["pathConstraintMix"] = 13] = "pathConstraintMix";
        TimelineType[TimelineType["twoColor"] = 14] = "twoColor";
    })(TimelineType = spine.TimelineType || (spine.TimelineType = {}));
    /** The base class for timelines that use interpolation between key frame values. */
    var CurveTimeline = (function () {
        function CurveTimeline(frameCount) {
            if (frameCount <= 0)
                throw new Error("frameCount must be > 0: " + frameCount);
            this.curves = spine.Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
        }
        /** The number of key frames for this timeline. */
        CurveTimeline.prototype.getFrameCount = function () {
            return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
        };
        /** Sets the specified key frame to linear interpolation. */
        CurveTimeline.prototype.setLinear = function (frameIndex) {
            this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
        };
        /** Sets the specified key frame to stepped interpolation. */
        CurveTimeline.prototype.setStepped = function (frameIndex) {
            this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
        };
        /** Returns the interpolation type for the specified key frame.
         * @returns Linear is 0, stepped is 1, Bezier is 2. */
        CurveTimeline.prototype.getCurveType = function (frameIndex) {
            var index = frameIndex * CurveTimeline.BEZIER_SIZE;
            if (index == this.curves.length)
                return CurveTimeline.LINEAR;
            var type = this.curves[index];
            if (type == CurveTimeline.LINEAR)
                return CurveTimeline.LINEAR;
            if (type == CurveTimeline.STEPPED)
                return CurveTimeline.STEPPED;
            return CurveTimeline.BEZIER;
        };
        /** Sets the specified key frame to Bezier interpolation. `cx1` and `cx2` are from 0 to 1,
         * representing the percent of time between the two key frames. `cy1` and `cy2` are the percent of the
         * difference between the key frame's values. */
        CurveTimeline.prototype.setCurve = function (frameIndex, cx1, cy1, cx2, cy2) {
            var tmpx = (-cx1 * 2 + cx2) * 0.03, tmpy = (-cy1 * 2 + cy2) * 0.03;
            var dddfx = ((cx1 - cx2) * 3 + 1) * 0.006, dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
            var ddfx = tmpx * 2 + dddfx, ddfy = tmpy * 2 + dddfy;
            var dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667, dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
            var i = frameIndex * CurveTimeline.BEZIER_SIZE;
            var curves = this.curves;
            curves[i++] = CurveTimeline.BEZIER;
            var x = dfx, y = dfy;
            for (var n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                curves[i] = x;
                curves[i + 1] = y;
                dfx += ddfx;
                dfy += ddfy;
                ddfx += dddfx;
                ddfy += dddfy;
                x += dfx;
                y += dfy;
            }
        };
        /** Returns the interpolated percentage for the specified key frame and linear percentage. */
        CurveTimeline.prototype.getCurvePercent = function (frameIndex, percent) {
            percent = spine.MathUtils.clamp(percent, 0, 1);
            var curves = this.curves;
            var i = frameIndex * CurveTimeline.BEZIER_SIZE;
            var type = curves[i];
            if (type == CurveTimeline.LINEAR)
                return percent;
            if (type == CurveTimeline.STEPPED)
                return 0;
            i++;
            var x = 0;
            for (var start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                x = curves[i];
                if (x >= percent) {
                    var prevX = void 0, prevY = void 0;
                    if (i == start) {
                        prevX = 0;
                        prevY = 0;
                    }
                    else {
                        prevX = curves[i - 2];
                        prevY = curves[i - 1];
                    }
                    return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
                }
            }
            var y = curves[i - 1];
            return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
        };
        CurveTimeline.LINEAR = 0;
        CurveTimeline.STEPPED = 1;
        CurveTimeline.BEZIER = 2;
        CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
        return CurveTimeline;
    }());
    spine.CurveTimeline = CurveTimeline;
    __reflect(CurveTimeline.prototype, "spine.CurveTimeline", ["spine.Timeline"]);
    /** Changes a bone's local {@link Bone#rotation}. */
    var RotateTimeline = (function (_super) {
        __extends(RotateTimeline, _super);
        function RotateTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount << 1);
            return _this;
        }
        RotateTimeline.prototype.getPropertyId = function () {
            return (TimelineType.rotate << 24) + this.boneIndex;
        };
        /** Sets the time and angle of the specified keyframe. */
        RotateTimeline.prototype.setFrame = function (frameIndex, time, degrees) {
            frameIndex <<= 1;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
        };
        RotateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var frames = this.frames;
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        bone.rotation = bone.data.rotation;
                        return;
                    case MixBlend.first:
                        var r_1 = bone.data.rotation - bone.rotation;
                        bone.rotation += (r_1 - (16384 - ((16384.499999999996 - r_1 / 360) | 0)) * 360) * alpha;
                }
                return;
            }
            if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
                var r_2 = frames[frames.length + RotateTimeline.PREV_ROTATION];
                switch (blend) {
                    case MixBlend.setup:
                        bone.rotation = bone.data.rotation + r_2 * alpha;
                        break;
                    case MixBlend.first:
                    case MixBlend.replace:
                        r_2 += bone.data.rotation - bone.rotation;
                        r_2 -= (16384 - ((16384.499999999996 - r_2 / 360) | 0)) * 360; // Wrap within -180 and 180.
                    case MixBlend.add:
                        bone.rotation += r_2 * alpha;
                }
                return;
            }
            // Interpolate between the previous frame and the current frame.
            var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
            var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
            var frameTime = frames[frame];
            var percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
            var r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
            r = prevRotation + (r - (16384 - ((16384.499999999996 - r / 360) | 0)) * 360) * percent;
            switch (blend) {
                case MixBlend.setup:
                    bone.rotation = bone.data.rotation + (r - (16384 - ((16384.499999999996 - r / 360) | 0)) * 360) * alpha;
                    break;
                case MixBlend.first:
                case MixBlend.replace:
                    r += bone.data.rotation - bone.rotation;
                case MixBlend.add:
                    bone.rotation += (r - (16384 - ((16384.499999999996 - r / 360) | 0)) * 360) * alpha;
            }
        };
        RotateTimeline.ENTRIES = 2;
        RotateTimeline.PREV_TIME = -2;
        RotateTimeline.PREV_ROTATION = -1;
        RotateTimeline.ROTATION = 1;
        return RotateTimeline;
    }(CurveTimeline));
    spine.RotateTimeline = RotateTimeline;
    __reflect(RotateTimeline.prototype, "spine.RotateTimeline");
    /** Changes a bone's local {@link Bone#x} and {@link Bone#y}. */
    var TranslateTimeline = (function (_super) {
        __extends(TranslateTimeline, _super);
        function TranslateTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
            return _this;
        }
        TranslateTimeline.prototype.getPropertyId = function () {
            return (TimelineType.translate << 24) + this.boneIndex;
        };
        /** Sets the time in seconds, x, and y values for the specified key frame. */
        TranslateTimeline.prototype.setFrame = function (frameIndex, time, x, y) {
            frameIndex *= TranslateTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + TranslateTimeline.X] = x;
            this.frames[frameIndex + TranslateTimeline.Y] = y;
        };
        TranslateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var frames = this.frames;
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        bone.x = bone.data.x;
                        bone.y = bone.data.y;
                        return;
                    case MixBlend.first:
                        bone.x += (bone.data.x - bone.x) * alpha;
                        bone.y += (bone.data.y - bone.y) * alpha;
                }
                return;
            }
            var x = 0, y = 0;
            if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
                x = frames[frames.length + TranslateTimeline.PREV_X];
                y = frames[frames.length + TranslateTimeline.PREV_Y];
            }
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
                x = frames[frame + TranslateTimeline.PREV_X];
                y = frames[frame + TranslateTimeline.PREV_Y];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TranslateTimeline.PREV_TIME] - frameTime));
                x += (frames[frame + TranslateTimeline.X] - x) * percent;
                y += (frames[frame + TranslateTimeline.Y] - y) * percent;
            }
            switch (blend) {
                case MixBlend.setup:
                    bone.x = bone.data.x + x * alpha;
                    bone.y = bone.data.y + y * alpha;
                    break;
                case MixBlend.first:
                case MixBlend.replace:
                    bone.x += (bone.data.x + x - bone.x) * alpha;
                    bone.y += (bone.data.y + y - bone.y) * alpha;
                    break;
                case MixBlend.add:
                    bone.x += x * alpha;
                    bone.y += y * alpha;
            }
        };
        TranslateTimeline.ENTRIES = 3;
        TranslateTimeline.PREV_TIME = -3;
        TranslateTimeline.PREV_X = -2;
        TranslateTimeline.PREV_Y = -1;
        TranslateTimeline.X = 1;
        TranslateTimeline.Y = 2;
        return TranslateTimeline;
    }(CurveTimeline));
    spine.TranslateTimeline = TranslateTimeline;
    __reflect(TranslateTimeline.prototype, "spine.TranslateTimeline");
    /** Changes a bone's local {@link Bone#scaleX)} and {@link Bone#scaleY}. */
    var ScaleTimeline = (function (_super) {
        __extends(ScaleTimeline, _super);
        function ScaleTimeline(frameCount) {
            return _super.call(this, frameCount) || this;
        }
        ScaleTimeline.prototype.getPropertyId = function () {
            return (TimelineType.scale << 24) + this.boneIndex;
        };
        ScaleTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var frames = this.frames;
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        bone.scaleX = bone.data.scaleX;
                        bone.scaleY = bone.data.scaleY;
                        return;
                    case MixBlend.first:
                        bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                        bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                }
                return;
            }
            var x = 0, y = 0;
            if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
                x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
                y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
            }
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
                x = frames[frame + ScaleTimeline.PREV_X];
                y = frames[frame + ScaleTimeline.PREV_Y];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ScaleTimeline.PREV_TIME] - frameTime));
                x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
                y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
            }
            if (alpha == 1) {
                if (blend == MixBlend.add) {
                    bone.scaleX += x - bone.data.scaleX;
                    bone.scaleY += y - bone.data.scaleY;
                }
                else {
                    bone.scaleX = x;
                    bone.scaleY = y;
                }
            }
            else {
                var bx = 0, by = 0;
                if (direction == MixDirection.mixOut) {
                    switch (blend) {
                        case MixBlend.setup:
                            bx = bone.data.scaleX;
                            by = bone.data.scaleY;
                            bone.scaleX = bx + (Math.abs(x) * spine.MathUtils.signum(bx) - bx) * alpha;
                            bone.scaleY = by + (Math.abs(y) * spine.MathUtils.signum(by) - by) * alpha;
                            break;
                        case MixBlend.first:
                        case MixBlend.replace:
                            bx = bone.scaleX;
                            by = bone.scaleY;
                            bone.scaleX = bx + (Math.abs(x) * spine.MathUtils.signum(bx) - bx) * alpha;
                            bone.scaleY = by + (Math.abs(y) * spine.MathUtils.signum(by) - by) * alpha;
                            break;
                        case MixBlend.add:
                            bx = bone.scaleX;
                            by = bone.scaleY;
                            bone.scaleX = bx + (Math.abs(x) * spine.MathUtils.signum(bx) - bone.data.scaleX) * alpha;
                            bone.scaleY = by + (Math.abs(y) * spine.MathUtils.signum(by) - bone.data.scaleY) * alpha;
                    }
                }
                else {
                    switch (blend) {
                        case MixBlend.setup:
                            bx = Math.abs(bone.data.scaleX) * spine.MathUtils.signum(x);
                            by = Math.abs(bone.data.scaleY) * spine.MathUtils.signum(y);
                            bone.scaleX = bx + (x - bx) * alpha;
                            bone.scaleY = by + (y - by) * alpha;
                            break;
                        case MixBlend.first:
                        case MixBlend.replace:
                            bx = Math.abs(bone.scaleX) * spine.MathUtils.signum(x);
                            by = Math.abs(bone.scaleY) * spine.MathUtils.signum(y);
                            bone.scaleX = bx + (x - bx) * alpha;
                            bone.scaleY = by + (y - by) * alpha;
                            break;
                        case MixBlend.add:
                            bx = spine.MathUtils.signum(x);
                            by = spine.MathUtils.signum(y);
                            bone.scaleX = Math.abs(bone.scaleX) * bx + (x - Math.abs(bone.data.scaleX) * bx) * alpha;
                            bone.scaleY = Math.abs(bone.scaleY) * by + (y - Math.abs(bone.data.scaleY) * by) * alpha;
                    }
                }
            }
        };
        return ScaleTimeline;
    }(TranslateTimeline));
    spine.ScaleTimeline = ScaleTimeline;
    __reflect(ScaleTimeline.prototype, "spine.ScaleTimeline");
    /** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}. */
    var ShearTimeline = (function (_super) {
        __extends(ShearTimeline, _super);
        function ShearTimeline(frameCount) {
            return _super.call(this, frameCount) || this;
        }
        ShearTimeline.prototype.getPropertyId = function () {
            return (TimelineType.shear << 24) + this.boneIndex;
        };
        ShearTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var frames = this.frames;
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        bone.shearX = bone.data.shearX;
                        bone.shearY = bone.data.shearY;
                        return;
                    case MixBlend.first:
                        bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                        bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                }
                return;
            }
            var x = 0, y = 0;
            if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
                x = frames[frames.length + ShearTimeline.PREV_X];
                y = frames[frames.length + ShearTimeline.PREV_Y];
            }
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
                x = frames[frame + ShearTimeline.PREV_X];
                y = frames[frame + ShearTimeline.PREV_Y];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ShearTimeline.PREV_TIME] - frameTime));
                x = x + (frames[frame + ShearTimeline.X] - x) * percent;
                y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
            }
            switch (blend) {
                case MixBlend.setup:
                    bone.shearX = bone.data.shearX + x * alpha;
                    bone.shearY = bone.data.shearY + y * alpha;
                    break;
                case MixBlend.first:
                case MixBlend.replace:
                    bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                    bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                    break;
                case MixBlend.add:
                    bone.shearX += x * alpha;
                    bone.shearY += y * alpha;
            }
        };
        return ShearTimeline;
    }(TranslateTimeline));
    spine.ShearTimeline = ShearTimeline;
    __reflect(ShearTimeline.prototype, "spine.ShearTimeline");
    /** Changes a slot's {@link Slot#color}. */
    var ColorTimeline = (function (_super) {
        __extends(ColorTimeline, _super);
        function ColorTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
            return _this;
        }
        ColorTimeline.prototype.getPropertyId = function () {
            return (TimelineType.color << 24) + this.slotIndex;
        };
        /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
        ColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a) {
            frameIndex *= ColorTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + ColorTimeline.R] = r;
            this.frames[frameIndex + ColorTimeline.G] = g;
            this.frames[frameIndex + ColorTimeline.B] = b;
            this.frames[frameIndex + ColorTimeline.A] = a;
        };
        ColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        slot.color.setFromColor(slot.data.color);
                        return;
                    case MixBlend.first:
                        var color = slot.color, setup = slot.data.color;
                        color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
                }
                return;
            }
            var r = 0, g = 0, b = 0, a = 0;
            if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
                var i = frames.length;
                r = frames[i + ColorTimeline.PREV_R];
                g = frames[i + ColorTimeline.PREV_G];
                b = frames[i + ColorTimeline.PREV_B];
                a = frames[i + ColorTimeline.PREV_A];
            }
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
                r = frames[frame + ColorTimeline.PREV_R];
                g = frames[frame + ColorTimeline.PREV_G];
                b = frames[frame + ColorTimeline.PREV_B];
                a = frames[frame + ColorTimeline.PREV_A];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ColorTimeline.PREV_TIME] - frameTime));
                r += (frames[frame + ColorTimeline.R] - r) * percent;
                g += (frames[frame + ColorTimeline.G] - g) * percent;
                b += (frames[frame + ColorTimeline.B] - b) * percent;
                a += (frames[frame + ColorTimeline.A] - a) * percent;
            }
            if (alpha == 1)
                slot.color.set(r, g, b, a);
            else {
                var color = slot.color;
                if (blend == MixBlend.setup)
                    color.setFromColor(slot.data.color);
                color.add((r - color.r) * alpha, (g - color.g) * alpha, (b - color.b) * alpha, (a - color.a) * alpha);
            }
        };
        ColorTimeline.ENTRIES = 5;
        ColorTimeline.PREV_TIME = -5;
        ColorTimeline.PREV_R = -4;
        ColorTimeline.PREV_G = -3;
        ColorTimeline.PREV_B = -2;
        ColorTimeline.PREV_A = -1;
        ColorTimeline.R = 1;
        ColorTimeline.G = 2;
        ColorTimeline.B = 3;
        ColorTimeline.A = 4;
        return ColorTimeline;
    }(CurveTimeline));
    spine.ColorTimeline = ColorTimeline;
    __reflect(ColorTimeline.prototype, "spine.ColorTimeline");
    /** Changes a slot's {@link Slot#color} and {@link Slot#darkColor} for two color tinting. */
    var TwoColorTimeline = (function (_super) {
        __extends(TwoColorTimeline, _super);
        function TwoColorTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
            return _this;
        }
        TwoColorTimeline.prototype.getPropertyId = function () {
            return (TimelineType.twoColor << 24) + this.slotIndex;
        };
        /** Sets the time in seconds, light, and dark colors for the specified key frame. */
        TwoColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a, r2, g2, b2) {
            frameIndex *= TwoColorTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + TwoColorTimeline.R] = r;
            this.frames[frameIndex + TwoColorTimeline.G] = g;
            this.frames[frameIndex + TwoColorTimeline.B] = b;
            this.frames[frameIndex + TwoColorTimeline.A] = a;
            this.frames[frameIndex + TwoColorTimeline.R2] = r2;
            this.frames[frameIndex + TwoColorTimeline.G2] = g2;
            this.frames[frameIndex + TwoColorTimeline.B2] = b2;
        };
        TwoColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        slot.color.setFromColor(slot.data.color);
                        slot.darkColor.setFromColor(slot.data.darkColor);
                        return;
                    case MixBlend.first:
                        var light = slot.color, dark = slot.darkColor, setupLight = slot.data.color, setupDark = slot.data.darkColor;
                        light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
                        dark.add((setupDark.r - dark.r) * alpha, (setupDark.g - dark.g) * alpha, (setupDark.b - dark.b) * alpha, 0);
                }
                return;
            }
            var r = 0, g = 0, b = 0, a = 0, r2 = 0, g2 = 0, b2 = 0;
            if (time >= frames[frames.length - TwoColorTimeline.ENTRIES]) {
                var i = frames.length;
                r = frames[i + TwoColorTimeline.PREV_R];
                g = frames[i + TwoColorTimeline.PREV_G];
                b = frames[i + TwoColorTimeline.PREV_B];
                a = frames[i + TwoColorTimeline.PREV_A];
                r2 = frames[i + TwoColorTimeline.PREV_R2];
                g2 = frames[i + TwoColorTimeline.PREV_G2];
                b2 = frames[i + TwoColorTimeline.PREV_B2];
            }
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, TwoColorTimeline.ENTRIES);
                r = frames[frame + TwoColorTimeline.PREV_R];
                g = frames[frame + TwoColorTimeline.PREV_G];
                b = frames[frame + TwoColorTimeline.PREV_B];
                a = frames[frame + TwoColorTimeline.PREV_A];
                r2 = frames[frame + TwoColorTimeline.PREV_R2];
                g2 = frames[frame + TwoColorTimeline.PREV_G2];
                b2 = frames[frame + TwoColorTimeline.PREV_B2];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / TwoColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TwoColorTimeline.PREV_TIME] - frameTime));
                r += (frames[frame + TwoColorTimeline.R] - r) * percent;
                g += (frames[frame + TwoColorTimeline.G] - g) * percent;
                b += (frames[frame + TwoColorTimeline.B] - b) * percent;
                a += (frames[frame + TwoColorTimeline.A] - a) * percent;
                r2 += (frames[frame + TwoColorTimeline.R2] - r2) * percent;
                g2 += (frames[frame + TwoColorTimeline.G2] - g2) * percent;
                b2 += (frames[frame + TwoColorTimeline.B2] - b2) * percent;
            }
            if (alpha == 1) {
                slot.color.set(r, g, b, a);
                slot.darkColor.set(r2, g2, b2, 1);
            }
            else {
                var light = slot.color, dark = slot.darkColor;
                if (blend == MixBlend.setup) {
                    light.setFromColor(slot.data.color);
                    dark.setFromColor(slot.data.darkColor);
                }
                light.add((r - light.r) * alpha, (g - light.g) * alpha, (b - light.b) * alpha, (a - light.a) * alpha);
                dark.add((r2 - dark.r) * alpha, (g2 - dark.g) * alpha, (b2 - dark.b) * alpha, 0);
            }
        };
        TwoColorTimeline.ENTRIES = 8;
        TwoColorTimeline.PREV_TIME = -8;
        TwoColorTimeline.PREV_R = -7;
        TwoColorTimeline.PREV_G = -6;
        TwoColorTimeline.PREV_B = -5;
        TwoColorTimeline.PREV_A = -4;
        TwoColorTimeline.PREV_R2 = -3;
        TwoColorTimeline.PREV_G2 = -2;
        TwoColorTimeline.PREV_B2 = -1;
        TwoColorTimeline.R = 1;
        TwoColorTimeline.G = 2;
        TwoColorTimeline.B = 3;
        TwoColorTimeline.A = 4;
        TwoColorTimeline.R2 = 5;
        TwoColorTimeline.G2 = 6;
        TwoColorTimeline.B2 = 7;
        return TwoColorTimeline;
    }(CurveTimeline));
    spine.TwoColorTimeline = TwoColorTimeline;
    __reflect(TwoColorTimeline.prototype, "spine.TwoColorTimeline");
    /** Changes a slot's {@link Slot#attachment}. */
    var AttachmentTimeline = (function () {
        function AttachmentTimeline(frameCount) {
            this.frames = spine.Utils.newFloatArray(frameCount);
            this.attachmentNames = new Array(frameCount);
        }
        AttachmentTimeline.prototype.getPropertyId = function () {
            return (TimelineType.attachment << 24) + this.slotIndex;
        };
        /** The number of key frames for this timeline. */
        AttachmentTimeline.prototype.getFrameCount = function () {
            return this.frames.length;
        };
        /** Sets the time in seconds and the attachment name for the specified key frame. */
        AttachmentTimeline.prototype.setFrame = function (frameIndex, time, attachmentName) {
            this.frames[frameIndex] = time;
            this.attachmentNames[frameIndex] = attachmentName;
        };
        AttachmentTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            if (direction == MixDirection.mixOut && blend == MixBlend.setup) {
                var attachmentName_1 = slot.data.attachmentName;
                slot.setAttachment(attachmentName_1 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_1));
                return;
            }
            var frames = this.frames;
            if (time < frames[0]) {
                if (blend == MixBlend.setup || blend == MixBlend.first) {
                    var attachmentName_2 = slot.data.attachmentName;
                    slot.setAttachment(attachmentName_2 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_2));
                }
                return;
            }
            var frameIndex = 0;
            if (time >= frames[frames.length - 1])
                frameIndex = frames.length - 1;
            else
                frameIndex = Animation.binarySearch(frames, time, 1) - 1;
            var attachmentName = this.attachmentNames[frameIndex];
            skeleton.slots[this.slotIndex]
                .setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
        };
        return AttachmentTimeline;
    }());
    spine.AttachmentTimeline = AttachmentTimeline;
    __reflect(AttachmentTimeline.prototype, "spine.AttachmentTimeline", ["spine.Timeline"]);
    var zeros = null;
    /** Changes a slot's {@link Slot#deform} to deform a {@link VertexAttachment}. */
    var DeformTimeline = (function (_super) {
        __extends(DeformTimeline, _super);
        function DeformTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount);
            _this.frameVertices = new Array(frameCount);
            if (zeros == null)
                zeros = spine.Utils.newFloatArray(64);
            return _this;
        }
        DeformTimeline.prototype.getPropertyId = function () {
            return (TimelineType.deform << 27) + +this.attachment.id + this.slotIndex;
        };
        /** Sets the time in seconds and the vertices for the specified key frame.
         * @param vertices Vertex positions for an unweighted VertexAttachment, or deform offsets if it has weights. */
        DeformTimeline.prototype.setFrame = function (frameIndex, time, vertices) {
            this.frames[frameIndex] = time;
            this.frameVertices[frameIndex] = vertices;
        };
        DeformTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var slotAttachment = slot.getAttachment();
            if (!(slotAttachment instanceof spine.VertexAttachment) || !(slotAttachment.deformAttachment == this.attachment))
                return;
            var deformArray = slot.deform;
            if (deformArray.length == 0)
                blend = MixBlend.setup;
            var frameVertices = this.frameVertices;
            var vertexCount = frameVertices[0].length;
            var frames = this.frames;
            if (time < frames[0]) {
                var vertexAttachment = slotAttachment;
                switch (blend) {
                    case MixBlend.setup:
                        deformArray.length = 0;
                        return;
                    case MixBlend.first:
                        if (alpha == 1) {
                            deformArray.length = 0;
                            break;
                        }
                        var deform_1 = spine.Utils.setArraySize(deformArray, vertexCount);
                        if (vertexAttachment.bones == null) {
                            // Unweighted vertex positions.
                            var setupVertices = vertexAttachment.vertices;
                            for (var i = 0; i < vertexCount; i++)
                                deform_1[i] += (setupVertices[i] - deform_1[i]) * alpha;
                        }
                        else {
                            // Weighted deform offsets.
                            alpha = 1 - alpha;
                            for (var i = 0; i < vertexCount; i++)
                                deform_1[i] *= alpha;
                        }
                }
                return;
            }
            var deform = spine.Utils.setArraySize(deformArray, vertexCount);
            if (time >= frames[frames.length - 1]) {
                var lastVertices = frameVertices[frames.length - 1];
                if (alpha == 1) {
                    if (blend == MixBlend.add) {
                        var vertexAttachment = slotAttachment;
                        if (vertexAttachment.bones == null) {
                            // Unweighted vertex positions, with alpha.
                            var setupVertices = vertexAttachment.vertices;
                            for (var i_1 = 0; i_1 < vertexCount; i_1++) {
                                deform[i_1] += lastVertices[i_1] - setupVertices[i_1];
                            }
                        }
                        else {
                            // Weighted deform offsets, with alpha.
                            for (var i_2 = 0; i_2 < vertexCount; i_2++)
                                deform[i_2] += lastVertices[i_2];
                        }
                    }
                    else {
                        spine.Utils.arrayCopy(lastVertices, 0, deform, 0, vertexCount);
                    }
                }
                else {
                    switch (blend) {
                        case MixBlend.setup: {
                            var vertexAttachment_1 = slotAttachment;
                            if (vertexAttachment_1.bones == null) {
                                // Unweighted vertex positions, with alpha.
                                var setupVertices = vertexAttachment_1.vertices;
                                for (var i_3 = 0; i_3 < vertexCount; i_3++) {
                                    var setup = setupVertices[i_3];
                                    deform[i_3] = setup + (lastVertices[i_3] - setup) * alpha;
                                }
                            }
                            else {
                                // Weighted deform offsets, with alpha.
                                for (var i_4 = 0; i_4 < vertexCount; i_4++)
                                    deform[i_4] = lastVertices[i_4] * alpha;
                            }
                            break;
                        }
                        case MixBlend.first:
                        case MixBlend.replace:
                            for (var i_5 = 0; i_5 < vertexCount; i_5++)
                                deform[i_5] += (lastVertices[i_5] - deform[i_5]) * alpha;
                            break;
                        case MixBlend.add:
                            var vertexAttachment = slotAttachment;
                            if (vertexAttachment.bones == null) {
                                // Unweighted vertex positions, with alpha.
                                var setupVertices = vertexAttachment.vertices;
                                for (var i_6 = 0; i_6 < vertexCount; i_6++) {
                                    deform[i_6] += (lastVertices[i_6] - setupVertices[i_6]) * alpha;
                                }
                            }
                            else {
                                // Weighted deform offsets, with alpha.
                                for (var i_7 = 0; i_7 < vertexCount; i_7++)
                                    deform[i_7] += lastVertices[i_7] * alpha;
                            }
                    }
                }
                return;
            }
            // Interpolate between the previous frame and the current frame.
            var frame = Animation.binarySearch(frames, time);
            var prevVertices = frameVertices[frame - 1];
            var nextVertices = frameVertices[frame];
            var frameTime = frames[frame];
            var percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));
            if (alpha == 1) {
                if (blend == MixBlend.add) {
                    var vertexAttachment = slotAttachment;
                    if (vertexAttachment.bones == null) {
                        // Unweighted vertex positions, with alpha.
                        var setupVertices = vertexAttachment.vertices;
                        for (var i_8 = 0; i_8 < vertexCount; i_8++) {
                            var prev = prevVertices[i_8];
                            deform[i_8] += prev + (nextVertices[i_8] - prev) * percent - setupVertices[i_8];
                        }
                    }
                    else {
                        // Weighted deform offsets, with alpha.
                        for (var i_9 = 0; i_9 < vertexCount; i_9++) {
                            var prev = prevVertices[i_9];
                            deform[i_9] += prev + (nextVertices[i_9] - prev) * percent;
                        }
                    }
                }
                else {
                    for (var i_10 = 0; i_10 < vertexCount; i_10++) {
                        var prev = prevVertices[i_10];
                        deform[i_10] = prev + (nextVertices[i_10] - prev) * percent;
                    }
                }
            }
            else {
                switch (blend) {
                    case MixBlend.setup: {
                        var vertexAttachment_2 = slotAttachment;
                        if (vertexAttachment_2.bones == null) {
                            // Unweighted vertex positions, with alpha.
                            var setupVertices = vertexAttachment_2.vertices;
                            for (var i_11 = 0; i_11 < vertexCount; i_11++) {
                                var prev = prevVertices[i_11], setup = setupVertices[i_11];
                                deform[i_11] = setup + (prev + (nextVertices[i_11] - prev) * percent - setup) * alpha;
                            }
                        }
                        else {
                            // Weighted deform offsets, with alpha.
                            for (var i_12 = 0; i_12 < vertexCount; i_12++) {
                                var prev = prevVertices[i_12];
                                deform[i_12] = (prev + (nextVertices[i_12] - prev) * percent) * alpha;
                            }
                        }
                        break;
                    }
                    case MixBlend.first:
                    case MixBlend.replace:
                        for (var i_13 = 0; i_13 < vertexCount; i_13++) {
                            var prev = prevVertices[i_13];
                            deform[i_13] += (prev + (nextVertices[i_13] - prev) * percent - deform[i_13]) * alpha;
                        }
                        break;
                    case MixBlend.add:
                        var vertexAttachment = slotAttachment;
                        if (vertexAttachment.bones == null) {
                            // Unweighted vertex positions, with alpha.
                            var setupVertices = vertexAttachment.vertices;
                            for (var i_14 = 0; i_14 < vertexCount; i_14++) {
                                var prev = prevVertices[i_14];
                                deform[i_14] += (prev + (nextVertices[i_14] - prev) * percent - setupVertices[i_14]) * alpha;
                            }
                        }
                        else {
                            // Weighted deform offsets, with alpha.
                            for (var i_15 = 0; i_15 < vertexCount; i_15++) {
                                var prev = prevVertices[i_15];
                                deform[i_15] += (prev + (nextVertices[i_15] - prev) * percent) * alpha;
                            }
                        }
                }
            }
        };
        return DeformTimeline;
    }(CurveTimeline));
    spine.DeformTimeline = DeformTimeline;
    __reflect(DeformTimeline.prototype, "spine.DeformTimeline");
    /** Fires an {@link Event} when specific animation times are reached. */
    var EventTimeline = (function () {
        function EventTimeline(frameCount) {
            this.frames = spine.Utils.newFloatArray(frameCount);
            this.events = new Array(frameCount);
        }
        EventTimeline.prototype.getPropertyId = function () {
            return TimelineType.event << 24;
        };
        /** The number of key frames for this timeline. */
        EventTimeline.prototype.getFrameCount = function () {
            return this.frames.length;
        };
        /** Sets the time in seconds and the event for the specified key frame. */
        EventTimeline.prototype.setFrame = function (frameIndex, event) {
            this.frames[frameIndex] = event.time;
            this.events[frameIndex] = event;
        };
        /** Fires events for frames > `lastTime` and <= `time`. */
        EventTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            if (firedEvents == null)
                return;
            var frames = this.frames;
            var frameCount = this.frames.length;
            if (lastTime > time) {
                this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, blend, direction);
                lastTime = -1;
            }
            else if (lastTime >= frames[frameCount - 1])
                return;
            if (time < frames[0])
                return; // Time is before first frame.
            var frame = 0;
            if (lastTime < frames[0])
                frame = 0;
            else {
                frame = Animation.binarySearch(frames, lastTime);
                var frameTime = frames[frame];
                while (frame > 0) {
                    if (frames[frame - 1] != frameTime)
                        break;
                    frame--;
                }
            }
            for (; frame < frameCount && time >= frames[frame]; frame++)
                firedEvents.push(this.events[frame]);
        };
        return EventTimeline;
    }());
    spine.EventTimeline = EventTimeline;
    __reflect(EventTimeline.prototype, "spine.EventTimeline", ["spine.Timeline"]);
    /** Changes a skeleton's {@link Skeleton#drawOrder}. */
    var DrawOrderTimeline = (function () {
        function DrawOrderTimeline(frameCount) {
            this.frames = spine.Utils.newFloatArray(frameCount);
            this.drawOrders = new Array(frameCount);
        }
        DrawOrderTimeline.prototype.getPropertyId = function () {
            return TimelineType.drawOrder << 24;
        };
        /** The number of key frames for this timeline. */
        DrawOrderTimeline.prototype.getFrameCount = function () {
            return this.frames.length;
        };
        /** Sets the time in seconds and the draw order for the specified key frame.
         * @param drawOrder For each slot in {@link Skeleton#slots}, the index of the new draw order. May be null to use setup pose
         *           draw order. */
        DrawOrderTimeline.prototype.setFrame = function (frameIndex, time, drawOrder) {
            this.frames[frameIndex] = time;
            this.drawOrders[frameIndex] = drawOrder;
        };
        DrawOrderTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var drawOrder = skeleton.drawOrder;
            var slots = skeleton.slots;
            if (direction == MixDirection.mixOut && blend == MixBlend.setup) {
                spine.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                return;
            }
            var frames = this.frames;
            if (time < frames[0]) {
                if (blend == MixBlend.setup || blend == MixBlend.first)
                    spine.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                return;
            }
            var frame = 0;
            if (time >= frames[frames.length - 1])
                frame = frames.length - 1;
            else
                frame = Animation.binarySearch(frames, time) - 1;
            var drawOrderToSetupIndex = this.drawOrders[frame];
            if (drawOrderToSetupIndex == null)
                spine.Utils.arrayCopy(slots, 0, drawOrder, 0, slots.length);
            else {
                for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++)
                    drawOrder[i] = slots[drawOrderToSetupIndex[i]];
            }
        };
        return DrawOrderTimeline;
    }());
    spine.DrawOrderTimeline = DrawOrderTimeline;
    __reflect(DrawOrderTimeline.prototype, "spine.DrawOrderTimeline", ["spine.Timeline"]);
    /** Changes an IK constraint's {@link IkConstraint#mix}, {@link IkConstraint#softness},
     * {@link IkConstraint#bendDirection}, {@link IkConstraint#stretch}, and {@link IkConstraint#compress}. */
    var IkConstraintTimeline = (function (_super) {
        __extends(IkConstraintTimeline, _super);
        function IkConstraintTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
            return _this;
        }
        IkConstraintTimeline.prototype.getPropertyId = function () {
            return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
        };
        /** Sets the time in seconds, mix, softness, bend direction, compress, and stretch for the specified key frame. */
        IkConstraintTimeline.prototype.setFrame = function (frameIndex, time, mix, softness, bendDirection, compress, stretch) {
            frameIndex *= IkConstraintTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + IkConstraintTimeline.MIX] = mix;
            this.frames[frameIndex + IkConstraintTimeline.SOFTNESS] = softness;
            this.frames[frameIndex + IkConstraintTimeline.BEND_DIRECTION] = bendDirection;
            this.frames[frameIndex + IkConstraintTimeline.COMPRESS] = compress ? 1 : 0;
            this.frames[frameIndex + IkConstraintTimeline.STRETCH] = stretch ? 1 : 0;
        };
        IkConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var frames = this.frames;
            var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
            if (!constraint.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        constraint.mix = constraint.data.mix;
                        constraint.softness = constraint.data.softness;
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                        return;
                    case MixBlend.first:
                        constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
                        constraint.softness += (constraint.data.softness - constraint.softness) * alpha;
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                }
                return;
            }
            if (time >= frames[frames.length - IkConstraintTimeline.ENTRIES]) {
                if (blend == MixBlend.setup) {
                    constraint.mix = constraint.data.mix + (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
                    constraint.softness = constraint.data.softness
                        + (frames[frames.length + IkConstraintTimeline.PREV_SOFTNESS] - constraint.data.softness) * alpha;
                    if (direction == MixDirection.mixOut) {
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                    }
                    else {
                        constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                        constraint.compress = frames[frames.length + IkConstraintTimeline.PREV_COMPRESS] != 0;
                        constraint.stretch = frames[frames.length + IkConstraintTimeline.PREV_STRETCH] != 0;
                    }
                }
                else {
                    constraint.mix += (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
                    constraint.softness += (frames[frames.length + IkConstraintTimeline.PREV_SOFTNESS] - constraint.softness) * alpha;
                    if (direction == MixDirection.mixIn) {
                        constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                        constraint.compress = frames[frames.length + IkConstraintTimeline.PREV_COMPRESS] != 0;
                        constraint.stretch = frames[frames.length + IkConstraintTimeline.PREV_STRETCH] != 0;
                    }
                }
                return;
            }
            // Interpolate between the previous frame and the current frame.
            var frame = Animation.binarySearch(frames, time, IkConstraintTimeline.ENTRIES);
            var mix = frames[frame + IkConstraintTimeline.PREV_MIX];
            var softness = frames[frame + IkConstraintTimeline.PREV_SOFTNESS];
            var frameTime = frames[frame];
            var percent = this.getCurvePercent(frame / IkConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + IkConstraintTimeline.PREV_TIME] - frameTime));
            if (blend == MixBlend.setup) {
                constraint.mix = constraint.data.mix + (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
                constraint.softness = constraint.data.softness
                    + (softness + (frames[frame + IkConstraintTimeline.SOFTNESS] - softness) * percent - constraint.data.softness) * alpha;
                if (direction == MixDirection.mixOut) {
                    constraint.bendDirection = constraint.data.bendDirection;
                    constraint.compress = constraint.data.compress;
                    constraint.stretch = constraint.data.stretch;
                }
                else {
                    constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    constraint.compress = frames[frame + IkConstraintTimeline.PREV_COMPRESS] != 0;
                    constraint.stretch = frames[frame + IkConstraintTimeline.PREV_STRETCH] != 0;
                }
            }
            else {
                constraint.mix += (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
                constraint.softness += (softness + (frames[frame + IkConstraintTimeline.SOFTNESS] - softness) * percent - constraint.softness) * alpha;
                if (direction == MixDirection.mixIn) {
                    constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    constraint.compress = frames[frame + IkConstraintTimeline.PREV_COMPRESS] != 0;
                    constraint.stretch = frames[frame + IkConstraintTimeline.PREV_STRETCH] != 0;
                }
            }
        };
        IkConstraintTimeline.ENTRIES = 6;
        IkConstraintTimeline.PREV_TIME = -6;
        IkConstraintTimeline.PREV_MIX = -5;
        IkConstraintTimeline.PREV_SOFTNESS = -4;
        IkConstraintTimeline.PREV_BEND_DIRECTION = -3;
        IkConstraintTimeline.PREV_COMPRESS = -2;
        IkConstraintTimeline.PREV_STRETCH = -1;
        IkConstraintTimeline.MIX = 1;
        IkConstraintTimeline.SOFTNESS = 2;
        IkConstraintTimeline.BEND_DIRECTION = 3;
        IkConstraintTimeline.COMPRESS = 4;
        IkConstraintTimeline.STRETCH = 5;
        return IkConstraintTimeline;
    }(CurveTimeline));
    spine.IkConstraintTimeline = IkConstraintTimeline;
    __reflect(IkConstraintTimeline.prototype, "spine.IkConstraintTimeline");
    /** Changes a transform constraint's {@link TransformConstraint#rotateMix}, {@link TransformConstraint#translateMix},
     * {@link TransformConstraint#scaleMix}, and {@link TransformConstraint#shearMix}. */
    var TransformConstraintTimeline = (function (_super) {
        __extends(TransformConstraintTimeline, _super);
        function TransformConstraintTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
            return _this;
        }
        TransformConstraintTimeline.prototype.getPropertyId = function () {
            return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
        };
        /** The time in seconds, rotate mix, translate mix, scale mix, and shear mix for the specified key frame. */
        TransformConstraintTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
            frameIndex *= TransformConstraintTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
            this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
            this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
            this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
        };
        TransformConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var frames = this.frames;
            var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
            if (!constraint.active)
                return;
            if (time < frames[0]) {
                var data = constraint.data;
                switch (blend) {
                    case MixBlend.setup:
                        constraint.rotateMix = data.rotateMix;
                        constraint.translateMix = data.translateMix;
                        constraint.scaleMix = data.scaleMix;
                        constraint.shearMix = data.shearMix;
                        return;
                    case MixBlend.first:
                        constraint.rotateMix += (data.rotateMix - constraint.rotateMix) * alpha;
                        constraint.translateMix += (data.translateMix - constraint.translateMix) * alpha;
                        constraint.scaleMix += (data.scaleMix - constraint.scaleMix) * alpha;
                        constraint.shearMix += (data.shearMix - constraint.shearMix) * alpha;
                }
                return;
            }
            var rotate = 0, translate = 0, scale = 0, shear = 0;
            if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
                var i = frames.length;
                rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
                translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
                scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
                shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
            }
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
                rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
                translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
                scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
                shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime));
                rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
                translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
                scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
                shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
            }
            if (blend == MixBlend.setup) {
                var data = constraint.data;
                constraint.rotateMix = data.rotateMix + (rotate - data.rotateMix) * alpha;
                constraint.translateMix = data.translateMix + (translate - data.translateMix) * alpha;
                constraint.scaleMix = data.scaleMix + (scale - data.scaleMix) * alpha;
                constraint.shearMix = data.shearMix + (shear - data.shearMix) * alpha;
            }
            else {
                constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                constraint.translateMix += (translate - constraint.translateMix) * alpha;
                constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
                constraint.shearMix += (shear - constraint.shearMix) * alpha;
            }
        };
        TransformConstraintTimeline.ENTRIES = 5;
        TransformConstraintTimeline.PREV_TIME = -5;
        TransformConstraintTimeline.PREV_ROTATE = -4;
        TransformConstraintTimeline.PREV_TRANSLATE = -3;
        TransformConstraintTimeline.PREV_SCALE = -2;
        TransformConstraintTimeline.PREV_SHEAR = -1;
        TransformConstraintTimeline.ROTATE = 1;
        TransformConstraintTimeline.TRANSLATE = 2;
        TransformConstraintTimeline.SCALE = 3;
        TransformConstraintTimeline.SHEAR = 4;
        return TransformConstraintTimeline;
    }(CurveTimeline));
    spine.TransformConstraintTimeline = TransformConstraintTimeline;
    __reflect(TransformConstraintTimeline.prototype, "spine.TransformConstraintTimeline");
    /** Changes a path constraint's {@link PathConstraint#position}. */
    var PathConstraintPositionTimeline = (function (_super) {
        __extends(PathConstraintPositionTimeline, _super);
        function PathConstraintPositionTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
            return _this;
        }
        PathConstraintPositionTimeline.prototype.getPropertyId = function () {
            return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
        };
        /** Sets the time in seconds and path constraint position for the specified key frame. */
        PathConstraintPositionTimeline.prototype.setFrame = function (frameIndex, time, value) {
            frameIndex *= PathConstraintPositionTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
        };
        PathConstraintPositionTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var frames = this.frames;
            var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (!constraint.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        constraint.position = constraint.data.position;
                        return;
                    case MixBlend.first:
                        constraint.position += (constraint.data.position - constraint.position) * alpha;
                }
                return;
            }
            var position = 0;
            if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES])
                position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
                position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime));
                position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
            }
            if (blend == MixBlend.setup)
                constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;
            else
                constraint.position += (position - constraint.position) * alpha;
        };
        PathConstraintPositionTimeline.ENTRIES = 2;
        PathConstraintPositionTimeline.PREV_TIME = -2;
        PathConstraintPositionTimeline.PREV_VALUE = -1;
        PathConstraintPositionTimeline.VALUE = 1;
        return PathConstraintPositionTimeline;
    }(CurveTimeline));
    spine.PathConstraintPositionTimeline = PathConstraintPositionTimeline;
    __reflect(PathConstraintPositionTimeline.prototype, "spine.PathConstraintPositionTimeline");
    /** Changes a path constraint's {@link PathConstraint#spacing}. */
    var PathConstraintSpacingTimeline = (function (_super) {
        __extends(PathConstraintSpacingTimeline, _super);
        function PathConstraintSpacingTimeline(frameCount) {
            return _super.call(this, frameCount) || this;
        }
        PathConstraintSpacingTimeline.prototype.getPropertyId = function () {
            return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
        };
        PathConstraintSpacingTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var frames = this.frames;
            var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (!constraint.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        constraint.spacing = constraint.data.spacing;
                        return;
                    case MixBlend.first:
                        constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
                }
                return;
            }
            var spacing = 0;
            if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES])
                spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
                spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime));
                spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
            }
            if (blend == MixBlend.setup)
                constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;
            else
                constraint.spacing += (spacing - constraint.spacing) * alpha;
        };
        return PathConstraintSpacingTimeline;
    }(PathConstraintPositionTimeline));
    spine.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;
    __reflect(PathConstraintSpacingTimeline.prototype, "spine.PathConstraintSpacingTimeline");
    /** Changes a transform constraint's {@link PathConstraint#rotateMix} and
     * {@link TransformConstraint#translateMix}. */
    var PathConstraintMixTimeline = (function (_super) {
        __extends(PathConstraintMixTimeline, _super);
        function PathConstraintMixTimeline(frameCount) {
            var _this = _super.call(this, frameCount) || this;
            _this.frames = spine.Utils.newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
            return _this;
        }
        PathConstraintMixTimeline.prototype.getPropertyId = function () {
            return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
        };
        /** The time in seconds, rotate mix, and translate mix for the specified key frame. */
        PathConstraintMixTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix) {
            frameIndex *= PathConstraintMixTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
            this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
        };
        PathConstraintMixTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var frames = this.frames;
            var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (!constraint.active)
                return;
            if (time < frames[0]) {
                switch (blend) {
                    case MixBlend.setup:
                        constraint.rotateMix = constraint.data.rotateMix;
                        constraint.translateMix = constraint.data.translateMix;
                        return;
                    case MixBlend.first:
                        constraint.rotateMix += (constraint.data.rotateMix - constraint.rotateMix) * alpha;
                        constraint.translateMix += (constraint.data.translateMix - constraint.translateMix) * alpha;
                }
                return;
            }
            var rotate = 0, translate = 0;
            if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
                rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
                translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
            }
            else {
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
                rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
                translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime));
                rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
                translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
            }
            if (blend == MixBlend.setup) {
                constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
                constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
            }
            else {
                constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                constraint.translateMix += (translate - constraint.translateMix) * alpha;
            }
        };
        PathConstraintMixTimeline.ENTRIES = 3;
        PathConstraintMixTimeline.PREV_TIME = -3;
        PathConstraintMixTimeline.PREV_ROTATE = -2;
        PathConstraintMixTimeline.PREV_TRANSLATE = -1;
        PathConstraintMixTimeline.ROTATE = 1;
        PathConstraintMixTimeline.TRANSLATE = 2;
        return PathConstraintMixTimeline;
    }(CurveTimeline));
    spine.PathConstraintMixTimeline = PathConstraintMixTimeline;
    __reflect(PathConstraintMixTimeline.prototype, "spine.PathConstraintMixTimeline");
})(spine || (spine = {}));
