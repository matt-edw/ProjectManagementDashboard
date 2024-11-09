import React, {useState} from "react";
import {TableHeadersMap} from "../../models/TableHeadersMap";

function Table({products})  {
  const [tableRows, setTableRows] = useState(products);
  const [sortColumn, setSortColumn] = useState("productCode");

  if (!products?.length) return <p>No Products Found in Database.</p>

  const headers = ["Product Code", "Name", "Category", "Price", "Stock Quantity", "Date Added"];

  const filterRows = (event) => {
    const filterValue = event.target.value;

    if(!filterValue){
      setTableRows(products);
      return;
    }

    const filteredTableRows = products
      .filter(product => [product.productCode, product.name]
        .join("")
        .toLowerCase()
        .includes(filterValue));
    setTableRows(filteredTableRows);
  }

  const sortRows = (event) => {
    const columnToSortBy = event.target.value;
    setSortColumn(columnToSortBy ?? "productCode");

    const sortedTableRows = tableRows.sort((a,b) => a[sortColumn] > b[sortColumn] ? 1 : -1);
    setTableRows(sortedTableRows);
  }

  return (
    <div>
      <div className="tableControls">
        <input type="text" placeholder="Filter" onChange={filterRows}/>
        <select onChange={(event) => sortRows(event)}>
          {TableHeadersMap.map((headerOption, index) => (
            <option value={headerOption.value} key={index}>
              Order By {headerOption.label}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            {headers.map(((header, index) => (<th key={index}>{header}</th>)))}
          </tr>
        </thead>
        <tbody>
        {tableRows.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((productDetail, columnIndex) => (
              <td key={columnIndex}>{productDetail}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>

      {!tableRows.length && (<p>Cannot find products</p>)}
    </div>
  );
}

export default Table;