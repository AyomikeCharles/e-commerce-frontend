import api from './api'
import { useQuery } from "react-query"

const categories = {
    

   async getCategories(){
            try{
                const response = await api.get('/categories')
                    return response.data;
            }catch(err){
                return Promise.reject(err);
                }
            },

    useGetCategories(){
        return useQuery("categories", this.getCategories, {retry:3})
    },






    async getOneCategory(id:string){
        try{
            const response = await api.get(`/categories/${id}`)
            return response.data;
        }catch(err){
            return err
        }
    },

    

        useGetOneCategory(Id:string){
            return useQuery(["category", Id], ()=>this.getOneCategory(Id), {retry:3})
        },






    async setCategories(formData:FormData){
                try{
                    const response = await api.post('/categories', formData)
                    return response.data;
                }catch(err){
                    return Promise.reject(err);
                }
        
    },



    async editCategories(id:string, formData:FormData){
        try{
            const response = await api.put(`/categories/${id}`, formData)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    }
}

export default categories
