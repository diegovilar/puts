var utils = require('./build-utils');
var tsc = 'node_modules\\.bin\\tsc' + (/^win/.test(process.platform) ? '.cmd' : '');

module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json');
    var buildTime = new Date();
    var buildTimeString = buildTime.toISOString();
    var version = utils.version.parse(pkg.version);
    var versionString = utils.version.getCacheKey(version);
    var srcDir = 'src';
    var testDir = 'test';
    var debugDir = 'debug';
    var buildDir = 'build';
    var distDir = 'dist';

    function generateBanner(target) {
        target = target ? target + ' ' : '';
        return '/**\n' +
            ' * <%= pkg.projectName %> v<%= version.versionString %> ' + target + '(built on <%= version.buildTimeString %>)\n' +
            ' */\n';
    }

    grunt.util.linefeed = '\n';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: pkg,

        version: {
            version: version.version,
            versionString: versionString,
            buildTime: buildTime,
            buildTimeString: buildTimeString
        },

        srcDir: srcDir,
        debugDir: debugDir,
        buildDir: buildDir,
        testDir: testDir,
        distDir: distDir,

        clean: {
            dist: [distDir + '/*'],
            build: [buildDir + '/*'],
            debug: [debugDir + '/*']
        },

        run: {
            debug: {
                exec: tsc + ' -d -t ES3 -m commonjs --noImplicitAny --noEmitOnError --preserveConstEnums --sourceMap --out ' +
                    debugDir + '\\puts-transpiled.js ' +
                    srcDir + '\\main.ts'
            },
            build: {
                exec: tsc + ' -d -t ES3 -m commonjs --noImplicitAny --noEmitOnError --preserveConstEnums --removeComments --out ' +
                buildDir + '\\puts.js ' +
                srcDir + '\\main.ts'
            }
        },

        uglify: {
            debug: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'all',
                    sourceMap: true,
                    beautify:true,
                    banner: generateBanner('DEBUG')
                },
                files: {
                    '<%= debugDir %>/puts.js': [
                        '<%= srcDir %>/native.js',
                        '<%= debugDir %>/puts-transpiled.js'
                    ]
                }
            },
            build: {
                options: {
                    report: 'gzip',
                    mangle: {},
                    compress: {
                        drop_console: true
                    },
                    preserveComments: 'false',
                    banner: generateBanner('PRODUCTION')
                },
                files: {
                    '<%= buildDir %>/puts.js': [
                        '<%= srcDir %>/native.js',
                        '<%= buildDir %>/puts.js'
                    ]
                }
            }
        },

        rename: {
            debug : {
                src: debugDir + '/puts-transpiled.d.ts',
                dest : debugDir + '/puts.d.ts'
            }
        },

        karma: {
            options: {
                basePath: '',
                frameworks: ['jasmine', 'source-map-support'],
                runnerPort: 9876,
                debounceDelay: 3000,
                colors: true,
                autoWatch: false,
                singleRun: false,
                logLevel: 'INFO',
                browsers: ['Chrome'],
                reporters: ['progress'/*, 'coverage'*/],
                files: [
                    // libraries

                    // tested code
                    { pattern: 'debug/**/*.js', watched: false },
                    { pattern: 'debug/**/*.js.map', watched: false, included: false },
                    { pattern: 'src/**/*.ts', watched: false, included: false },

                    // test specs
                    { pattern: 'test/**/*.test.js', watched: false },
                    { pattern: 'test/**/*.test.ts', watched: false, included: false },
                    { pattern: 'test/**/*.test.js.map', watched: false, included: false }
                ],
                exclude: [],
                preprocessors: {}
            },
            server: {
                background: false
            },
            runner: {
                background: true
            }
        },

        watch: {
            karmaWatcher: {
                files: [
                    srcDir + '/**/*.js',
                    testDir + '/**/*.js'
                ],
                tasks: [
                    'debug',
                    'karma:runner:run'
                ]
            }
        },

        compress: {
            dist: {
                options: {
                    archive: '<%= distDir %>/<%= pkg.name %>-<%= version.versionString %>.zip'
                },
                files: [
                    {expand: true, cwd: buildDir, src: ['**']}
                ]
            }
        }

    });

    /// <reference path="../src/native.d.ts" />

    grunt.registerTask('_mergeDefs', 'Merge library with native error definitions', function() {

        var fs = require('fs');
        var destFile = buildDir + '/puts.d.ts';

        var nativeContents = fs.readFileSync(srcDir + '/native.d.ts', 'utf8');
        var putsContents = fs.readFileSync(destFile, 'utf8');

        putsContents = putsContents.replace(/\/\/\/\s*<reference\s+path="[^"]*native.d.ts"\s*\/>/, nativeContents);

        fs.writeFileSync(destFile, putsContents, {encoding : 'utf8'});

    });

    grunt.registerTask('debug', [
        'clean:debug',
        'run:debug',
        'uglify:debug',
        '_mergeDefs:debug',
        'rename:debug'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'run:build',
        'uglify:build',
        '_mergeDefs:build'
    ]);

    grunt.registerTask('karmaServer', [
        'karma:server:start'
    ]);

    grunt.registerTask('karmaWatcher', [
        'watch:karmaWatcher'
    ]);

    //grunt.registerTask('dist', [
    //    'build',
    //    'clean:dist',
    //    'compress:dist'
    //]);

    grunt.registerTask('default', 'debug');
};
