groupInfoController.$inject = ["panel.jahadiRegister.groupInfoServices", "Upload", "$state", "$resource"];

function groupInfoController(groupInfoServices, upload, state, resource) {
  var self = this;

  let jahadiRegisterGroupService = resource(
    `http://localhost:3000/group/add`,
    {
      routeParams: "@routeParams"
    },
    {
      save: {
        method: "POST",
        headers: {"content-type": "application/json"},
      },
      update: {
        method: "PATCH"
      }
    }
  );

  self.ticket = {};
  self.ticket.priority = "2";

  self.ticketTypeEnum = [
    {
      value: "0",
      key: "فنی"
    },
    {
      value: "1",
      key: "مالی"
    },
    {
      value: "2",
      key: "سایر"
    }
  ];
  self.ticket.ticketType = self.ticketTypeEnum[0].value;

  self.uploadLogo = function (file) {
    if (file.length > 0) {
      upload
        .upload({
          url: apiFileManagerPost,
          data: {
            file: file
          }
        })
        .then(
          function (response) {
            self.ticket.attachment = response.data[0].fileName;
          },
          function (resp) {
            self.ticket = {};
          },
          function (evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
            if (progressPercentage < 100) {
              self.loadingShow = true;
            } else {
              self.loadingShow = false;
            }
            console.log(progressPercentage);
          }
        );
    }
  };

  self.submit = function (form) {

    if (self.jahadi.name &&
      self.jahadi.firstName &&
      self.jahadi.lastName &&
      self.jahadi.phoneNumber &&
      self.jahadi.emergencyNumber &&
      self.jahadi.address) {

      jahadiRegisterGroupService.save().$promise.then(
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
