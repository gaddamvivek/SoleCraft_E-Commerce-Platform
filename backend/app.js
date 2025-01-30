const Product = require('./models/Product'); 
const staticData = require('./resource/test.json');

// var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors'); 
const PORT = process.env.PORT || 5000;
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// New route imports
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const authRoutes = require('./routes/auth');

var app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')));
// Middleware setup
// app.use(logger('dev'));
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const uploadData = async() => {
  const products = await Product.find();
  if (products.length === 0) {
    staticData.forEach(async(product) => {
      const newProduct = new Product(product);
      await newProduct.save();
    })
  }
}
// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas')
  uploadData();
  
} )
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit the process on error
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/products', productRoutes); // Use the products route under /api/products
app.use('/api/cart', cartRoutes);         // Use the cart route under /api/cart
app.use('/api/auth', authRoutes);

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


module.exports = app;
