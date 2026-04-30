"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RotateCw, Landmark, ChevronRight, Copy } from "lucide-react";
import { fetchProfileDetails } from "@/lib/profile";

export default function FundWalletPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileDetails();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const virtualAccount = profile?.virtualAccounts?.[0];

  const handleCopy = () => {
    if (virtualAccount?.accountNumber) {
      navigator.clipboard.writeText(virtualAccount.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#130f28] text-white font-sans">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-white hover:text-gray-300 transition-colors">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-[20px] font-bold">Add Money</h1>
        </div>
        <Link href="/transactions" className="text-white hover:text-gray-300 transition-colors">
          <RotateCw size={22} strokeWidth={1.5} />
        </Link>
      </header>

      <div className="px-6 pb-12 space-y-4">
        
        {/* Bank Transfer Option */}
        <div className="bg-[#1e1936] rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-[#282245] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center text-[#7c80ff]">
              <Landmark size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-white font-medium text-[16px]">Bank Transfer</h2>
              <p className="text-[#8683a1] text-[13px] leading-tight mt-0.5 max-w-[200px]">
                Add money via mobile or internet banking
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-[#8683a1]" />
        </div>

        {/* Account Details Card */}
        <div className="bg-[#1e1936] rounded-2xl p-6">
          <div className="mb-6">
            <p className="text-[#8683a1] text-[14px] mb-1">SmatPay Account Number</p>
            {isLoading ? (
              <h2 className="text-white font-bold text-[28px] tracking-wide mb-1">...</h2>
            ) : virtualAccount ? (
              <>
                <h2 className="text-white font-bold text-[28px] tracking-wide mb-1">{virtualAccount.accountNumber}</h2>
                <p className="text-[#8683a1] text-[14px] mb-1">{virtualAccount.accountName}</p>
                <p className="text-[#8683a1] text-[14px]">{virtualAccount.bankName || virtualAccount.provider}</p>
              </>
            ) : (
              <p className="text-white text-[16px] mb-1">No Virtual Account Generated. Go to Profile to generate one.</p>
            )}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleCopy}
              className="flex-1 bg-transparent border border-[#3e3863] text-white rounded-[14px] py-3.5 font-semibold text-[15px] hover:border-[#7c80ff] transition-colors"
            >
              {copied ? "Copied!" : "Copy Number"}
            </button>
            <button className="flex-1 bg-[#2196f3] text-white rounded-[14px] py-3.5 font-semibold text-[15px] hover:bg-[#1e88e5] transition-colors">
              Share Details
            </button>
          </div>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="h-[1px] bg-[#3e3863] flex-1" />
          <span className="text-[#8683a1] text-[14px] font-medium uppercase">OR</span>
          <div className="h-[1px] bg-[#3e3863] flex-1" />
        </div>

        {/* Top-up with Card Option */}
        <div className="bg-[#1e1936] rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-[#282245] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center text-[#7c80ff]">
              <Landmark size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-white font-medium text-[16px]">Top-up with Card/Account</h2>
              <p className="text-[#8683a1] text-[13px] leading-tight mt-0.5 max-w-[200px]">
                Add money directly from your bank card or account
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-[#8683a1]" />
        </div>

      </div>
    </div>
  );
}
