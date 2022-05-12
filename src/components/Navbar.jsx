import React,{useState} from 'react'
import Logo from "./icon.png";
import {Link} from 'react-router-dom';
import Search from './Search';

function Navbar() {
  return (
    <div className='flex p-4 sticky w-full h-[12vh] space-x-2 text-white bg-black'>
        <img className=' md:m-4 md:h-[80px] h-[50px]' src={Logo} alt="" />
        <button className='font-bold italic md:text-4xl text-2xl'>MusicX</button>
        <Link to="/" className='flex'>
        <button className='md:ml-3 md:text-xl'>Home</button>
        </Link>
        <Link to="/favourite" className='flex'>
        <button className='md:ml-3 md:text-xl'>Favourites ❤</button>
        </Link>
    </div>
  )
}

export default Navbar