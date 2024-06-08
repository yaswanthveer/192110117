import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    TextField,
    Button,
    InputLabel,
    FormControl
} from '@mui/material';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ category: '', company: '', rating: 0, minPrice: 0, maxPrice: 1000, availability: '' });
    const [sortedBy, setSortedBy] = useState('price');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const register = async () => {
            await axios.post('http://example.com/register');
            fetchProducts();
        };
        register();
    }, [page]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://example.com/products?page=${page}`);
            const products = response.data.map(product => ({
                ...product,
                id: `${product.company}-${product.category}-${product.name.replace(/\s+/g, '-')}`,
            }));
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSortChange = (e) => {
        setSortedBy(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const filteredProducts = products
        .filter(product => 
            (filters.category ? product.category === filters.category : true) &&
            (filters.company ? product.company === filters.company : true) &&
            (filters.rating ? product.rating >= filters.rating : true) &&
            (filters.minPrice ? product.price >= filters.minPrice : true) &&
            (filters.maxPrice ? product.price <= filters.maxPrice : true) &&
            (filters.availability ? product.availability === filters.availability : true)
        )
        .sort((a, b) => {
            switch (sortedBy) {
                case 'price':
                    return a.price - b.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'discount':
                    return b.discount - a.discount;
                default:
                    return 0;
            }
        });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>All Products</Typography>
            <Grid container spacing={3}>
                {/* Filters */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select name="category" value={filters.category} onChange={handleFilterChange}>
                            <MenuItem value="">All Categories</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="fashion">Fashion</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Company</InputLabel>
                        <Select name="company" value={filters.company} onChange={handleFilterChange}>
                            <MenuItem value="">All Companies</MenuItem>
                            <MenuItem value="company1">Company 1</MenuItem>
                            <MenuItem value="company2">Company 2</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth name="rating" type="number" value={filters.rating} onChange={handleFilterChange} label="Min Rating" />
                    <TextField fullWidth name="minPrice" type="number" value={filters.minPrice} onChange={handleFilterChange} label="Min Price" />
                    <TextField fullWidth name="maxPrice" type="number" value={filters.maxPrice} onChange={handleFilterChange} label="Max Price" />
                    <FormControl fullWidth>
                        <InputLabel>Availability</InputLabel>
                        <Select name="availability" value={filters.availability} onChange={handleFilterChange}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="inStock">In Stock</MenuItem>
                            <MenuItem value="outOfStock">Out of Stock</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select value={sortedBy} onChange={handleSortChange}>
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="rating">Rating</MenuItem>
                            <MenuItem value="discount">Discount</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* Products */}
                {filteredProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography>Company: {product.company}</Typography>
                                <Typography>Category: {product.category}</Typography>
                                <Typography>Price: ${product.price}</Typography>
                                <Typography>Rating: {product.rating}</Typography>
                                <Typography>Discount: {product.discount}%</Typography>
                                <Typography>Availability: {product.availability}</Typography>
                                <Link to={`/product/${product.id}`}>View Details</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {/* Pagination */}
                <Grid item xs={12}>
                    <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</Button>
                    <Button onClick={() => handlePageChange(page + 1)}>Next</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AllProducts;
