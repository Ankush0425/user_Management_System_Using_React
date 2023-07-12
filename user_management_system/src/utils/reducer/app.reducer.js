import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../service/api";

const APP_REDUCER_NAME = "app-reducer-non-persisted"

const initialState = {
    users: [],
    editingUser: null,
    isLoading: false
}

export const addUser = createAsyncThunk(APP_REDUCER_NAME + "/addUser", async (user, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const { name = "", phone = "", email = "" } = user;
        if (name === "" || phone === "" || email === "") throw new Error("Invalid data provided!")

        const response = await axios.post(BASE_URL, { name, phone, email })

        if (!response.data) throw new Error("Refresh the page to see data!");
        
        return {
            type: "success",
            response: response.data.response
        };
    } catch (error) {
        return {
            type: "error",
            message: error.message ?? "Something went wrong!"
        }
    }
});

export const fetchAllUsers = createAsyncThunk(APP_REDUCER_NAME + "/fetchAllUsers", async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axios.get(BASE_URL);
        if (response.data === null) throw new Error("No data found!");
        
        return {
            type: "success",
            response: response.data.response
        };
    } catch (error) {
        return {
            type: "error",
            message: error.message
        };
    }
});

export const editUserById = createAsyncThunk(APP_REDUCER_NAME + "/editUserById", async (user, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const { name = "", phone = "", email = "" } = user;
        if (name === "" || phone === "" || email === "") throw new Error("Invalid data provided!")

        const response = await axios.put(`${BASE_URL}/${user._id}`, {name, phone, email});
        if(response.data === null) throw new Error("No data found!");

        return {
            type: "success",
            response: response.data.response
        };
    } catch (error) {
        return {
            type: "error",
            message: error.message
        };
    }
});

export const deleteUserById = createAsyncThunk(APP_REDUCER_NAME + "/deleteUserById", async (userId, thunkAPI) => {
    try {
        if (userId === "") throw new Error("Invalid data provided!")

        const response = await axios.delete(`${BASE_URL}/${userId}`);
        if (response.data === null) throw new Error("No data found!");

        return {
            type: "success",
            response: userId
        };
    } catch (error) {
        return {
            type: "error",
            message: error.message
        };
    }
});

export const fetchUserById = createAsyncThunk(APP_REDUCER_NAME + "/fetchUserById", async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        if (response.data === null) throw new Error("No data found!");
        
        return {
            type: "success",
            response: response.data.response
        };
    } catch (error) {
        console.log(error.message)
        return {
            type: "error",
            message: error.message
        };
    }
})

export const appReducer = createSlice({
    name: APP_REDUCER_NAME,
    initialState,
    reducers: {
        setLoading(state, { payload }) {
            return { ...state, isLoading: payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
            if (payload.type === "error") return {...state, isLoading: false};

            return {
                ...state,
                users: payload.response,
                isLoading: false
            }
        });
        builder.addCase(addUser.fulfilled, (state, { payload }) => {
            if (payload.type === "error") return {...state, isLoading: false};

            return {...state, isLoading: false, users: [...state.users, payload.response]};
        });
        builder.addCase(editUserById.fulfilled, (state, { payload }) => {
            if (payload.type === "error") return {...state, isLoading: false};

            return {
                ...state,
                isLoading: false,
                users: state.users.filter((user) => user._id === payload.response._id ? payload : user),
                editingUser: null
            }
        });
        builder.addCase(deleteUserById.fulfilled, (state, { payload }) => {
            if (payload.type === "error") return state;

            return {
                ...state,
                users: state.users.filter((user) => user._id !== payload.response)
            };
        });
        builder.addCase(fetchUserById.fulfilled, (state, { payload }) => {
            if (payload.type === "error") return { ...state, isLoading: false };

            return {
                ...state,
                isLoading: false,
                editingUser: payload.response
            }
        }) 
    }
});

export const { setLoading } = appReducer.actions;

export default appReducer.reducer;