/**
 * Created by joseph on 01/02/2016.
 */

var fs = require('fs');

writeFile('/home/joseph/test/test.txt', 'hello')
    .then((msg) => {
        console.log("===================");
        console.log(msg);
    }, err => {
        console.log("===================");
        console.log(err);
    });

function writeFile(fileName, content){
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, content, (err) => {
            if (err) {
                console.log("===================");
                reject(Error("error"));
            }
            else {
                console.log("===================");
                resolve("completed");
            }
        })
    });
};