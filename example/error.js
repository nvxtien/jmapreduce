/**
 * Created by joseph on 16/02/2016.
 */
var Fiber = require('fibers');
var fs = require('fs');
var path = require('path');

function readFile(fileName) {
    //var fiber = Fiber(function() {
        var content = fs.readFileSync(fileName, 'utf8');
        //Fiber.yield(content);
    //});
    //return fiber.run.bind(fiber);
    return content;
}

//var seq = readFile('/tmp/gfs/chunks/2/af71446c-d456-11e5-8d9b-4190dac5e727.gfs');
//var ii = seq();
//console.log(ii);

console.log(readFile('/tmp/gfs/chunks/2/af71446c-d456-11e5-8d9b-4190dac5e727.gfs'))
