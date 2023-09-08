import axios from "axios"
import TokenService from "./tokenService"

// //creating instance of axios
// const axiosInstance = axios.create({
//     withCredentials:true,
//     baseURL:'http://localhost:8000/api'/**https://e-comm-nrk8.onrender.com/api */
// })

// const useAxios = () =>{

//     axiosInstance.interceptors.request.use(
//         //this function add access token to every api call if access token is available
//         (config)=>{
//             let token = TokenService.getLocalAccessToken()
//             if(token){
//                 config.headers['authorization'] = 'Bearer ' + token
//             }else{
//                 //carry out logout function
//             }

//             return config
//         },
//         //this function is to handle error with request
//         (error)=>{
//             return Promise.reject(error)
//         });



//     axiosInstance.interceptors.response.use(
//         //this function is call on every successful response (2xx)
//         (response)=>{ return response},
//         //this function is call on every failed response (outside 200)
//         async (error)=>{
//             const originalConfig = error.config
//             //check if there is error and user is not trying to login or sign up
//             if((originalConfig !== '/users/login' && error.response) || (originalConfig !== '/users/signup' && error.response)){
//                 if(error.response.status === 401){
//                     try{
//                         const res = await axiosInstance.get('/refreshToken')
//                         if(res.status === 200 && typeof res.data === 'string' /*do more checking*/) {
//                             const newToken = res.data
//                             TokenService.setLocalAccessToken(newToken)
//                         }else{
//                             //logout
//                         }

//                         return axiosInstance(originalConfig)

//                     }catch(error){
//                         //logout user
//                     return Promise.reject(error)   

//                     }
//                 }else{
//                     return Promise.reject(error)   
//                 }
//             }
//             return Promise.reject(error)
//         }
//         )

// }

// export default useAxios





















const instance = axios.create({
    withCredentials:true,
    baseURL:'https://e-comm-nrk8.onrender.com/api'/**https://e-comm-nrk8.onrender.com/api */
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

instance.interceptors.response.use((res) => {return res}, async (err)=>{
        const originalConfig = err.config

        if (originalConfig.url !== "/users/login" && err.response){
            console.log(err.response)

            if(err.response.status === 401 && !originalConfig._retry){
                originalConfig._retry = true;
                console.log('hey')
                
                try{
                    const rs = await instance.get('/refreshToken')
                    if(rs.status === 200 && typeof rs.data === 'string' /*do more checking*/) {
                        const newToken = rs.data
                        TokenService.setLocalAccessToken(newToken)
                    }else{
                      //logout
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