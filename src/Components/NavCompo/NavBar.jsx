import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      {/* navigation bar */}
      <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
      <div className='container'>
        <Link to={'./'}><i className='navbar-brand fa fa-mobile text-warning'></i><span className='text-white'>Contact</span>  <span className='text-warning'>Manager</span></Link>
      </div>

      </nav>
    </div>
  );
}

export default NavBar;
