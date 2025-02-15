import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Container, Grid, Card, CardMedia, Typography, Button, Box } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Summer Collection 2025',
      subtitle: 'Discover the latest trends',
    },
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'New Arrivals',
      subtitle: 'Shop the latest fashion',
    },
    {
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Exclusive Deals',
      subtitle: 'Up to 50% off',
    },
  ];

  const categories = [
    {
      title: "Men's Fashion",
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '/products?category=men',
    },
    {
      title: "Women's Fashion",
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '/products?category=women',
    },
    {
      title: "Kids' Fashion",
      image: 'https://images.unsplash.com/photo-1543854589-eb6262b0dd36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      link: '/products?category=kids',
    },
  ];

  const trendingProducts = [
    {
      title: 'Summer Dress',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₹1,299',
    },
    {
      title: 'Casual Shirt',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₹899',
    },
    {
      title: 'Denim Jacket',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₹2,499',
    },
    {
      title: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: '₹3,999',
    },
  ];

  return (
    <div className="home">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-slider"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-content">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Typography variant="h2">{slide.title}</Typography>
                  <Typography variant="h5">{slide.subtitle}</Typography>
                  <Button variant="contained" color="primary" size="large">
                    Shop Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Container maxWidth="lg" className="categories-section">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" gutterBottom className="section-title">
            Shop by Category
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="category-card">
                    <CardMedia
                      component="img"
                      height="400"
                      image={category.image}
                      alt={category.title}
                    />
                    <div className="category-overlay">
                      <Typography variant="h5">{category.title}</Typography>
                      <Button variant="outlined" color="inherit" href={category.link}>
                        Explore
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      <Box className="trending-section">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" gutterBottom className="section-title">
              Trending Now
            </Typography>
            <Grid container spacing={3}>
              {trendingProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="trending-card">
                      <CardMedia
                        component="img"
                        height="300"
                        image={product.image}
                        alt={product.title}
                      />
                      <div className="trending-content">
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="subtitle1" color="primary">
                          {product.price}
                        </Typography>
                      </div>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
