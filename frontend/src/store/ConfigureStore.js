import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/RootReducer";

export function configureStore() {
    const preloadState = {
            user: {
                name: 'Jasn',
                surname: 'Koalski',
                email: 'jan.kowalski@gmail.com'
            },
            authenticated: false,
    };

    const store = createStore(
        rootReducer,
        preloadState,
        composeWithDevTools(),
    );

    return { store };
}
