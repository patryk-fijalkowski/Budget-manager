import React from 'react';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import { configureStore } from "./store/ConfigureStore"
import { Provider } from "react-redux";
import {Button} from "react-bootstrap";

import * as AccountActions from "./store/actions/AccountActions";
const { store } = configureStore();

const handleClick = () => {
    store.dispatch({ type: AccountActions.SET_SESSION_ACTION })
}
function App() {
  return (
      <Provider store={store}>
        <Header/>
        <Navbar/>
          <Button onClick={handleClick}>Log in</Button>
        <Footer/>
      </Provider>
  );
}

export default App;
