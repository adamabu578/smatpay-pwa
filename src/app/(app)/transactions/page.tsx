"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, BarChart2, Phone, RefreshCcw } from "lucide-react";

export default function TransactionsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Airtime", "Data", "Electricity", "Wallet"];

  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { fetchTransactionHistory } = await import("@/lib/profile");
        const data = await fetchTransactionHistory();
        setTransactions(data);
      } catch (err: any) {
        console.error("Failed to load transactions:", err);
        setError(err.message || "Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };
    loadTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#1E1544] text-white font-sans">
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C7AFF]">
            <Search size={20} strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full bg-transparent border border-[#3e3863] rounded-[18px] py-4 pl-12 pr-4 text-white placeholder-[#3e3863] focus:outline-none focus:border-[#7C7AFF] transition-colors text-[15px]"
          />
        </div>

        {/* Summary Card */}
        <div className="bg-[#7C7AFF] rounded-3xl p-5 flex items-center justify-between shadow-lg shadow-[#7C7AFF]/20">
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
                  ? "bg-[#7C7AFF] border-[#7C7AFF] text-white"
                  : "bg-transparent border-[#3e3863] text-[#d1d5db] hover:border-[#7C7AFF]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8 text-[#8683a1]">
              <div className="w-8 h-8 border-2 border-[#7C7AFF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-[#251A5A] rounded-lg text-white hover:bg-[#302273] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-[#8683a1]">
              <p>No transactions found</p>
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
                        <RefreshCcw size={22} className="text-[#10b981]" strokeWidth={1.5} />
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

        {/* End of list */}
        <div className="text-center pt-6 pb-4">
          <p className="text-[#8683a1] text-[15px]">You've reached the end</p>
        </div>

      </div>
    </div>
  );
}
