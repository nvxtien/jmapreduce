/**
 * Created by joseph on 25/01/2016.
 */
'use strict'

var diff = require('rus-diff').diff
var expect = require('chai').expect;
var JMapReduce = require('../lib/jmapreduce.js');

describe('should return lines', function () {
    function lines(data) {
        return data.match(/[^\r\n]+/g);
    };

    var lines = lines("this is\n\na mapreduce\nfor nodejs\n\ndeveloped by joseph");
    expect(lines[0]).to.equal('this is');
    expect(lines[2]).to.equal('for nodejs');
});

describe('should return key value', function () {
    var jmapReduce = new JMapReduce();
    jmapReduce.map(
        "line1 line1\n\n line2\n line3\n\n line4 line4 line4\n"
        , function (data) {
            return data.match(/[^\s]+|\s+[^\s+]$/g);
        }
    );

    expect(jmapReduce.toArray()[0].key).to.equal('line1');
    expect(jmapReduce.toArray()[0].value).to.equal(1);

    expect(diff(jmapReduce.toArray()[0], {key: 'line1', value: 1})).to.equal(false);
    expect(diff(jmapReduce.toArray()[5], {key: 'line4', value: 1})).to.equal(false);

});

describe('should return words key value', function () {
    var jmapReduce = new JMapReduce();
    jmapReduce.map(
        "group1 group3\n\n group3\n group3\n\n group3 group1 group2\n"
        , function (data) {
            return data.match(/[^\s]+|\s+[^\s+]$/g);
        })
        .groupByKey();

    var toArray = jmapReduce.toArray();
    expect(diff(jmapReduce.toArray()[0], {key: 'group1', value: [{key: 'group1', value: 1}, {key: 'group1', value: 1}]}))
        .to.equal(false);

    expect(diff(toArray[2], {key: 'group2', value: [{key: 'group2', value: 1}]})).to.equal(false);

});

describe('should print', function () {
    var jmapReduce = new JMapReduce();
    jmapReduce.map(
        "line1 \n\n line2\n line3\n\n  line4\n"
        , function (data) {
            return data.match(/[^\s]+|\s+[^\s+]$/g);
        }
    );

    jmapReduce.print();
    console.log('======================================================');
});

describe('should return array', function () {
    var jmapReduce = new JMapReduce();
    var input = "group1 group3\n\n group3\n group3\n\n group3 group1 group2\n";
    jmapReduce.map(input, function (data) {
            return data.match(/[^\s]+|\s+[^\s+]$/g);
        }
        )
        .groupByKey()
        .reduce(0, function (a, b) {
                return a + b;
            }
        )
        .sort(function (a, b) {
            return b.value - a.value;
        });

    expect(diff(jmapReduce.toArray()[0], {key: 'group3', value: 4})).to.equal(false);
    expect(diff(jmapReduce.toArray()[1], {key: 'group1', value: 2})).to.equal(false);
    expect(diff(jmapReduce.toArray()[2], {key: 'group2', value: 1})).to.equal(false);

});


