import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../res/authservice";
import { FormData } from "../components/SignUp";
import { FormDataLogin } from "../components/Login";
import { AxiosError } from "axios";

export interface User {
    fullName:string,
    email:string,
    phoneNumber:string,
    whatsapp:string,
    status:string,
    accessToken:string
}

export interface Message {
    message:string,
    stack:string
}

interface LogOutMessage {
    message:string,
    stack?:string
}

interface InitialState  {
    user: User | null,
    isError:boolean,
    isLoading:boolean,
    isSuccess:boolean,
    logoutMessage:LogOutMessage | string,
    message: Message | string
}


const user = JSON.parse(localStorage.getItem('user') as string)

const initialState: InitialState = {
    user: user? user: null,
    isError:false,
    isLoading:false,
    isSuccess:false,
    logoutMessage:'',
    message: ''
}


export const signup = createAsyncThunk('auth/signup', async (user:FormData, thunkAPI)=>{
    try{
        return await authService.signup(user)
    }catch(err){
        const error = err as AxiosError;
        const message = error.response?.data as object
        return thunkAPI.rejectWithValue(message)
    }
})


export const login = createAsyncThunk('auth/login', async (user:FormDataLogin, thunkAPI)=>{
    try{
        return await authService.login(user)
    }catch(err){
        const error = err as AxiosError;
        const message = error.response?.data as object
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async (_:void, thunkAPI) =>{
        try{
            return await authService.logout()
        }catch(err){
            const error = err as AxiosError;
            const message = error.response?.data as object
            return thunkAPI.rejectWithValue(message)
        }
    
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset:(state)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            // state.user = null
            state.message = ''
            state.logoutMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signup.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(signup.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            
        })
        .addCase(signup.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload as Message
            state.user = null
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload as Message
            state.user = null
        })
        .addCase(logout.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(logout.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.user = null
            state.logoutMessage = action.payload
        })
        .addCase(logout.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.logoutMessage = action.payload as LogOutMessage
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer