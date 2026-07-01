/* -----------------------------------------------------------------------------
CSS imports
----------------------------------------------------------------------------- */
import '../css/main.css';
import '../css/ghost.css';
import '../css/theme.css';

import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

// Store Swiper instances globally to prevent multiple initializations
const swiperInstances = new Map();
let initAttempts = 0;
const maxInitAttempts = 50; // Max 5 seconds (50 * 100ms)

// Function to initialize a single swiper
function initSwiper(swiperSelector, config) {
  // If already initialized, return
  if (swiperInstances.has(swiperSelector)) {
    return swiperInstances.get(swiperSelector);
  }

  const swiperElement = document.querySelector(swiperSelector);
  if (!swiperElement) return null;

  const swiperWrapper = swiperElement.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return null;

  const tempSlide = swiperWrapper.querySelector('.swiper-slide-temp');
  if (!tempSlide) return null;

  // Find all image cards within the temp slide
  const imageCards = tempSlide.querySelectorAll('.kg-card.kg-image-card');
  
  // If no cards found, return null (will retry)
  if (imageCards.length === 0) return null;

  // Clear the wrapper
  swiperWrapper.innerHTML = '';

  // Wrap each image card in a swiper-slide
  imageCards.forEach((card) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.style.display = 'flex';
    slide.style.alignItems = 'center';
    slide.style.justifyContent = 'center';
    slide.appendChild(card);
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper with the provided config
  const swiper = new Swiper(swiperSelector, config);
  swiperInstances.set(swiperSelector, swiper);

  return swiper;
}

// Function to initialize all swipers
function initAllSwipers() {
  // Prevent infinite retries
  if (initAttempts >= maxInitAttempts) {
    console.warn('Swiper initialization max attempts reached');
    return;
  }
  
  initAttempts++;

  // Initialize PBS Stations Swiper (9 items)
  const pbsSwiper = document.querySelector('.swiper-pbs-stations');
  if (pbsSwiper && !swiperInstances.has('.swiper-pbs-stations')) {
    const pbsTempSlide = pbsSwiper.querySelector('.swiper-slide-temp');
    const pbsImageCards = pbsTempSlide?.querySelectorAll('.kg-card.kg-image-card');
    
    if (pbsImageCards && pbsImageCards.length > 0) {
      const slideCount = pbsImageCards.length;
      const shouldLoop = slideCount > 9;

      const pbsConfig = {
        slidesPerView: 9,
        spaceBetween: 16,
        speed: 600,
        allowTouchMove: true,
        freeMode: false,
        watchOverflow: true,
        touchEventsTarget: 'container',
        grabCursor: true,
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 9,
            spaceBetween: 16,
          },
        },
      };

      if (shouldLoop) {
        pbsConfig.loop = true;
        pbsConfig.loopAdditionalSlides = 9;
        pbsConfig.loopedSlides = 9;
      }

      initSwiper('.swiper-pbs-stations', pbsConfig);
    }
  }

  // Initialize User Experience Swiper (3 items, full width)
  const uxSwiper = document.querySelector('.swiper-user-experience');
  if (uxSwiper && !swiperInstances.has('.swiper-user-experience')) {
    const uxTempSlide = uxSwiper.querySelector('.swiper-slide-temp');
    const uxImageCards = uxTempSlide?.querySelectorAll('.kg-card.kg-image-card');
    
    if (uxImageCards && uxImageCards.length > 0) {
      const slideCount = uxImageCards.length;
      const shouldLoop = slideCount > 3;

      const uxConfig = {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 24,
        speed: 600,
        allowTouchMove: true,
        freeMode: false,
        loop: true,
        watchOverflow: true,
        touchEventsTarget: 'container',
        grabCursor: true,
        breakpoints: {
          320: {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 24,
          },
        },
        on: {
          init: function() {
            // Update calculations after initialization
            this.update();
            // Move to second slide after update
            const self = this;
            setTimeout(() => {
              // Use slideToLoop if loop is enabled, otherwise slideTo
              if (shouldLoop && self.loopedSlides) {
                self.slideToLoop(1, 0);
              } else {
                self.slideTo(1, 0);
              }
              self.update();
            }, 50);
          },
        },
      };

      if (shouldLoop) {
        uxConfig.loop = true;
        uxConfig.loopAdditionalSlides = 3;
        uxConfig.loopedSlides = 3;
      }

      const uxSwiperInstance = initSwiper('.swiper-user-experience', uxConfig);
      
      // If swiper was just initialized, ensure proper positioning
      if (uxSwiperInstance) {
        // Wait for DOM to settle, then update and position
        setTimeout(() => {
          uxSwiperInstance.update();
          // Use slideToLoop if loop is enabled, otherwise slideTo
          if (shouldLoop && uxSwiperInstance.loopedSlides) {
            uxSwiperInstance.slideToLoop(1, 0);
          } else {
            uxSwiperInstance.slideTo(1, 0);
          }
          // Force update after positioning
          requestAnimationFrame(() => {
            uxSwiperInstance.update();
          });
        }, 200);
      }
    }
  }

  // Check if all swipers are initialized, if not retry
  const allSwipers = document.querySelectorAll('.swiper');
  let allInitialized = true;
  
  allSwipers.forEach((swiper) => {
    const selector = swiper.className.split(' ').find(cls => cls.startsWith('swiper-')) || '.swiper';
    if (!swiperInstances.has(selector)) {
      const tempSlide = swiper.querySelector('.swiper-slide-temp');
      const imageCards = tempSlide?.querySelectorAll('.kg-card.kg-image-card');
      if (!imageCards || imageCards.length === 0) {
        allInitialized = false;
      }
    }
  });

  if (!allInitialized) {
    setTimeout(initAllSwipers, 100);
  }
}

// Initialize when DOM is ready
function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initAllSwipers, 100);
    });
  } else {
    setTimeout(initAllSwipers, 100);
  }
}

init();
