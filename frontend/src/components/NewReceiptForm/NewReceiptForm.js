import React, {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {FieldArray, Formik, useField, useFormikContext} from "formik";
// import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import * as Yup from 'yup';
import Autocomplete from "@material-ui/lab/Autocomplete";
import {regexps} from "../../utils/constans";
import {InputAdornment} from '@material-ui/core';
import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";

export const DatePickerField = ({...props}) => {
    const {setFieldValue} = useFormikContext();
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
            customInput={<TextField variant="outlined"/>}
        />
    );
};

const NewReceiptForm = () => {
    // const { t } = useTranslation();
    const [totalAmount, setTotalAmount] = useState(0)
    const [itemValues, setItemValues] = useState({
        itemName: "",
        itemPrice: "",
        itemCategory: "",
    });

    const clearInputs = () => {
        setItemValues({itemName: "", itemPrice: "", itemCategory: ""})
    }

    const countTotalAmount = (values) => {
        let countedAmount = values.reduce((total, item) => total + item.itemPrice.replace(',', '.') * 1, 0)
        setTotalAmount(countedAmount)
    }

    const categories = [
        {title: "Artykuły spożywcze"},
        {title: "Kosmetyki"},
        {title: "Transport"},
        {title: "Mieszkanie"},
    ];

    const defaultProps = {
        options: categories,
        getOptionLabel: (option) => option.title,
        getOptionSelected: (option) => option.title
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
                    items: [],
                }}
                validationSchema={AddReceiptSchema}
                onSubmit={(values, actions) => {
                    console.log(values);
                }}
            >
                {({errors, values, handleSubmit, handleChange}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-header">
                            <TextField
                                className="form-header__input"
                                id="standard-full-width"
                                autoComplete="off"
                                variant="outlined"
                                name="shopName"
                                error={!!errors.shopName}
                                helperText={errors.shopName}
                                placeholder="Nazwa sklepu"
                                type="text"
                                onChange={handleChange}
                            />

                            <DatePickerField
                                className="form-header__input"
                                name="date"
                            />
                        </div>
                        <FieldArray
                            name="items"
                            render={(arrayHelpers) => (
                                <div className="form-items-list">
                                    <div className="form-items-list__header">
                                        <TextField
                                            className="form-items-list__input"
                                            autoComplete="off"
                                            name="itemName"
                                            error={errors.itemName}
                                            helperText={errors.itemName}
                                            label="Nazwa produktu"
                                            placeholder="Nazwa produktu"
                                            type="text"
                                            onChange={(e) => setItemValues({...itemValues, itemName: e.target.value})}
                                            value={itemValues.itemName}
                                        />
                                        <TextField
                                            className="form-items-list__input"
                                            autoComplete="off"
                                            name="itemPrice"
                                            label="Cena"
                                            placeholder="Cena"
                                            type="number"
                                            onChange={(e) => setItemValues({...itemValues, itemPrice: e.target.value})}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
                                            }}
                                            value={itemValues.itemPrice}
                                        />
                                        <Autocomplete
                                            {...defaultProps}
                                            id="clear-on-blur"
                                            clearOnBlur={false}
                                            getOptionSelected={defaultProps.getOptionSelected}
                                            inputValue={itemValues.itemCategory}
                                            onChange={(e, value) => setItemValues({
                                                ...itemValues,
                                                itemCategory: value.title
                                            })}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    className="form-items-list__input"
                                                    fullWidth={false}
                                                    autoComplete="off"
                                                    label="Kategoria"
                                                    name="itemCategory"
                                                    placeholder="Kategoria"
                                                    type="text"
                                                />
                                            )}
                                        />
                                        <IconButton
                                            className="form-items-list__button"
                                            disabled={Object.values(itemValues).indexOf("") !== -1}
                                            size="large" edge="end" aria-label="add-item">
                                            <AddIcon
                                                className="form-items-list__button__add-icon"
                                                onClick={() => {
                                                    clearInputs()
                                                    arrayHelpers.push(itemValues);
                                                    countTotalAmount([...values.items, itemValues])
                                                }}/>
                                        </IconButton>
                                    </div>
                                    <TableContainer component={Paper}>
                                        <Table className="table" size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Lp.</TableCell>
                                                    <TableCell align="left">Nazwa produktu</TableCell>
                                                    <TableCell align="left">Cena</TableCell>
                                                    <TableCell align="left">Kategoria</TableCell>
                                                    <TableCell align="left"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {values.items && values.items.length > 0
                                                ? values.items.map((item, index) => {
                                                    return (
                                                            <TableRow key={index}>
                                                                <TableCell>{index + 1}</TableCell>
                                                                <TableCell>{item.itemName}</TableCell>
                                                                <TableCell>{item.itemPrice}</TableCell>
                                                                <TableCell>{item.itemCategory}</TableCell>
                                                                <TableCell>
                                                                    <IconButton size="small" edge="end"
                                                                                aria-label="delete">
                                                                        <DeleteIcon
                                                                            onClick={() => {
                                                                                arrayHelpers.remove(index)
                                                                                values.items.splice(index,1)
                                                                                countTotalAmount(values.items)
                                                                            }
                                                                      }/>
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                    )
                                                })
                                                : (
                                                <TableRow>
                                                   <TableCell className="form-items-list__no-items-message" colSpan={5} align="center">
                                                         Brak dodanych przedmiotów
                                                   </TableCell>
                                                </TableRow>
                                                )
                                            }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            )}
                        />
                        <div className="receipt-form__summary">
                            <span className="receipt-form__summary__total-amount">SUMA: {totalAmount} zł</span>
                            <div className="receipt-form__summary__submit-button">
                                <Button
                                    disabled={Object.values(values).filter(el => el.toString().length === 0).length > 0}
                                    variant="outlined" type="submit" onClick={() => {
                                    console.log(Object.values(values).filter(el => el.toString().length === 0).length > 0)
                                }}>
                                    Dodaj paragon
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewReceiptForm;
