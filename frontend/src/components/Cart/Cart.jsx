import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast if using react-toastify
import imageMap from '../../resource/imageMap';

/* To change quantity in the cart */
const QntBtn = ({ startQuant, qtyChangeAction }) => {
  const [quantity, setQuantity] = useState(startQuant);

  const increaseQuant = () => {
    const latestQty = quantity + 1;
    setQuantity(latestQty);
    qtyChangeAction(latestQty);  // This will call qtyChangeHandle in Cart
  };

  const decreaseQuant = () => {
    if (quantity > 1) {
      const latestQty = quantity - 1;
      setQuantity(latestQty);
      qtyChangeAction(latestQty);  // This will call qtyChangeHandle in Cart
    }
  };

  return (
    <div className="quantity">
      <button className="decrease" onClick={decreaseQuant}>-</button>
      <span className="quantity-display">{quantity}</span>
      <button className="increase" onClick={increaseQuant}>+</button>
    </div>
  );
};

/* Method for elements in the cart */
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [hovered, setHovered] = useState(null); 
  // const [wishlist, setWishlist] = useState([]); // Added wishlist state

  /* Use effect implementation */
  
  const fetchCart = async () => {
    const userId = localStorage.getItem('userId')
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart?userId=${userId}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

  useEffect(() => {  
    fetchCart();
  }, []);

  /* Use effect to calculate total */
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => {
      const itemPrice = item.price || 0;
      const itemQty = item.quantity || 0;
      return sum + (itemPrice * itemQty);
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  /* To handle change of quantity */
  const qtyChangeHandle = async (productId, latestQty) => {
    try {
      // Update local state first
      const updatedCart = cart.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: latestQty };
        }
        return item;
      });
      setCart(updatedCart);
  
      // Update quantity on the backend
      await axios.put(`/api/cart/${productId}`, {
        quantity: latestQty,
      });
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };
  
  


  const removeItemHandle = async (item) => {
    const userId = localStorage.getItem('userId')
    try {
      const productId = item.productId; // Access productId from the item object
      console.log('Product ID to remove:', productId); // Log for debugging
  
      if (!productId) {
        throw new Error('Product ID is undefined'); // Handle the case where productId is not defined
      }
  
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${productId}`, {
        data: { userId } // Attach the username to make the removal user-specific
      });
      fetchCart(); // Refresh the cart after deletion
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };
  
  

  /* Clear cart when needed */
  const cartClearHandle = async () => {
    const userId = localStorage.getItem('userId')
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        data: { userId } // Attach the username to make the removal user-specific
      });
      setCart([]);
      toast.success('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const MvToWshLst = async (product) => {
    const userId = localStorage.getItem('userId')
    try {
     
      // Attempt to add the product to the wishlist
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
        userId,
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        type: product.type,
        image: product.image,
      });
      toast.success(response.data.message || 'Item added to wishlist!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Item already exists in the wishlist, so remove it from the cart
        try {
          await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${product.productId}`, {
            data: { userId } // Attach the username to make the removal user-specific
          });
          fetchCart();
          toast.info('Item is already in the wishlist, removed from cart!');
        } catch (cartError) {
          console.error('Error removing item from cart:', cartError);
          toast.error('Failed to remove item from cart.');
        }
      } else {
        console.error('Error updating wishlist:', error);
        toast.error('Failed to update wishlist in database');
      }
    }
  };
  
  
  

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}   
                onMouseLeave={() => setHovered(null)}       
              >
                <img src={imageMap[item.productId] || item.image} alt={item.name} />
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <p className="product-price">${item.price.toFixed(2)}</p>
                <QntBtn
                  startQuant={item.quantity || 1}
                  qtyChangeAction={(latestQty) => qtyChangeHandle(item.productId, latestQty)}
                />
                {hovered === item.id && (
                  <div className="button-group">
                    <button className="remove-button" onClick={() => removeItemHandle(item)}>
                      Remove
                    </button>
                    <button className="wishlist-button" onClick={() => MvToWshLst(item)}>
                      Back to Wishlist
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="CrtTotl">
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>

          <button className="CrtClr" onClick={cartClearHandle}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

