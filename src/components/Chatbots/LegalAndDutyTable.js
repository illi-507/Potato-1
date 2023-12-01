import React, { useState } from 'react';

const ProductTable = ({ products }) => {
  const [overlayMessage, setOverlayMessage] = useState('');

  const handleRowClick = (importAllowed, importMessage) => {
    //if (importAllowed === 'Yes') {
      setOverlayMessage(importMessage);
   // }
  };

  return (
    <div>
      <table className="product-table"  >
        <thead>
          <tr>
            <th>Product Name</th>
            <th>If Import Allowed</th>
            <th>Duty</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => 

            {
               if(product.name.toLowerCase().includes('device name')) {
                return;
               }

             return <tr key={index} onClick={() => handleRowClick(product.importAllowed, product.importMessage)}>
              <td>{product.name}</td>
              <td className='import-allowed' style={{color:product.importAllowed==="Yes"?"green":"red"}}>{product.importAllowed}</td>
              <td>{product.duty}</td>
            </tr>
            }
          )}
        </tbody>
      </table>

      {overlayMessage && (
        <div className="overlay">
          <div className="yes-no-overlay-content">
            <span className="close" onClick={() => setOverlayMessage('')}>
              &times;
            </span>
            <p>{overlayMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
