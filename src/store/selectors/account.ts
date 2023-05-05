// store
import { RootState } from '../rootReducer';


export const getAccount = (state: RootState) => {
    return state.account;
}

export const getAccountEmail = (state: RootState) => {
    return state.account.email;
}

export const getAccountPassword = (state: RootState) => {
    return state.account.password;
}

export const getAccountAvatar = (state: RootState) => {
    return state.account.avatar;
}

export const getAccountIsLoggedIn = (state: RootState) => {
    return state.account.isLoggedIn;
}

export const getAccountFirstName = (state: RootState) => {
    return state.account.firstName;
}

export const getAccountLastName = (state: RootState) => {
    return state.account.lastName;
}