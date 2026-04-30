'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './OnboardingSlider.module.css';

export default function OnboardingSlider() {
  const router = useRouter();
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  const paginationConfig = React.useMemo(() => ({
    clickable: true,
    el: `.${styles.customPagination}`,
    bulletClass: styles.pageDot,
    bulletActiveClass: styles.activeDot,
  }), []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Pagination]}
        pagination={paginationConfig}
        className={styles.mySwiper}
      >
        {/* SLIDE 0: SPLASH SCREEN */}
        <SwiperSlide>
          <div className={styles.splashSlide}>
            <div className={styles.logoWrapper}>
              <svg width="80" height="96" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M12 36C12 28.268 18.268 22 26 22H42C49.732 22 56 28.268 56 36C56 43.732 49.732 50 42 50H26C22.6863 50 20 47.3137 20 44V36H12V44C12 51.732 18.268 58 26 58H42C54.1503 58 64 48.1503 64 36C64 23.8497 54.1503 14 42 14H26C13.8497 14 4 23.8497 4 36V36H12V36Z" 
                  fill="#006837" 
                />
                <path 
                  d="M12 58C12 58 12 68 16 72C20 68 20 58 20 58H12Z" 
                  fill="#39B54A" 
                />
              </svg>
            </div>
            <div className={styles.splashFooter}>
              <span className={styles.textPay}>Pay</span>
              <span className={styles.textTrust}>Trust</span>
            </div>
            <div className={styles.swipeHint}>Swipe to start</div>
          </div>
        </SwiperSlide>

        {/* SLIDE 1: SELLER ONBOARDING */}
        <SwiperSlide>
          <div className={styles.onboardingSlide}>


            <div className={styles.skipRow}>
              <button className={styles.skipButton} onClick={() => swiperRef?.slideTo(5)}>Skip</button>
            </div>

            <div className={styles.illustrationSection}>
              <div className={styles.imageWrapper}>
                <Image 
                  src="/onboarding-seller.png" 
                  alt="Seller Illustration" 
                  width={400} 
                  height={400}
                  priority
                  className={styles.illustration}
                />
              </div>
            </div>

            <div className={styles.contentSection}>
              <h2 className={styles.title}>Seller</h2>
              <p className={styles.description}>
                i want to make more sales, but i only do payment before delivery.
              </p>
              
              <button className={styles.nextButton} onClick={handleNext}>Next</button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2: BUYER ONBOARDING */}
        <SwiperSlide>
          <div className={styles.onboardingSlide}>


            <div className={styles.skipRow}>
              <button className={styles.skipButton} onClick={() => swiperRef?.slideTo(5)}>Skip</button>
            </div>

            <div className={styles.illustrationSection}>
              <div className={styles.imageWrapper}>
                <Image 
                  src="/onboarding-buyer.png" 
                  alt="Buyer Illustration" 
                  width={400} 
                  height={400}
                  priority
                  className={styles.illustration}
                />
              </div>
            </div>

            <div className={styles.contentSection}>
              <h2 className={styles.title}>Buyer</h2>
              <p className={styles.description}>
                I&apos;d love to buy this item, but i only do payment on delivery due to my past experience.
              </p>
              
              <button className={styles.nextButton} onClick={handleNext}>Next</button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3: PAYTRUST ONBOARDING */}
        <SwiperSlide>
          <div className={styles.onboardingSlide}>


            <div className={styles.skipRow}>
              <button className={styles.skipButton} onClick={() => swiperRef?.slideTo(5)}>Skip</button>
            </div>

            <div className={styles.illustrationSection}>
               <div className={styles.trustIllustration}>
                  <div className={styles.sunburst}></div>
                  <div className={styles.globeBackground}>
                    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className={styles.globeSvg}>
                      <path d="M0,50 Q50,0 100,50" fill="#f0f2f5" />
                      <circle cx="20" cy="35" r="5" fill="#e2e8f0" />
                      <circle cx="80" cy="30" r="8" fill="#e2e8f0" />
                      <path d="M40,25 Q50,20 60,30" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className={styles.shieldWrapper}>
                    <svg width="180" height="210" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M90 210C90 210 180 180 180 90V30L90 0L0 30V90C0 180 90 210 90 210Z" fill="#39B54A" />
                      <path d="M90 210C90 210 180 180 180 90V30L90 0V210Z" fill="#2E933C" />
                      <circle cx="90" cy="95" r="50" fill="white" fillOpacity="0.2" />
                      <circle cx="90" cy="95" r="45" fill="white" />
                      <path d="M75 115C75 95 85 85 105 85H115C125 85 135 95 135 115C135 135 125 145 115 145H105C95 145 85 138 85 130V115H75V115ZM75 135C75 135 75 160 85 170 C95 160 95 135 95 135H75Z" fill="#39B54A" />
                    </svg>
                    <div className={styles.checkBadge}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39B54A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
               </div>
            </div>

            <div className={styles.contentSection}>
              <h2 className={styles.title}>PayTrust</h2>
              <p className={styles.description}>
                With PayTrust, the risk factor of buying and selling to anyone and everyone is eliminated and the trust factor is created with the Escrow System.
              </p>
              <button className={styles.nextButton} onClick={handleNext}>Next</button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 4: REFER FRIENDS ONBOARDING */}
        <SwiperSlide>
          <div className={styles.onboardingSlide}>

            <div className={styles.skipRow}>
              <button className={styles.skipButton} onClick={() => swiperRef?.slideTo(5)}>Skip</button>
            </div>

            <div className={styles.illustrationSection}>
              <div className={styles.imageWrapper}>
                {/* TODO: Replace with the actual refer friends illustration */}
                <Image 
                  src="/onboarding-buyer.png" 
                  alt="Refer Friends Illustration" 
                  width={400} 
                  height={400}
                  priority
                  className={styles.illustration}
                />
              </div>
            </div>

            <div className={styles.contentSection}>
              <h2 className={styles.title}>Refer friends and earn</h2>
              <p className={styles.description}>
                Unlock rewards: Refer friends and earn on the SmatPay platform.
              </p>
              
              <button className={styles.nextButton} onClick={handleNext}>Next</button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 5: FINAL GET STARTED SCREEN */}
        <SwiperSlide>
          <div className={styles.finalSlide}>
            <div className={styles.backgroundOverlay}>
               <Image 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                alt="Smiling Man" 
                fill
                className={styles.bgImage}
              />
              <div className={styles.darkGradient}></div>
            </div>

            <div className={styles.finalContent}>
              <div className={styles.finalLogo}>
                 <svg width="60" height="72" viewBox="0 0 60 72" fill="none">
                    <path d="M12 36C12 28.268 18.268 22 26 22H42C49.732 22 56 28.268 56 36C56 43.732 49.732 50 42 50H26C22.6863 50 20 47.3137 20 44V36H12V44C12 51.732 18.268 58 26 58H42C54.1503 58 64 48.1503 64 36C64 23.8497 54.1503 14 42 14H26C13.8497 14 4 23.8497 4 36V36H12V36Z" fill="white" />
                 </svg>
              </div>
              <h1 className={styles.finalTitle}>Get Paid Securely</h1>
              <p className={styles.finalDescription}>
                Receive payments from anyone, anywhere with complete peace of mind using our secure escrow service.
              </p>
            </div>

            <div className={styles.finalActions}>
              <button className={styles.getStartedButton} onClick={() => router.push('/login')}>Get Started</button>
              <div className={styles.loginRow}>
                <span>Already have an account? </span>
                <button className={styles.loginLink} onClick={() => router.push('/login')}>Log in</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Pagination dots container - hidden on splash and final slide */}
      <div className={`${styles.customPagination} ${(activeIndex === 0 || activeIndex === 5) ? styles.hidden : ''}`}></div>
    </div>
  );
}
