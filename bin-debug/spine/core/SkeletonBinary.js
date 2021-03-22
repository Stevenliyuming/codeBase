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
    /** Loads skeleton data in the Spine binary format.
     *
     * See [Spine binary format](http://esotericsoftware.com/spine-binary-format) and
     * [JSON and binary data](http://esotericsoftware.com/spine-loading-skeleton-data#JSON-and-binary-data) in the Spine
     * Runtimes Guide. */
    var SkeletonBinary = (function () {
        function SkeletonBinary(attachmentLoader) {
            /** Scales bone positions, image sizes, and translations as they are loaded. This allows different size images to be used at
             * runtime than were used in Spine.
             *
             * See [Scaling](http://esotericsoftware.com/spine-loading-skeleton-data#Scaling) in the Spine Runtimes Guide. */
            this.scale = 1;
            this.linkedMeshes = new Array();
            this.attachmentLoader = attachmentLoader;
        }
        SkeletonBinary.prototype.readSkeletonData = function (binary) {
            var scale = this.scale;
            var skeletonData = new spine.SkeletonData();
            skeletonData.name = ""; // BOZO
            var input = new BinaryInput(binary);
            skeletonData.hash = input.readString();
            skeletonData.version = input.readString();
            if ("3.8.75" == skeletonData.version)
                throw new Error("Unsupported skeleton data, please export with a newer version of Spine.");
            skeletonData.x = input.readFloat();
            skeletonData.y = input.readFloat();
            skeletonData.width = input.readFloat();
            skeletonData.height = input.readFloat();
            var nonessential = input.readBoolean();
            if (nonessential) {
                skeletonData.fps = input.readFloat();
                skeletonData.imagesPath = input.readString();
                skeletonData.audioPath = input.readString();
            }
            var n = 0;
            // Strings.
            n = input.readInt(true);
            for (var i = 0; i < n; i++)
                input.strings.push(input.readString());
            // Bones.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var name_1 = input.readString();
                var parent_1 = i == 0 ? null : skeletonData.bones[input.readInt(true)];
                var data = new spine.BoneData(i, name_1, parent_1);
                data.rotation = input.readFloat();
                data.x = input.readFloat() * scale;
                data.y = input.readFloat() * scale;
                data.scaleX = input.readFloat();
                data.scaleY = input.readFloat();
                data.shearX = input.readFloat();
                data.shearY = input.readFloat();
                data.length = input.readFloat() * scale;
                data.transformMode = SkeletonBinary.TransformModeValues[input.readInt(true)];
                data.skinRequired = input.readBoolean();
                if (nonessential)
                    spine.Color.rgba8888ToColor(data.color, input.readInt32());
                skeletonData.bones.push(data);
            }
            // Slots.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var slotName = input.readString();
                var boneData = skeletonData.bones[input.readInt(true)];
                var data = new spine.SlotData(i, slotName, boneData);
                spine.Color.rgba8888ToColor(data.color, input.readInt32());
                var darkColor = input.readInt32();
                if (darkColor != -1)
                    spine.Color.rgb888ToColor(data.darkColor = new spine.Color(), darkColor);
                data.attachmentName = input.readStringRef();
                data.blendMode = SkeletonBinary.BlendModeValues[input.readInt(true)];
                skeletonData.slots.push(data);
            }
            // IK constraints.
            n = input.readInt(true);
            for (var i = 0, nn = void 0; i < n; i++) {
                var data = new spine.IkConstraintData(input.readString());
                data.order = input.readInt(true);
                data.skinRequired = input.readBoolean();
                nn = input.readInt(true);
                for (var ii = 0; ii < nn; ii++)
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                data.target = skeletonData.bones[input.readInt(true)];
                data.mix = input.readFloat();
                data.softness = input.readFloat() * scale;
                data.bendDirection = input.readByte();
                data.compress = input.readBoolean();
                data.stretch = input.readBoolean();
                data.uniform = input.readBoolean();
                skeletonData.ikConstraints.push(data);
            }
            // Transform constraints.
            n = input.readInt(true);
            for (var i = 0, nn = void 0; i < n; i++) {
                var data = new spine.TransformConstraintData(input.readString());
                data.order = input.readInt(true);
                data.skinRequired = input.readBoolean();
                nn = input.readInt(true);
                for (var ii = 0; ii < nn; ii++)
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                data.target = skeletonData.bones[input.readInt(true)];
                data.local = input.readBoolean();
                data.relative = input.readBoolean();
                data.offsetRotation = input.readFloat();
                data.offsetX = input.readFloat() * scale;
                data.offsetY = input.readFloat() * scale;
                data.offsetScaleX = input.readFloat();
                data.offsetScaleY = input.readFloat();
                data.offsetShearY = input.readFloat();
                data.rotateMix = input.readFloat();
                data.translateMix = input.readFloat();
                data.scaleMix = input.readFloat();
                data.shearMix = input.readFloat();
                skeletonData.transformConstraints.push(data);
            }
            // Path constraints.
            n = input.readInt(true);
            for (var i = 0, nn = void 0; i < n; i++) {
                var data = new spine.PathConstraintData(input.readString());
                data.order = input.readInt(true);
                data.skinRequired = input.readBoolean();
                nn = input.readInt(true);
                for (var ii = 0; ii < nn; ii++)
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                data.target = skeletonData.slots[input.readInt(true)];
                data.positionMode = SkeletonBinary.PositionModeValues[input.readInt(true)];
                data.spacingMode = SkeletonBinary.SpacingModeValues[input.readInt(true)];
                data.rotateMode = SkeletonBinary.RotateModeValues[input.readInt(true)];
                data.offsetRotation = input.readFloat();
                data.position = input.readFloat();
                if (data.positionMode == spine.PositionMode.Fixed)
                    data.position *= scale;
                data.spacing = input.readFloat();
                if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed)
                    data.spacing *= scale;
                data.rotateMix = input.readFloat();
                data.translateMix = input.readFloat();
                skeletonData.pathConstraints.push(data);
            }
            // Default skin.
            var defaultSkin = this.readSkin(input, skeletonData, true, nonessential);
            if (defaultSkin != null) {
                skeletonData.defaultSkin = defaultSkin;
                skeletonData.skins.push(defaultSkin);
            }
            // Skins.
            {
                var i = skeletonData.skins.length;
                spine.Utils.setArraySize(skeletonData.skins, n = i + input.readInt(true));
                for (; i < n; i++)
                    skeletonData.skins[i] = this.readSkin(input, skeletonData, false, nonessential);
            }
            // Linked meshes.
            n = this.linkedMeshes.length;
            for (var i = 0; i < n; i++) {
                var linkedMesh = this.linkedMeshes[i];
                var skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                if (skin == null)
                    throw new Error("Skin not found: " + linkedMesh.skin);
                var parent_2 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                if (parent_2 == null)
                    throw new Error("Parent mesh not found: " + linkedMesh.parent);
                linkedMesh.mesh.deformAttachment = linkedMesh.inheritDeform ? parent_2 : linkedMesh.mesh;
                linkedMesh.mesh.setParentMesh(parent_2);
                linkedMesh.mesh.updateUVs();
            }
            this.linkedMeshes.length = 0;
            // Events.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var data = new spine.EventData(input.readStringRef());
                data.intValue = input.readInt(false);
                data.floatValue = input.readFloat();
                data.stringValue = input.readString();
                data.audioPath = input.readString();
                if (data.audioPath != null) {
                    data.volume = input.readFloat();
                    data.balance = input.readFloat();
                }
                skeletonData.events.push(data);
            }
            // Animations.
            n = input.readInt(true);
            for (var i = 0; i < n; i++)
                skeletonData.animations.push(this.readAnimation(input, input.readString(), skeletonData));
            return skeletonData;
        };
        SkeletonBinary.prototype.readSkin = function (input, skeletonData, defaultSkin, nonessential) {
            var skin = null;
            var slotCount = 0;
            if (defaultSkin) {
                slotCount = input.readInt(true);
                if (slotCount == 0)
                    return null;
                skin = new spine.Skin("default");
            }
            else {
                skin = new spine.Skin(input.readStringRef());
                skin.bones.length = input.readInt(true);
                for (var i = 0, n = skin.bones.length; i < n; i++)
                    skin.bones[i] = skeletonData.bones[input.readInt(true)];
                for (var i = 0, n = input.readInt(true); i < n; i++)
                    skin.constraints.push(skeletonData.ikConstraints[input.readInt(true)]);
                for (var i = 0, n = input.readInt(true); i < n; i++)
                    skin.constraints.push(skeletonData.transformConstraints[input.readInt(true)]);
                for (var i = 0, n = input.readInt(true); i < n; i++)
                    skin.constraints.push(skeletonData.pathConstraints[input.readInt(true)]);
                slotCount = input.readInt(true);
            }
            for (var i = 0; i < slotCount; i++) {
                var slotIndex = input.readInt(true);
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var name_2 = input.readStringRef();
                    var attachment = this.readAttachment(input, skeletonData, skin, slotIndex, name_2, nonessential);
                    if (attachment != null)
                        skin.setAttachment(slotIndex, name_2, attachment);
                }
            }
            return skin;
        };
        SkeletonBinary.prototype.readAttachment = function (input, skeletonData, skin, slotIndex, attachmentName, nonessential) {
            var scale = this.scale;
            var name = input.readStringRef();
            if (name == null)
                name = attachmentName;
            var typeIndex = input.readByte();
            var type = SkeletonBinary.AttachmentTypeValues[typeIndex];
            switch (type) {
                case spine.AttachmentType.Region: {
                    var path = input.readStringRef();
                    var rotation = input.readFloat();
                    var x = input.readFloat();
                    var y = input.readFloat();
                    var scaleX = input.readFloat();
                    var scaleY = input.readFloat();
                    var width = input.readFloat();
                    var height = input.readFloat();
                    var color = input.readInt32();
                    if (path == null)
                        path = name;
                    var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                    if (region == null)
                        return null;
                    region.path = path;
                    region.x = x * scale;
                    region.y = y * scale;
                    region.scaleX = scaleX;
                    region.scaleY = scaleY;
                    region.rotation = rotation;
                    region.width = width * scale;
                    region.height = height * scale;
                    spine.Color.rgba8888ToColor(region.color, color);
                    region.updateOffset();
                    return region;
                }
                case spine.AttachmentType.BoundingBox: {
                    var vertexCount = input.readInt(true);
                    var vertices = this.readVertices(input, vertexCount);
                    var color = nonessential ? input.readInt32() : 0;
                    var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                    if (box == null)
                        return null;
                    box.worldVerticesLength = vertexCount << 1;
                    box.vertices = vertices.vertices;
                    box.bones = vertices.bones;
                    if (nonessential)
                        spine.Color.rgba8888ToColor(box.color, color);
                    return box;
                }
                case spine.AttachmentType.Mesh: {
                    var path = input.readStringRef();
                    var color = input.readInt32();
                    var vertexCount = input.readInt(true);
                    var uvs = this.readFloatArray(input, vertexCount << 1, 1);
                    var triangles = this.readShortArray(input);
                    var vertices = this.readVertices(input, vertexCount);
                    var hullLength = input.readInt(true);
                    var edges = null;
                    var width = 0, height = 0;
                    if (nonessential) {
                        edges = this.readShortArray(input);
                        width = input.readFloat();
                        height = input.readFloat();
                    }
                    if (path == null)
                        path = name;
                    var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                    if (mesh == null)
                        return null;
                    mesh.path = path;
                    spine.Color.rgba8888ToColor(mesh.color, color);
                    mesh.bones = vertices.bones;
                    mesh.vertices = vertices.vertices;
                    mesh.worldVerticesLength = vertexCount << 1;
                    mesh.triangles = triangles;
                    mesh.regionUVs = uvs;
                    mesh.updateUVs();
                    mesh.hullLength = hullLength << 1;
                    if (nonessential) {
                        mesh.edges = edges;
                        mesh.width = width * scale;
                        mesh.height = height * scale;
                    }
                    return mesh;
                }
                case spine.AttachmentType.LinkedMesh: {
                    var path = input.readStringRef();
                    var color = input.readInt32();
                    var skinName = input.readStringRef();
                    var parent_3 = input.readStringRef();
                    var inheritDeform = input.readBoolean();
                    var width = 0, height = 0;
                    if (nonessential) {
                        width = input.readFloat();
                        height = input.readFloat();
                    }
                    if (path == null)
                        path = name;
                    var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                    if (mesh == null)
                        return null;
                    mesh.path = path;
                    spine.Color.rgba8888ToColor(mesh.color, color);
                    if (nonessential) {
                        mesh.width = width * scale;
                        mesh.height = height * scale;
                    }
                    this.linkedMeshes.push(new LinkedMesh(mesh, skinName, slotIndex, parent_3, inheritDeform));
                    return mesh;
                }
                case spine.AttachmentType.Path: {
                    var closed_1 = input.readBoolean();
                    var constantSpeed = input.readBoolean();
                    var vertexCount = input.readInt(true);
                    var vertices = this.readVertices(input, vertexCount);
                    var lengths = spine.Utils.newArray(vertexCount / 3, 0);
                    for (var i = 0, n = lengths.length; i < n; i++)
                        lengths[i] = input.readFloat() * scale;
                    var color = nonessential ? input.readInt32() : 0;
                    var path = this.attachmentLoader.newPathAttachment(skin, name);
                    if (path == null)
                        return null;
                    path.closed = closed_1;
                    path.constantSpeed = constantSpeed;
                    path.worldVerticesLength = vertexCount << 1;
                    path.vertices = vertices.vertices;
                    path.bones = vertices.bones;
                    path.lengths = lengths;
                    if (nonessential)
                        spine.Color.rgba8888ToColor(path.color, color);
                    return path;
                }
                case spine.AttachmentType.Point: {
                    var rotation = input.readFloat();
                    var x = input.readFloat();
                    var y = input.readFloat();
                    var color = nonessential ? input.readInt32() : 0;
                    var point = this.attachmentLoader.newPointAttachment(skin, name);
                    if (point == null)
                        return null;
                    point.x = x * scale;
                    point.y = y * scale;
                    point.rotation = rotation;
                    if (nonessential)
                        spine.Color.rgba8888ToColor(point.color, color);
                    return point;
                }
                case spine.AttachmentType.Clipping: {
                    var endSlotIndex = input.readInt(true);
                    var vertexCount = input.readInt(true);
                    var vertices = this.readVertices(input, vertexCount);
                    var color = nonessential ? input.readInt32() : 0;
                    var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                    if (clip == null)
                        return null;
                    clip.endSlot = skeletonData.slots[endSlotIndex];
                    clip.worldVerticesLength = vertexCount << 1;
                    clip.vertices = vertices.vertices;
                    clip.bones = vertices.bones;
                    if (nonessential)
                        spine.Color.rgba8888ToColor(clip.color, color);
                    return clip;
                }
            }
            return null;
        };
        SkeletonBinary.prototype.readVertices = function (input, vertexCount) {
            var verticesLength = vertexCount << 1;
            var vertices = new Vertices();
            var scale = this.scale;
            if (!input.readBoolean()) {
                vertices.vertices = this.readFloatArray(input, verticesLength, scale);
                return vertices;
            }
            var weights = new Array();
            var bonesArray = new Array();
            for (var i = 0; i < vertexCount; i++) {
                var boneCount = input.readInt(true);
                bonesArray.push(boneCount);
                for (var ii = 0; ii < boneCount; ii++) {
                    bonesArray.push(input.readInt(true));
                    weights.push(input.readFloat() * scale);
                    weights.push(input.readFloat() * scale);
                    weights.push(input.readFloat());
                }
            }
            vertices.vertices = spine.Utils.toFloatArray(weights);
            vertices.bones = bonesArray;
            return vertices;
        };
        SkeletonBinary.prototype.readFloatArray = function (input, n, scale) {
            var array = new Array(n);
            if (scale == 1) {
                for (var i = 0; i < n; i++)
                    array[i] = input.readFloat();
            }
            else {
                for (var i = 0; i < n; i++)
                    array[i] = input.readFloat() * scale;
            }
            return array;
        };
        SkeletonBinary.prototype.readShortArray = function (input) {
            var n = input.readInt(true);
            var array = new Array(n);
            for (var i = 0; i < n; i++)
                array[i] = input.readShort();
            return array;
        };
        SkeletonBinary.prototype.readAnimation = function (input, name, skeletonData) {
            var timelines = new Array();
            var scale = this.scale;
            var duration = 0;
            var tempColor1 = new spine.Color();
            var tempColor2 = new spine.Color();
            // Slot timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var slotIndex = input.readInt(true);
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var timelineType = input.readByte();
                    var frameCount = input.readInt(true);
                    switch (timelineType) {
                        case SkeletonBinary.SLOT_ATTACHMENT: {
                            var timeline = new spine.AttachmentTimeline(frameCount);
                            timeline.slotIndex = slotIndex;
                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++)
                                timeline.setFrame(frameIndex, input.readFloat(), input.readStringRef());
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[frameCount - 1]);
                            break;
                        }
                        case SkeletonBinary.SLOT_COLOR: {
                            var timeline = new spine.ColorTimeline(frameCount);
                            timeline.slotIndex = slotIndex;
                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                var time = input.readFloat();
                                spine.Color.rgba8888ToColor(tempColor1, input.readInt32());
                                timeline.setFrame(frameIndex, time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a);
                                if (frameIndex < frameCount - 1)
                                    this.readCurve(input, frameIndex, timeline);
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.ColorTimeline.ENTRIES]);
                            break;
                        }
                        case SkeletonBinary.SLOT_TWO_COLOR: {
                            var timeline = new spine.TwoColorTimeline(frameCount);
                            timeline.slotIndex = slotIndex;
                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                var time = input.readFloat();
                                spine.Color.rgba8888ToColor(tempColor1, input.readInt32());
                                spine.Color.rgb888ToColor(tempColor2, input.readInt32());
                                timeline.setFrame(frameIndex, time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a, tempColor2.r, tempColor2.g, tempColor2.b);
                                if (frameIndex < frameCount - 1)
                                    this.readCurve(input, frameIndex, timeline);
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TwoColorTimeline.ENTRIES]);
                            break;
                        }
                    }
                }
            }
            // Bone timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var boneIndex = input.readInt(true);
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var timelineType = input.readByte();
                    var frameCount = input.readInt(true);
                    switch (timelineType) {
                        case SkeletonBinary.BONE_ROTATE: {
                            var timeline = new spine.RotateTimeline(frameCount);
                            timeline.boneIndex = boneIndex;
                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat());
                                if (frameIndex < frameCount - 1)
                                    this.readCurve(input, frameIndex, timeline);
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.RotateTimeline.ENTRIES]);
                            break;
                        }
                        case SkeletonBinary.BONE_TRANSLATE:
                        case SkeletonBinary.BONE_SCALE:
                        case SkeletonBinary.BONE_SHEAR: {
                            var timeline = void 0;
                            var timelineScale = 1;
                            if (timelineType == SkeletonBinary.BONE_SCALE)
                                timeline = new spine.ScaleTimeline(frameCount);
                            else if (timelineType == SkeletonBinary.BONE_SHEAR)
                                timeline = new spine.ShearTimeline(frameCount);
                            else {
                                timeline = new spine.TranslateTimeline(frameCount);
                                timelineScale = scale;
                            }
                            timeline.boneIndex = boneIndex;
                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat() * timelineScale, input.readFloat() * timelineScale);
                                if (frameIndex < frameCount - 1)
                                    this.readCurve(input, frameIndex, timeline);
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TranslateTimeline.ENTRIES]);
                            break;
                        }
                    }
                }
            }
            // IK constraint timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var index = input.readInt(true);
                var frameCount = input.readInt(true);
                var timeline = new spine.IkConstraintTimeline(frameCount);
                timeline.ikConstraintIndex = index;
                for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                    timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat() * scale, input.readByte(), input.readBoolean(), input.readBoolean());
                    if (frameIndex < frameCount - 1)
                        this.readCurve(input, frameIndex, timeline);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.IkConstraintTimeline.ENTRIES]);
            }
            // Transform constraint timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var index = input.readInt(true);
                var frameCount = input.readInt(true);
                var timeline = new spine.TransformConstraintTimeline(frameCount);
                timeline.transformConstraintIndex = index;
                for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                    timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
                    if (frameIndex < frameCount - 1)
                        this.readCurve(input, frameIndex, timeline);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TransformConstraintTimeline.ENTRIES]);
            }
            // Path constraint timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var index = input.readInt(true);
                var data = skeletonData.pathConstraints[index];
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var timelineType = input.readByte();
                    var frameCount = input.readInt(true);
                    switch (timelineType) {
                        case SkeletonBinary.PATH_POSITION:
                        case SkeletonBinary.PATH_SPACING: {
                            var timeline = void 0;
                            var timelineScale = 1;
                            if (timelineType == SkeletonBinary.PATH_SPACING) {
                                timeline = new spine.PathConstraintSpacingTimeline(frameCount);
                                if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed)
                                    timelineScale = scale;
                            }
                            else {
                                timeline = new spine.PathConstraintPositionTimeline(frameCount);
                                if (data.positionMode == spine.PositionMode.Fixed)
                                    timelineScale = scale;
                            }
                            timeline.pathConstraintIndex = index;
                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat() * timelineScale);
                                if (frameIndex < frameCount - 1)
                                    this.readCurve(input, frameIndex, timeline);
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.PathConstraintPositionTimeline.ENTRIES]);
                            break;
                        }
                        case SkeletonBinary.PATH_MIX: {
                            var timeline = new spine.PathConstraintMixTimeline(frameCount);
                            timeline.pathConstraintIndex = index;
                            for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat());
                                if (frameIndex < frameCount - 1)
                                    this.readCurve(input, frameIndex, timeline);
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.PathConstraintMixTimeline.ENTRIES]);
                            break;
                        }
                    }
                }
            }
            // Deform timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var skin = skeletonData.skins[input.readInt(true)];
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var slotIndex = input.readInt(true);
                    for (var iii = 0, nnn = input.readInt(true); iii < nnn; iii++) {
                        var attachment = skin.getAttachment(slotIndex, input.readStringRef());
                        var weighted = attachment.bones != null;
                        var vertices = attachment.vertices;
                        var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                        var frameCount = input.readInt(true);
                        var timeline = new spine.DeformTimeline(frameCount);
                        timeline.slotIndex = slotIndex;
                        timeline.attachment = attachment;
                        for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                            var time = input.readFloat();
                            var deform = void 0;
                            var end = input.readInt(true);
                            if (end == 0)
                                deform = weighted ? spine.Utils.newFloatArray(deformLength) : vertices;
                            else {
                                deform = spine.Utils.newFloatArray(deformLength);
                                var start = input.readInt(true);
                                end += start;
                                if (scale == 1) {
                                    for (var v = start; v < end; v++)
                                        deform[v] = input.readFloat();
                                }
                                else {
                                    for (var v = start; v < end; v++)
                                        deform[v] = input.readFloat() * scale;
                                }
                                if (!weighted) {
                                    for (var v = 0, vn = deform.length; v < vn; v++)
                                        deform[v] += vertices[v];
                                }
                            }
                            timeline.setFrame(frameIndex, time, deform);
                            if (frameIndex < frameCount - 1)
                                this.readCurve(input, frameIndex, timeline);
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[frameCount - 1]);
                    }
                }
            }
            // Draw order timeline.
            var drawOrderCount = input.readInt(true);
            if (drawOrderCount > 0) {
                var timeline = new spine.DrawOrderTimeline(drawOrderCount);
                var slotCount = skeletonData.slots.length;
                for (var i = 0; i < drawOrderCount; i++) {
                    var time = input.readFloat();
                    var offsetCount = input.readInt(true);
                    var drawOrder = spine.Utils.newArray(slotCount, 0);
                    for (var ii = slotCount - 1; ii >= 0; ii--)
                        drawOrder[ii] = -1;
                    var unchanged = spine.Utils.newArray(slotCount - offsetCount, 0);
                    var originalIndex = 0, unchangedIndex = 0;
                    for (var ii = 0; ii < offsetCount; ii++) {
                        var slotIndex = input.readInt(true);
                        // Collect unchanged items.
                        while (originalIndex != slotIndex)
                            unchanged[unchangedIndex++] = originalIndex++;
                        // Set changed items.
                        drawOrder[originalIndex + input.readInt(true)] = originalIndex++;
                    }
                    // Collect remaining unchanged items.
                    while (originalIndex < slotCount)
                        unchanged[unchangedIndex++] = originalIndex++;
                    // Fill in unchanged items.
                    for (var ii = slotCount - 1; ii >= 0; ii--)
                        if (drawOrder[ii] == -1)
                            drawOrder[ii] = unchanged[--unchangedIndex];
                    timeline.setFrame(i, time, drawOrder);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[drawOrderCount - 1]);
            }
            // Event timeline.
            var eventCount = input.readInt(true);
            if (eventCount > 0) {
                var timeline = new spine.EventTimeline(eventCount);
                for (var i = 0; i < eventCount; i++) {
                    var time = input.readFloat();
                    var eventData = skeletonData.events[input.readInt(true)];
                    var event_1 = new spine.Event(time, eventData);
                    event_1.intValue = input.readInt(false);
                    event_1.floatValue = input.readFloat();
                    event_1.stringValue = input.readBoolean() ? input.readString() : eventData.stringValue;
                    if (event_1.data.audioPath != null) {
                        event_1.volume = input.readFloat();
                        event_1.balance = input.readFloat();
                    }
                    timeline.setFrame(i, event_1);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[eventCount - 1]);
            }
            return new spine.Animation(name, timelines, duration);
        };
        SkeletonBinary.prototype.readCurve = function (input, frameIndex, timeline) {
            switch (input.readByte()) {
                case SkeletonBinary.CURVE_STEPPED:
                    timeline.setStepped(frameIndex);
                    break;
                case SkeletonBinary.CURVE_BEZIER:
                    this.setCurve(timeline, frameIndex, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
                    break;
            }
        };
        SkeletonBinary.prototype.setCurve = function (timeline, frameIndex, cx1, cy1, cx2, cy2) {
            timeline.setCurve(frameIndex, cx1, cy1, cx2, cy2);
        };
        SkeletonBinary.AttachmentTypeValues = [0 /*AttachmentType.Region*/, 1 /*AttachmentType.BoundingBox*/, 2 /*AttachmentType.Mesh*/, 3 /*AttachmentType.LinkedMesh*/, 4 /*AttachmentType.Path*/, 5 /*AttachmentType.Point*/, 6 /*AttachmentType.Clipping*/];
        SkeletonBinary.TransformModeValues = [spine.TransformMode.Normal, spine.TransformMode.OnlyTranslation, spine.TransformMode.NoRotationOrReflection, spine.TransformMode.NoScale, spine.TransformMode.NoScaleOrReflection];
        SkeletonBinary.PositionModeValues = [spine.PositionMode.Fixed, spine.PositionMode.Percent];
        SkeletonBinary.SpacingModeValues = [spine.SpacingMode.Length, spine.SpacingMode.Fixed, spine.SpacingMode.Percent];
        SkeletonBinary.RotateModeValues = [spine.RotateMode.Tangent, spine.RotateMode.Chain, spine.RotateMode.ChainScale];
        SkeletonBinary.BlendModeValues = [spine.BlendMode.Normal, spine.BlendMode.Additive, spine.BlendMode.Multiply, spine.BlendMode.Screen];
        SkeletonBinary.BONE_ROTATE = 0;
        SkeletonBinary.BONE_TRANSLATE = 1;
        SkeletonBinary.BONE_SCALE = 2;
        SkeletonBinary.BONE_SHEAR = 3;
        SkeletonBinary.SLOT_ATTACHMENT = 0;
        SkeletonBinary.SLOT_COLOR = 1;
        SkeletonBinary.SLOT_TWO_COLOR = 2;
        SkeletonBinary.PATH_POSITION = 0;
        SkeletonBinary.PATH_SPACING = 1;
        SkeletonBinary.PATH_MIX = 2;
        SkeletonBinary.CURVE_LINEAR = 0;
        SkeletonBinary.CURVE_STEPPED = 1;
        SkeletonBinary.CURVE_BEZIER = 2;
        return SkeletonBinary;
    }());
    spine.SkeletonBinary = SkeletonBinary;
    __reflect(SkeletonBinary.prototype, "spine.SkeletonBinary");
    var BinaryInput = (function () {
        function BinaryInput(data, strings, index, buffer) {
            if (strings === void 0) { strings = new Array(); }
            if (index === void 0) { index = 0; }
            if (buffer === void 0) { buffer = new DataView(data.buffer); }
            this.strings = strings;
            this.index = index;
            this.buffer = buffer;
        }
        BinaryInput.prototype.readByte = function () {
            return this.buffer.getInt8(this.index++);
        };
        BinaryInput.prototype.readShort = function () {
            var value = this.buffer.getInt16(this.index);
            this.index += 2;
            return value;
        };
        BinaryInput.prototype.readInt32 = function () {
            var value = this.buffer.getInt32(this.index);
            this.index += 4;
            return value;
        };
        BinaryInput.prototype.readInt = function (optimizePositive) {
            var b = this.readByte();
            var result = b & 0x7F;
            if ((b & 0x80) != 0) {
                b = this.readByte();
                result |= (b & 0x7F) << 7;
                if ((b & 0x80) != 0) {
                    b = this.readByte();
                    result |= (b & 0x7F) << 14;
                    if ((b & 0x80) != 0) {
                        b = this.readByte();
                        result |= (b & 0x7F) << 21;
                        if ((b & 0x80) != 0) {
                            b = this.readByte();
                            result |= (b & 0x7F) << 28;
                        }
                    }
                }
            }
            return optimizePositive ? result : ((result >>> 1) ^ -(result & 1));
        };
        BinaryInput.prototype.readStringRef = function () {
            var index = this.readInt(true);
            return index == 0 ? null : this.strings[index - 1];
        };
        BinaryInput.prototype.readString = function () {
            var byteCount = this.readInt(true);
            switch (byteCount) {
                case 0:
                    return null;
                case 1:
                    return "";
            }
            byteCount--;
            var chars = "";
            var charCount = 0;
            for (var i = 0; i < byteCount;) {
                var b = this.readByte();
                switch (b >> 4) {
                    case 12:
                    case 13:
                        chars += String.fromCharCode(((b & 0x1F) << 6 | this.readByte() & 0x3F));
                        i += 2;
                        break;
                    case 14:
                        chars += String.fromCharCode(((b & 0x0F) << 12 | (this.readByte() & 0x3F) << 6 | this.readByte() & 0x3F));
                        i += 3;
                        break;
                    default:
                        chars += String.fromCharCode(b);
                        i++;
                }
            }
            return chars;
        };
        BinaryInput.prototype.readFloat = function () {
            var value = this.buffer.getFloat32(this.index);
            this.index += 4;
            return value;
        };
        BinaryInput.prototype.readBoolean = function () {
            return this.readByte() != 0;
        };
        return BinaryInput;
    }());
    __reflect(BinaryInput.prototype, "BinaryInput");
    var LinkedMesh = (function () {
        function LinkedMesh(mesh, skin, slotIndex, parent, inheritDeform) {
            this.mesh = mesh;
            this.skin = skin;
            this.slotIndex = slotIndex;
            this.parent = parent;
            this.inheritDeform = inheritDeform;
        }
        return LinkedMesh;
    }());
    __reflect(LinkedMesh.prototype, "LinkedMesh");
    var Vertices = (function () {
        function Vertices(bones, vertices) {
            if (bones === void 0) { bones = null; }
            if (vertices === void 0) { vertices = null; }
            this.bones = bones;
            this.vertices = vertices;
        }
        return Vertices;
    }());
    __reflect(Vertices.prototype, "Vertices");
})(spine || (spine = {}));
