import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import { configureStore } from "./store/ConfigureStore"
import { Provider } from "react-redux";
import {Button} from "react-bootstrap";
import { axiosInstance } from './services/AxiosInstance'
import * as AccountActions from "./store/actions/AccountActions";
const { store } = configureStore();

const handleClick = () => {
    store.dispatch({ type: AccountActions.SET_SESSION_ACTION })
}
function App() {
    const useAxios = () => {
        const [data, setData] = useState([])
        const [search, setSearch] = useState('redux');
        const [isLoading, setIsLoading] = useState(false);
        const [isError, setIsError] = useState(false);

        useEffect(() => {
            const fetchData = async () => {
                setIsError(false);
                setIsLoading(true);
                try{
                    const result = await axiosInstance.request({
                        url: '/',
                        method: 'GET'
                    })
                    setData(result.data)
                    console.log(result.data, query, data[0].id)
                } catch (error){
                    setIsError(true);
                }

                setIsLoading(false);

            }
            fetchData();
        }, [search])

        return [{ data, isLoading, isError}, setSearch];
    }

    const [{ data, isLoading, isError }, setSearch] = useAxios();
    const [query, setQuery] = useState('redux');
  return (
      <Provider store={store}>
        <Header/>
        <Navbar/>
          <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
          />
          <button type="button" onClick={() => setSearch(query)}>
              Search
          </button>
          <Button onClick={handleClick}>Log in</Button>
          {isLoading ? (
              <div>Loading ...</div>
          ) : (
            <ul>
            {data.map(el => (
                <li key={el.id}>{el.id}  {el.first_name}</li>
            ))}
            </ul>
          )}
          {isError && <div>Something went wrong ...</div>}
        <Footer/>
      </Provider>
  );
}

export default App;
