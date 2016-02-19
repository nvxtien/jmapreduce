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
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    };
}

TextBreaker.prototype.from = function (text, _width) {
    words = text.split(' ');
    count = words.length;
    console.log('count %s', count)

    width = _width;
    offsets = [0];
    minima = [0];
    words.forEach((x) => offsets.push(offsets.last() + x.length));

    Array.apply(null, Array(count)).forEach(() => {
        minima.push(Math.pow(10, 20));
    });
    console.log('minima %s', minima.length)

    breaks = Array.apply(null, Array(count + 1)).map(() => 0);
    console.log('breaks %s', breaks.length)
    return this;
};

TextBreaker.prototype.breakText = function () {
    var n = count + 1;
    var i = 0;
    var offset = 0

    while (true) {

        var r = Math.min(n, Math.pow(2, (i + 1)));
        var edge = Math.pow(2, i) + offset;

        console.log('====>>> offset %s', offset);
        console.log('====>>> edge %s', edge);
        console.log('====>>> %s', range(0 + offset, edge));

        smawk(range(0 + offset, edge), range(edge, r + offset));

        //break;

        var x = minima[r - 1 + offset];
        console.log(x);

        var arr = range(Math.pow(2, i), r - 1);

        for (var j = 0; j < arr.length; j++) {
            var y = cost(j + offset, r -1 + offset);
            if (y <= x) {
                n = n - j;
                i = 0;
                offset = offset + j;
                console.log('offset %s', offset)

                break;
            }
            else {

                console.log('offset %s', offset)
                if (r === n) {
                    break;
                }
                i = i + 1;
            }
        }

        /*arr.forEach((_, j) => {
            var y = cost(j + offset, r -1 + offset);
            if (y <= x) {
                n = n - j;
                i = 0;
                offset = offset + j;
                console.log('offset %s', offset)

                return;
            }
            else {

                console.log('offset %s', offset)
                if (r === n) {
                    return;
                }
                i = i + 1;
            }
        });*/
    }

    console.log('end while')


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

    //console.log('rows %s', rows)
    //console.log('columns %s', columns)

    console.log('calling smawk')
    var stack = [];
    var i = 0;

    while (i < rows.length) {
        console.log('rows length %s', rows.length)
        console.log('stack length %s', stack.length)
        if (stack.length > 0) {
            var c = columns[stack.length - 1];
            console.log('last element of stack is', stack, stack.last())
            if (cost(stack.last(), c) < cost(rows[i], c)) {

                if (stack.length < columns.length) {
                    console.log('append stack')
                    stack.push(rows[i])
                }
                i += 1

            } else {
                stack.pop()
            }
        } else {
            stack.push(rows[i])
            console.log(stack)
            i += 1
        }
    }

    console.log('return')
    return

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

            console.log('last element of rows is', rows, rows.last())

            end = rows.last();
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

    console.log('ending smawk')

}
