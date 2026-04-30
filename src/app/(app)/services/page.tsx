"use client";

import React from "react";
import Link from "next/link";
import { 
  Phone, Wifi, Zap, Monitor, 
  Home, Wallet, User, PlusSquare, Smile
} from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#1E1544] text-white font-sans pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">Services</h1>
        <p className="text-[#a5a6fa] text-[15px]">Pay bills and manage subscriptions easily</p>
      </header>

      <div className="px-6 space-y-8">
        
        {/* Telecom Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#7C7AFF] rounded-full"></div>
            <h2 className="text-[18px] font-bold text-white">Telecom</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Airtime */}
            <Link href="/airtime" className="bg-[#251A5A] rounded-3xl p-5 flex flex-col items-start hover:bg-[#302273] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#302273] flex items-center justify-center mb-4">
                <Phone className="text-[#7C7AFF]" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-1">Airtime</h3>
              <p className="text-[#8683a1] text-[13px]">All networks</p>
            </Link>

            {/* Data */}
            <Link href="/data" className="bg-[#251A5A] rounded-3xl p-5 flex flex-col items-start hover:bg-[#302273] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#302273] flex items-center justify-center mb-4">
                <Wifi className="text-[#7C7AFF]" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-1">Data</h3>
              <p className="text-[#8683a1] text-[13px]">SME & Gifting</p>
            </Link>

            {/* Alpha Caller */}
            <Link href="#" className="bg-[#251A5A] rounded-3xl p-5 flex flex-col items-start hover:bg-[#302273] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#302273] flex items-center justify-center mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f44336]">
                  <path d="M12 2L2 22h20L12 2z" />
                  <path d="M12 8l-4 8h8l-4-8z" fill="#f44336" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-[16px] mb-1">Alpha Caller</h3>
              <p className="text-[#8683a1] text-[13px]">Voice bundles</p>
            </Link>

            {/* Smile */}
            <Link href="#" className="bg-[#251A5A] rounded-3xl p-5 flex flex-col items-start hover:bg-[#302273] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#302273] flex items-center justify-center mb-4">
                <Smile className="text-[#4caf50]" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-1">Smile</h3>
              <p className="text-[#8683a1] text-[13px]">Voice & Data</p>
            </Link>
          </div>
        </section>

        {/* Bills & Utilities Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#7C7AFF] rounded-full"></div>
            <h2 className="text-[18px] font-bold text-white">Bills & Utilities</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Electricity */}
            <Link href="#" className="bg-[#251A5A] rounded-3xl p-5 flex flex-col items-start hover:bg-[#302273] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#302273] flex items-center justify-center mb-4">
                <Zap className="text-[#7C7AFF]" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-1">Electricity</h3>
              <p className="text-[#8683a1] text-[13px]">Prepaid & Postpaid</p>
            </Link>

            {/* Cable TV */}
            <Link href="#" className="bg-[#251A5A] rounded-3xl p-5 flex flex-col items-start hover:bg-[#302273] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#302273] flex items-center justify-center mb-4">
                <Monitor className="text-[#7C7AFF]" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-bold text-[16px] mb-1">Cable TV</h3>
              <p className="text-[#8683a1] text-[13px]">DStv, GOtv, Startimes</p>
            </Link>
          </div>
        </section>

        {/* More Services Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#7C7AFF] rounded-full"></div>
            <h2 className="text-[18px] font-bold text-white">More Services</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {/* Educational */}
             <Link href="#" className="bg-[#251A5A] rounded-3xl p-5 flex flex-col items-start hover:bg-[#302273] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#302273] flex items-center justify-center mb-4">
                <div className="text-[#7C7AFF] text-xl font-bold">🎓</div>
              </div>
              <h3 className="text-white font-bold text-[16px] mb-1">Education</h3>
              <p className="text-[#8683a1] text-[13px]">WAEC, NECO, JAMB</p>
            </Link>
          </div>
        </section>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1E1544] border-t border-[#3e3863] px-6 py-4 flex justify-between items-center z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl flex items-center justify-center transition-colors">
            <Home className="text-[#8683a1] group-hover:text-white" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#8683a1] group-hover:text-white transition-colors">Home</span>
        </Link>
        <Link href="/services" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl bg-[#302273] flex items-center justify-center transition-colors">
            <PlusSquare className="text-[#7C7AFF]" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#7C7AFF]">Services</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl flex items-center justify-center transition-colors">
            <Wallet className="text-[#8683a1] group-hover:text-white" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#8683a1] group-hover:text-white transition-colors">Wallet</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl flex items-center justify-center transition-colors">
            <User className="text-[#8683a1] group-hover:text-white" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#8683a1] group-hover:text-white transition-colors">Profile</span>
        </Link>
      </div>
      
    </div>
  );
}
