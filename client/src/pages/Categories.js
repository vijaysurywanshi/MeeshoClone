import React, { useState, useEffect } from 'react'
import { useCategory } from '../hooks/useCategory'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

//All Categories page
function Categories() {
    const categories = useCategory()
  return (
    <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">All Categories</h1>
                    <br />
                    <br />
                </div>
            </div>
            <div className="row">
                {categories?.map((c) => (
                    <div className="col-md-4" key={c._id}>
                        <div className="card">
                            <div className="card-body">
                                <Link to={`/category/${c.slug}`} className="card-title">{c.name}</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories
