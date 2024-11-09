import React, {useEffect, useState} from 'react';
import Table from "../table/Table";
import './ViewProducts.css';
import BarChart from "../BarChart/BarChart";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if(!response.ok) {
        alert("Unable to Load products! Please try again.");
        return;
      }

      const products = await response.json();

      products.forEach((product) => {
        const dateToFormat = new Date(product.dateAdded);
        product.dateAdded = dateToFormat.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      });

      setProducts(products);
      setLoading(false);
    };

    getProducts();
  }, []);

  if (!!loading) return <h1>Loading products...</h1>;

    return (
      <div>
        <h1>View Products</h1>
        <button onClick={(event) => setShowGraph(!showGraph)}>Toggle Table/Graph View</button>
        {showGraph && (<BarChart products={products}/>)}
        {!showGraph && (<Table products={products}/>)}
      </div>
    );
}

export default ViewProducts;