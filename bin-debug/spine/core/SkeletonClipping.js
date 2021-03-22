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
    var SkeletonClipping = (function () {
        function SkeletonClipping() {
            this.triangulator = new spine.Triangulator();
            this.clippingPolygon = new Array();
            this.clipOutput = new Array();
            this.clippedVertices = new Array();
            this.clippedTriangles = new Array();
            this.scratch = new Array();
        }
        SkeletonClipping.prototype.clipStart = function (slot, clip) {
            if (this.clipAttachment != null)
                return 0;
            this.clipAttachment = clip;
            var n = clip.worldVerticesLength;
            var vertices = spine.Utils.setArraySize(this.clippingPolygon, n);
            clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
            var clippingPolygon = this.clippingPolygon;
            SkeletonClipping.makeClockwise(clippingPolygon);
            var clippingPolygons = this.clippingPolygons = this.triangulator.decompose(clippingPolygon, this.triangulator.triangulate(clippingPolygon));
            for (var i = 0, n_1 = clippingPolygons.length; i < n_1; i++) {
                var polygon = clippingPolygons[i];
                SkeletonClipping.makeClockwise(polygon);
                polygon.push(polygon[0]);
                polygon.push(polygon[1]);
            }
            return clippingPolygons.length;
        };
        SkeletonClipping.prototype.clipEndWithSlot = function (slot) {
            if (this.clipAttachment != null && this.clipAttachment.endSlot == slot.data)
                this.clipEnd();
        };
        SkeletonClipping.prototype.clipEnd = function () {
            if (this.clipAttachment == null)
                return;
            this.clipAttachment = null;
            this.clippingPolygons = null;
            this.clippedVertices.length = 0;
            this.clippedTriangles.length = 0;
            this.clippingPolygon.length = 0;
        };
        SkeletonClipping.prototype.isClipping = function () {
            return this.clipAttachment != null;
        };
        SkeletonClipping.prototype.clipTriangles = function (vertices, verticesLength, triangles, trianglesLength, uvs, light, dark, twoColor) {
            var clipOutput = this.clipOutput, clippedVertices = this.clippedVertices;
            var clippedTriangles = this.clippedTriangles;
            var polygons = this.clippingPolygons;
            var polygonsCount = this.clippingPolygons.length;
            var vertexSize = twoColor ? 12 : 8;
            var index = 0;
            clippedVertices.length = 0;
            clippedTriangles.length = 0;
            outer: for (var i = 0; i < trianglesLength; i += 3) {
                var vertexOffset = triangles[i] << 1;
                var x1 = vertices[vertexOffset], y1 = vertices[vertexOffset + 1];
                var u1 = uvs[vertexOffset], v1 = uvs[vertexOffset + 1];
                vertexOffset = triangles[i + 1] << 1;
                var x2 = vertices[vertexOffset], y2 = vertices[vertexOffset + 1];
                var u2 = uvs[vertexOffset], v2 = uvs[vertexOffset + 1];
                vertexOffset = triangles[i + 2] << 1;
                var x3 = vertices[vertexOffset], y3 = vertices[vertexOffset + 1];
                var u3 = uvs[vertexOffset], v3 = uvs[vertexOffset + 1];
                for (var p = 0; p < polygonsCount; p++) {
                    var s = clippedVertices.length;
                    if (this.clip(x1, y1, x2, y2, x3, y3, polygons[p], clipOutput)) {
                        var clipOutputLength = clipOutput.length;
                        if (clipOutputLength == 0)
                            continue;
                        var d0 = y2 - y3, d1 = x3 - x2, d2 = x1 - x3, d4 = y3 - y1;
                        var d = 1 / (d0 * d2 + d1 * (y1 - y3));
                        var clipOutputCount = clipOutputLength >> 1;
                        var clipOutputItems = this.clipOutput;
                        var clippedVerticesItems = spine.Utils.setArraySize(clippedVertices, s + clipOutputCount * vertexSize);
                        for (var ii = 0; ii < clipOutputLength; ii += 2) {
                            var x = clipOutputItems[ii], y = clipOutputItems[ii + 1];
                            clippedVerticesItems[s] = x;
                            clippedVerticesItems[s + 1] = y;
                            clippedVerticesItems[s + 2] = light.r;
                            clippedVerticesItems[s + 3] = light.g;
                            clippedVerticesItems[s + 4] = light.b;
                            clippedVerticesItems[s + 5] = light.a;
                            var c0 = x - x3, c1 = y - y3;
                            var a = (d0 * c0 + d1 * c1) * d;
                            var b = (d4 * c0 + d2 * c1) * d;
                            var c = 1 - a - b;
                            clippedVerticesItems[s + 6] = u1 * a + u2 * b + u3 * c;
                            clippedVerticesItems[s + 7] = v1 * a + v2 * b + v3 * c;
                            if (twoColor) {
                                clippedVerticesItems[s + 8] = dark.r;
                                clippedVerticesItems[s + 9] = dark.g;
                                clippedVerticesItems[s + 10] = dark.b;
                                clippedVerticesItems[s + 11] = dark.a;
                            }
                            s += vertexSize;
                        }
                        s = clippedTriangles.length;
                        var clippedTrianglesItems = spine.Utils.setArraySize(clippedTriangles, s + 3 * (clipOutputCount - 2));
                        clipOutputCount--;
                        for (var ii = 1; ii < clipOutputCount; ii++) {
                            clippedTrianglesItems[s] = index;
                            clippedTrianglesItems[s + 1] = (index + ii);
                            clippedTrianglesItems[s + 2] = (index + ii + 1);
                            s += 3;
                        }
                        index += clipOutputCount + 1;
                    }
                    else {
                        var clippedVerticesItems = spine.Utils.setArraySize(clippedVertices, s + 3 * vertexSize);
                        clippedVerticesItems[s] = x1;
                        clippedVerticesItems[s + 1] = y1;
                        clippedVerticesItems[s + 2] = light.r;
                        clippedVerticesItems[s + 3] = light.g;
                        clippedVerticesItems[s + 4] = light.b;
                        clippedVerticesItems[s + 5] = light.a;
                        if (!twoColor) {
                            clippedVerticesItems[s + 6] = u1;
                            clippedVerticesItems[s + 7] = v1;
                            clippedVerticesItems[s + 8] = x2;
                            clippedVerticesItems[s + 9] = y2;
                            clippedVerticesItems[s + 10] = light.r;
                            clippedVerticesItems[s + 11] = light.g;
                            clippedVerticesItems[s + 12] = light.b;
                            clippedVerticesItems[s + 13] = light.a;
                            clippedVerticesItems[s + 14] = u2;
                            clippedVerticesItems[s + 15] = v2;
                            clippedVerticesItems[s + 16] = x3;
                            clippedVerticesItems[s + 17] = y3;
                            clippedVerticesItems[s + 18] = light.r;
                            clippedVerticesItems[s + 19] = light.g;
                            clippedVerticesItems[s + 20] = light.b;
                            clippedVerticesItems[s + 21] = light.a;
                            clippedVerticesItems[s + 22] = u3;
                            clippedVerticesItems[s + 23] = v3;
                        }
                        else {
                            clippedVerticesItems[s + 6] = u1;
                            clippedVerticesItems[s + 7] = v1;
                            clippedVerticesItems[s + 8] = dark.r;
                            clippedVerticesItems[s + 9] = dark.g;
                            clippedVerticesItems[s + 10] = dark.b;
                            clippedVerticesItems[s + 11] = dark.a;
                            clippedVerticesItems[s + 12] = x2;
                            clippedVerticesItems[s + 13] = y2;
                            clippedVerticesItems[s + 14] = light.r;
                            clippedVerticesItems[s + 15] = light.g;
                            clippedVerticesItems[s + 16] = light.b;
                            clippedVerticesItems[s + 17] = light.a;
                            clippedVerticesItems[s + 18] = u2;
                            clippedVerticesItems[s + 19] = v2;
                            clippedVerticesItems[s + 20] = dark.r;
                            clippedVerticesItems[s + 21] = dark.g;
                            clippedVerticesItems[s + 22] = dark.b;
                            clippedVerticesItems[s + 23] = dark.a;
                            clippedVerticesItems[s + 24] = x3;
                            clippedVerticesItems[s + 25] = y3;
                            clippedVerticesItems[s + 26] = light.r;
                            clippedVerticesItems[s + 27] = light.g;
                            clippedVerticesItems[s + 28] = light.b;
                            clippedVerticesItems[s + 29] = light.a;
                            clippedVerticesItems[s + 30] = u3;
                            clippedVerticesItems[s + 31] = v3;
                            clippedVerticesItems[s + 32] = dark.r;
                            clippedVerticesItems[s + 33] = dark.g;
                            clippedVerticesItems[s + 34] = dark.b;
                            clippedVerticesItems[s + 35] = dark.a;
                        }
                        s = clippedTriangles.length;
                        var clippedTrianglesItems = spine.Utils.setArraySize(clippedTriangles, s + 3);
                        clippedTrianglesItems[s] = index;
                        clippedTrianglesItems[s + 1] = (index + 1);
                        clippedTrianglesItems[s + 2] = (index + 2);
                        index += 3;
                        continue outer;
                    }
                }
            }
        };
        /** Clips the input triangle against the convex, clockwise clipping area. If the triangle lies entirely within the clipping
         * area, false is returned. The clipping area must duplicate the first vertex at the end of the vertices list. */
        SkeletonClipping.prototype.clip = function (x1, y1, x2, y2, x3, y3, clippingArea, output) {
            var originalOutput = output;
            var clipped = false;
            // Avoid copy at the end.
            var input = null;
            if (clippingArea.length % 4 >= 2) {
                input = output;
                output = this.scratch;
            }
            else
                input = this.scratch;
            input.length = 0;
            input.push(x1);
            input.push(y1);
            input.push(x2);
            input.push(y2);
            input.push(x3);
            input.push(y3);
            input.push(x1);
            input.push(y1);
            output.length = 0;
            var clippingVertices = clippingArea;
            var clippingVerticesLast = clippingArea.length - 4;
            for (var i = 0;; i += 2) {
                var edgeX = clippingVertices[i], edgeY = clippingVertices[i + 1];
                var edgeX2 = clippingVertices[i + 2], edgeY2 = clippingVertices[i + 3];
                var deltaX = edgeX - edgeX2, deltaY = edgeY - edgeY2;
                var inputVertices = input;
                var inputVerticesLength = input.length - 2, outputStart = output.length;
                for (var ii = 0; ii < inputVerticesLength; ii += 2) {
                    var inputX = inputVertices[ii], inputY = inputVertices[ii + 1];
                    var inputX2 = inputVertices[ii + 2], inputY2 = inputVertices[ii + 3];
                    var side2 = deltaX * (inputY2 - edgeY2) - deltaY * (inputX2 - edgeX2) > 0;
                    if (deltaX * (inputY - edgeY2) - deltaY * (inputX - edgeX2) > 0) {
                        if (side2) {
                            output.push(inputX2);
                            output.push(inputY2);
                            continue;
                        }
                        // v1 inside, v2 outside
                        var c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                        var s = c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY);
                        if (Math.abs(s) > 0.000001) {
                            var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / s;
                            output.push(edgeX + (edgeX2 - edgeX) * ua);
                            output.push(edgeY + (edgeY2 - edgeY) * ua);
                        }
                        else {
                            output.push(edgeX);
                            output.push(edgeY);
                        }
                    }
                    else if (side2) {
                        var c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                        var s = c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY);
                        if (Math.abs(s) > 0.000001) {
                            var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / s;
                            output.push(edgeX + (edgeX2 - edgeX) * ua);
                            output.push(edgeY + (edgeY2 - edgeY) * ua);
                        }
                        else {
                            output.push(edgeX);
                            output.push(edgeY);
                        }
                        output.push(inputX2);
                        output.push(inputY2);
                    }
                    clipped = true;
                }
                if (outputStart == output.length) {
                    originalOutput.length = 0;
                    return true;
                }
                output.push(output[0]);
                output.push(output[1]);
                if (i == clippingVerticesLast)
                    break;
                var temp = output;
                output = input;
                output.length = 0;
                input = temp;
            }
            if (originalOutput != output) {
                originalOutput.length = 0;
                for (var i = 0, n = output.length - 2; i < n; i++)
                    originalOutput[i] = output[i];
            }
            else
                originalOutput.length = originalOutput.length - 2;
            return clipped;
        };
        SkeletonClipping.makeClockwise = function (polygon) {
            var vertices = polygon;
            var verticeslength = polygon.length;
            var area = vertices[verticeslength - 2] * vertices[1] - vertices[0] * vertices[verticeslength - 1], p1x = 0, p1y = 0, p2x = 0, p2y = 0;
            for (var i = 0, n = verticeslength - 3; i < n; i += 2) {
                p1x = vertices[i];
                p1y = vertices[i + 1];
                p2x = vertices[i + 2];
                p2y = vertices[i + 3];
                area += p1x * p2y - p2x * p1y;
            }
            if (area < 0)
                return;
            for (var i = 0, lastX = verticeslength - 2, n = verticeslength >> 1; i < n; i += 2) {
                var x = vertices[i], y = vertices[i + 1];
                var other = lastX - i;
                vertices[i] = vertices[other];
                vertices[i + 1] = vertices[other + 1];
                vertices[other] = x;
                vertices[other + 1] = y;
            }
        };
        return SkeletonClipping;
    }());
    spine.SkeletonClipping = SkeletonClipping;
    __reflect(SkeletonClipping.prototype, "spine.SkeletonClipping");
})(spine || (spine = {}));
