import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { FieldArray, Formik, useField, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import * as Yup from 'yup';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { regexps } from "../../utils/constans";
import { InputAdornment } from '@material-ui/core';

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
            customInput={<TextField variant="outlined" />}
        />
    );
};

const NewReceiptForm = () => {
    const { t } = useTranslation();
    const [itemValues, setItemValues] = useState({
        itemName: "",
        itemPrice: "",
        itemCategory: "",
    });

    const clearInputs = () => {
        setItemValues({itemName: "", itemPrice: "", itemCategory: ""})
    }

    const categories = [
        { title: "Artykuły spożywcze" },
        { title: "Kosmetyki" },
        { title: "Transport" },
        { title: "Mieszkanie" },
    ];
    const defaultProps = {
        options: categories,
        getOptionLabel: (option) => option.title,
    };

    const AddReceiptSchema = Yup.object().shape({
        shopName: Yup.string()
            .min(5, 'Too Short!')
            .matches(regexps.NOT_ONLY_SPEC_CHAR_AND_NUMS, `nie  spec char i cyfry`)
            .required('Required'),
        recipeAmount: Yup.string()
            .min(2, 'Too Short!')
            .required('Required')
    });

    return (
        <div className="receipt-form">
            <Formik
                initialValues={{
                    date: '',
                    recipeAmount: '',
                    shopName: '',
                    items: [
                        {
                            itemName: "Jajka",
                            itemPrice: "22,99",
                            itemCategory: "Artykuły spożywcze",
                        },
                        {
                            itemName: "Chleb",
                            itemPrice: "1,99",
                            itemCategory: "Artykuły spożywcze",
                        },
                        {
                            itemName: "Woda",
                            itemPrice: "2,99",
                            itemCategory: "Artykuły spożywcze",
                        },
                        {
                            itemName: "Szampon",
                            itemPrice: "11,99",
                            itemCategory: "Kosmetyki",
                        },
                    ],
                }}
                validationSchema={AddReceiptSchema}
                onSubmit={(values, actions) => {
                    console.log(values);
                }}
                render={({ errors, values, handleSubmit, handleChange, handleReset, dirty, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-input-group">
                        <TextField
                            className="form-input-group__input"
                            id="standard-full-width"
                            autoComplete="off"
                            variant="outlined"
                            name="shopName"
                            error={errors.shopName}
                            helperText={errors.shopName}
                            placeholder="Nazwa sklepu"
                            type="text"
                            onChange={handleChange}
                        />
                        <TextField
                            className="form-input-group__input"
                            autoComplete="off"
                            variant="outlined"
                            name="recipeAmount"
                            error={errors.recipeAmount}
                            helperText={errors.recipeAmount}
                            placeholder="Kwota całkowita PLN"
                            type="number"
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
                            }}
                        />
                        <DatePickerField
                                className="form-input-group__input"
                                name="date"
                        />
                        </div>
                        <FieldArray
                            name="items"
                            render={(arrayHelpers) => (
                                <div>
                                <div className="item-list">
                                    <TextField
                                        className="item-list__input"
                                        autoComplete="off"
                                        variant="outlined"
                                        name="itemName"
                                        error={errors.itemName}
                                        helperText={errors.itemName}
                                        label="Nazwa produktu"
                                        placeholder="Nazwa produktu"
                                        type="text"
                                        onChange={(e) => setItemValues({ ...itemValues, itemName: e.target.value })}
                                        value={itemValues.itemName}
                                    />
                                    <TextField
                                        className="item-list__input"
                                        autoComplete="off"
                                        variant="outlined"
                                        name="itemPrice"
                                        label="Cena"
                                        placeholder="Cena"
                                        type="number"
                                        onChange={(e) =>
                                            setItemValues({
                                                ...itemValues,
                                                itemPrice: e.target.value,
                                            })
                                        }
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
                                        }}
                                        value={itemValues.itemPrice}
                                    />
                                    <Autocomplete
                                        {...defaultProps}
                                        id="clear-on-blur"
                                        clearOnBlur={false}
                                        inputValue={itemValues.itemCategory}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="item-list__input"
                                                fullWidth={false}
                                                autoComplete="off"
                                                variant="outlined"
                                                label="Kategoria"
                                                name="itemCategory"
                                                placeholder="Kategoria"
                                                type="test"
                                                onChange={(e) =>
                                                    setItemValues({
                                                        ...itemValues,
                                                        itemCategory: e.target.value,
                                                    })
                                                }

                                            />
                                        )}
                                    />
                                </div>
                                    <Button
                                        variant="outlined"
                                        type="button"
                                        onClick={() => {
                                            clearInputs()
                                            arrayHelpers.push(itemValues);
                                        }}>
                                        Dodaj produkt
                                    </Button>

                                    <List>
                                        {values.items && values.items.length > 0
                                            ? values.items.map((item, index) => {
                                                  return (
                                                      <ListItem
                                                          key={index}
                                                          role={undefined}
                                                          dense
                                                          button
                                                          onClick={(value) => console.log(value)}>
                                                          <ListItemText id={index} primary={item.itemName} />
                                                          <ListItemText id={index} primary={item.itemPrice} />
                                                          <ListItemText id={index} primary={item.itemCategory} />
                                                          <ListItemSecondaryAction>
                                                              <IconButton edge="end" aria-label="delete">
                                                                  <DeleteIcon />
                                                              </IconButton>
                                                          </ListItemSecondaryAction>
                                                      </ListItem>
                                                  );
                                              })
                                            : null}
                                    </List>
                                </div>
                            )}
                        />
                    </Form>
                )}
            />
            <div className="receipt-form__submit-button">
                <Button variant="outlined" type="submit">
                    Dodaj paragon
                </Button>
            </div>
        </div>
    );
};

export default NewReceiptForm;
