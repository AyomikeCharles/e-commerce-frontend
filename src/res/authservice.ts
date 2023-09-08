import api from './api'
import TokenService from './tokenService';

const signup = async (formData:signUpForm) => {
    try{
        const response = await api.post('/users', formData)
        return response.data;
    }catch(err){
        return Promise.reject(err);
    }
}

//do for login
const login = async (formData:FormDataLogin) => {
    try{
        const response = await api.post('/users/login', formData)
        return response.data;
    }catch(err){
        return Promise.reject(err);
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