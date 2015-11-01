'use strict';

var gulp = require("gulp");
var jsonConcat = require("gulp-json-concat");
var deasync = require('deasync');
var merge = require("deepmerge");
var deepcopy = require("deepcopy");
var fs = require('fs');

module.exports = {
    deasync: deasync,
    /**
     * Collect content of all json files (source)
     *
     * @param  {Array} source
     * @param  {Boolean/Undefined} concatContent
     * @return {Object}
     */
    collect: collect,
    /**
     * Collect content of all json files (source) by key: sourceCollectKey and save to destination and use ey: destinationCollectKey 
     *
     * @param  {Array} source
     * @param  {String} sourceCollectKey
     * @param  {String} destination
     * @param  {String} destinationCollectKey
     * @param  {Boolean/ Undefined} saveToFile
     * @return {Object}
     */
    collectByKey: collectByKey
}

function collect(source, concatContent) {
    var sourceCopy = deepcopy(source);

    if (concatContent === undefined)
        concatContent = false;

    var result = null;

    gulp.src(sourceCopy)
        .pipe(jsonConcat('pakapak.json', function(data) {
            result = data;
        }, concatContent));

    while (result == null) {
        deasync.sleep(100)
    };

    return result;
}

function collectByKey(source, sourceCollectKey, destination, destinationCollectKey, saveToFile) {
    var sourceCopy = deepcopy(source);

    if (saveToFile === undefined)
        saveToFile = false;

    if (!Array.isArray(sourceCopy)) {
        sourceCopy = [sourceCopy];
    }
    if (sourceCopy.length > 1) {
        var sourceLast = collect(sourceCopy[sourceCopy.length - 1], true);
        sourceCopy.splice(sourceCopy.length - 1, 1);
    } else {
        var sourceLast = {};
    }
    var sourceAll = collect(sourceCopy, true);

    var sourceJson = merge(sourceAll, sourceLast);
    var sourceCollectKeySplit = sourceCollectKey.split('.');
    for (var i = 0; i < sourceCollectKeySplit.length; i++) {
        var key = sourceCollectKeySplit[i];
        if (sourceJson[key] !== undefined)
            sourceJson = sourceJson[key];
        else
            sourceJson = {};
    }
    var destinationJson = collect(destination, true);
    var destinationCollectKeySplit = destinationCollectKey.split('.');

    for (var i = destinationCollectKeySplit.length - 1; i >= 0; i--) {
        var key = destinationCollectKeySplit[i];
        var newSourceJson = {};
        newSourceJson[key] = sourceJson;
        sourceJson = newSourceJson;
    }

    sourceJson = merge(destinationJson, sourceJson);

    if (saveToFile === true) {
        var result = null;
        fs.writeFile(destination, JSON.stringify(sourceJson, null, 4), function(err) {
            if (err) {
                result = false;
            } else
                result = true;
        });

        while (result == null) {
            deasync.sleep(100)
        };
    }
    return sourceJson;
}