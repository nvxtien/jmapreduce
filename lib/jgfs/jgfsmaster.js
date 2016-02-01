/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSMaster

var JGFSChunkServer = require('./jgfschunkserver.js')

var num_chunkservers = 5;
var max_chunkservers = 10;
var max_chunksperfile = 100;
var chunksize = 10;
var chunkrobin = 0;
var filetable = {}; //file to chunk mapping
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