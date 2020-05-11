personalInfoController.$inject = ["panel.needyAdd.personalInfoServices", "$state", "$resource"];

function personalInfoController(personalInfoServices, state, resource) {
  var self = this;

  let memberAddService = resource(
    `${apiMember}/add`,
    {
      routeParams: "@routeParams"
    },
    {
      add: {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=utf-8'},
      },
      update: {
        method: "PATCH"
      }
    }
  );

  self.submit = function (form) {

    if (self.need.national_code &&
      self.need.name &&
      self.need.surname &&
      self.need.tels &&
      self.need.birth_date &&
      self.need.address) {

      memberAddService.add(form).$promise.then(
        response => {
          // form.$setUntouched();
          // form.$setPristine();
          iziToast.show({
            message: "عملیات باموفقیت انجام شد",
            theme: "light",
            color: "green"
          });
          console.log(self.need);
          state.go("panel.needyAdd.needInfo");
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
  console.log(self.need);
}

module.exports = ngModule => {
  ngModule.controller("panel.needyAdd.personalInfoController", personalInfoController);
};
