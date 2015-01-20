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
          dest: './dist',
          config: '_config.yml'
        }
      },
      serve: {                            // Another target
        options: {
          dest: '.jekyll',
          drafts: true
        }
      }
    },
    'gh-pages': {
      options: {
        base: './dist'
      },
      src: ['**']
    }
  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "jekyll" task.
  grunt.loadNpmTasks('grunt-jekyll');
  // Load the plugin that provides the "gh-pages" task.
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task(s).
  grunt.registerTask('default', ['sass']);
  // Deploy
  grunt.registerTask('deploy', ['sass', 'jekyll:dist', 'gh-pages']);

};
