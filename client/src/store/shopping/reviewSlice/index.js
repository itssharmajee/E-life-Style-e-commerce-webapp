import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: [],
};

const URL = import.meta.env.VITE_API_URL;

export const addReview = createAsyncThunk(
    "/order/addReview",
    async (formdata) => {
        const response = await axios.post(
            `${URL}/api/shop/review/add`,
            formdata
        );

        return response.data;
    }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
    const response = await axios.get(
        `${URL}/api/shop/review/${id}`
    );

    return response.data;
});

const productReviewSlice = createSlice({
    name: "productReviewSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })
            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            });
    },
});

export default productReviewSlice.reducer;
