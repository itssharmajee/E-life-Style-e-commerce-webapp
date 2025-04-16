import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

const URL = import.meta.env.VITE_API_URL;

// User registration and saving the info to the backend

export const registerUser = createAsyncThunk(
    "/auth/register",
    async (FormData) => {
        const response = await axios.post(
            `${URL}/api/auth/register`,
            FormData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);

// User Login and checking info from the backend

export const loginUser = createAsyncThunk("/auth/login", async (FormData) => {
    const response = await axios.post(
        `${URL}/api/auth/login`,
        FormData,
        {
            withCredentials: true,
        }
    );
    return response.data;
});

// checking user authentication

export const checkAuthUser = createAsyncThunk("/auth/checkauth", async () => {
    const response = await axios.get(
        `${URL}/api/auth/check-auth`,
        {
            withCredentials: true,
            headers: {
                "Cache-Control":
                    "no-store, no-cache, must-revalidate, proxy-revalidate",
                Expires: "0",
            },
        }
    );
    return response.data;
});

// for logout 
export const logOutUser = createAsyncThunk("/auth/logout", async () => {
    const response = await axios.post(
        `${URL}/api/auth/logout`,{},
        {
            withCredentials: true,
        }
    );
    return response.data;
});



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                // for registration
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                // for login
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload); // Log the payload to inspect its structure
                state.isLoading = false;
                const { success, user } = action.payload;
                state.user = success ? user : null;
                state.isAuthenticated = success;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuthUser.pending, (state) => {
                // for checking user authentication
                state.isLoading = true;
            })
            .addCase(checkAuthUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const { success, user } = action.payload;
                state.user = success ? user : null;
                state.isAuthenticated = success;
            })
            .addCase(checkAuthUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
