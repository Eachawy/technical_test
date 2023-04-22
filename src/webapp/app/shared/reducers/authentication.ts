import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'app/config/store';
import { AUTHORITIES } from 'app/config/constants';


export const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    showLogin: false,
    account: {} as any,
    errorMessage: null as unknown as string, // Errors returned from server side
    redirectMessage: null as unknown as string,
    sessionHasBeenFetched: false,
    logoutUrl: null as unknown as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Actions

export const getAccount = createAsyncThunk('authentication/get_account', (user: string) => {
    let account = [AUTHORITIES.USER];
    if (user === "admin") {
        account = [AUTHORITIES.ADMIN, AUTHORITIES.USER]
    }
    return account;
});

interface IAuthParams {
    username: string;
    password: string;
}

export const authenticate = createAsyncThunk('authentication/login',
    async (auth: IAuthParams) => {
        let authenticated = false;
        (auth.username === 'admin' && auth.password === 'Ad@123456789') ? authenticated = true :
            (auth.username === 'user' && auth.password === 'Us@123456789') ? authenticated = true : authenticated = false;

        return authenticated;
    });

export const login: (username: string, password: string) => AppThunk =
    (username, password) =>
        async dispatch => {
            await dispatch(authenticate({ username, password }));
            await dispatch(getAccount(username));
        };


export const AuthenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState as AuthenticationState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(authenticate.rejected, (state, action) => ({
                ...initialState,
                errorMessage: action.error.message,
                showLogin: true,
            }))
            .addCase(authenticate.fulfilled, (state, action) => ({
                ...state,
                showLogin: false,
                isAuthenticated: action.payload,
                loginSuccess: true,
            }))
            .addCase(getAccount.rejected, (state, action) => ({
                ...state,
                showLogin: true,
            }))
            .addCase(getAccount.fulfilled, (state, action) => {
                return {
                    ...state,
                    account: action.payload,
                };
            });
    },
});

export default AuthenticationSlice.reducer;
