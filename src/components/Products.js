import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  LocalMall as BagIcon,
} from '@mui/icons-material';
import { filterByCategory, sortByPrice, searchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import './Products.css';

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, filteredProducts } = useSelector((state) => state.products);
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : products;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    if (categoryParam) {
      dispatch(filterByCategory(categoryParam));
      setSelectedFilters(prev => [...prev, categoryParam]);
    }

    if (searchParam) {
      setSearchTerm(searchParam);
      dispatch(searchProducts(searchParam));
    }
  }, [location, dispatch]);

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹500', value: 'under500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: 'Above ₹2000', value: 'above2000' },
  ];

  const filterOptions = [
    { label: 'Men', value: 'men', icon: '👔' },
    { label: 'Women', value: 'women', icon: '👗' },
    { label: 'Kids', value: 'kids', icon: '🧸' },
    { label: 'Sports', value: 'sports', icon: '⚽' },
    { label: 'New Arrivals', value: 'new', icon: '✨' },
    { label: 'Sale', value: 'sale', icon: '🏷️' },
  ];

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    dispatch(sortByPrice(event.target.value));
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(searchProducts(value));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleFilterClick = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
    dispatch(filterByCategory(filter));
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Container maxWidth="xl" className="products-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="filters-section"
      >
        <Box className="search-box">
          <SearchIcon className="search-icon" />
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            className="search-field"
            InputProps={{
              className: 'search-input'
            }}
          />
        </Box>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Stack direction="row" spacing={1} className="filter-chips">
            {filterOptions.map((filter) => (
              <Tooltip title={filter.label} key={filter.value}>
                <Button
                  variant={selectedFilters.includes(filter.value) ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleFilterClick(filter.value)}
                  className="filter-button"
                  startIcon={<span className="filter-icon">{filter.icon}</span>}
                >
                  {filter.label}
                </Button>
              </Tooltip>
            ))}
          </Stack>
        </motion.div>

        <Box className="advanced-filters">
          <FormControl className="filter-control">
            <InputLabel>Price Range</InputLabel>
            <Select
              value={priceRange}
              onChange={handlePriceRangeChange}
              className="custom-select"
            >
              {priceRanges.map((range) => (
                <MenuItem key={range.value} value={range.value}>
                  {range.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="filter-control">
            <InputLabel>Sort by Price</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              className="custom-select"
            >
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          <AnimatePresence>
            {displayedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <motion.div
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                >
                  <Card className="product-card">
                    <Box className="product-media-container">
                      <CardMedia
                        component="img"
                        height="300"
                        image={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <Box className="product-actions">
                        <IconButton
                          className="favorite-button"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          {favorites.includes(product.id) ? (
                            <FavoriteIcon className="favorite-icon active" />
                          ) : (
                            <FavoriteBorderIcon className="favorite-icon" />
                          )}
                        </IconButton>
                        <IconButton
                          className="cart-button"
                          onClick={() => handleAddToCart(product)}
                        >
                          <CartIcon />
                        </IconButton>
                      </Box>
                      {product.discount && (
                        <div className="discount-badge">
                          -{product.discount}%
                        </div>
                      )}
                    </Box>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" className="brand-name">
                        {product.brand}
                      </Typography>
                      <Typography variant="h6" className="product-name">
                        {product.name}
                      </Typography>
                      <Box className="rating-container">
                        <Rating value={product.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          ({product.reviews} reviews)
                        </Typography>
                      </Box>
                      <Box className="price-container">
                        <Typography variant="h6" color="primary" className="current-price">
                          ₹{product.price}
                        </Typography>
                        {product.originalPrice && (
                          <Typography variant="body2" color="text.secondary" className="original-price">
                            ₹{product.originalPrice}
                          </Typography>
                        )}
                      </Box>
                      {product.sizes && (
                        <Stack direction="row" spacing={1} className="product-sizes">
                          {product.sizes.map((size) => (
                            <Button
                              key={size}
                              variant="outlined"
                              size="small"
                              className="size-button"
                            >
                              {size}
                            </Button>
                          ))}
                        </Stack>
                      )}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                        className="quick-add"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                          startIcon={<BagIcon />}
                        >
                          Add to Bag
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Products;
