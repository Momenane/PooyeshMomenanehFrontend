dashboardController.$inject = ["panel.jahadiPanel.dashboardServices", "Upload", "$state", "$timeout", "$resource"];

function dashboardController(dashboardServices, upload, state, timeout, resource) {
  var self = this;

  let membersListService = resource(
    `http://localhost:3000/member/list`
  );

  const getMembersList = function () {
    self.promiseLoading = membersListService.get({}).$promise.then(
      response => {
        self.list = response.content;
        console.log(self.list);
      },
      errResponse => {
        console.log("err");
      }
    );
  };
  getMembersList();

  // تایم

  // initialise and get the current date
  self.currentDate = moment(new Date())
    .locale("fa")
    .format("dddd jDD MMM jYYYY");

  let currentTime = moment(new Date())
    .locale("fa")
    .format("mm : H"); // get the current time
  self.clock = currentTime; // initialise the time variable
  self.tickInterval = 1000; //ms

  let tick = function () {
    let currentTime = moment(new Date())
      .locale("fa")
      .format("mm : H"); // get the current time
    self.clock = currentTime;
    timeout(tick, self.tickInterval); // reset the timer
  };

  // Start the timer
  timeout(tick, self.tickInterval);
}

module.exports = ngModule => {
  ngModule.controller("panel.jahadiPanel.dashboardController", dashboardController);
};
