import flip1 from '../components/Assets/items/flipflop1.jpg';
import flip2 from '../components/Assets/items/flipflop2.jpg';
import flip3 from '../components/Assets/items/flipflop3.jpg';
import flip4 from '../components/Assets/items/flipflop4.jpg';
import airmax from '../components/Assets/items/airmax.jpg';
import adidas from '../components/Assets/items/adidas.jpg';
import adidas1 from '../components/Assets/items/adidas1.jpg';
import puma from '../components/Assets/items/puma.jpg';
import nb from '../components/Assets/items/nb.jpg';
import clk from '../components/Assets/items/clark.jpg';
import mrt from '../components/Assets/items/mrt.jpg';
import tim from '../components/Assets/items/tim.jpg';
import './inventory.css';

/* imported all images for the products */

const products = {
  "Flip Flops": [
    {
      id: 9,
      name: "Havaianas Flip Flops",
      description: "Havaianas Flip Flops are lightweight and comfortable for everyday wear.",
      price: 25.00,
      brand: "Havaianas", 
      type: "Flip Flops", 
      image: flip1
    },
    {
      id: 10,
      name: "Old Navy Flip Flops",
      description: "Old Navy Flip Flops offer comfort and style for summer outings.",
      price: 15.00,
      brand: "Old Navy", 
      type: "Flip Flops", 
      image: flip2
    },
    {
      id: 11,
      name: "Reef Fanning Flip Flops",
      description: "Reef Fanning Flip Flops feature a cushioned footbed and a bottle opener on the sole.",
      price: 35.00,
      brand: "Reef", 
      type: "Flip Flops", 
      image: flip3
    },
    {
      id: 12,
      name: "Crocs Classic Flip Flops",
      description: "Crocs Classic Flip Flops provide comfort with a soft, cushioned footbed.",
      price: 30.00,
      brand: "Crocs", 
      type: "Flip Flops", 
      image: flip4
    }
  ],
  "Sneakers": [
    {
      id: 1,
      name: "Air Max 270",
      description: "Nike Air Max 270 is designed for lifestyle and comfort, featuring a large Max Air unit.",
      price: 150.00,
      brand: "Nike", 
      type: "Sneakers", 
      image: airmax
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      description: "The Adidas Ultraboost features a responsive Boost midsole and a breathable Primeknit upper.",
      price: 180.00,
      brand: "Adidas", 
      type: "Sneakers", 
      image: adidas
    },
    {
      id: 3,
      name: "Skechers GOwalk",
      description: "Skechers GOwalk offers exceptional comfort and support for all-day wear.",
      price: 75.00,
      brand: "Skechers",
      type: "Sneakers", 
      image: adidas1
    },
    {
      id: 4,
      name: "Puma RS-X",
      description: "Puma RS-X combines retro style with modern comfort and technology.",
      price: 110.00,
      brand: "Puma", 
      type: "Sneakers", 
      image: puma
    },
    {
      id: 5,
      name: "New Balance 574",
      description: "New Balance 574 is a classic sneaker with premium materials and superior cushioning.",
      price: 85.00,
      brand: "New Balance", 
      type: "Sneakers", 
      image: nb
    }
  ],
  "Boots": [
    {
      id: 6,
      name: "Clarks Desert Boot",
      description: "The Clarks Desert Boot is a classic ankle boot made with premium suede for all-day comfort.",
      price: 120.00,
      brand: "Clarks", 
      type: "Boots", 
      image: clk
    },
    {
      id: 7,
      name: "Dr. Martens 1460",
      description: "Dr. Martens 1460 boots are known for their durable leather and air-cushioned soles.",
      price: 150.00,
      brand: "Dr. Martens", 
      type: "Boots", 
      image: mrt
    },
    {
      id: 8,
      name: "Timberland 6\" Premium Boot",
      description: "Timberland's classic 6\" Premium Boot offers waterproof protection and all-day comfort.",
      price: 200.00,
      brand: "Timberland", 
      type: "Boots", 
      image: tim
    }
  ]
};

/* Exporting product List */
export default products;
