import { useContext, useEffect ,useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [buttonBump, setButtonBump] = useState(false);
    const ctx = useContext(CartContext);
    const {items} = ctx;
    const totalItemsCount = ctx.items.reduce((currAmount, item)=>{
        return currAmount + item.amount;
    }, 0);
    const dynamicClass = `${classes.button} ${buttonBump ? classes.bump:''}`;

    useEffect(()=>{
        if(items.length === 0) return;
        setButtonBump(true);

        let timer = setTimeout(()=>{
            setButtonBump(false);
        }, 300);

        return ()=>{
            clearInterval(timer);
        }
    } , [items])
    return (
        <button className={dynamicClass} onClick={props.onConfirmShow}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Cart</span>
           <span className={classes.badge}>{totalItemsCount}</span>
        </button>
    );
};

export default HeaderCartButton;