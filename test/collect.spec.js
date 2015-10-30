var should = require('chai').should(),
    pakapak = require('../index'),
    collect = pakapak.collect,
    collectByKey = pakapak.collectByKey,
    deasync = pakapak.deasync,
    fs = require('fs');

describe('pakapak.collect object from pakapak.json files', function() {
    it('should be { proj: 3, app: 1, work: 2 }', function() {
        var result = collect(["test/**/pakapak.json"], true);
        result.proj.should.equal(3);
        result.app.should.equal(1);
        result.work.should.equal(2);
    });
});

describe('pakapak.collectByKey from pakapak.json files by npm.devDependencies', function() {
    it('should be correct connect from all included folders', function() {
        var result = collectByKey([
                "test/**/pakapak.json",
                'test/project/pakapak.json'
            ],
            'npm.devDependencies',
            'test/package.json',
            'devDependencies'
        );
        result.devDependencies.module1.should.equal('^1.0.5');
        result.devDependencies.appmodule1.should.equal('^1.0.0');
        result.devDependencies.workmodule1.should.equal('^1.0.0');
    });
});

describe('pakapak.collectByKey from pakapak.json files by npm.dependencies', function() {
    it('should be correct connect from all included folders', function() {
        var result = collectByKey([
                "test/**/pakapak.json",
                'test/project/pakapak.json'
            ],
            'npm.dependencies',
            'test/package.json',
            'dependencies'
        );
        result.dependencies.module1.should.equal('^2.0.5');
        result.dependencies.appmodule1.should.equal('^2.0.0');
        result.dependencies.workmodule1.should.equal('^2.0.0');
    });
});

describe('pakapak.collectByKey from pakapak.json files by bower.dependencies and save to bower.json', function() {
    it('should be correct connect from all included folders', function() {

        var result = null;
        var sourceJson = {
            "version": "0.1.0",
            "dependencies": {}
        }
        fs.writeFile('test/bower.json', JSON.stringify(sourceJson, null, 4), function(err) {
            if (err) {
                result = false;
            } else
                result = true;
        });

        while (result == null) {
            deasync.sleep(100)
        };

        var result = collectByKey([
                "test/**/pakapak.json",
                'test/project/pakapak.json'
            ],
            'bower.dependencies',
            'test/bower.json',
            'dependencies',
            true
        );
        result.dependencies.module1.should.equal('^3.0.5');
        result.dependencies.appmodule1.should.equal('^3.0.0');
        result.dependencies.workmodule1.should.equal('^3.0.0');
    });
});