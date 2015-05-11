/// <reference path="typings/node/node.d.ts"/>

var gulp = require('gulp');
var argv = require('yargs').argv;
var browserify = require('browserify');
var exorcist = require('exorcist');
var ts = require("typescript");
var fs = require('fs');
var path = require('path');

var srcDir = './src';
var buildDir = './build';
var debugDir = './debug';

/**
 * Compiles 
 */
gulp.task('compileBundle', function(cb) {
    
    var entryFile = srcDir + '/main-browser.ts';
    var destFile = buildDir + '/puts.js';
    var mapfile = destFile + '.map';    
  
    var bundler = browserify(entryFile, {
        debug: true
    });
    
    var tsoptions = require('./tsconfig.json').compilerOptions;
    bundler.plugin('tsify', tsoptions);
    
    var outStream = fs.createWriteStream(destFile, {encoding: 'utf8'});
    bundler
        .bundle()
        .pipe(exorcist(mapfile))
        .pipe(outStream);
  
    //cb && cb(); 
  
});

gulp.task('compileDebug', function(cb) {
    
    var tsconfig = require('./tsconfig.json');
    var options = tsconfig.compilerOptions;
    
    options.outDir = buildDir;
    options.declaration = true;
    options.sourceMap = true;
    
    // TODO errors?
    tsc(tsconfig.files, tsconfig.compilerOptions);
    
    //cb && cb();
    
});

function tsc(fileNames, options) {
    
    var ScriptTarget = {
        ES3 : 0,
        ES5 : 1,
        ES6 : 2,
        LATEST : 2 
    };
    var ModuleKind = {
        NONE : 0,
        COMMONJS : 1,
        AMD : 2
    };
    
    if (options) {
        if (options.target) {
            options.target = ScriptTarget[options.target.toUpperCase()];
        }
        if (options.module) {
            options.module = ModuleKind[options.module.toUpperCase()];
        }
    }
    
    var program = ts.createProgram(fileNames, options);
    var emitResult = program.emit();
    var allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        throw new Error(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
    });
    //var exitCode = emitResult.emitSkipped ? 1 : 0;
    //if (exitCode) {
    //    grunt.log(`Process exiting with code '${exitCode}'.`);
    //}
    //return exitCode;
}