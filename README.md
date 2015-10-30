Pakapak
=========

[![Build Status](https://travis-ci.org/EndyKaufman/pakapak.svg?branch=master)](https://travis-ci.org/EndyKaufman/pakapak)

npm + bower + other conf = pakapak

## Installation

    $ npm install pakapak --save-dev

## Usage in gulp.js or karma.conf.js and others

    var pakapak = require('pakapak');
    var result = collect(["project/**/pakapak.json"], true);
    console.log(' { a: 1, app: 1, work: 1 }', result);

## Fill package.json dependencies in root folder from sub folders/modules dependencies

    var result = collectByKey([
            "project/**/pakapak.json",
            'project/pakapak.json'
        ],
        'npm.devDependencies',
        'package.json',
        'devDependencies',
        true
    );
    

## Fill bower.json dependencies in root folder from sub folders/modules dependencies

    var result = collectByKey([
            "project/**/pakapak.json",
            'project/pakapak.json'
        ],
        'npm.dependencies',
        'bower.json',
        'dependencies',
        true
    );
    
## Tests

    $ npm test

## Release History

* 0.1.3 
    * Add method collectByKey 
    * Add test generate npm and bower dependencies from pakapak.json
* 0.1.0 
    * Initial release