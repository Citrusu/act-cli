/**
 * Created by Citrus on 17/07/2017.
 */
const fs = require('fs');

const config = require('./config.json');

function init(){
    let module = config.module;
    let fileList = config.fileList;
    let map = config.page;
    let dists = map.dist;
    for(let key in dists){
        fileList.forEach(async (n, i) => {
            let dist = dists[key] + module +'/'+ n.fileName + '.' + key;
            mkDir(dist);
            let tem = await readFile(map.src[key]);
            let page = useFile(tem, n.fileName);
            saveFile(dist, page);
        })
    }

}
init();

/*
* 检查/创建目录
* */
function mkDir(src) {
    //创建多层目录
    let srcArr = src.split('/');
    let file = '';
    srcArr.splice(0,1);
    srcArr.splice(srcArr.length - 1, 1);
    let srcStr = './';
    srcArr.forEach((n, i) => {
        srcStr += n + '/';
        // console.log('检查目录'+srcStr);
        //检查目录是否存在，不存在则创建
        if(!fs.existsSync(srcStr)){
            fs.mkdirSync(srcStr);
            console.log(`创建目录 ${srcStr}`);
        }
    });
}

/*
* 读取文件
* */
function readFile(src){
    return new Promise((resolved, reject) => {
        fs.readFile(src, 'utf-8', function(err, data){
            if(err){
                console.log(err);
            }else{
                resolved(data);
            }
        });
    })
}

/*
* 操作文件
* */
function useFile(file, fileName){
    let rules = {
        Date: new Date(),
        module: config.module,
        page: fileName,
        wxshare: '<include file="_wxshare" />'
    };
    let page = file;

    for(let k in rules){
        let patt = new RegExp('{{'+ k +'}}', 'g');
        page = page.replace(patt, rules[k]);
    }

    return page;
}

/*
* 保存文件
* */
function saveFile(dist, fileData){
    if(fs.existsSync(dist)){
        console.log(`已存在 ${dist}`);
        return false;
    }
    fs.writeFile(dist, fileData, function(err){
        if(err){
            return console.log(err);
        }

        console.log(`已创建 ${dist}`);
    });
}
console.log('async')