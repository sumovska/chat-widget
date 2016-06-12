/** Source paths **/
var src = {
  root: 'src/',
  html: 'src/',
  css: 'src/css/',
  less: 'src/less/',
  js: 'src/js/',
  vendor: 'bower_components/',
  img: 'src/img/',
  svg: 'src/img/svg/',
  fonts: 'src/fonts/',
  video: 'src/video/'
};

/** Destination paths **/
var dist = {
  root: 'dist/',
  html: 'dist/',
  css: 'dist/css/',
  js: 'dist/js/',
  img: 'dist/img/',
  fonts: 'dist/fonts/',
  video: 'dist/video/'
};


var config = {
  src: 'src/',
  dest: 'dist/'
};


module.exports = function(grunt) {
  grunt.initConfig({
    config: config,

    clean: {
      pre: [dist.root, src.css, src.js + 'vendor'],
      after: [src.css + 'temp'],
      dist: [dist.js + 'custom.js']
    },
    copy: {
      dev: {
        files: []
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.dest %>',
          src: [
            'css/{,*/}*.*',
            'img/**/*',
            'js/{,*/}*.js',
            'fonts/{,*/}*.*',
            'video/{,*/}*.*',
            '{,*/}*.html'
          ]
        }]
      }
    },
    concat: {
      options: {
        separator: '\n\n\n'
      },
      dist: {
        files: []
      }
    },
    cssmin: {
      options: {
        separator: '\n\n\n',
        keepSpecialComments: 1
      },
      dist: {
        files: []
      }
    },
    less: {
      dev: {
        options: {
          paths: [src.less]
        },
        files: [{
          expand: true,
          cwd: src.less,
          src: ['chat-widget.less'],
          dest: src.css,
          ext: ".css"
        }]
      }
    },
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: src.css + '/maps/'
        },
        processors: [
          require('postcss-focus'),
          require('postcss-flexbugs-fixes'),
          require('autoprefixer')({
            browsers: ['> 1%', 'last 2 versions', 'ie > 7']
          }),
          require('css-mqpacker')({
            sort: true
          })
        ]
      },
      dist: {
        src: src.css + 'chat-widget.css'
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      dev: {
        files: []
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: [src.js + "*.js"],
        tasks: ["process"]
      },
      styles: {
        files: [src.less + "**/*.less"],
        tasks: ["process"]
      },
      html: {
        files: [src.html + "*.html"],
        tasks: ["process"]
      },
      images: {
        files: [src.img + "**/*.*"],
        tasks: ["process"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-rename");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks("grunt-newer");

  grunt.registerTask("default", ["clean:pre", "less", "postcss", "copy:dev", "uglify:dev", "cssmin", "concat", "clean:after", "copy:dist", "clean:dist", "watch"]);
  grunt.registerTask("process", ["less", "postcss", "newer:copy:dist"]);
};
