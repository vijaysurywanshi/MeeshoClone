import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function ProductDetails() {
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])


    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    //similar products
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async () => {

        const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);

        setProduct(data.product);
        getSimilarProducts(data.product._id, data.product.category._id)
    }
    return (
        <Layout>

            <div className="row container product-details">
                <div className="col-md-6">
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} style={{ height: '400px', width: '400px', objectFit: 'fit' }} className="card-img-top" alt={product.name} />

                </div>
                <div className="col-md-6">
                    <h1 className="text-center">Product Details</h1>
                    <h4>Name: {product.name}</h4>
                    <h4>Category: {product.category?.name}</h4>
                    <h4>Description: {product.description}</h4>
                    <h4>Price: ₹ {product.price}</h4>
                    <button className="btn btn-secondary ms-1 ">Add to Cart</button>
                </div>
            </div>
            {/* //similar products */}
            <div className="row mt-4">
                <div className="col-md-12">
                    <h4 className="text-center mb-4">Similar Products</h4>
                    <div className="row justify-content-start m-4">
                        {relatedProducts?.map((p) => (
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex" key={p._id}> 
                                <div className="card h-100 shadow-sm" style={{ width: '100%' }}>
                                    <img
                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top img-fluid"
                                        alt={p.name}
                                    />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h6 className="card-title text-center">{p.name}</h6>
                                        <p className="card-text text-muted small">{p.description.substring(0, 35)}...</p> 
                                        <p className="card-text  fw-bold text-center"> ₹ {p.price}</p>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-primary btn-sm" onClick={() => navigate(`/product/${p.slug}`)}>Details</button>
                                            <button className="btn btn-secondary btn-sm">Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>




        </Layout>
    )
}

export default ProductDetails
