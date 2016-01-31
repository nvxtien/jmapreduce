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
    jmapReduce.textData("line1 line1\n\n line2\n")
        .flatMap(function (data) {
            return data.match(/[^\s]+|\s+[^\s+]$/g);
        })
        .map(function(x){
            return {key: x, value: 1};
        })
    ;

    //jmapReduce.print();

    expect(jmapReduce.collect()[0].key).to.equal('line1');
    expect(jmapReduce.collect()[0].value).to.equal(1);

    expect(diff(jmapReduce.collect()[1], {key: 'line1', value: 1})).to.equal(false);
    expect(diff(jmapReduce.collect()[2], {key: 'line2', value: 1})).to.equal(false);

});

describe('should return words key value', function () {
    var jmapReduce = new JMapReduce();
    jmapReduce.textData("group1 group3\n\n group3\n group3\n\n group3 group1 group2\n")
            .flatMap(function (data) {
                return data.match(/[^\s]+|\s+[^\s+]$/g);
            })
            .map(function(x){
                return {key: x, value: 1};
            })
            .groupByKey();

    //jmapReduce.print();
    var collect = jmapReduce.collect();
    expect(diff(jmapReduce.collect()[0], {key: 'group1', value: [{key: 'group1', value: 1}, {key: 'group1', value: 1}]}))
        .to.equal(false);

    expect(diff(collect[2], {key: 'group2', value: [{key: 'group2', value: 1}]})).to.equal(false);

});

describe('should print', function () {
    var jmapReduce = new JMapReduce();
    jmapReduce.textData("line1 \n\n line2\n line3\n\n  line4\n")
            .flatMap(function (data) {
                return data.match(/[^\s]+|\s+[^\s+]$/g);
            }).map(function(x){
                return {key: x, value: 1};
    }       );

    //jmapReduce.print();
    console.log('======================================================');
});

describe('should return sorted array', function () {
    var jmapReduce = new JMapReduce();
    var input = "group1 group3\n\n group3\n group3\n\n group3 group1 group2\n";
    jmapReduce.textData(input)
            .flatMap(function (data) {
                return data.match(/[^\s]+|\s+[^\s+]$/g);
            })
            .map(function (x) {
                return {key: x, value: 1};
            })
            .groupByKey()
            .reduce(0, function (a, b) {
                return a + b;
            })
            .sort(function (a, b) {
                return b.value - a.value;
            });

    expect(diff(jmapReduce.collect()[0], {key: 'group3', value: 4})).to.equal(false);
    expect(diff(jmapReduce.collect()[1], {key: 'group1', value: 2})).to.equal(false);
    expect(diff(jmapReduce.collect()[2], {key: 'group2', value: 1})).to.equal(false);

});

describe('with input is an array', function () {
    var jmapReduce = new JMapReduce();
    var input = ["group1 group3 \n\ngroup3\n group3\n\n group3 group1 group2 \n", 'group5 group6'];
    jmapReduce.textData(input);

    //jmapReduce.print();

    expect(jmapReduce.collect()[0]).to.equal("group1 group3 \n\ngroup3\n group3\n\n group3 group1 group2 \n");
    expect(jmapReduce.collect()[1]).to.equal("group5 group6");

    jmapReduce.flatMap(function(x){
        return x.match(/[^\s]+|\s+[^\s+]$/g);
    });

    jmapReduce.print();

    expect(jmapReduce.collect()[0]).to.equal('group1');
    expect(jmapReduce.collect()[1]).to.equal('group3');

    /*expect(diff(jmapReduce.collect()[0], {key: 'group1', value: 1})).to.equal(false);
    expect(diff(jmapReduce.collect()[1], {key: 'group3', value: 1})).to.equal(false);*/

    jmapReduce.map(function(x){
        return {key: x, value: 1};
    });

    expect(diff(jmapReduce.collect()[0], {key: 'group1', value: 1})).to.equal(false);
    expect(diff(jmapReduce.collect()[1], {key: 'group3', value: 1})).to.equal(false);

});

describe('with input is only string', function () {
    var jmapReduce = new JMapReduce();
    var input = "input is only string";
    jmapReduce.textData(input)
        .flatMap(function(x){
            return x.match(/[^\s]+|\s+[^\s+]$/g);
        })
        .map(function(x){
            return {key: x, value: 1};
        });

    expect(diff(jmapReduce.collect()[0], {key: 'input', value: 1})).to.equal(false);
    expect(diff(jmapReduce.collect()[1], {key: 'is', value: 1})).to.equal(false);
    expect(diff(jmapReduce.collect()[2], {key: 'only', value: 1})).to.equal(false);
    expect(diff(jmapReduce.collect()[3], {key: 'string', value: 1})).to.equal(false);

});

describe('textData with string', function(){
    var jmapReduce = new JMapReduce();
    var input = 'read text data';

    jmapReduce.textData(input);
    expect(jmapReduce.collect()[0]).to.equal("read text data");
});

describe('textData with array of strings', function(){
    var jmapReduce = new JMapReduce();
    var input = ['textData reads', 'array', 'of strings'];

    jmapReduce.textData(input);
    expect(jmapReduce.collect()[0]).to.equal('textData reads');
    expect(jmapReduce.collect()[1]).to.equal('array');
    expect(jmapReduce.collect()[2]).to.equal('of strings');
});

describe('flatMap', function(){
    var jmapReduce = new JMapReduce();
    var input = ['textData reads', 'array', 'of strings'];

    jmapReduce.textData(input);
    expect(jmapReduce.collect()[0]).to.equal('textData reads');
    expect(jmapReduce.collect()[1]).to.equal('array');
    expect(jmapReduce.collect()[2]).to.equal('of strings');

    jmapReduce.flatMap(function(x){
        return x.match(/[^\s]+|\s+[^\s+]$/g);
    });

    expect(jmapReduce.collect()[0]).to.equal('textData');
    expect(jmapReduce.collect()[1]).to.equal('reads');
    expect(jmapReduce.collect()[2]).to.equal('array');
    expect(jmapReduce.collect()[3]).to.equal('of');
    expect(jmapReduce.collect()[4]).to.equal('strings');
});

/*describe('textData with array of array', function(){
    var jmapReduce = new JMapReduce();
    var input = [['textData reads', 'array', 'of strings'], ['test', 'data'], ['data', 'for test']];

    jmapReduce.textData(input);

    jmapReduce.flatMap(function(x){
        return x.match(/[^\s]+|\s+[^\s+]$/g);
    });

    //jmapReduce.print();

    expect(jmapReduce.collect()[0][0]).to.equal('textData reads');
    expect(jmapReduce.collect()[1][0]).to.equal('test');
    expect(jmapReduce.collect()[2][0]).to.equal('data');
});*/
