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
      }
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
        files: ['index.html', '_layouts/*.html', '_includes/*.html', 'css/*.css'],
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

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "jekyll" task.
  grunt.loadNpmTasks('grunt-jekyll');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Load the plugin that provides the "browser_sync" task.
  grunt.loadNpmTasks('grunt-browser-sync');
  // Load the plugin that provides the "gh-pages" task.
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task(s).
  grunt.registerTask('default', ['jekyll:dev', 'browserSync', 'watch']);
  // Build
  grunt.registerTask('build', ['sass', 'jekyll:dev']);
  // Deploy
  grunt.registerTask('deploy', ['sass', 'jekyll:dist', 'gh-pages']);

};
