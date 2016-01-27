/**
 * Created by joseph on 25/01/2016.
 */

var JMapReduce = require('../app/services/jmapreduce.js');

/*describe('should return lines', function(){
    function lines(data){
        return data.match(/[^\r\n]+/g);
    };

    var lines = lines("abc\n\n sfs\n sfsd\n\n sdfsdf");
    console.log(lines);
});*/

/*describe('should return lines key value', function(){
    /!*function lines(data){
        return data.match(/[^\r\n]+/g);
    };*!/

    var jmapReduce = new JMapReduce();
    jmapReduce.map(
        "line1 line`\n\n line2\n line3\n\n line4 line4 line4\n"
        , function(data){
            return data.match(/[^\r\n]+/g);
        }
        , function(err, data){
            console.log(data);
        }
    );
});*/

/*
describe('should return words key value', function(){
    var jmapReduce = new JMapReduce();
    jmapReduce.map(
        "line1 line`\n\n line2\n line3\n\n line4 line4 line4\n"
        , function(data){
            return data.match(/[^\s]+|\s+[^\s+]$/g);
        }
        , function(err, data){
            console.log(data);
        }
    );
});
*/

/*describe('should print', function(){
    var jmapReduce = new JMapReduce();
    jmapReduce.map(
        "line1 line`\n\n line2\n line3\n\n line4 line4 line4\n"
        , function(data){
            return data.match(/[^\s]+|\s+[^\s+]$/g);
        }
    );

    jmapReduce.print();
});*/

describe('should return array', function(){
    var jmapReduce = new JMapReduce();
    var input = "abc abc 556 356`\n\n mef def  \n 123 124 123\n\n 456 456 456 111\n";
    var test = jmapReduce.map(input , function(data){
                return data.match(/[^\s]+|\s+[^\s+]$/g);
            }
        )
        .groupByKey()
        .reduce(0, function(a,b){
                return a + b;
            }
        )
        .sort(function(a, b){
            return b.value - a.value;
        });

    /*test.sort(function(a, b){
            return b.value - a.value;
        });*/

    /*test.sort(function(a, b){
        return b.key - a.key;
    });*/

    /*test.sort(function(a, b){
        return b.value - a.value;
    });*/

    /*test.sort(function(a, b){
        return b.key - a.key;
    });*/

    /*test.sort(function(a, b){
        return b.value - a.value;
    });*/

    /*test.sort(function(a, b){
        return b.key - a.key;
    });*/

    /*test.sort(function(a, b){
        return b.value - a.value;
    });*/

    //test.sortByKey();
    console.log("==================================================================================")
    //test.sortByValue();
    //console.log("==================================================================================")
    //test.sortByKey();
    test.print();
});


