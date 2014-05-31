module.exports = function (grunt) {
  "use strict";
  // configure the tasks
  grunt.initConfig({
    watch: {
      javascript: {
        files: ['gruntfile.js', 'src/*.js', 'spec/*.js'],
        tasks: ['tests-lints']
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/*.js', 'spec/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        eqeqeq: true,
        globalstrict: true,
        trailing: true,
        node: true,
        loopfunc: true,
        globals: {
          screen: true,
          navigator: true,
          Parallax: true,
          document: true,
          window: true,
          $: true,
          describe: true,
          beforeEach: true,
          it: true,
          expect: true,
          _: true,
          require: true,
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    jasmine_node: {
      coverage: {

      },
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        jUnit: {
          report: true,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: ['spec/']
    }
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');

  // define the tasks

  grunt.registerTask(
    'tests-lints',
    'Runs the tests and runs the jShinter.',
    [ 'jshint', 'jasmine_node' ]
  );

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'build-scripts', 'stylesheets' ]
  );

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    [ 'watch' ]
  );
};