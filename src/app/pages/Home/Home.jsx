"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Home.css';
import clyncImage from '../../assets/Group 15 (1).svg';
import bottomImage from '../../assets/Frame 14090.svg';
import img1 from '../../assets/Rectangle 101 (2).svg';
import img2 from '../../assets/Rectangle 103 (1).svg';
import img3 from '../../assets/Rectangle 104 (1).svg';
import img4 from '../../assets/Rectangle 95 (1).svg';
import img5 from '../../assets/Rectangle 97 (2).svg';
import img6 from '../../assets/Rectangle 98 (2).svg';
import img7 from '../../assets/Rectangle 99 (1).svg';
import img8 from '../../assets/Layer_1 (1).svg';
import img9 from '../../assets/Rectangle 98 (3).svg';
import img10 from '../../assets/Frame.svg';
import img11 from '../../assets/sharara.svg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

export default function Home() {
  const [clicks, setClicks] = useState([]);
  const [lastImage, setLastImage] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [isBottomImageVisible, setIsBottomImageVisible] = useState(true); // New state for bottomImage visibility

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let randomImage;
    do {
      randomImage = images[Math.floor(Math.random() * images.length)];
    } while (randomImage === lastImage);

    setLastImage(randomImage);

    const newClick = { x, y, image: randomImage, id: Date.now() };
    setClicks((prevClicks) => [...prevClicks, newClick]);

    setTimeout(() => {
      setClicks((prevClicks) => prevClicks.filter((click) => click.id !== newClick.id));
    }, 3000);
  };

  useEffect(() => {
    // Scroll progress logic
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = scrollY / maxScroll;
      setScrollProgress(progress);

      if (scrollY === 0) {
        setResetAnimation(true);
        setTimeout(() => setResetAnimation(false), 0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for footer
    const footer = document.querySelector('footer');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBottomImageVisible(false); // Hide bottomImage when footer is in view
          } else {
            setIsBottomImageVisible(true); // Show bottomImage when footer is out of view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the footer is visible
    );

    if (footer) {
      observer.observe(footer);
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <div>
      <div
        className="HeroSection"
        onClick={handleClick}
        style={{
          background: `linear-gradient(to top, ${scrollProgress === 0 ? '#5CDA50' : `black ${Math.min(scrollProgress ** 3 * 20000, 100000)}%`}, transparent)`,
        }}
      >
        <div className="clyncImage">
          <Image src={clyncImage} alt="Clync" />
          <p>
            The social fintech product that combines social networking and financial
            technology to transform the way people interact with money.
          </p>
        </div>
        {clicks.map((click) => (
          <div
            key={click.id}
            className="RandomClicksImage"
            style={{
              position: 'absolute',
              top: click.y,
              left: click.x,
            }}
          >
            <Image src={click.image} alt="Random Clicks" width={150} height={150} />
          </div>
        ))}
      </div>
      <div
        className={`randomImagesSmScreen ${scrollProgress > 0 ? 'hidden' : ''}`}
        key={resetAnimation ? 'reset' : 'normal'}
      >
        <Image className="firstAppear" src={img1} alt="firstAppear" />
        <Image className="SecAppear" src={img2} alt="SecAppear" />
        <Image className="thirdAppear" src={img3} alt="thirdAppear" />
        <Image className="fourtAppear" src={img4} alt="fourtAppear" />
        <Image className="fiveAppear" src={img5} alt="fiveAppear" />
        <Image className="sixAppear" src={img6} alt="sixAppear" />
        <Image className="sevenAppear" src={img7} alt="sevenAppear" />
        <Image className="eightAppear" src={img8} alt="eightAppear" />
        <Image className="nineAppear" src={img9} alt="nineAppear" />
        <Image className="tenAppear" src={img10} alt="tenAppear" />
      </div>
      {isBottomImageVisible && (
        <div className="bottomImage">
          <Image src={bottomImage} alt="Bottom Image" />
        </div>
      )}
    </div>
  );
}