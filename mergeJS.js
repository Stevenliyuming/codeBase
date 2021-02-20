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

    //删除原先合并的js文件
    var mergeFileList = [];
    var mergeFileList = FileUtil.getDirectoryListing(relativePath + "js");
    for (var i = 0; i < mergeFileList.length; i++) {
        if(mergeFileList[i].indexOf("merged.min") >= 0) {
            FileUtil.remove(mergeFileList[i]);
        }
    }

    var manifest = FileUtil.read(relativePath + "manifest.json", true);
    //trace(manifest);
    var manifestJson = JSON.parse(manifest);
    var jsFiles = manifestJson.initial.concat(manifestJson.game);
    //trace(jsFiles);

    var mergedJS = '';
    for (var i = 0; i < jsFiles.length; i++) {
        if (!FileUtil.exists(relativePath + jsFiles[i])) {
            trace('不存在文件：' + jsFiles[i] + ' -_-#');
            return 0;
        }
        var jsCode = FileUtil.read(relativePath + jsFiles[i], true);
        mergedJS += '\n //' + jsFiles[i] + '\n' + jsCode + '\n';
        FileUtil.remove(relativePath + jsFiles[i]);
    }
    var date = new Date();
    var year = date.getFullYear() % 100;
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var second = date.getSeconds();
    var timeStr = year * 10000000000 + month * 100000000 + day * 1000000 + hour * 10000 + min * 100 + second;
    var mergejsFile = "js/merged.min_" + timeStr.toString() + ".js";
    FileUtil.save(relativePath + mergejsFile, mergedJS);
    manifestJson.initial = [mergejsFile];
    manifestJson.game = [];
    FileUtil.writeJSONAsync(relativePath + "manifest.json", manifestJson);
}

merge();


