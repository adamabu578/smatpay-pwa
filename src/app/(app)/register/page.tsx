"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, RectangleEllipsis, EyeOff, Eye, ArrowLeft } from "lucide-react";
import { APIConstants } from "@/lib/api-constants";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${APIConstants.BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phoneNumber,
          password,
          assignNuban: "no",
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setSuccess(data.msg || "Account created. Kindly login.");
        setTimeout(() => {
          router.push("/login"); 
        }, 2000);
      } else {
        setError(data.msg || "An error occurred during registration.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1544] text-white flex justify-center w-full font-sans">
      {/* Mobile container wrapper */}
      <div className="w-full max-w-md p-6 flex flex-col relative h-full min-h-screen">
        
        {/* Header / Back Arrow */}
        <header className="py-4">
          <button 
            onClick={() => router.back()} 
            className="text-white p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft strokeWidth={1.5} size={24} />
          </button>
        </header>

        {/* Title & Subtitle */}
        <div className="mt-0 mb-4">
          <h1 className="text-3xl font-bold text-[#7C7AFF] mb-2 tracking-tight">Create Your Profile</h1>
          <p className="text-[#d1d5db] text-[15px] leading-relaxed">
            Enter your name, password and phone number
          </p>
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm">
              {success}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex-1 flex flex-col">
          <div className="space-y-4 mb-4">
            
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <User size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border border-[#3e3863] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white focus:outline-none focus:border-[#7C7AFF] transition-colors text-sm font-medium"
                  required
                />
              </div>
              
              {/* Last Name */}
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <User size={20} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border border-[#3e3863] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white focus:outline-none focus:border-[#7C7AFF] transition-colors text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Mail size={20} strokeWidth={1.5} />
              </div>
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-[#3e3863] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white focus:outline-none focus:border-[#7C7AFF] transition-colors text-sm font-medium"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Phone size={20} strokeWidth={1.5} />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent border border-[#3e3863] rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white focus:outline-none focus:border-[#7C7AFF] transition-colors text-sm font-medium"
                required
              />
            </div>

            {/* Password */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <RectangleEllipsis size={20} strokeWidth={1.5} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-[#3e3863] rounded-2xl py-4 pl-12 pr-12 text-white placeholder-white focus:outline-none focus:border-[#7C7AFF] transition-colors text-sm font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <Eye size={20} strokeWidth={1.5} />
                ) : (
                  <EyeOff size={20} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>


          {/* Terms & Conditions */}
          <div className="mt-8 mb-6">
            <label className="flex items-start gap-4 cursor-pointer">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-md checked:bg-transparent checked:border-white transition-all cursor-pointer peer"
                  required
                />
                <svg
                  className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  viewBox="0 0 14 10"
                  fill="none"
                >
                  <path
                    d="M1 5L4.5 8.5L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#8683a1] text-[15px] leading-snug">
                I agree to the <span className="text-white font-semibold">Terms of Service</span> and <span className="text-white font-semibold">Privacy Policy</span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C7AFF] text-white rounded-[20px] py-4 font-semibold text-lg hover:bg-[#6664E6] transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
}
