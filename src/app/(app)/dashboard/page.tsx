"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Bell, Eye, PlusSquare, ArrowUpRight, 
  Landmark, Phone, Wifi, Lightbulb, 
  Monitor, Zap, GraduationCap, Gift,
  Home, Grid, Wallet, User
} from "lucide-react";
import { fetchProfileDetails, fetchWalletBalance } from "@/lib/profile";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileData, balanceData] = await Promise.all([
          fetchProfileDetails(),
          fetchWalletBalance()
        ]);
        setProfile(profileData);
        setBalance(balanceData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1E1544] text-white font-sans pb-24">
      {/* Top Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#fcd385] flex items-center justify-center overflow-hidden">
            {/* Avatar Image Placeholder */}
            <img 
              src="/user.png" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[#a5a6fa] text-sm">Welcome back</p>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {isLoading ? "..." : profile?.firstName || "User"} <span>👋</span>
            </h1>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border border-[#3e3863] flex items-center justify-center text-white hover:bg-white/10 transition-colors">
          <Bell size={20} strokeWidth={1.5} />
        </button>
      </header>

      <div className="px-6 space-y-8">
        
        {/* Wallet Balance Card */}
        <div className="bg-[#7C7AFF] rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-[#7C7AFF]/20">
          {/* Subtle Background Pattern */}
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <svg width="150" height="150" viewBox="0 0 200 200" fill="none">
              <path d="M10 190L90 10L190 190" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <span className="text-[15px]">Wallet Balance</span>
              <Eye size={16} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              {isLoading ? "₦..." : `₦${(balance ?? 0).toFixed(2)}`}
            </h2>
            
            <div className="flex gap-4">
              <Link href="/fund-wallet" className="flex-1 bg-white text-[#7C7AFF] py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <PlusSquare size={18} strokeWidth={2} />
                <span>Fund Wallet</span>
              </Link>
              <button className="flex-1 bg-white text-[#7C7AFF] py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <ArrowUpRight size={18} strokeWidth={2} />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <div className="grid grid-cols-4 gap-4">
            {/* Link Item */}
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <Landmark className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] text-[#d1d5db]">Account</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link href="/airtime" className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <Phone className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </Link>
              <span className="text-[13px] text-[#d1d5db]">Airtime</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link href="/data" className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <Wifi className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </Link>
              <span className="text-[13px] text-[#d1d5db]">Data</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <Lightbulb className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] text-[#d1d5db]">Electricity</span>
            </div>
          </div>
        </div>

        {/* Refer & Earn Banner */}
        <div className="bg-[#7C7AFF] rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-[#7C7AFF]/20 flex items-center justify-between">
          <div className="relative z-10 max-w-[65%]">
            <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block backdrop-blur-sm">
              NEW
            </span>
            <h3 className="text-[17px] font-bold text-white mb-2 leading-tight">Refer & Earn Rewards</h3>
            <p className="text-white/80 text-[13px] leading-snug">
              Invite friends and earn on every transaction they make
            </p>
          </div>
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            {/* Gift Box Graphic */}
            <div className="text-5xl">🎁</div>
          </div>
        </div>

        {/* Pay Bills */}
        <div>
          <h3 className="text-lg font-bold mb-4">Pay Bills</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <Monitor className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] text-[#d1d5db]">TV</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <Zap className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] text-[#d1d5db]">Power</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <GraduationCap className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] text-[#d1d5db]">Exam</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-16 h-16 rounded-2xl bg-[#251A5A] flex items-center justify-center hover:bg-[#302273] transition-colors shadow-sm">
                <Gift className="text-[#7C7AFF]" size={24} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] text-[#d1d5db]">Cards</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Transactions</h3>
            <Link href="/transactions" className="text-[#7C7AFF] text-[14px] font-medium hover:text-white transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            <Link href="/transactions" className="bg-[#251A5A] rounded-2xl p-4 flex items-center justify-between hover:bg-[#302273] transition-colors block">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E1544] flex items-center justify-center">
                  <ArrowUpRight size={18} className="text-[#4caf50]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] mb-1">Wallet topup</h3>
                  <p className="text-[#8683a1] text-[12px]">wallet</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-[15px] mb-1">-₦50</p>
                <span className="text-[#4caf50] text-[11px] font-medium">Successful</span>
              </div>
            </Link>
            <Link href="/transactions" className="bg-[#251A5A] rounded-2xl p-4 flex items-center justify-between hover:bg-[#302273] transition-colors block">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E1544] flex items-center justify-center">
                  <Phone size={18} className="text-[#4caf50]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] mb-1">Airtime</h3>
                  <p className="text-[#8683a1] text-[12px]">08146704074</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-[15px] mb-1">-₦50</p>
                <span className="text-[#4caf50] text-[11px] font-medium">Successful</span>
              </div>
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1E1544] border-t border-[#3e3863] px-6 py-4 flex justify-between items-center z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl bg-[#302273] flex items-center justify-center transition-colors">
            <Home className="text-[#7C7AFF]" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#7C7AFF]">Home</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl flex items-center justify-center transition-colors">
            <Grid className="text-[#8683a1] group-hover:text-white" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#8683a1] group-hover:text-white transition-colors">Services</span>
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
