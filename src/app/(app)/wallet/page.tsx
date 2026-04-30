"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Bell, Eye, Plus, ArrowUpCircle, Receipt, 
  BarChart2, Phone, Wifi, Zap, Users,
  Home, Grid, Wallet, User, PlusSquare, History
} from "lucide-react";
import { fetchWalletBalance } from "@/lib/profile";

export default function WalletPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { fetchTransactionHistory } = await import("@/lib/profile");
        const [balanceData, txData] = await Promise.all([
          fetchWalletBalance(),
          fetchTransactionHistory()
        ]);
        setBalance(balanceData);
        setTransactions(txData?.slice(0, 3) || []);
      } catch (err) {
        console.error("Failed to load wallet data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1E1544] text-white font-sans pb-24">
      {/* Top Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between bg-[#7C7AFF]">
        <h1 className="text-xl font-bold">My Wallet</h1>
        <button className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
          <Bell size={20} strokeWidth={1.5} />
        </button>
      </header>

      {/* Hero Section (Balance & Actions) */}
      <div className="bg-[#7C7AFF] rounded-b-[40px] px-6 pb-8 relative overflow-hidden shadow-lg shadow-[#7C7AFF]/20">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <span className="text-[15px]">Total Balance</span>
            <Eye size={18} />
          </div>
          <h2 className="text-[40px] font-bold text-white mb-8 tracking-tight">
            {isLoading ? "₦..." : `₦${(balance ?? 0).toFixed(2)}`}
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <Link href="/fund-wallet" className="flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-sm py-4 rounded-2xl hover:bg-white/20 transition-colors">
              <Plus size={20} strokeWidth={1.5} />
              <span className="text-[13px] font-medium">Fund</span>
            </Link>
            <button className="flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-sm py-4 rounded-2xl hover:bg-white/20 transition-colors">
              <ArrowUpCircle size={20} strokeWidth={1.5} />
              <span className="text-[13px] font-medium">Withdraw</span>
            </button>
            <Link href="/transactions" className="flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-sm py-4 rounded-2xl hover:bg-white/20 transition-colors">
              <Receipt size={20} strokeWidth={1.5} />
              <span className="text-[13px] font-medium">History</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Spending Overview */}
        <div className="bg-[#251A5A] rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg border border-[#3e3863] flex items-center justify-center">
              <BarChart2 size={16} className="text-[#a5a6fa]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] font-bold">Spending Overview</h3>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-32 flex items-end justify-between px-2 pb-2 border-b border-[#3e3863]/50 relative">
            <div className="w-full flex justify-between items-end h-full">
              <div className="w-8 bg-[#3e3863] rounded-t-md h-2"></div>
              <div className="w-8 bg-[#3e3863] rounded-t-md h-3"></div>
              <div className="w-8 bg-[#3e3863] rounded-t-md h-2"></div>
              <div className="w-8 bg-[#3e3863] rounded-t-md h-4"></div>
              <div className="w-8 bg-[#3e3863] rounded-t-md h-3"></div>
              <div className="w-8 bg-[#3e3863] rounded-t-md h-2"></div>
              <div className="w-8 bg-[#7C7AFF] rounded-t-md h-8"></div>
            </div>
          </div>
          <div className="flex justify-between px-2 mt-3 text-[11px] text-[#8683a1] font-medium">
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span className="text-[#7C7AFF]">Thu</span>
          </div>
        </div>

        {/* Quick Send */}
        <div className="bg-[#251A5A] rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg border border-[#3e3863] flex items-center justify-center">
              <Users size={16} className="text-[#a5a6fa]" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] font-bold">Quick Send</h3>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-[20px] border border-[#7C7AFF] bg-[#1E1544] flex items-center justify-center text-[#7C7AFF]">
                <Plus size={24} strokeWidth={1.5} />
              </button>
              <span className="text-[12px] text-[#8683a1]">Add</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-[20px] bg-[#1E1544] flex items-center justify-center text-xl font-bold text-[#a5a6fa]">
                A
              </button>
              <span className="text-[12px] text-[#8683a1]">Airtime</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-[20px] bg-[#1E1544] flex items-center justify-center text-xl font-bold text-[#a5a6fa]">
                D
              </button>
              <span className="text-[12px] text-[#8683a1]">Data</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-[20px] bg-[#1E1544] flex items-center justify-center text-xl font-bold text-[#a5a6fa]">
                E
              </button>
              <span className="text-[12px] text-[#8683a1]">Electric</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold">Recent Activity</h3>
            <Link href="/transactions" className="text-[#7C7AFF] text-[13px] font-medium hover:text-white transition-colors">
              See All
            </Link>
          </div>
          <div className="space-y-3">
             {isLoading ? (
               <div className="text-center py-4 text-[#8683a1] text-sm">
                 Loading...
               </div>
             ) : transactions.length === 0 ? (
               <div className="text-center py-4 text-[#8683a1] text-sm">
                 No recent activity
               </div>
             ) : (
               transactions.map((tx, idx) => {
                const isFailed = tx.status?.toLowerCase().includes("fail");
                const isWallet = tx.type?.toLowerCase() === "wallet" || tx.service_type?.toLowerCase() === "wallet" || tx.title?.toLowerCase().includes("wallet");
                
                const statusColors = isFailed 
                  ? { text: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10", iconText: "text-[#f59e0b]", iconBg: "bg-[#f59e0b]/5" }
                  : { text: "text-[#10b981]", bg: "bg-[#10b981]/10", iconText: "text-[#10b981]", iconBg: "bg-[#10b981]/5" };
  
                const formattedAmount = tx.amount 
                  ? (tx.amount.toString().startsWith('-') ? tx.amount.toString().replace('-', '-₦') : `-₦${tx.amount}`) 
                  : "-";
  
                return (
                  <div key={tx.id || tx.reference || idx} className="bg-[#251A5A] rounded-[20px] p-4 flex items-center justify-between hover:bg-[#302273] transition-colors cursor-pointer mb-3">
                    <div className="flex items-center gap-4">
                      <div className={`w-[50px] h-[50px] rounded-[16px] flex items-center justify-center ${isWallet ? "bg-[#1E1544]" : statusColors.iconBg}`}>
                        {isWallet ? (
                          <Plus size={22} className="text-[#10b981]" strokeWidth={1.5} />
                        ) : (
                          <Phone size={22} className={statusColors.iconText} strokeWidth={1.5} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-[16px] mb-1">
                          {tx.title || tx.description || tx.type || tx.service_type || "Transaction"}
                        </h3>
                        <p className="text-[#8683a1] text-[13px]">{tx.date || tx.created_at || "Details"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-[16px] mb-2">
                        {formattedAmount}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full ${statusColors.bg} ${statusColors.text} text-[11px] font-semibold`}>
                        {tx.status || "Successful"}
                      </span>
                    </div>
                  </div>
                );
              })
             )}
          </div>
        </div>

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
          <div className="w-14 h-10 rounded-2xl flex items-center justify-center transition-colors">
            <PlusSquare className="text-[#8683a1] group-hover:text-white" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#8683a1] group-hover:text-white transition-colors">Services</span>
        </Link>
        <Link href="/wallet" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl bg-[#302273] flex items-center justify-center transition-colors">
            <Wallet className="text-[#7C7AFF]" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#7C7AFF]">Wallet</span>
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
