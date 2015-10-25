'use strict';

var gulp = require("gulp");
var jsonConcat = require("gulp-json-concat");
var deasync = require('deasync');

/**
 * Collect content of all json files
 *
 * @param  {Array} source
 * @return {Object}
 */
module.exports = {
    collect: function(source, concatContent) {

        if (concatContent === undefined)
            concatContent = false;

        var result = null;

        gulp.src(source)
            .pipe(jsonConcat('pakapak.json', function(data) {
                result = data;
            }, concatContent));
            
        while (result == null) {
            deasync.sleep(100)
        };

        return result;
    }
}