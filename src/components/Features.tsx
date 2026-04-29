import React from 'react';
import { CreditCard, Zap, ShieldCheck, Wallet } from 'lucide-react';

const Features = () => {
    const features = [
        {
            title: 'Instant Payments',
            description: 'Buy Airtime, Data and pay Electricity bills in just a few clicks. Fast, reliable and secure.',
            icon: <Zap className="text-primary" size={24} />
        },
        {
            title: 'Fast Payouts',
            description: 'Get your funds instantly into your bank account. No more waiting for days to get paid.',
            icon: <Wallet className="text-primary" size={24} />
        },
        {
            title: 'Secure & Reliable',
            description: 'Your transactions are protected with military-grade encryption. We take security seriously.',
            icon: <ShieldCheck className="text-primary" size={24} />
        },
        {
            title: 'Multiple Channels',
            description: 'Switch seamlessly between our web dashboard and mobile app – your convenience.',
            icon: <CreditCard className="text-primary" size={24} />
        }
    ];

    return (
        <section id="features" className="py-24 bg-[#130f28] text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <span className="px-4 py-1 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Key Features
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-center">
                        Why Choose <span className="text-primary">SmatPay</span>?
                    </h2>
                    <p className="text-[#d1d5db] mt-4 text-center max-w-2xl">
                        Your All-In-One Solution for Instant, Secure, and Reliable Bill Payments.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="w-full lg:w-1/2 relative flex justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#1e1936] rounded-full blur-3xl -z-10"></div>
                        <img 
                            src="/mockup.png" 
                            alt="App Preview" 
                            className="w-full max-w-sm rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-[#1e1936] border border-[#3e3863] hover:border-[#7b76e6] hover:shadow-xl hover:shadow-[#7b76e6]/10 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-[#130f28] flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-[#d1d5db] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
