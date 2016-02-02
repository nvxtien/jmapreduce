/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSClient

var fs = require('fs');

var self;

function JGFSClient(options) {
    self = this;
    if (options instanceof Object) {
        this.master = options.master;
    }
};

JGFSClient.prototype.write = function(fileName, data) {
    fs.exists(fileName, (exists) => {
        if (exists) {
            fs.unlink(fileName, (err) => {
                if (err) throw err;
            });
        };
    });

    console.log("data size %s", data.length)
    let numOfchunks = numChunks.call(self, data.length);
    console.log("numOfchunks %s", numOfchunks);
    let chunkuuids = this.master.alloc(fileName, numOfchunks);
    console.log(">>> %s", chunkuuids);
    this.writeChunks(chunkuuids, data);
};

JGFSClient.prototype.writeChunks = function(chunkuuids, data) {
    /*var chunks = [data[x:x+this.master.chunksize] for x in range(0, len(data), this.master.chunksize)];

    var chunkservers = this.master.getChunkServers();
    for i in range(0, len(chunkuuids)) {
        var chunkuuid = chunkuuids[i];
        var chunkloc = this.master.getChunkLoc(chunkuuid);
        chunkservers[chunkloc].write(chunkuuid, chunks[i]);
    }*/
};

function numChunks(size) {
    let num_chunks = Math.floor(size / this.master.chunksize());
    console.log(">>> %s", num_chunks);
    console.log(">>>>> %s", size % this.master.chunksize());
    if (size % this.master.chunksize() > 0) {
        num_chunks = num_chunks + 1;
    }
    return num_chunks;
};

/*function exists(filename) {
    return false;
};*/

/*function deleteFile(filename) {

};*/
