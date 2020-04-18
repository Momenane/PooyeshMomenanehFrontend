const loanInformationModule = angular.module("loanInformationModule", []);

// Controllers

var controllers = require.context("./controllers", true, /.js$/);

controllers.keys().map(function(value) {
  require(`./controllers/${value.slice(2)}`)(loanInformationModule);
});

// Factories
try {
  var factories = require.context("./factories", true, /.js$/);

  factories.keys().map(function(value) {
    try {
      equire(`./factories/${value.slice(2)}`)(loanInformationModule);
    } catch (error) {}
  });
} catch (error) {}

// Filters
try {
  var filters = require.context("./filters", true, /.js$/);

  filters.keys().map(function(value) {
    try {
      require(`./filters/${value.slice(2)}`)(loanInformationModule);
    } catch (error) {}
  });
} catch (error) {}

// Services

var services = require.context("./services", true, /.js$/);

services.keys().map(function(value) {
  require(`./services/${value.slice(2)}`)(loanInformationModule);
});

export default loanInformationModule;
