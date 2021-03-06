'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PoojanGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using Poojan\'s HTML generator.'));

    var prompts = [{
      name: 'appName',
      message: 'Would you like to call your app?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/jade');
    this.mkdir('src/stylesheets');
    this.mkdir('src/js');
    this.mkdir('html');
    this.mkdir('test');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');
    this.copy('_karma.conf.js', 'karma.conf.js');

    this.copy('_gulpfile.js', 'gulpfile.js');

    this.copy('gitignore', '.gitignore');

    this.copy('js/_main.js', 'src/js/main.js');

    this.copy('stylesheets/_main.styl', 'src/stylesheets/main.styl');

    this.copy('jade/_index.jade', 'src/jade/index.jade');

    this.copy('test/_mainTest.js', 'test/mainTest.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PoojanGenerator;
