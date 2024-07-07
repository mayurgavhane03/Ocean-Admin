import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212]     text-white py-4">
      <div className=" mx-auto text-center px-4 lg:px-0">
        <div className=" flex justify-center items-center mt-2 mb-4">
          <a className="" href="/">
            <img
              className="h-[75px]"
              src="https://res.cloudinary.com/doi13tpyz/image/upload/v1717779649/mernproduct/f1i7sxm1drze7n3iybwz.png"
              alt="Logo"
            />
          </a>
        </div>
        <p className="mb-2 text-[20px]">
          Copyright © {currentYear}. Created With <span className="text-red-500">❤️  </span> By Ocean Of Movies Team <span className="text-red-500">❤️</span>
        </p>
        <div className="flex justify-center space-x-4 flex-wrap">
          <a href="#" className="hover:underline">Contact Us</a>
          <span>|</span>
          <a href="#" className="hover:underline">Request Us</a>
          <span>|</span>
          <a href="#" className="hover:underline">DMCA</a>
          <span>|</span>
          <a href="#" className="hover:underline">About Us</a>
          <span>|</span>
          <a href="#" className="hover:underline">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
