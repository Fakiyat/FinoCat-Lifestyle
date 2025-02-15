import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 599,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "men",
      brand: "FinoBasics",
      description: "Premium cotton t-shirt with a comfortable fit",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Black", "Navy"]
    },
    {
      id: 2,
      name: "Slim Fit Denim Jeans",
      price: 1299,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "men",
      brand: "FinoDenim",
      description: "Slim fit jeans with stretch comfort",
      sizes: ["30", "32", "34", "36"],
      colors: ["Blue", "Black"]
    },
    {
      id: 3,
      name: "Floral Summer Dress",
      price: 899,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "women",
      brand: "FinoFashion",
      description: "Beautiful floral print summer dress",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Pink Floral", "Blue Floral"]
    },
    {
      id: 4,
      name: "Athletic Running Shoes",
      price: 2499,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "sports",
      brand: "FinoSport",
      description: "Comfortable running shoes with great support",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["Black/Red", "Grey/Blue"]
    },
    {
      id: 5,
      name: "Kids Cartoon T-Shirt",
      price: 399,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1519278409-1f56tdca037f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "kids",
      brand: "FinoKids",
      description: "Fun cartoon print t-shirt for kids",
      sizes: ["2-3Y", "4-5Y", "6-7Y"],
      colors: ["Yellow", "Blue", "Red"]
    }
  ],
  filteredProducts: [],
  selectedCategory: 'all',
  loading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      if (category === 'all') {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          product => product.category === category
        );
      }
    },
    sortByPrice: (state, action) => {
      const sortOrder = action.payload; // 'asc' or 'desc'
      const products = state.filteredProducts.length > 0 
        ? state.filteredProducts 
        : state.products;
      
      if (sortOrder === 'asc') {
        products.sort((a, b) => a.price - b.price);
      } else {
        products.sort((a, b) => b.price - a.price);
      }
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
      );
    }
  }
});

export const { filterByCategory, sortByPrice, searchProducts } = productsSlice.actions;
export default productsSlice.reducer;
