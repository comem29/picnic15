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
    'gh-pages': {
      options: {
        base: '.'
      },
      src: ['**']
    }
  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "gh-pages" task.
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task(s).
  grunt.registerTask('default', ['sass']);
  // Deploy
  grunt.registerTask('deploy', ['sass', 'gh-pages']);

};
