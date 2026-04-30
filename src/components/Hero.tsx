import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/guy1.jpg" 
                    alt="Hero Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E1544] via-[#1E1544]/70 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Pay Bills Faster,<br />
                        <span className="text-primary italic">Smarter</span>, Anytime,<br />
                        Anywhere
                    </h1>
                    
                    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                        SmatPay lets you pay Electricity bills, Airtime VTU, Buy network Airtime PIN, 
                        perfect for online or offline use. TV subscriptions, Exam pins, and more, 
                        all in one place. No queues, no stress. Just instant payments via web, 
                        mobile app.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/login">
                            <button className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-1">
                                Get Started
                            </button>
                        </Link>

                    </div>

                    <div className="mt-12 flex items-center space-x-6 text-white/60">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1E1544] bg-gray-600 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm">Joined by <span className="text-white font-bold">10k+</span> happy users</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
