"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Wifi, ChevronDown, Phone, User, Wallet, CheckCircle2 } from "lucide-react";
import { APIConstants } from "@/lib/api-constants";
import { PaymentSuccess } from "@/components/PaymentSuccess";

interface Bundle {
  id: string;
  name: string;
  price: string;
  variation_code: string;
}

export default function DataPage() {
  const router = useRouter();
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dataBundles, setDataBundles] = useState<Bundle[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  
  const [isLoadingBundles, setIsLoadingBundles] = useState(false);
  const [showBundleSelect, setShowBundleSelect] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBundles = async () => {
      setIsLoadingBundles(true);
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetch(`${APIConstants.BASE_URL}/data/bundle/${selectedNetwork.toLowerCase()}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.status === "success" && data.data) {
           const mappedBundles = data.data.map((item: any) => ({
             id: item.variation_code,
             name: item.name,
             price: item.variation_amount,
             variation_code: item.variation_code
           }));
           setDataBundles(mappedBundles);
           if (mappedBundles.length > 0) {
             setSelectedBundle(mappedBundles[0]);
           } else {
             setSelectedBundle(null);
           }
        } else {
           setDataBundles([]);
           setSelectedBundle(null);
        }
      } catch (err) {
        console.error("Failed to fetch bundles:", err);
        setDataBundles([]);
        setSelectedBundle(null);
      } finally {
        setIsLoadingBundles(false);
      }
    };

    fetchBundles();
  }, [selectedNetwork]);

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && selectedBundle) {
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
        network: selectedNetwork,
        phone: phoneNumber,
        variation_code: selectedBundle?.variation_code,
        amount: selectedBundle?.price
      };
      
      const response = await fetch(`${APIConstants.BASE_URL}/data`, {
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
    { id: "GLO", name: "GLO", image: "/glo.png" },
    { id: "AIRTEL", name: "AIRTEL", image: "/airtel.png" },
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
          <h1 className="text-[22px] font-bold">Buy Data</h1>
        </div>
        <button className="w-10 h-10 rounded-full border border-[#3e3863] flex items-center justify-center text-[#d1d5db] hover:text-white transition-colors">
          <MessageSquare size={18} strokeWidth={1.5} />
        </button>
      </header>

      <div className="px-6 pb-24">
        {/* Select Network */}
        <div className="mb-6">
          <h2 className="text-[17px] font-bold text-white mb-4">Select Network</h2>
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
          
          {/* Select Data Bundle */}
          <div>
            <h2 className="text-[17px] font-bold text-white mb-4">Select Data Bundle</h2>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7C7AFF]">
                <Wifi size={20} strokeWidth={2} />
              </div>
              <div 
                onClick={() => { if (!isLoadingBundles && dataBundles.length > 0) setShowBundleSelect(true); }}
                className={`w-full bg-transparent border border-[#3e3863] rounded-[20px] py-4 pl-14 pr-12 text-[#d1d5db] flex items-center justify-between transition-colors ${
                  isLoadingBundles || dataBundles.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[#7C7AFF]"
                }`}
              >
                <span className="text-[15px] truncate">
                  {isLoadingBundles ? "Loading bundles..." : selectedBundle ? selectedBundle.name : "No bundles available"}
                </span>
                <ChevronDown size={20} className="text-[#8683a1] absolute right-5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div>
            <h2 className="text-[17px] font-bold text-white mb-4">Amount</h2>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7C7AFF] font-bold text-[18px]">
                ₦
              </div>
              <div className="w-full bg-transparent border border-[#3e3863] rounded-[20px] py-4 pl-12 pr-5 text-white text-[18px] font-bold flex items-center">
                {selectedBundle ? selectedBundle.price : "0.00"}
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <h2 className="text-[17px] font-bold text-white mb-4">Phone Number</h2>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8683a1]">
                <Phone size={20} strokeWidth={1.5} />
              </div>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent border border-[#7C7AFF] rounded-[20px] py-4 pl-14 pr-12 text-white placeholder-[#8683a1] focus:outline-none focus:border-[#7C7AFF] transition-colors text-[15px] font-medium"
                required
              />
              <button 
                type="button" 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8683a1] hover:text-[#7C7AFF] transition-colors"
              >
                <User size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedBundle || isLoadingBundles}
            className="w-full bg-[#7C7AFF] text-white rounded-[16px] py-[18px] font-semibold text-[16px] hover:bg-[#6664E6] transition-colors mt-8 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      {/* Select Data Bundle Bottom Sheet */}
      {showBundleSelect && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 animate-in fade-in duration-200"
            onClick={() => setShowBundleSelect(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-[#251A5A] rounded-t-[32px] z-50 p-6 animate-in slide-in-from-bottom-full duration-300 max-h-[80vh] flex flex-col">
            <div className="w-12 h-1 bg-[#3e3863] rounded-full mx-auto mb-6 shrink-0" />
            <h2 className="text-xl font-bold text-center text-white mb-6 shrink-0">Select Data Bundle</h2>
            
            <div className="overflow-y-auto overflow-x-hidden -mx-6 px-6 pb-6">
              {dataBundles.map((bundle) => (
                <div 
                  key={bundle.id}
                  onClick={() => {
                    setSelectedBundle(bundle);
                    setShowBundleSelect(false);
                  }}
                  className="flex items-center gap-4 py-4 border-b border-[#3e3863] last:border-0 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1E1544] flex items-center justify-center shrink-0">
                    <Wifi size={20} className="text-[#8683a1] group-hover:text-[#7C7AFF] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-[15px] leading-snug mb-1 truncate">{bundle.name}</p>
                    <p className="text-[#7C7AFF] font-bold text-[14px]">₦{bundle.price}</p>
                  </div>
                  {selectedBundle?.id === bundle.id && (
                    <CheckCircle2 size={22} className="text-[#7C7AFF] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
            
            <h2 className="text-xl font-bold text-center text-white mb-2">Confirm Purchase</h2>
            <div className="text-center mb-8">
              <span className="text-3xl font-bold text-[#7C7AFF]">₦{selectedBundle?.price}</span>
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

            <div className="bg-[#1E1544] rounded-2xl p-5 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-[#3e3863]">
                <span className="text-[#d1d5db] text-[15px]">Network</span>
                <span className="text-white font-bold text-[15px] text-right">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#3e3863]">
                <span className="text-[#d1d5db] text-[15px]">Bundle</span>
                <span className="text-white font-bold text-[15px] text-right max-w-[60%] truncate">{selectedBundle?.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#3e3863]">
                <span className="text-[#d1d5db] text-[15px]">Phone</span>
                <span className="text-white font-bold text-[15px] text-right">{phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[#d1d5db] text-[15px]">Amount</span>
                <span className="text-white font-bold text-[15px] text-right">₦{selectedBundle?.price}</span>
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
