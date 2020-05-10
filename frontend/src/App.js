import React, {useEffect, useState} from 'react';
import Layout from './components/layout'

import { configureStore } from "./store/ConfigureStore"
import { Provider } from "react-redux";
import {Button} from "react-bootstrap";
import { axiosInstance } from './services/AxiosInstance'
import * as AccountActions from "./store/actions/AccountActions";
const { store } = configureStore();

// const handleClick = () => {
//     store.dispatch({ type: AccountActions.SET_SESSION_ACTION })
// }
function App() {
    // const useAxios = () => {
    //     const [data, setData] = useState([])
    //     const [search, setSearch] = useState('redux');
    //     const [isLoading, setIsLoading] = useState(false);
    //     const [isError, setIsError] = useState(false);
    //
    //     useEffect(() => {
    //         const fetchData = async () => {
    //             setIsError(false);
    //             setIsLoading(true);
    //             try{
    //                 const result = await axiosInstance.request({
    //                     url: '/',
    //                     method: 'GET'
    //                 })
    //                 setData(result.data)
    //                 console.log(result.data, query, data[0].id)
    //             } catch (error){
    //                 setIsError(true);
    //             }
    //
    //             setIsLoading(false);
    //
    //         }
    //         fetchData();
    //     }, [search])
    //
    //     return [{ data, isLoading, isError}, setSearch];
    // }
    //
    // const [{ data, isLoading, isError }, setSearch] = useAxios();
    // const [query, setQuery] = useState('redux');
  return (
      <Provider store={store}>
       <Layout/>
      </Provider>
  );
}

export default App;
