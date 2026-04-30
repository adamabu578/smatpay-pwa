"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Settings, User, Gift, Headphones, ShieldCheck, Star, 
  ChevronRight, LogOut, Home, Grid, Wallet, Copy, RefreshCw
} from "lucide-react";
import { fetchProfileDetails, generateVirtualAccount, clearProfileCache } from "@/lib/profile";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const loadProfile = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError("");
      const data = await fetchProfileDetails(forceRefresh);
      setProfile(data);
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleGenerateAccount = async () => {
    try {
      setIsGenerating(true);
      await generateVirtualAccount("payscribe");
      await loadProfile(true); // Refresh profile to get the new account
    } catch (err: any) {
      alert(err.message || "Failed to generate account");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearProfileCache();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#130f28] text-white font-sans pb-24">
      {/* Top Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <button className="w-10 h-10 rounded-2xl bg-[#1e1936] flex items-center justify-center text-[#8683a1] hover:text-white transition-colors">
          <Settings size={20} strokeWidth={1.5} />
        </button>
      </header>

      <div className="px-6 space-y-6">
        
        {/* User Info Card */}
        <div className="bg-[#1e1936] rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-sm">
          <div className="relative mb-4">
            {/* Avatar with purple border */}
            <div className="w-24 h-24 rounded-full border-4 border-[#7c80ff] flex items-center justify-center overflow-hidden bg-[#fcd385]">
              <img 
                src="/user.png" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {isLoading ? (
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-6 bg-gray-600 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-48"></div>
            </div>
          ) : error ? (
             <div className="text-red-400 text-sm mb-2">{error}</div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-1">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <p className="text-[#8683a1] text-[14px]">{profile?.email}</p>
              <p className="text-[#8683a1] text-[14px] mt-1">{profile?.phone}</p>
            </>
          )}
        </div>

        {/* Virtual Account Section (Payscribe) */}
        {!isLoading && profile && (
          <div className="bg-[#1e1936] rounded-3xl p-6 shadow-sm border border-[#3e3863]/50">
            <h3 className="text-white font-bold text-[16px] mb-4 flex items-center gap-2">
              <Wallet size={18} className="text-[#7c80ff]" />
              Virtual Account
            </h3>
            
            {profile.virtualAccounts && profile.virtualAccounts.length > 0 ? (
              <div className="space-y-4">
                {profile.virtualAccounts.map((account: any, idx: number) => (
                  <div key={idx} className="bg-[#130f28] p-4 rounded-2xl flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#8683a1] text-xs uppercase">{account.bankName}</span>
                      <span className="text-[#7c80ff] text-xs font-bold uppercase">{account.provider}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-white font-mono text-xl tracking-wider">{account.accountNumber}</p>
                        <p className="text-[#8683a1] text-xs mt-1">{account.accountName}</p>
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(account.accountNumber)}
                        className="p-2 rounded-xl bg-[#282245] text-[#d1d5db] hover:text-white transition-colors"
                        title="Copy Account Number"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <p className="text-[#8683a1] text-sm mb-4">You do not have a virtual account to receive payments yet.</p>
                <button 
                  onClick={handleGenerateAccount}
                  disabled={isGenerating}
                  className="bg-[#7c80ff] text-white px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#6b6eed] transition-colors disabled:opacity-50"
                >
                  {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <Wallet size={16} />}
                  Connect to Payscribe
                </button>
              </div>
            )}
          </div>
        )}

        {/* Menu Items */}
        <div className="bg-[#1e1936] rounded-3xl p-4 space-y-2">
          
          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#282245] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#282245] flex items-center justify-center group-hover:bg-[#3e3863] transition-colors">
                <User size={20} className="text-[#7c80ff]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-[15px] mb-0.5">Personal Information</h3>
                <p className="text-[#8683a1] text-[13px]">View and edit your details</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#8683a1]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#282245] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#282245] flex items-center justify-center group-hover:bg-[#3e3863] transition-colors">
                <Gift size={20} className="text-[#7c80ff]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-[15px] mb-0.5">Refer and Earn</h3>
                <p className="text-[#8683a1] text-[13px]">Referrals & commissions</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#8683a1]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#282245] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#282245] flex items-center justify-center group-hover:bg-[#3e3863] transition-colors">
                <Headphones size={20} className="text-[#7c80ff]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-[15px] mb-0.5">Help & Support</h3>
                <p className="text-[#8683a1] text-[13px]">Get help from our team</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#8683a1]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#282245] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#282245] flex items-center justify-center group-hover:bg-[#3e3863] transition-colors">
                <ShieldCheck size={20} className="text-[#7c80ff]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-[15px] mb-0.5">Privacy & Security</h3>
                <p className="text-[#8683a1] text-[13px]">Manage your security settings</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#8683a1]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#282245] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#282245] flex items-center justify-center group-hover:bg-[#3e3863] transition-colors">
                <Star size={20} className="text-[#7c80ff]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-[15px] mb-0.5">Rate Us</h3>
                <p className="text-[#8683a1] text-[13px]">Love SmatPay? Leave a review</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#8683a1]" />
          </button>

        </div>

        {/* Log Out Button */}
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-[#3e1e2d] text-[#ff4b4b] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#4a2234] transition-colors"
        >
          <LogOut size={20} strokeWidth={2} />
          <span>Log Out</span>
        </button>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-[#1a1625] rounded-[32px] w-full max-w-sm p-8 text-center shadow-xl animate-in zoom-in-95 duration-200">
            <h2 className="text-white text-2xl font-bold mb-4">Logout</h2>
            <p className="text-white text-[18px] mb-8">Are you sure you want to log out?</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-4 rounded-full border-2 border-[#ff4b4b] text-[#d1d5db] font-medium text-[16px] hover:bg-[#ff4b4b]/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-4 rounded-full bg-[#ff4b4b] text-white font-medium text-[16px] hover:bg-[#ff3333] transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#130f28] border-t border-[#3e3863] px-6 py-4 flex justify-between items-center z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 group">
          <div className="w-14 h-10 rounded-2xl flex items-center justify-center transition-colors">
            <Home className="text-[#8683a1] group-hover:text-white" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#8683a1] group-hover:text-white transition-colors">Home</span>
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
          <div className="w-14 h-10 rounded-2xl bg-[#282245] flex items-center justify-center transition-colors">
            <User className="text-[#7c80ff]" size={22} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-medium text-[#7c80ff]">Profile</span>
        </Link>
      </div>
      
    </div>
  );
}
