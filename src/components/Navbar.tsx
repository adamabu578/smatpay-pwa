"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import SmatPayLogo from './SmatPayLogo';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Features', href: '#features' },
        { name: 'How it works', href: '#how-it-works' },
        { name: 'FAQs', href: '#faqs' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#130f28]/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <SmatPayLogo className="h-14" />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-white/80 hover:text-primary transition-colors text-sm font-medium">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/onboarding" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 inline-block">
                        Get Started
                    </Link>
                </div>

                <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#130f28]/95 absolute top-full left-0 right-0 py-8 px-6 border-t border-white/10 animate-in fade-in slide-in-from-top-4">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className="text-white text-lg font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-4 pt-4">
                            <Link href="/onboarding" className="bg-primary text-white w-full py-3 rounded-lg font-bold text-center block">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
