import React from 'react';
import '../containers/Home.css';
const Spinner = () => {
  return (
    <div className='Pagina'>
      <div className='container loader'>
        <p className='fas fa-circle-notch fa-5x rotate-center'></p>
      </div>
    </div>
  );
};

export default Spinner;
