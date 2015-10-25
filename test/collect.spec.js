var should = require('chai').should(),
    pakapak = require('../index'),
    collect = pakapak.collect;

describe('pakapak.collect', function() {
    it('should be { a: 1, app: 1, work: 1 }', function() {
        var result = collect(["test/**/pakapak.json"], true);
        result.a.should.equal(1);
        result.app.should.equal(1);
        result.work.should.equal(1);
    });
});