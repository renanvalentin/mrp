/* @flow */

import { argv } from 'yargs';

import { WEBPACK_CONFIG_TEST } from './webpack.config';

export default function configKarma(config : Object) {

    let debug          = Boolean(argv.debug);
    let quick          = Boolean(argv.quick);
    let captureConsole = Boolean(argv.console);
    let keepOpen       = Boolean(argv['keep-open']) || debug;
    let autoWatch      = Boolean(keepOpen);
    let coverage       = !argv['no-coverage'] && !quick;
    let logLevel       = argv['log-level'] || argv.loglevel || (keepOpen ? 'info' : '');
    let headless       = !keepOpen;

    // $FlowFixMe
    let browsers: string = argv.browser;

    let karmaConfig : Object = {

        files: [
            {
                pattern:  'node_modules/babel-polyfill/dist/polyfill.js',
                included: true,
                served:   true
            },

            {
                pattern:  'test/test.js',
                included: true,
                served:   true
            }
        ],

        preprocessors: {
            'test/test.js':         [ 'webpack',  'sourcemap' ],
            'test/windows/**/*.js': [ 'webpack',  'sourcemap' ],
            'src/**/*.js':          [ 'coverage', 'sourcemap' ]
        },

        customLaunchers: {

            xChrome: {
                base:  'Chrome',
                flags: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                    '--remote-debugging-address=0.0.0.0',
                    // '--auto-open-devtools-for-tabs',
                    '--enable-precise-memory-info',
                    '--js-flags="--expose-gc"'
                ],
                debug
            },

            xPhantom: {
                base:  'PhantomJS',
                flags: [
                    '--load-images=true',
                    '--disk-cache=true',
                    '--disk-cache-path=node_modules/.cache/phantomjs',
                    '--max-disk-cache-size=1000000'
                ],
                debug
            }

        },

        webpack: WEBPACK_CONFIG_TEST,

        reporters: [
            quick ? 'progress' : 'spec'
        ],

        autoWatch,
        logLevel:  debug ? config.LOG_DEBUG : logLevel || config.LOG_WARN,

        basePath: __dirname,

        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        client: {
            captureConsole
        },

        port: 9876,

        colors: true,

        webpackMiddleware: {
            noInfo: !debug,
            stats:  !debug
        },

        browserNoActivityTimeout:   60 * 60 * 1000,
        browserDisconnectTimeout:   30 * 1000,
        browserDisconnectTolerance: 2,
        captureTimeout:             120000,
        reportSlowerThan:           10000,

        browserConsoleLogOptions: {
            level:    debug ? 'debug' : 'error',
            format:   '%b %T: %m',
            terminal: true
        },

        singleRun: !keepOpen
    };

    if (browsers) {
        karmaConfig.browsers = browsers.split(',');
    } else {
        karmaConfig.browsers = [ 'PhantomJS' ];
    }

    if (coverage) {
        karmaConfig.reporters.push('coverage');

        karmaConfig.coverageReporter = {
            instrumenterOptions: {
                istanbul: {
                    noCompact: true
                }
            },
            reporters: [
                {
                    type: 'text'
                },
                {
                    type:   'html',
                    dir:    'coverage/',
                    subdir: '.'
                }
            ]
        };
    }

    if (headless) {
        karmaConfig.customLaunchers.xChrome.flags.push('--headless');
    }

    config.set(karmaConfig);
}
