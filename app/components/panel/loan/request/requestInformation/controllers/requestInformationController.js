requestInformationController.$inject = [
	"panel.loan.request.requestInformationServices",
	"dataStore",
	"$state",
	"$auth",
	"$stateParams"
];

function requestInformationController(
	requestInformationServices,
	dataStore,
	state,
	auth,
	stateParams
) {
	var self = this;
	let id = auth.user().id;
	console.log(id);
	self.company = {};
	self.type = stateParams.type;
	console.log(self.type);

	if (self.type != "Leasing") {
		self.loan = {};
		const getLoanData = function () {
			let loanData = dataStore.getData("loanReq");
			let notLoanDate = !Object.keys(loanData).length;
			if (notLoanDate) {
				state.go("panel.loan.request.loanInformation");
			}
			self.loan = loanData;
		};
		getLoanData();
	}

	if (self.type == "Leasing") {
		self.vendor = {};
		const getLeasingData = function () {
			let leasingData = dataStore.getData("leasingReq");
			let notLeasingDate = !Object.keys(leasingData).length;
			if (notLeasingDate) {
				state.go("panel.loan.request.requestData");
			}
			self.vendor = leasingData;
		};
		getLeasingData();
	}

	const getCompanyInformation = function () {
		let query = {
			type: "LegalPersons",
			id: id,
			routeParams: "base-info"
		};
		self.promiseLoading = requestInformationServices.get(query).$promise.then(
			response => {
				self.company.info = response.content;
			},
			errResponse => {
				console.log("error");
			}
		);
	};

	getCompanyInformation();

	const getRegistryInformation = function () {
		let query = {
			type: "LegalPersons",
			id: id,
			routeParams: "registration-info"
		};
		self.promiseLoading = requestInformationServices.get(query).$promise.then(
			response => {
				self.company.registry = response.content;
			},
			errResponse => {
				console.log("error");
			}
		);
	};

	getRegistryInformation();

	const getKnowledge = function () {
		let query = {
			type: "LegalPersons",
			id: id,
			routeParams: "special-memberships"
		};
		self.promiseLoading = requestInformationServices.get(query).$promise.then(
			response => {
				self.company.knowledge = response.content;
			},
			errResponse => {
				console.log("error");
			}
		);
	};

	getKnowledge();

	if (self.type != "Leasing") {
		self.submit = async function (loan, form) {
			if (form.$valid) {
				let parameter = {
					type: "legal-persons",
					id: "self",
					routeParams: "loan-requests"
				};

				await requestInformationServices.create(parameter, loan).$promise.then(
					response => {
						dataStore.removeData("loanReq");
						iziToast.show({
							message: response.message,
							theme: "light",
							color: "green"
						});
						state.go("panel.dashboard", {
							type: self.loan.type,
							id: response.content
						});
					},
					errResponse => {
						iziToast.show({
							message: errResponse.data.message,
							theme: "light",
							color: "red"
						});
						console.log("fail createYear");
					}
				);
			}
		};
	}

	if (self.type == "Leasing") {
		self.submit = async function (vendor, form) {
			// if (form.$valid) {
				let query = {
					type: "legal-persons",
					id: "self",
					routeParams: "leasing-requests",
				}
				console.log(vendor);
				console.log(self.vendor);

				await requestInformationServices.submitLeasing(query, vendor).$promise.then(
					response => {
						dataStore.removeData("leasingReq");
						iziToast.show({
							message: response.message,
							theme: "light",
							color: "green"
						});
						state.go("panel.dashboard", {
							type: self.vendor.type,
							id: response.content
						});
					},
					errResponse => {
						iziToast.show({
							message: errResponse.data.message,
							theme: "light",
							color: "red"
						});
						console.log("fail createYear");
					}
				);
			// }
		};
		// self.submit = function (vendor) {
		// 	// let query = {
		// 	// 	type: "legal-persons",
		// 	// 	id: "self",
		// 	// 	routeParams: "leasing-requests",
		// 	// }
		// 	// requestInformationServices.submitLeasing(query, vendor).$promise.then(
		// 	// 	response => {
		// 	// 		iziToast.show({
		// 	// 			message:"درخواست باموفقیت ثبت شد",
		// 	// 			theme: "light",
		// 	// 			color: "green"
		// 	// 		  });
		// 	// 		//   var test = response.content;
		// 	// 		//   dataStore.setData("leasingId", {test});
		// 	// 		  state.go("panel.dashboard");
		// 	// 	},
		// 	// 	errResponse => {
		// 	// 		iziToast.show({
		// 	// 			message: "ثبت درخواست موفقیت آمیز نبود",
		// 	// 			theme: "light",
		// 	// 			color: "red"
		// 	// 		});
		// 	// 	}
		// 	// )
		// 	iziToast.show({
		// 		message: "درخواست با موفقیت ثبت شد",
		// 		theme: "light",
		// 		color: "green"
		// 	});
		// 	//   var test = response.content;
		// 	//   dataStore.setData("leasingId", {test});
		// 	state.go("panel.dashboard");
		// };
	}
}

module.exports = ngModule => {
	ngModule.controller(
		"panel.loan.request.requestInformationController",
		requestInformationController
	);
};
