import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {useFormik} from 'formik';
import { useTranslation } from "react-i18next";

const SignupForm = () => {
    const { t } = useTranslation()
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const [date, setDate] = useState(new Date())

    const handleChange = date => {
        setDate(date)
    };


    const formik = useFormik({
        initialValues: {
            shopName: '',
            paidAmount: 0,
            date: new Date()
        },
        onSubmit: values => {
            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                />
                <label htmlFor="shopName">{t("shop.name")}</label>
                <input
                    id="shopName"
                    name="shopName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.shopName}
                />
                <label htmlFor="storeName">{t("paid.amount")}</label>
                <input
                    id="paidAmount"
                    name="paidAmount"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.paidAmount}
                />
                <button type="submit">Submit</button>
            </form>
        </>

    );
};

export default SignupForm;