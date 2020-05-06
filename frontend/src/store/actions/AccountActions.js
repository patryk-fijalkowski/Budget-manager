export const SET_SESSION_ACTION = "account.setSession";

export function setSession() {
    return {
        type: SET_SESSION_ACTION,
        payload: {
            user:{
                name: 'Jan Inny'
            }
        },
    };
}
