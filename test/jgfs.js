/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

var expect = require('chai').expect;
var fs = require('fs');
var path = require('path')

var JGFSMaster = require('../lib/jgfs/jgfsmaster.js');
var JGFSClient = require('../lib/jgfs/jgfsclient.js');

describe("should return chunk servers when init master", function(){
    var master = new JGFSMaster();
    expect(master.ChunkServersCollect().length).to.equal(5);
});

describe("should return client", function() {

    it('before', function(done){
        var promise =  writeFile('/home/joseph/test/test.txt', 'hello');
         return promise.then(function(data){
            expect(data).to.equal("completed");
            done();
         });
    });

    it('delete file', function(done){
        var master = new JGFSMaster();
        var client = new JGFSClient(master);
        client.write('/home/joseph/test/test.txt', 'hello');
        done();
    });



    /*var promise =  writeFile('/home/joseph/test/test.txt', 'hello');
    return promise.then(function(data){
        console.log(data);
        expect(data).to.equal("completed");
        done();
    });*/

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
                reject(Error("error"));
            }
            else {
                resolve("completed");
            }
        })
    });

    return promise;
};

