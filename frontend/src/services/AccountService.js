import BudgedManagerAPI from "../clients/BudgedManagerAPI";

function login({ email, password }) {
    return BudgedManagerAPI.request({
        url: "/users/login",
        method: "POST",
        data: { email, password },
    });
}

const AccountService = {
    login,
};

export default AccountService;
