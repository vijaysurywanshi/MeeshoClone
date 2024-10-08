import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CategoryProduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [category, setCategory] = useState({});
    const { slug } = useParams();  // <-- Use useParams to get the slug from the URL

    // Load products by category
    const productsByCategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${slug}`);
            setProducts(data.products);
            setCategory(data.category);  // <-- Correct this to match your response
        } catch (error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message || "Error loading products by category");
        }
    };

    useEffect(() => {
        productsByCategory();
    }, [slug]);  // <-- Add slug as a dependency

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="mb-4">{category?.name}</h2> {/* <-- Show category name */}
                    </div>
                </div>
                <div className="row">
                    {products?.map((product) => (
                        <div key={product._id} className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 text-center shadow-sm">
                                <img
                                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                                    className="card-img-top img-fluid p-3"
                                    style={{ height: "150px", objectFit: "fill" }}
                                    alt={product.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{product.name}</h5>
                                    <p className="card-text text-muted text-truncate">{product.description}</p>
                                    <p className="card-text ">₹ {product.price}</p>
                                    <button className="btn btn-primary btn-sm" onClick={() => navigate(`/product/${product.slug}`)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>

    );
}

export default CategoryProduct;
