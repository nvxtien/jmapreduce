/**
 * Created by joseph on 17/02/2016.
 */

'use strict'

module.exports = TextBreaker

var Immutable = require('immutable');

var offsets;
var width;
var minima;
var words;
var count;
var breaks;

function TextBreaker() {

}

TextBreaker.prototype.from = function (text, width) {
    words = text.split(' ');
    count = words.length;
    this.width = width;
    offsets = [0];
    minima = [0];
    words.forEach((x) => offsets.push(offsets[-1] + x.length));

    Array.apply(null, Array(count)).forEach(() => {
        minima.push(Math.pow(10, 20));
    });

    breaks = Array.apply(null, Array(count + 1)).map(() => 0);
    return this;
};

TextBreaker.prototype.break = function () {
    var n = count + 1;
    var i = 0;
    var offset = 0



    while (true) {

        var r = Math.min(n, Math.pow(2, (i + 1)));
        var edge = Math.pow(2, i) + offset;

        console.log(i);

        smawk(range(0 + offset, edge), range(edge, r + offset));

        var x = minima[r - 1 + offset];

        var arr = range(Math.pow(2, i), r - 1);

        arr.forEach((_, j) => {
            var y = cost(j + offset, r -1 + offset);
            if (y <= x) {
                n = n - j;
                i = 0;
                offset = offset + j;
                return;
            }
            else {
                if (r === n) {
                    return;
                }
                i = i + 1;
            }
        });
    }

    var lines = []
    var j = count
    while (j > 0) {
        i = breaks[j]
        lines.push(words.splice(i, j).join(' '));
        j = i
    }

    lines.reverse()
    return lines
};

/*TextBreaker.prototype.lengths = function (i, j) {
    return text.map(x => x.length).reduce((a, b) => a + b);
};

TextBreaker.prototype.legal = function (i, j) {

};

TextBreaker.prototype.nextbreak = function (i) {

};*/

function range(from, to) {
    return Array.apply(null, Array(to - from)).map((e, i) => {
        return from + i;
    });
};

function cost(i, j) {
    var w = offsets[j] - offsets[i] + j - i - 1;

    if (w > width) {
        return Math.pow(10, 10) * (w - width);
    }
    return minima[i] + Math.pow(width - w, 2);
}

function smawk(rows, columns) {
    var stack = [];
    var i = 0;

    while (i < rows.length) {
        if (stack) {
            var c = columns[stack.length - 1];

            if (cost(stack[-1], c) < cost(rows[i], c)) {

                if (stack.length < columns.length) {
                    stack.push(rows[i])
                }
                i += 1

            } else {
                stack.pop()
            }

        } else {
            stack.push(rows[i])
            i += 1
        }
    }

    rows = stack;

    if (columns.length > 1) {
        smawk(rows, columns.slice(1, 2));
    }

    i = 0;
    var j = 0;

    while (j < columns.length) {
        if (j + 1 < columns.length) {
            var end = breaks[columns[j + 1]];
        } else {
            end = rows[-1];
        }
        c = cost(rows[i], columns[j])

        if (c < minima[columns[j]]) {
            minima[columns[j]] = c
            breaks[columns[j]] = rows[i]
        }

        if (rows[i] < end) {
            i += 1
        } else {
            j += 2
        }
    }
}
