/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

var expect = require('chai').expect;
var fs = require('fs');
var path = require('path')

var JGFSMaster = require('../lib/jgfs/jgfsmaster.js');
var JGFSClient = require('../lib/jgfs/jgfsclient.js');

describe("should return chunk servers when init master", function(done){
    var master = new JGFSMaster();
    expect(master.ChunkServersCollect().length).to.equal(5);
    //done(null, "OK");
});

describe("should client", function() {

    var promise =  writeFile('/home/joseph/test/test.txt', 'hello');
    promise.then(console.log, console.error);

   /*promise.then((msg) => {
        expect(msg).to.equal("completed1");
    }, err => {
        expect(err).to.equal("error1111");
    });*/

    //var master = new JGFSMaster();
    //var client = new JGFSClient(master);
    //client.write('/home/joseph/test/test.txt', "hello");

    //done(null, "OK");
});

function writeFile(fileName, content){
    var promise = new Promise((resolve, reject) => {
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

    return promise;
};

