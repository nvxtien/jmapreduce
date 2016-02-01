/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSClient

var fs = require('fs');

var master;
function JGFSClient(master) {
    master = master;
}

JGFSClient.prototype.write = function(fileName, data) {
    fs.exists(fileName, (exists) => {
        if (exists) {
            fs.unlink(fileName, (err) => {
                if (err) throw err;
            })
        }
    });

    /*if (exists(filename)) {
        deleteFile(filename);
    }*/

    //var numOfchunks = getNumberOfChunks(len(data));
    //var chunkuuids = master.alloc(filename, numOfchunks);
    //this.writeChunks(chunkuuids, data);
};

function writeChunks(chunkuuids, data) {
    /*var chunks = [data[x:x+this.master.chunksize] for x in range(0, len(data), this.master.chunksize)];

    var chunkservers = this.master.getChunkServers();
    for i in range(0, len(chunkuuids)) {
        var chunkuuid = chunkuuids[i];
        var chunkloc = this.master.getChunkLoc(chunkuuid);
        chunkservers[chunkloc].write(chunkuuid, chunks[i]);
    }*/
}

/*function exists(filename) {
    return false;
};*/

/*function deleteFile(filename) {

};*/
