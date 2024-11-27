//===================clicking functions===================

const stickerContainer = document.getElementById('sticker-clicks');
const images = Array.from(stickerContainer.getElementsByTagName('img'));
let currentIndex = 0;
let shuffledImages = [];
let timeoutId = null;
let isMouseDown = false;
let zIndexCounter = 3000; // Start with an initial z-index for stacking.

function shuffleImages() {
    shuffledImages = [...images].sort(() => Math.random() - 0.5);
}

function hideAllImages() {
    images.forEach(img => {
        img.classList.add('hidden');
        setTimeout(() => {
            img.style.display = 'none';
        }, 500);
    });
    currentIndex = 0;
    zIndexCounter = 3000; // Reset z-index counter when hiding all images.
}

function showNextImage(event) {
    // Allow stickers to appear everywhere except on the navbar and bottom-image
    if (!event.target.closest('.navbar') && !event.target.closest('.bottom-image')) {
        if (currentIndex === shuffledImages.length) {
            hideAllImages();
            shuffleImages();
        } else {
            const img = shuffledImages[currentIndex];
            const clickX = event.clientX;
            const clickY = event.clientY;

            img.style.left = `${clickX - img.offsetWidth / 2}px`;
            img.style.top = `${clickY - img.offsetHeight / 2}px`;
            img.style.zIndex = zIndexCounter++; // Increment z-index for each click to stack images.

            img.style.display = 'block';
            img.classList.remove('hidden');

            currentIndex++;

            clearTimeout(timeoutId);

            if (!isMouseDown) {
                timeoutId = setTimeout(() => {
                    hideAllImages();
                    shuffleImages();
                }, 5000);
            }
        }
    }
}


document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    showNextImage(event);
    clearTimeout(timeoutId);
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    timeoutId = setTimeout(() => {
        hideAllImages();
        shuffleImages();
    }, 2000);
});

shuffleImages();

const cursor = document.getElementById('cursor');
const circleText = document.getElementById('circle-text');

document.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    circleText.style.left = (mouseX - circleText.offsetWidth / 2) + 'px';
    circleText.style.top = (mouseY - circleText.offsetHeight / 2) + 'px';
});


const menuButton = document.querySelector('.menu-btn');
        const burgerMenu = document.querySelector('.burger-menu');
        const closeMenuButton = document.querySelectorAll('.close-menu-btn'); // All close buttons
        const sideMenu = document.querySelector('.side-menu');

        const openMenu = () => {
            sideMenu.classList.add('open');
            sideMenu.classList.remove('hidden');
        };

        const closeMenu = () => {
            sideMenu.classList.remove('open');
            sideMenu.classList.add('hidden');
        };

        menuButton.addEventListener('click', openMenu);
        burgerMenu.addEventListener('click', openMenu);

        closeMenuButton.forEach(button => button.addEventListener('click', closeMenu));
//===================Fixed aniomation functions===================

const fadeInCircles = gsap.timeline({ paused: true })

fadeInCircles
.to('body', { duration: 1 }, 0)
.fromTo('.circle', { autoAlpha: 0 }, { duration: 0.1, autoAlpha: 1, stagger: { each: 0.1 } }, 0)
;

ScrollTrigger.create({  
  trigger: 'section.two',
  pin: '.video-wrap',
  start: 'top top',
  endtrigger: '.circle-block',
  //end: 'bottom top-=' + window.innerHeight, 
  end: () => 'bottom top-=' + window.innerHeight, 
  animation: fadeInCircles,
  scrub:true,
})


const fadeInElements = gsap.timeline({ paused: true })

fadeInElements
.to('h1', { duration: 1, autoAlpha: 1 }, 1)
.to('p', { duration: 1, autoAlpha: 1 }, 3)
.to('body', { duration: 1 }, 5)
;

ScrollTrigger.create({  
  trigger: 'section.three',
  pin: true,
  start: 'top top',
  end: '+=100%',
  scrub: 1,
  animation: fadeInElements
})

//=====================horizontal scroll======================

gsap.registerPlugin(ScrollTrigger);

let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
let scrollTimeout = gsap.delayedCall(1, () => allowScroll = true).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
let swipePanels = gsap.utils.toArray(".swipe-section .panel");

// set z-index levels for the swipe panels
gsap.set(swipePanels, { zIndex: i => swipePanels.length - i})

// create an observer and disable it to start
let intentObserver = ScrollTrigger.observe({
  type: "wheel,touch",
  onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
  onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
  tolerance: 10,
  preventDefault: true,
  onEnable(self) {
    allowScroll = false;
    scrollTimeout.restart(true);
    // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
    let savedScroll = self.scrollY();
    self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
    document.addEventListener("scroll", self._restoreScroll, {passive: false});
  },
  onDisable: self => document.removeEventListener("scroll", self._restoreScroll)
});
intentObserver.disable();


// horizontal scrolling section 
let horizontalSections = gsap.utils.toArray(".horizontal .panel");
gsap.to(horizontalSections, {
  xPercent: -100 * (horizontalSections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: '.horizontal',
    pin: true,
    scrub: 1,
    end: "+=3500",
    markers: false,
  }
});


  $(document).ready(function() {
  const cards = $('.card');
  const cardHeight = cards.first().outerHeight();
  const windowHeight = $(window).height();
  const offset = 100; // Adjust this value to control when the effect starts

  // Set initial positions
  cards.each(function(index) {
      $(this).css({
          position: 'sticky',
          top: index * 50 + 'px', // Adjust this value to control card overlap
          'z-index': cards.length + index
      });
  });

  $(window).on('scroll', function() {
      const scrollTop = $(window).scrollTop();

      cards.each(function(index) {
          const card = $(this);
          const cardTop = card.offset().top;
          const cardBottom = cardTop + cardHeight;

          if (scrollTop + windowHeight > cardTop + offset && scrollTop < cardBottom) {
              const progress = (scrollTop + windowHeight - cardTop - offset) / (windowHeight + cardHeight);
              const translateY = Math.max(0, Math.min(1, progress)) * (index * 50); // Adjust this value to match the top offset

              card.css('transform', `translateY(-${translateY}px)`);
          } else if (scrollTop + windowHeight <= cardTop + offset) {
              card.css('transform', 'translateY(0)');
          }
      });
  });
});

//=============footer section================
function toggleHelp() {
    const helpText = document.querySelectorAll('.help-text');
    helpText.forEach(p => {
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
}
function toggleSecurity() {
    const securityText = document.querySelectorAll('.security-text');
    securityText.forEach(p => {
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
}

function toggleContact() {
    const contactText = document.querySelectorAll('.contact-text');
    contactText.forEach(p => {
        p.style.display = p.style.display === 'block' ? 'none' : 'block';
    });
}

