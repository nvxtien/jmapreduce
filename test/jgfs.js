/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

var expect = require('chai').expect;
var fs = require('fs');

var JGFSMaster = require('../lib/jgfs/jgfsmaster.js');
var JGFSClient = require('../lib/jgfs/jgfsclient.js');

describe("should return chunk servers when init master", function(){
    var master = new JGFSMaster();
    expect(master.ChunkServersCollect().length).to.equal(5);
});

describe("readFile", function() {

    it('readFile', function(done){

        var content = fs.readFileSync('/home/joseph/global-groovy.log', 'utf8');
        console.log(content)
        done();
    });
});

describe("should return client", function() {

    it('num of chunks', function(done){
        var input = "\n        " +
            "This file tells you all about python that you ever wanted to know.\n        " +
            "Not every README is as informative as this one, but we aim to please.\n        " +
            "Never yet has there been so much information in so little space.\n        ";

        var master = new JGFSMaster();
        var client = new JGFSClient({master: master});
        client.write('/home/joseph/test/test.txt', input);
        client.read('/home/joseph/test/test.txt').then(data => {console.log(">>><<<< %s\n", JSON(data.join(''), null, 2))});
        //master.dump_metadata();
        done();
    });

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
