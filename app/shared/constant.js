var protocol = location.protocol;

var projectTitle = "پویش مومنانه | سامانه هدفمندسازی مساعدتهای داوطلبانه جهادی";

gateway = protocol + "//localhost:3000";

var mode = "Dev";
if (mode === "Dev") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "35b71e0f-4ff0-4238-a610-cfde368909d6";
    gateway = protocol + "//localhost:3000";
}
if (mode === "Test") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "35b71e0f-4ff0-4238-a610-cfde368909d6";
    gateway = protocol + "//localhost:3000";
} else if (mode === "Demo") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "dcf1a718-d925-4c37-963d-fdfb8439217f";
    gateway = protocol + "//localhost:3000";
} else if (mode === "Production") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "dcf1a718-d925-4c37-963d-fdfb8439217f";
    gateway = protocol + "//localhost:3000";
}

apiGetWay = gateway + "/csm/v1";
apiUser = gateway + "/user";
apiGroup = gateway + "/group";
apiMember = gateway + "/member";
apiPlan = gateway + "/plan";
apiDonate = gateway + "/donate";
apiFileManagerPost = gateway + "/file/Upload";
apiFileManagerGet = gateway + "/file/media";