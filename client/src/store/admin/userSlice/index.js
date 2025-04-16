import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async () => {
        const response = await axios.get(`${URL}/api/admin/users/details`);
        return response.data;  // Return the data directly
    }
);



const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

const AdminUserDetailsSlice = createSlice({
    name: 'adminUserDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;  // Reset any previous errors
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data || action.payload; // Handle potential nested data
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message; // Store the error message
            });
    },
});

export default AdminUserDetailsSlice.reducer;
