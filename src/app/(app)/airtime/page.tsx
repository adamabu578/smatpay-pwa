"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Wallet } from "lucide-react";
import { APIConstants } from "@/lib/api-constants";
import { PaymentSuccess } from "@/components/PaymentSuccess";

export default function AirtimePage() {
  const router = useRouter();
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && amount) {
      setErrorMessage("");
      setSuccessMessage("");
      setShowConfirm(true);
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      const token = localStorage.getItem("token") || "";
      const payload = {
        operator: selectedNetwork,
        phoneNumber: phoneNumber,
        amount: amount
      };
      
      const response = await fetch(`${APIConstants.BASE_URL}/airtime`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        setIsProcessing(false);
        setShowConfirm(false);
        setTransactionId(data.data?.transactionId || "N/A");
      } else {
        setErrorMessage(data.msg || "Transaction failed");
        setIsProcessing(false);
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
      setIsProcessing(false);
    }
  };

  const networks = [
    { id: "MTN", name: "MTN", image: "/mtn.png" },
    { id: "Airtel", name: "Airtel", image: "/airtel.png" },
    { id: "Glo", name: "Glo", image: "/glo.png" },
    { id: "9mobile", name: "9mobile", image: "/9mobile.png" },
  ];

  return (
    <div className="min-h-screen bg-[#1E1544] text-white font-sans relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-white hover:text-gray-300 transition-colors">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-[22px] font-bold">Buy Airtime</h1>
        </div>
        <button className="w-10 h-10 rounded-full border border-[#3e3863] flex items-center justify-center text-[#d1d5db] hover:text-white transition-colors">
          <MessageSquare size={18} strokeWidth={1.5} />
        </button>
      </header>

      <div className="px-6 pb-24">
        {/* Select Network */}
        <div className="mb-8">
          <h2 className="text-[17px] font-bold text-[#d1d5db] mb-4">Select Network</h2>
          <div className="grid grid-cols-4 gap-3">
            {networks.map((net) => (
              <button
                key={net.id}
                type="button"
                onClick={() => setSelectedNetwork(net.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  selectedNetwork === net.id 
                    ? "border-[#7C7AFF] bg-[#251A5A]" 
                    : "border-[#3e3863] bg-[#251A5A] opacity-70"
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 overflow-hidden bg-white"
                >
                  <img src={net.image} alt={net.name} className="w-full h-full object-cover" />
                </div>
                <span className={`text-[12px] font-medium ${selectedNetwork === net.id ? "text-[#7C7AFF]" : "text-[#d1d5db]"}`}>
                  {net.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleProceed} className="space-y-6">
          <div>
            <h2 className="text-[17px] font-bold text-[#d1d5db] mb-4">Phone Number</h2>
            <div className="relative">
              <input
                type="tel"
                placeholder="0800 000 0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent border border-[#3e3863] rounded-[20px] py-4 px-5 text-white placeholder-[#8683a1] focus:outline-none focus:border-[#7C7AFF] transition-colors text-[16px] font-medium"
                required
              />
            </div>
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-[#d1d5db] mb-4">Amount</h2>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white font-bold text-[18px]">
                ₦
              </div>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent border border-[#3e3863] rounded-[20px] py-4 pl-10 pr-5 text-white placeholder-[#8683a1] focus:outline-none focus:border-[#7C7AFF] transition-colors text-[18px] font-bold"
                required
              />
            </div>
            {/* Quick amounts could go here */}
            <div className="flex gap-3 mt-4">
              {['100', '200', '500', '1000'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className="px-4 py-2 rounded-xl border border-[#3e3863] text-[#d1d5db] text-sm hover:border-[#7C7AFF] hover:text-[#7C7AFF] transition-colors"
                >
                  ₦{amt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7C7AFF] text-white rounded-[16px] py-[18px] font-semibold text-[16px] hover:bg-[#6664E6] transition-colors mt-8 shadow-sm"
          >
            Proceed
          </button>
        </form>
      </div>

      {/* Confirmation Bottom Sheet */}
      {showConfirm && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 animate-in fade-in duration-200"
            onClick={() => !isProcessing && setShowConfirm(false)}
          />
          
          {/* Modal */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#251A5A] rounded-t-[32px] z-50 p-6 animate-in slide-in-from-bottom-full duration-300">
            {/* Drag Handle indicator */}
            <div className="w-12 h-1 bg-[#3e3863] rounded-full mx-auto mb-6" />
            
            <h2 className="text-xl font-bold text-center text-white mb-2">Confirm Payment</h2>
            <div className="text-center mb-8">
              <span className="text-3xl font-bold text-[#7C7AFF]">₦{amount}</span>
            </div>

            {/* Status Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm text-center">
                {successMessage}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-[#3e3863]">
                <span className="text-[#d1d5db]">Network</span>
                <span className="text-white font-bold">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#3e3863]">
                <span className="text-[#d1d5db]">Phone Number</span>
                <span className="text-white font-bold">{phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#3e3863]">
                <span className="text-[#d1d5db]">Amount</span>
                <span className="text-white font-bold">₦{amount}</span>
              </div>
            </div>

            {/* Wallet Section */}
            <div className="bg-[#1E1544] rounded-[20px] p-4 flex items-center justify-between mb-8 border border-[#3e3863]/50">
              <div className="flex items-center gap-3">
                <Wallet className="text-[#7C7AFF]" size={20} />
                <span className="text-[#d1d5db] font-medium">Wallet</span>
              </div>
              <span className="text-white font-bold">₦50.00</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleConfirm}
                disabled={isProcessing || !!successMessage}
                className="w-full bg-[#7C7AFF] text-white rounded-[16px] py-[18px] font-semibold text-[16px] hover:bg-[#6664E6] transition-colors shadow-sm flex justify-center items-center disabled:opacity-70"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Confirm Payment"
                )}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isProcessing}
                className="w-full text-[#d1d5db] py-3 font-medium text-[16px] hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* Success Screen */}
      {transactionId && (
        <PaymentSuccess 
          transactionId={transactionId}
          onDone={() => router.push("/dashboard")}
          onViewReceipt={() => router.push("/transactions")}
        />
      )}
    </div>
  );
}
