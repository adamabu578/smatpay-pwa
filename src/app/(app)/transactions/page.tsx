"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, BarChart2, Phone, RefreshCcw } from "lucide-react";

export default function TransactionsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Airtime", "Data", "Electricity", "Wallet"];

  const transactions = [
    { 
      id: 1, 
      type: "wallet", 
      title: "Wallet topup", 
      subtitle: "wallet", 
      amount: "-₦50", 
      status: "Wallet topup" 
    },
    { 
      id: 2, 
      type: "airtime", 
      title: "Airtime", 
      subtitle: "08146704074", 
      amount: "-₦50", 
      status: "Successful" 
    },
    { 
      id: 3, 
      type: "airtime", 
      title: "Airtime", 
      subtitle: "08146704074", 
      amount: "-₦100", 
      status: "Successful" 
    },
    { 
      id: 4, 
      type: "wallet", 
      title: "Wallet topup", 
      subtitle: "wallet", 
      amount: "-₦100", 
      status: "Wallet topup" 
    },
    { 
      id: 5, 
      type: "wallet", 
      title: "Wallet topup", 
      subtitle: "wallet", 
      amount: "-₦50", 
      status: "Wallet topup" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#130f28] text-white font-sans">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-white hover:text-gray-300 transition-colors">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="text-[20px] font-bold">Transactions</h1>
      </header>

      <div className="px-6 pb-8 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c80ff]">
            <Search size={20} strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full bg-transparent border border-[#3e3863] rounded-[18px] py-4 pl-12 pr-4 text-white placeholder-[#3e3863] focus:outline-none focus:border-[#7c80ff] transition-colors text-[15px]"
          />
        </div>

        {/* Summary Card */}
        <div className="bg-[#7c80ff] rounded-3xl p-5 flex items-center justify-between shadow-lg shadow-[#7c80ff]/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <BarChart2 size={24} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white/80 text-[13px] font-medium mb-0.5">Total Spent</p>
              <h2 className="text-white font-bold text-[28px] leading-none tracking-tight">₦350</h2>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-white font-bold text-[24px] leading-none mb-1">5</h3>
            <p className="text-white/80 text-[12px]">transactions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-[14px] font-medium transition-colors border ${
                activeFilter === filter
                  ? "bg-[#7c80ff] border-[#7c80ff] text-white"
                  : "bg-transparent border-[#3e3863] text-[#d1d5db] hover:border-[#7c80ff]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-[#1e1936] rounded-2xl p-4 flex items-center justify-between hover:bg-[#282245] transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-[#130f28] flex items-center justify-center">
                  {tx.type === "wallet" ? (
                    <RefreshCcw size={20} className="text-[#4caf50]" strokeWidth={1.5} />
                  ) : (
                    <Phone size={20} className="text-[#4caf50]" strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-bold text-[16px] mb-1">{tx.title}</h3>
                  <p className="text-[#8683a1] text-[13px]">{tx.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-[16px] mb-2">{tx.amount}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-[#4caf50]/10 text-[#4caf50] text-[11px] font-medium">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* End of list */}
        <div className="text-center pt-6 pb-4">
          <p className="text-[#8683a1] text-[15px]">You've reached the end</p>
        </div>

      </div>
    </div>
  );
}
