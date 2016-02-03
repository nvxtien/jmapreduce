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
var chunktable = []; //chunkuuid to chunkloc mapping
var chunkservers = []; //loc id to chunkserver mapping

function JGFSMaster() {
    initChunkServers();
}

function initChunkServers() {
    Array.apply(null, Array(num_chunkservers)).map(function(e, i){
        chunkservers[i] = new JGFSChunkServer(i)
    });
};

JGFSMaster.prototype.ChunkServersCollect = function() {
    return chunkservers;
};

JGFSMaster.prototype.alloc = function(fileName, numOfchunks) {
    let chunkuuids = this.allocChunks(numOfchunks);
    //filetable[fileName] = chunkuuids;
    filetable.push({fileName: chunkuuids});
    return chunkuuids;
};

JGFSMaster.prototype.allocChunks = function(numOfchunks) {
    var self = this;
    let chunkuuids = [];
    var chunkrobin = 0;
    //var chunkdesc = {};
    Array.apply(null, Array(numOfchunks)).map(() => {
        let chunkuuid = uuid.v1();
        let chunkloc  = chunkrobin;
        let chunkdesc = {};
        chunkdesc[chunkuuid] = chunkloc;
        chunktable.push(chunkdesc);
        chunkuuids.push(chunkuuid);
        //console.log("===============================>>>> dump_metadata %s", JSON.stringify(chunkdesc, null, 2));
        chunkrobin = (chunkrobin + 1) % num_chunkservers;
    });
    //console.log("===============================>>>> dump_metadata %s", JSON.stringify(chunktable, null, 2));
    return chunkuuids;
};

JGFSMaster.prototype.getChunkLoc = function(chunkuuid) {
    return chunktable.find(function(e){
        return e[chunkuuid] > -1;
    });
};

JGFSMaster.prototype.chunksize = function() {
    return chunksize;
};

JGFSMaster.prototype.dump_metadata = function() {
    //console.log("===============================>>>> dump_metadata %s", JSON.stringify(chunktable, null, 2));
    //# print("Filetable:")
    //# for filename, chunkuuids in self.filetable.items():
    //#     print(filename, "with", len(chunkuuids),"chunks")
    //# print("Chunkservers: ", len(self.chunkservers))
    //# print("Chunkserver Data:")
    //for chunkuuid, chunkloc in sorted(self.chunktable.iteritems(), key = operator.itemgetter(1)):
        //chunk = self.chunkservers[chunkloc].read(chunkuuid)
        //print(chunkloc, chunkuuid, chunk)

    chunktable.map((e, _) => {
        console.log("===============================>>>> %s", JSON.stringify(e, null, 2));
    });
};