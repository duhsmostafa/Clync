"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import $ from 'jquery';
import "./CardsScreoll.css";
import card1img1 from '../../assets/img1card1.svg';
import card1img2 from '../../assets/img2card1.svg';
import card1img3 from '../../assets/img3card1.svg';
import card1img4 from '../../assets/img4card1.svg';
import splitBills from '../../assets/Mob_Split Bill.svg';
import dropDownClyncCard from '../../assets/claw v5 1.svg';
import ducks from '../../assets/ducks.svg';
import girlImage from '../../assets/girl.svg';
import box1V4Image from '../../assets/box1V4.svg';
import box2V4Image from '../../assets/box2V4.svg';
import box3V4Image from '../../assets/box4V4.svg';
import box4V4Image from '../../assets/box4V4.svg';
import box5V4Image from '../../assets/add-pocket.svg';
import webChatting from '../../assets/Web_Chatting (1).svg';
import chattingBubles from '../../assets/Web_ChatBubbles.svg';

export default function CardScroll() {
    const [isCard4InView, setIsCard4InView] = useState(false);
    const [isCard5InView, setIsCard5InView] = useState(false);
    const [isCard2InView, setIsCard2InView] = useState(false);

    // Sticky positioning and scroll effects for all cards
    useEffect(() => {
        const cards = $('.card');
        const cardHeight = cards.first().outerHeight();
        const windowHeight = $(window).height();
        const offset = 100;

        cards.each(function (index) {
            $(this).css({
                position: 'sticky',
                top: index * 50 + 'px',
                'z-index': cards.length + index,
            });
        });

        $(window).on('scroll', function () {
            const scrollTop = $(window).scrollTop();
            cards.each(function (index) {
                const card = $(this);
                const cardTop = card.offset().top;
                const cardBottom = cardTop + cardHeight;

                if (scrollTop + windowHeight > cardTop + offset && scrollTop < cardBottom) {
                    const progress = (scrollTop + windowHeight - cardTop - offset) / (windowHeight + cardHeight);
                    const translateY = Math.max(0, Math.min(1, progress)) * (index * 50);
                    card.css('transform', `translateY(-${translateY}px)`);
                } else if (scrollTop + windowHeight <= cardTop + offset) {
                    card.css('transform', 'translateY(0)');
                }
            });
        });

        const card2 = $('#card-2');
        const card3 = $('#card-3');
        const card4 = $('#card-4');
        const card5 = $('#card-5');
        const card6 = $('#card-6');

        $(window).on('scroll', function () {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (card3.length > 0) {
                const card3Top = card3.offset().top;
                if (scrollTop + windowHeight > card3Top) {
                    const progress = (scrollTop + windowHeight - card3Top) / windowHeight;
                    const newWidth = Math.max(90, 100 - progress * 10);
                    card2.css('width', `${newWidth}%`);
                } else {
                    card2.css('width', '100%');
                }
            }

            if (card4.length > 0) {
                const card4TopOffset = card4.offset().top;
                if (scrollTop + windowHeight > card4TopOffset) {
                    const progress = (scrollTop + windowHeight - card4TopOffset) / windowHeight;
                    const newWidthCard3 = Math.max(95, 100 - progress * 5);
                    card3.css('width', `${newWidthCard3}%`);
                } else {
                    card3.css('width', '100%');
                }
            }

            if (card6.length > 0) {
                const card6Top = card6.offset().top;
                if (scrollTop + windowHeight > card6Top) {
                    const progress = (scrollTop + windowHeight - card6Top) / windowHeight;
                    const newWidthCard5 = Math.max(99, 100 - progress * 9);
                    card5.css('width', `${newWidthCard5}%`);
                } else {
                    card5.css('width', '100%');
                }
            }
        });

        return () => {
            $(window).off('scroll');
        };
    }, []);

    // Scroll detection for card-2, trigger when top is at 0 with 1-second delay
    useEffect(() => {
        const handleScroll = () => {
            const card2 = document.getElementById('card-2');
            if (card2) {
                const card2Top = card2.getBoundingClientRect().top;
                if (Math.abs(card2Top) < 5) {
                    setTimeout(() => {
                        setIsCard2InView(true);
                    }, 1000);
                } else {
                    setIsCard2InView(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Card-4 scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const card4 = document.getElementById('card-4');
            if (card4) {
                const card4Top = card4.getBoundingClientRect().top;
                const card4Bottom = card4.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;

                if (card4Top < windowHeight && card4Bottom > 0) {
                    setIsCard4InView(true);
                } else {
                    setIsCard4InView(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Card-5 scroll detection with 2-second delay
    useEffect(() => {
        const handleScroll = () => {
            const card5 = document.getElementById('card-5');
            if (card5) {
                const card5Top = card5.getBoundingClientRect().top;
                const card5Bottom = card5.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;

                if (card5Top < windowHeight && card5Bottom > 0) {
                    setTimeout(() => {
                        setIsCard5InView(true);
                    }, 2000);
                } else {
                    setIsCard5InView(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
        const card2 = document.getElementById('card-2');
        if (card2) {
            const card2Top = card2.getBoundingClientRect().top;
            if (card2Top <= 0) {
                // Add a 2-second delay before showing the second view
                timeoutId = setTimeout(() => {
                    setIsCard2InView(true);
                }, 2000);
            } else {
                // Clear the timeout if the user scrolls back up
                clearTimeout(timeoutId);
                setIsCard2InView(false);
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId); // Cleanup the timeout on unmount
    };
}, []);

    return (
        <main>
            {/* Card-2 */}
<div id="card-2" className="card any m-auto">
    <div className="row g-0">
        {/* First View: 4 Images */}
        <div className={`card-body cardOneImages ${isCard2InView ? 'd-none' : ''}`}>
            <Image src={card1img1} className="image-spacing bg1" alt="Rectangle 19861" />
            <Image src={card1img2} className="image-spacing bg2" alt="Rectangle 19862" />
            <Image src={card1img3} className="image-spacing bg3" alt="Rectangle 19863" />
            <Image src={card1img4} className="image-spacing bg4" alt="Rectangle 19864" />
        </div>

        {/* Second View: Text and Images */}
        <div className={`row g-0 card3 ${isCard2InView ? '' : 'd-none'}`}>
                        <div>
                            <div  className='secViewImages'>
            <Image src={card1img1} className=" bg01" alt="Rectangle 19861" />
            <Image src={card1img2} className=" bg02" alt="Rectangle 19862" />
            <Image src={card1img3} className=" bg03" alt="Rectangle 19863" />
            <Image src={card1img4} className=" bg04" alt="Rectangle 19864" />
                </div>
                        </div>
                        <div className='innerCard2SecView'>
                                                    <div className="card-body citChatDone  card-4">
                    <h2>Chit, <br />Chat,<br />Done.</h2>
                    <p>Stay in the loop with your people. 
                    Spill the tea, host events, and keep the convo rolling without ever losing the vibe.</p>
                </div>
            <div className="col-md-2 col-image3">
                <div className="card3SplitBillImage">
                    <Image src={webChatting} className="image3 BoyImage" alt="Rectangle 19884" />
                    <Image src={chattingBubles} className="bubles" alt="Rectangle 19884" />
                </div>
            </div>
                        </div>
        </div>
    </div>
</div>

            {/* Card-3 */}
            <div id="card-3" className="card w-100 any m-auto">
                <div className="row g-0 card3">
                    <div className="col-md-8">
                        <div className="card-body card-4 cardNum3">
                            <h2>Split Bills <br /> Without <br />Sweat</h2>
                            <p>Forget the awkward math and endless back and forth, split checks and bills in seconds. Our split bill keeps the fun flowing with no calculators or drama.</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-image3">
                        <div className="card3SplitBillImage">
                            <Image src={splitBills} className="image3 splitBills" alt="Rectangle 19884" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Card-4 */}
            <div id="card-4" className="card w-100 any m-auto">
                <div className="row g-0 card4">
                    <div className="col-md-8">
                        <div className="card-body card-4 cardNum3">
                            <h2>For Both<br />the Sleek <br />& Savage</h2>
                            <p>Spend smarter and flex harder with a prepaid card designed to match your style. Spend it, swipe it, and flex it wherever you go.</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-image3">
                        <div className="card3SplitBillImage">
                            <Image
                                src={dropDownClyncCard}
                                className={`image4 ${isCard4InView ? 'animate' : ''}`}
                                alt="Rectangle 19884"
                            />
                            <Image src={ducks} className="Duckimage4" alt="Rectangle 19884" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Card-5 */}
            <div id="card-5" className="card w-100 any m-auto">
                <div className="row g-0 card4">
                    <div className="col-md-8">
                        <div className="card-body card-4 cardNum3">
                            <h2>Saved,<br />Stacked,<br />& Locked!</h2>
                            <p>Keep your money goals in check. Save, plan, and track every pound. Pockets have your back; organized, easy, and totally yours.</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-image3">
                        <div className="lastCardViews">
                            <Image src={girlImage} className="girlImage" alt="Rectangle 19884" />
                            <div className={`boxs ${isCard5InView ? 'visible' : ''}`}>
                                <Image src={box2V4Image} className="yellowBox card5Images" alt="Rectangle 19884" />
                                <Image src={box5V4Image} className="addPocket card5Images" alt="Rectangle 19884" />
                                <Image src={box1V4Image} className="redBox card5Images" alt="Rectangle 19884" />
                                <Image src={box4V4Image} className="boxsImage4 card5Images" alt="Rectangle 19884" />
                                <Image src={box3V4Image} className="boxsImage3 card5Images" alt="Rectangle 19884" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}