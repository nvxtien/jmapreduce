/**
 * Created by joseph on 01/02/2016.
 */
'use strict'

module.exports = JGFSChunkServer;

//var Repr = require('repr.js');
//var repr = new Repr();
var fs = require('fs');
var mkdirp = require('mkdirp');
//var Fiber = require('fibers');
//var Future = require('fibers/future');

//var Rx = require('rx');

//var async = require('async');
//var Meteor = require('meteor');

function JGFSChunkServer(chunkloc) {
    this.chunkloc = chunkloc;
    this.chunktable = [];
    this.local_filesystem_root = "/tmp/gfs/chunks/" + String(this.chunkloc);
    //console.log(this.local_filesystem_root)
    mkdirp(this.local_filesystem_root, (err) => {
        if (err) throw err;
    });
};

JGFSChunkServer.prototype.write = function (chunkuuid, chunk) {
    let local_filename = chunk_filename.call(this, chunkuuid);
    //console.log("local filename %s", local_filename);
    fs.writeFile(local_filename, chunk, (err) => {
        if (err) throw err;
    });
    //console.log("local_filename ===> %s", local_filename);
    let obj = {};
    obj[chunkuuid] = local_filename;
    this.chunktable.push(obj);// [chunkuuid] = local_filename;
};

JGFSChunkServer.prototype.read = function (chunkuuid) {
    //var content = '';
    let local_filename = chunk_filename.call(this, chunkuuid);
    //console.log("local_filename %s", local_filename);
    /*fs.readFile(local_filename, 'utf8', (err, data)
     => {
     console.log("data from local_filename: %s", String(data))
     if (err) {
     throw err;
     }
     content = String(data);
     });*/

    /*Fiber(function () {
        var result = readFileABC(local_filename);
        console.log("xxxxxxxx", JSON.stringify(result, null, 2));
    });*/

    //var ii = inc.run(local_filename)
    //console.log(ii);


    /*for (var ii = inc.run(1); ii <= 10; ii = inc.run(1)) {
        console.log(ii);
    }*/

    /*readFile(local_filename)
     .then((data) => {
     return data;
     console.log('data %s', data);
     }, (err) => {
     console.log(err);
     });*/

    //content = yield* fs.readFile(local_filename, "utf8");

    //content = run.next(String(local_filename));
    //var content = fs.readFileSync(local_filename, 'utf8');
    //console.log("???? %s", content)

    //content = Future.wrap(readFileABC(local_filename));

    //console.log("???? %s", content)


    /*Rx.Observable.fromArray(local_filename)
        .map(function (e) {
            return e;
        })
        .subscribe(function (e) {
                /!*reduce(e, function (err, data) {
                    result.push(data);
                });*!/

                fs.readFile(e, 'utf8', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        content = data;
                    }
                });

            },
            function (err) {
                //callback(err);
            },
            function () {
                console.log("... %s ", data)
                console.log('reduce completed');
            });*/

    /*async.waterfall([
            async.apply(readFileABC, local_filename)
        ],
        function callback(err, result) {
            //done(err, result)

            //console.log("... %s ", result)
            content = result;
            //return result;

        }
    );*/

    /*Fiber(function() {
        content = getSecretData(local_filename);
        console.log(content);  // the decrypted secret
    }).run();*/

    //var getSecretDataSynchronously =  Meteor.wrapAsync(getSecretData);
    //content = getSecretDataSynchronously(local_filename);  // <-- no wait() here!

    var content = fs.readFileSync(local_filename, 'utf8');

    /*fs.readFile(local_filename, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        else {
            console.log("data >> %s", data)
            content = data;
            //fiber.run(data);
            //Fiber.yield(data);
            //var result = Fiber.yield(data);
            //console.log(result)
            //console.log("result >> %s", result)
            //return result;
        }
        //return total;
        //Fiber.yield(data);
    });*/

    console.log("... %s ", content)

    return content;
};

JGFSChunkServer.prototype.test = function () {
    //console.log("test");
    return 'test';
};

/*var inc = Fiber(function(fileName) {
    var total = '';
    /!*while (true) {
        total += Fiber.yield(total);
    }*!/

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        else {
            //console.log("data >> %s", data)
            //fiber.run(data);
            //Fiber.yield(data);
            //var result = Fiber.yield(data);
            //console.log(result)
            //console.log("result >> %s", result)
            //return result;
        }
        //return total;
        Fiber.yield(data);
    });

    //done();

});*/

function readFileABC(fileName, done) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        else {
            done(null,data);
        }
    });
};

function chunk_filename(chunkuuid) {
    return this.local_filesystem_root + '/' + String(chunkuuid) + '.gfs';
};

/*function run(gen) {
    var iter = gen(function (err, data) {
        if (err) { iter.throw(err); }
        return iter.next(data);
    });
    iter.next();
}

run(function* (path) {
    var contents = yield fs.readFile(path);
    console.log(contents);
});*/



/*var getDataFromDisk = function (filename, key) {
    var fiber = Fiber.current; //get the current Fiber
    fs.readFile('/path/fileName', function (err, res) {
        if (err) console.log(err); else {
            /!* Resume execution of this fiber. What’s passed to fiber.run will become the value returned by Fiber.yield below *!/
            fiber.run(transform(res, key));
            var result = Fiber.yield();
            return result;
        }
        ;
// Finally we wrap our code in a Fiber, then run it
        Fiber(function () {

            var result = getDataFromDisk('helloWorld', key);
            console.log(result);
        }).run();*/

/*var getSecretData = function(fileName) {
    var fiber = Fiber.current; // get the currently-running Fiber

    fs.readFile(fileName, 'utf8', function(err, res) {
        if (err) console.log(err);
        else fiber.run(res);
    })

    // halt this Fiber for now. When the execution is resumed later, return whatever passed to fiber.run
    var result = Fiber.yield();
    return result;
};*/


/*
var getSecretData = function(fileName, callback) {
    fs.readFile(fileName, 'utf8', function(err, res) {
        if (err) throw new Error(err.message);
        else callback && callback( null, res);
    })
};
*/


