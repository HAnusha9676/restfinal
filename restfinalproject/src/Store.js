import { configureStore, createSlice } from '@reduxjs/toolkit';
const productSlice=createSlice({
    name:'products',
    initialState:{ veg:[
        {name:'tamato',price:200.5},
        {name:'potato',price:100.8},
    ],
nonVeg:[
    { name:'chicken',price:800.0},
    {name:'fish',price:1000.0},
],
},
reducers:{},
} );



// slice-2
const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const status=state.find(item=>item.name===action.payload.name);
            if(status){
            status.quantity+=1;
            }
            else{
                state.push({...action.payload,quantity:1});
            }
        },
       increment:(state,action)=>{
        const item=state.find(item=>item.name===action.payload.name);
        if(item){
            item.quantity+=1;
        }
       
       },
       decrement: (state, action) => {
        const item = state.find(item => item.name === action.payload.name);
        if (item&&item.quantity>1) {
                item.quantity -= 1; 
               // Decrease quantity if more than 1
            } else {
                return state.filter(item => item.name !== action.payload.name); // Remove if quantity is 1
            }
        },
        removeItem:(state,action)=>{
            return state.filter(item => item.name !== action.payload.name);

        }

    },
    
})


const Store=configureStore({
    reducer:
    {
        products:productSlice.reducer,
        cart:cartSlice.reducer,
    }
});


export const{addToCart,increment,decrement,removeItem}=cartSlice.actions;

export default Store;