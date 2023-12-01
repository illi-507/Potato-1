import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons'


function UploadSupplier({setInvokeChat1,setChat1UploadButton}) {
  return (
    <div className='section-item' onClick={()=>{setInvokeChat1(true);
      setChat1UploadButton(true);
    }}>
        <div className='seciton-item-icon'>
        <FontAwesomeIcon icon={faHeadset} style={{color: "#80DEEA",fontSize:"50px"}} />
   
        </div>
        <div>Upload Supplier</div>
        </div>
  )
}

export default UploadSupplier