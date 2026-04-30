import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentSuccessProps {
  transactionId: string;
  onDone?: () => void;
  onViewReceipt?: () => void;
}

export function PaymentSuccess({ transactionId, onDone, onViewReceipt }: PaymentSuccessProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDone = () => {
    if (onDone) {
      onDone();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#130f28] z-[100] flex flex-col px-6 pb-12 pt-24 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#1cbba4] flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(28,187,164,0.3)]">
          <Check size={32} strokeWidth={3} className="text-white" />
        </div>

        {/* Success Text */}
        <h1 className="text-white text-[24px] font-bold mb-2">Payment Successful!</h1>
        <p className="text-[#8683a1] text-[15px] mb-10">Transaction successful</p>

        {/* Transaction ID Card */}
        <div className="w-full bg-[#1e1936] rounded-[24px] p-6 flex flex-col items-center justify-center gap-2 max-w-xs mx-auto border border-[#3e3863]/30 shadow-sm">
          <span className="text-[#d1d5db] text-[14px]">Transaction ID</span>
          <span className="text-white font-bold text-[20px] tracking-wide mb-1">{transactionId}</span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 text-[#7c80ff] hover:text-[#6b6eed] transition-colors text-[14px] font-medium mt-2"
          >
            <Copy size={16} />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-6 mt-auto max-w-md mx-auto w-full">
        <button
          onClick={handleDone}
          className="w-full bg-[#7c80ff] text-white rounded-2xl py-4 font-semibold text-[16px] hover:bg-[#6b6eed] transition-colors shadow-sm"
        >
          Done
        </button>
        <button
          onClick={onViewReceipt}
          className="w-full text-[#7c80ff] font-medium text-[16px] hover:text-[#6b6eed] transition-colors"
        >
          View Receipt
        </button>
      </div>
    </div>
  );
}
