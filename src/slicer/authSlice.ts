import { createSlice } from "@reduxjs/toolkit";

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




const user = JSON.parse(localStorage.getItem('user') as string)

const initialState = {
    isAuthenticated: user?user.isAuthenticated:false,
    token: user?user.token:null,
}



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            localStorage.setItem('user', JSON.stringify(state))
          },
        logout: (state) => { 
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('user')
          },
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer