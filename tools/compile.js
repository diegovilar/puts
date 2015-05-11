compile();

function compile() {

    var browserify = require('browserify');
    var fs = require('fs');
    var exorcist = require('exorcist');
    var path = require('path');

    var srcDir = path.join(__dirname, '..', 'src');
    var debugDir = path.join(__dirname, '..', 'debug');
    var entryFile = path.join(srcDir, 'main-browser.ts');
    var destFile = path.join(debugDir, 'puts.js');
    var mapfile = destFile + '.map';

    var bundler = browserify({
        debug: true,
        entries: [entryFile]
    });

    bundler.plugin('tsify', {
        noEmitOnError: true,
        noImplicitAny: true,
        preserveConstEnums: true,
        emitDecoratorMetadata: true,
        target: 'ES5'
    });

    var outStream = fs.createWriteStream(destFile, {encoding: 'utf8'});

    bundler
        .bundle()
        .pipe(exorcist(mapfile))
        .pipe(outStream);

}
