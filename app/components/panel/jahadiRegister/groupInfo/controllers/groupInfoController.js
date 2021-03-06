groupInfoController.$inject = ["panel.jahadiRegister.groupInfoServices", "Upload", "$state", "$resource"];

function groupInfoController(groupInfoServices, upload, state, resource) {
  var self = this;

  let jahadiRegisterGroupService = resource(
    `${apiGroup}/add`,
    {
      routeParams: "@routeParams"
    },
    {
      save: {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=utf-8'},
      },
      update: {
        method: "PATCH"
      }
    }
  );

  self.submit = function (form) {

    if (self.jahadi.name &&
      self.jahadi.firstName &&
      self.jahadi.lastName &&
      self.jahadi.phoneNumber &&
      self.jahadi.emergencyNumber &&
      self.jahadi.address) {

      jahadiRegisterGroupService.save(form).$promise.then(
        response => {
          // form.$setUntouched();
          // form.$setPristine();
          iziToast.show({
            message: "عملیات باموفقیت انجام شد",
            theme: "light",
            color: "green"
          });
          console.log(self.jahadi);
          state.go("panel.jahadiRegister.serviceInfo");
        },
        errResponse => {
          iziToast.show({
            message: "نشد",
            theme: "light",
            color: "red"
          });
          console.log("fail createYear");
        }
      );
    }
    else {
      iziToast.show({
        message: "فرم را به درستی تکمیل کنید",
        theme: "light",
        color: "red"
      });
      console.log("fail createYear");
    }
  };
  console.log(self.jahadi);
}

module.exports = ngModule => {
  ngModule.controller("panel.jahadiRegister.groupInfoController", groupInfoController);
};
