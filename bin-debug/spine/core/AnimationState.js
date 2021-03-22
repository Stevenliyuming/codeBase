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
var spine;
(function (spine) {
    /** Applies animations over time, queues animations for later playback, mixes (crossfading) between animations, and applies
     * multiple animations on top of each other (layering).
     *
     * See [Applying Animations](http://esotericsoftware.com/spine-applying-animations/) in the Spine Runtimes Guide. */
    var AnimationState = (function () {
        function AnimationState(data) {
            /** The list of tracks that currently have animations, which may contain null entries. */
            this.tracks = new Array();
            /** Multiplier for the delta time when the animation state is updated, causing time for all animations and mixes to play slower
             * or faster. Defaults to 1.
             *
             * See TrackEntry {@link TrackEntry#timeScale} for affecting a single animation. */
            this.timeScale = 1;
            this.events = new Array();
            this.listeners = new Array();
            this.queue = new EventQueue(this);
            this.propertyIDs = new spine.IntSet();
            this.animationsChanged = false;
            this.trackEntryPool = new spine.Pool(function () { return new TrackEntry(); });
            this.data = data;
        }
        /** Increments each track entry {@link TrackEntry#trackTime()}, setting queued animations as current if needed. */
        AnimationState.prototype.update = function (delta) {
            delta *= this.timeScale;
            var tracks = this.tracks;
            for (var i = 0, n = tracks.length; i < n; i++) {
                var current = tracks[i];
                if (current == null)
                    continue;
                current.animationLast = current.nextAnimationLast;
                current.trackLast = current.nextTrackLast;
                var currentDelta = delta * current.timeScale;
                if (current.delay > 0) {
                    current.delay -= currentDelta;
                    if (current.delay > 0)
                        continue;
                    currentDelta = -current.delay;
                    current.delay = 0;
                }
                var next = current.next;
                if (next != null) {
                    // When the next entry's delay is passed, change to the next entry, preserving leftover time.
                    var nextTime = current.trackLast - next.delay;
                    if (nextTime >= 0) {
                        next.delay = 0;
                        next.trackTime += current.timeScale == 0 ? 0 : (nextTime / current.timeScale + delta) * next.timeScale;
                        current.trackTime += currentDelta;
                        this.setCurrent(i, next, true);
                        while (next.mixingFrom != null) {
                            next.mixTime += delta;
                            next = next.mixingFrom;
                        }
                        continue;
                    }
                }
                else if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
                    tracks[i] = null;
                    this.queue.end(current);
                    this.disposeNext(current);
                    continue;
                }
                if (current.mixingFrom != null && this.updateMixingFrom(current, delta)) {
                    // End mixing from entries once all have completed.
                    var from = current.mixingFrom;
                    current.mixingFrom = null;
                    if (from != null)
                        from.mixingTo = null;
                    while (from != null) {
                        this.queue.end(from);
                        from = from.mixingFrom;
                    }
                }
                current.trackTime += currentDelta;
            }
            this.queue.drain();
        };
        /** Returns true when all mixing from entries are complete. */
        AnimationState.prototype.updateMixingFrom = function (to, delta) {
            var from = to.mixingFrom;
            if (from == null)
                return true;
            var finished = this.updateMixingFrom(from, delta);
            from.animationLast = from.nextAnimationLast;
            from.trackLast = from.nextTrackLast;
            // Require mixTime > 0 to ensure the mixing from entry was applied at least once.
            if (to.mixTime > 0 && to.mixTime >= to.mixDuration) {
                // Require totalAlpha == 0 to ensure mixing is complete, unless mixDuration == 0 (the transition is a single frame).
                if (from.totalAlpha == 0 || to.mixDuration == 0) {
                    to.mixingFrom = from.mixingFrom;
                    if (from.mixingFrom != null)
                        from.mixingFrom.mixingTo = to;
                    to.interruptAlpha = from.interruptAlpha;
                    this.queue.end(from);
                }
                return finished;
            }
            from.trackTime += delta * from.timeScale;
            to.mixTime += delta;
            return false;
        };
        /** Poses the skeleton using the track entry animations. There are no side effects other than invoking listeners, so the
         * animation state can be applied to multiple skeletons to pose them identically.
         * @returns True if any animations were applied. */
        AnimationState.prototype.apply = function (skeleton) {
            if (skeleton == null)
                throw new Error("skeleton cannot be null.");
            if (this.animationsChanged)
                this._animationsChanged();
            var events = this.events;
            var tracks = this.tracks;
            var applied = false;
            for (var i = 0, n = tracks.length; i < n; i++) {
                var current = tracks[i];
                if (current == null || current.delay > 0)
                    continue;
                applied = true;
                var blend = i == 0 ? spine.MixBlend.first : current.mixBlend;
                // Apply mixing from entries first.
                var mix = current.alpha;
                if (current.mixingFrom != null)
                    mix *= this.applyMixingFrom(current, skeleton, blend);
                else if (current.trackTime >= current.trackEnd && current.next == null)
                    mix = 0;
                // Apply current entry.
                var animationLast = current.animationLast, animationTime = current.getAnimationTime();
                var timelineCount = current.animation.timelines.length;
                var timelines = current.animation.timelines;
                if ((i == 0 && mix == 1) || blend == spine.MixBlend.add) {
                    for (var ii = 0; ii < timelineCount; ii++) {
                        // Fixes issue #302 on IOS9 where mix, blend sometimes became undefined and caused assets
                        // to sometimes stop rendering when using color correction, as their RGBA values become NaN.
                        // (https://github.com/pixijs/pixi-spine/issues/302)
                        spine.Utils.webkit602BugfixHelper(mix, blend);
                        timelines[ii].apply(skeleton, animationLast, animationTime, events, mix, blend, spine.MixDirection.mixIn);
                    }
                }
                else {
                    var timelineMode = current.timelineMode;
                    var firstFrame = current.timelinesRotation.length == 0;
                    if (firstFrame)
                        spine.Utils.setArraySize(current.timelinesRotation, timelineCount << 1, null);
                    var timelinesRotation = current.timelinesRotation;
                    for (var ii = 0; ii < timelineCount; ii++) {
                        var timeline = timelines[ii];
                        var timelineBlend = (timelineMode[ii] & (AnimationState.NOT_LAST - 1)) == AnimationState.SUBSEQUENT ? blend : spine.MixBlend.setup;
                        if (timeline instanceof spine.RotateTimeline) {
                            this.applyRotateTimeline(timeline, skeleton, animationTime, mix, timelineBlend, timelinesRotation, ii << 1, firstFrame);
                        }
                        else {
                            // This fixes the WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
                            spine.Utils.webkit602BugfixHelper(mix, blend);
                            timeline.apply(skeleton, animationLast, animationTime, events, mix, timelineBlend, spine.MixDirection.mixIn);
                        }
                    }
                }
                this.queueEvents(current, animationTime);
                events.length = 0;
                current.nextAnimationLast = animationTime;
                current.nextTrackLast = current.trackTime;
            }
            this.queue.drain();
            return applied;
        };
        AnimationState.prototype.applyMixingFrom = function (to, skeleton, blend) {
            var from = to.mixingFrom;
            if (from.mixingFrom != null)
                this.applyMixingFrom(from, skeleton, blend);
            var mix = 0;
            if (to.mixDuration == 0) {
                mix = 1;
                if (blend == spine.MixBlend.first)
                    blend = spine.MixBlend.setup;
            }
            else {
                mix = to.mixTime / to.mixDuration;
                if (mix > 1)
                    mix = 1;
                if (blend != spine.MixBlend.first)
                    blend = from.mixBlend;
            }
            var events = mix < from.eventThreshold ? this.events : null;
            var attachments = mix < from.attachmentThreshold, drawOrder = mix < from.drawOrderThreshold;
            var animationLast = from.animationLast, animationTime = from.getAnimationTime();
            var timelineCount = from.animation.timelines.length;
            var timelines = from.animation.timelines;
            var alphaHold = from.alpha * to.interruptAlpha, alphaMix = alphaHold * (1 - mix);
            if (blend == spine.MixBlend.add) {
                for (var i = 0; i < timelineCount; i++)
                    timelines[i].apply(skeleton, animationLast, animationTime, events, alphaMix, blend, spine.MixDirection.mixOut);
            }
            else {
                var timelineMode = from.timelineMode;
                var timelineHoldMix = from.timelineHoldMix;
                var firstFrame = from.timelinesRotation.length == 0;
                if (firstFrame)
                    spine.Utils.setArraySize(from.timelinesRotation, timelineCount << 1, null);
                var timelinesRotation = from.timelinesRotation;
                from.totalAlpha = 0;
                for (var i = 0; i < timelineCount; i++) {
                    var timeline = timelines[i];
                    var direction = spine.MixDirection.mixOut;
                    var timelineBlend = void 0;
                    var alpha = 0;
                    switch (timelineMode[i] & (AnimationState.NOT_LAST - 1)) {
                        case AnimationState.SUBSEQUENT:
                            timelineBlend = blend;
                            if (!attachments && timeline instanceof spine.AttachmentTimeline) {
                                if ((timelineMode[i] & AnimationState.NOT_LAST) == AnimationState.NOT_LAST)
                                    continue;
                                timelineBlend = spine.MixBlend.setup;
                            }
                            if (!drawOrder && timeline instanceof spine.DrawOrderTimeline)
                                continue;
                            alpha = alphaMix;
                            break;
                        case AnimationState.FIRST:
                            timelineBlend = spine.MixBlend.setup;
                            alpha = alphaMix;
                            break;
                        case AnimationState.HOLD:
                            timelineBlend = spine.MixBlend.setup;
                            alpha = alphaHold;
                            break;
                        default:
                            timelineBlend = spine.MixBlend.setup;
                            var holdMix = timelineHoldMix[i];
                            alpha = alphaHold * Math.max(0, 1 - holdMix.mixTime / holdMix.mixDuration);
                            break;
                    }
                    from.totalAlpha += alpha;
                    if (timeline instanceof spine.RotateTimeline)
                        this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, timelineBlend, timelinesRotation, i << 1, firstFrame);
                    else {
                        // This fixes the WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
                        spine.Utils.webkit602BugfixHelper(alpha, blend);
                        if (timelineBlend == spine.MixBlend.setup) {
                            if (timeline instanceof spine.AttachmentTimeline) {
                                if (attachments || (timelineMode[i] & AnimationState.NOT_LAST) == AnimationState.NOT_LAST)
                                    direction = spine.MixDirection.mixIn;
                            }
                            else if (timeline instanceof spine.DrawOrderTimeline) {
                                if (drawOrder)
                                    direction = spine.MixDirection.mixIn;
                            }
                        }
                        timeline.apply(skeleton, animationLast, animationTime, events, alpha, timelineBlend, direction);
                    }
                }
            }
            if (to.mixDuration > 0)
                this.queueEvents(from, animationTime);
            this.events.length = 0;
            from.nextAnimationLast = animationTime;
            from.nextTrackLast = from.trackTime;
            return mix;
        };
        AnimationState.prototype.applyRotateTimeline = function (timeline, skeleton, time, alpha, blend, timelinesRotation, i, firstFrame) {
            if (firstFrame)
                timelinesRotation[i] = 0;
            if (alpha == 1) {
                timeline.apply(skeleton, 0, time, null, 1, blend, spine.MixDirection.mixIn);
                return;
            }
            var rotateTimeline = timeline;
            var frames = rotateTimeline.frames;
            var bone = skeleton.bones[rotateTimeline.boneIndex];
            if (!bone.active)
                return;
            var r1 = 0, r2 = 0;
            if (time < frames[0]) {
                switch (blend) {
                    case spine.MixBlend.setup:
                        bone.rotation = bone.data.rotation;
                    default:
                        return;
                    case spine.MixBlend.first:
                        r1 = bone.rotation;
                        r2 = bone.data.rotation;
                }
            }
            else {
                r1 = blend == spine.MixBlend.setup ? bone.data.rotation : bone.rotation;
                if (time >= frames[frames.length - spine.RotateTimeline.ENTRIES])
                    r2 = bone.data.rotation + frames[frames.length + spine.RotateTimeline.PREV_ROTATION];
                else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = spine.Animation.binarySearch(frames, time, spine.RotateTimeline.ENTRIES);
                    var prevRotation = frames[frame + spine.RotateTimeline.PREV_ROTATION];
                    var frameTime = frames[frame];
                    var percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + spine.RotateTimeline.PREV_TIME] - frameTime));
                    r2 = frames[frame + spine.RotateTimeline.ROTATION] - prevRotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                    r2 = prevRotation + r2 * percent + bone.data.rotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                }
            }
            // Mix between rotations using the direction of the shortest route on the first frame while detecting crosses.
            var total = 0, diff = r2 - r1;
            diff -= (16384 - ((16384.499999999996 - diff / 360) | 0)) * 360;
            if (diff == 0) {
                total = timelinesRotation[i];
            }
            else {
                var lastTotal = 0, lastDiff = 0;
                if (firstFrame) {
                    lastTotal = 0;
                    lastDiff = diff;
                }
                else {
                    lastTotal = timelinesRotation[i]; // Angle and direction of mix, including loops.
                    lastDiff = timelinesRotation[i + 1]; // Difference between bones.
                }
                var current = diff > 0, dir = lastTotal >= 0;
                // Detect cross at 0 (not 180).
                if (spine.MathUtils.signum(lastDiff) != spine.MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                    // A cross after a 360 rotation is a loop.
                    if (Math.abs(lastTotal) > 180)
                        lastTotal += 360 * spine.MathUtils.signum(lastTotal);
                    dir = current;
                }
                total = diff + lastTotal - lastTotal % 360; // Store loops as part of lastTotal.
                if (dir != current)
                    total += 360 * spine.MathUtils.signum(lastTotal);
                timelinesRotation[i] = total;
            }
            timelinesRotation[i + 1] = diff;
            r1 += total * alpha;
            bone.rotation = r1 - (16384 - ((16384.499999999996 - r1 / 360) | 0)) * 360;
        };
        AnimationState.prototype.queueEvents = function (entry, animationTime) {
            var animationStart = entry.animationStart, animationEnd = entry.animationEnd;
            var duration = animationEnd - animationStart;
            var trackLastWrapped = entry.trackLast % duration;
            // Queue events before complete.
            var events = this.events;
            var i = 0, n = events.length;
            for (; i < n; i++) {
                var event_1 = events[i];
                if (event_1.time < trackLastWrapped)
                    break;
                if (event_1.time > animationEnd)
                    continue; // Discard events outside animation start/end.
                this.queue.event(entry, event_1);
            }
            // Queue complete if completed a loop iteration or the animation.
            var complete = false;
            if (entry.loop)
                complete = duration == 0 || trackLastWrapped > entry.trackTime % duration;
            else
                complete = animationTime >= animationEnd && entry.animationLast < animationEnd;
            if (complete)
                this.queue.complete(entry);
            // Queue events after complete.
            for (; i < n; i++) {
                var event_2 = events[i];
                if (event_2.time < animationStart)
                    continue; // Discard events outside animation start/end.
                this.queue.event(entry, events[i]);
            }
        };
        /** Removes all animations from all tracks, leaving skeletons in their current pose.
         *
         * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
         * rather than leaving them in their current pose. */
        AnimationState.prototype.clearTracks = function () {
            var oldDrainDisabled = this.queue.drainDisabled;
            this.queue.drainDisabled = true;
            for (var i = 0, n = this.tracks.length; i < n; i++)
                this.clearTrack(i);
            this.tracks.length = 0;
            this.queue.drainDisabled = oldDrainDisabled;
            this.queue.drain();
        };
        /** Removes all animations from the track, leaving skeletons in their current pose.
         *
         * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
         * rather than leaving them in their current pose. */
        AnimationState.prototype.clearTrack = function (trackIndex) {
            if (trackIndex >= this.tracks.length)
                return;
            var current = this.tracks[trackIndex];
            if (current == null)
                return;
            this.queue.end(current);
            this.disposeNext(current);
            var entry = current;
            while (true) {
                var from = entry.mixingFrom;
                if (from == null)
                    break;
                this.queue.end(from);
                entry.mixingFrom = null;
                entry.mixingTo = null;
                entry = from;
            }
            this.tracks[current.trackIndex] = null;
            this.queue.drain();
        };
        AnimationState.prototype.setCurrent = function (index, current, interrupt) {
            var from = this.expandToIndex(index);
            this.tracks[index] = current;
            if (from != null) {
                if (interrupt)
                    this.queue.interrupt(from);
                current.mixingFrom = from;
                from.mixingTo = current;
                current.mixTime = 0;
                // Store the interrupted mix percentage.
                if (from.mixingFrom != null && from.mixDuration > 0)
                    current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
                from.timelinesRotation.length = 0; // Reset rotation for mixing out, in case entry was mixed in.
            }
            this.queue.start(current);
        };
        /** Sets an animation by name.
        *
        * {@link #setAnimationWith(}. */
        AnimationState.prototype.setAnimation = function (trackIndex, animationName, loop) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (animation == null)
                throw new Error("Animation not found: " + animationName);
            return this.setAnimationWith(trackIndex, animation, loop);
        };
        /** Sets the current animation for a track, discarding any queued animations. If the formerly current track entry was never
         * applied to a skeleton, it is replaced (not mixed from).
         * @param loop If true, the animation will repeat. If false it will not, instead its last frame is applied if played beyond its
         *           duration. In either case {@link TrackEntry#trackEnd} determines when the track is cleared.
         * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
         *         after the {@link AnimationStateListener#dispose()} event occurs. */
        AnimationState.prototype.setAnimationWith = function (trackIndex, animation, loop) {
            if (animation == null)
                throw new Error("animation cannot be null.");
            var interrupt = true;
            var current = this.expandToIndex(trackIndex);
            if (current != null) {
                if (current.nextTrackLast == -1) {
                    // Don't mix from an entry that was never applied.
                    this.tracks[trackIndex] = current.mixingFrom;
                    this.queue.interrupt(current);
                    this.queue.end(current);
                    this.disposeNext(current);
                    current = current.mixingFrom;
                    interrupt = false;
                }
                else
                    this.disposeNext(current);
            }
            var entry = this.trackEntry(trackIndex, animation, loop, current);
            this.setCurrent(trackIndex, entry, interrupt);
            this.queue.drain();
            return entry;
        };
        /** Queues an animation by name.
         *
         * See {@link #addAnimationWith()}. */
        AnimationState.prototype.addAnimation = function (trackIndex, animationName, loop, delay) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (animation == null)
                throw new Error("Animation not found: " + animationName);
            return this.addAnimationWith(trackIndex, animation, loop, delay);
        };
        /** Adds an animation to be played after the current or last queued animation for a track. If the track is empty, it is
         * equivalent to calling {@link #setAnimationWith()}.
         * @param delay If > 0, sets {@link TrackEntry#delay}. If <= 0, the delay set is the duration of the previous track entry
         *           minus any mix duration (from the {@link AnimationStateData}) plus the specified `delay` (ie the mix
         *           ends at (`delay` = 0) or before (`delay` < 0) the previous track entry duration). If the
         *           previous entry is looping, its next loop completion is used instead of its duration.
         * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
         *         after the {@link AnimationStateListener#dispose()} event occurs. */
        AnimationState.prototype.addAnimationWith = function (trackIndex, animation, loop, delay) {
            if (animation == null)
                throw new Error("animation cannot be null.");
            var last = this.expandToIndex(trackIndex);
            if (last != null) {
                while (last.next != null)
                    last = last.next;
            }
            var entry = this.trackEntry(trackIndex, animation, loop, last);
            if (last == null) {
                this.setCurrent(trackIndex, entry, true);
                this.queue.drain();
            }
            else {
                last.next = entry;
                if (delay <= 0) {
                    var duration = last.animationEnd - last.animationStart;
                    if (duration != 0) {
                        if (last.loop)
                            delay += duration * (1 + ((last.trackTime / duration) | 0));
                        else
                            delay += Math.max(duration, last.trackTime);
                        delay -= this.data.getMix(last.animation, animation);
                    }
                    else
                        delay = last.trackTime;
                }
            }
            entry.delay = delay;
            return entry;
        };
        /** Sets an empty animation for a track, discarding any queued animations, and sets the track entry's
         * {@link TrackEntry#mixduration}. An empty animation has no timelines and serves as a placeholder for mixing in or out.
         *
         * Mixing out is done by setting an empty animation with a mix duration using either {@link #setEmptyAnimation()},
         * {@link #setEmptyAnimations()}, or {@link #addEmptyAnimation()}. Mixing to an empty animation causes
         * the previous animation to be applied less and less over the mix duration. Properties keyed in the previous animation
         * transition to the value from lower tracks or to the setup pose value if no lower tracks key the property. A mix duration of
         * 0 still mixes out over one frame.
         *
         * Mixing in is done by first setting an empty animation, then adding an animation using
         * {@link #addAnimation()} and on the returned track entry, set the
         * {@link TrackEntry#setMixDuration()}. Mixing from an empty animation causes the new animation to be applied more and
         * more over the mix duration. Properties keyed in the new animation transition from the value from lower tracks or from the
         * setup pose value if no lower tracks key the property to the value keyed in the new animation. */
        AnimationState.prototype.setEmptyAnimation = function (trackIndex, mixDuration) {
            var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
            entry.mixDuration = mixDuration;
            entry.trackEnd = mixDuration;
            return entry;
        };
        /** Adds an empty animation to be played after the current or last queued animation for a track, and sets the track entry's
         * {@link TrackEntry#mixDuration}. If the track is empty, it is equivalent to calling
         * {@link #setEmptyAnimation()}.
         *
         * See {@link #setEmptyAnimation()}.
         * @param delay If > 0, sets {@link TrackEntry#delay}. If <= 0, the delay set is the duration of the previous track entry
         *           minus any mix duration plus the specified `delay` (ie the mix ends at (`delay` = 0) or
         *           before (`delay` < 0) the previous track entry duration). If the previous entry is looping, its next
         *           loop completion is used instead of its duration.
         * @return A track entry to allow further customization of animation playback. References to the track entry must not be kept
         *         after the {@link AnimationStateListener#dispose()} event occurs. */
        AnimationState.prototype.addEmptyAnimation = function (trackIndex, mixDuration, delay) {
            if (delay <= 0)
                delay -= mixDuration;
            var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
            entry.mixDuration = mixDuration;
            entry.trackEnd = mixDuration;
            return entry;
        };
        /** Sets an empty animation for every track, discarding any queued animations, and mixes to it over the specified mix
        * duration. */
        AnimationState.prototype.setEmptyAnimations = function (mixDuration) {
            var oldDrainDisabled = this.queue.drainDisabled;
            this.queue.drainDisabled = true;
            for (var i = 0, n = this.tracks.length; i < n; i++) {
                var current = this.tracks[i];
                if (current != null)
                    this.setEmptyAnimation(current.trackIndex, mixDuration);
            }
            this.queue.drainDisabled = oldDrainDisabled;
            this.queue.drain();
        };
        AnimationState.prototype.expandToIndex = function (index) {
            if (index < this.tracks.length)
                return this.tracks[index];
            spine.Utils.ensureArrayCapacity(this.tracks, index + 1, null);
            this.tracks.length = index + 1;
            return null;
        };
        /** @param last May be null. */
        AnimationState.prototype.trackEntry = function (trackIndex, animation, loop, last) {
            var entry = this.trackEntryPool.obtain();
            entry.trackIndex = trackIndex;
            entry.animation = animation;
            entry.loop = loop;
            entry.holdPrevious = false;
            entry.eventThreshold = 0;
            entry.attachmentThreshold = 0;
            entry.drawOrderThreshold = 0;
            entry.animationStart = 0;
            entry.animationEnd = animation.duration;
            entry.animationLast = -1;
            entry.nextAnimationLast = -1;
            entry.delay = 0;
            entry.trackTime = 0;
            entry.trackLast = -1;
            entry.nextTrackLast = -1;
            entry.trackEnd = Number.MAX_VALUE;
            entry.timeScale = 1;
            entry.alpha = 1;
            entry.interruptAlpha = 1;
            entry.mixTime = 0;
            entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
            entry.mixBlend = spine.MixBlend.replace;
            return entry;
        };
        AnimationState.prototype.disposeNext = function (entry) {
            var next = entry.next;
            while (next != null) {
                this.queue.dispose(next);
                next = next.next;
            }
            entry.next = null;
        };
        AnimationState.prototype._animationsChanged = function () {
            this.animationsChanged = false;
            this.propertyIDs.clear();
            for (var i = 0, n = this.tracks.length; i < n; i++) {
                var entry = this.tracks[i];
                if (entry == null)
                    continue;
                while (entry.mixingFrom != null)
                    entry = entry.mixingFrom;
                do {
                    if (entry.mixingFrom == null || entry.mixBlend != spine.MixBlend.add)
                        this.computeHold(entry);
                    entry = entry.mixingTo;
                } while (entry != null);
            }
            this.propertyIDs.clear();
            for (var i = this.tracks.length - 1; i >= 0; i--) {
                var entry = this.tracks[i];
                while (entry != null) {
                    this.computeNotLast(entry);
                    entry = entry.mixingFrom;
                }
            }
        };
        AnimationState.prototype.computeHold = function (entry) {
            var to = entry.mixingTo;
            var timelines = entry.animation.timelines;
            var timelinesCount = entry.animation.timelines.length;
            var timelineMode = spine.Utils.setArraySize(entry.timelineMode, timelinesCount);
            entry.timelineHoldMix.length = 0;
            var timelineDipMix = spine.Utils.setArraySize(entry.timelineHoldMix, timelinesCount);
            var propertyIDs = this.propertyIDs;
            if (to != null && to.holdPrevious) {
                for (var i = 0; i < timelinesCount; i++) {
                    propertyIDs.add(timelines[i].getPropertyId());
                    timelineMode[i] = AnimationState.HOLD;
                }
                return;
            }
            outer: for (var i = 0; i < timelinesCount; i++) {
                var timeline = timelines[i];
                var id = timeline.getPropertyId();
                if (!propertyIDs.add(id))
                    timelineMode[i] = AnimationState.SUBSEQUENT;
                else if (to == null || timeline instanceof spine.AttachmentTimeline || timeline instanceof spine.DrawOrderTimeline
                    || timeline instanceof spine.EventTimeline || !to.animation.hasTimeline(id)) {
                    timelineMode[i] = AnimationState.FIRST;
                }
                else {
                    for (var next = to.mixingTo; next != null; next = next.mixingTo) {
                        if (next.animation.hasTimeline(id))
                            continue;
                        if (entry.mixDuration > 0) {
                            timelineMode[i] = AnimationState.HOLD_MIX;
                            timelineDipMix[i] = next;
                            continue outer;
                        }
                        break;
                    }
                    timelineMode[i] = AnimationState.HOLD;
                }
            }
        };
        AnimationState.prototype.computeNotLast = function (entry) {
            var timelines = entry.animation.timelines;
            var timelinesCount = entry.animation.timelines.length;
            var timelineMode = entry.timelineMode;
            var propertyIDs = this.propertyIDs;
            for (var i = 0; i < timelinesCount; i++) {
                if (timelines[i] instanceof spine.AttachmentTimeline) {
                    var timeline = timelines[i];
                    if (!propertyIDs.add(timeline.slotIndex))
                        timelineMode[i] |= AnimationState.NOT_LAST;
                }
            }
        };
        /** Returns the track entry for the animation currently playing on the track, or null if no animation is currently playing. */
        AnimationState.prototype.getCurrent = function (trackIndex) {
            if (trackIndex >= this.tracks.length)
                return null;
            return this.tracks[trackIndex];
        };
        /** Adds a listener to receive events for all track entries. */
        AnimationState.prototype.addListener = function (listener) {
            if (listener == null)
                throw new Error("listener cannot be null.");
            this.listeners.push(listener);
        };
        /** Removes the listener added with {@link #addListener()}. */
        AnimationState.prototype.removeListener = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index >= 0)
                this.listeners.splice(index, 1);
        };
        /** Removes all listeners added with {@link #addListener()}. */
        AnimationState.prototype.clearListeners = function () {
            this.listeners.length = 0;
        };
        /** Discards all listener notifications that have not yet been delivered. This can be useful to call from an
         * {@link AnimationStateListener} when it is known that further notifications that may have been already queued for delivery
         * are not wanted because new animations are being set. */
        AnimationState.prototype.clearListenerNotifications = function () {
            this.queue.clear();
        };
        AnimationState.emptyAnimation = new spine.Animation("<empty>", [], 0);
        /** 1. A previously applied timeline has set this property.
         *
         * Result: Mix from the current pose to the timeline pose. */
        AnimationState.SUBSEQUENT = 0;
        /** 1. This is the first timeline to set this property.
         * 2. The next track entry applied after this one does not have a timeline to set this property.
         *
         * Result: Mix from the setup pose to the timeline pose. */
        AnimationState.FIRST = 1;
        /** 1. This is the first timeline to set this property.
         * 2. The next track entry to be applied does have a timeline to set this property.
         * 3. The next track entry after that one does not have a timeline to set this property.
         *
         * Result: Mix from the setup pose to the timeline pose, but do not mix out. This avoids "dipping" when crossfading animations
         * that key the same property. A subsequent timeline will set this property using a mix. */
        AnimationState.HOLD = 2;
        /** 1. This is the first timeline to set this property.
         * 2. The next track entry to be applied does have a timeline to set this property.
         * 3. The next track entry after that one does have a timeline to set this property.
         * 4. timelineHoldMix stores the first subsequent track entry that does not have a timeline to set this property.
         *
         * Result: The same as HOLD except the mix percentage from the timelineHoldMix track entry is used. This handles when more than
         * 2 track entries in a row have a timeline that sets the same property.
         *
         * Eg, A -> B -> C -> D where A, B, and C have a timeline setting same property, but D does not. When A is applied, to avoid
         * "dipping" A is not mixed out, however D (the first entry that doesn't set the property) mixing in is used to mix out A
         * (which affects B and C). Without using D to mix out, A would be applied fully until mixing completes, then snap into
         * place. */
        AnimationState.HOLD_MIX = 3;
        /** 1. An attachment timeline in a subsequent track entry sets the attachment for the same slot as this attachment
         * timeline.
         *
         * Result: This attachment timeline will not use MixDirection.out, which would otherwise show the setup mode attachment (or
         * none if not visible in setup mode). This allows deform timelines to be applied for the subsequent entry to mix from, rather
         * than mixing from the setup pose. */
        AnimationState.NOT_LAST = 4;
        return AnimationState;
    }());
    spine.AnimationState = AnimationState;
    __reflect(AnimationState.prototype, "spine.AnimationState");
    /** Stores settings and other state for the playback of an animation on an {@link AnimationState} track.
     *
     * References to a track entry must not be kept after the {@link AnimationStateListener#dispose()} event occurs. */
    var TrackEntry = (function () {
        function TrackEntry() {
            /** Controls how properties keyed in the animation are mixed with lower tracks. Defaults to {@link MixBlend#replace}, which
             * replaces the values from the lower tracks with the animation values. {@link MixBlend#add} adds the animation values to
             * the values from the lower tracks.
             *
             * The `mixBlend` can be set for a new track entry only before {@link AnimationState#apply()} is first
             * called. */
            this.mixBlend = spine.MixBlend.replace;
            this.timelineMode = new Array();
            this.timelineHoldMix = new Array();
            this.timelinesRotation = new Array();
        }
        TrackEntry.prototype.reset = function () {
            this.next = null;
            this.mixingFrom = null;
            this.mixingTo = null;
            this.animation = null;
            this.listener = null;
            this.timelineMode.length = 0;
            this.timelineHoldMix.length = 0;
            this.timelinesRotation.length = 0;
        };
        /** Uses {@link #trackTime} to compute the `animationTime`, which is between {@link #animationStart}
         * and {@link #animationEnd}. When the `trackTime` is 0, the `animationTime` is equal to the
         * `animationStart` time. */
        TrackEntry.prototype.getAnimationTime = function () {
            if (this.loop) {
                var duration = this.animationEnd - this.animationStart;
                if (duration == 0)
                    return this.animationStart;
                return (this.trackTime % duration) + this.animationStart;
            }
            return Math.min(this.trackTime + this.animationStart, this.animationEnd);
        };
        TrackEntry.prototype.setAnimationLast = function (animationLast) {
            this.animationLast = animationLast;
            this.nextAnimationLast = animationLast;
        };
        /** Returns true if at least one loop has been completed.
         *
         * See {@link AnimationStateListener#complete()}. */
        TrackEntry.prototype.isComplete = function () {
            return this.trackTime >= this.animationEnd - this.animationStart;
        };
        /** Resets the rotation directions for mixing this entry's rotate timelines. This can be useful to avoid bones rotating the
         * long way around when using {@link #alpha} and starting animations on other tracks.
         *
         * Mixing with {@link MixBlend#replace} involves finding a rotation between two others, which has two possible solutions:
         * the short way or the long way around. The two rotations likely change over time, so which direction is the short or long
         * way also changes. If the short way was always chosen, bones would flip to the other side when that direction became the
         * long way. TrackEntry chooses the short way the first time it is applied and remembers that direction. */
        TrackEntry.prototype.resetRotationDirections = function () {
            this.timelinesRotation.length = 0;
        };
        return TrackEntry;
    }());
    spine.TrackEntry = TrackEntry;
    __reflect(TrackEntry.prototype, "spine.TrackEntry");
    var EventQueue = (function () {
        function EventQueue(animState) {
            this.objects = [];
            this.drainDisabled = false;
            this.animState = animState;
        }
        EventQueue.prototype.start = function (entry) {
            this.objects.push(EventType.start);
            this.objects.push(entry);
            this.animState.animationsChanged = true;
        };
        EventQueue.prototype.interrupt = function (entry) {
            this.objects.push(EventType.interrupt);
            this.objects.push(entry);
        };
        EventQueue.prototype.end = function (entry) {
            this.objects.push(EventType.end);
            this.objects.push(entry);
            this.animState.animationsChanged = true;
        };
        EventQueue.prototype.dispose = function (entry) {
            this.objects.push(EventType.dispose);
            this.objects.push(entry);
        };
        EventQueue.prototype.complete = function (entry) {
            this.objects.push(EventType.complete);
            this.objects.push(entry);
        };
        EventQueue.prototype.event = function (entry, event) {
            this.objects.push(EventType.event);
            this.objects.push(entry);
            this.objects.push(event);
        };
        EventQueue.prototype.drain = function () {
            if (this.drainDisabled)
                return;
            this.drainDisabled = true;
            var objects = this.objects;
            var listeners = this.animState.listeners;
            for (var i = 0; i < objects.length; i += 2) {
                var type = objects[i];
                var entry = objects[i + 1];
                switch (type) {
                    case EventType.start:
                        if (entry.listener != null && entry.listener.start)
                            entry.listener.start(entry);
                        for (var ii = 0; ii < listeners.length; ii++)
                            if (listeners[ii].start)
                                listeners[ii].start(entry);
                        break;
                    case EventType.interrupt:
                        if (entry.listener != null && entry.listener.interrupt)
                            entry.listener.interrupt(entry);
                        for (var ii = 0; ii < listeners.length; ii++)
                            if (listeners[ii].interrupt)
                                listeners[ii].interrupt(entry);
                        break;
                    case EventType.end:
                        if (entry.listener != null && entry.listener.end)
                            entry.listener.end(entry);
                        for (var ii = 0; ii < listeners.length; ii++)
                            if (listeners[ii].end)
                                listeners[ii].end(entry);
                    // Fall through.
                    case EventType.dispose:
                        if (entry.listener != null && entry.listener.dispose)
                            entry.listener.dispose(entry);
                        for (var ii = 0; ii < listeners.length; ii++)
                            if (listeners[ii].dispose)
                                listeners[ii].dispose(entry);
                        this.animState.trackEntryPool.free(entry);
                        break;
                    case EventType.complete:
                        if (entry.listener != null && entry.listener.complete)
                            entry.listener.complete(entry);
                        for (var ii = 0; ii < listeners.length; ii++)
                            if (listeners[ii].complete)
                                listeners[ii].complete(entry);
                        break;
                    case EventType.event:
                        var event_3 = objects[i++ + 2];
                        if (entry.listener != null && entry.listener.event)
                            entry.listener.event(entry, event_3);
                        for (var ii = 0; ii < listeners.length; ii++)
                            if (listeners[ii].event)
                                listeners[ii].event(entry, event_3);
                        break;
                }
            }
            this.clear();
            this.drainDisabled = false;
        };
        EventQueue.prototype.clear = function () {
            this.objects.length = 0;
        };
        return EventQueue;
    }());
    spine.EventQueue = EventQueue;
    __reflect(EventQueue.prototype, "spine.EventQueue");
    var EventType;
    (function (EventType) {
        EventType[EventType["start"] = 0] = "start";
        EventType[EventType["interrupt"] = 1] = "interrupt";
        EventType[EventType["end"] = 2] = "end";
        EventType[EventType["dispose"] = 3] = "dispose";
        EventType[EventType["complete"] = 4] = "complete";
        EventType[EventType["event"] = 5] = "event";
    })(EventType = spine.EventType || (spine.EventType = {}));
    var AnimationStateAdapter = (function () {
        function AnimationStateAdapter() {
        }
        AnimationStateAdapter.prototype.start = function (entry) {
        };
        AnimationStateAdapter.prototype.interrupt = function (entry) {
        };
        AnimationStateAdapter.prototype.end = function (entry) {
        };
        AnimationStateAdapter.prototype.dispose = function (entry) {
        };
        AnimationStateAdapter.prototype.complete = function (entry) {
        };
        AnimationStateAdapter.prototype.event = function (entry, event) {
        };
        return AnimationStateAdapter;
    }());
    spine.AnimationStateAdapter = AnimationStateAdapter;
    __reflect(AnimationStateAdapter.prototype, "spine.AnimationStateAdapter", ["spine.AnimationStateListener"]);
})(spine || (spine = {}));
