//Cart context
import { useContext, useState, createContext ,children, useEffect} from 'react'
const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  useEffect(() => {
      let existingCart = localStorage.getItem("cart");
      if (existingCart) {
          setCart(JSON.parse(existingCart));
      }
  }, []);
    return (<CartContext.Provider value={[cart, setCart]}>
        {children}
    </CartContext.Provider>)
}
//custom 
const useCart = () => useContext(CartContext);
export { CartProvider, useCart }