import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImageList: [],
};

const URL = import.meta.env.VITE_API_URL;

export const getFeatureImages = createAsyncThunk(
    "/order/getFeatureImages",
    async () => {
        const response = await axios.get(
            `${URL}/api/common/feature/get`
        );

        return response.data;
    }
);

export const addFeatureImage = createAsyncThunk(
    "/order/addFeatureImage",
    async (image) => {
        const response = await axios.post(
            `${URL}/api/common/feature/add`,
            { image }
        );

        return response.data;
    }
);

const commonFeatureSlice = createSlice({
    name: "commonFeatureSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
                state.featureImageList = [];
            });
    },
});

export default commonFeatureSlice.reducer;
