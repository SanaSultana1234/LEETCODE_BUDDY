import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
   <header>
    <div className='container'>
        <Link to="/">
            <h1>Leetcode Buddy</h1>
        </Link>
        <Link to="/create">
            <h1>Add</h1>
        </Link>
    </div>
   </header>
  )
}

export default Navbar;