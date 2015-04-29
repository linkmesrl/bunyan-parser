'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['sass/*.scss'],
                tasks: ['compass'],
                options: {
                    livereload: true,
                },
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/*.html',
                    'app/js/*.js',
                    'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
        },
        compass: {
            dist: {
                options: {              // Target options
                    sassDir: 'sass',
                    cssDir: 'css',
                    environment: 'development'
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729,
                base: 'app'
            },
            livereload: {
                options: {
                    open: 'http://127.0.0.1:9000',
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);
};
