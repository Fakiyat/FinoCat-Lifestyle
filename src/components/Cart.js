import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Box,
  Divider,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart, removeFromCart, clearCart } from '../features/cartSlice';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const handleAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" className="cart-container empty-cart">
        <Card className="empty-cart-card">
          <CardContent>
            <ShoppingCartIcon className="empty-cart-icon" />
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Looks like you haven't added anything to your cart yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/products"
              className="continue-shopping-btn"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="cart-container">
      <Typography variant="h4" gutterBottom>
        Shopping Cart ({totalQuantity} items)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.id} className="cart-item">
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </Grid>
                <Grid item xs={8} sm={9}>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      ₹{item.price}
                    </Typography>
                    <Box className="cart-item-actions">
                      <div className="quantity-controls">
                        <IconButton 
                          size="small"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton 
                          size="small"
                          onClick={() => handleAddItem(item)}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <Typography variant="body1" className="item-total">
                        ₹{item.price * item.quantity}
                      </Typography>
                      <IconButton 
                        color="error"
                        onClick={() => {
                          for (let i = 0; i < item.quantity; i++) {
                            handleRemoveItem(item.id);
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
          
          <Box className="cart-actions">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="cart-summary">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider />
              <Box className="summary-details">
                <div className="summary-item">
                  <Typography>Subtotal:</Typography>
                  <Typography>₹{totalAmount}</Typography>
                </div>
                <div className="summary-item">
                  <Typography>Shipping:</Typography>
                  <Typography>Free</Typography>
                </div>
                {totalAmount >= 1999 && (
                  <Alert severity="success" className="free-shipping-alert">
                    You've got free shipping!
                  </Alert>
                )}
                <Divider />
                <div className="summary-item total">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">₹{totalAmount}</Typography>
                </div>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                size="large"
                className="checkout-btn"
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
