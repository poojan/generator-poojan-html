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
    this.log(chalk.magenta('You\'re using the fantastic Poojan generator.'));

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
    this.mkdir('src/jade/stylesheets');
    this.mkdir('src/js');
    this.mkdir('src/css');
    this.mkdir('build');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_build.js', 'build.js');
    this.copy('bowerrc', '.bowerrc');

    this.copy('_gulpfile.js', 'gulpfile.js');

    this.copy('gitignore', '.gitignore');

    this.copy('js/_main.js', 'src/js/main.js');
    this.copy('js/_app.js', 'src/js/app.js');
    this.copy('js/_bootstrap.js', 'src/js/bootstrap.js');

    this.copy('jade/stylesheets/_main.styl', 'src/jade/stylesheets/main.styl');

    this.copy('jade/_index.jade', 'src/jade/index.jade');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PoojanGenerator;
