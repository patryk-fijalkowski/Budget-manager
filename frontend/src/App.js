import React, {useState} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {configureStore} from "./store/ConfigureStore"
import {Provider} from "react-redux";
import HomePage from "./pages/HomePage/HomePage";
import AllReceipts from "./pages/AllReceipts/AllReceipts";
import CreateReceipt from "./pages/CreateReceipt/CreateReceipt";
import Header from "./components/Header/Header";
import SideNav from "./components/SideNav/SideNav";
import Footer from "./components/Footer/Footer";
import './App.scss';
const {store} = configureStore();

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
    const [sideNavOpen, setSideNavOpen] = useState(false)
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header setSideNavOpen={setSideNavOpen} sideNavOpen={sideNavOpen} />
                <SideNav sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
                <main className="main">
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/createReceipt' component={CreateReceipt} />
                        <Route path='/allReceipts' component={AllReceipts} />
                    </Switch>
                </main >
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
