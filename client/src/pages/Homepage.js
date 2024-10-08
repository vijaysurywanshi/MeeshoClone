import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import Advertise from '../components/layout/Advertise';

function Homepage() {

  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  //get all products
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  //filter by category
  const handlefilter = (value, id) => {
    let all = [...checked]

    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  };

  useEffect(() => {
    getAllCategory();
    getTotal()
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])

  //filter by 
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/product/product-filters', { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Layout>
      <Advertise />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-2">
            <h4 className="text-center mb-3">Filter By Category</h4>
            <div className="bg-light p-3 rounded shadow-sm">
              {categories?.map((c) => (
                <div className="form-check mb-2" key={c._id}>
                  <Checkbox key={c._id} onChange={(e) => handlefilter(e.target.checked, c._id)}>{c.name}</Checkbox>
                </div>
              ))}
              <h4 className="text-center mt-4 mb-3">Filter By Price</h4>
              <Radio.Group onChange={(e) => setRadio(e.target.value)} className="d-block mb-3">
                {Prices?.map((p) => (
                  <div key={p._id} className="form-check mb-2">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
              <div className="text-center">
                <button className="btn btn-danger w-100" onClick={() => window.location.reload()}>Clear Filter</button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap justify-content-start">
              {products?.map((p) => (
                <div className="card m-2 shadow-sm" style={{ width: '18rem' }} key={p._id}>
                  <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '200px', objectFit: 'contain' }} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text fw-bold">₹{p.price}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                      <button className="btn btn-secondary" onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); toast.success(`${p.name} added to cart`) }}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center my-4">
              {products && products.length < total && (
                <button className="btn btn-warning" onClick={(e) => { e.preventDefault(); setPage(page + 1); }}>
                  {loading ? 'Loading ...' : 'Load more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage
