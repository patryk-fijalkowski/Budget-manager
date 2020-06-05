import React, { useState } from "react";
import RegistrationService from "../../services/RegistrationService";
import AccountService from "../../services/AccountService";

const RegisterForm = () => {
    const formData = {
        first_name: "Patryk",
        last_name: "Fijalkowski",
        email: "patryl.fijalkowski1@gmail.com",
        password: "test",
    };

    const loginData = {
        email: "patryl.fijalkowski1@gmail.com",
        password: "test",
    };

    async function postRegistrationUserData() {
        try {
            const res = await RegistrationService.postRegistrationFormData(formData);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    async function loginUser() {
        try {
            const res = await AccountService.login(loginData);
            localStorage.setItem("userToken", res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <button onClick={postRegistrationUserData}>Post User Data</button>
            <button onClick={loginUser}>Login User</button>
        </>
    );
};

export default RegisterForm;
