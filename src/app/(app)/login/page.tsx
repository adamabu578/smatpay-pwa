"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeOff, Eye, Fingerprint } from "lucide-react";
import SmatPayLogo from "@/components/SmatPayLogo";
import { APIConstants } from "@/lib/api-constants";
import { clearProfileCache } from "@/lib/profile";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Sending login payload:", { email, password });
      
      const response = await fetch(`${APIConstants.BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Received response from backend:", data);

      if (response.ok && data.status === "success") {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        clearProfileCache();
        router.push("/dashboard"); // navigate to dashboard
      } else {
        setError(data.msg || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#130f28] text-white flex justify-center w-full font-sans">
      <div className="w-full max-w-md p-6 flex flex-col relative h-full min-h-screen pt-6">
        
        {/* Header Logo */}
        <header className="mb-6 flex items-start">
          <Link href="/">
            <SmatPayLogo className="h-16" />
          </Link>
        </header>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#7b76e6] mb-3 tracking-tight">Hi, Welcome Back!</h1>
          <p className="text-white text-[16px] leading-relaxed pr-8">
            Enter your details to sign in to your account
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex-1 flex flex-col">
          <div className="space-y-4 mb-6">
            
            {/* Email */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-white opacity-80">
                {/* stylized play-like icon from image */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3l14 9-14 9V3z" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-[#3e3863] rounded-[20px] py-4 pl-14 pr-4 text-white placeholder-white focus:outline-none focus:border-[#7b76e6] transition-colors text-[15px] font-medium"
                required
              />
            </div>

            {/* Password */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-white opacity-80">
                {/* stylized lock icon from image */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="8" width="10" height="12" rx="2" />
                  <path d="M22 14h-4" />
                  <path d="M22 10h-4" />
                  <path d="M15 12h-2" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-[#3e3863] rounded-[20px] py-4 pl-14 pr-12 text-white placeholder-white focus:outline-none focus:border-[#7b76e6] transition-colors text-[15px] font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-white opacity-80 hover:opacity-100 transition-opacity"
              >
                {showPassword ? (
                  <Eye size={22} strokeWidth={1.5} />
                ) : (
                  <EyeOff size={22} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-[20px] h-[20px] appearance-none border-2 border-white/80 rounded-md checked:bg-transparent checked:border-white transition-all cursor-pointer peer"
                />
                <svg
                  className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  viewBox="0 0 14 10"
                  fill="none"
                >
                  <path
                    d="M1 5L4.5 8.5L13 1"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-white text-[15px]">Remember Me</span>
            </label>
            <Link href="#" className="text-[#a5a6fa] hover:text-[#7b76e6] text-[15px] transition-colors">
              Forget Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7c80ff] text-white rounded-[16px] py-[18px] font-semibold text-[16px] hover:bg-[#6b6eed] transition-colors disabled:opacity-70 flex justify-center items-center mb-4 shadow-sm"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
          
          {/* Create Account Button */}
          <Link 
            href="/register" 
            className="w-full bg-[#e6e8fa] text-[#7c80ff] rounded-[16px] py-[18px] font-semibold text-[16px] hover:bg-[#d8dbfe] transition-colors flex justify-center items-center shadow-sm block"
          >
            Create Account
          </Link>
          
          {/* Fingerprint Login */}
          <div className="mt-4 flex justify-center items-center gap-3 text-white mb-4">
            <Fingerprint size={26} strokeWidth={1.5} className="text-[#7c80ff]" />
            <span className="text-[16px]">Login with fingerprint</span>
          </div>
          
        </form>
      </div>
    </div>
  );
}
