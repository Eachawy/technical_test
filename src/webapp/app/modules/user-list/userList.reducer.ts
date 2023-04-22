import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
    loading: false,
    usersList: [] as ReadonlyArray<IUser>,
    errorMessage: null
};

const apiUrl = 'https://jsonplaceholder.typicode.com';

interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    },
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}


export type UsersState = Readonly<typeof initialState>;

export const UsersSlice = createSlice({
    name: 'Users',
    initialState: initialState as UsersState,
    reducers: {
        reset() {
            return initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.usersList = action.payload.data;
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error.message;
            });
    },
});

export const { reset } = UsersSlice.actions;

// Async Actions
export const getUsers = createAsyncThunk(
    'users/fetch_users',
    async () => axios.get<IUser[]>(`${apiUrl}/users`),
    { serializeError: serializeAxiosError }
);

// Reducer
export default UsersSlice.reducer;