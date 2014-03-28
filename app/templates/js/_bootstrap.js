window.name = "NG_DEFER_BOOTSTRAP!";
define([
  'require',
  'angular',
  'app'
], function (require, ng, app) {
  require(['domReady!'], function (document) {
    console.log(document);
    ng.bootstrap(document, [app.name]);
  });
});
