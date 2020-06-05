import React, { useState } from "react";
import RegistrationService from "../../services/RegistrationService";

const RegisterForm = () => {
    const formData = {
        first_name: "Patryk",
        last_name: "Fijalkowski",
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

    return (
        <>
            <button onClick={postRegistrationUserData}>Post User Data</button>
        </>
    );
};

export default RegisterForm;
