import api from './api'
import { useQuery } from "react-query"

const users = {
    

   async getUsers(limit:number, skip:number, search:string){
            try{
                const response = await api.get(`/users/${limit}/${skip}/${search}`)
                    return response.data;
            }catch(err){
                
                return Promise.reject(err);
                }
            },

    useGetUsers(limit:number, skip:number, search:string){
        return useQuery(["users", skip, search], ()=>this.getUsers(limit, skip, search), {retry:3, keepPreviousData:true})
    },


    async getAdmins(){
        try{
            const response = await api.get(`/users/admin`)
                return response.data;
        }catch(err){
            
            return Promise.reject(err);
            }
        },

    useGetAdmins(){
        return useQuery("admins", ()=>this.getAdmins(), {retry:3})
    },






    async getOneUser(id:string){
        try{
            const response = await api.get(`/users/${id}`)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },

    

        useGetOneUser(Id:string){
            return useQuery([`user${Id}`, Id], ()=>this.getOneUser(Id), {retry:3})
        },




        async getOneAdmin(id:string){
            try{
                const response = await api.get(`/users/${id}`)
                return response.data;
            }catch(err){
                return Promise.reject(err);
            }
        },
    
        
    
            useGetOneAdmin(Id:string){
                return useQuery([`admin${Id}`, Id], ()=>this.getOneAdmin(Id), {retry:3})
            },
            



            

            async getUser(){
                try{
                    const response = await api.get(`/users/personal-profile`)
                   
                    return response.data;
                }catch(err){
                    return Promise.reject(err);
                }
            },
        
            
        
                useGetUser(){
                    return useQuery([`user`], ()=>this.getUser(), {retry:3})
                },






    async editUser(formData:object){
        try{
            const response = await api.put(`/users`, formData)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },

    async changePassword(info:object){
        try{
            const response = await api.put(`/users/change-password`, info)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },


    async blockUser(id:string, info:string){

        try{
            const response = await api.put(`/users/${id}`, {statusValue:info})
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },



    async changeRole(id:string, info:string){
      
        try{
            const response = await api.put(`/users/roleupdate/${id}`, {roleValue:info})
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },


    async verifyemail(info:object){

        console.log(info)
      
        try{
            const response = await api.put(`/users/verifyemail`, info)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },

    

    async forgetpassword(info:object){
      
        try{
            const response = await api.put(`/users/forgetpassword`, info)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },

    

    async changepassword(info:object){
      
        try{
            const response = await api.put(`/users/changepassword`, info)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },


}

export default users
