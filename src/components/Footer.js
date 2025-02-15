import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              FinoCAT
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop destination for fashion and lifestyle products.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/cart">Cart</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <ul className="footer-links">
              <li><Link href="/products">Men's Fashion</Link></li>
              <li><Link href="/products">Women's Fashion</Link></li>
              <li><Link href="/products">Kids' Fashion</Link></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <ul className="footer-links">
              <li>Email: support@finocat.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Fashion Street, Style City</li>
            </ul>
          </Grid>
        </Grid>
        <div className="footer-bottom">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} FinoCAT. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
