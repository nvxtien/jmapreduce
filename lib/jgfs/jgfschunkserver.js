/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSChunkServer;

var chunkloc;
var chunktable = {};
//var local_filesystem_root = "/tmp/gfs/chunks/" + repr(chunkloc)

function JGFSChunkServer(chunkloc) {
    this.chunkloc = chunkloc
    chunktable = {}
    //self.local_filesystem_root = "/tmp/gfs/chunks/" + repr(chunkloc)
    /*if not os.access(self.local_filesystem_root, os.W_OK):
    os.makedirs(self.local_filesystem_root)*/
}

