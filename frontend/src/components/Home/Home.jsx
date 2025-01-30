import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import bgImage from '../Assets/bg2.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [hovrd, setHovrd] = useState(null);
  const [shoeTyp, setShoeTyp] = useState('All');
  const [brand, setBrand] = useState('All');
  const [prcRng, setPrcRng] = useState([0, 500]);
  const [srchTrm, setSrchTrm] = useState('');
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true); // For loading state
  // const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  // Fetch product data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      try {
        console.log(process.env.REACT_APP_API_BASE_URL);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        console.log("Fetched data:", response.data); // Log the data here
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error.response || error.message);
        // setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products. Please try again later.');
    }
    // finally {
    //     setLoading(false);
    //   }
    };

    fetchProducts();
  }, []);

  const FltrdPrdct = products.filter((product) => {
    const mtchTrm = product.name.toLowerCase().includes(srchTrm.toLowerCase()) || 
                    product.description.toLowerCase().includes(srchTrm.toLowerCase());

    const matchesType = shoeTyp === 'All' || product.type === shoeTyp;
    const mtchBrnd = brand === 'All' || product.brand.toLowerCase() === brand.toLowerCase();
    const mtchPrc = product.price >= prcRng[0] && product.price <= prcRng[1];

    return mtchTrm && matchesType && mtchBrnd && mtchPrc;
  });



const AddToWshLstActn = async (product) => {
 
  const logindata = localStorage.getItem('logindata');
  const userId = localStorage.getItem('userId')
  // console.log(username);
  if (!logindata) {
    // Redirect to login if not logged in
    alert('Please log in to add items to your wishlist.');
    navigate('/login');
    return;
  }

  try {
    // Send product name to the backend to add to wishlist in DB
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/wishlist`, {
        userId,
        productId: product.id,
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
      // If the response status is 409, it means the item is already in the wishlist
      toast.info('Item is already in the wishlist.');
    } else {
      // Handle other errors
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist in database');
    }
  }
};


  const AddToCrtActn = async (product) => {
    const logindata = localStorage.getItem('logindata');
    const userId = localStorage.getItem('userId')
    if (!logindata) {
      // Redirect to login if not logged in
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      // Send product details to the backend to add to cart in DB
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        userId,
        productId: product.id, // Assuming `product.id` is available
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        type: product.type,
        image: product.image,
        quantity: 1, // Default quantity
      });
      toast.success(response.data.message || 'Item added to cart!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // If the response status is 409, it means the item is already in the cart
        toast.info('Item is already in the cart.');
      } else {
        // Handle other errors
        console.error('Error updating cart:', error);
        toast.error('Failed to update cart in database');
      }
    }
  };
  
  

  

  // The content on home page
  return (
    <div className="home">
      <div className="HomeMain" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="text-overlay">
          <h1>Welcome to Our Shoe Collection</h1>
          <p>Find the perfect pair for every occasion.</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filters">
        <label>
          Search:
          <input
            type="text"
            value={srchTrm}
            onChange={(e) => setSrchTrm(e.target.value)}
            placeholder="Search by name or description"
          />
        </label>

        {/* Shoe Type Dropdown */}
        <label>
          Shoe Type:
          <select value={shoeTyp} onChange={(e) => setShoeTyp(e.target.value)}>
            <option value="All">All</option>
            <option value="Flip Flops">Flip Flops</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Boots">Boots</option>
          </select>
        </label>

        {/* Brand Dropdown */}
        <label>
          Brand:
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="All">All</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Skechers">Skechers</option>
            <option value="Crocs">Crocs</option>
            <option value="Timberland">Timberland</option>
            <option value="Puma">Puma</option>
            <option value="Clarks">Clarks</option>
            <option value="New Balance">New Balance</option>
          </select>
        </label>

        {/* Price Range Filter */}
        <label>
          Price Range:
          <input
            type="range"
            min="0"
            max="500"
            value={prcRng[1]}
            onChange={(e) => setPrcRng([0, parseInt(e.target.value)])}
          />
          <span>${prcRng[0]} - ${prcRng[1]}</span>
        </label>
      </div>

      {/* Product List Section */}
      <div className="prdctLst">
        <div className="prdctGrd">
          {FltrdPrdct.length > 0 ? (
            FltrdPrdct.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onMouseEnter={() => setHovrd(product.id)}
                onMouseLeave={() => setHovrd(null)}
              >
                <img src={product.image} alt={product.name} className="prdcyImg" loading="lazy" />
                <div className="prdctDetail">
                  <h5>{product.name}</h5>
                  <p>{product.description}</p>
                  <p className='prc'>${product.price.toFixed(2)}</p>
                </div>

                {hovrd === product.id && (
                  <div className="button-group">
                    <button className="but" onClick={() => AddToWshLstActn(product)}>Add to Wishlist</button>
                    <button className="but" onClick={() => AddToCrtActn(product)}>Add to Cart</button>
                    <ToastContainer />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No products found matching your.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
