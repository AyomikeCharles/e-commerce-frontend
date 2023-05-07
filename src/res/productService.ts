import api from './api'
import { useQuery } from "react-query"

const products = {
    

   async getProducts(limit:number, skip:number){
            try{
                const response = await api.get(`/products/${limit}/${skip}`)
                    return response.data;
            }catch(err){
                
                return Promise.reject(err);
                }
            },

    useGetProducts(limit:number, skip:number){
        return useQuery(["products", skip], ()=>this.getProducts(limit, skip), {retry:3, keepPreviousData:true})
    },






    async getOneProduct(id:string){
        try{
            const response = await api.get(`/products/${id}`)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },

    

        useGetOneProduct(Id:string){
            return useQuery(["product", Id], ()=>this.getOneProduct(Id), {retry:3})
        },






    async setProduct(formData:FormData){
                try{
                    const response = await api.post('/products', formData)
                    return response.data;
                }catch(err){
                    return Promise.reject(err);
                }
        
    },

    async editProduct(id:string, formData:FormData){
        try{
            const response = await api.put(`/products/${id}`, formData)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },

    async deleteProduct(id:string){
        try{
            const response = await api.delete(`/products/${id}`)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },




    async getProductsByCat(id:string, limit:number, skip:number){
        try{
            const response = await api.get(`/products/category/${id}/${limit}/${skip}`)
                return response.data;
        }catch(err){
            
            return Promise.reject(err);
            }
        },

        useGetProductsByCat(id:string, limit:number, skip:number){
            return useQuery([`catProducts${id}`, skip], ()=>this.getProductsByCat(id, limit, skip), {retry:3, keepPreviousData:true})
        },




        async getProductsBySearch(limit:number, skip:number, search:string){
         
            try{
                const response = await api.get(`/products/search/${limit}/${skip}/${search}`)
                    return response.data;
            }catch(err){
                
                return Promise.reject(err);
                }
            },

    useGetProductsBySearch(limit:number, skip:number, search:string){
        return useQuery(["products", skip, search], ()=>this.getProductsBySearch(limit, skip, search), {retry:1, keepPreviousData:true})
    },




}

export default products
