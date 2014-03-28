require.config({
  urlArgs: 'bust=' + new Date().getTime(),
  paths: {
    'domReady': '../components/requirejs-domready/domReady',
    'angular': '../components/angular/angular'
  },
  shim: {
    'angular': { 'exports': 'angular' }
  },
  priority: ['angular'],
  deps: ['./bootstrap']
});
