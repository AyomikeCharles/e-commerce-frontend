import api from './api'
import { FormData } from "../components/SignUp";
import { FormDataLogin } from '../components/Login';
import TokenService from './tokenService';

const signup = async (userData:FormData) => {
    const res = await api.post('/users', userData)
    

    if(res.data){
        TokenService.setUser(res.data)
        return res.data
    }
}

//do for login

const login = async (userData:FormDataLogin) => {
    const res = await api.post('/users/login', userData)

    if(res.data){
        TokenService.setUser(res.data)
        return res.data
    }
}
//do for logout
const logout = async () => {
    const res = await api.get('/logout')
    if(res.data){
        TokenService.removeUser()
        return res.data
    }
    console.log(res.data)

}

const authService = {
    signup,
    login,
    logout
}

export default authService