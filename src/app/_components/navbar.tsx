'use client';

// components/Header.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import logo from './assets/logo.jpg';

const Navbar: React.FC = () => {
  return (
    <header className="flex h-16 items-center justify-between bg-[#F2FFC1] px-4 text-[#002B11]">
      <div className="flex items-center space-x-6">
        <Link href="/" className="font-bold hover:opacity-80">
            <Image
                src = {logo}
                width={45}
                height={45}    
                alt = "Switcheo Lab Logo"
            />  
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:opacity-80">
            Personal
          </Link>
          <Link href="/"className="hover:opacity-80">
            Business
          </Link>
          <Link href="/" className="hover:opacity-80">
            Platform
          </Link>
        </nav>
      </div>

      {/* Right section: Secondary nav */}
      <nav className="flex items-center space-x-4">
        <Link href="/" className="hover:opacity-80">
          Features
        </Link>
        <Link href="/" className="hover:opacity-80">
          Pricing
        </Link>
        <Link href="/" className="hover:opacity-80">
            Help
        </Link>
        <Link href="/login" className="hover:opacity-80">
          Log In
        </Link>
        <Link href="/register"className="rounded-full bg-[#9fcf13] px-4 py-2 font-bold text-[#002b0f] transition hover:opacity-80">
            Register
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
