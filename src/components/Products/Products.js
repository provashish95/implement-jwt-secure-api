import React, { useState, useEffect } from 'react';
import Product from '../Prodduct/Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, []);

    return (
        <div className='container'>
            <h4 className='text-center text-info mt-3'>Products</h4>
            <div className="row">
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;