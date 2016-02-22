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
        var text = 'In olden times, when wishing still did some good, there lived a king whose daughters were all '
        + 'beautiful, but the youngest was so beautiful that the sun itself, who, indeed, has seen so much, '
            + 'marveled every time it shone upon her face. In the vicinity of the king\'s castle '
            + 'there was a large, dark forest, and in this forest, beneath an old linden tree, '
            + 'there was a well. In the heat of the day the princess would go out into the forest '
            + 'and sit on the edge of the cool well. To pass the time she would take a golden ball, '
            + 'throw it into the air, and then catch it. It was her favorite plaything. '
            + 'Now one day it happened that the princess\'s '
            + 'golden ball did not fall into her hands, that she held up high, but instead it fell to the ground '
            + 'and rolled right into the water. '
            + 'The princess followed it with her eyes, '
            + 'but the ball disappeared, '
            + 'and the well was so deep that '
            + 'she could not see its bottom. Then she began to cry. '
            + 'She cried louder and louder, and she could not console herself.';

        //console.log(text)

        breaker
            .from(text, 50)
            .breakText().forEach((x) => console.log("%s ", x));
        done();
    });
});
