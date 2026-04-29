import React from 'react';
import Image from 'next/image';

const SmatPayLogo = ({ className = "h-14" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image 
        src="/smatpay.png" 
        alt="SmatPay Logo" 
        width={200} 
        height={56} 
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  );
};

export default SmatPayLogo;
