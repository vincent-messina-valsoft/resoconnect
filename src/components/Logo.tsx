import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M20 20H40V80H20V20Z" fill="currentColor"/>
        <path d="M45 20H80V40H60V50H80C80 50 80 80 80 80H45V60H65V50H45V20Z" fill="currentColor"/>
      </svg>
    </div>
  );
};

export default Logo;