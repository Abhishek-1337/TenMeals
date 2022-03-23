import {useState, useContext, Fragment} from 'react';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const ctx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);

    const hasItem = ctx.items.length > 0;
    
    const cartItemAddHandler = (item) => {
        ctx.addItem({...item, amount:1});
    };
    const cartItemRemoveHandler = (id) => {
        ctx.removeItem(id);
    };

    const onOrderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        try{
            setIsSubmitting(true);
            const response = await fetch('https://react-meals-2ea12-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:ctx.items
            })
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            setIsSubmitting(false);
            setDidSubmit(true);
            ctx.clearCart();
        }
        catch(error){
            console.log("Error in submitting the order");
        }
    };
    
    const cartItems = (
    <ul className={classes['cart-items']}>
        {
        ctx.items.map((item)=>(  
        <CartItem 
        key={item.id}
        name={item.name} 
        price={item.price} 
        amount = {item.amount}
        onAdd = {cartItemAddHandler.bind(null, item)}
        onRemove = {cartItemRemoveHandler.bind(null, item.id)}
        />
        ))}
    </ul>
    );

    
    
    const modalButtons = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onConfirmHide}>Close</button>
    {hasItem && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
    </div>

    const cartModal = (<Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`$${ctx.totalAmount.toFixed(2)}`}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onConfirmHide}/>}
            {!isCheckout && modalButtons}
    </Fragment>);
    
    const isSubmittingModal = (
        <p>Sending ordered data...</p>
    );

    const didSubmitModal = (
        <Fragment>
        <p>Successfully sent the orders</p>
        <div className={classes.actions}>
           <button className={classes['button--alt']} onClick={props.onConfirmHide}>Close</button>
        </div>
        </Fragment>
    )

    return (
        <Modal onConfirmHide = {props.onConfirmHide}>
            {!isSubmitting && !didSubmit && cartModal}
            {isSubmitting && isSubmittingModal}
            {didSubmit && !isSubmitting && didSubmitModal}
        </Modal>
    );
};

export default Cart;