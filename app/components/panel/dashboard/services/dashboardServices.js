dashboardServices.$inject = ["$resource"];

function dashboardServices($resource) {
  return $resource(
    `${apiReportCenterRefactor}/:type/:id/:routeParams`,
    { id: "@id", type: "@type", routeParams: "@routeParams" },
    {
      query: { method: "GET", isArray: true },

      create: { method: "POST" },

      get: { method: "GET" },

      remove: { method: "DELETE" },

      update: { method: "PUT" }
    }
  );
}

module.exports = ngModule => {
  ngModule.factory("panel.dashboardServices", dashboardServices);
};
