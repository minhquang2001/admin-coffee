import React, { useEffect, useState, useRef } from 'react'
import ProductTable from '../components/table/product'
import axios from 'axios'
function Product() {
    const [data, setData] = useState([])
    // useEffect(() => {
    //     fetch('https://api-coffee-e8kl.onrender.com/api/product')
    //         .then(res => res.json())
    //         .then(data => {

    //             setData(data)
    //         })
    // }, [data])
    const deletePromiseRef = useRef(null)
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('https://api-coffee-e8kl.onrender.com/api/product')
          const data = await response.json()
          setData(data)
        }
    
        fetchData()
    
        return () => {
          if (deletePromiseRef.current) {
            deletePromiseRef.current.cancel()
          }
        }
      }, [])
    
      const handleDelete = (id) => {
        deletePromiseRef.current = axios.delete(`https://api-coffee-e8kl.onrender.com/api/product/${id}`)
          .then(() => {
            setData(data.filter(item => item._id !== id))
          })
          .catch(err => {
            console.log(err)
          })
      }

    return (
        <div>
            
            <h2 style={{paddingBottom: '12px'}}>All Products</h2>

            <ProductTable value={data} handleDelete={handleDelete} />

        </div>
    )
}

export default Product