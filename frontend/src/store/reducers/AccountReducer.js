import * as AccountActions from "../actions/AccountActions";

export const initialAccountState = {
    user: {
        name: 'Jasn',
        surname: 'Koalski',
        email: 'jan.kowalski@gmail.com'
    },
    authenticated: false,
};

function accountReducer(state= initialAccountState, action) {
    switch (action.type) {
        case AccountActions.SET_SESSION_ACTION: {
            return {
                ...state,
                authenticated: true,
            };
        }
        default:
            return state;
    }
}

export default accountReducer;