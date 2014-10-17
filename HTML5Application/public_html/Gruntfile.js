module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "css/main.css": "src/less/*.less"
        }
      }
    },
    concat: {
     options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/js/models/*.js', 'src/js/views/*.js', 'src/js/routers/*.js', 'src/js/*.js'],
        // the location of the resulting JS file
        dest: 'js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'js/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      styles: {
        files: ['src/less/**/*.less', 'src/js/**/*.js'], // which files to watch
        tasks: ['less', 'concat', 'uglify'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch', 'concat', 'uglify']);
  
};