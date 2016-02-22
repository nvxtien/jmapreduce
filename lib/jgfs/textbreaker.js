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
    //console.log('minima %s', minima.length)

    breaks = Array.apply(null, Array(count + 1)).map(() => 0);
    //console.log('breaks %s', breaks)
    return this;
};

TextBreaker.prototype.breakText = function () {
    var n = count + 1;
    var i = 0;
    var offset = 0

    var breakCheck = false;

    while (true) {
        console.log('===========================================================');

        //console.log("i %s", i)

        var r = Math.min(n, Math.pow(2, (i + 1)));
        //console.log("r %s", r)

        var edge = Math.pow(2, i) + offset;

        console.log('offset %s', offset);
        console.log('edge %s', edge);
        //console.log('====>>> %s', range(0 + offset, edge));

        //break;

        this.smawk(this.range(0 + offset, edge), this.range(edge, r + offset));

        //break;

        var x = minima[r - 1 + offset];
        console.log('x %s', x);

        console.log("range %s %s", Math.pow(2, i), r - 1)

        var arr = this.range(Math.pow(2, i), r - 1);
        console.log('arr %s', arr);

        var checkRange = false;
        for (var j = 0; j < arr.length; j++) {
            checkRange = true;
            //console.log('j %s', j)

            var y = this.cost(j + offset, r -1 + offset);
            console.log('y cost %s', y);


            if (y <= x) {
                n = n - j;
                i = 0;
                offset = offset + j;
                console.log('break by y <= x')
                //breakCheck = true;
                break;
            }

            /*else {
                if (r === n) {
                    console.log('break r %s', r)
                    breakCheck = true;
                    break;
                }
                i = i + 1;
            }*/
        }

        if (!checkRange) {

            if (r === n) {
                console.log('r === n %r %n', r, n)
                //breakCheck = true;
                console.log('j not in range -> break')
                break;
            }

            console.log('j not in range -> i = i + 1')
            i = i + 1;
        }

        /*if (breakCheck) {
            console.log('break')
            break;
        }*/

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

    //console.log('j count is %s', j)
    //console.log('breaks %s', breaks)

    while (j > 0) {
        i = breaks[j]
        console.log('i breaks[j] %s', breaks[j])
        lines.push(words.splice(i, j).join(' '));
        j = i
        console.log('j is %s', j)
    }

    //console.log('lines %s', lines)

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

TextBreaker.prototype.range = function(from, to) {
    return Array.apply(null, Array(to - from)).map((e, i) => {
        return from + i;
    });
};

TextBreaker.prototype.cost = function (i, j) {
    var w = offsets[j] - offsets[i] + j - i - 1;

    if (w > width) {
        return Math.pow(10, 10) * (w - width);
    }
    return minima[i] + Math.pow(width - w, 2);
}

TextBreaker.prototype.smawk = function(rows, columns) {

    //console.log('rows %s', rows)
    //console.log('columns %s', columns)

    //console.log('calling smawk')
    var stack = [];
    var i = 0;

    while (i < rows.length) {
        //console.log('while loop i %s', i)
        //console.log('rows length %s', rows.length)
        //console.log('stack length %s', stack.length)
        if (stack.length > 0) {
            var c = columns[stack.length - 1];
            //console.log('last element of stack is', stack, stack.last())
            console.log('c cost %s %s %s', c, this.cost(stack.last(), c), this.cost(rows[i], c))

            if (this.cost(stack.last(), c) < this.cost(rows[i], c)) {
                if (stack.length < columns.length) {
                    //console.log('append stack')
                    stack.push(rows[i])
                }
                i += 1
                //console.log('value i %s', i)
            } else {
                stack.pop()
                //console.log('after pop() stack.length %s', stack.length)
            }
        } else {
            //console.log("rows[i] %s", rows[i], rows)
            stack.push(rows[i])
            i = i + 1;
            //console.log("stack %s", stack)
            //console.log('value i %s', i)
        }
    }

    //console.log('after while i %s', i)

    //console.log('return')
    //return

    rows = stack;

    //console.log('after while rows length %s', rows.length)

    if (columns.length > 1) {
        this.smawk(rows, columns.slice(1, 2));
    }

    i = 0;
    var j = 0;

    //console.log('columns.length %s', columns.length)
    while (j < columns.length) {
        //console.log('while loop j %s', j)
        if (j + 1 < columns.length) {
            var end = breaks[columns[j + 1]];
            //console.log('end in while %s', end)
        } else {
            //console.log('last element of rows is', rows, rows.last())
            end = rows.last();
        }
        c = this.cost(rows[i], columns[j])

        if (c < minima[columns[j]]) {
            minima[columns[j]] = c
            breaks[columns[j]] = rows[i]
            //console.log('breaks in while %s', breaks)
        }

        if (rows[i] < end) {
            i += 1
        } else {
            j += 2
        }
    }
    //console.log('breaks after while %s', breaks)
}
