import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
    data: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setWeather, setLoading, setError } =
    weatherSlice.actions;
export default weatherSlice.reducer;