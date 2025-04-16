import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    searchResults: [],
};

const URL = import.meta.env.VITE_API_URL;


export const getSearchResults = createAsyncThunk(
    "/order/getSearchResults",
    async (keyword) => {
        const response = await axios.get(
            `${URL}/api/shop/search/${keyword}`
        );

        return response.data;
    }
);

const shoppingSearchSlice = createSlice({
    name: "shoppingSearchSlice",
    initialState,
    reducers: {
        resetSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(getSearchResults.rejected, (state) => {
                state.isLoading = false;
                state.searchResults = [];
            });
    },
});

export const { resetSearchResults } = shoppingSearchSlice.actions;

export default shoppingSearchSlice.reducer;
