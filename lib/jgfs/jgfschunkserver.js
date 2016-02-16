/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSChunkServer;

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
//var Promise = require('bluebird');

function JGFSChunkServer(chunkloc) {
    this.chunkloc = chunkloc;
    this.chunktable = [];
    this.local_filesystem_root = "/tmp/gfs/chunks/" + String(this.chunkloc);
    //console.log(this.local_filesystem_root)
    mkdirp(this.local_filesystem_root, (err) => {
        if (err) throw err;
    });
};

JGFSChunkServer.prototype.write = function (chunkuuid, chunk) {
    let local_filename = chunk_filename.call(this, chunkuuid);
    //console.log("local filename %s", local_filename);
    fs.writeFile(local_filename, chunk, (err) => {
        if (err) throw err;
    });
    //console.log("local_filename ===> %s", local_filename);
    let obj = {};
    obj[chunkuuid] = local_filename;
    this.chunktable.push(obj);// [chunkuuid] = local_filename;
};

JGFSChunkServer.prototype.read = function (chunkuuid) {
    let local_filename = chunk_filename.call(this, chunkuuid);
    var promise = new Promise((resolve, reject) => {
        fs.readFile(local_filename, 'utf8', (err, content) => {
            if (err) {
                reject(Error(err))
            }
            else {
                var result = [content]
                console.log(result)
                resolve(result)
            }
        });
    }).then(content => {
        return content;
    })

    return promise;
};

JGFSChunkServer.prototype.test = function () {
    //console.log("test");
    return 'test';
};

function readFileABC(fileName, done) {

    console.log("readFileABC %s", fileName);

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        else {
            done(null,data);
        }
    });
};

function chunk_filename(chunkuuid) {
    return this.local_filesystem_root + '/' + String(chunkuuid) + '.gfs';
};
