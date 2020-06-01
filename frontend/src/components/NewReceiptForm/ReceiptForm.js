import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
import { FieldArray, Formik } from "formik";
import {
    TextField,
    Button,
    IconButton,
    InputAdornment,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { DatePickerField } from "./DatePickerField";
import { ReceiptValidationSchema } from "./ReceiptFormValidation";

const ReceiptForm = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [itemValues, setItemValues] = useState({
        itemName: "",
        itemPrice: "",
        itemCategory: "",
    });

    const clearInputs = () => {
        setItemValues({ itemName: "", itemPrice: "", itemCategory: "" });
    };

    const countTotalAmount = (values) => {
        let countedAmount = values.reduce((total, item) => total + item.itemPrice.replace(",", ".") * 1, 0);
        setTotalAmount(countedAmount);
    };

    const categories = [
        { title: "Artykuły spożywcze" },
        { title: "Kosmetyki" },
        { title: "Transport" },
        { title: "Mieszkanie" },
    ];

    const defaultProps = {
        options: categories,
        getOptionSelected: (option) => option.title,
    };

    return (
        <div className="receipt-form">
            <Formik
                initialValues={{
                    date: "",
                    recipeAmount: "",
                    shopName: "",
                    items: [],
                }}
                validationSchema={ReceiptValidationSchema}
                onSubmit={(values, { setValues, setSubmitting }) => {
                    const payload = { ...values, recipeAmount: totalAmount };
                    setValues(payload);
                    console.log(payload);
                    setSubmitting(false);
                }}>
                {({ errors, values, handleSubmit, handleChange, setValues, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
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
                            <DatePickerField className="form-header__input" name="date" error={errors} />
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
                                            onChange={(e) => setItemValues({ ...itemValues, itemName: e.target.value })}
                                            value={itemValues.itemName}
                                        />
                                        <TextField
                                            className="form-items-list__input"
                                            autoComplete="off"
                                            name="itemPrice"
                                            label="Cena"
                                            placeholder="Cena"
                                            type="number"
                                            onChange={(e) =>
                                                setItemValues({ ...itemValues, itemPrice: e.target.value })
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
                                            disableClearable={true}
                                            getOptionSelected={defaultProps.getOptionSelected}
                                            getOptionLabel={defaultProps.getOptionSelected}
                                            inputValue={itemValues.itemCategory}
                                            onChange={(e, value) =>
                                                setItemValues({
                                                    ...itemValues,
                                                    itemCategory: value.title,
                                                })
                                            }
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
                                            edge="end"
                                            aria-label="add-item"
                                            onClick={() => {
                                                clearInputs();
                                                arrayHelpers.push(itemValues);
                                                countTotalAmount([...values.items, itemValues], values);
                                                setFieldValue("totalAmount", totalAmount);
                                            }}>
                                            <AddIcon className="form-items-list__button__add-icon" />
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
                                                    <TableCell align="left" />
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {values.items && values.items.length > 0 ? (
                                                    values.items.map((item, index) => {
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell>{index + 1}</TableCell>
                                                                <TableCell>{item.itemName}</TableCell>
                                                                <TableCell>{item.itemPrice}</TableCell>
                                                                <TableCell>{item.itemCategory}</TableCell>
                                                                <TableCell>
                                                                    <IconButton
                                                                        size="small"
                                                                        edge="end"
                                                                        aria-label="delete"
                                                                        onClick={() => {
                                                                            arrayHelpers.remove(index);
                                                                            values.items.splice(index, 1);
                                                                            countTotalAmount(values.items);
                                                                        }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            className="form-items-list__no-items-message"
                                                            colSpan={5}
                                                            align="center">
                                                            Brak dodanych przedmiotów
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            )}
                        />
                        <div className="receipt-form__summary">
                            <span className="receipt-form__summary__total-amount">SUMA: {totalAmount} zł</span>
                            <div className="receipt-form__summary__submit-button">
                                <Button type="submit" variant="outlined">
                                    Dodaj paragon
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default ReceiptForm;
