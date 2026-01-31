import { createSlice} from "@reduxjs/toolkit";

const ProductSlice=createSlice({
    name:`product`,
    initialState:{
        products:[],
        cart:[],
        addresses:[],
        selectedAddress:null,//currebty choosen address
    },
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
        },
        setCart:(state,action)=>{
            state.cart=action.payload
        },

        ////Address management
        addAddress:(state,action)=>{
            if(!state.addresses) state.addresses=[];
            state.addresses.push(action.payload)
        },
        setSelectedAddress:(state,action)=>{
            state.selectedAddress=(action.payload)
        },
        deleteAddress:(state,action)=>{
            state.addresses=state.addresses.filter((_,index)=>
            index!==action.payload)
            //reset selected address>>> if it was deleted
            if(state.selectedAddress===action.payload){
                state.selectedAddress=null
            }
        },

    }
})

export const{setProducts,setCart,addAddress,deleteAddress,setSelectedAddress}=ProductSlice.actions
export default ProductSlice.reducer