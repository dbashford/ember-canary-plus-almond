define(['ember'], function(Ember) {
  console.log("THIS IS EMBER CONSOLE LOGGED!");
  console.log(Ember);
  var App = Ember.Application.create({});
  return App;
});