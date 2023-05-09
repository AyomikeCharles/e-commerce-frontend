import api from './api'
import { useQuery } from "react-query"

const sales = {


    async getSales(limit:number, skip:number, search:string){
        try{
            const response = await api.get(`/sales/${limit}/${skip}/${search}`)
                return response.data;
        }catch(err){
            
            return Promise.reject(err);
            }
        },

    useGetSales(limit:number, skip:number, search:string){
        return useQuery(["sales", skip, search], ()=>this.getSales(limit, skip, search), {retry:3, keepPreviousData:true})
    },



    async getCompleteSales(limit:number, skip:number, search:string){
        try{
            const response = await api.get(`/sales/completed/${limit}/${skip}/${search}`)
                return response.data;
        }catch(err){
            
            return Promise.reject(err);
            }
        },

        useGetCompleteSales(limit:number, skip:number, search:string){
        return useQuery(["completesales", skip, search], ()=>this.getCompleteSales(limit, skip, search), {retry:3, keepPreviousData:true})
    },






    async getOneSales(id:string){
        try{
            const response = await api.get(`/sales/${id}`)
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }
    },



    useGetOneSales(Id:string){
        return useQuery(["sales", Id], ()=>this.getOneSales(Id), {retry:3})
    },
    


    async setSales(formData:object){
                try{
                    const response = await api.post('/sales', formData)
                    return response.data;
                }catch(err){
                    return Promise.reject(err);
                }
        
    },

    async updateSalesStatus(id:string, data:string){
        try{
            const response = await api.put(`/sales/${id}`, {value:data})
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }

    },


    async updatepayment(data:string){
        try{
            const response = await api.put(`/sales`, {ref:data})
            return response.data;
        }catch(err){
            return Promise.reject(err);
        }

},




async getUserSales(limit:number, skip:number, search:string){
    try{
        const response = await api.get(`/sales/user/${limit}/${skip}/${search}`)
            return response.data;
    }catch(err){
        
        return Promise.reject(err);
        }
    },

useGetUserSales(limit:number, skip:number, search:string){
    return useQuery(["sales", skip, search], ()=>this.getUserSales(limit, skip, search), {retry:3, keepPreviousData:true})
},





async getUserCompleteSales(limit:number, skip:number, search:string){
    try{
        const response = await api.get(`/sales/user/completed/${limit}/${skip}/${search}`)
            return response.data;
    }catch(err){
        
        return Promise.reject(err);
        }
    },

    useGetUserCompleteSales(limit:number, skip:number, search:string){
    return useQuery(["completesales", skip, search], ()=>this.getUserCompleteSales(limit, skip, search), {retry:3, keepPreviousData:true})
},
    
}

export default sales
