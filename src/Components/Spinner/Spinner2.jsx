import React from 'react';
import spinnerImg from '../../Assests/ImaGE/spinner1.gif'

 export const Spinner2 = () => {
  return (
    <div>
      {/* <h1>spinner</h1> */}
       <img src={spinnerImg} alt="spinner not found" className='d-block m-auto' style={{width:"200px"}}></img> 
    </div>
  );
}

export default Spinner2;