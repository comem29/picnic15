module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/picnic.css': '_sass/picnic.scss'
        }
      },
      dev: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/picnic.min.css': '_sass/picnic.scss'
        }
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'],
        map: true
      },
      dist: {
        src: 'css/picnic.min.css'
      },
      dev: {
        src: 'css/picnic.css'
      },
    },

    jekyll: {                             // Task
      dist: {                             // Target
        options: {                        // Target options
          dest: '_site',
          config: '_config.yml'
        }
      },
      dev : {
        options : {
          dest: '_site',
          config: '_config-dev.yml'
        }
      }
    },

    watch: {
      sass: {
        files: '_sass/**/*.scss',
        tasks: ['sass']
      },
      jekyll: {
        files: ['index.html', '_layouts/*.html', '_includes/*.html', '_posts/*.*', 'css/*.css'],
        tasks: ['jekyll:dev']
      }
    },

    browserSync: {
      files: {
        src : ['_site/css/*.css', '_site/**/*.html']
      },
      options: {
        watchTask: true,
        ghostMode: {
          clicks: true,
          scroll: true,
          links: true,
          forms: true
        },
        server: {
          baseDir: '_site'
        }
      }
    },

    'gh-pages': {
      options: {
        base: './_site'
      },
      src: ['**']
    }

  });

  // Load plugins tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task(s).
  grunt.registerTask('default', ['jekyll:dev', 'browserSync', 'watch']);
  // Build
  grunt.registerTask('build', ['sass', 'autoprefixer', 'jekyll:dev']);
  // Deploy
  grunt.registerTask('deploy', ['sass', 'autoprefixer', 'jekyll:dist', 'gh-pages']);

};
