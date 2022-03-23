import React, { useState} from 'react';
import Header from "./components/Layout/Header";
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider';

function App() {

  const [cartVisibility, setCartVisibility] = useState(false);

  const showCartHandler = props => {
    setCartVisibility(true);
  };
  const hideCartHandler = props => {
    setCartVisibility(false);
  };

  return (
    <CartProvider>
      {cartVisibility 
        && 
      <Cart 
      onConfirmHide = {hideCartHandler}
      />}
      <Header onConfirmShow = {showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
