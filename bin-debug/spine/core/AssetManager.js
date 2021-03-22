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
    var AssetManager = (function () {
        function AssetManager(textureLoader, pathPrefix) {
            if (pathPrefix === void 0) { pathPrefix = ""; }
            this.assets = {};
            this.errors = {};
            this.toLoad = 0;
            this.loaded = 0;
            this.rawDataUris = {};
            this.textureLoader = textureLoader;
            this.pathPrefix = pathPrefix;
        }
        AssetManager.prototype.downloadText = function (url, success, error) {
            var request = new XMLHttpRequest();
            request.overrideMimeType("text/html");
            if (this.rawDataUris[url])
                url = this.rawDataUris[url];
            request.open("GET", url, true);
            request.onload = function () {
                if (request.status == 200) {
                    success(request.responseText);
                }
                else {
                    error(request.status, request.responseText);
                }
            };
            request.onerror = function () {
                error(request.status, request.responseText);
            };
            request.send();
        };
        AssetManager.prototype.downloadBinary = function (url, success, error) {
            var request = new XMLHttpRequest();
            if (this.rawDataUris[url])
                url = this.rawDataUris[url];
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.onload = function () {
                if (request.status == 200) {
                    success(new Uint8Array(request.response));
                }
                else {
                    error(request.status, request.responseText);
                }
            };
            request.onerror = function () {
                error(request.status, request.responseText);
            };
            request.send();
        };
        AssetManager.prototype.setRawDataURI = function (path, data) {
            this.rawDataUris[this.pathPrefix + path] = data;
        };
        AssetManager.prototype.loadBinary = function (path, success, error) {
            var _this = this;
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            path = this.pathPrefix + path;
            this.toLoad++;
            this.downloadBinary(path, function (data) {
                _this.assets[path] = data;
                if (success)
                    success(path, data);
                _this.toLoad--;
                _this.loaded++;
            }, function (state, responseText) {
                _this.errors[path] = "Couldn't load binary " + path + ": status " + status + ", " + responseText;
                if (error)
                    error(path, "Couldn't load binary " + path + ": status " + status + ", " + responseText);
                _this.toLoad--;
                _this.loaded++;
            });
        };
        AssetManager.prototype.loadText = function (path, success, error) {
            var _this = this;
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            path = this.pathPrefix + path;
            this.toLoad++;
            this.downloadText(path, function (data) {
                _this.assets[path] = data;
                if (success)
                    success(path, data);
                _this.toLoad--;
                _this.loaded++;
            }, function (state, responseText) {
                _this.errors[path] = "Couldn't load text " + path + ": status " + status + ", " + responseText;
                if (error)
                    error(path, "Couldn't load text " + path + ": status " + status + ", " + responseText);
                _this.toLoad--;
                _this.loaded++;
            });
        };
        AssetManager.prototype.loadTexture = function (path, success, error) {
            var _this = this;
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            path = this.pathPrefix + path;
            var storagePath = path;
            this.toLoad++;
            var img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = function (ev) {
                var texture = _this.textureLoader(img);
                _this.assets[storagePath] = texture;
                _this.toLoad--;
                _this.loaded++;
                if (success)
                    success(path, img);
            };
            img.onerror = function (ev) {
                _this.errors[path] = "Couldn't load image " + path;
                _this.toLoad--;
                _this.loaded++;
                if (error)
                    error(path, "Couldn't load image " + path);
            };
            if (this.rawDataUris[path])
                path = this.rawDataUris[path];
            img.src = path;
        };
        AssetManager.prototype.loadTextureAtlas = function (path, success, error) {
            var _this = this;
            if (success === void 0) { success = null; }
            if (error === void 0) { error = null; }
            var parent = path.lastIndexOf("/") >= 0 ? path.substring(0, path.lastIndexOf("/")) : "";
            path = this.pathPrefix + path;
            this.toLoad++;
            this.downloadText(path, function (atlasData) {
                var pagesLoaded = { count: 0 };
                var atlasPages = new Array();
                try {
                    var atlas = new spine.TextureAtlas(atlasData, function (path) {
                        atlasPages.push(parent == "" ? path : parent + "/" + path);
                        var image = document.createElement("img");
                        image.width = 16;
                        image.height = 16;
                        return new spine.FakeTexture(image);
                    });
                }
                catch (e) {
                    var ex = e;
                    _this.errors[path] = "Couldn't load texture atlas " + path + ": " + ex.message;
                    if (error)
                        error(path, "Couldn't load texture atlas " + path + ": " + ex.message);
                    _this.toLoad--;
                    _this.loaded++;
                    return;
                }
                var _loop_1 = function (atlasPage) {
                    var pageLoadError = false;
                    _this.loadTexture(atlasPage, function (imagePath, image) {
                        pagesLoaded.count++;
                        if (pagesLoaded.count == atlasPages.length) {
                            if (!pageLoadError) {
                                try {
                                    var atlas = new spine.TextureAtlas(atlasData, function (path) {
                                        return _this.get(parent == "" ? path : parent + "/" + path);
                                    });
                                    _this.assets[path] = atlas;
                                    if (success)
                                        success(path, atlas);
                                    _this.toLoad--;
                                    _this.loaded++;
                                }
                                catch (e) {
                                    var ex = e;
                                    _this.errors[path] = "Couldn't load texture atlas " + path + ": " + ex.message;
                                    if (error)
                                        error(path, "Couldn't load texture atlas " + path + ": " + ex.message);
                                    _this.toLoad--;
                                    _this.loaded++;
                                }
                            }
                            else {
                                _this.errors[path] = "Couldn't load texture atlas page " + imagePath + "} of atlas " + path;
                                if (error)
                                    error(path, "Couldn't load texture atlas page " + imagePath + " of atlas " + path);
                                _this.toLoad--;
                                _this.loaded++;
                            }
                        }
                    }, function (imagePath, errorMessage) {
                        pageLoadError = true;
                        pagesLoaded.count++;
                        if (pagesLoaded.count == atlasPages.length) {
                            _this.errors[path] = "Couldn't load texture atlas page " + imagePath + "} of atlas " + path;
                            if (error)
                                error(path, "Couldn't load texture atlas page " + imagePath + " of atlas " + path);
                            _this.toLoad--;
                            _this.loaded++;
                        }
                    });
                };
                for (var _i = 0, atlasPages_1 = atlasPages; _i < atlasPages_1.length; _i++) {
                    var atlasPage = atlasPages_1[_i];
                    _loop_1(atlasPage);
                }
            }, function (state, responseText) {
                _this.errors[path] = "Couldn't load texture atlas " + path + ": status " + status + ", " + responseText;
                if (error)
                    error(path, "Couldn't load texture atlas " + path + ": status " + status + ", " + responseText);
                _this.toLoad--;
                _this.loaded++;
            });
        };
        AssetManager.prototype.get = function (path) {
            path = this.pathPrefix + path;
            return this.assets[path];
        };
        AssetManager.prototype.remove = function (path) {
            path = this.pathPrefix + path;
            var asset = this.assets[path];
            if (asset.dispose)
                asset.dispose();
            this.assets[path] = null;
        };
        AssetManager.prototype.removeAll = function () {
            for (var key in this.assets) {
                var asset = this.assets[key];
                if (asset.dispose)
                    asset.dispose();
            }
            this.assets = {};
        };
        AssetManager.prototype.isLoadingComplete = function () {
            return this.toLoad == 0;
        };
        AssetManager.prototype.getToLoad = function () {
            return this.toLoad;
        };
        AssetManager.prototype.getLoaded = function () {
            return this.loaded;
        };
        AssetManager.prototype.dispose = function () {
            this.removeAll();
        };
        AssetManager.prototype.hasErrors = function () {
            return Object.keys(this.errors).length > 0;
        };
        AssetManager.prototype.getErrors = function () {
            return this.errors;
        };
        return AssetManager;
    }());
    spine.AssetManager = AssetManager;
    __reflect(AssetManager.prototype, "spine.AssetManager", ["spine.Disposable"]);
})(spine || (spine = {}));
