import { Data } from '../components/utils/Products';
import api from './api'
import { useQuery } from "react-query"

const wishlist = {
    

   async getWishlist(user:string){
            try{
                const response = await api.get(`/wishlist/${user}`)
                    return response.data;
            }catch(err){
                return Promise.reject(err);
                }
            },

    useGetWishlist(user:string){
        return useQuery("wishlist", ()=>this.getWishlist(user), {retry:1})
    },







        async addWishlist(product:Data, user:string){
                    try{
                        const response = await api.post('/wishlist', {product, user})
                        return response.data;
                    }catch(err){
                        return Promise.reject(err);
                    }
            
        },


    async deleteWishlist(id:string, productid:string){
        try{
            const response = await api.put(`/wishlist/${id}`, {productid})
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },


    
}

export default wishlist
