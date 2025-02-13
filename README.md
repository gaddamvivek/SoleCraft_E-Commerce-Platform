Implemented, local storage, toast container, and minor logics for the implementation of the functionality, and at places for styling.

Used OpenAi, internet, for inventory data (item details).


# SoleCraft - eCommerce Shoe Store  

**Overview:**

SoleCraft is an eCommerce platform designed to provide a seamless shopping experience for footwear enthusiasts. The application offers a range of products, including sneakers, boots, flip-flops, and more. Customers can browse through products, filter by brand, price, and type, and easily add items to their cart or wishlist. The platform is built entirely on the frontend, using React.js, and utilizes MongoDB to persist cart and wishlist data. Used Database to store the product list and fetch data and post data from and to database.


## Features:

**Product Search and Filtering:** Users can search for products by name or description, and filter by categories such as shoe type, brand, and price range.
    
**Wishlist and Cart Functionality:** Users can add items to their wishlist or cart, with the ability to persist these actions across page reloads.
    
**Dynamic Product Listings:** Products are displayed dynamically with the ability to filter and sort according to user preferences.
    
**MongoDB Storage for Wishlist/Cart:** User wishlist and cart data are stored in the Database to maintain state between sessions.

**Wishlist and Cart:**
        
**Wishlist:** Users can add products to their wishlist and view them later and move item to cart. 
        
**Cart:** Users can add products to the cart. Items can be removed from the cart or the entire cart can be cleared.


## Tech Stack:
    
**Frontend:**
    
React.js for building user interfaces.
    
CSS for styling components.
    
React Hooks for managing state and side effects.
    
MongoDB for persisting cart and wishlist items across sessions.
    
Toast Container for indicating item present in wishlist or cart

## How to Use:
    
**Browse Products:** Navigate through the homepage to view the collection of shoes.
    
**Search/Filter:** Use the search bar and filters to find specific products.
    
**Add to Wishlist/Cart:** Hover over any product and add it to your wishlist or cart.
    
**Cart Management:** Users can view and manage the items in their cart.

**Installation Setup:**

**To run the Application:**

To Run Docker:

Go to the directory
    
build: `docker compose build`

then run: `docker compose up`
    
Deployed using AWS Cloud
