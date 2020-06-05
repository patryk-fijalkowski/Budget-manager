import React, { useState } from "react";
import RegistrationService from "../../services/RegistrationService";
import AccountService from "../../services/AccountService";
import { useFormik } from "formik";
import { TextField, Button } from "@material-ui/core";
const RegisterForm = () => {
    const loginData = {
        email: "patryl.fijalkowski1@gmail.com",
        password: "test",
    };

    async function postRegistrationUserData(formData) {
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

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            postRegistrationUserData(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id="first_name"
                name="first_name"
                placeholder="Imię"
                type="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
            />
            <TextField
                id="last_name"
                name="last_name"
                placeholder="Nazwisko"
                type="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
            />
            <TextField
                id="email"
                name="email"
                placeholder="E-mail"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <TextField
                id="password"
                name="password"
                placeholder="Hasło"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <Button type="submit" variant="outlined">
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
