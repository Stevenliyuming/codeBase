var fs = require('fs');
var FileUtil = require("./FileUtil");

var trace = console.log;
var relativePath = `./bin-release/web/${process.argv[2]}/`;
var rootPath;

var merge = function () {
    // var unixPath = FileUtil.escapePath(process.argv[1]);
    // rootPath = unixPath.substr(0, unixPath.lastIndexOf("/")) + relativePath;
    // trace(unixPath);
    // trace(relativePath);
    // trace(rootPath);
    var manifest = FileUtil.read(relativePath + "manifest.json", true);
    //trace(manifest);
    var manifestJson = JSON.parse(manifest);
    var jsFiles = manifestJson.initial.concat(manifestJson.game);
    //trace(jsFiles);

    var mergeedJS = '';
    for (var i = 0; i < jsFiles.length; i++) {
        if (!FileUtil.exists(relativePath + jsFiles[i])) {
            trace('不存在文件：' + jsFiles[i] + ' -_-#');
            return 0;
        }
        var jsCode = FileUtil.read(relativePath + jsFiles[i], true);
        mergeedJS += '\n //' + jsFiles[i] + '\n' + jsCode + '\n';
        FileUtil.remove(relativePath + jsFiles[i]);
    }
    FileUtil.save(relativePath + 'js/merged.js', mergeedJS);
    manifestJson.initial = ["js/merged.js"];
    manifestJson.game = [];
    FileUtil.writeJSONAsync(relativePath + "manifest.json", manifestJson);
}

merge();


