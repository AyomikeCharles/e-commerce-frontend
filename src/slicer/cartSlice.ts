import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Item {
        id:string, 
        price:number, 
        title:string, 
        description:string, 
        discountPercentage:number, 
        rating:number,
        brand:string, 
        images:string[], 
        stock:number,
        totalPrice:number,
        qty:number
  }
  

interface InitialState {
    items:Item[],
    totalQty:number,
    totalPrice:number
}

const initialState : InitialState = {
    items:[],
    totalQty:0,
    totalPrice:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state, action:PayloadAction<Item>)=>{
            //check if item in state array
            const theItem = state.items.find((val)=> val.id === action.payload.id)
            if(typeof theItem === 'undefined'){
                state.items.push(action.payload)
            }else{
                theItem.qty = theItem.qty + 1;     
            }

            //update total qty ans price
            let currentTotalQty = 0;
            let currentTotalPrice = 0;
            state.items.forEach((itm)=>{
                currentTotalQty += itm.qty;
                currentTotalPrice += (itm.qty * itm.price)-((itm.qty * itm.price) * (itm.discountPercentage / 100));
            })
            state.totalQty = currentTotalQty;
            state.totalPrice = currentTotalPrice;

        },
        removeFromCart:(state, action)=>{
            state.items = state.items.filter((val)=> val.id !== action.payload.id)

            //update total qty ans price
            let currentTotalQty = 0;
            let currentTotalPrice = 0;
            state.items.forEach((itm)=>{
                currentTotalQty += itm.qty;
                currentTotalPrice += (itm.qty * itm.price)-((itm.qty * itm.price) * (itm.discountPercentage / 100));
            })
            state.totalQty = currentTotalQty;
            state.totalPrice = currentTotalPrice;
        },

        ChangeCartItemQty:(state, action)=>{
            const theItem = state.items.find((val)=> val.id === action.payload.id)
            
            if(typeof theItem !== 'undefined'){
                if(action.payload.operation === 'increase'){
                    if(theItem.qty === theItem.stock){
                        //do something here
                    }else{
                        theItem.qty = theItem.qty + 1;
                    }
                }else{

                    if(theItem.qty === 1){
                        //do something here
                    }else{
                        theItem.qty = theItem.qty - 1;
                    }
                   
                }
            }

            //update total qty ans price
            let currentTotalQty = 0;
            let currentTotalPrice = 0;
            state.items.forEach((itm)=>{
                currentTotalQty += itm.qty;
                currentTotalPrice += (itm.qty * itm.price)-((itm.qty * itm.price) * (itm.discountPercentage / 100));
            })
            state.totalQty = currentTotalQty;
            state.totalPrice = currentTotalPrice;
        },
        emptyCart:(state)=>{
            state.items = [];
            state.totalPrice = 0;
            state.totalQty = 0;
        },
    }
})

export const { emptyCart, addToCart, removeFromCart, ChangeCartItemQty } = cartSlice.actions

export default cartSlice.reducer;