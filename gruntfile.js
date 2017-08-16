module.exports = function (grunt) {
    var dirs = {
        src: "src",  
        app: "app",
    };

    grunt.initConfig({
        // WATCH CONFIG
        dirs: dirs,
        watch: {
            options: {
                spawn: false
            },
            sass: {
                files: '<%= dirs.src %>/scss/**/*.scss',
                tasks: ['sass', 'autoprefixer', 'bsReload:css']
            },
            scripts: {
                files: '<%= dirs.src %>/scripts/**/*.js',
                tasks: ['import_js', 'bsReload:all']
            },
            html: {
                files: '<%= dirs.src %>/*.html',
                tasks: ['copy:dev','bsReload:all']
            }
        },
        // COPY CONFIG
        copy: {
            dev: {
                files: [
                  // makes all src relative to cwd
                  {expand: true, cwd: 'src/', src: ['*.html'], dest: 'app/'},
                  {expand: true, cwd: 'src/img/', src: ['**'], dest: 'app/img/'}
                ]
            }
        },
        // SASS CONFIG
        sass: {
            dev: {
                files: {
                    '<%= dirs.app %>/css/main.css': '<%= dirs.src %>/scss/main.scss'
                }
            }
        },
        // AUTO PREFIXER CONFIG
        autoprefixer: {
            options: {
                browsers: ['last 5 versions', 'ie 8']
            },
            css: {
                src: '<%= dirs.app %>/css/main.css',
                dest: '<%= dirs.app %>/css/main.css'
            }
        },
        import_js: {
            files: {
              expand: true,
              cwd: '<%= dirs.src %>/scripts/',
              src: ['app.js'],
              dest: '<%= dirs.app %>/js/',
              ext: '.js'
            }
        },
        // BROWSER-SYNC CONFIG
        browserSync: {
            dev: {
                options: {
                    server: "./app",
                    background: true
                }
            }
        },
        // RELOAD CONFIG
        bsReload: {
            css: {
                reload: "main.css"
            },
            all: {
                reload: true
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-import-js');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // define default task
    grunt.registerTask('compile',['copy:dev','sass:dev','autoprefixer','import_js']);
    grunt.registerTask('serve',['compile','browserSync', 'watch']);
    grunt.registerTask('default', ['serve']);
};