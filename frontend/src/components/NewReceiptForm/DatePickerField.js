import DatePicker from "react-datepicker";
import { TextField } from "@material-ui/core";
import React from "react";
import { useField, useFormikContext } from "formik";

export const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
                setFieldValue(field.name, val);
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Data"
            autoComplete="off"
            customInput={<TextField variant="outlined" error={!!props.error.date} helperText={props.error.date} />}
        />
    );
};
