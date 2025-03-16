import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLocation } from "@/types/index";

const initialState: { locations: UserLocation[] } = {
    locations: [],
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocations: (state, action: PayloadAction<UserLocation[]>) => {
            state.locations = action.payload;
        },
    },
});

export const { setLocations } = locationSlice.actions;
export default locationSlice.reducer;
