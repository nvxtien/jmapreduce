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

    //console.log("data size %s", data.length)
    let numOfchunks = numChunks.call(self, data.length);
    console.log("numOfchunks %s", numOfchunks);
    let chunkuuids = this.master.alloc(fileName, numOfchunks);
    //console.log("chunkuuids %s %s", chunkuuids.length, chunkuuids);
    this.writeChunks(chunkuuids, data);
};

JGFSClient.prototype.writeChunks = function(chunkuuids, data) {
    //console.log("data %s", data);

    var chunks = [];
    var step = this.master.chunksize();
    //console.log("step %s", step);

    var numOfsteps = Math.ceil(data.length / step);
    //console.log("numOfsteps <>>>>> %s", numOfsteps)
    Array.apply(null, Array(numOfsteps)).map((_,i) => {
        console.log("============<>>>>> %s", data.substring(i * step, (i + 1) * step));
        chunks.push(String(data.substring(i * step, (i + 1) * step)));
    });

    console.log("chunks %s", chunks);

    var chunkservers = this.master.ChunkServersCollect();
    chunkservers[0].test();

    Array.apply(null, Array(chunkuuids.length)).map((_,i) => {
        let chunkuuid = chunkuuids[i];
        let chunkloc = this.master.getChunkLoc(chunkuuid);
        //console.log("chunkuuid %s ", chunkuuid);
        //console.log("chunkloc[chunkuuid] %s ", chunkloc[chunkuuid]);
        chunkservers[chunkloc[chunkuuid]].write(chunkuuid, chunks[i]);
    });

    /*var chunks = [data[x:x+this.master.chunksize] for x in range(0, len(data), this.master.chunksize)];
    var chunkservers = this.master.getChunkServers();
    for i in range(0, len(chunkuuids)) {
        var chunkuuid = chunkuuids[i];
        var chunkloc = this.master.getChunkLoc(chunkuuid);
        chunkservers[chunkloc].write(chunkuuid, chunks[i]);
    }*/
};

JGFSClient.prototype.read = function(fileName) {
    //if (!exists) throw Error("read error");

    var chunksABC = [];

    var chunkUUIDs = this.master.getChunkUUIDs(fileName);

    //console.log(JSON.stringify(chunkUUIDs, null, 2));

    let chunkservers = this.master.ChunkServersCollect();
    var promisePool = chunkUUIDs.map((chunkuuid) => {
        let chunkloc = this.master.getChunkLoc(chunkuuid);
        return chunkservers[chunkloc[chunkuuid]].read(chunkuuid);
    })

    return Promise.all(promisePool);

    //console.log("()()() %s", chunksABC)
    //var data = chunks.reduce((x, y) => (x + y));

    //var data = '';
    //return data;
};

function numChunks(size) {
    let num_chunks = Math.floor(size / this.master.chunksize());
    //console.log(">>> %s", num_chunks);
    //console.log(">>>>> %s", size % this.master.chunksize());
    if (size % this.master.chunksize() > 0) {
        num_chunks = num_chunks + 1;
    }
    return num_chunks;
};

