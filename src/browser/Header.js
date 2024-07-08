// src/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
    const [isHovering, setHovering] = useState(0);


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest('.menu-button')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', closeDropdown);
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className="top-bar">
        <div>
            <div className="title">Code Terrarium</div>
        </div>
        <div className='sidemenu'>
            <div className='class'>Planner</div>
            <div className='class'>Git</div>
            <div className='class'>Help</div>
            <div className='class'>MyPage</div>

        </div>
    </div>
  );
}

export default Header;
