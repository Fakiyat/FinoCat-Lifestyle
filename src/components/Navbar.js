import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge,
  InputBase,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { totalQuantity } = useSelector((state) => state.cart);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <AppBar position="sticky" color="default" elevation={1} className="navbar">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" className="logo">
          FinoCAT
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/products?category=men" onClick={handleMenuClose}>
                Men
              </MenuItem>
              <MenuItem component={Link} to="/products?category=women" onClick={handleMenuClose}>
                Women
              </MenuItem>
              <MenuItem component={Link} to="/products?category=kids" onClick={handleMenuClose}>
                Kids
              </MenuItem>
              <MenuItem component={Link} to="/products?category=sports" onClick={handleMenuClose}>
                Sports
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div className="nav-links">
            <Button component={Link} to="/products?category=men" color="inherit">Men</Button>
            <Button component={Link} to="/products?category=women" color="inherit">Women</Button>
            <Button component={Link} to="/products?category=kids" color="inherit">Kids</Button>
            <Button component={Link} to="/products?category=sports" color="inherit">Sports</Button>
          </div>
        )}

        <Box component="form" className="search-box" onSubmit={handleSearch}>
          <SearchIcon className="search-icon" />
          <InputBase
            placeholder="Search for products, brands and more..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        <div className="nav-actions">
          <IconButton color="inherit">
            <PersonOutlineIcon />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
