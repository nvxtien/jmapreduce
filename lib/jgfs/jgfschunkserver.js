/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSChunkServer;

//var Repr = require('repr.js');
//var repr = new Repr();
var fs = require('fs');
var mkdirp = require('mkdirp');

function JGFSChunkServer(chunkloc) {
    this.chunkloc = chunkloc;
    this.chunktable = [];
    this.local_filesystem_root = "/tmp/gfs/chunks/" + String(this.chunkloc);
    //console.log(this.local_filesystem_root)
    mkdirp(this.local_filesystem_root, (err) => {
        if (err) throw err;
    });
};

JGFSChunkServer.prototype.write =  function(chunkuuid, chunk) {
    let local_filename = chunk_filename.call(this, chunkuuid);
    fs.writeFile(local_filename, chunk, (err) => {
        if (err) throw err;
    });
    console.log("local_filename ===> %s", local_filename)
    //this.chunktable[chunkuuid] = local_filename;
};

function chunk_filename(chunkuuid) {
    console.log("chunkuuid ===> %s", String(chunkuuid));
    return this.local_filesystem_root + '/' + String(chunkuuid) + '.gfs';
};

JGFSChunkServer.prototype.test = function() {
    console.log("test");
};