/**
 * Created by Citrus on 17/07/2017.
 */
const fs = require('fs');

const config = require('./config.json');

fs.readFile('./template/js/demo.js', 'utf-8', function(err, data){
    // console.log(data.replace(/{{name}}/g, config.name));
    let page = data.replace(/{{Date}}/g, new Date());
    fs.writeFile('./dist/page.js', page, function(err){
        if(err){
            return console.log(err);
        }
    });
});

function fileStatus() {
    
}