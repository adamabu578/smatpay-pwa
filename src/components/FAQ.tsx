"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#3e3863] last:border-0 py-4">
            <button 
                className="w-full flex items-center justify-between text-left py-4 hover:text-primary transition-colors group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-bold group-hover:pl-2 transition-all">{question}</span>
                {isOpen ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-[#d1d5db] group-hover:text-primary" />}
            </button>
            {isOpen && (
                <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-[#d1d5db] leading-relaxed">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "Is SmatPay secure?",
            answer: "Yes, SmatPay is built with high-level security protocols. Your personal data and financial transactions are encrypted and protected."
        },
        {
            question: "What if my payment fails?",
            answer: "If a payment fails, your wallet is usually not debited. If it was debited, the system automatically triggers a refund within minutes. You can also contact our support team."
        },
        {
            question: "What if my transaction fails?",
            answer: "For transactions that fail after debit, we have an automated dispute resolution system. Most issues are resolved within 24 hours."
        },
        {
            question: "Which states do you cover?",
            answer: "We cover all states across Nigeria for electricity bills and all mobile networks for airtime and data subscriptions."
        }
    ];

    return (
        <section id="faqs" className="py-24 bg-[#1E1544] text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="w-full md:w-1/3">
                        <span className="px-4 py-1 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                            FAQs
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Got Questions?<br />
                            We've Got <span className="text-primary italic">Answers</span>
                        </h2>
                        <p className="text-[#d1d5db]">
                            Your security, Our priority. Quick answers to common queries to help you get started.
                        </p>
                    </div>

                    <div className="w-full md:w-2/3">
                        <div className="bg-[#251A5A] p-8 md:p-12 rounded-[2rem] border border-[#3e3863] shadow-sm">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} {...faq} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
