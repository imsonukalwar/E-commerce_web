import { createSlice} from "@reduxjs/toolkit";

const ProductSlice=createSlice({
    name:`product`,
    initialState:{
        products:[],
        cart:[]
    },
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
        },
        setCart:(state,action)=>{
            state.cart=action.payload
        },
    }
})

export const{setProducts,setCart}=ProductSlice.actions
export default ProductSlice.reducer