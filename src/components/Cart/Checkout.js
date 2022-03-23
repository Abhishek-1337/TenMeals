import {useRef, useState} from 'react';
import classes from './Checkout.module.css';


const isEmpty = (value) => value.trim() === '';
const isPostalValid = (value) => value.length === 5;

const Checkout = props => {
    const [formValidity, setFormValidity] = useState({
        name:true,
        street:true,
        city:true,
        postal:true
    });

    const inputNameRef = useRef();
    const inputStreetRef = useRef();
    const inputPostalRef = useRef();
    const inputCityRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = inputNameRef.current.value;
        const enteredStreet = inputStreetRef.current.value;
        const enteredPostal = inputPostalRef.current.value;
        const enteredCity = inputCityRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isPostalValid(enteredPostal)

        const isFormValid = enteredNameIsValid 
        && enteredCityIsValid 
        && enteredPostalIsValid
        && enteredStreetIsValid;
        
        setFormValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postal:enteredPostalIsValid
        });

        if(!isFormValid){
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postal:enteredPostal
        });
    }

    const controlNameClasses = `${classes.control} ${!formValidity.name?classes.invalid:''}`;
    const controlStreetClasses = `${classes.control} ${!formValidity.name?classes.invalid:''}`;
    const controlPostalClasses = `${classes.control} ${!formValidity.name?classes.invalid:''}`;
    const controlCityClasses = `${classes.control} ${!formValidity.name?classes.invalid:''}`;
  
    return (
        <form onSubmit={confirmHandler}>
            <div className={classes.form}>
            <div className={controlNameClasses}>
                <label htmlFor="name">Name</label>
                <input type='text' id='name' ref={inputNameRef}/>
                {!formValidity.name && <p>Enter a valid name</p>}
            </div>
            <div className={controlStreetClasses}>
                <label htmlFor="street">Street</label>
                <input type='text' id='street' ref={inputStreetRef}/>
            </div>
            <div className={controlPostalClasses}>
                <label htmlFor="postal">Postal code</label>
                <input type='text' id='postal' ref={inputPostalRef}/>
            </div>
            <div className={controlCityClasses}>
                <label htmlFor="city">City</label>
                <input type='text' id='city' ref={inputCityRef}/>
            </div>
            </div>
            <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;