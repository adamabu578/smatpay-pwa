import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Globe, MessageSquare, Send } from 'lucide-react';
import SmatPayLogo from './SmatPayLogo';

const Footer = () => {
    return (
        <footer id="contact" className="bg-[#1e1936] text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center mb-6">
                            <SmatPayLogo className="h-12" />
                        </Link>
                        <p className="text-[#8683a1] mb-8 max-w-xs">
                            Instant delivery on every purchase. Everything from bill payments to global connectivity.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="w-10 h-10 rounded-full border border-[#3e3863] flex items-center justify-center hover:bg-primary transition-all">
                                <Send size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-[#3e3863] flex items-center justify-center hover:bg-primary transition-all">
                                <MessageSquare size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-[#3e3863] flex items-center justify-center hover:bg-primary transition-all">
                                <Globe size={18} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-8">Quick Links</h4>
                        <ul className="space-y-4 text-[#8683a1]">
                            <li><Link href="#" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
                            <li><Link href="#faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-8">Newsletter</h4>
                        <p className="text-[#8683a1] mb-6">Get exclusive weekly updates on discounts and features.</p>
                        <form className="relative">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full bg-[#130f28] border border-[#3e3863] rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                            />
                            <button className="absolute right-2 top-2 bg-primary text-white p-1 rounded-lg">
                                <Mail size={20} />
                            </button>
                        </form>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-8">Contact</h4>
                        <ul className="space-y-4 text-[#8683a1]">
                            <li className="flex items-center space-x-3">
                                <Mail className="text-primary" size={18} />
                                <span>support@smatpay.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="text-primary" size={18} />
                                <span>+234 800 224 8821</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-[#3e3863] flex flex-col md:flex-row justify-between items-center text-[#8683a1] text-sm">
                    <p>© {new Date().getFullYear()} SmatPay. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
