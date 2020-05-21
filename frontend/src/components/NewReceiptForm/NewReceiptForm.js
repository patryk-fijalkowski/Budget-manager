import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {Field, FieldArray, Formik, useFormik, FormikProps, useField, useFormikContext} from 'formik';
import {useTranslation} from "react-i18next";
import Form from "react-bootstrap/Form";
import {TextField} from "@material-ui/core";
import { Button } from "@material-ui/core";
import {generate} from 'shortid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const DatePickerField = ({ ...props }) => {
    const {setFieldValue} = useFormikContext();
    const [field] = useField(props);


    return (
        <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val)
            }}
            placeholderText="Data"
            autoComplete="off"
            customInput={<TextField variant="outlined" />}
        />
    )
}

const NewReceiptForm = () => {
    const {t} = useTranslation();
    const [itemValues, setItemValues] = useState({itemName: "", itemPrice: "", itemCategory: ""})

    const top100Films = [
        { title: 'Artykuły spożywcze' },
        { title: 'Kosmetyki' },
        { title: 'Transport' },
        { title: 'Mieszkanie'}
    ];
    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
    };
    return (
        <div>
            <h1>Friend List</h1>
            <Formik
                initialValues={{
                    date: null,
                    recipeAmount: null,
                    shopName: null,
                    items: [
                        {itemName: "Jajka", itemPrice: "22,99", itemCategory: "Artykuły spożywcze"},
                        {itemName: "Chleb", itemPrice: "1,99", itemCategory: "Artykuły spożywcze"},
                        {itemName: "Woda", itemPrice: "2,99", itemCategory: "Artykuły spożywcze"},
                        {itemName: "Szampon", itemPrice: "11,99", itemCategory: "Kosmetyki"},
                    ]
                }}
                onSubmit={(values, actions) => {
                    console.log(values)
                }
                }
                render={({ values, handleSubmit, handleChange, handleReset, dirty, isSubmitting  }) => (
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            id="standard-full-width"
                            variant="outlined"
                            name='shopName'
                            placeholder='Nazwa sklepu'
                            type='text'
                            onChange={handleChange}
                        />
                        <DatePickerField name="date" />
                        <TextField
                            variant="outlined"
                            name='recipeAmount'
                            placeholder='Kwota całkowita PLN'
                            type='number'
                            onChange={handleChange}
                        />
                        <FieldArray
                            name="items"
                            render={arrayHelpers => (
                                <div>
                                    <TextField
                                        variant="outlined"
                                        name='itemName'
                                        placeholder="Nazwa produktu"
                                        type='text'
                                        onChange={(e) => setItemValues({...itemValues, itemName: e.target.value})}
                                        value={itemValues.itemName}
                                    />
                                    <TextField
                                        variant="outlined"
                                        name='itemPrice'
                                        placeholder="Cena"
                                        type='number'
                                        onChange={(e) => setItemValues({...itemValues, itemPrice: e.target.value})}
                                        value={itemValues.itemPrice}
                                    />
                                    <Autocomplete
                                        {...defaultProps}
                                        id="clear-on-blur"
                                        clearOnBlur={false}
                                        fullWidth={false}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Kategoria"
                                            name='itemCategory'
                                            placeholder="Kategoria"
                                            type='test'
                                            onChange={(e) => setItemValues({...itemValues, itemCategory: e.target.value})}
                                            value={itemValues.itemCategory}
                                            />
                                        )}
                                    />

                                    <Button variant="outlined" type='button' onClick={()=> {
                                        setItemValues({itemName: "", itemPrice: "", itemCategory: ""})
                                        arrayHelpers.push(itemValues)
                                    }}>
                                        Add item
                                    </Button>
                                    <List >
                                        {values.items && values.items.length > 0 ? values.items.map((item, index) => {

                                            return (
                                                <ListItem key={index} role={undefined} dense button onClick={(value) => console.log(value)}>
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
                                        }) : null}
                                    </List>
                                    {/*<ul>*/}
                                    {/*    {values.items && values.items.length > 0 ? (*/}
                                    {/*        values.items.map((item, index) => (*/}
                                    {/*        <li key={index}>{item.itemName + item.itemPrice + item.itemCategory}</li>*/}
                                    {/*        ))*/}
                                    {/*    ) : null}*/}
                                    {/*</ul>*/}

                                    <div>
                                        <Button variant="outlined" type="submit">Submit</Button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )}
            />
        </div>
    )
}


export default NewReceiptForm;