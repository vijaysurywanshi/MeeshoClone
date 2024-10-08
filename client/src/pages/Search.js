import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'


function Search() {
    const [values] = useSearch();
    return (
        <Layout>
            <div className="container">

                <div className="text-center">

                    <h1>Search Result</h1>

                    <h6> {values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length} products`}</h6>
                    <div className="d-flex flex-wrap">
            {values?.results?.map((p) => (
              <div className="card m-2" style={{ width: '18rem' }} >
                <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id} `} className="card-img-top ms-5" alt={p.name} style={{ height: '200px', width: '200px', objectFit: 'fit' }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">₹{p.price}</p>

                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1 ">Add To Cart</button>
                </div>
              </div>


            ))}
          </div>
                </div>

            </div>
        </Layout>
    )
}

export default Search
