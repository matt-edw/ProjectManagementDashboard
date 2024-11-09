import React, {useState} from "react";
import './RegisterProduct.css';
import {ProductCategoryMap} from "../../models/ProductCategoryMap";

function RegisterProduct() {
const [ProductCode, setProductCode] = useState("");
const [Category, setCategory] = useState("");
const [Name, setName] = useState("");
const [Price, setPrice] = useState("");
const [StockQuantity, setStockQuantity] = useState("");

const productCategoryMap = ProductCategoryMap;

const handleSubmit = async (event) => {
    event.preventDefault();

    const product = {
        ProductCode,
        Name,
        Category: parseInt(Category),
        Price: parseFloat(Price),
        StockQuantity: parseInt(StockQuantity, 10),
    };

    const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product),
    });

    response?.ok
      ? alert("Product Successfully Registered!")
      : alert("Error Registering product. Please try again.");
};

return (
    <div>
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Product Code:
                    <input type="text" value={ProductCode} required
                        onChange={(e) => setProductCode(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Category:
                    <select value={Category} required onChange={(e) => setCategory(e.target.value)}>
                        {productCategoryMap.map(productCategory => (
                          <option value={productCategory.value}>{productCategory.label}</option>
                        ))}
                    </select>
                </label>

            </div>
            <div>
                <label>
                    Name:
                    <input type="text" value={Name} required
                        onChange={(e) => setName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input type="number" step="0.01" value={Price} required
                        onChange={(e) => setPrice(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Stock Quantity:
                    <input type="number" value={StockQuantity} required
                        onChange={(e) => setStockQuantity(e.target.value)}/>
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
);
}

export default RegisterProduct;