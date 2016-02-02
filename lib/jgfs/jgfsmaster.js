/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSMaster

var uuid = require('node-uuid');
var JGFSChunkServer = require('./jgfschunkserver.js')

var num_chunkservers = 5;
var max_chunkservers = 10;
var max_chunksperfile = 100;
var chunksize = 10;
var chunkrobin = 0;
var filetable = []; //file to chunk mapping
var chunktable = {}; //chunkuuid to chunkloc mapping
var chunkservers = []; //loc id to chunkserver mapping

function JGFSMaster() {
    initChunkServers();
}

function initChunkServers() {
    Array.apply(null, Array(num_chunkservers)).map((e, i) => chunkservers[i] = new JGFSChunkServer(i));
    /*for i in range(0, this.num_chunkservers) {
        var chunkserver = new JGFSChunkServer(i);
        chunkservers[i] = chunkserver;
    }*/
};

JGFSMaster.prototype.ChunkServersCollect = function() {
    return chunkservers;
};

JGFSMaster.prototype.alloc = function(fileName, numOfchunks) {
    let chunkuuids = this.allocChunks(numOfchunks);
    filetable[fileName] = chunkuuids;
    return chunkuuids;
};

JGFSMaster.prototype.allocChunks = function(numOfchunks) {
    let chunkuuids = [];
    var chunkrobin = 0;
    Array.apply(null, Array(numOfchunks)).map(() => {
        let chunkuuid = uuid.v1();
        let chunkloc  = chunkrobin;
        chunktable[chunkuuid] = chunkloc;
        chunkuuids.push(chunkuuid);
        chunkrobin = (chunkrobin + 1) % num_chunkservers;
    });
    return chunkuuids;
};

JGFSMaster.prototype.chunksize = function() {
    return chunksize;
};