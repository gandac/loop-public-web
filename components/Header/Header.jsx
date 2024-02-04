'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import HamburgerMenu from './HamburgerMenu';
import Navigation from './Navigation';
import styles from './header.module.css';

export default function Header({ allPages }) {
  const [mobileNavigationClass, setMobileNavigationClass] = useState('max-h-0');

  const onClickHamburger = () => {
    setMobileNavigationClass((val) => (val === 'max-h-0' ? 'max-h-40' : 'max-h-0'));
  };

  return (
    <header className="fixed top-0 w-full left:0 z-10 lg:relative">
      <div className="flex items-center justify-between flex-wrap bg-gray-50 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Logo />
        </div>
        <HamburgerMenu onClick={onClickHamburger} />
        <Navigation
          allPages={allPages}
          className={`${mobileNavigationClass} w-full lg:max-h-none overflow-hidden transition-all`}
        />
      </div>
    </header>
  );
}
