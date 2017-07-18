/**
 * Created by Citrus on 17/07/2017.
 */
const fs = require('fs');

const config = require('./config.json');

function init(){
    let list = config.fileList;
    let map = config.page;
    list.forEach(function(n, i){
        let dist = map.dist.html;
        checkFile(dist, function(){
            // let temp = readFile(map.src.html);
            // console.log(temp);return false;
            // let page = useFile(temp);
            // saveFile(map.dist.html + config.module, page);
        });
    })
}
init();

/*
* 检查文件状态
* 为了安全，已经存在的文件不会生成
* */
function checkFile(src, func) {
    //创建多层目录
    let srcArr = src.split('/');
    srcArr.splice(0,1);
    if(srcArr[srcArr.length - 1] === ''){
        srcArr.splice(srcArr.length - 1 ,1);
    }
    // console.log(srcArr);
    let srcStr = './';
    srcArr.forEach((n, i) => {
        srcStr += n + '/';
        //检查目录是否存在，不存在则创建
        if(!fs.existsSync(srcStr)){
            fs.mkdir(srcStr, () => {
                console.log(`创建目录 ${srcStr}`);
            });
        }
    });
    return false;
    fs.stat(src, function(err, stats){
        // console.log(src);

        if(err){
            fs.mkdirSync('./test/src/', function(err){
                if(err){
                    console.log(err);
                    return false;
                }
                console.log('创建目录' + src);
            });
        };

        // console.log(stats)
        // if(stats.isFile()){
        //     console.log(`${src} 已经存在`);
        // }else{
            //func();
        // }
    })
}

/*
* 读取文件
* */
function readFile(src){
    fs.readFile(src, 'utf-8', function(err, data){
        if(err){
            console.log(err)
        }else{
            return data;
        }
    });
}

/*
* 操作文件
* */
function useFile(file){
    let rule = [
        ['Date', new Date()],
        ['title', config.name]
    ];
    let page = file;
    rule.forEach(function(n, i){
        page.replace(/{{"+ n[0] +"}}/g, n[1]);
    });

    return page;
}

/*
* 保存文件
* */
function saveFile(dist, fileData){
    fs.writeFile(dist, fileData, function(err){
        if(err){
            return console.log(err);
        }else{
            console.log(`已创建 ${dist}`);
        }
    });
}