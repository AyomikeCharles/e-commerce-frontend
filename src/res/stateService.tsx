import api from './api'
import { useQuery } from "react-query"

const region = {
    

   async getStates(){
            try{
                const response = await api.get('/states')
                    return response.data;
            }catch(err){
            
                return Promise.reject(err);
                }
            },

    useGetStates(){
        return useQuery("states", this.getStates, {retry:3})
    },






        async getOneState(id:string){
            try{
                const response = await api.get(`/states/${id}`)
                return response.data;
            }catch(err){
                return err
            }
        },

    

        useGetOneState(Id:string){
            return useQuery(["state", Id], ()=>this.getOneState(Id), {retry:3})
        },






        async setState(formData:object){
                    try{
                        const response = await api.post('/states', formData)
                        return response.data;
                    }catch(err){
                        return Promise.reject(err);
                    }
            
        },



        async editState(id:string, formData:object){
            try{
                const response = await api.put(`/states/${id}`, formData)
                return response.data;
            }catch(err){
                return Promise.reject(err);
            }
        },


    async deleteState(id:string){
        try{
            const response = await api.delete(`/states/${id}`)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },



    //lga

    async getLgaByState(id:string){
        try{
            const response = await api.get(`/lga/${id}`)
            return response.data;
        }catch(err){
            return err
        }
    },



    useGetLgaByState(Id:string){
        return useQuery(["lga", Id], ()=>this.getLgaByState(Id), {retry:3})
    },




    async setLga(formData:object){
            try{
                const response = await api.post('/lga', formData)
                return response.data;
            }catch(err){
                return Promise.reject(err);
            }

    },



    async editLga(id:string, formData:object){
    try{
        const response = await api.put(`/lga/${id}`, formData)
        return response.data;
    }catch(err){
        return Promise.reject(err);
    }
    },




    
}

export default region
