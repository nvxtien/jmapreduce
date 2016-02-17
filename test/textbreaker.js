/**
 * Created by joseph on 17/02/2016.
 */

'use strict'

var expect = require('chai').expect;
var Immutable = require('immutable');

var TextBreaker = require('../lib/jgfs/textbreaker.js');

describe('sum of word lengths from i to j', function(){

    var breaker = new TextBreaker();

    it('should return 0', function(done){
        //expect(breaker.lengths(0, 0)).to.equal(0);
        done();
    });

    it('get every word length', function(done){
        expect('hello'.length).to.equal(5);
        done();
    });

    it('sum from 0 to end', function(done){
        //var arr = Immutable.fromJS('hello world from me\n');
        //var sum = arr.map((x) => x.length).reduce((a, b) => a + b);
        //expect(sum).to.equal(5 + 5 + 4 + 2 + 1);
        done();
    });

    it('sum from 0 to end', function(done){
        //var arr = Immutable.fromJS('hello world from me\n'.split(' '));
        //var sum = arr.map((x) => x.length).reduce((a, b) => a + b);
        //expect(sum).to.equal(5 + 5 + 4 + 2 + 1);
        done();
    });

    it('test', (done) => {
        var text = 'In olden times when wishing still helped one, there lived a king ' +
            'whose daughters were all beautiful, ' +
            'but the youngest was so beautiful that the sun itself, which has seen so much, ' +
            'was astonished whenever ' +
            'it shone in her face.  Close by the king\'s castle lay a great dark forest,' +
            'and under an old lime-tree in the forest was a well, and when ' +
            'the day was very warm, the king\'s child went out into the forest and ' +
            'sat down by the side of the cool fountain, and when she was bored she ' +
            'took a golden ball, and threw it up on high and caught it, and this ball was her favorite plaything.';

        breaker
            .from('fdsf sdfsdf sdf dfgg dfg df ghghgh hjh hjhj', 2)
            .break().forEach((x) => console.log(x));
        done();
    });
});
