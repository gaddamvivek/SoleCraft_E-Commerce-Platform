import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const FtchWshLst = async () => {
    const userId = localStorage.getItem('userId')
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist?userId=${userId}`);
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  // Call FtchWshLst on component mount
  useEffect(() => {
    FtchWshLst();
  }, []);

  const RmvWshlstHndl = async (item) => {
    const userId = localStorage.getItem('userId')
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${item.productId}`, {
      data: { userId }});
      FtchWshLst(); // Refresh the cart after deletion
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };


  const MveToCrt = async (product) => {
    const userId = localStorage.getItem('userId');
  
    try {
      // Attempt to fetch current cart item details for the user
      const existingCartItemResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${product.productId}?userId=${userId}`);
      const existingCartItem = existingCartItemResponse.data;
  
      if (existingCartItem) {
        // If the item already exists in the cart, just remove it from the wishlist
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${product.productId}`, {
          data: { userId },
        });
        FtchWshLst(); // Refresh the wishlist
        toast.info('Item already in cart, removed from wishlist.');
      } else {
        // If the item does not exist in the cart, add new entry
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
          userId,
          productId: product.productId,
          name: product.name,
          description: product.description,
          price: product.price,
          brand: product.brand,
          type: product.type,
          image: product.image,
          quantity: 1, // Default quantity
        });
        toast.success('Item added to cart!');
  
        // Remove the item from the wishlist after adding to the cart
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist/${product.productId}`, {
          data: { userId },
        });
        FtchWshLst(); // Refresh the wishlist
        toast.info('Item removed from wishlist.');
      }
  
    } catch (error) {
      console.error('Error processing cart/wishlist operation:', error);
      toast.error('Failed to move item from wishlist to cart.');
    }
  };
  
  
  
  
  
  

  return (
    <div className="wishlist">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="prdctGrd">
          {wishlist.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} className="prdcyImg" loading="lazy" />
              <div className="prdctDetail">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <div className="button-group">
                  {/* Button to move the item to the cart */}
                  <button onClick={() => MveToCrt(item)}>Move to Cart</button>

                  {/* Button to remove the item from the wishlist */}
                  <button className="remove-button" onClick={() => RmvWshlstHndl(item)}>Remove from Wishlist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;



