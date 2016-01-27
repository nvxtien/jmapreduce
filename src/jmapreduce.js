/**
 * Created by joseph on 25/01/2016.
 */
'use strict'

var Rx = require('rx');

function JMapReduce(){};

var result = [];
var groups = [];
var reduces = [];

JMapReduce.prototype.map = function(data, func){
    Rx.Observable.fromArray(func(data))
        .map(function(x){
            return {key: x, value: 1};
        })
        .subscribe(function(x) {
                result.push(x);
            },
            function(err) {},
            function() {}
        );

    return this;
};

JMapReduce.prototype.groupByKey = function(){
    Rx.Observable.fromArray(result)
        .groupBy(function(x) {
            return x.key
        })
        .selectMany(function(group) {
            return group
                .toArray()
                .select(function(items) {
                    return {key: group.key, value: items}
                });
        })
        .subscribe(function(pair) {
                groups.push(pair);
            },
            function(err) {},
            function() {
                result = groups;
            }
        );

    return this;
};

JMapReduce.prototype.reduce = function(first, func) {
    Rx.Observable.fromArray(groups)
        .map(function(e) {
            return e;
        })
        .subscribe(function(e) {
                reduce(e, first, func, function(err, data) {
                    reduces.push(data);
                });
            },
            function(err) {},
            function() {
                result = reduces;
            }
        );

    return this;
};

function reduce(element, first, func, callback) {
    Rx.Observable.fromArray(element.value)
        .reduce(function(acc, x) {
            return func(acc, x.value);
        }, first)
        .subscribe(
            function(result) {
                callback(null, {key: element.key, value: result});
            },
            function(err) {
                callback(err);
            },
            function() {}
        );
};

JMapReduce.prototype.sort = function(func){
    result.sort(func);
    return this;
};

JMapReduce.prototype.toArray = function(){
    return result;
};

JMapReduce.prototype.print = function(){
    result.forEach(function(x){
        console.log("%s", JSON.stringify(x, null, 2));
    });
};

module.exports = JMapReduce