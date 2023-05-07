import { User } from "../slicer/authSlice"

const TokenService =  {

    getLocalAccessToken():string{
        const user = JSON.parse(localStorage.getItem('user') as string)
        return user?.accessToken
    },

    setLocalAccessToken(token:string){
        const user = JSON.parse(localStorage.getItem('user') as string)
        user.accessToken = token
        localStorage.setItem('user', JSON.stringify(user))
    },

    getUser():User{
        return JSON.parse(localStorage.getItem('user') as string)
    },

    setUser(user:User){
        localStorage.setItem('user', JSON.stringify(user))
    },

    removeUser(){
        localStorage.removeItem('user')
    }

}

export default TokenService 