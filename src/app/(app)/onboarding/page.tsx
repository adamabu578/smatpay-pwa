"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Pay bills on the go",
    description: "Manage and pay your bills on the go, wherever and whenever you need.",
    image: "/wallet.gif",
  },
  {
    title: "Seamless transaction",
    description: "Experience effortless VTU and bill payments with SmatPay",
    image: "/credit-card.gif",
  },
  {
    title: "Secure & Reliable",
    description: "Your transactions are fully secured and encrypted for your peace of mind.",
    image: "/iPhone.png",
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1544] text-white flex justify-center w-full font-sans overflow-hidden">
      <div className="w-full max-w-md p-6 flex flex-col relative h-full min-h-screen pt-4">
        
        {/* Header - Skip Button */}
        <header className="flex justify-end mt-2 mb-4 z-10">
          <Link 
            href="/login" 
            className="text-white/90 hover:text-white transition-colors text-[16px] font-medium tracking-wide"
          >
            Skip
          </Link>
        </header>

        {/* Slider Content */}
        <div className="flex-1 relative w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col w-full h-full"
            >
              {/* Illustration */}
              <div className="flex-1 flex justify-center items-center py-2 relative">
                <div className="relative w-full max-w-[280px] aspect-square">
                  <Image 
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="mb-6 mt-4 text-center flex flex-col items-center">
                <h1 className="text-[26px] font-bold text-[#7C7AFF] mb-3 tracking-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-white text-[16px] leading-relaxed max-w-[300px]">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pb-6 z-10">
          {/* Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-6 bg-white" : "w-2 bg-gray-500"
                }`}
              ></div>
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="w-12 h-12 bg-[#7C7AFF] hover:bg-[#6664E6] rounded-full flex justify-center items-center transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <ChevronRight size={24} strokeWidth={2} className="text-[#e6e8fa]" />
          </button>
        </div>

      </div>
    </div>
  );
}
