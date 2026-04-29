import React from 'react';
import { ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react';

const Steps = () => {
    return (
        <section id="how-it-works" className="py-24 bg-[#1e1936] text-white">
            <div className="container mx-auto px-6 text-center">
                <span className="px-4 py-1 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                    How it works
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-16">
                    4 Simple Steps to <span className="text-primary">Pay Bills</span> in Minutes
                </h2>

                <div className="relative max-w-5xl mx-auto">
                    {/* Steps Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 relative">
                        {/* Step 1 */}
                        <div className="flex items-center space-x-6 text-left group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30">
                                1
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Create Account</h3>
                                <p className="text-[#d1d5db] text-sm">Create your SmatPay account with your name, email and phone number. No paperwork required.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center space-x-6 text-left group md:ml-auto">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30">
                                2
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Fund your Wallet</h3>
                                <p className="text-[#d1d5db] text-sm">Top up your SmatPay wallet using your debit card or transfer from your bank account instantly.</p>
                            </div>
                        </div>

                        {/* Step 3 (Opposite order for visual flow maybe?) */}
                        <div className="flex items-center space-x-6 text-left group md:ml-auto">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30 order-last ml-6 mr-0">
                                3
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-lg">Select Service</h3>
                                <p className="text-[#d1d5db] text-sm">Choose from airtime, data, electricity or TV subscription service you want to pay for.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-center space-x-6 text-left group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30 order-last ml-6 mr-0">
                                4
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-lg">Instant Delivery</h3>
                                <p className="text-[#d1d5db] text-sm">Confirm your payment and get instant value delivered to your phone or smart meter immediately.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
