import {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    items:[],
    totalAmount: 0
};

const cartReducer = (state, action) =>{
     if(action.type === 'ADD'){
         let totalUpdatedAmounts = state.totalAmount + action.item.price * action.item.amount;

         const existingItemIndex = state.items.findIndex((item)=>{
             return item.id === action.item.id;
         });
         let updatedItem;
         let updatedItems;
         const existingCartItem = state.items[existingItemIndex];
         if(existingCartItem){
             updatedItem = {
                 ...existingCartItem,
                 amount: existingCartItem.amount + 1
             }
             updatedItems = [...state.items];
             updatedItems[existingItemIndex] = updatedItem;
         }
         else{
            updatedItems = state.items.concat(action.item);   
         }

         return {
                items: updatedItems,
                totalAmount : totalUpdatedAmounts
             };
     }
     
     if(action.type === 'DEL'){
         const existingItemIndex = state.items.findIndex((item)=>{
             return item.id === action.id;
         });
         const existingCartItem = state.items[existingItemIndex];

         const updatedTotalAmount = state.totalAmount - existingCartItem.price;
         let updatedItems;
         if(existingCartItem.amount !== 1){
             let updatedItem = {
                 ...existingCartItem,
                 amount :existingCartItem.amount-1
             };
             updatedItems = [...state.items];
             updatedItems[existingItemIndex] = updatedItem;
         }
         else{
             updatedItems = state.items.filter((item)=> item.id !== action.id);
         }
         return {
             items : updatedItems,
             totalAmount: Math.abs(updatedTotalAmount)
         }

     }

     if(action.type === 'CLEAR'){
         return defaultCartState;
     }

     return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    const removeItemHandler = (id) => {
        dispatchCartAction({type: 'DEL', id: id});
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }

    const cartContextValues = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    };
    
    return (
        <CartContext.Provider value={cartContextValues}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;