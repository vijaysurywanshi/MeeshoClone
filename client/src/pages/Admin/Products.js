import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


function Products() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error.response.data); // This will show server-side error details
      alert(error.response?.data?.message || "Error updating product");
    }
    
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex  ">
          {products?.map((p) => (
            <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id}>

            <div className="card m-2" style={{ width: '18rem' }} >
              <img  src={`http://localhost:8080/api/v1/product/product-photo/${p._id} `}   className="card-img-top" alt={p.name} style={{ height: '200px', width: '200px', objectFit: 'fit' }} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
              </div>
            </div>
            </Link>

          ))}
            </div>


        </div>
      </div>
    </Layout> 
  )
}

export default Products
