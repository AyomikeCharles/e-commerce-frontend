import axios from "axios"
import TokenService from "./tokenService"


const instance = axios.create({
    withCredentials:true,
    baseURL:'https://e-comm-nrk8.onrender.com/api'/**http://localhost:8000/api  */
})

instance.interceptors.request.use(
 
    (config) => {
        const token = TokenService.getLocalAccessToken()

        if(token){
            config.headers["authorization"] = 'Bearer ' + token
        }
        
        return config;
        
    },
    (error)=>{
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (res) => {
        return res
    },
    async (err)=>{
        const originalConfig = err.config

        if (originalConfig.url !== "/users/login" && err.response){
            if(err.response.status === 401 && !originalConfig._retry){
                originalConfig._retry = true;
                
                try{
                    const rs = await instance.get('/refreshToken')
                    if(rs.status === 200 && typeof rs.data === 'string' /*do more checking*/) {
                        const newToken = rs.data
                        TokenService.setLocalAccessToken(newToken)
                    }else{
                        console.log(rs.data)
                    }



                    return instance(originalConfig)

                }catch(_error){
                    return Promise.reject(_error)
                }
            }
        }

        return Promise.reject(err)
    }
)

export default instance