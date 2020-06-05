import BudgedManagerAPI from "../clients/BudgedManagerAPI";

function postRegistrationFormData(formData) {
    return BudgedManagerAPI.request({
        url: "/users/register/",
        method: "POST",
        data: formData,
    });
}

const RegistrationService = {
    postRegistrationFormData,
};

export default RegistrationService;
