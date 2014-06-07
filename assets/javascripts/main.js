requirejs.config({
  baseUrl:  "/javascripts",
  shim: {
    'handlebars': {
      exports: 'Handlebars',
    },
    'ember': {
      deps: ['handlebars', 'jquery'],
      exports: 'Ember'
    }
  },
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'handlebars': 'vendor/handlebars/handlebars',

    // switch the comment on the next two lines to go betweem
    // canary and beta
    'ember': 'vendor/ember/ember.beta'
    //'ember': 'vendor/ember/ember.canary'
  }
});

require(['app']);