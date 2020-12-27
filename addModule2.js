var fs = require('fs');
var args = process.argv.splice(2);
var rootPath = './src'//`./src/${args[0].split('.').join("/")}/ts`;
var jsPath = `./src/${args[0].split('.').join("/")}/js`;
selectTs(rootPath);
function selectTs(_src) {
    fs.readdir(_src, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach((val) => {
                let _path = _src + '/' + val;
                let stat = fs.statSync(_path);
                if (stat.isDirectory()) {
                    selectTs(_path);
                } else {
                    if (stat.isFile()) {
                        if (val.split('.').pop() == "ts")// && val != "Module.ts") 
                        {
                            addModule(_path);
                        }
                    }
                }
            })
        }
    })
}

function addModule(_src) {
    fs.readFile(_src, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let str1 = data.toString("utf-8");
            //let str = str1.replace(/\ +/g, "").replace(/[\r\n]/g, "");
            //console.log(str1);
            let index = str1.indexOf("module");
            //console.log(index);
            if(index >= 0) {
                //console.log(str1);
                let ind1 = str1.indexOf("{");
                if(ind1 != -1) {
                    str1 = str1.substring(ind1);
                    let str2 = "module " + args[0] + str1;
                    //console.log(_src);
                    fs.writeFile(_src, str2, () => {
                        console.log(_src + "修改模块完成");
                    });
                }
            }
            else {
                //str = "module " + args[0] + "{\nexport " + str1 + "}";
                var str3 = "";
                //let classIndex = str1.indexOf("class");
                //var startPos = 0;
                var classStr = str1.split("class");
                //console.log(classStr);
                for(let i=0; i<classStr.length; ++i) {
                    // str3 += " export class ";
                    // str3 += classStr[i];

                    if((i%2)==0 && i != classStr.length - 1) {
                        str3 += classStr[i];
                    } else {
                        str3 += " export class ";
                        str3 += classStr[i];
                    }
                }
                //console.log(str3);
                //console.log(classIndex);
                // while(classIndex >= 0) {
                //     str3 = str1.substring(startPos, classIndex);
                //     str3 += " export class ";            
                //     startPos = classIndex+5;
                //     let sub2 = str1.substring(startPos, str1.length);
                //     console.log("11==>" + sub2);
                //     classIndex = sub2.indexOf("class");
                //     console.log(classIndex);
                //     if(classIndex == -1) {
                //         str3 += sub2;
                //     }
                // }
                let str = "module " + args[0] + "{" + str3 + "}";
                fs.writeFile(_src, str, () => {
                    console.log(_src + "添加模块完成");
                });
            }
        }
    })
}

// (function deleteJsFile(_src) {
//     fs.readdir(_src, (err, files) => {
//         if (err) {
//             console.log(err);
//         } else {
//             files.forEach((val) => {
//                 let _path = _src + '/' + val;
//                 let stat = fs.statSync(_path);
//                 if (stat.isDirectory()) {
//                     fs.rmdirSync(_path);
//                 } else {
//                     if (stat.isFile()) {
//                         fs.unlinkSync(_path);
//                     }
//                 }
//             })
//         }
//     })
// }(jsPath))