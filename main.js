'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        localstorage: {
            deps: ['backbone'],
            exports: 'localstorage'
        },
        paginator: {
            deps: ['backbone'],
            exports: 'paginator'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: './node_modules/jquery/dist/jquery',
        "jqueryui": "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min",
        underscore: './node_modules/lodash/lodash',
        localstorage: "./node_modules/backbone.localstorage/backbone.localStorage",
        paginator: "./node_modules/backbone.paginator/lib/backbone.paginator",
        backbone: './node_modules/backbone/backbone',
        layoutmanager: './node_modules/backbone.layoutmanager/backbone.layoutmanager'
    }
});
require([
    'app/app'
], function (MainApp) {
    window.App = {};
    MainApp.initialize();
});
define("main", function() {});